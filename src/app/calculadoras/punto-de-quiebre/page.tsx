import { Metadata } from 'next';
import { CalculadoraPuntoDeQuiebre } from '@/components/calculadoras/CalculadoraPuntoDeQuiebre';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Calculadora: ¿Ya Pasaste Tu Punto de Quiebre en WhatsApp?',
  description:
    'Mete tus números reales — leads, vendedores, gasto en ads — y descubre si estás perdiendo plata por no automatizar tu atención por WhatsApp.',
  openGraph: {
    title: '¿Ya Pasaste Tu Punto de Quiebre en WhatsApp?',
    description:
      'Simulador gratuito: compara tu operación actual vs con un chatbot. Descubre cuánto estás dejando en la mesa.',
    siteName: 'Haiku Business',
    locale: 'es_PE',
    type: 'website',
  },
};

export default function PuntoDeQuiebrePage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <CalculadoraPuntoDeQuiebre />
      </main>
      <Footer />
    </div>
  );
}
