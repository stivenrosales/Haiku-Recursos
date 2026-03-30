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
  leadsAtendidos: number;
  leadsNoAtendidos: number;
  leadsNocturnos: number;
  leadsFrios: number;
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
  dineroQuePierdes: number; // ingresos bot - ingresos actual
}

function recomendarPlan(convsMes: number): PlanRecomendado {
  // Elegir el plan donde el costo total sea menor
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

  // El plan con menor costo total
  return opciones.reduce((mejor, actual) =>
    actual.costoTotal < mejor.costoTotal ? actual : mejor
  );
}

export function calcular(
  inputs: CalculadoraInputs,
  config: ConfigAvanzada = CONFIG_DEFAULTS
): ResultadoCalculadora {
  const diasMes = 30;

  const horasAtencion = inputs.horaFin > inputs.horaInicio
    ? inputs.horaFin - inputs.horaInicio
    : 24 - inputs.horaInicio + inputs.horaFin;
  const fraccionNocturna = (24 - horasAtencion) / 24;

  // --- Escenario actual ---
  const capacidadDia = inputs.numVendedores * config.convsVendedorDia;
  const leadsDiurnos = Math.round(inputs.leadsPorDia * (1 - fraccionNocturna));
  const leadsNocturnos = Math.round(inputs.leadsPorDia * fraccionNocturna);

  const leadsAtendidosDia = Math.min(leadsDiurnos, capacidadDia);
  const leadsNoAtendidos = Math.max(0, leadsDiurnos - capacidadDia);

  const leadsFrios = leadsNocturnos + leadsNoAtendidos;

  const ventasCalientesDia = leadsAtendidosDia * config.tasaCierreVendedor;
  const ventasFriasDia = leadsFrios * config.tasaCierreVendedor * config.penalizacionLeadFrio;
  const ventasDiaActual = ventasCalientesDia + ventasFriasDia;
  const ventasMesActual = ventasDiaActual * diasMes;

  const tasaCierreEfectiva = inputs.leadsPorDia > 0
    ? ventasDiaActual / inputs.leadsPorDia
    : 0;

  const ingresosMesActual = ventasMesActual * inputs.ticketPromedio;
  const costoSalarios = inputs.numVendedores * inputs.salarioMensualVendedor;
  const costoTotalActual = inputs.gastoMensualAds + costoSalarios;

  const actual: EscenarioActual = {
    capacidadDia,
    leadsAtendidos: leadsAtendidosDia,
    leadsNoAtendidos,
    leadsNocturnos,
    leadsFrios,
    tasaCierreEfectiva,
    ventasMes: Math.round(ventasMesActual),
    ingresosMes: Math.round(ingresosMesActual),
    costoTotal: costoTotalActual,
  };

  // --- Escenario con bot ---
  // 1 lead = 1 conversación
  const convsMes = inputs.leadsPorDia * diasMes;
  const plan = recomendarPlan(convsMes);

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
  const ratio = inputs.leadsPorDia / (capacidadDia || 1);
  let veredicto: Veredicto = 'ok';
  if (ratio > 1) veredicto = 'superado';
  else if (ratio >= 0.8) veredicto = 'cerca';

  // Métrica central: cuánto dinero pierdes al no tener la solución
  const dineroQuePierdes = Math.round(ingresosMesBot - ingresosMesActual);

  return { actual, bot, veredicto, dineroQuePierdes };
}
