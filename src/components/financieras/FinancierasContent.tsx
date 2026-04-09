'use client';

import { useState } from 'react';
import { AnimatedSection } from '../landing/AnimatedSection';
import {
  MessageCircle,
  Users,
  Send,
  BarChart3,
  Tags,
  Brain,
  Megaphone,
  Bot,
  UserCheck,
  RefreshCw,
  Check,
  ChevronDown,
  ArrowLeft,
  Clock,
  TrendingUp,
  Zap,
  MessageSquare,
} from 'lucide-react';

const WA_URL = 'https://wa.me/51994122404?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20Haiku%20Fin';

/* -- Metrics -- */
const metrics = [
  {
    icon: Clock,
    value: '11 seg',
    label: 'Tiempo de respuesta de la IA',
    detail: 'vs +40 horas promedio del sector',
    source: 'Chatbot.com 2026',
  },
  {
    icon: TrendingUp,
    value: '391%',
    label: 'Más conversión',
    detail: 'cuando respondés en menos de 1 minuto',
    source: 'Velocify Research',
  },
  {
    icon: Zap,
    value: '60x',
    label: 'Más probable calificar un lead',
    detail: 'si respondés en menos de 1 hora vs 24 horas',
    source: 'Harvard Business Review',
  },
  {
    icon: MessageSquare,
    value: '82%',
    label: 'Prefieren chat inmediato',
    detail: 'a esperar por un humano',
    source: 'Chatbot Statistics 2026',
  },
];

/* -- How it works steps -- */
const steps = [
  {
    icon: Megaphone,
    number: '01',
    title: 'Lanzás tu campaña',
    description:
      'Enviá mensajes masivos a miles de personas con plantillas aprobadas por Meta. Sin baneo, sin riesgo.',
  },
  {
    icon: Bot,
    number: '02',
    title: 'La IA atiende y precalifica',
    description:
      'El agente conversa naturalmente, pide documentos, consulta Equifax y determina si el lead es viable. Todo automático.',
  },
  {
    icon: UserCheck,
    number: '03',
    title: 'El analista recibe leads listos',
    description:
      'Solo llegan personas precalificadas. El analista ve la conversación completa, documentos y score en la plataforma.',
  },
  {
    icon: RefreshCw,
    number: '04',
    title: 'Seguimiento automático',
    description:
      'Si el lead no responde, la IA hace seguimiento inteligente. Si no hay interés, lo etiqueta como perdido. Sin esfuerzo manual.',
  },
];

/* -- Platform features -- */
const features = [
  {
    icon: MessageCircle,
    title: 'Conversaciones en vivo',
    description:
      'Mirá cada conversación de la IA con los leads en tiempo real. El analista puede intervenir cuando quiera.',
  },
  {
    icon: Users,
    title: 'Asignación de analistas',
    description:
      'Cada lead precalificado se asigna automáticamente al analista correspondiente.',
  },
  {
    icon: Send,
    title: 'Mensajes masivos',
    description:
      'Espacio dedicado para que el equipo comercial lance campañas con plantillas aprobadas por Meta.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard de campañas',
    description:
      'Cuántas personas llegan, cuántas precalifican, cuántas se pierden. Métricas en tiempo real.',
  },
  {
    icon: Tags,
    title: 'Etiquetas personalizables',
    description:
      'Clasificá leads como quieras: interesado, precalificado, documentos pendientes, perdido. Todo gestionable.',
  },
  {
    icon: Brain,
    title: 'IA que conversa, no que recita',
    description:
      'No es un bot de respuestas estáticas. Conversa, agenda, consulta Equifax, guarda documentos y toma decisiones.',
  },
];

/* -- Plan features -- */
const planFeatures = [
  'Agente IA en WhatsApp 24/7',
  'Precalificación automática de leads',
  'Consultas a Equifax',
  'Recepción y almacenamiento de documentos',
  'Seguimientos automáticos',
  'Plataforma completa (conversaciones, asignación, etiquetas, dashboard)',
  'Analistas ilimitados',
  'Capacitación totalmente gratis',
  'Configuración incluida',
];

/* -- Consumption costs -- */
const consumptionCosts = [
  { concept: 'Conversación IA (Gemini 3 Flash)', unit: '~S/ 0.057', bulk: '~S/ 57' },
  { concept: 'Plantilla marketing (campañas masivas)', unit: '~S/ 0.27', bulk: '~S/ 267' },
  { concept: 'Plantilla utilidad (confirmaciones, recordatorios)', unit: '~S/ 0.076', bulk: '~S/ 76' },
];

/* -- FAQ -- */
const faqs = [
  {
    question: '¿Qué necesito para empezar?',
    answer:
      'Solo tu número de WhatsApp Business. Nosotros nos encargamos de toda la configuración técnica, integración con Equifax y capacitación de tu equipo.',
  },
  {
    question: '¿La IA realmente conversa o solo manda respuestas automáticas?',
    answer:
      'Conversa. No es un bot de menú. El agente entiende contexto, hace preguntas, pide documentos, consulta Equifax y toma decisiones como lo haría un analista junior.',
  },
  {
    question: '¿Qué pasa si el lead quiere hablar con un humano?',
    answer:
      'El analista asignado puede intervenir en cualquier momento desde la plataforma, o contactar al lead directamente desde su número personal.',
  },
  {
    question: '¿Los mensajes masivos no hacen que me baneen?',
    answer:
      'No. Usamos plantillas aprobadas por Meta a través de la API oficial de WhatsApp Business. Es el canal legítimo, no es spam.',
  },
  {
    question: '¿Cómo se paga el consumo de IA y plantillas?',
    answer:
      'El plan base es S/ 500/mes fijo. El consumo de IA (Gemini) y plantillas (Meta) se cobra aparte según uso real, como un servicio de luz. Todo transparente desde la plataforma.',
  },
  {
    question: '¿Incluye capacitación?',
    answer:
      'Sí, totalmente gratis. Te enseñamos a usar la plataforma, gestionar etiquetas, lanzar campañas y sacarle el máximo provecho al agente IA.',
  },
];

export function FinancierasContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* Sections will be added in subsequent tasks */}
      <div>Haiku Fin — placeholder</div>
    </>
  );
}
