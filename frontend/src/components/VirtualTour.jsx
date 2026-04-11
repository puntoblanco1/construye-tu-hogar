import React, { useState } from 'react';
import { X, Move, ChevronLeft, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ROOM_IMAGES = {
  living: 'https://images.unsplash.com/photo-1648475236583-2e25a6cbf3bd?w=1400&q=80',
  bedroom_double: 'https://images.unsplash.com/photo-1766928210452-2470f91bae26?w=1400&q=80',
  bedroom_single: 'https://images.unsplash.com/photo-1772567732957-29e0c950f3ca?w=1400&q=80',
  bedroom_master: 'https://images.unsplash.com/photo-1762803733564-fecc7669a91a?w=1400&q=80',
  bathroom: 'https://images.unsplash.com/photo-1758548157466-7c454382035a?w=1400&q=80',
  walkin: 'https://images.unsplash.com/photo-1774812184032-8f55b7e18af8?w=1400&q=80',
};

const labels = {
  en: { living: 'Living / Kitchen', bed_d: 'Double Bed', bed_s: 'Single Bed', bed_m: 'Master Bed', bath: 'Bath', walkin: 'Walk-in', util: 'Utilities', title: 'Floor Plans Comparison', sub: 'All three models at real proportional scale', drag: 'Drag to look around', back: 'Back', tour: 'Compare Floor Plans', area: 'Total', ceiling: 'Ceiling: 2.70m' },
  es: { living: 'Sal\u00F3n / Cocina', bed_d: 'Dorm. Doble', bed_s: 'Dorm. Indiv.', bed_m: 'Dorm. Principal', bath: 'Ba\u00F1o', walkin: 'Vestidor', util: 'Instalaciones', title: 'Comparaci\u00F3n de Planos', sub: 'Los tres modelos a escala proporcional real', drag: 'Arrastra para mirar', back: 'Volver', tour: 'Comparar Planos', area: 'Total', ceiling: 'Altura: 2.70m' },
  ar: { living: '\u0635\u0627\u0644\u0629 / \u0645\u0637\u0628\u062E', bed_d: '\u063A\u0631\u0641\u0629 \u0645\u0632\u062F\u0648\u062C\u0629', bed_s: '\u063A\u0631\u0641\u0629 \u0641\u0631\u062F\u064A\u0629', bed_m: '\u063A\u0631\u0641\u0629 \u0631\u0626\u064A\u0633\u064A\u0629', bath: '\u062D\u0645\u0627\u0645', walkin: '\u0645\u0644\u0627\u0628\u0633', util: '\u062E\u062F\u0645\u0627\u062A', title: '\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A', sub: '\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062B\u0644\u0627\u062B\u0629 \u0628\u0646\u0633\u0628 \u062D\u0642\u064A\u0642\u064A\u0629', drag: '\u0627\u0633\u062D\u0628 \u0644\u0644\u0646\u0638\u0631', back: '\u0639\u0648\u062F\u0629', tour: '\u0642\u0627\u0631\u0646 \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A', area: '\u0627\u0644\u0645\u062C\u0645\u0648\u0639', ceiling: '\u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639: 2.70\u0645' },
};

// Scale factor: 1 m = 20 SVG units. All dimensions from PDF.
const S = 20;

// Casa 1: 75 m² — 8.55m x 8.78m
const CASA1_W = 8.55 * S;
const CASA1_H = 8.78 * S;
const CASA1_ROOMS = [
  { id: 'living', lbl: 'living', x: 2, y: 2, w: 7.80 * S, h: 4.38 * S, size: '34.17', img: 'living', color: '#e8d5a8' },
  { id: 'bed1', lbl: 'bed_d', x: 2, y: 4.50 * S, w: 4.20 * S, h: 3.15 * S, size: '13.21', img: 'bedroom_double', color: '#a8c8e8' },
  { id: 'bath1', lbl: 'bath', x: 4.30 * S, y: 4.50 * S, w: 1.80 * S, h: 3.15 * S, size: '5.68', img: 'bathroom', color: '#a8e8c8' },
  { id: 'util1', lbl: 'util', x: 6.20 * S, y: 4.50 * S, w: 1.73 * S, h: 3.15 * S, size: '11.81', img: null, color: '#d0d0d0' },
];

// Casa 2: 88 m² — 10.28m x 8.78m
const CASA2_W = 10.28 * S;
const CASA2_H = 8.78 * S;
const CASA2_ROOMS = [
  { id: 'living', lbl: 'living', x: 2, y: 2, w: 7.80 * S, h: 4.38 * S, size: '34.17', img: 'living', color: '#e8d5a8' },
  { id: 'bed1', lbl: 'bed_d', x: 2, y: 4.50 * S, w: 4.20 * S, h: 3.15 * S, size: '13.21', img: 'bedroom_double', color: '#a8c8e8' },
  { id: 'bed2', lbl: 'bed_s', x: 4.30 * S, y: 4.50 * S, w: 4.20 * S, h: 3.15 * S, size: '13.21', img: 'bedroom_single', color: '#c8a8e8' },
  { id: 'bath1', lbl: 'bath', x: 7.90 * S, y: 2, w: 1.80 * S, h: 3.15 * S, size: '5.68', img: 'bathroom', color: '#a8e8c8' },
  { id: 'util1', lbl: 'util', x: 7.90 * S, y: 3.30 * S, w: 1.80 * S, h: 4.35 * S, size: '11.81', img: null, color: '#d0d0d0' },
];

// Casa 3: 128 m² — 12.60m x 10.16m
const CASA3_W = 12.60 * S;
const CASA3_H = 10.16 * S;
const CASA3_ROOMS = [
  { id: 'living', lbl: 'living', x: 2, y: 2, w: 7.80 * S, h: 4.38 * S, size: '34.17', img: 'living', color: '#e8d5a8' },
  { id: 'bed_m', lbl: 'bed_m', x: 2, y: 4.50 * S, w: 5.10 * S, h: 3.95 * S, size: '20.13', img: 'bedroom_master', color: '#8cb8e8' },
  { id: 'walkin', lbl: 'walkin', x: 5.20 * S, y: 4.50 * S, w: 2.80 * S, h: 2.82 * S, size: '7.89', img: 'walkin', color: '#e8c8a8' },
  { id: 'bed_s1', lbl: 'bed_s', x: 7.90 * S, y: 2, w: 4.20 * S, h: 3.15 * S, size: '13.21', img: 'bedroom_single', color: '#c8a8e8' },
  { id: 'bed_s2', lbl: 'bed_s', x: 7.90 * S, y: 3.25 * S, w: 4.20 * S, h: 3.15 * S, size: '13.21', img: 'bedroom_single', color: '#c8a8e8' },
  { id: 'bath1', lbl: 'bath', x: 5.20 * S, y: 7.40 * S, w: 2.80 * S, h: 2.03 * S, size: '5.68', img: 'bathroom', color: '#a8e8c8' },
  { id: 'bath2', lbl: 'bath', x: 7.90 * S, y: 6.50 * S, w: 1.80 * S, h: 2.93 * S, size: '5.68', img: 'bathroom', color: '#a8e8c8' },
  { id: 'util1', lbl: 'util', x: 9.80 * S, y: 6.50 * S, w: 2.30 * S, h: 2.93 * S, size: '11.81', img: null, color: '#d0d0d0' },
];

const HOUSES = [
  { id: 1, rooms: CASA1_ROOMS, w: CASA1_W, h: CASA1_H, area: 75, dims: '8.55 x 8.78m' },
  { id: 2, rooms: CASA2_ROOMS, w: CASA2_W, h: CASA2_H, area: 88, dims: '10.28 x 8.78m' },
  { id: 3, rooms: CASA3_ROOMS, w: CASA3_W, h: CASA3_H, area: 128, dims: '12.60 x 10.16m' },
];

const PanoViewer = ({ image, roomName, roomSize, lang, onClose }) => {
  const t = labels[lang] || labels.en;
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = React.useRef(0);
  const offsetStart = React.useRef(0);

  React.useEffect(() => {
    if (dragging) return;
    let frame, dir = 1, pos = offset;
    const animate = () => {
      pos += 0.03 * dir;
      if (pos > 15) dir = -1;
      if (pos < -15) dir = 1;
      setOffset(pos);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [dragging]);

  return (
    <div className="fixed inset-0 z-[80] bg-black flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 bg-black/80">
        <div>
          <h3 className="text-white font-bold text-xl">{roomName}</h3>
          <p className="text-gray-400 text-sm">{t.area}: {roomSize} m&sup2; &middot; {t.ceiling}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm flex items-center gap-2"><Move className="w-4 h-4" />{t.drag}</span>
          <button onClick={onClose} className="text-white hover:text-[#d4a650] p-2"><X className="w-6 h-6" /></button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onPointerDown={e => { setDragging(true); dragStart.current = e.clientX; offsetStart.current = offset; e.target.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if (dragging) setOffset(offsetStart.current + (e.clientX - dragStart.current) * 0.15); }}
        onPointerUp={() => setDragging(false)}
      >
        <img src={image} alt={roomName} className="w-full h-full object-cover" draggable="false"
          style={{ objectPosition: `${50 + offset * 2}% 50%`, transition: dragging ? 'none' : 'object-position 0.1s' }} />
      </div>
      <div className="px-6 py-3 bg-black/80 flex justify-center">
        <button onClick={onClose} className="text-[#d4a650] text-sm font-medium flex items-center gap-2"><ChevronLeft className="w-4 h-4" />{t.back}</button>
      </div>
    </div>
  );
};

const FloorPlan = ({ house, lang, hovered, setHovered, onRoomClick }) => {
  const t = labels[lang] || labels.en;
  const pad = 8;
  const vw = house.w + pad * 2;
  const vh = house.h + pad * 2 + 20;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 text-center">
        <span className="inline-block bg-[#d4a650] text-[#0a1628] text-xs font-bold px-3 py-1 rounded-full">
          Casa {house.id}
        </span>
      </div>
      <svg viewBox={`0 0 ${vw} ${vh}`} className="w-full" style={{ maxHeight: '50vh' }}>
        {/* Outer wall */}
        <rect x={pad} y={pad} width={house.w} height={house.h} fill="#1a2744" rx="3" stroke="#2a3a5a" strokeWidth="2" />

        {/* Rooms */}
        {house.rooms.map(room => {
          const isH = hovered === `${house.id}-${room.id}`;
          const clickable = !!room.img;
          const fontSize = Math.min(room.w, room.h) > 50 ? 8 : 6;
          return (
            <g key={room.id}
              onMouseEnter={() => setHovered(`${house.id}-${room.id}`)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => clickable && onRoomClick(room)}
              style={{ cursor: clickable ? 'pointer' : 'default' }}
            >
              <rect
                x={pad + room.x} y={pad + room.y} width={room.w} height={room.h} rx="2"
                fill={isH && clickable ? room.color : room.color + '35'}
                stroke={isH && clickable ? '#d4a650' : room.color + '90'}
                strokeWidth={isH && clickable ? 2 : 1}
              />
              <text x={pad + room.x + room.w / 2} y={pad + room.y + room.h / 2 - 4}
                textAnchor="middle" fill={isH && clickable ? '#0a1628' : '#ccc'}
                fontSize={fontSize} fontWeight="600" style={{ pointerEvents: 'none' }}>
                {t[room.lbl] || room.lbl}
              </text>
              <text x={pad + room.x + room.w / 2} y={pad + room.y + room.h / 2 + 6}
                textAnchor="middle" fill={isH && clickable ? '#0a1628' : '#d4a650'}
                fontSize={fontSize - 1} fontWeight="500" style={{ pointerEvents: 'none' }}>
                {room.size} m&sup2;
              </text>
              {isH && clickable && (
                <text x={pad + room.x + room.w / 2} y={pad + room.y + room.h / 2 + 16}
                  textAnchor="middle" fill="#0a1628" fontSize="5" fontWeight="700">
                  &#9654; EXPLORE
                </text>
              )}
            </g>
          );
        })}

        {/* Total area label */}
        <text x={pad + house.w / 2} y={pad + house.h + 14}
          textAnchor="middle" fill="#d4a650" fontSize="9" fontWeight="700">
          {house.area} m&sup2; &mdash; {house.dims}
        </text>
      </svg>
    </div>
  );
};

const VirtualTour = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = labels[language] || labels.en;
  const [hovered, setHovered] = useState(null);
  const [panoRoom, setPanoRoom] = useState(null);

  if (!isOpen) return null;

  if (panoRoom) {
    return (
      <PanoViewer
        image={ROOM_IMAGES[panoRoom.img]}
        roomName={t[panoRoom.lbl] || panoRoom.lbl}
        roomSize={panoRoom.size}
        lang={language}
        onClose={() => setPanoRoom(null)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()} data-testid="virtual-tour-modal">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 sticky top-0 bg-[#0a1628] z-10">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#d4a650]" /> {t.title}
            </h2>
            <p className="text-gray-400 text-sm">{t.sub}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
        </div>

        {/* All 3 floor plans side by side at proportional scale */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {HOUSES.map(house => (
            <FloorPlan
              key={house.id}
              house={house}
              lang={language}
              hovered={hovered}
              setHovered={setHovered}
              onRoomClick={room => setPanoRoom(room)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
