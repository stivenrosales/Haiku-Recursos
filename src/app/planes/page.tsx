import { Metadata } from 'next';
import { headers } from 'next/headers';
import { PlanesContent } from '@/components/planes/PlanesContent';
import { Footer } from '@/components/landing/Footer';
import { WhatsAppBubble } from '@/components/landing/WhatsAppBubble';

export const metadata: Metadata = {
  title: 'Planes WhatsApp IA',
  description:
    'Bots de WhatsApp con IA que atienden, califican y agendan por ti. Planes desde S/ 597/mes.',
  openGraph: {
    title: 'Planes WhatsApp IA — Haiku Business',
    description:
      'Bots de WhatsApp con IA que atienden, califican y agendan por ti. Planes desde S/ 597/mes.',
    siteName: 'Haiku Business',
    locale: 'es_PE',
    type: 'website',
  },
};

export default async function PlanesPage() {
  const headersList = await headers();
  const country = headersList.get('x-vercel-ip-country') ?? 'PE';
  const isPeru = country === 'PE';

  return (
    <div className="min-h-screen bg-haiku-beige">
      <PlanesContent isPeru={isPeru} />
      <Footer />
      <WhatsAppBubble />
    </div>
  );
}
