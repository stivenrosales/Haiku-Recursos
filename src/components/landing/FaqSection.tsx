'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

const faqs = [
  {
    question: '¿Cómo funciona el agente IA de ventas?',
    answer: 'Es un asistente inteligente que se conecta a tus canales (WhatsApp, Instagram, Messenger) y atiende a tus clientes automáticamente. Responde preguntas, califica leads, envía información de pago y confirma transacciones. Todo sin que tengas que intervenir.',
  },
  {
    question: '¿En qué canales opera el agente?',
    answer: 'Actualmente opera en WhatsApp, Instagram DM y Facebook Messenger. Un solo agente maneja todos los canales de forma unificada, con el mismo tono y conocimiento de tu negocio.',
  },
  {
    question: '¿Qué tipo de negocios pueden usarlo?',
    answer: 'Negocios de servicios digitales: agencias, consultorías, coaches, freelancers, SaaS y cualquier negocio que venda servicios y reciba consultas por redes sociales o WhatsApp. Si tus clientes te escriben antes de comprar, el agente es para ti.',
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
    question: '¿Cuál es el retorno de inversión?',
    answer: 'Nuestros clientes recuperan la inversión en las primeras 2 semanas en promedio. Al responder al instante 24/7, la tasa de conversión sube entre 30-50%. Además, ahorras el costo de un vendedor dedicado.',
  },
  {
    question: '¿Ofrecen soporte continuo?',
    answer: 'Sí. Incluimos soporte y optimización continua. Monitoreamos las conversaciones, ajustamos respuestas y mejoramos el agente constantemente para maximizar tus conversiones.',
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
            <p className="text-gray-600 leading-relaxed">
              Respondemos las dudas más comunes sobre nuestro agente IA de ventas. ¿No encuentras tu respuesta? Escríbenos.
            </p>
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
