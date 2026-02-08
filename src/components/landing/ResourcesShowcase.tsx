'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { AnimatedSection } from './AnimatedSection';
import { Download, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import { ICON_MAP } from '@/lib/icon-map';

interface Recurso {
  id: string;
  titulo: string;
  slug: string;
  descripcion: string;
  icono: string | null;
}

interface ResourcesShowcaseProps {
  recursos: Recurso[];
}

export function ResourcesShowcase({ recursos }: ResourcesShowcaseProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, recursos]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.clientWidth ?? 340;
    const gap = 32; // gap-8 = 2rem = 32px
    const distance = cardWidth + gap;
    el.scrollBy({ left: direction === 'left' ? -distance : distance, behavior: 'smooth' });
  };

  if (recursos.length === 0) {
    return (
      <section id="recursos" className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-xl text-gray-500">Próximamente nuevos recursos</p>
        </div>
      </section>
    );
  }

  return (
    <section id="recursos" className="py-14 lg:py-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="text-center mb-10">
          <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
            Recursos Gratuitos
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-haiku-black mb-4">
            Descarga herramientas para tu negocio
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guías, plantillas y recursos listos para usar. Solo elige el que necesitas.
          </p>
        </AnimatedSection>

        {/* Carousel */}
        <AnimatedSection>
          <div className="relative group/carousel">
            {/* Left arrow */}
            {canScrollLeft && (
              <button
                onClick={() => scroll('left')}
                className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-haiku-black hover:bg-haiku-mint hover:text-white transition-colors opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
                aria-label="Ver anteriores"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Right arrow */}
            {canScrollRight && (
              <button
                onClick={() => scroll('right')}
                className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-haiku-black hover:bg-haiku-mint hover:text-white transition-colors opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
                aria-label="Ver más"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}

            {/* Scroll container */}
            <div
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mb-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {recursos.map((recurso) => (
                <Link
                  key={recurso.id}
                  href={`/r/${recurso.slug}`}
                  data-card
                  className="group flex-shrink-0 w-[85vw] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] snap-start block bg-white rounded-[24px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Icon */}
                  <div className="relative aspect-video bg-gradient-to-br from-haiku-mint/20 to-haiku-mint/5 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {(() => {
                        const iconEntry = recurso.icono ? ICON_MAP[recurso.icono] : null;
                        const IconComponent = iconEntry?.icon ?? Download;
                        return (
                          <IconComponent
                            className="w-12 h-12 text-haiku-mint/60 group-hover:scale-110 transition-transform duration-500"
                          />
                        );
                      })()}
                    </div>
                    {/* Badge */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-haiku-mint text-white text-xs font-semibold rounded-full">
                      Gratis
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display text-lg font-semibold text-haiku-black mb-2 group-hover:text-haiku-mint transition-colors">
                      {recurso.titulo}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {recurso.descripcion}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-haiku-mint">
                      Descargar Gratis
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Scroll hint gradient - right */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-haiku-beige to-transparent pointer-events-none" />
            )}

            {/* Scroll hint gradient - left */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-haiku-beige to-transparent pointer-events-none" />
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
