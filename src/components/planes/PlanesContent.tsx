'use client';

import { AnimatedSection } from '../landing/AnimatedSection';
import {
  MessageCircle,
  Calendar,
  Users,
  TrendingUp,
  Check,
  Phone,
  Mail,
  Wrench,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

/* ── Promise Strip cards ── */
const promises = [
  {
    icon: MessageCircle,
    title: 'Responde 24/7',
    description: 'Tu bot atiende mientras duermes',
  },
  {
    icon: Calendar,
    title: 'Agenda Citas',
    description: 'Consulta disponibilidad y crea citas solo',
  },
  {
    icon: Users,
    title: 'Registra Leads',
    description: 'Cada contacto va directo a tu CRM',
  },
  {
    icon: TrendingUp,
    title: 'Más Ventas',
    description: 'Respuesta inmediata = más cierres',
  },
];

/* ── Plans ── */
const planPro = {
  name: 'Plan Pro',
  tagline: '"Tu Negocio Atiende Solo"',
  price: '597',
  description:
    'Para negocios que pierden clientes porque no responden a tiempo. El bot atiende 24/7 sin intervención humana.',
  features: [
    { text: '1 bot de WhatsApp con IA', highlight: true, suffix: ' conectado a 1 número' },
    { text: 'Hasta 300 conversaciones IA', highlight: true, suffix: ' al mes' },
    { text: '500 templates', highlight: true, suffix: ' de remarketing (confirmaciones, recordatorios, follow-ups)' },
    { text: '3 agentes humanos', highlight: true, suffix: ' en Chatwoot para escalamiento' },
    { text: 'Integración CRM (Google Sheets o Airtable) — cada lead se registra automáticamente', highlight: false, suffix: '' },
    { text: 'Agendamiento automático', highlight: true, suffix: ' con Google Calendar' },
    { text: 'Dashboard con métricas esenciales (conversaciones, leads, consumo)', highlight: false, suffix: '' },
    { text: 'Soporte lunes a viernes en horario laboral', highlight: false, suffix: '' },
  ],
  cta: 'Empezar con Pro',
  setup: 'Setup gratis para los primeros 10 clientes (compromiso mín. 3 meses). Después S/ 997 o gratis con compromiso de 4 meses.',
};

const planScale = {
  name: 'Plan Scale',
  tagline: '"Tu Negocio Vende Solo"',
  price: '1,097',
  description:
    'Para negocios en crecimiento que necesitan no solo atender, sino vender activamente. El bot persigue leads y hace remarketing inteligente.',
  features: [
    { text: 'Hasta 1,000 conversaciones IA', highlight: true, suffix: ' al mes' },
    { text: '1,500 templates', highlight: true, suffix: ' de remarketing' },
    { text: 'Agentes ilimitados', highlight: true, suffix: ' en Chatwoot' },
    { text: 'Envío de imágenes y PDFs', highlight: true, suffix: ' dentro del chat (catálogos, fotos de productos)' },
    { text: 'Secuencias de follow-up', highlight: true, suffix: ' automatizadas (cadenas de 3-5 mensajes programados)' },
    { text: 'Dashboard avanzado', highlight: true, suffix: ' con métricas por vendedor' },
    { text: 'Soporte prioritario', highlight: true, suffix: ' — respuesta en 4 horas' },
    { text: 'Optimización mensual', highlight: true, suffix: ' — revisión de conversaciones y mejora de prompts' },
  ],
  cta: 'Empezar con Scale',
  setup: 'Setup gratis para los primeros 10 clientes (compromiso 3 meses). Después S/ 1,997 o gratis con compromiso de 6 meses.',
};

const planEnterprise = {
  name: 'Plan Enterprise',
  tagline: '"A tu medida"',
  description:
    'Para empresas con alto volumen que necesitan una solución hecha a medida con integraciones avanzadas.',
  features: [
    { text: 'Volumen de conversaciones: ', highlight: false, suffix: 'S/ 0.50–0.80 por conversación según escala' },
    { text: 'Volumen de templates: ', highlight: false, suffix: 'S/ 0.35 por template' },
    { text: 'Integraciones custom', highlight: true, suffix: ' con ERPs y APIs (S/ 500–1,500 setup único)' },
    { text: 'Soporte estándar incluido', highlight: false, suffix: '' },
    { text: 'Soporte prioritario: ', highlight: false, suffix: '+S/ 297/mes' },
    { text: 'Soporte dedicado (1h respuesta): ', highlight: false, suffix: '+S/ 597/mes' },
  ],
  cta: 'Solicitar Cotización',
};

/* ── Add-ons ── */
const addons = [
  {
    icon: Phone,
    title: 'Bot adicional',
    description: 'Para otra línea, sucursal o marca. Misma configuración, diferente número.',
    price: '+S/ 397',
    unit: '/mes',
  },
  {
    icon: MessageCircle,
    title: '+100 conversaciones',
    description: 'Bloque extra de 100 conversaciones con IA para cuando necesites más capacidad.',
    price: 'S/ 97',
    unit: '/bloque',
  },
  {
    icon: Mail,
    title: '+500 templates',
    description: 'Bloque extra de 500 templates de remarketing para campañas más grandes.',
    price: 'S/ 197',
    unit: '/bloque',
  },
  {
    icon: Wrench,
    title: 'Workflow personalizado',
    description: 'Automatización a medida. Integraciones custom, lógica compleja, lo que necesites.',
    price: 'S/ 500–1,500',
    unit: '/proyecto',
  },
];

/* ── Feature check item ── */
function FeatureItem({ text, highlight, suffix }: { text: string; highlight: boolean; suffix: string }) {
  return (
    <li className="flex items-start gap-3">
      <Check className="w-5 h-5 text-haiku-mint flex-shrink-0 mt-0.5" strokeWidth={2.5} />
      <span className="text-sm leading-relaxed">
        {highlight ? <span className="font-semibold">{text}</span> : text}
        {suffix}
      </span>
    </li>
  );
}

export function PlanesContent() {
  return (
    <>
      {/* ── NAV (simple for /planes) ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-haiku-beige/85 backdrop-blur-xl border-b border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16">
          <a href="/" className="font-display text-2xl font-bold text-haiku-black">
            Haiku Business
          </a>
          <a
            href="/#contacto"
            className="px-6 py-2.5 bg-haiku-mint text-white text-sm font-semibold rounded-full hover:bg-[#009160] transition-colors"
          >
            Agenda una Demo
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 text-center relative overflow-hidden">
        {/* Radial glow */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(0,168,107,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-haiku-mint/10 rounded-full mb-6">
              <span className="w-2 h-2 bg-haiku-mint rounded-full animate-pulse" />
              <span className="text-sm font-medium text-haiku-mint">Bots de WhatsApp con IA</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-haiku-black leading-[1.1] mb-5">
              Tu WhatsApp{' '}
              <span className="text-haiku-mint">
                atiende, vende
                <br className="hidden sm:block" /> y cierra
              </span>{' '}
              por ti.
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Un bot con inteligencia artificial que responde 24/7, agenda citas, registra leads y persigue ventas. Sin que tú intervengas.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#planes"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-haiku-mint text-white text-lg font-semibold rounded-full hover:bg-[#009160] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,168,107,0.3)] transition-all"
              >
                Ver Planes
                <ChevronDown className="w-5 h-5" />
              </a>
              <a
                href="/#contacto"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-haiku-black text-haiku-black text-lg font-semibold rounded-full hover:bg-haiku-black hover:text-white hover:-translate-y-0.5 transition-all"
              >
                Agenda tu Demo Gratis
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROMISE STRIP ── */}
      <section className="pb-12 lg:pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {promises.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.08}>
                <div className="bg-white rounded-[24px] p-8 text-center shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all">
                  <div className="w-12 h-12 bg-haiku-mint/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <p.icon className="w-6 h-6 text-haiku-mint" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-haiku-black mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-500">{p.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING PLANS ── */}
      <section id="planes" className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
                Planes
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-haiku-black leading-[1.15] mb-4">
                Elige el plan que hace crecer tu negocio
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Setup gratis para los primeros 10 clientes. Sin sorpresas, sin letra chica.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* ── PLAN PRO ── */}
            <AnimatedSection delay={0.05}>
              <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_16px_56px_rgba(0,0,0,0.12)] transition-all overflow-hidden border-2 border-haiku-mint">
                <div className="p-7 pb-6">
                  <h3 className="font-display text-xl font-bold text-haiku-black mb-1">{planPro.name}</h3>
                  <p className="text-sm text-gray-500 italic mb-5">{planPro.tagline}</p>
                  <div className="font-display text-5xl font-bold text-haiku-black leading-none">
                    <span className="text-xl font-semibold align-super mr-0.5">S/</span>
                    {planPro.price}
                    <span className="text-base font-normal text-gray-500">/mes</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{planPro.description}</p>
                </div>

                <hr className="border-gray-200 mx-7" />

                <ul className="p-7 space-y-3.5">
                  {planPro.features.map((f) => (
                    <FeatureItem key={f.text} {...f} />
                  ))}
                </ul>

                <div className="px-7 pb-7">
                  <a
                    href="/#contacto"
                    className="flex items-center justify-center w-full px-6 py-3.5 bg-haiku-mint text-white font-semibold rounded-full hover:bg-[#009160] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,168,107,0.3)] transition-all"
                  >
                    {planPro.cta}
                  </a>
                  <div className="mt-4 p-3.5 bg-gray-50 border border-gray-200 rounded-xl">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <span className="font-semibold text-haiku-black">Setup gratis</span>{' '}
                      {planPro.setup.replace('Setup gratis ', '')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* ── PLAN SCALE ── */}
            <AnimatedSection delay={0.15}>
              <div className="bg-haiku-black rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 hover:shadow-[0_16px_56px_rgba(0,0,0,0.12)] transition-all overflow-hidden relative">
                <span className="absolute top-4 right-4 px-3.5 py-1.5 bg-haiku-mint text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                  Más Popular
                </span>

                <div className="p-7 pb-6">
                  <h3 className="font-display text-xl font-bold text-white mb-1">{planScale.name}</h3>
                  <p className="text-sm text-white/50 italic mb-5">{planScale.tagline}</p>
                  <div className="font-display text-5xl font-bold text-white leading-none">
                    <span className="text-xl font-semibold align-super mr-0.5">S/</span>
                    {planScale.price}
                    <span className="text-base font-normal text-white/40">/mes</span>
                  </div>
                  <p className="text-sm text-white/50 mt-3 leading-relaxed">{planScale.description}</p>
                </div>

                <hr className="border-white/10 mx-7" />

                <ul className="p-7 space-y-3.5 text-white/70">
                  <li>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-haiku-mint/15 text-haiku-mint text-xs font-semibold rounded-full mb-3">
                      <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                      Todo lo del Plan Pro +
                    </span>
                  </li>
                  {planScale.features.map((f) => (
                    <FeatureItem key={f.text} {...f} />
                  ))}
                </ul>

                <div className="px-7 pb-7">
                  <a
                    href="/#contacto"
                    className="flex items-center justify-center w-full px-6 py-3.5 bg-white text-haiku-black font-semibold rounded-full hover:bg-gray-100 hover:-translate-y-0.5 transition-all"
                  >
                    {planScale.cta}
                  </a>
                  <div className="mt-4 p-3.5 bg-white/5 border border-white/10 rounded-xl">
                    <p className="text-xs text-white/60 leading-relaxed">
                      <span className="font-semibold text-white">Setup gratis</span>{' '}
                      {planScale.setup.replace('Setup gratis ', '')}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* ── PLAN ENTERPRISE ── */}
            <AnimatedSection delay={0.25}>
              <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_16px_56px_rgba(0,0,0,0.12)] transition-all overflow-hidden">
                <div className="p-7 pb-6">
                  <h3 className="font-display text-xl font-bold text-haiku-black mb-1">{planEnterprise.name}</h3>
                  <p className="text-sm text-gray-500 italic mb-5">{planEnterprise.tagline}</p>
                  <div className="font-display text-3xl font-bold text-haiku-black leading-none">
                    Cotización<span className="text-base font-normal text-gray-500"> personalizada</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{planEnterprise.description}</p>
                </div>

                <hr className="border-gray-200 mx-7" />

                <ul className="p-7 space-y-3.5">
                  {planEnterprise.features.map((f) => (
                    <FeatureItem key={f.text} {...f} />
                  ))}
                </ul>

                <div className="px-7 pb-7">
                  <a
                    href="/#contacto"
                    className="flex items-center justify-center w-full px-6 py-3.5 border-2 border-haiku-black text-haiku-black font-semibold rounded-full hover:bg-haiku-black hover:text-white hover:-translate-y-0.5 transition-all"
                  >
                    {planEnterprise.cta}
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* ── ENTERPRISE BANNER ── */}
          <AnimatedSection delay={0.1}>
            <div className="mt-10 bg-gradient-to-br from-haiku-black to-[#2D2D2D] rounded-[24px] p-8 sm:p-12 text-center text-white relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -right-[100px] -top-[100px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,168,107,0.15)_0%,transparent_70%)] pointer-events-none" />

              <div className="relative z-10">
                <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                  ¿Necesitas algo más personalizado?
                </h3>
                <p className="text-white/60 leading-relaxed max-w-xl mx-auto mb-8">
                  En Enterprise, todo se ajusta a tu operación. Cuéntanos tu volumen y diseñamos la solución perfecta para tu negocio.
                </p>
                <a
                  href="/#contacto"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-haiku-black text-lg font-semibold rounded-full hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all"
                >
                  Cotizar Enterprise
                  <ArrowRight className="w-5 h-5" />
                </a>
                <p className="text-white/50 text-sm mt-4">Respondemos en menos de 24h</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
                Add-ons
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-haiku-black leading-[1.15] mb-4">
                Potencia tu plan a tu ritmo
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto">
                Se suman a cualquier plan. Actívalos cuando los necesites.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {addons.map((addon, i) => (
              <AnimatedSection key={addon.title} delay={i * 0.08}>
                <div className="bg-white rounded-[24px] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.1)] transition-all flex flex-col h-full">
                  <div className="w-11 h-11 bg-haiku-mint/10 rounded-[14px] flex items-center justify-center mb-4">
                    <addon.icon className="w-5 h-5 text-haiku-mint" />
                  </div>
                  <h4 className="font-display text-base font-semibold text-haiku-black mb-2">
                    {addon.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{addon.description}</p>
                  <p className="font-display text-xl font-bold text-haiku-mint">
                    {addon.price}{' '}
                    <span className="text-sm font-normal text-gray-500">{addon.unit}</span>
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXCEDENTES ── */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="bg-white rounded-[24px] p-8 sm:p-10 lg:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.06)] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-haiku-black mb-3">
                  Tu bot nunca se apaga
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Si superas tu límite, el sistema{' '}
                  <strong className="text-haiku-black">sigue funcionando</strong>. Las conversaciones
                  extra se cobran automáticamente en tu siguiente factura a{' '}
                  <strong className="text-haiku-black">S/ 97 por bloque de 100</strong>. Sin
                  interrupciones, sin sorpresas.
                </p>
              </div>

              <div className="space-y-4">
                {/* 80% alert */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF8ED] border border-[#F5D98B]">
                  <span className="font-display text-2xl font-bold text-[#D97706] min-w-[60px]">
                    80%
                  </span>
                  <span className="text-sm text-gray-600">
                    Alerta en tu dashboard:{' '}
                    <strong className="text-haiku-black">te acercas al límite</strong>
                  </span>
                </div>

                {/* 100% alert */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF0F0] border border-[#F5A3A3]">
                  <span className="font-display text-2xl font-bold text-[#DC2626] min-w-[60px]">
                    100%
                  </span>
                  <span className="text-sm text-gray-600">
                    Notificación:{' '}
                    <strong className="text-haiku-black">
                      conversaciones extra se cobran por bloque
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <AnimatedSection>
            <div className="bg-haiku-mint rounded-[24px] py-16 sm:py-20 px-8 sm:px-12 text-center relative overflow-hidden">
              {/* Decorative glows */}
              <div className="absolute -top-[150px] -right-[150px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,transparent_70%)] pointer-events-none" />
              <div className="absolute -bottom-[100px] -left-[100px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(0,0,0,0.08)_0%,transparent_70%)] pointer-events-none" />

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 relative">
                ¿Listo para que tu WhatsApp venda solo?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8 relative">
                Agenda una demo gratuita. Te mostramos cómo funciona con tu negocio real en 30 minutos.
              </p>
              <a
                href="/#contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-haiku-mint text-lg font-semibold rounded-full hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-all relative"
              >
                Agenda tu Demo Gratis
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-white/55 mt-5 relative">
                Sin compromiso. Respondemos en menos de 24 horas.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
