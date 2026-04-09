'use client';

import { useState } from 'react';
import { AnimatedSection } from '../landing/AnimatedSection';
import {
  MessageCircle,
  Users,
  Send,
  BarChart3,
  Tags,
  Brain,
  Megaphone,
  Bot,
  UserCheck,
  RefreshCw,
  Check,
  ChevronDown,
  ArrowLeft,
  Clock,
  TrendingUp,
  Zap,
  MessageSquare,
} from 'lucide-react';

const WA_URL = 'https://wa.me/51994122404?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20Haiku%20Fin';

/* -- Metrics -- */
const metrics = [
  {
    icon: Clock,
    value: '11 seg',
    label: 'Tiempo de respuesta de la IA',
    detail: 'vs +40 horas promedio del sector',
    source: 'Chatbot.com 2026',
  },
  {
    icon: TrendingUp,
    value: '391%',
    label: 'Más conversión',
    detail: 'cuando respondés en menos de 1 minuto',
    source: 'Velocify Research',
  },
  {
    icon: Zap,
    value: '60x',
    label: 'Más probable calificar un lead',
    detail: 'si respondés en menos de 1 hora vs 24 horas',
    source: 'Harvard Business Review',
  },
  {
    icon: MessageSquare,
    value: '82%',
    label: 'Prefieren chat inmediato',
    detail: 'a esperar por un humano',
    source: 'Chatbot Statistics 2026',
  },
];

/* -- How it works steps -- */
const steps = [
  {
    icon: Megaphone,
    number: '01',
    title: 'Lanzás tu campaña',
    description:
      'Enviá mensajes masivos a miles de personas con plantillas aprobadas por Meta. Sin baneo, sin riesgo.',
  },
  {
    icon: Bot,
    number: '02',
    title: 'La IA atiende y precalifica',
    description:
      'El agente conversa naturalmente, pide documentos, consulta Equifax y determina si el lead es viable. Todo automático.',
  },
  {
    icon: UserCheck,
    number: '03',
    title: 'El analista recibe leads listos',
    description:
      'Solo llegan personas precalificadas. El analista ve la conversación completa, documentos y score en la plataforma.',
  },
  {
    icon: RefreshCw,
    number: '04',
    title: 'Seguimiento automático',
    description:
      'Si el lead no responde, la IA hace seguimiento inteligente. Si no hay interés, lo etiqueta como perdido. Sin esfuerzo manual.',
  },
];

/* -- Platform features -- */
const features = [
  {
    icon: MessageCircle,
    title: 'Conversaciones en vivo',
    description:
      'Mirá cada conversación de la IA con los leads en tiempo real. El analista puede intervenir cuando quiera.',
  },
  {
    icon: Users,
    title: 'Asignación de analistas',
    description:
      'Cada lead precalificado se asigna automáticamente al analista correspondiente.',
  },
  {
    icon: Send,
    title: 'Mensajes masivos',
    description:
      'Espacio dedicado para que el equipo comercial lance campañas con plantillas aprobadas por Meta.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard de campañas',
    description:
      'Cuántas personas llegan, cuántas precalifican, cuántas se pierden. Métricas en tiempo real.',
  },
  {
    icon: Tags,
    title: 'Etiquetas personalizables',
    description:
      'Clasificá leads como quieras: interesado, precalificado, documentos pendientes, perdido. Todo gestionable.',
  },
  {
    icon: Brain,
    title: 'IA que conversa, no que recita',
    description:
      'No es un bot de respuestas estáticas. Conversa, agenda, consulta Equifax, guarda documentos y toma decisiones.',
  },
];

/* -- Plan features -- */
const planFeatures = [
  'Agente IA en WhatsApp 24/7',
  'Precalificación automática de leads',
  'Consultas a Equifax (usamos tu cuenta existente)',
  'Recepción y almacenamiento de documentos',
  'Seguimientos automáticos',
  'Plataforma completa (conversaciones, asignación, etiquetas, dashboard)',
  'Analistas ilimitados',
  'Capacitación totalmente gratis',
  'Configuración incluida',
];

/* -- Consumption costs -- */
const consumptionCosts = [
  { concept: 'Conversación IA (vía OpenRouter)', unit: '~S/ 0.057', bulk: '~S/ 57' },
  { concept: 'Plantilla marketing (campañas masivas)', unit: '~S/ 0.27', bulk: '~S/ 267' },
  { concept: 'Plantilla utilidad (confirmaciones, recordatorios)', unit: '~S/ 0.076', bulk: '~S/ 76' },
];

/* -- FAQ -- */
const faqs = [
  {
    question: '¿Qué necesito para empezar?',
    answer:
      'Solo tu número de WhatsApp Business y acceso a tu cuenta de Equifax. Nosotros nos encargamos de toda la configuración técnica y capacitación de tu equipo. Las consultas a Equifax corren por tu cuenta existente — no hay costo adicional por nuestra parte.',
  },
  {
    question: '¿La IA realmente conversa o solo manda respuestas automáticas?',
    answer:
      'Conversa. No es un bot de menú. El agente entiende contexto, hace preguntas, pide documentos, consulta Equifax y toma decisiones como lo haría un analista junior.',
  },
  {
    question: '¿Qué pasa si el lead quiere hablar con un humano?',
    answer:
      'El analista asignado puede intervenir en cualquier momento desde la plataforma, o contactar al lead directamente desde su número personal.',
  },
  {
    question: '¿Los mensajes masivos no hacen que me baneen?',
    answer:
      'No. Usamos plantillas aprobadas por Meta a través de la API oficial de WhatsApp Business. Es el canal legítimo, no es spam.',
  },
  {
    question: '¿Cómo se paga el consumo de IA y plantillas?',
    answer:
      'El plan base es S/ 500/mes fijo. Para la IA, te creamos una cuenta en OpenRouter donde gestionás tu propio consumo directamente. Las plantillas de WhatsApp se facturan mensualmente — te informamos cuánto fue el uso del mes.',
  },
  {
    question: '¿Incluye capacitación?',
    answer:
      'Sí, totalmente gratis. Te enseñamos a usar la plataforma, gestionar etiquetas, lanzar campañas y sacarle el máximo provecho al agente IA.',
  },
];

export function FinancierasContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* -- NAV -- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-haiku-beige/85 backdrop-blur-xl border-b border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2 group">
            <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-haiku-mint transition-colors" />
            <span className="font-display text-2xl font-bold text-haiku-black">Haiku Fin</span>
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-haiku-mint text-white text-sm font-semibold rounded-full hover:bg-[#009160] transition-colors"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </nav>

      {/* -- HERO -- */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 text-center relative overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,168,107,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-haiku-mint/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-haiku-mint rounded-full animate-pulse" />
              <span className="text-sm font-medium text-haiku-mint">WhatsApp IA para Financieras</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-haiku-black leading-[1.1] mb-5">
              Tus analistas deberían{' '}
              <span className="text-haiku-mint">
                cerrar créditos,
                <br className="hidden sm:block" /> no filtrar curiosos.
              </span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Un agente de IA en WhatsApp que precalifica leads, consulta en Equifax,
              recopila documentos y hace seguimiento automático. Tus analistas solo
              reciben personas listas para cerrar.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-haiku-mint text-white text-lg font-semibold rounded-full hover:bg-[#009160] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,168,107,0.3)] transition-all"
              >
                Escríbenos por WhatsApp
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-haiku-black text-haiku-black text-lg font-semibold rounded-full hover:bg-haiku-black hover:text-white hover:-translate-y-0.5 transition-all"
              >
                Ver cómo funciona
                <ChevronDown className="w-5 h-5 ml-2" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* -- METRICS -- */}
      <section className="pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {metrics.map((m, i) => (
              <AnimatedSection key={m.value} delay={i * 0.08}>
                <div className="bg-white rounded-[24px] p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all">
                  <div className="w-12 h-12 bg-haiku-mint/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <m.icon className="w-6 h-6 text-haiku-mint" />
                  </div>
                  <p className="font-display text-3xl font-bold text-haiku-black mb-1">
                    {m.value}
                  </p>
                  <h3 className="font-display text-sm font-semibold text-haiku-black mb-1">
                    {m.label}
                  </h3>
                  <p className="text-sm text-gray-500">{m.detail}</p>
                  <p className="text-xs text-gray-400 mt-2">{m.source}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* -- HOW IT WORKS -- */}
      <section id="como-funciona" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
                Cómo funciona
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-haiku-black leading-[1.15] mb-4">
                De campaña masiva a crédito cerrado,
                <br className="hidden sm:block" /> sin perder un solo lead
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Todo pasa en WhatsApp. Sin apps extra, sin fricciones.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto">
            {steps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.1}>
                <div className="flex gap-6">
                  {/* Timeline line + dot */}
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-haiku-mint rounded-2xl flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(0,168,107,0.3)]">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-haiku-mint/20 mt-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className={i < steps.length - 1 ? 'pb-10' : ''}>
                    <span className="text-xs font-bold text-haiku-mint uppercase tracking-widest">
                      Paso {step.number}
                    </span>
                    <h3 className="font-display text-xl font-bold text-haiku-black mt-1 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* -- FEATURES -- */}
      <section className="py-16 lg:py-20 bg-haiku-black relative overflow-hidden">
        <div className="absolute top-[-200px] right-[-200px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,168,107,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
                Plataforma
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-4">
                Todo lo que tu equipo comercial necesita,
                <br className="hidden sm:block" /> en un solo lugar
              </h2>
              <p className="text-lg text-gray-400 max-w-xl mx-auto">
                Haiku Fin no es solo un bot. Es tu plataforma completa de gestión comercial.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Conversaciones en vivo */}
            <AnimatedSection delay={0}>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-[24px] p-5 border border-white/[0.08] hover:-translate-y-1 hover:bg-white/[0.1] transition-all h-full">
                {/* Mini mockup: chat inbox */}
                <div className="rounded-xl overflow-hidden mb-4 bg-[#0a0a0a] border border-white/10">
                  <div className="flex h-[180px]">
                    {/* Sidebar */}
                    <div className="w-[72px] bg-[#171717] border-r border-white/10 p-2 space-y-3 flex flex-col items-center pt-3">
                      <div className="w-7 h-7 rounded-lg bg-haiku-mint/20 flex items-center justify-center"><MessageCircle className="w-3.5 h-3.5 text-haiku-mint" /></div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center"><Users className="w-3.5 h-3.5 text-gray-500" /></div>
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center"><BarChart3 className="w-3.5 h-3.5 text-gray-500" /></div>
                    </div>
                    {/* Chat list */}
                    <div className="w-[120px] border-r border-white/10 p-2 space-y-1.5">
                      <div className="rounded-lg bg-haiku-mint/10 p-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-haiku-mint/30 shrink-0" />
                          <div className="w-12 h-2 rounded bg-white/30" />
                        </div>
                        <div className="w-16 h-1.5 rounded bg-white/10 mt-1 ml-6" />
                      </div>
                      <div className="rounded-lg p-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-blue-500/30 shrink-0" />
                          <div className="w-10 h-2 rounded bg-white/20" />
                        </div>
                        <div className="w-14 h-1.5 rounded bg-white/10 mt-1 ml-6" />
                      </div>
                      <div className="rounded-lg p-1.5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full bg-amber-500/30 shrink-0" />
                          <div className="w-8 h-2 rounded bg-white/20" />
                        </div>
                        <div className="w-12 h-1.5 rounded bg-white/10 mt-1 ml-6" />
                      </div>
                    </div>
                    {/* Chat messages */}
                    <div className="flex-1 p-2 flex flex-col justify-end gap-1.5">
                      <div className="self-start bg-white/10 rounded-lg px-2 py-1 max-w-[80%]">
                        <div className="w-20 h-1.5 rounded bg-white/20" />
                        <div className="w-14 h-1.5 rounded bg-white/10 mt-1" />
                      </div>
                      <div className="self-end bg-haiku-mint/20 rounded-lg px-2 py-1 max-w-[80%]">
                        <div className="w-24 h-1.5 rounded bg-haiku-mint/30" />
                        <div className="w-16 h-1.5 rounded bg-haiku-mint/15 mt-1" />
                      </div>
                      <div className="self-start bg-white/10 rounded-lg px-2 py-1">
                        <div className="w-16 h-1.5 rounded bg-white/20" />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">Conversaciones en vivo</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Mirá cada conversación de la IA con los leads en tiempo real. El analista puede intervenir cuando quiera.</p>
              </div>
            </AnimatedSection>

            {/* Asignación de analistas */}
            <AnimatedSection delay={0.08}>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-[24px] p-5 border border-white/[0.08] hover:-translate-y-1 hover:bg-white/[0.1] transition-all h-full">
                {/* Mini mockup: leads table with assignment */}
                <div className="rounded-xl overflow-hidden mb-4 bg-[#0a0a0a] border border-white/10 p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-2 rounded bg-white/20" />
                    <div className="flex gap-1">
                      <div className="px-2 py-0.5 rounded-full bg-haiku-mint/20 w-14 h-4" />
                      <div className="px-2 py-0.5 rounded-full bg-white/10 w-12 h-4" />
                    </div>
                  </div>
                  {[
                    { color: 'bg-teal-500/30', status: 'bg-emerald-500', name: 'w-16', analyst: 'Carlos M.' },
                    { color: 'bg-blue-500/30', status: 'bg-blue-500', name: 'w-12', analyst: 'Ana R.' },
                    { color: 'bg-amber-500/30', status: 'bg-amber-500', name: 'w-14', analyst: 'Carlos M.' },
                    { color: 'bg-violet-500/30', status: 'bg-violet-500', name: 'w-10', analyst: 'Luis P.' },
                  ].map((row, j) => (
                    <div key={j} className="flex items-center gap-2 py-2 border-b border-white/5 last:border-0">
                      <div className={`w-6 h-6 rounded-full ${row.color} shrink-0`} />
                      <div className={`${row.name} h-2 rounded bg-white/20 flex-shrink-0`} />
                      <div className="flex-1" />
                      <div className={`w-2 h-2 rounded-full ${row.status}`} />
                      <span className="text-[9px] text-gray-400 font-medium">{row.analyst}</span>
                    </div>
                  ))}
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">Asignación de analistas</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Cada lead precalificado se asigna automáticamente al analista correspondiente.</p>
              </div>
            </AnimatedSection>

            {/* Mensajes masivos */}
            <AnimatedSection delay={0.16}>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-[24px] p-5 border border-white/[0.08] hover:-translate-y-1 hover:bg-white/[0.1] transition-all h-full">
                {/* Mini mockup: campaign wizard */}
                <div className="rounded-xl overflow-hidden mb-4 bg-[#0a0a0a] border border-white/10 p-3">
                  {/* Step indicator */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="px-2 py-1 rounded-full bg-haiku-mint text-[8px] text-white font-bold">1 Mensaje</div>
                    <ChevronDown className="w-3 h-3 text-gray-600 -rotate-90" />
                    <div className="px-2 py-1 rounded-full bg-white/10 text-[8px] text-gray-500 font-bold">2 Destino</div>
                    <ChevronDown className="w-3 h-3 text-gray-600 -rotate-90" />
                    <div className="px-2 py-1 rounded-full bg-white/10 text-[8px] text-gray-500 font-bold">3 Enviar</div>
                  </div>
                  {/* Template cards */}
                  <div className="grid grid-cols-2 gap-1.5 mb-2">
                    <div className="rounded-lg border-2 border-haiku-mint bg-haiku-mint/5 p-2">
                      <div className="w-8 h-1.5 rounded bg-haiku-mint/30 mb-1" />
                      <div className="w-full h-1 rounded bg-white/10" />
                      <div className="w-3/4 h-1 rounded bg-white/10 mt-0.5" />
                    </div>
                    <div className="rounded-lg border border-white/10 p-2">
                      <div className="w-10 h-1.5 rounded bg-white/15 mb-1" />
                      <div className="w-full h-1 rounded bg-white/10" />
                      <div className="w-2/3 h-1 rounded bg-white/10 mt-0.5" />
                    </div>
                  </div>
                  {/* WhatsApp preview bubble */}
                  <div className="bg-[#d9fdd3] rounded-lg p-2 ml-4">
                    <div className="w-20 h-1 rounded bg-black/10" />
                    <div className="w-16 h-1 rounded bg-black/10 mt-0.5" />
                    <div className="w-6 h-1 rounded bg-black/5 mt-1 ml-auto" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">Mensajes masivos</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Espacio dedicado para que el equipo comercial lance campañas con plantillas aprobadas por Meta.</p>
              </div>
            </AnimatedSection>

            {/* Dashboard de campañas */}
            <AnimatedSection delay={0.24}>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-[24px] p-5 border border-white/[0.08] hover:-translate-y-1 hover:bg-white/[0.1] transition-all h-full">
                {/* Mini mockup: dashboard with charts */}
                <div className="rounded-xl overflow-hidden mb-4 bg-[#0a0a0a] border border-white/10 p-3">
                  {/* KPI cards */}
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {[
                      { label: 'Leads', value: '847', color: 'text-teal-400' },
                      { label: 'Pre-calif.', value: '63%', color: 'text-emerald-400' },
                      { label: 'Desembolso', value: '28%', color: 'text-violet-400' },
                    ].map((kpi) => (
                      <div key={kpi.label} className="bg-white/5 rounded-lg p-2 text-center">
                        <p className={`text-sm font-bold ${kpi.color}`}>{kpi.value}</p>
                        <p className="text-[8px] text-gray-500">{kpi.label}</p>
                      </div>
                    ))}
                  </div>
                  {/* Mini bar chart */}
                  <div className="flex items-end gap-1 h-[60px] px-1">
                    {[40, 65, 50, 80, 70, 90, 60, 75, 85, 55].map((h, j) => (
                      <div
                        key={j}
                        className="flex-1 bg-gradient-to-t from-haiku-mint/60 to-haiku-mint/20 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">Dashboard de campañas</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Cuántas personas llegan, cuántas precalifican, cuántas se pierden. Métricas en tiempo real.</p>
              </div>
            </AnimatedSection>

            {/* Etiquetas personalizables */}
            <AnimatedSection delay={0.32}>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-[24px] p-5 border border-white/[0.08] hover:-translate-y-1 hover:bg-white/[0.1] transition-all h-full">
                {/* Mini mockup: tags/labels management */}
                <div className="rounded-xl overflow-hidden mb-4 bg-[#0a0a0a] border border-white/10 p-3">
                  <div className="space-y-2">
                    {[
                      { label: 'Precalificado', color: 'bg-emerald-500', count: '124' },
                      { label: 'Docs pendientes', color: 'bg-amber-500', count: '67' },
                      { label: 'En evaluación', color: 'bg-blue-500', count: '45' },
                      { label: 'Aprobado', color: 'bg-violet-500', count: '38' },
                      { label: 'Perdido', color: 'bg-red-500', count: '89' },
                    ].map((tag) => (
                      <div key={tag.label} className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${tag.color}`} />
                        <span className="text-[10px] text-gray-300 flex-1">{tag.label}</span>
                        <span className="text-[10px] text-gray-500 font-medium">{tag.count}</span>
                        <div className="w-16 h-1.5 rounded-full bg-white/10">
                          <div
                            className={`h-full rounded-full ${tag.color}/60`}
                            style={{ width: `${(parseInt(tag.count) / 124) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">Etiquetas personalizables</h3>
                <p className="text-sm text-gray-400 leading-relaxed">Clasificá leads como quieras: interesado, precalificado, documentos pendientes, perdido. Todo gestionable.</p>
              </div>
            </AnimatedSection>

            {/* IA que conversa */}
            <AnimatedSection delay={0.4}>
              <div className="bg-white/[0.06] backdrop-blur-sm rounded-[24px] p-5 border border-white/[0.08] hover:-translate-y-1 hover:bg-white/[0.1] transition-all h-full">
                {/* Mini mockup: AI conversation with actions */}
                <div className="rounded-xl overflow-hidden mb-4 bg-[#0a0a0a] border border-white/10 p-3 space-y-2">
                  {/* User message */}
                  <div className="self-start bg-white/10 rounded-lg px-2.5 py-1.5 max-w-[85%]">
                    <p className="text-[9px] text-gray-300">Hola, quiero info sobre crédito hipotecario</p>
                  </div>
                  {/* Bot response */}
                  <div className="self-end bg-haiku-mint/15 rounded-lg px-2.5 py-1.5 max-w-[85%] ml-auto border border-haiku-mint/20">
                    <p className="text-[9px] text-gray-300">Con gusto te ayudo. Necesito verificar algunos datos. ¿Me compartes tu DNI?</p>
                  </div>
                  {/* User sends doc */}
                  <div className="self-start bg-white/10 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                    <div className="w-5 h-6 rounded bg-blue-500/20 flex items-center justify-center">
                      <span className="text-[6px] text-blue-400 font-bold">PDF</span>
                    </div>
                    <span className="text-[9px] text-gray-400">dni_frente.pdf</span>
                  </div>
                  {/* Bot action */}
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-haiku-mint/10 rounded-lg border border-haiku-mint/20">
                    <div className="w-3.5 h-3.5 rounded-full bg-haiku-mint/30 flex items-center justify-center">
                      <Check className="w-2 h-2 text-haiku-mint" />
                    </div>
                    <span className="text-[8px] text-haiku-mint font-medium">Consultando Equifax...</span>
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1">IA que conversa, no que recita</h3>
                <p className="text-sm text-gray-400 leading-relaxed">No es un bot de respuestas estáticas. Conversa, agenda, consulta Equifax, guarda documentos y toma decisiones.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* -- PRICING -- */}
      <section id="pricing" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
                Precio
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-haiku-black leading-[1.15] mb-4">
                Simple. Un solo plan. Todo ilimitado.
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Sin sorpresas, sin planes confusos. Solo lo que necesitás para vender más.
              </p>
            </div>
          </AnimatedSection>

          <div className="max-w-2xl mx-auto">
            {/* Plan card */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-2 border-haiku-mint overflow-hidden">
                <div className="p-7 pb-6">
                  <h3 className="font-display text-xl font-bold text-haiku-black mb-1">
                    Plan Haiku Fin
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-5">
                    &quot;Solo danos tu WhatsApp. Nosotros configuramos todo.&quot;
                  </p>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-sm text-gray-500">S/</span>
                    <span className="font-display text-5xl font-bold text-haiku-black">500</span>
                    <span className="text-gray-500">/mes</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {planFeatures.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-haiku-mint flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-sm leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-8 py-4 bg-haiku-mint text-white text-lg font-semibold rounded-full hover:bg-[#009160] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,168,107,0.3)] transition-all"
                  >
                    Escríbenos por WhatsApp
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Consumption costs */}
            <AnimatedSection delay={0.2}>
              <div className="mt-8 bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-7">
                <h4 className="font-display text-lg font-bold text-haiku-black mb-1">
                  El uso se paga como la luz
                </h4>
                <p className="text-sm text-gray-500 mb-5">
                  La IA se paga vía OpenRouter (te creamos tu cuenta). Las plantillas se facturan mensualmente.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 font-semibold text-haiku-black">Concepto</th>
                        <th className="text-right py-3 font-semibold text-haiku-black">Por unidad</th>
                        <th className="text-right py-3 font-semibold text-haiku-black">x1,000/mes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {consumptionCosts.map((c) => (
                        <tr key={c.concept} className="border-b border-gray-100">
                          <td className="py-3 text-gray-600">{c.concept}</td>
                          <td className="py-3 text-right text-gray-600">{c.unit}</td>
                          <td className="py-3 text-right font-semibold text-haiku-black">{c.bulk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 p-4 bg-haiku-mint/5 rounded-2xl">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-haiku-black">Ejemplo: </span>
                    Plan + 1,000 conversaciones IA + 1,000 campañas masivas ={' '}
                    <span className="font-bold text-haiku-mint">~S/ 824/mes</span>
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-4">
                  La IA se gestiona desde tu cuenta de OpenRouter. Las plantillas de WhatsApp se facturan mensualmente.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-20">
            <AnimatedSection>
              <div>
                <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
                  FAQ
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-haiku-black leading-[1.15] mb-4">
                  Preguntas frecuentes
                </h2>
                <p className="text-gray-600 mb-6">
                  Todo lo que necesitás saber antes de empezar con Haiku Fin.
                </p>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-haiku-mint text-white font-semibold rounded-full hover:bg-[#009160] transition-colors"
                >
                  Escríbenos por WhatsApp
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="divide-y divide-gray-200">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between py-6 text-left"
                    >
                      <span className="font-semibold text-haiku-black text-base lg:text-lg pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                          openFaq === i ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        openFaq === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-gray-600 leading-relaxed pb-6">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* -- FINAL CTA -- */}
      <section className="py-16 lg:py-20 bg-haiku-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,168,107,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-5">
              Tu próximo cliente ya te escribió.
              <br className="hidden sm:block" />{' '}
              <span className="text-haiku-mint">¿Quién le va a responder?</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
              Dejá que la IA filtre. Tus analistas que cierren.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-haiku-mint text-white text-lg font-semibold rounded-full hover:bg-[#009160] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,168,107,0.3)] transition-all"
            >
              Escríbenos por WhatsApp
              <MessageCircle className="w-5 h-5" />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
