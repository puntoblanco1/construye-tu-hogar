import React, { useState } from 'react';
import { Bed, Bath, Ruler, Maximize, ChevronRight, Check, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';
import VirtualTour from './VirtualTour';

const HOUSES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1659259532516-3349b83af553?w=800&q=80',
    area: 75,
    bedrooms: 1,
    bathrooms: 1,
    living: 34.17,
    rooms: [
      { en: 'Open-plan Living/Kitchen/Dining', es: 'Sal\u00F3n/Cocina/Comedor abierto', ar: '\u0635\u0627\u0644\u0629/\u0645\u0637\u0628\u062E/\u063A\u0631\u0641\u0629 \u0637\u0639\u0627\u0645 \u0645\u0641\u062A\u0648\u062D\u0629', size: '34.17 m\u00B2' },
      { en: 'Double Bedroom', es: 'Dormitorio Doble', ar: '\u063A\u0631\u0641\u0629 \u0646\u0648\u0645 \u0645\u0632\u062F\u0648\u062C\u0629', size: '13.21 m\u00B2' },
      { en: 'Full Bathroom', es: 'Ba\u00F1o Completo', ar: '\u062D\u0645\u0627\u0645 \u0643\u0627\u0645\u0644', size: '5.68 m\u00B2' },
    ],
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1660361338465-852edf637532?w=800&q=80',
    area: 88,
    bedrooms: 2,
    bathrooms: 1,
    living: 34.17,
    rooms: [
      { en: 'Open-plan Living/Kitchen/Dining', es: 'Sal\u00F3n/Cocina/Comedor abierto', ar: '\u0635\u0627\u0644\u0629/\u0645\u0637\u0628\u062E/\u063A\u0631\u0641\u0629 \u0637\u0639\u0627\u0645 \u0645\u0641\u062A\u0648\u062D\u0629', size: '34.17 m\u00B2' },
      { en: 'Double Bedroom', es: 'Dormitorio Doble', ar: '\u063A\u0631\u0641\u0629 \u0646\u0648\u0645 \u0645\u0632\u062F\u0648\u062C\u0629', size: '13.21 m\u00B2' },
      { en: 'Single Bedroom', es: 'Dormitorio Individual', ar: '\u063A\u0631\u0641\u0629 \u0646\u0648\u0645 \u0641\u0631\u062F\u064A\u0629', size: '13.21 m\u00B2' },
      { en: 'Full Bathroom', es: 'Ba\u00F1o Completo', ar: '\u062D\u0645\u0627\u0645 \u0643\u0627\u0645\u0644', size: '5.68 m\u00B2' },
    ],
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1660361338398-5f312b0ca586?w=800&q=80',
    area: 128,
    bedrooms: 3,
    bathrooms: 2,
    living: 34.17,
    hasWalkIn: true,
    rooms: [
      { en: 'Open-plan Living/Kitchen/Dining', es: 'Sal\u00F3n/Cocina/Comedor abierto', ar: '\u0635\u0627\u0644\u0629/\u0645\u0637\u0628\u062E/\u063A\u0631\u0641\u0629 \u0637\u0639\u0627\u0645 \u0645\u0641\u062A\u0648\u062D\u0629', size: '34.17 m\u00B2' },
      { en: 'Master Bedroom + Walk-in', es: 'Dormitorio Principal + Vestidor', ar: '\u063A\u0631\u0641\u0629 \u0631\u0626\u064A\u0633\u064A\u0629 + \u063A\u0631\u0641\u0629 \u0645\u0644\u0627\u0628\u0633', size: '20.13 + 7.89 m\u00B2' },
      { en: '2 Single Bedrooms', es: '2 Dormitorios Individuales', ar: '2 \u063A\u0631\u0641 \u0646\u0648\u0645 \u0641\u0631\u062F\u064A\u0629', size: '13.21 m\u00B2 each' },
      { en: '2 Full Bathrooms', es: '2 Ba\u00F1os Completos', ar: '2 \u062D\u0645\u0627\u0645\u0627\u062A \u0643\u0627\u0645\u0644\u0629', size: '5.68 m\u00B2 each' },
    ],
  },
];

const content = {
  en: {
    sectionTitle: 'HOUSE PROTOTYPES',
    heading: 'Choose Your Ideal Home',
    subheading: 'Three carefully designed prototypes to suit every family size and lifestyle.',
    beds: 'Bedrooms',
    baths: 'Bathrooms',
    area: 'Total Area',
    living: 'Living Area',
    includes: 'Includes',
    select: 'Choose This Model',
    selected: 'Selected',
    popular: 'Most Popular',
    tour: 'Virtual Tour',
    casa: 'Casa',
  },
  es: {
    sectionTitle: 'PROTOTIPOS DE CASAS',
    heading: 'Elige Tu Hogar Ideal',
    subheading: 'Tres prototipos cuidadosamente dise\u00F1ados para cada tama\u00F1o de familia y estilo de vida.',
    beds: 'Dormitorios',
    baths: 'Ba\u00F1os',
    area: '\u00C1rea Total',
    living: 'Sal\u00F3n',
    includes: 'Incluye',
    select: 'Elegir Este Modelo',
    selected: 'Seleccionado',
    popular: 'M\u00E1s Popular',
    tour: 'Tour Virtual',
    casa: 'Casa',
  },
  ar: {
    sectionTitle: '\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u0645\u0646\u0627\u0632\u0644',
    heading: '\u0627\u062E\u062A\u0631 \u0645\u0646\u0632\u0644\u0643 \u0627\u0644\u0645\u062B\u0627\u0644\u064A',
    subheading: '\u062B\u0644\u0627\u062B\u0629 \u0646\u0645\u0627\u0630\u062C \u0645\u0635\u0645\u0645\u0629 \u0628\u0639\u0646\u0627\u064A\u0629 \u0644\u062A\u0646\u0627\u0633\u0628 \u0643\u0644 \u062D\u062C\u0645 \u0639\u0627\u0626\u0644\u0629 \u0648\u0646\u0645\u0637 \u062D\u064A\u0627\u0629.',
    beds: '\u063A\u0631\u0641 \u0627\u0644\u0646\u0648\u0645',
    baths: '\u0627\u0644\u062D\u0645\u0627\u0645\u0627\u062A',
    area: '\u0627\u0644\u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0643\u0644\u064A\u0629',
    living: '\u0627\u0644\u0635\u0627\u0644\u0629',
    includes: '\u064A\u0634\u0645\u0644',
    select: '\u0627\u062E\u062A\u0631 \u0647\u0630\u0627 \u0627\u0644\u0646\u0645\u0648\u0630\u062C',
    selected: '\u062A\u0645 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631',
    popular: '\u0627\u0644\u0623\u0643\u062B\u0631 \u0634\u0639\u0628\u064A\u0629',
    tour: '\u062C\u0648\u0644\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629',
    casa: '\u0643\u0627\u0633\u0627',
  }
};

const PrototypesSection = ({ selectable = false, onSelect, selectedId }) => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const txt = content[language] || content.en;
  const [hoveredId, setHoveredId] = useState(null);
  const [tourHouseId, setTourHouseId] = useState(null);

  return (
    <section className="py-20 bg-white" dir={isRTL ? 'rtl' : 'ltr'} id="prototypes" data-testid="prototypes-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-3">{txt.sectionTitle}</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4" data-testid="prototypes-heading">{txt.heading}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{txt.subheading}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOUSES.map((house) => {
            const isSelected = selectedId === house.id;
            const isHovered = hoveredId === house.id;
            return (
              <div
                key={house.id}
                onMouseEnter={() => setHoveredId(house.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative bg-white rounded-2xl overflow-hidden transition-all duration-500 ${
                  isSelected ? 'ring-2 ring-[#d4a650] shadow-2xl scale-[1.02]' :
                  isHovered ? 'shadow-2xl -translate-y-2' : 'shadow-lg'
                } ${house.id === 2 ? 'md:-translate-y-4' : ''}`}
                data-testid={`prototype-card-${house.id}`}
              >
                {/* Popular badge for Casa 2 */}
                {house.id === 2 && (
                  <div className="absolute top-4 right-4 z-10 bg-[#d4a650] text-[#0a1628] text-xs font-bold px-3 py-1 rounded-full">
                    {txt.popular}
                  </div>
                )}

                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={house.image}
                    alt={`${txt.casa} ${house.id}`}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">{txt.casa} {house.id}</h3>
                    <p className="text-[#d4a650] font-semibold text-lg">{house.area} m&sup2;</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-2 p-4 bg-gray-50 border-b border-gray-100">
                  <div className="text-center">
                    <Bed className="w-5 h-5 text-[#d4a650] mx-auto mb-1" />
                    <span className="text-xs text-gray-500 block">{txt.beds}</span>
                    <span className="font-bold text-[#0a1628]">{house.bedrooms}</span>
                  </div>
                  <div className="text-center">
                    <Bath className="w-5 h-5 text-[#d4a650] mx-auto mb-1" />
                    <span className="text-xs text-gray-500 block">{txt.baths}</span>
                    <span className="font-bold text-[#0a1628]">{house.bathrooms}</span>
                  </div>
                  <div className="text-center">
                    <Maximize className="w-5 h-5 text-[#d4a650] mx-auto mb-1" />
                    <span className="text-xs text-gray-500 block">{txt.area}</span>
                    <span className="font-bold text-[#0a1628]">{house.area}</span>
                  </div>
                  <div className="text-center">
                    <Ruler className="w-5 h-5 text-[#d4a650] mx-auto mb-1" />
                    <span className="text-xs text-gray-500 block">{txt.living}</span>
                    <span className="font-bold text-[#0a1628]">{house.living}</span>
                  </div>
                </div>

                {/* Room details */}
                <div className="p-5">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{txt.includes}</p>
                  <ul className="space-y-2">
                    {house.rooms.map((room, i) => (
                      <li key={i} className={`flex items-center justify-between text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className="text-gray-700 flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#d4a650]" />
                          {room[language] || room.en}
                        </span>
                        <span className="text-gray-400 text-xs">{room.size}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Virtual Tour Button */}
                  <button
                    onClick={() => setTourHouseId(house.id)}
                    className="w-full mt-4 py-2.5 rounded-lg border-2 border-dashed border-[#d4a650]/40 hover:border-[#d4a650] text-[#d4a650] hover:bg-[#d4a650]/5 transition-all flex items-center justify-center gap-2 text-sm font-semibold"
                    data-testid={`tour-btn-${house.id}`}
                  >
                    <Eye className="w-4 h-4" />
                    {txt.tour}
                  </button>
                </div>

                {/* Action */}
                {selectable && (
                  <div className="px-5 pb-5">
                    <Button
                      onClick={() => onSelect?.(house.id)}
                      className={`w-full py-5 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'bg-[#d4a650] text-[#0a1628]'
                          : 'bg-[#0a1628] hover:bg-[#0a1628]/90 text-white'
                      }`}
                      data-testid={`select-prototype-${house.id}`}
                    >
                      {isSelected ? <><Check className="w-5 h-5" />{txt.selected}</> : <>{txt.select}<ChevronRight className="w-5 h-5" /></>}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Virtual Tour Modal */}
      <VirtualTour houseId={tourHouseId} isOpen={!!tourHouseId} onClose={() => setTourHouseId(null)} />
    </section>
  );
};

export default PrototypesSection;
