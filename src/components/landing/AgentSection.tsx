'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'motion/react';
import { MessageCircle, Clock, TrendingUp, Bot, CheckCircle, DollarSign, ImageIcon, Zap } from 'lucide-react';

// --- Chat sequence types ---
type ChatStep =
  | { type: 'message'; from: 'client' | 'agent'; text: string; delay?: number; time?: string }
  | { type: 'typing'; duration: number }
  | { type: 'account'; time?: string }
  | { type: 'voucher'; time?: string }
  | { type: 'switch-to-notifications' };

// Each message/card is followed by a natural pause.
// Typing indicators always precede agent responses.
// Client messages appear after a shorter pause (they're "instant").
const chatSteps: ChatStep[] = [
  { type: 'message', from: 'client', text: 'Hola, quisiera información sobre sus servicios', delay: 800, time: '10:24' },
  { type: 'typing', duration: 1400 },
  { type: 'message', from: 'agent', text: '¡Hola! Claro, tenemos planes personalizados para tu negocio. ¿En qué área necesitas ayuda?', time: '10:24' },
  { type: 'message', from: 'client', text: 'Marketing digital. ¿Cuánto cuesta?', delay: 1800, time: '10:25' },
  { type: 'typing', duration: 1200 },
  { type: 'message', from: 'agent', text: 'Para marketing digital tenemos un plan desde $297/mes con atención 24/7 y reportes.', time: '10:25' },
  { type: 'message', from: 'client', text: 'Genial, quiero contratar', delay: 1600, time: '10:26' },
  { type: 'typing', duration: 1000 },
  { type: 'message', from: 'agent', text: 'Perfecto, te paso los datos para el pago:', time: '10:26' },
  { type: 'account', time: '10:26' },
  { type: 'message', from: 'client', text: 'Listo, ya transferí. Te envío el comprobante:', delay: 2200, time: '10:31' },
  { type: 'voucher', time: '10:31' },
  { type: 'typing', duration: 1200 },
  { type: 'message', from: 'agent', text: '¡Recibido! Tu servicio se activa en las próximas 24 horas. ¡Bienvenido!', time: '10:31' },
  { type: 'switch-to-notifications' },
];

// --- Notification data for the second screen ---
const notifications = [
  { name: 'María G.', amount: '$297', time: 'hace 2 min', service: 'Marketing Digital' },
  { name: 'Carlos R.', amount: '$497', time: 'hace 8 min', service: 'Automatización CRM' },
  { name: 'Ana L.', amount: '$297', time: 'hace 15 min', service: 'Marketing Digital' },
  { name: 'Pedro M.', amount: '$797', time: 'hace 23 min', service: 'Suite Completa' },
  { name: 'Laura S.', amount: '$297', time: 'hace 31 min', service: 'Marketing Digital' },
  { name: 'Diego F.', amount: '$497', time: 'hace 45 min', service: 'Automatización CRM' },
  { name: 'Sofía V.', amount: '$297', time: 'hace 1h', service: 'Marketing Digital' },
];

const features = [
  {
    icon: MessageCircle,
    title: 'Multi-canal',
    description: 'WhatsApp, Instagram y Messenger en un solo agente.',
  },
  {
    icon: Clock,
    title: 'Disponible 24/7',
    description: 'Atiende clientes mientras duermes. Sin pausas.',
  },
  {
    icon: TrendingUp,
    title: 'Más conversiones',
    description: 'Respuesta inmediata = más ventas cerradas.',
  },
];

// --- Channel icons (inline SVGs at 14px to match chip scale) ---
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.2l3.131 3.259L19.752 8.2l-6.561 6.763z" />
    </svg>
  );
}

const channels = [
  { name: 'WhatsApp', icon: WhatsAppIcon },
  { name: 'Instagram', icon: InstagramIcon },
  { name: 'Messenger', icon: MessengerIcon },
];

// --- Sub-components ---

function TypingIndicator() {
  return (
    <motion.div
      className="flex justify-start"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.15 } }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="bg-haiku-mint/60 px-4 py-2.5 rounded-2xl rounded-tl-md flex items-center gap-1.5">
        <motion.span
          className="w-1.5 h-1.5 bg-white/80 rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
        />
        <motion.span
          className="w-1.5 h-1.5 bg-white/80 rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        />
        <motion.span
          className="w-1.5 h-1.5 bg-white/80 rounded-full"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

function AccountCard() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-md overflow-hidden border border-white/10">
        <div className="bg-haiku-mint/20 px-4 py-2 flex items-center gap-2">
          <DollarSign className="w-3.5 h-3.5 text-haiku-mint" />
          <span className="text-[11px] font-semibold text-haiku-mint">Datos de pago</span>
        </div>
        <div className="px-4 py-3 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-white/40 text-[11px]">Banco</span>
            <span className="text-white text-[11px] font-medium">BCP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40 text-[11px]">Cuenta</span>
            <span className="text-white text-[11px] font-medium">191-2847XXX-0-53</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/40 text-[11px]">Titular</span>
            <span className="text-white text-[11px] font-medium">Haiku Business SAC</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-1.5 mt-1">
            <span className="text-white/40 text-[11px]">Monto</span>
            <span className="text-haiku-mint text-sm font-bold">$297.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function VoucherImage() {
  return (
    <div className="flex justify-end">
      <div className="max-w-[70%] bg-white/10 rounded-2xl rounded-tr-md overflow-hidden border border-white/10">
        <div className="bg-white/5 px-4 py-6 flex flex-col items-center gap-2">
          <ImageIcon className="w-8 h-8 text-white/30" />
          <span className="text-[10px] text-white/40">comprobante_pago.jpg</span>
          <div className="flex items-center gap-1 mt-1">
            <CheckCircle className="w-3 h-3 text-haiku-mint" />
            <span className="text-[10px] text-haiku-mint font-medium">Enviado</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Animated bubble wrapper ---
function ChatBubble({ children, from }: { children: React.ReactNode; from: 'client' | 'agent' | 'special' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, x: from === 'client' ? 6 : from === 'agent' ? -6 : 0 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

// --- Main Chat Mockup ---

function ChatMockup({ isVisible }: { isVisible: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [phase, setPhase] = useState<'chat' | 'notifications'>('chat');
  const [notifCount, setNotifCount] = useState(0);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const addTimeout = useCallback((fn: () => void, delay: number) => {
    const t = setTimeout(fn, delay);
    timeoutsRef.current.push(t);
    return t;
  }, []);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll chat container to bottom after DOM has painted
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (chatContainerRef.current) {
        const el = chatContainerRef.current;
        el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    });
  }, []);

  useEffect(() => {
    if (phase === 'chat') scrollToBottom();
  }, [stepIndex, isTyping, phase, scrollToBottom]);

  // Main animation loop
  useEffect(() => {
    if (!isVisible || shouldReduceMotion) {
      if (shouldReduceMotion) {
        setStepIndex(chatSteps.length);
        setPhase('notifications');
        setNotifCount(notifications.length);
      }
      return;
    }

    clearTimeouts();
    setStepIndex(0);
    setPhase('chat');
    setNotifCount(0);
    setIsTyping(false);

    let current = 0;

    const processNext = () => {
      if (current >= chatSteps.length) return;

      const step = chatSteps[current];

      if (step.type === 'typing') {
        setIsTyping(true);
        addTimeout(() => {
          setIsTyping(false);
          current++;
          // Brief pause after typing disappears so it doesn't collide with the message
          addTimeout(processNext, 250);
        }, step.duration);
      } else if (step.type === 'switch-to-notifications') {
        addTimeout(() => {
          setPhase('notifications');
          let n = 0;
          const showNext = () => {
            n++;
            setNotifCount(n);
            if (n < notifications.length) {
              addTimeout(showNext, 550);
            } else {
              addTimeout(() => {
                setStepIndex(0);
                setPhase('chat');
                setNotifCount(0);
                setIsTyping(false);
                current = 0;
                addTimeout(processNext, 600);
              }, 3000);
            }
          };
          addTimeout(showNext, 500);
        }, 1500);
        current++;
      } else {
        // Show the step
        current++;
        setStepIndex(current);

        // Determine pause before the NEXT step
        const nextStep = current < chatSteps.length ? chatSteps[current] : null;
        let delay: number;

        if (!nextStep) {
          delay = 1000;
        } else if (nextStep.type === 'typing') {
          // Before typing indicator, short pause
          delay = 400;
        } else if (nextStep.type === 'message' && nextStep.delay) {
          // Client messages have explicit delays (thinking time)
          delay = nextStep.delay;
        } else if (nextStep.type === 'account' || nextStep.type === 'voucher') {
          // Cards follow immediately after the message that introduces them
          delay = 600;
        } else if (nextStep.type === 'switch-to-notifications') {
          delay = 1800;
        } else {
          delay = 1200;
        }

        addTimeout(processNext, delay);
      }
    };

    addTimeout(processNext, 700);
    return clearTimeouts;
  }, [isVisible, shouldReduceMotion, clearTimeouts, addTimeout]);

  const visibleSteps = chatSteps.slice(0, stepIndex);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-[24px] p-5 lg:p-6 border border-white/10 h-[420px] flex flex-col overflow-hidden">
      <AnimatePresence mode="popLayout">
        {phase === 'notifications' ? (
          <motion.div
            key="notifications"
            className="flex flex-col flex-1 min-h-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Notifications header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-haiku-mint/20 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-haiku-mint" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Pagos recibidos</p>
                  <p className="text-white/40 text-[10px]">Hoy</p>
                </div>
              </div>
              {notifCount > 0 && (
                <motion.span
                  key={notifCount}
                  className="px-2 py-0.5 bg-haiku-mint text-white text-[10px] font-bold rounded-full"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  {notifCount}
                </motion.span>
              )}
            </div>

            {/* Notifications list */}
            <div className="flex-1 overflow-hidden space-y-2">
              {notifications.slice(0, notifCount).map((notif, i) => (
                <motion.div
                  key={`${notif.name}-${i}`}
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="w-8 h-8 rounded-full bg-haiku-mint/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-haiku-mint" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-xs font-medium truncate">{notif.name}</p>
                      <span className="text-haiku-mint text-xs font-bold">{notif.amount}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-white/40 text-[10px]">{notif.service}</p>
                      <span className="text-white/30 text-[10px]">{notif.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            className="flex flex-col flex-1 min-h-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-haiku-mint flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Agente IA de Ventas</p>
                <p className="text-haiku-mint text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-haiku-mint rounded-full animate-pulse" />
                  En línea
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden space-y-3 scrollbar-hide">
              {visibleSteps.map((step, i) => {
                if (step.type === 'typing' || step.type === 'switch-to-notifications') return null;

                if (step.type === 'account') {
                  return (
                    <ChatBubble key={`step-${i}`} from="special">
                      <AccountCard />
                      {step.time && (
                        <p className="text-[10px] text-white/25 mt-1 ml-1">{step.time}</p>
                      )}
                    </ChatBubble>
                  );
                }

                if (step.type === 'voucher') {
                  return (
                    <ChatBubble key={`step-${i}`} from="special">
                      <VoucherImage />
                      {step.time && (
                        <p className="text-[10px] text-white/25 mt-1 text-right mr-1">{step.time}</p>
                      )}
                    </ChatBubble>
                  );
                }

                const isAgent = step.from === 'agent';
                // Show "Respondido en 3s" badge after the first agent message
                const isFirstAgentReply = i === 2;

                return (
                  <ChatBubble key={`step-${i}`} from={step.from}>
                    <div className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                      <div className="max-w-[80%]">
                        <div
                          className={`px-4 py-2.5 text-sm leading-relaxed ${
                            isAgent
                              ? 'bg-haiku-mint text-white rounded-2xl rounded-tl-md'
                              : 'bg-white/10 text-white/90 rounded-2xl rounded-tr-md'
                          }`}
                        >
                          {step.text}
                        </div>
                        {step.time && (
                          <p className={`text-[10px] text-white/25 mt-0.5 ${isAgent ? 'ml-1' : 'text-right mr-1'}`}>
                            {step.time}
                          </p>
                        )}
                      </div>
                    </div>
                    {isFirstAgentReply && (
                      <motion.div
                        className="flex justify-start mt-1"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-haiku-mint/10 border border-haiku-mint/20 rounded-full text-[10px] text-haiku-mint font-medium">
                          <Zap className="w-2.5 h-2.5" />
                          Respondido en 3s
                        </span>
                      </motion.div>
                    )}
                  </ChatBubble>
                );
              })}

              <AnimatePresence>
                {isTyping && <TypingIndicator key="typing" />}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main Section ---

export function AgentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="agente" className="py-14 lg:py-20 bg-haiku-black" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <div>
            <AnimatedSection>
              <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
                Producto Estrella
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-[1.1] mb-5">
                Tu agente de IA que vende por ti, 24/7
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
                Un asistente inteligente que atiende, califica y convierte clientes potenciales en todos tus canales. Mientras tú te enfocas en entregar tu servicio.
              </p>
            </AnimatedSection>

            {/* Features */}
            <div className="space-y-5 mb-8">
              {features.map((feat, i) => (
                <AnimatedSection key={feat.title} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-haiku-mint/15 flex items-center justify-center flex-shrink-0">
                      <feat.icon className="w-5 h-5 text-haiku-mint" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white mb-0.5">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-white/50">{feat.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            {/* Channel badges */}
            <AnimatedSection delay={0.3}>
              <div className="flex flex-wrap items-center gap-2 mb-8">
                {channels.map((channel) => (
                  <span
                    key={channel.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/70 text-xs font-medium rounded-full"
                  >
                    <channel.icon />
                    {channel.name}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={0.4}>
              <a
                href="#contacto"
                className="inline-flex items-center justify-center px-8 py-4 bg-haiku-mint text-white text-lg font-semibold rounded-full hover:bg-[#009160] transition-colors"
              >
                Agenda una Demo Gratis
              </a>
            </AnimatedSection>
          </div>

          {/* Right — Chat mockup */}
          <AnimatedSection direction="right">
            <ChatMockup isVisible={isInView} />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
