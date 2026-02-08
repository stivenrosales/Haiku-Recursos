'use client';

import { AnimatedSection } from './AnimatedSection';
import { CounterAnimation } from './CounterAnimation';
import { Building2, TrendingUp, ThumbsUp, Activity } from 'lucide-react';

const stats = [
  { target: 50, suffix: '+', label: 'Negocios Activos', icon: Building2 },
  { target: 40, suffix: '%', label: 'Más Conversiones', icon: TrendingUp },
  { target: 100, suffix: '%', label: 'Clientes Satisfechos', icon: ThumbsUp },
  { label: '24/7', sublabel: 'Agente IA Activo', icon: Activity, isStatic: true },
];

export function SocialProof() {
  return (
    <section className="py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="bg-white rounded-[24px] shadow-lg p-6 lg:p-8 text-center">
                <stat.icon className="w-6 h-6 text-haiku-mint mx-auto mb-3" />
                <div className="text-3xl lg:text-4xl font-display font-bold text-haiku-black mb-1">
                  {stat.isStatic ? (
                    stat.label
                  ) : (
                    <CounterAnimation target={stat.target!} suffix={stat.suffix} />
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {stat.isStatic ? stat.sublabel : stat.label}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
