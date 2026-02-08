'use client';

import { AnimatedSection } from './AnimatedSection';
import { Clock, MessageCircle, TrendingUp, Bot, Zap, BarChart3 } from 'lucide-react';

const benefits = [
  {
    icon: MessageCircle,
    title: 'Ventas en Automático',
    description: 'Tu agente IA atiende, califica y cierra ventas por WhatsApp, Instagram y Messenger sin intervención.',
  },
  {
    icon: Clock,
    title: 'Respuesta Instantánea',
    description: 'Responde en segundos, no en horas. El 78% de clientes compra al primero que contesta.',
  },
  {
    icon: TrendingUp,
    title: 'Escala Sin Límites',
    description: 'Atiende 100 conversaciones simultáneas. Tu negocio crece sin contratar más personal.',
  },
  {
    icon: Bot,
    title: 'IA que Aprende',
    description: 'Se adapta a tu negocio, tono y productos. Cada conversación la hace más inteligente.',
  },
  {
    icon: Zap,
    title: 'Activo en 1 Semana',
    description: 'Implementación rápida. En 7 días tu agente ya está vendiendo por ti.',
  },
  {
    icon: BarChart3,
    title: 'Métricas en Tiempo Real',
    description: 'Mide conversiones, tiempo de respuesta y ventas cerradas desde tu dashboard.',
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
            Por Qué Haiku Business
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-haiku-black">
            Vende más, sin esfuerzo
          </h2>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => (
            <AnimatedSection key={benefit.title} delay={i * 0.08}>
              <div className="bg-haiku-beige rounded-[24px] p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="w-12 h-12 rounded-2xl bg-haiku-mint/10 flex items-center justify-center mb-5">
                  <benefit.icon className="w-6 h-6 text-haiku-mint" />
                </div>
                <h3 className="font-display text-xl font-semibold text-haiku-black mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
