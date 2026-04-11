import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';

const HeroCarousel = () => {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section data-testid="hero-carousel" className="relative h-screen w-full overflow-hidden">
      {/* Poster / fallback image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80)' }}
      />

      {/* Background video */}
      <video
        ref={videoRef}
        data-testid="hero-video"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoLoaded(true)}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#0a1628]/60 via-[#0a1628]/40 to-[#0a1628]/75" />

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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-[#d4a650] rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
