export interface CalculadoraInputs {
  leadsPorDia: number;
  numVendedores: number;
  gastoMensualAds: number;
  salarioMensualVendedor: number;
  ticketPromedio: number;
  horaInicio: number; // 0-23
  horaFin: number;    // 0-23
}

export interface ConfigAvanzada {
  convsVendedorDia: number;    // default 35
  tasaCierreVendedor: number;  // default 0.10
  tasaCierreBot: number;       // default 0.30
  penalizacionLeadFrio: number; // default 0.33 (÷3)
}

export const CONFIG_DEFAULTS: ConfigAvanzada = {
  convsVendedorDia: 35,
  tasaCierreVendedor: 0.10,
  tasaCierreBot: 0.30,
  penalizacionLeadFrio: 0.33,
};

// Planes Haiku (precios Perú en S/.)
const PLANES_HAIKU = {
  pro: {
    nombre: 'Pro',
    precioBase: 597,
    convsIncluidas: 300,
  },
  scale: {
    nombre: 'Scale',
    precioBase: 1097,
    convsIncluidas: 1000,
  },
} as const;

const PRECIO_BLOQUE_EXTRA = 97; // S/ por bloque de 100 conversaciones
const CONVS_POR_BLOQUE = 100;

// Horas en las que la gente está despierta e interactúa con ads (~7am-11pm)
const HORAS_DESPIERTO = 16;

export interface PlanRecomendado {
  nombre: string;
  precioBase: number;
  convsIncluidas: number;
  convsMes: number;
  bloquesExtra: number;
  costoBloquesExtra: number;
  costoTotal: number;
}

export interface EscenarioActual {
  capacidadDia: number;
  leadsDiurnos: number;       // leads que llegan en horario laboral (calientes)
  leadsFueraHorario: number;  // leads que llegan fuera de horario (se enfrían)
  hotAtendidos: number;       // leads calientes atendidos
  coldAtendidos: number;      // leads fríos que el vendedor intenta revivir
  leadsNoAtendidos: number;   // leads que nadie atiende (exceden capacidad)
  tasaCierreEfectiva: number;
  ventasMes: number;
  ingresosMes: number;
  costoTotal: number; // ads + salarios
}

export interface EscenarioBot {
  leadsAtendidos: number;
  tasaCierre: number;
  ventasMes: number;
  ingresosMes: number;
  costoTotal: number; // ads + salarios + Haiku
  costoHaiku: number;
  diferenciaIngresos: number;
  plan: PlanRecomendado;
}

export type Veredicto = 'superado' | 'cerca' | 'ok';

export interface ResultadoCalculadora {
  actual: EscenarioActual;
  bot: EscenarioBot;
  veredicto: Veredicto;
  dineroQuePierdes: number;
}

function recomendarPlan(convsMes: number): PlanRecomendado {
  const opciones = Object.values(PLANES_HAIKU).map((plan) => {
    const convsExtra = Math.max(0, convsMes - plan.convsIncluidas);
    const bloquesExtra = Math.ceil(convsExtra / CONVS_POR_BLOQUE);
    const costoBloquesExtra = bloquesExtra * PRECIO_BLOQUE_EXTRA;
    return {
      nombre: plan.nombre,
      precioBase: plan.precioBase,
      convsIncluidas: plan.convsIncluidas,
      convsMes,
      bloquesExtra,
      costoBloquesExtra,
      costoTotal: plan.precioBase + costoBloquesExtra,
    };
  });

  return opciones.reduce((mejor, actual) =>
    actual.costoTotal < mejor.costoTotal ? actual : mejor
  );
}

export function calcular(
  inputs: CalculadoraInputs,
  config: ConfigAvanzada = CONFIG_DEFAULTS
): ResultadoCalculadora {
  const diasMes = 30;

  // --- Distribución de leads ---
  // Los leads de ads llegan cuando la gente está despierta (~16h),
  // no uniformemente en 24h. Calculamos cuántos caen dentro del horario laboral.
  const horasLaborales = inputs.horaFin > inputs.horaInicio
    ? inputs.horaFin - inputs.horaInicio
    : 24 - inputs.horaInicio + inputs.horaFin;
  const horasEfectivas = Math.min(horasLaborales, HORAS_DESPIERTO);

  const fraccionEnHorario = horasEfectivas / HORAS_DESPIERTO;
  const leadsDiurnos = Math.round(inputs.leadsPorDia * fraccionEnHorario);
  const leadsFueraHorario = Math.round(inputs.leadsPorDia * (1 - fraccionEnHorario));

  // --- Escenario actual ---
  const capacidadDia = inputs.numVendedores * config.convsVendedorDia;

  // Los leads fríos (fuera de horario) también consumen capacidad:
  // el vendedor llega en la mañana y los intenta revivir antes de atender los nuevos.
  const coldAtendidos = Math.min(leadsFueraHorario, capacidadDia);
  const capacidadRestante = Math.max(0, capacidadDia - coldAtendidos);
  const hotAtendidos = Math.min(leadsDiurnos, capacidadRestante);
  const leadsNoAtendidos = inputs.leadsPorDia - coldAtendidos - hotAtendidos;

  // Ventas: leads calientes cierran a tasa normal, fríos a tasa penalizada
  const ventasHotDia = hotAtendidos * config.tasaCierreVendedor;
  const ventasColdDia = coldAtendidos * config.tasaCierreVendedor * config.penalizacionLeadFrio;
  const ventasDiaActual = ventasHotDia + ventasColdDia;
  // Los no atendidos no generan ventas
  const ventasMesActual = ventasDiaActual * diasMes;

  const tasaCierreEfectiva = inputs.leadsPorDia > 0
    ? ventasDiaActual / inputs.leadsPorDia
    : 0;

  const ingresosMesActual = ventasMesActual * inputs.ticketPromedio;
  const costoSalarios = inputs.numVendedores * inputs.salarioMensualVendedor;
  const costoTotalActual = inputs.gastoMensualAds + costoSalarios;

  const actual: EscenarioActual = {
    capacidadDia,
    leadsDiurnos,
    leadsFueraHorario,
    hotAtendidos,
    coldAtendidos,
    leadsNoAtendidos,
    tasaCierreEfectiva,
    ventasMes: Math.round(ventasMesActual),
    ingresosMes: Math.round(ingresosMesActual),
    costoTotal: costoTotalActual,
  };

  // --- Escenario con bot ---
  // 1 lead = 1 conversación
  const convsMes = inputs.leadsPorDia * diasMes;
  const plan = recomendarPlan(convsMes);

  // Bot atiende 100% al instante, todos calientes
  const ventasDiaBot = inputs.leadsPorDia * config.tasaCierreBot;
  const ventasMesBot = ventasDiaBot * diasMes;
  const ingresosMesBot = ventasMesBot * inputs.ticketPromedio;
  // Vendedores se quedan + ads + Haiku
  const costoTotalBot = inputs.gastoMensualAds + costoSalarios + plan.costoTotal;

  const bot: EscenarioBot = {
    leadsAtendidos: inputs.leadsPorDia,
    tasaCierre: config.tasaCierreBot,
    ventasMes: Math.round(ventasMesBot),
    ingresosMes: Math.round(ingresosMesBot),
    costoTotal: costoTotalBot,
    costoHaiku: plan.costoTotal,
    diferenciaIngresos: Math.round(ingresosMesBot - ingresosMesActual),
    plan,
  };

  // --- Veredicto ---
  // Compara TODOS los leads contra capacidad (todos consumen capacidad)
  const ratio = inputs.leadsPorDia / (capacidadDia || 1);
  let veredicto: Veredicto = 'ok';
  if (ratio > 1) veredicto = 'superado';
  else if (ratio >= 0.8) veredicto = 'cerca';

  const dineroQuePierdes = Math.round(ingresosMesBot - ingresosMesActual);

  return { actual, bot, veredicto, dineroQuePierdes };
}
