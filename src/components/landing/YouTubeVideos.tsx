'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatedSection } from './AnimatedSection';
import { ChevronLeft, ChevronRight, Play, Youtube } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  link: string;
}

export function YouTubeVideos() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    fetch('/api/youtube')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.videos || []);
        setLoading(false);
        // Check scroll after videos render
        setTimeout(checkScroll, 100);
      })
      .catch(() => setLoading(false));
  }, [checkScroll]);

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
  }, [checkScroll, videos]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-video-card]')?.clientWidth ?? 340;
    const gap = 32;
    const distance = cardWidth + gap;
    el.scrollBy({ left: direction === 'left' ? -distance : distance, behavior: 'smooth' });
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('es-PE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const formatViews = (count: number) => {
    if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
    if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
    return count.toString();
  };

  // Don't render section if no videos and not loading
  if (!loading && videos.length === 0) return null;

  return (
    <section className="py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-6">
          <div>
            <p className="text-sm font-semibold tracking-widest text-haiku-mint uppercase mb-3">
              YouTube
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-haiku-black">
              Videos más populares
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border-2 border-haiku-black flex items-center justify-center text-haiku-black hover:bg-haiku-black hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-haiku-black disabled:cursor-not-allowed"
              aria-label="Ver anteriores"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border-2 border-haiku-black flex items-center justify-center text-haiku-black hover:bg-haiku-black hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-haiku-black disabled:cursor-not-allowed"
              aria-label="Ver más"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </AnimatedSection>

        {/* Loading skeleton */}
        {loading && (
          <div className="flex gap-8 overflow-hidden">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[85vw] sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] animate-pulse"
              >
                <div className="aspect-video bg-gray-200 rounded-[20px] mb-4" />
                <div className="h-3 bg-gray-200 rounded w-24 mb-3" />
                <div className="h-5 bg-gray-200 rounded w-full mb-2" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* Carousel */}
        {!loading && videos.length > 0 && (
          <AnimatedSection>
            <div className="relative group/carousel">
              {/* Scroll container */}
              <div
                ref={scrollRef}
                className="flex gap-8 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {videos.map((video) => (
                  <a
                    key={video.id}
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-video-card
                    className="group flex-shrink-0 w-[85vw] sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] snap-start block"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video rounded-[20px] overflow-hidden mb-4 bg-gray-100">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                          <Play className="w-6 h-6 text-haiku-black fill-haiku-black ml-0.5" />
                        </div>
                      </div>
                    </div>

                    {/* Date + Views */}
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(video.publishedAt)}
                      {video.viewCount > 0 && (
                        <span className="ml-2">· {formatViews(video.viewCount)} views</span>
                      )}
                    </p>

                    {/* Title */}
                    <h3 className="font-display text-lg font-semibold text-haiku-black leading-snug mb-3 line-clamp-3 group-hover:text-haiku-mint transition-colors">
                      {video.title}
                    </h3>

                    {/* View link */}
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-haiku-black group-hover:text-haiku-mint transition-colors">
                      Ver
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </a>
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

            {/* Subscribe CTA */}
            <div className="mt-10 text-center">
              <a
                href="https://www.youtube.com/@stivenrosalesc?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-colors text-sm"
              >
                <Youtube className="w-5 h-5" />
                Suscríbete al canal
              </a>
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
