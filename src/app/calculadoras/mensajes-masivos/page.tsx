import { Metadata } from 'next';
import { CalculadoraMensajesMasivos } from '@/components/calculadoras/CalculadoraMensajesMasivos';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Calculadora: ¿Te Conviene Hacer Mensajes Masivos por WhatsApp?',
  description:
    'Calcula cuánto cuesta reactivar tu base de contactos con templates oficiales de WhatsApp vs conseguir leads nuevos con ads.',
  openGraph: {
    title: '¿Te Conviene Hacer Mensajes Masivos por WhatsApp?',
    description:
      'Calculadora gratuita: compara el costo de reactivar leads viejos vs conseguir nuevos con ads. Descubre si los números tienen sentido.',
    siteName: 'Haiku Business',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function MensajesMasivosPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <CalculadoraMensajesMasivos />
      </main>
      <Footer />
    </div>
  );
}
