'use client';

import { AnimatedSection } from './AnimatedSection';
import { Star } from 'lucide-react';

// TODO: Reemplazar con testimonios reales
const testimonials = [
  {
    name: 'María Rodríguez',
    role: 'CEO, Estudio Creativo',
    initials: 'MR',
    quote: 'Haiku transformó por completo nuestra operación. Lo que antes nos tomaba horas ahora se hace solo. Increíble.',
    stars: 5,
  },
  {
    name: 'Carlos Mendoza',
    role: 'Fundador, TechPeru',
    initials: 'CM',
    quote: 'La implementación fue rapidísima. En una semana ya teníamos todo automatizado y los resultados se notaron de inmediato.',
    stars: 5,
  },
  {
    name: 'Ana Gutiérrez',
    role: 'Directora de Operaciones',
    initials: 'AG',
    quote: 'Lo mejor es el soporte. Siempre están ahí para ayudarte y las soluciones son personalizadas para tu negocio.',
    stars: 5,
  },
  {
    name: 'Diego Salazar',
    role: 'Emprendedor Digital',
    initials: 'DS',
    quote: 'Los recursos gratuitos ya valen oro. Cuando pasamos a la implementación completa, el ROI fue inmediato.',
    stars: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
            Testimonios
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-haiku-black">
            Lo que dicen nuestros clientes
          </h2>
        </AnimatedSection>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <AnimatedSection
              key={t.name}
              delay={i * 0.1}
              direction={i % 2 === 0 ? 'left' : 'right'}
            >
              <div className="bg-white rounded-[24px] p-8 shadow-lg h-full">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-haiku-mint/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-haiku-mint">{t.initials}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-haiku-black text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
