import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1757264119016-7e6b568b810d?w=1920&q=85',
    alt: 'Modern villa with pool',
  },
  {
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85',
    alt: 'Luxury Mediterranean home',
  },
  {
    image: 'https://images.unsplash.com/photo-1598635031829-4bfae29d33eb?w=1920&q=85',
    alt: 'Contemporary Spanish villa',
  },
  {
    image: 'https://images.unsplash.com/photo-1757439402101-55d1da381e70?w=1920&q=85',
    alt: 'Resort villa with mountains',
  },
];

const HeroCarousel = () => {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 900);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section data-testid="hero-carousel" className="relative h-screen w-full overflow-hidden">
      {/* Background slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/50 to-[#0a1628]/80" />

      {/* Content */}
      <div className="absolute inset-0 z-[3] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            data-testid="hero-title"
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#d4a650] mb-6 drop-shadow-lg"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}
          >
            {t.hero.title}
          </h1>
          <p
            data-testid="hero-subtitle"
            className="text-lg sm:text-xl lg:text-2xl text-white mb-4 max-w-3xl mx-auto drop-shadow-md"
          >
            {t.hero.subtitle}
          </p>
          <p className="text-base text-[#d4a650]/90 mb-10 max-w-3xl mx-auto">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#journey">
              <Button
                data-testid="hero-cta-journey"
                className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center space-x-2"
              >
                <span>{t.hero.startJourney}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <Link to="/about">
              <Button
                data-testid="hero-cta-about"
                variant="outline"
                className="border-2 border-white/60 text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 backdrop-blur-sm"
              >
                {t.hero.learnMore}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div data-testid="hero-stat-1" className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#d4a650]/50 transition-all duration-300">
              <div className="text-4xl font-bold text-[#d4a650] mb-2">{t.hero.stat1}</div>
              <div className="text-gray-300 text-sm">{t.hero.stat1Sub}</div>
            </div>
            <div data-testid="hero-stat-2" className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#d4a650]/50 transition-all duration-300">
              <div className="text-4xl font-bold text-[#d4a650] mb-2">{t.hero.stat2}</div>
              <div className="text-gray-300 text-sm">{t.hero.stat2Sub}</div>
            </div>
            <div data-testid="hero-stat-3" className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-[#d4a650]/50 transition-all duration-300">
              <div className="text-4xl font-bold text-[#d4a650] mb-2">{t.hero.stat3}</div>
              <div className="text-gray-300 text-sm">{t.hero.stat3Sub}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        data-testid="hero-carousel-prev"
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-[4] w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        data-testid="hero-carousel-next"
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-[4] w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            data-testid={`hero-carousel-dot-${i}`}
            onClick={() => goTo(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current
                ? 'w-10 h-3 bg-[#d4a650]'
                : 'w-3 h-3 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
