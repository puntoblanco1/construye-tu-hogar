import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';

const phases = [
  { src: '/videos/build-phase1.mp4', poster: 'https://images.pexels.com/videos/34786623/pexels-photo-34786623.jpeg?w=1920' },
  { src: '/videos/build-phase3.mp4', poster: 'https://images.pexels.com/videos/34289833/building-building-site-cement-civil-engineering-34289833.jpeg?w=1920' },
  { src: '/videos/build-phase2.mp4', poster: 'https://images.pexels.com/videos/35904584/pexels-photo-35904584.jpeg?w=1920' },
  { src: '/videos/hero-video.mp4', poster: 'https://images.pexels.com/videos/17224719/architectural-design-architectural-designs-beautiful-home-building-exterior-17224719.jpeg?w=1920' },
];

const phaseLabels = {
  en: ['Foundation & Structure', 'Building Progress', 'Construction Details', 'Your Dream Home'],
  es: ['Cimentación y Estructura', 'Avance de Obra', 'Detalles de Construcción', 'Tu Casa de Ensueño'],
  ar: ['الأساسات والهيكل', 'تقدم البناء', 'تفاصيل البناء', 'منزل أحلامك'],
};

const HeroCarousel = () => {
  const { t, language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const videoRefs = useRef([]);
  const timerRef = useRef(null);
  const labels = phaseLabels[language] || phaseLabels.en;

  const goToNext = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % phases.length);
      setFading(false);
    }, 800);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(goToNext, 8000);
    return () => clearInterval(timerRef.current);
  }, [goToNext]);

  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === current) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [current]);

  return (
    <section data-testid="hero-carousel" className="relative h-screen w-full overflow-hidden bg-[#0a1628]">
      {/* Video layers */}
      {phases.map((phase, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === current && !fading ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <video
            ref={el => videoRefs.current[i] = el}
            data-testid={i === 0 ? 'hero-video' : undefined}
            className="w-full h-full object-cover"
            muted
            playsInline
            loop
            preload={i <= 1 ? 'auto' : 'metadata'}
            poster={phase.poster}
          >
            <source src={phase.src} type="video/mp4" />
          </video>
        </div>
      ))}

      {/* Overlay - darker for better text readability */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#0a1628]/70 via-[#0a1628]/45 to-[#0a1628]/80" />

      {/* Content - centered */}
      <div className="absolute inset-0 z-[3] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            data-testid="hero-title"
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6"
            style={{ textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}
          >
            {t.hero.title}
          </h1>
          <p
            data-testid="hero-subtitle"
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-4 max-w-3xl mx-auto"
            style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}
          >
            {t.hero.subtitle}
          </p>
          <p className="text-base text-[#d4a650] mb-10 max-w-3xl mx-auto">
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

      {/* Phase indicators + label - bottom left, not overlapping title */}
      <div className="absolute bottom-20 left-6 sm:left-10 z-[4] flex items-center gap-4">
        <div className="flex items-center gap-2">
          {phases.map((_, i) => (
            <button
              key={i}
              onClick={() => { clearInterval(timerRef.current); setCurrent(i); timerRef.current = setInterval(goToNext, 8000); }}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? 'w-8 h-8 bg-[#d4a650] text-[#0a1628] text-xs font-bold shadow-lg'
                  : 'w-8 h-8 bg-white/15 backdrop-blur-sm text-white/70 text-xs hover:bg-white/25'
              } flex items-center justify-center`}
              data-testid={`phase-indicator-${i}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span
          data-testid="phase-label"
          className={`text-xs sm:text-sm tracking-widest uppercase font-semibold transition-all duration-700 ${fading ? 'opacity-0' : 'opacity-100'}`}
          style={{ color: '#d4a650' }}
        >
          {labels[current]}
        </span>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] h-1 bg-white/10">
        <div
          className="h-full bg-[#d4a650]"
          style={{ width: `${((current + 1) / phases.length) * 100}%`, transition: 'width 8s linear' }}
          key={current}
        />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 animate-bounce">
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-[#d4a650] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
