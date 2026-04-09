import { Metadata } from 'next';
import { FinancierasContent } from '@/components/financieras/FinancierasContent';
import { Footer } from '@/components/landing/Footer';
import { WhatsAppBubble } from '@/components/landing/WhatsAppBubble';

export const metadata: Metadata = {
  title: 'Haiku Fin — WhatsApp IA para Financieras',
  description:
    'Agente de IA en WhatsApp que precalifica leads, consulta Equifax y hace seguimiento automatico. Tus analistas solo reciben personas listas para cerrar.',
  openGraph: {
    title: 'Haiku Fin — WhatsApp IA para Financieras',
    description:
      'Agente de IA en WhatsApp que precalifica leads, consulta Equifax y hace seguimiento automatico.',
    siteName: 'Haiku Business',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function FinancierasPage() {
  return (
    <div className="min-h-screen bg-haiku-beige">
      <FinancierasContent />
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}
