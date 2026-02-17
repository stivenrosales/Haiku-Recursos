import { Metadata } from 'next';
import { PlanesContent } from '@/components/planes/PlanesContent';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Planes WhatsApp IA',
  description:
    'Bots de WhatsApp con IA que atienden, venden y cierran por ti. Planes desde S/ 597/mes.',
  openGraph: {
    title: 'Planes WhatsApp IA — Haiku Business',
    description:
      'Bots de WhatsApp con IA que atienden, venden y cierran por ti. Planes desde S/ 597/mes.',
    siteName: 'Haiku Business',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function PlanesPage() {
  return (
    <div className="min-h-screen bg-haiku-beige">
      <PlanesContent />
      <Footer />
    </div>
  );
}
