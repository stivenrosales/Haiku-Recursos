import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { LeadForm } from '@/components/landing/LeadForm';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// ISR: Revalidar cada 60 segundos
export const revalidate = 60;

// Pre-generar páginas estáticas para recursos activos en build time
export async function generateStaticParams() {
  const recursos = await prisma.recurso.findMany({
    where: { activo: true },
    select: { slug: true },
    take: 50, // Limitar a 50 para evitar builds muy largos
  });

  return recursos.map((recurso) => ({
    slug: recurso.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recurso = await prisma.recurso.findUnique({
    where: { slug, activo: true },
  });

  if (!recurso) {
    return { title: 'Recurso no encontrado' };
  }

  return {
    title: `${recurso.titulo} - Haiku Business`,
    description: recurso.descripcion,
  };
}

export default async function RecursoPage({ params }: PageProps) {
  const { slug } = await params;
  const recurso = await prisma.recurso.findUnique({
    where: { slug, activo: true },
  });

  if (!recurso) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      {/* Layout estilo Ali Abdaal con bordes redondeados */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">

        {/* Header - Logo izquierda, link derecha */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span className="text-haiku-mint opacity-0 group-hover:opacity-100 transition-opacity duration-200">←</span>
            <h2 className="text-2xl font-bold text-gray-900 group-hover:text-haiku-mint transition-colors">
              Haiku Business
            </h2>
          </Link>
          <Link
            href="/#recursos"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-haiku-mint border border-haiku-mint/30 rounded-full hover:bg-haiku-mint hover:text-white transition-all duration-200"
          >
            Ver más recursos
            <span className="text-base">→</span>
          </Link>
        </div>

        {/* Contenedor principal con fondo blanco y bordes redondeados como Ali Abdaal */}
        <div className="bg-white rounded-[24px] shadow-lg p-8 lg:p-12">

          {/* Grid de 2 columnas - Contenido izquierda, Imagen derecha */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Columna Izquierda - Contenido y Formulario */}
            <div className="space-y-10">
              {/* Título y descripción alineados a la izquierda */}
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  {recurso.titulo}
                </h1>

                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  {recurso.descripcion}
                </p>

                <p className="text-base text-gray-500">
                  Este es un recurso completamente gratis. Para acceder, completa el formulario.
                </p>
              </div>

              {/* Foto en móvil - centrada */}
              <div className="lg:hidden">
                <div className="relative aspect-square w-full max-w-sm mx-auto">
                  <Image
                    src="/foto.jpg"
                    alt="Stiven Rosales - Haiku Business"
                    fill
                    className="rounded-[24px] shadow-xl object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Formulario */}
              <div className="max-w-md">
                <LeadForm
                  slug={recurso.slug}
                  titulo={recurso.titulo}
                  recursoUrl={recurso.urlRecurso}
                />
              </div>
            </div>

            {/* Columna Derecha - Foto en desktop */}
            <div className="hidden lg:block">
              <div className="relative aspect-square w-full">
                <Image
                  src="/foto.jpg"
                  alt="Stiven Rosales - Haiku Business"
                  fill
                  className="rounded-[24px] shadow-xl object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 mt-20 pt-8 pb-4">
          {/* Redes sociales */}
          <div className="flex justify-center gap-3 mb-6">
            <a
              href="https://www.youtube.com/@stivenrosalesc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ECE5E1] text-[#060C39] hover:bg-[#ddd5d0] transition-colors"
              aria-label="YouTube"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.8,8.001c0,0-0.195-1.378-0.795-1.985c-0.76-0.797-1.613-0.801-2.004-0.847c-2.799-0.202-6.997-0.202-6.997-0.202 h-0.009c0,0-4.198,0-6.997,0.202C4.608,5.216,3.756,5.22,2.995,6.016C2.395,6.623,2.2,8.001,2.2,8.001S2,9.62,2,11.238v1.517 c0,1.618,0.2,3.237,0.2,3.237s0.195,1.378,0.795,1.985c0.761,0.797,1.76,0.771,2.205,0.855c1.6,0.153,6.8,0.201,6.8,0.201 s4.203-0.006,7.001-0.209c0.391-0.047,1.243-0.051,2.004-0.847c0.6-0.607,0.795-1.985,0.795-1.985s0.2-1.618,0.2-3.237v-1.517 C22,9.62,21.8,8.001,21.8,8.001z M9.935,14.594l-0.001-5.62l5.404,2.82L9.935,14.594z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/stiven.rosalesc/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ECE5E1] text-[#060C39] hover:bg-[#ddd5d0] transition-colors"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12,4.622c2.403,0,2.688,0.009,3.637,0.052c0.877,0.04,1.354,0.187,1.671,0.31c0.42,0.163,0.72,0.358,1.035,0.673 c0.315,0.315,0.51,0.615,0.673,1.035c0.123,0.317,0.27,0.794,0.31,1.671c0.043,0.949,0.052,1.234,0.052,3.637 s-0.009,2.688-0.052,3.637c-0.04,0.877-0.187,1.354-0.31,1.671c-0.163,0.42-0.358,0.72-0.673,1.035 c-0.315,0.315-0.615,0.51-1.035,0.673c-0.317,0.123-0.794,0.27-1.671,0.31c-0.949,0.043-1.233,0.052-3.637,0.052 s-2.688-0.009-3.637-0.052c-0.877-0.04-1.354-0.187-1.671-0.31c-0.42-0.163-0.72-0.358-1.035-0.673 c-0.315-0.315-0.51-0.615-0.673-1.035c-0.123-0.317-0.27-0.794-0.31-1.671C4.631,14.688,4.622,14.403,4.622,12 s0.009-2.688,0.052-3.637c0.04-0.877,0.187-1.354,0.31-1.671c0.163-0.42,0.358-0.72,0.673-1.035 c0.315-0.315,0.615-0.51,1.035-0.673c0.317-0.123,0.794-0.27,1.671-0.31C9.312,4.631,9.597,4.622,12,4.622 M12,3 C9.556,3,9.249,3.01,8.289,3.054C7.331,3.098,6.677,3.25,6.105,3.472C5.513,3.702,5.011,4.01,4.511,4.511 c-0.5,0.5-0.808,1.002-1.038,1.594C3.25,6.677,3.098,7.331,3.054,8.289C3.01,9.249,3,9.556,3,12c0,2.444,0.01,2.751,0.054,3.711 c0.044,0.958,0.196,1.612,0.418,2.185c0.23,0.592,0.538,1.094,1.038,1.594c0.5,0.5,1.002,0.808,1.594,1.038 c0.572,0.222,1.227,0.375,2.185,0.418C9.249,20.99,9.556,21,12,21s2.751-0.01,3.711-0.054c0.958-0.044,1.612-0.196,2.185-0.418 c0.592-0.23,1.094-0.538,1.594-1.038c0.5-0.5,0.808-1.002,1.038-1.594c0.222-0.572,0.375-1.227,0.418-2.185 C20.99,14.751,21,14.444,21,12s-0.01-2.751-0.054-3.711c-0.044-0.958-0.196-1.612-0.418-2.185c-0.23-0.592-0.538-1.094-1.038-1.594 c-0.5-0.5-1.002-0.808-1.594-1.038c-0.572-0.222-1.227-0.375-2.185-0.418C14.751,3.01,14.444,3,12,3L12,3z M12,7.378 c-2.552,0-4.622,2.069-4.622,4.622S9.448,16.622,12,16.622s4.622-2.069,4.622-4.622S14.552,7.378,12,7.378z M12,15 c-1.657,0-3-1.343-3-3s1.343-3,3-3s3,1.343,3,3S13.657,15,12,15z M16.804,6.116c-0.596,0-1.08,0.484-1.08,1.08 s0.484,1.08,1.08,1.08c0.596,0,1.08-0.484,1.08-1.08S17.401,6.116,16.804,6.116z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/stiven-kevin-rosales-casas/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ECE5E1] text-[#060C39] hover:bg-[#ddd5d0] transition-colors"
              aria-label="LinkedIn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.7,3H4.3C3.582,3,3,3.582,3,4.3v15.4C3,20.418,3.582,21,4.3,21h15.4c0.718,0,1.3-0.582,1.3-1.3V4.3 C21,3.582,20.418,3,19.7,3z M8.339,18.338H5.667v-8.59h2.672V18.338z M7.004,8.574c-0.857,0-1.549-0.694-1.549-1.548 c0-0.855,0.691-1.548,1.549-1.548c0.854,0,1.547,0.694,1.547,1.548C8.551,7.881,7.858,8.574,7.004,8.574z M18.339,18.338h-2.669 v-4.177c0-0.996-0.017-2.278-1.387-2.278c-1.389,0-1.601,1.086-1.601,2.206v4.249h-2.667v-8.59h2.559v1.174h0.037 c0.356-0.675,1.227-1.387,2.526-1.387c2.703,0,3.203,1.779,3.203,4.092V18.338z" />
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@sk.rosales"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-[#ECE5E1] text-[#060C39] hover:bg-[#ddd5d0] transition-colors"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.708 0.027c1.745-0.027 3.48-0.011 5.213-0.027 0.105 2.041 0.839 4.12 2.333 5.563 1.491 1.479 3.6 2.156 5.652 2.385v5.369c-1.923-0.063-3.855-0.463-5.6-1.291-0.76-0.344-1.468-0.787-2.161-1.24-0.009 3.896 0.016 7.787-0.025 11.667-0.104 1.864-0.719 3.719-1.803 5.255-1.744 2.557-4.771 4.224-7.88 4.276-1.907 0.109-3.812-0.411-5.437-1.369-2.693-1.588-4.588-4.495-4.864-7.615-0.032-0.667-0.043-1.333-0.016-1.984 0.24-2.537 1.495-4.964 3.443-6.615 2.208-1.923 5.301-2.839 8.197-2.297 0.027 1.975-0.052 3.948-0.052 5.923-1.323-0.428-2.869-0.308-4.025 0.495-0.844 0.547-1.485 1.385-1.819 2.333-0.276 0.676-0.197 1.427-0.181 2.145 0.317 2.188 2.421 4.027 4.667 3.828 1.489-0.016 2.916-0.88 3.692-2.145 0.251-0.443 0.532-0.896 0.547-1.417 0.131-2.385 0.079-4.76 0.095-7.145 0.011-5.375-0.016-10.735 0.025-16.093z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-500">
            <Link href="/" className="hover:text-haiku-mint transition-colors">
              © 2026 Haiku Business
            </Link>
            {' '}· Automatización e IA para negocios
          </div>
        </div>
      </div>
    </div>
  );
}
