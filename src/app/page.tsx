import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { ResourcesShowcase } from '@/components/landing/ResourcesShowcase';
import { YouTubeVideos } from '@/components/landing/YouTubeVideos';
import { SocialProof } from '@/components/landing/SocialProof';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { ContactForm } from '@/components/landing/ContactForm';
import { AgentSection } from '@/components/landing/AgentSection';
import { FinalCta } from '@/components/landing/FinalCta';
import { Footer } from '@/components/landing/Footer';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Haiku — Automatización e IA para Negocios',
  description: 'Recursos gratuitos, automatización e IA para tu negocio. Descarga guías y herramientas gratis.',
  openGraph: {
    title: 'Haiku — Automatización e IA para Negocios',
    description: 'Automatiza procesos, reduce errores y escala tu negocio con inteligencia artificial.',
    siteName: 'Haiku Business',
    locale: 'es_PE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Haiku — Automatización e IA para Negocios',
    description: 'Automatiza procesos, reduce errores y escala tu negocio con inteligencia artificial.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Haiku Business',
  description: 'Automatización e IA para negocios',
  logo: '/favicon.png',
  sameAs: [
    'https://www.youtube.com/@stivenrosalesc',
    'https://www.instagram.com/stiven.rosalesc/',
    'https://www.linkedin.com/in/stiven-kevin-rosales-casas/',
    'https://www.tiktok.com/@sk.rosales',
  ],
  founder: {
    '@type': 'Person',
    name: 'Stiven Rosales',
  },
};

export default async function HomePage() {
  const recursos = await prisma.recurso.findMany({
    where: { activo: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      titulo: true,
      slug: true,
      descripcion: true,
      icono: true,
    },
  });

  return (
    <div className="min-h-screen bg-haiku-beige overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <SocialProof />
        <AgentSection />
        <ResourcesShowcase recursos={recursos} />
        <BenefitsSection />
        <YouTubeVideos />
        <TestimonialsSection />
        <FaqSection />
        <ContactForm />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
