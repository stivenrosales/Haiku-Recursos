'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect, useState } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { Calendar, Loader2 } from 'lucide-react';

export function CalendarSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: {
            'cal-brand': '#00A86B',
            'cal-brand-emphasis': '#009160',
            'cal-brand-text': '#ffffff',
            'cal-text': '#171717',
            'cal-text-emphasis': '#171717',
            'cal-border-emphasis': '#e5e5e5',
            'cal-bg': 'transparent',
            'cal-bg-emphasis': '#f5f5f0',
          },
          dark: {
            'cal-brand': '#00A86B',
            'cal-brand-emphasis': '#009160',
            'cal-brand-text': '#ffffff',
          },
        },
        hideEventTypeDetails: false,
      });
      // Give the iframe a moment to render after API is ready
      setTimeout(() => setLoaded(true), 1500);
    })();
  }, []);

  return (
    <section id="agendar" className="scroll-mt-20 py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-haiku-beige via-white/60 to-haiku-beige pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <AnimatedSection>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-haiku-mint/10 rounded-full mb-5">
              <span className="w-2 h-2 bg-haiku-mint rounded-full animate-pulse" />
              <span className="text-sm font-medium text-haiku-mint">
                Agenda en menos de 1 minuto
              </span>
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-haiku-black leading-tight mb-4">
              Hablemos de tu WhatsApp
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              30 minutos donde revisamos tu proceso de ventas y te muestro qué
              automatizar. Sin compromiso.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="rounded-3xl bg-white shadow-xl shadow-haiku-mint/5 border border-gray-100 overflow-visible relative pt-10">
            {/* Skeleton loader */}
            {!loaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white min-h-[500px]">
                <div className="w-14 h-14 rounded-2xl bg-haiku-mint/10 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-haiku-mint" />
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Cargando calendario...</span>
                </div>
              </div>
            )}
            <Cal
              calLink="stiven-rosales-htfs7i/asesoria"
              style={{ width: '100%', height: '100%', overflow: 'auto' }}
              config={{
                layout: 'month_view',
                theme: 'light',
              }}
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
