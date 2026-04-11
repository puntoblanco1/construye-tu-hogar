import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1757264119066-2f627c6a6f03?w=900&q=80',
    cat: 'project',
    en: { title: 'The 37 Valencia Collection', sub: '37 units \u2022 Build at Cost \u2022 Up to 40% savings', badge: 'Featured Project' },
    es: { title: 'The 37 Valencia Collection', sub: '37 unidades \u2022 Construye al Coste \u2022 Hasta 40% ahorro', badge: 'Proyecto Destacado' },
    ar: { title: '\u0645\u062C\u0645\u0648\u0639\u0629 \u0641\u0627\u0644\u0646\u0633\u064A\u0627 37', sub: '37 \u0648\u062D\u062F\u0629 \u2022 \u0628\u0646\u0627\u0621 \u0628\u0627\u0644\u062A\u0643\u0644\u0641\u0629 \u2022 \u062A\u0648\u0641\u064A\u0631 40%', badge: '\u0645\u0634\u0631\u0648\u0639 \u0645\u0645\u064A\u0632' },
  },
  {
    img: 'https://images.unsplash.com/photo-1659259532516-3349b83af553?w=900&q=80',
    cat: 'prototype',
    en: { title: 'Casa 1 \u2014 75 m\u00B2', sub: '1 Bedroom \u2022 Open-plan living \u2022 Perfect for couples', badge: 'Prototype' },
    es: { title: 'Casa 1 \u2014 75 m\u00B2', sub: '1 Dormitorio \u2022 Sal\u00F3n abierto \u2022 Ideal para parejas', badge: 'Prototipo' },
    ar: { title: '\u0643\u0627\u0633\u0627 1 \u2014 75 \u0645\u00B2', sub: '\u063A\u0631\u0641\u0629 \u0648\u0627\u062D\u062F\u0629 \u2022 \u0635\u0627\u0644\u0629 \u0645\u0641\u062A\u0648\u062D\u0629 \u2022 \u0645\u062B\u0627\u0644\u064A \u0644\u0644\u0623\u0632\u0648\u0627\u062C', badge: '\u0646\u0645\u0648\u0630\u062C' },
  },
  {
    img: 'https://images.unsplash.com/photo-1758548157747-285c7012db5b?w=900&q=80',
    cat: 'interior',
    en: { title: 'Modern Open-Plan Living', sub: 'Spacious 34 m\u00B2 living area with premium finishes', badge: 'Interior' },
    es: { title: 'Sal\u00F3n Moderno Abierto', sub: '\u00C1rea de estar de 34 m\u00B2 con acabados premium', badge: 'Interior' },
    ar: { title: '\u0635\u0627\u0644\u0629 \u0645\u0641\u062A\u0648\u062D\u0629 \u0639\u0635\u0631\u064A\u0629', sub: '\u0645\u0633\u0627\u062D\u0629 34 \u0645\u00B2 \u0628\u062A\u0634\u0637\u064A\u0628\u0627\u062A \u0641\u0627\u062E\u0631\u0629', badge: '\u062F\u0627\u062E\u0644\u064A' },
  },
  {
    img: 'https://images.unsplash.com/photo-1660361338465-852edf637532?w=900&q=80',
    cat: 'prototype',
    en: { title: 'Casa 2 \u2014 88 m\u00B2', sub: '2 Bedrooms \u2022 Most Popular \u2022 Ideal for small families', badge: 'Most Popular' },
    es: { title: 'Casa 2 \u2014 88 m\u00B2', sub: '2 Dormitorios \u2022 M\u00E1s Popular \u2022 Ideal para familias', badge: 'M\u00E1s Popular' },
    ar: { title: '\u0643\u0627\u0633\u0627 2 \u2014 88 \u0645\u00B2', sub: '\u063A\u0631\u0641\u062A\u064A\u0646 \u2022 \u0627\u0644\u0623\u0643\u062B\u0631 \u0634\u0639\u0628\u064A\u0629 \u2022 \u0645\u062B\u0627\u0644\u064A \u0644\u0644\u0639\u0627\u0626\u0644\u0627\u062A', badge: '\u0627\u0644\u0623\u0643\u062B\u0631 \u0634\u0639\u0628\u064A\u0629' },
  },
  {
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80',
    cat: 'location',
    en: { title: 'Prime Spanish Locations', sub: 'Properties across Andaluc\u00EDa, Valencia, Madrid & more', badge: 'Location' },
    es: { title: 'Ubicaciones Premium', sub: 'Propiedades en Andaluc\u00EDa, Valencia, Madrid y m\u00E1s', badge: 'Ubicaci\u00F3n' },
    ar: { title: '\u0645\u0648\u0627\u0642\u0639 \u0645\u0645\u064A\u0632\u0629 \u0641\u064A \u0625\u0633\u0628\u0627\u0646\u064A\u0627', sub: '\u0639\u0642\u0627\u0631\u0627\u062A \u0641\u064A \u0623\u0646\u062F\u0644\u0633\u060C \u0641\u0627\u0644\u0646\u0633\u064A\u0627\u060C \u0645\u062F\u0631\u064A\u062F', badge: '\u0627\u0644\u0645\u0648\u0642\u0639' },
  },
  {
    img: 'https://images.unsplash.com/photo-1757439402190-99b73ac8e807?w=900&q=80',
    cat: 'interior',
    en: { title: 'Designer Kitchen & Island', sub: 'Premium appliances and contemporary design', badge: 'Interior' },
    es: { title: 'Cocina de Dise\u00F1o', sub: 'Electrodom\u00E9sticos premium y dise\u00F1o contempor\u00E1neo', badge: 'Interior' },
    ar: { title: '\u0645\u0637\u0628\u062E \u0641\u0627\u062E\u0631', sub: '\u0623\u062C\u0647\u0632\u0629 \u0645\u0645\u064A\u0632\u0629 \u0648\u062A\u0635\u0645\u064A\u0645 \u0639\u0635\u0631\u064A', badge: '\u062F\u0627\u062E\u0644\u064A' },
  },
  {
    img: 'https://images.unsplash.com/photo-1660361338398-5f312b0ca586?w=900&q=80',
    cat: 'prototype',
    en: { title: 'Casa 3 \u2014 128 m\u00B2', sub: '3 Bedrooms \u2022 Master Suite \u2022 Walk-in Closet', badge: 'Premium' },
    es: { title: 'Casa 3 \u2014 128 m\u00B2', sub: '3 Dormitorios \u2022 Suite Principal \u2022 Vestidor', badge: 'Premium' },
    ar: { title: '\u0643\u0627\u0633\u0627 3 \u2014 128 \u0645\u00B2', sub: '3 \u063A\u0631\u0641 \u2022 \u062C\u0646\u0627\u062D \u0631\u0626\u064A\u0633\u064A \u2022 \u063A\u0631\u0641\u0629 \u0645\u0644\u0627\u0628\u0633', badge: '\u0641\u0627\u062E\u0631' },
  },
  {
    img: 'https://images.unsplash.com/photo-1757439402186-86cf1d31c4df?w=900&q=80',
    cat: 'community',
    en: { title: 'Choose Your Neighbors', sub: 'Build with friends & family \u2022 Save up to 30%', badge: 'Community' },
    es: { title: 'Elige a tus Vecinos', sub: 'Construye con amigos y familia \u2022 Ahorra hasta 30%', badge: 'Comunidad' },
    ar: { title: '\u0627\u062E\u062A\u0631 \u062C\u064A\u0631\u0627\u0646\u0643', sub: '\u0627\u0628\u0646\u0650 \u0645\u0639 \u0623\u0635\u062F\u0642\u0627\u0626\u0643 \u2022 \u0648\u0641\u0631 30%', badge: '\u0645\u062C\u062A\u0645\u0639' },
  },
  {
    img: 'https://images.unsplash.com/photo-1772475385317-09f9ef320474?w=900&q=80',
    cat: 'interior',
    en: { title: 'Elegant Living Spaces', sub: 'Contemporary minimalist design with natural light', badge: 'Interior' },
    es: { title: 'Espacios Elegantes', sub: 'Dise\u00F1o minimalista con luz natural', badge: 'Interior' },
    ar: { title: '\u0645\u0633\u0627\u062D\u0627\u062A \u0623\u0646\u064A\u0642\u0629', sub: '\u062A\u0635\u0645\u064A\u0645 \u0628\u0633\u064A\u0637 \u0645\u0639 \u0625\u0636\u0627\u0621\u0629 \u0637\u0628\u064A\u0639\u064A\u0629', badge: '\u062F\u0627\u062E\u0644\u064A' },
  },
];

const BADGE_COLORS = {
  project: 'bg-[#d4a650]',
  prototype: 'bg-blue-600',
  interior: 'bg-emerald-600',
  location: 'bg-purple-600',
  community: 'bg-orange-600',
};

const sectionText = {
  en: { title: 'GALLERY', heading: 'Discover Our World', sub: 'Prototypes, interiors, locations & community' },
  es: { title: 'GALER\u00CDA', heading: 'Descubre Nuestro Mundo', sub: 'Prototipos, interiores, ubicaciones y comunidad' },
  ar: { title: '\u0627\u0644\u0645\u0639\u0631\u0636', heading: '\u0627\u0643\u062A\u0634\u0641 \u0639\u0627\u0644\u0645\u0646\u0627', sub: '\u0627\u0644\u0646\u0645\u0627\u0630\u062C\u060C \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u060C \u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u0645\u062C\u062A\u0645\u0639' },
};

const ShowcaseCarousel = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const t = sectionText[language] || sectionText.en;
  const scrollRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const s = isRTL ? -scrollLeft : scrollLeft;
    setCanLeft(s > 5);
    setCanRight(s < scrollWidth - clientWidth - 5);
  }, [isRTL]);

  useEffect(() => { checkScroll(); }, [checkScroll]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.7;
    el.scrollBy({ left: dir * amount * (isRTL ? -1 : 1), behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  return (
    <section className="py-20 bg-[#0a1628] overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'} data-testid="showcase-carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-2">{t.title}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" data-testid="carousel-heading">{t.heading}</h2>
            <p className="text-gray-400 mt-2">{t.sub}</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => scroll(-1)} disabled={!canLeft}
              className={`w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center transition-colors ${canLeft ? 'text-white hover:bg-[#d4a650] hover:border-[#d4a650]' : 'text-gray-600 cursor-not-allowed'}`}
              data-testid="carousel-prev"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => scroll(1)} disabled={!canRight}
              className={`w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center transition-colors ${canRight ? 'text-white hover:bg-[#d4a650] hover:border-[#d4a650]' : 'text-gray-600 cursor-not-allowed'}`}
              data-testid="carousel-next"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div ref={scrollRef} onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-4 sm:px-[max(1rem,calc((100vw-80rem)/2+1rem))] pb-4"
        style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {SLIDES.map((slide, i) => {
          const s = slide[language] || slide.en;
          return (
            <div key={i} className="flex-shrink-0 w-[300px] sm:w-[380px] group cursor-pointer" style={{ scrollSnapAlign: 'start' }}
              data-testid={`carousel-slide-${i}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-[240px] sm:h-[280px]">
                <img src={slide.img} alt={s.title} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Badge */}
                <span className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} ${BADGE_COLORS[slide.cat] || 'bg-gray-600'} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full`}>
                  {s.badge}
                </span>
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold text-lg mb-1 group-hover:text-[#d4a650] transition-colors">{s.title}</h3>
                  <p className="text-gray-300 text-sm">{s.sub}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile arrows */}
      <div className="flex sm:hidden items-center justify-center gap-3 mt-4">
        <button onClick={() => scroll(-1)} disabled={!canLeft}
          className={`w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center ${canLeft ? 'text-white' : 'text-gray-600'}`}>
          <ChevronLeft className="w-4 h-4" /></button>
        <button onClick={() => scroll(1)} disabled={!canRight}
          className={`w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center ${canRight ? 'text-white' : 'text-gray-600'}`}>
          <ChevronRight className="w-4 h-4" /></button>
      </div>
    </section>
  );
};

export default ShowcaseCarousel;
