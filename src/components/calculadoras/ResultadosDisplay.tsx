'use client';

import { motion } from 'motion/react';
import { AlertTriangle, TrendingUp, CheckCircle, ArrowRight, Bot } from 'lucide-react';
import type { ResultadoCalculadora } from '@/lib/calculadora-punto-de-quiebre';

interface ResultadosDisplayProps {
  resultado: ResultadoCalculadora;
  onRecalcular: () => void;
}

function formatMoney(n: number): string {
  return `S/. ${n.toLocaleString('es-PE')}`;
}

function buildVeredictoContent(resultado: ResultadoCalculadora) {
  const { actual, bot, veredicto } = resultado;
  const capacidad = actual.capacidadDia;
  const leads = actual.leadsDiurnos + actual.leadsFueraHorario;

  if (veredicto === 'superado') {
    return {
      icon: AlertTriangle,
      color: 'text-red-600',
      bg: 'bg-red-50 border-red-200',
      titulo: 'Ya pasaste tu punto de quiebre',
      parrafos: [
        `Recibes ${leads} leads al día, pero tu equipo solo puede atender ${capacidad}. ${actual.leadsNoAtendidos > 0 ? `Eso son ${actual.leadsNoAtendidos} leads al día que nadie contesta.` : ''}`,
        actual.leadsFueraHorario > 0
          ? `Además, ${actual.leadsFueraHorario} leads llegan fuera de tu horario laboral y se enfrían. Un lead que espera más de 5 minutos tiene 80% menos probabilidad de comprar — y estos esperan horas.`
          : null,
        `Tu tasa de cierre real es ${(actual.tasaCierreEfectiva * 100).toFixed(1)}%, cuando con atención inmediata 24/7 podría ser ${(bot.tasaCierre * 100).toFixed(0)}%.`,
      ].filter(Boolean) as string[],
    };
  }

  if (veredicto === 'cerca') {
    return {
      icon: TrendingUp,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200',
      titulo: 'Estás a punto de pasarlo',
      parrafos: [
        `Tu equipo puede atender ${capacidad} leads al día y recibes ${leads}. Todavía aguanta, pero un poco más de volumen y empiezas a perder leads.`,
        actual.leadsFueraHorario > 0
          ? `Ya tienes ${actual.leadsFueraHorario} leads al día que llegan fuera de horario y se enfrían. Esos leads cuestan lo mismo en ads pero rinden mucho menos.`
          : null,
        `Hoy cierras al ${(actual.tasaCierreEfectiva * 100).toFixed(1)}%. Con atención inmediata 24/7, podrías cerrar al ${(bot.tasaCierre * 100).toFixed(0)}%.`,
      ].filter(Boolean) as string[],
    };
  }

  return {
    icon: CheckCircle,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-200',
    titulo: 'Tu equipo aún da abasto',
    parrafos: [
      `Recibes ${leads} leads al día y tu equipo puede atender ${capacidad}. Aún tienes margen.`,
      actual.leadsFueraHorario > 0
        ? `Pero ${actual.leadsFueraHorario} leads llegan fuera de horario y se enfrían. Ahí ya estás dejando plata.`
        : null,
      `Hoy cierras al ${(actual.tasaCierreEfectiva * 100).toFixed(1)}%. Incluso sin haber pasado tu punto de quiebre, mira cuánto más podrías facturar:`,
    ].filter(Boolean) as string[],
  };
}

export function ResultadosDisplay({ resultado, onRecalcular }: ResultadosDisplayProps) {
  const { actual, bot, veredicto, dineroQuePierdes } = resultado;
  const v = buildVeredictoContent(resultado);
  const Icon = v.icon;

  const inversionHaiku = bot.costoHaiku;
  const roiPorSol = inversionHaiku > 0
    ? Math.round(dineroQuePierdes / inversionHaiku)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* 1. Veredicto + contexto narrativo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl border p-6 md:p-8 ${v.bg}`}
      >
        <div className="flex items-start gap-4">
          <Icon className={`${v.color} mt-1 shrink-0`} size={28} />
          <div className="space-y-3">
            <h3 className={`text-2xl font-bold ${v.color}`}>{v.titulo}</h3>
            {v.parrafos.map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 2. Cuánto te cuesta — la cifra que duele */}
      {dineroQuePierdes > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-8 px-6 bg-white rounded-2xl border border-gray-200 shadow-sm"
        >
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Eso te cuesta
          </p>
          <p className="text-5xl md:text-6xl font-display font-bold text-red-600">
            {formatMoney(dineroQuePierdes)}
            <span className="text-2xl md:text-3xl text-red-400">/mes</span>
          </p>
          <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
            en ingresos que podrías estar generando con la misma inversión en ads.
          </p>
        </motion.div>
      )}

      {/* 3. Comparación: tu inversión hoy vs con Haiku */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Qué pasa si lo resuelves
          </h4>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3" />
              <th className="text-right text-sm font-medium text-gray-500 px-6 py-3">Hoy</th>
              <th className="text-right text-sm font-medium text-[#00A86B] px-6 py-3">Con Haiku</th>
              <th className="text-right text-sm font-medium text-gray-500 px-6 py-3 hidden sm:table-cell">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-50">
              <td className="text-sm text-gray-700 px-6 py-3">Inversión total/mes</td>
              <td className="text-sm text-gray-900 text-right px-6 py-3">{formatMoney(actual.costoTotal)}</td>
              <td className="text-sm text-gray-900 text-right px-6 py-3">{formatMoney(bot.costoTotal)}</td>
              <td className="text-sm text-amber-600 text-right px-6 py-3 hidden sm:table-cell">
                +{formatMoney(bot.costoTotal - actual.costoTotal)}
              </td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="text-sm text-gray-700 px-6 py-3">Ventas/mes</td>
              <td className="text-sm text-gray-900 text-right px-6 py-3">{actual.ventasMes}</td>
              <td className="text-sm text-gray-900 text-right px-6 py-3">{bot.ventasMes}</td>
              <td className="text-sm text-emerald-600 text-right px-6 py-3 hidden sm:table-cell">
                +{bot.ventasMes - actual.ventasMes}
              </td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="text-sm font-semibold text-gray-900 px-6 py-3">Ingresos/mes</td>
              <td className="text-sm font-semibold text-gray-900 text-right px-6 py-3">{formatMoney(actual.ingresosMes)}</td>
              <td className="text-sm font-semibold text-[#00A86B] text-right px-6 py-3">{formatMoney(bot.ingresosMes)}</td>
              <td className="text-sm font-semibold text-emerald-600 text-right px-6 py-3 hidden sm:table-cell">
                +{formatMoney(dineroQuePierdes)}
              </td>
            </tr>
            {roiPorSol > 0 && (
              <tr className="bg-emerald-50">
                <td className="text-sm font-semibold text-emerald-800 px-6 py-4" colSpan={2}>
                  Retorno por cada S/ 1 invertido en Haiku
                </td>
                <td className="text-right px-6 py-4" colSpan={2}>
                  <span className="text-2xl font-bold text-emerald-700">
                    S/. {roiPorSol}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* 4. Plan recomendado — la inversión concreta */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gray-50 rounded-2xl border border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bot className="text-[#00A86B]" size={22} />
          <h4 className="text-lg font-bold text-gray-900">
            Plan recomendado: Haiku {bot.plan.nombre}
          </h4>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between py-1">
            <span className="text-sm text-gray-600">Plan base ({bot.plan.convsIncluidas} convs incluidas)</span>
            <span className="text-sm text-gray-900">{formatMoney(bot.plan.precioBase)}/mes</span>
          </div>
          {bot.plan.bloquesExtra > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-600">
                {bot.plan.bloquesExtra} bloque{bot.plan.bloquesExtra > 1 ? 's' : ''} extra ({bot.plan.convsMes - bot.plan.convsIncluidas} convs adicionales)
              </span>
              <span className="text-sm text-gray-900">{formatMoney(bot.plan.costoBloquesExtra)}/mes</span>
            </div>
          )}
          <div className="flex justify-between py-2 border-t border-gray-200 mt-2 font-semibold">
            <span className="text-sm text-gray-900">Total Haiku</span>
            <span className="text-sm text-gray-900">{formatMoney(bot.costoHaiku)}/mes</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Tus vendedores se mantienen — el bot filtra y califica, ellos solo cierran.
        </p>
      </motion.div>

      {/* 5. CTA */}
      <div className="text-center space-y-4 pt-4">
        {veredicto === 'superado' || veredicto === 'cerca' ? (
          <a
            href="/#agendar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A86B] text-white font-semibold rounded-full hover:bg-[#009160] transition-all text-lg"
          >
            Quiero resolver esto
            <ArrowRight size={20} />
          </a>
        ) : (
          <a
            href="/#agendar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A86B] text-white font-semibold rounded-full hover:bg-[#009160] transition-all text-lg"
          >
            Quiero facturar más con mis leads
            <ArrowRight size={20} />
          </a>
        )}
        <button
          onClick={onRecalcular}
          className="block mx-auto text-sm text-gray-400 hover:text-gray-600 underline transition-colors"
        >
          Recalcular con otros números
        </button>
      </div>
    </motion.div>
  );
}
