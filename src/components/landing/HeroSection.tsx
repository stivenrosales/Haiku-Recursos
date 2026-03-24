'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { WHATSAPP_URL } from '@/lib/whatsapp';

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 } as const,
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
  },
};

// Rotating words for the H1
const rotatingWords = [
  'atiende.',
  'califica.',
  'agenda.',
];

// Typewriter hook — types text, pauses, deletes, then types next word
function useTypewriter(words: string[], typeSpeed = 80, deleteSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState('');
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    let charIdx = 0;
    let deleting = false;
    const word = () => words[indexRef.current];

    const tick = () => {
      if (!deleting) {
        charIdx++;
        setText(word().slice(0, charIdx));

        if (charIdx === word().length) {
          deleting = true;
          timeoutRef.current = setTimeout(tick, pauseTime);
        } else {
          timeoutRef.current = setTimeout(tick, typeSpeed);
        }
      } else {
        charIdx--;
        setText(word().slice(0, charIdx));

        if (charIdx === 0) {
          deleting = false;
          indexRef.current = (indexRef.current + 1) % words.length;
          timeoutRef.current = setTimeout(tick, typeSpeed * 2);
        } else {
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        }
      }
    };

    charIdx = word().length;
    setText(word());
    timeoutRef.current = setTimeout(() => {
      deleting = true;
      tick();
    }, pauseTime);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [words, typeSpeed, deleteSpeed, pauseTime]);

  return { text };
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { text: typewriterText } = useTypewriter(rotatingWords, 80, 50, 2000);

  const Wrapper = shouldReduceMotion ? 'div' : motion.div;
  const Item = shouldReduceMotion ? 'div' : motion.div;

  const wrapperProps = shouldReduceMotion ? {} : { variants: container, initial: 'hidden', animate: 'visible' };
  const itemProps = shouldReduceMotion ? {} : { variants: item };

  return (
    <section className="pt-28 lg:pt-36 pb-10 lg:pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Left column - Content */}
          <Wrapper {...wrapperProps}>
            {/* Badge — static, no typewriter delay */}
            <Item {...itemProps}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-haiku-mint/10 rounded-full mb-6">
                <span className="w-2 h-2 bg-haiku-mint rounded-full animate-pulse" />
                <span className="text-sm font-medium text-haiku-mint">
                  Bots de WhatsApp con IA para negocios
                </span>
              </div>
            </Item>

            {/* H1 — specific to WhatsApp */}
            <Item {...itemProps}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-haiku-black leading-[1.1] mb-6">
                Tu WhatsApp
                <br />
                <span className="text-haiku-mint inline-block min-w-[4ch]">
                  {shouldReduceMotion ? rotatingWords[0] : typewriterText}
                  {!shouldReduceMotion && (
                    <span className="typing-cursor text-haiku-mint/70">|</span>
                  )}
                </span>
                <br />
                <span className="text-haiku-black">por ti.</span>
              </h1>
            </Item>

            {/* Subtitle */}
            <Item {...itemProps}>
              <p className="text-xl text-gray-600 leading-relaxed mb-4 max-w-xl">
                Un bot con IA que responde en 3 segundos, califica leads y los deja listos para que tú cierres. 24/7, sin que intervengas.
              </p>
            </Item>

            {/* Urgency + Guarantee */}
            <Item {...itemProps}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-8">
                <p className="text-sm font-semibold text-haiku-mint">
                  Setup gratis para los primeros 10 clientes →
                </p>
                <span className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
                <p className="text-sm text-gray-500">
                  Pagas a fin de mes solo si funciona
                </p>
              </div>
            </Item>

            {/* CTA buttons */}
            <Item {...itemProps}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-haiku-mint text-white text-lg font-semibold rounded-full hover:bg-[#009160] transition-colors"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  Agenda tu Demo Gratis
                </motion.a>
                <a
                  href="/planes"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-haiku-black text-haiku-black text-lg font-semibold rounded-full hover:bg-haiku-black hover:text-white transition-all"
                >
                  Ver Planes
                </a>
              </div>
            </Item>

            {/* Trust indicator */}
            <Item {...itemProps}>
              <p className="text-sm text-gray-500">
                Para agencias, consultorías, coaches y negocios de servicios
              </p>
            </Item>
          </Wrapper>

          {/* Right column - WhatsApp mockup (desktop) */}
          <div className="hidden lg:block">
            <div className="relative w-full max-w-3xl ml-auto -mr-24 scale-150 origin-center">
              {/* Glow effect behind mockup */}
              <div
                className={`absolute inset-0 m-auto w-[70%] h-[70%] rounded-full bg-haiku-mint/25 blur-[80px] ${
                  shouldReduceMotion ? 'opacity-40' : 'glow-effect'
                }`}
              />

              <motion.div
                className="relative w-full"
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, type: 'spring' as const }}
              >
                <Image
                  src="/hero-v6.png"
                  alt="Haiku AI Assistant - Demo de conversación en WhatsApp"
                  width={1200}
                  height={896}
                  className="w-full h-auto relative z-[1]"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* WhatsApp mockup on mobile */}
          <div className="lg:hidden">
            <div className="relative w-full mx-auto scale-125 -my-8">
              {/* Mobile glow */}
              <div
                className={`absolute inset-0 m-auto w-[60%] h-[60%] rounded-full bg-haiku-mint/20 blur-[60px] ${
                  shouldReduceMotion ? 'opacity-30' : 'glow-effect'
                }`}
              />
              <Image
                src="/hero-v6.png"
                alt="Haiku AI Assistant - Demo de conversación en WhatsApp"
                width={1200}
                height={896}
                className="w-full h-auto relative z-[1]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
