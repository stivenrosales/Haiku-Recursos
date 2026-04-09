import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { PropuestaHeader } from '@/components/propuesta/PropuestaHeader';
import { PropuestaFooter } from '@/components/propuesta/PropuestaFooter';
import { Portada } from '@/components/propuesta/Portada';
import { ServicioCard } from '@/components/propuesta/ServicioCard';
import { ProximosPasos } from '@/components/propuesta/ProximosPasos';
import { DescargarPdfButton } from '@/components/propuesta/DescargarPdfButton';
import type { Metadata } from 'next';

interface Servicio {
  titulo: string;
  precio: string;
  tipoPago: string;
  descripcion: string;
  items: string[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const propuesta = await prisma.propuesta.findUnique({ where: { slug } });
  if (!propuesta) return { title: 'Propuesta no encontrada' };
  return {
    title: `Propuesta para ${propuesta.clienteNombre}`,
    robots: { index: false, follow: false },
  };
}

export default async function PropuestaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const propuesta = await prisma.propuesta.findUnique({ where: { slug } });

  if (!propuesta) notFound();

  const vencida = new Date() > new Date(propuesta.vigenciaHasta);
  const servicios = propuesta.servicios as unknown as Servicio[];

  if (vencida) {
    return (
      <div className="min-h-screen bg-haiku-beige flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="font-display text-3xl font-bold text-haiku-black mb-4">
            Propuesta expirada
          </h1>
          <p className="text-gray-600 font-body">
            Esta propuesta venció el{' '}
            {new Date(propuesta.vigenciaHasta).toLocaleDateString('es-PE', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
            . Contactanos para una nueva propuesta.
          </p>
          <a
            href="https://wa.me/51987654321"
            className="inline-block mt-6 bg-haiku-mint text-white font-display font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="print:hidden fixed top-6 right-6 z-50">
        <DescargarPdfButton clienteNombre={propuesta.clienteNombre} />
      </div>

      {/* Page 1: Portada */}
      <div className="print:break-after-page">
        <PropuestaHeader />
        <Portada
          clienteNombre={propuesta.clienteNombre}
          fecha={new Date(propuesta.creadoEl)}
          vigenciaHasta={new Date(propuesta.vigenciaHasta)}
        />
      </div>

      {/* Page 2: Servicios */}
      <div className="print:break-after-page">
        <PropuestaHeader />
        <section className="max-w-4xl mx-auto px-8 py-12 print:py-8">
          <h2 className="font-display text-2xl font-bold text-haiku-black mb-8">
            Servicios propuestos
          </h2>
          <div className="space-y-8">
            {servicios.map((servicio, i) => (
              <ServicioCard key={i} servicio={servicio} index={i + 1} />
            ))}
          </div>
        </section>
        <PropuestaFooter />
      </div>

      {/* Page 3: Próximos pasos */}
      <div>
        <PropuestaHeader />
        <ProximosPasos vigenciaHasta={new Date(propuesta.vigenciaHasta)} />
        <PropuestaFooter />
      </div>
    </div>
  );
}
