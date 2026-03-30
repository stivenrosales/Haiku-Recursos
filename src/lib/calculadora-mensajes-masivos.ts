// Precios de template de marketing de WhatsApp Business API por país (USD)
const PRECIOS_TEMPLATE: Record<string, { nombre: string; precio: number }> = {
  PE: { nombre: 'Perú', precio: 0.0466 },
  CO: { nombre: 'Colombia', precio: 0.0466 },
  MX: { nombre: 'México', precio: 0.0360 },
  CL: { nombre: 'Chile', precio: 0.0626 },
  AR: { nombre: 'Argentina', precio: 0.0513 },
  EC: { nombre: 'Ecuador', precio: 0.0466 },
  BO: { nombre: 'Bolivia', precio: 0.0466 },
  PY: { nombre: 'Paraguay', precio: 0.0466 },
  BR: { nombre: 'Brasil', precio: 0.0500 },
  UY: { nombre: 'Uruguay', precio: 0.0377 },
};

export const PAISES = Object.entries(PRECIOS_TEMPLATE).map(([code, data]) => ({
  code,
  nombre: data.nombre,
  precioTemplate: data.precio,
}));

export function getPrecioTemplate(countryCode: string): number {
  return PRECIOS_TEMPLATE[countryCode]?.precio ?? 0.0466;
}

// Planes Haiku — templates de remarketing (precios USD)
const PLANES_HAIKU = {
  pro: {
    nombre: 'Pro',
    precioBase: 197,
    templatesIncluidos: 500,
  },
  scale: {
    nombre: 'Scale',
    precioBase: 397,
    templatesIncluidos: 1500,
  },
} as const;

const PRECIO_BLOQUE_TEMPLATES = 67; // USD por bloque de 500 templates
const TEMPLATES_POR_BLOQUE = 500;

export interface MasivosInputs {
  pais: string;
  contactos: number;
  precioPromedio: number; // USD
  tasaRecuperacion: number; // 0-1, default 0.05
  gastoMensualAds: number; // USD
  leadsNuevosMes: number;
}

export interface MasivosConfigAvanzada {
  costoTemplate: number; // USD, override del precio por país
  tasaCierreRecuperados: number; // default 0.10
}

export const MASIVOS_CONFIG_DEFAULTS: MasivosConfigAvanzada = {
  costoTemplate: 0.0466,
  tasaCierreRecuperados: 0.10,
};

export interface PlanRecomendadoMasivos {
  nombre: string;
  precioBase: number;
  templatesIncluidos: number;
  templatesNecesarios: number;
  bloquesExtra: number;
  costoBloquesExtra: number;
  costoTotal: number;
}

export interface ResultadoMasivos {
  // Envío
  costoEnvio: number;
  costoTemplatePais: number;

  // Leads recuperados
  leadsRecuperados: number;
  ventasRecuperacion: number;
  ingresosRecuperacion: number;

  // Comparación con ads
  cpl: number; // costo por lead en ads
  costoEquivalenteAds: number; // cuánto costaría conseguir esos leads con ads
  costoPorLeadReactivado: number;
  ahorro: number; // costoEquivalenteAds - costoEnvio

  // ROI
  roi: number; // ingresos / costo envío

  // Plan Haiku
  plan: PlanRecomendadoMasivos;
  costoTotalConHaiku: number; // costo envío (Meta) + plan Haiku
}

function recomendarPlanMasivos(templatesNecesarios: number): PlanRecomendadoMasivos {
  const opciones = Object.values(PLANES_HAIKU).map((plan) => {
    const templatesExtra = Math.max(0, templatesNecesarios - plan.templatesIncluidos);
    const bloquesExtra = Math.ceil(templatesExtra / TEMPLATES_POR_BLOQUE);
    const costoBloquesExtra = bloquesExtra * PRECIO_BLOQUE_TEMPLATES;
    return {
      nombre: plan.nombre,
      precioBase: plan.precioBase,
      templatesIncluidos: plan.templatesIncluidos,
      templatesNecesarios,
      bloquesExtra,
      costoBloquesExtra,
      costoTotal: plan.precioBase + costoBloquesExtra,
    };
  });

  return opciones.reduce((mejor, actual) =>
    actual.costoTotal < mejor.costoTotal ? actual : mejor
  );
}

export function calcularMasivos(
  inputs: MasivosInputs,
  config: MasivosConfigAvanzada = MASIVOS_CONFIG_DEFAULTS
): ResultadoMasivos {
  // Costo del envío masivo
  const costoTemplatePais = config.costoTemplate;
  const costoEnvio = inputs.contactos * costoTemplatePais;

  // Leads recuperados
  const leadsRecuperados = Math.round(inputs.contactos * inputs.tasaRecuperacion);
  const ventasRecuperacion = Math.round(leadsRecuperados * config.tasaCierreRecuperados);
  const ingresosRecuperacion = ventasRecuperacion * inputs.precioPromedio;

  // Comparación con ads
  const cpl = inputs.leadsNuevosMes > 0
    ? inputs.gastoMensualAds / inputs.leadsNuevosMes
    : 0;
  const costoEquivalenteAds = leadsRecuperados * cpl;
  const costoPorLeadReactivado = leadsRecuperados > 0
    ? costoEnvio / leadsRecuperados
    : 0;
  const ahorro = costoEquivalenteAds - costoEnvio;

  // ROI
  const roi = costoEnvio > 0
    ? ingresosRecuperacion / costoEnvio
    : 0;

  // Plan Haiku
  const plan = recomendarPlanMasivos(inputs.contactos);
  const costoTotalConHaiku = costoEnvio + plan.costoTotal;

  return {
    costoEnvio: Math.round(costoEnvio * 100) / 100,
    costoTemplatePais,
    leadsRecuperados,
    ventasRecuperacion,
    ingresosRecuperacion: Math.round(ingresosRecuperacion),
    cpl: Math.round(cpl * 100) / 100,
    costoEquivalenteAds: Math.round(costoEquivalenteAds * 100) / 100,
    costoPorLeadReactivado: Math.round(costoPorLeadReactivado * 100) / 100,
    ahorro: Math.round(ahorro * 100) / 100,
    roi: Math.round(roi * 10) / 10,
    plan,
    costoTotalConHaiku: Math.round(costoTotalConHaiku * 100) / 100,
  };
}
