'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';
import { WHATSAPP_URL } from '@/lib/whatsapp';

const faqs = [
  {
    question: '¿Cómo funciona el agente IA de ventas?',
    answer: 'Es un bot de WhatsApp con inteligencia artificial que atiende a tus clientes automáticamente. Responde preguntas, califica leads, agenda citas y envía información relevante. Los leads llegan precalificados y listos para que tú cierres en llamada o envíes cotización.',
  },
  {
    question: '¿En qué canal opera el bot?',
    answer: 'Opera directamente en WhatsApp, el canal donde ya están tus clientes. Se conecta a tu número de WhatsApp Business y atiende conversaciones con el tono y conocimiento de tu negocio.',
  },
  {
    question: '¿Qué tipo de negocios pueden usarlo?',
    answer: 'Negocios de servicios digitales: agencias, consultorías, coaches, freelancers, SaaS y cualquier negocio que venda servicios y reciba consultas por WhatsApp. Si tus clientes te escriben antes de comprar, el agente es para ti.',
  },
  {
    question: '¿Cuánto tiempo tarda en implementarse?',
    answer: 'En promedio, 1 semana. Configuramos el agente con la información de tu negocio, tus servicios, precios y tono de comunicación. En 7 días ya está atendiendo clientes.',
  },
  {
    question: '¿Necesito conocimientos técnicos?',
    answer: 'Para nada. Nosotros nos encargamos de todo. Tú solo nos describes tu negocio, servicios y cómo quieres que se comunique el agente. Nos encargamos de la implementación y capacitación.',
  },
  {
    question: '¿Cómo funciona el pago?',
    answer: 'Pagas a fin de mes, solo si el bot ha funcionado. Si no ves resultados, no pagas. Así de simple. No pedimos pagos adelantados ni contratos forzosos.',
  },
  {
    question: '¿Cuál es el retorno de inversión?',
    answer: 'Nuestros clientes recuperan la inversión en las primeras 2 semanas en promedio. Al responder al instante 24/7, recibes más leads precalificados y listos para cerrar. Además, ahorras el costo de una persona dedicada solo a responder WhatsApp.',
  },
  {
    question: '¿Ofrecen soporte continuo?',
    answer: 'Sí. Incluimos soporte y optimización continua. Monitoreamos las conversaciones, ajustamos respuestas y mejoramos el agente constantemente para maximizar tus conversiones.',
  },
  {
    question: '¿Qué es la integración con CAPI de Meta?',
    answer: 'Cuando el bot agenda una reunión, envía automáticamente esa conversión a Meta (Facebook/Instagram) vía Conversions API. Esto permite que Meta optimice tus campañas para traerte leads más calificados, no solo clics. El resultado: mejor rendimiento de tus anuncios con el mismo presupuesto.',
  },
  {
    question: '¿Cómo empiezo?',
    answer: 'Agenda una demo gratuita y te mostramos el agente en acción con un ejemplo personalizado para tu negocio. Sin compromiso. También puedes descargar nuestros recursos gratuitos para empezar a optimizar tus ventas.',
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[0.4fr_0.6fr] gap-12 lg:gap-20">
          {/* Left - Title */}
          <AnimatedSection direction="left">
            <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
              FAQ
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-haiku-black mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Respondemos las dudas más comunes sobre nuestro agente IA de ventas.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-haiku-mint text-white font-semibold rounded-full hover:bg-[#009160] transition-colors text-sm"
            >
              ¿Más preguntas? Escríbenos
            </a>
          </AnimatedSection>

          {/* Right - Accordion */}
          <AnimatedSection direction="right">
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left gap-4"
                    aria-expanded={openIndex === i}
                  >
                    <span className="font-semibold text-haiku-black text-base lg:text-lg">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
