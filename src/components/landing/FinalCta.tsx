'use client';

import { AnimatedSection } from './AnimatedSection';
import { motion } from 'motion/react';


export function FinalCta() {
  return (
    <section className="py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <AnimatedSection>
          <div className="bg-haiku-mint rounded-[24px] px-8 py-16 lg:px-16 lg:py-20 text-center">
            <h2 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">
              ¿Listo para que tu WhatsApp trabaje por ti?
            </h2>
            <p className="text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Agenda una asesoría gratuita y mira cómo tu bot de WhatsApp con IA precalifica leads mientras duermes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#agendar"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-haiku-mint text-lg font-semibold rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Agenda tu Asesoría Gratis
              </motion.a>
              <a
                href="#recursos"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Ver Recursos Gratis
              </a>
            </div>
            <p className="text-sm text-white/60 mt-6">
              Sin compromiso · Pagas a fin de mes solo si funciona · 30 min que valen la pena
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
