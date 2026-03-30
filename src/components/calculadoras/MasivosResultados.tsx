'use client';

import { motion } from 'motion/react';
import { ArrowRight, Bot, MessageSquare, DollarSign, TrendingUp } from 'lucide-react';
import type { ResultadoMasivos } from '@/lib/calculadora-mensajes-masivos';

interface MasivosResultadosProps {
  resultado: ResultadoMasivos;
  contactos: number;
  onRecalcular: () => void;
}

function formatUSD(n: number): string {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function MasivosResultados({ resultado, contactos, onRecalcular }: MasivosResultadosProps) {
  const r = resultado;
  const conviene = r.ahorro > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* 1. Veredicto narrativo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl border p-6 md:p-8 ${
          conviene ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
        }`}
      >
        <div className="flex items-start gap-4">
          <TrendingUp
            className={`${conviene ? 'text-emerald-600' : 'text-amber-600'} mt-1 shrink-0`}
            size={28}
          />
          <div className="space-y-3">
            <h3 className={`text-2xl font-bold ${conviene ? 'text-emerald-700' : 'text-amber-700'}`}>
              {conviene
                ? 'Reactivar te sale mucho más barato que buscar leads nuevos'
                : 'Con estos números, los ads te rinden más por ahora'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Enviar {contactos.toLocaleString()} mensajes con Haiku te cuesta {formatUSD(r.costoTotalConHaiku)} en total (Meta + plataforma).
              {' '}De esos contactos, esperamos recuperar {r.leadsRecuperados.toLocaleString()} leads.
            </p>
            {conviene ? (
              <p className="text-gray-700 leading-relaxed">
                Conseguir esos mismos {r.leadsRecuperados.toLocaleString()} leads con ads te costaría {formatUSD(r.costoEquivalenteAds)}.
                {' '}Reactivando, te ahorras {formatUSD(r.ahorro)}.
              </p>
            ) : (
              <p className="text-gray-700 leading-relaxed">
                Tu costo por lead en ads es {formatUSD(r.cpl)}, y reactivando sale a {formatUSD(r.costoPorLeadReactivado)} por lead.
                {' '}Podrías mejorar esto con más contactos o una mayor tasa de recuperación.
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* 2. Flujo del envío */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8"
      >
        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-6">
          ¿Qué pasa con tu envío de {contactos.toLocaleString()} mensajes?
        </h4>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
              <MessageSquare className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-2xl font-bold text-blue-700">{contactos.toLocaleString()}</p>
                <p className="text-sm text-gray-600">mensajes enviados</p>
                <p className="text-xs text-gray-400 mt-1">Templates oficiales de Meta — sin riesgo de baneo</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-emerald-50 rounded-xl p-4">
              <TrendingUp className="text-emerald-600 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-2xl font-bold text-emerald-700">{r.leadsRecuperados.toLocaleString()}</p>
                <p className="text-sm text-gray-600">leads recuperados</p>
                <p className="text-xs text-gray-400 mt-1">Contactos que responden y vuelven a interesarse</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-4">
              <DollarSign className="text-amber-600 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-2xl font-bold text-amber-700">{r.ventasRecuperacion}</p>
                <p className="text-sm text-gray-600">ventas esperadas</p>
                <p className="text-xs text-gray-400 mt-1">Con tasa de cierre del {Math.round(r.ventasRecuperacion / (r.leadsRecuperados || 1) * 100)}%</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 3. ROI — hero si conviene, dato secundario si no */}
      {r.roi > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
          className={`text-center px-6 bg-white rounded-2xl border border-gray-200 ${
            conviene ? 'py-8 shadow-sm' : 'py-5'
          }`}
        >
          {conviene ? (
            <>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                Por cada dólar que inviertes
              </p>
              <p className="text-5xl md:text-6xl font-display font-bold text-emerald-600">
                ${r.roi}
              </p>
              <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
                Inviertes {formatUSD(r.costoTotalConHaiku)} en total y generas {formatUSD(r.ingresosRecuperacion)} en ingresos potenciales.
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-500">
              Aún así, por cada dólar invertido recuperas <span className="font-semibold text-gray-700">${r.roi}</span> — inviertes {formatUSD(r.costoTotalConHaiku)} y generas {formatUSD(r.ingresosRecuperacion)} en ingresos potenciales.
            </p>
          )}
        </motion.div>
      )}

      {/* 4. Tabla comparativa */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-100">
          <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Reactivar vs conseguir leads nuevos
          </h4>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-sm font-medium text-gray-500 px-6 py-3" />
              <th className="text-right text-sm font-medium text-[#00A86B] px-6 py-3">Reactivar</th>
              <th className="text-right text-sm font-medium text-gray-500 px-6 py-3">Ads nuevos</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-50">
              <td className="text-sm text-gray-700 px-6 py-3">Costo total</td>
              <td className="text-sm text-gray-900 text-right px-6 py-3">{formatUSD(r.costoTotalConHaiku)}</td>
              <td className="text-sm text-gray-900 text-right px-6 py-3">{formatUSD(r.costoEquivalenteAds)}</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="text-sm text-gray-700 px-6 py-3">Leads</td>
              <td className="text-sm text-gray-900 text-right px-6 py-3">{r.leadsRecuperados}</td>
              <td className="text-sm text-gray-900 text-right px-6 py-3">{r.leadsRecuperados}</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="text-sm text-gray-700 px-6 py-3">Costo por lead</td>
              <td className={`text-sm text-right px-6 py-3 font-semibold ${
                r.costoPorLeadReactivado < r.cpl ? 'text-emerald-600' : 'text-amber-600'
              }`}>{formatUSD(r.costoPorLeadReactivado)}</td>
              <td className="text-sm text-gray-900 text-right px-6 py-3">{formatUSD(r.cpl)}</td>
            </tr>
            <tr className="border-b border-gray-50">
              <td className="text-sm font-semibold text-gray-900 px-6 py-3">Ingresos potenciales</td>
              <td className="text-sm font-semibold text-[#00A86B] text-right px-6 py-3">{formatUSD(r.ingresosRecuperacion)}</td>
              <td className="text-sm font-semibold text-gray-900 text-right px-6 py-3">{formatUSD(r.ingresosRecuperacion)}</td>
            </tr>
            {r.ahorro > 0 && (
              <tr className="bg-emerald-50">
                <td className="text-sm font-semibold text-emerald-800 px-6 py-4" colSpan={1}>
                  Te ahorras
                </td>
                <td className="text-right px-6 py-4" colSpan={2}>
                  <span className="text-2xl font-bold text-emerald-700">
                    {formatUSD(r.ahorro)}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>

      {/* 5. Plan recomendado */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-gray-50 rounded-2xl border border-gray-200 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Bot className="text-[#00A86B]" size={22} />
          <h4 className="text-lg font-bold text-gray-900">
            Plan recomendado: Haiku {r.plan.nombre}
          </h4>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between py-1">
            <span className="text-sm text-gray-600">Plan base ({r.plan.templatesIncluidos.toLocaleString()} templates incluidos)</span>
            <span className="text-sm text-gray-900">${r.plan.precioBase}/mes</span>
          </div>
          {r.plan.bloquesExtra > 0 && (
            <div className="flex justify-between py-1">
              <span className="text-sm text-gray-600">
                {r.plan.bloquesExtra} bloque{r.plan.bloquesExtra > 1 ? 's' : ''} extra ({(r.plan.templatesNecesarios - r.plan.templatesIncluidos).toLocaleString()} templates adicionales)
              </span>
              <span className="text-sm text-gray-900">${r.plan.costoBloquesExtra}/mes</span>
            </div>
          )}
          <div className="flex justify-between py-1">
            <span className="text-sm text-gray-600">Costo de envío Meta</span>
            <span className="text-sm text-gray-900">{formatUSD(r.costoEnvio)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-200 mt-2 font-semibold">
            <span className="text-sm text-gray-900">Inversión total</span>
            <span className="text-sm text-gray-900">{formatUSD(r.costoTotalConHaiku)}</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Haiku gestiona el envío y te da el dashboard para ver resultados en tiempo real.
        </p>
      </motion.div>

      {/* 6. CTA */}
      <div className="text-center space-y-4 pt-4">
        <a
          href="/#agendar"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#00A86B] text-white font-semibold rounded-full hover:bg-[#009160] transition-all text-lg"
        >
          Quiero reactivar mi base
          <ArrowRight size={20} />
        </a>
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
