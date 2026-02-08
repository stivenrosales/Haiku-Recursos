'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

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
  'Crece.',
  'Ahorra.',
  'Escala.',
];

// Typewriter hook — types text, pauses, deletes, then types next word
function useTypewriter(words: string[], typeSpeed = 80, deleteSpeed = 50, pauseTime = 2000) {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    let charIdx = 0;
    let deleting = false;
    const word = () => words[indexRef.current];

    const tick = () => {
      if (!deleting) {
        // Typing forward
        charIdx++;
        setText(word().slice(0, charIdx));

        if (charIdx === word().length) {
          // Finished typing — pause before deleting
          deleting = true;
          timeoutRef.current = setTimeout(tick, pauseTime);
        } else {
          timeoutRef.current = setTimeout(tick, typeSpeed);
        }
      } else {
        // Deleting
        charIdx--;
        setText(word().slice(0, charIdx));

        if (charIdx === 0) {
          // Finished deleting — move to next word
          deleting = false;
          indexRef.current = (indexRef.current + 1) % words.length;
          timeoutRef.current = setTimeout(tick, typeSpeed * 2);
        } else {
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        }
      }
    };

    // Start with first word already displayed, then pause and delete
    charIdx = word().length;
    setText(word());
    timeoutRef.current = setTimeout(() => {
      deleting = true;
      tick();
    }, pauseTime);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [words, typeSpeed, deleteSpeed, pauseTime]);

  return { text, showCursor };
}

// Typing effect hook
function useTypingEffect(text: string, speed: number = 60, delay: number = 800) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      timeout = setTimeout(function type() {
        if (charIndex <= text.length) {
          setDisplayedText(text.slice(0, charIndex));
          charIndex++;
          timeout = setTimeout(type, speed);
        } else {
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(timeout);
    };
  }, [text, speed, delay]);

  return { displayedText, showCursor };
}

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const { text: typewriterText } = useTypewriter(rotatingWords, 80, 50, 2000);
  const badgeText = 'Automatización e IA para negocios';
  const { displayedText, showCursor } = useTypingEffect(
    badgeText,
    50,
    shouldReduceMotion ? 0 : 1000
  );

  const Wrapper = shouldReduceMotion ? 'div' : motion.div;
  const Item = shouldReduceMotion ? 'div' : motion.div;

  const wrapperProps = shouldReduceMotion ? {} : { variants: container, initial: 'hidden', animate: 'visible' };
  const itemProps = shouldReduceMotion ? {} : { variants: item };

  return (
    <section className="pt-28 lg:pt-36 pb-10 lg:pb-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          {/* Left column - Content */}
          <Wrapper {...wrapperProps}>
            {/* Badge with typing effect */}
            <Item {...itemProps}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-haiku-mint/10 rounded-full mb-6 min-h-[40px]">
                <span className="w-2 h-2 bg-haiku-mint rounded-full animate-pulse" />
                <span className="text-sm font-medium text-haiku-mint">
                  {shouldReduceMotion ? badgeText : displayedText}
                  {!shouldReduceMotion && showCursor && (
                    <span className="typing-cursor text-haiku-mint/80">|</span>
                  )}
                </span>
              </div>
            </Item>

            {/* H1 with rotating words */}
            <Item {...itemProps}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-haiku-black leading-[1.1] mb-6">
                Automatiza tu negocio.
                <br />
                <span className="text-haiku-mint inline-block min-w-[3ch]">
                  {shouldReduceMotion ? rotatingWords[0] : typewriterText}
                  {!shouldReduceMotion && (
                    <span className="typing-cursor text-haiku-mint/70">|</span>
                  )}
                </span>
              </h1>
            </Item>

            {/* Subtitle */}
            <Item {...itemProps}>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
                Un agente de IA que atiende, vende y cobra por ti en WhatsApp, Instagram y Messenger. 24/7.
              </p>
            </Item>

            {/* CTA buttons */}
            <Item {...itemProps}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <motion.a
                  href="#agente"
                  className="inline-flex items-center justify-center px-8 py-4 bg-haiku-mint text-white text-lg font-semibold rounded-full hover:bg-[#009160] transition-colors"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  Conoce al Agente IA
                </motion.a>
                <a
                  href="#recursos"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-haiku-black text-haiku-black text-lg font-semibold rounded-full hover:bg-haiku-black hover:text-white transition-all"
                >
                  Recursos Gratis
                </a>
              </div>
            </Item>

            {/* Trust indicator */}
            <Item {...itemProps}>
              <p className="text-sm text-gray-500">
                Más de 50 negocios ya venden en automático con nosotros
              </p>
            </Item>
          </Wrapper>

          {/* Right column - Image with glow (desktop) */}
          <div className="hidden lg:block">
            <div className="relative w-full max-w-md ml-auto">
              {/* Glow effect behind photo */}
              <div
                className={`absolute -inset-6 rounded-[32px] bg-haiku-mint/30 blur-3xl ${
                  shouldReduceMotion ? 'opacity-40' : 'glow-effect'
                }`}
              />

              {/* Photo */}
              <motion.div
                className="relative aspect-square w-full"
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
                animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, type: 'spring' as const }}
              >
                <Image
                  src="/foto.jpg"
                  alt="Stiven Rosales - Haiku Business"
                  fill
                  className="rounded-[24px] shadow-xl object-cover relative z-[1]"
                  priority
                />
              </motion.div>
            </div>
          </div>

          {/* Image on mobile */}
          <div className="lg:hidden">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Mobile glow */}
              <div
                className={`absolute -inset-4 rounded-[28px] bg-haiku-mint/25 blur-2xl ${
                  shouldReduceMotion ? 'opacity-30' : 'glow-effect'
                }`}
              />
              <div className="relative aspect-square w-full">
                <Image
                  src="/foto.jpg"
                  alt="Stiven Rosales - Haiku Business"
                  fill
                  className="rounded-[24px] shadow-xl object-cover relative z-[1]"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
