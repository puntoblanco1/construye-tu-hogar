import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Eye, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const labels = {
  en: { title: 'Virtual Tour', living: 'Living / Kitchen', bed_d: 'Double Bedroom', bed_s: 'Single Bedroom', bed_m: 'Master Bedroom', bath: 'Bathroom', walkin: 'Walk-in Closet', util: 'Utilities', clickExplore: 'Click a room on the plan or watch the walkthrough', playing: 'Walkthrough playing...', paused: 'Paused' },
  es: { title: 'Tour Virtual', living: 'Sal\u00F3n / Cocina', bed_d: 'Dormitorio Doble', bed_s: 'Dormitorio Individual', bed_m: 'Dormitorio Principal', bath: 'Ba\u00F1o', walkin: 'Vestidor', util: 'Instalaciones', clickExplore: 'Haz clic en una habitaci\u00F3n o mira el recorrido', playing: 'Recorrido en curso...', paused: 'Pausado' },
  ar: { title: '\u062C\u0648\u0644\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629', living: '\u0635\u0627\u0644\u0629 / \u0645\u0637\u0628\u062E', bed_d: '\u063A\u0631\u0641\u0629 \u0646\u0648\u0645 \u0645\u0632\u062F\u0648\u062C\u0629', bed_s: '\u063A\u0631\u0641\u0629 \u0646\u0648\u0645 \u0641\u0631\u062F\u064A\u0629', bed_m: '\u063A\u0631\u0641\u0629 \u0631\u0626\u064A\u0633\u064A\u0629', bath: '\u062D\u0645\u0627\u0645', walkin: '\u063A\u0631\u0641\u0629 \u0645\u0644\u0627\u0628\u0633', util: '\u062E\u062F\u0645\u0627\u062A', clickExplore: '\u0627\u0636\u063A\u0637 \u063A\u0631\u0641\u0629 \u0623\u0648 \u0634\u0627\u0647\u062F \u0627\u0644\u062C\u0648\u0644\u0629', playing: '\u0627\u0644\u062C\u0648\u0644\u0629 \u062C\u0627\u0631\u064A\u0629...', paused: '\u0645\u062A\u0648\u0642\u0641' },
};

// Room images - multiple per type for cinematic feel
const ROOM_IMAGES = {
  living: [
    'https://images.unsplash.com/photo-1648475236583-2e25a6cbf3bd?w=1400&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=80',
  ],
  bed_d: [
    'https://images.unsplash.com/photo-1766928210452-2470f91bae26?w=1400&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=80',
  ],
  bed_s: [
    'https://images.unsplash.com/photo-1772567732957-29e0c950f3ca?w=1400&q=80',
  ],
  bed_m: [
    'https://images.unsplash.com/photo-1762803733564-fecc7669a91a?w=1400&q=80',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1400&q=80',
  ],
  bath: [
    'https://images.unsplash.com/photo-1758548157466-7c454382035a?w=1400&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1400&q=80',
  ],
  walkin: [
    'https://images.unsplash.com/photo-1774812184032-8f55b7e18af8?w=1400&q=80',
  ],
};

// Isometric helpers
const COS30 = Math.cos(Math.PI / 6);
const SIN30 = Math.sin(Math.PI / 6);
function toIso(x, y, z = 0) { return { x: (x - y) * COS30, y: (x + y) * SIN30 - z }; }
function isoRect(rx, ry, rw, rh, wh = 0) {
  const tl = toIso(rx, ry), tr = toIso(rx + rw, ry), br = toIso(rx + rw, ry + rh), bl = toIso(rx, ry + rh);
  return {
    floor: `${tl.x},${tl.y} ${tr.x},${tr.y} ${br.x},${br.y} ${bl.x},${bl.y}`,
    wallL: wh ? `${bl.x},${bl.y} ${tl.x},${tl.y} ${tl.x},${tl.y - wh} ${bl.x},${bl.y - wh}` : '',
    wallR: wh ? `${br.x},${br.y} ${bl.x},${bl.y} ${bl.x},${bl.y - wh} ${br.x},${br.y - wh}` : '',
    wallB: wh ? `${tl.x},${tl.y} ${tr.x},${tr.y} ${tr.x},${tr.y - wh} ${tl.x},${tl.y - wh}` : '',
    cx: (tl.x + br.x) / 2, cy: (tl.y + br.y) / 2,
  };
}

const U = 16, WH = 20;
const CLR = {
  living: { f: '#e8d5a8', l: '#c9b48a', r: '#b8a37a', b: '#dcc99e' },
  bed_d:  { f: '#a8c8e8', l: '#8ab0d0', r: '#7aa0c0', b: '#9ec0e0' },
  bed_s:  { f: '#c8a8e8', l: '#b090d0', r: '#a080c0', b: '#bea0e0' },
  bed_m:  { f: '#8cb8e8', l: '#70a0d0', r: '#6090c0', b: '#80b0e0' },
  bath:   { f: '#a8e8c8', l: '#8ad0b0', r: '#7ac0a0', b: '#9ee0c0' },
  walkin: { f: '#e8c8a8', l: '#d0b090', r: '#c0a080', b: '#e0c0a0' },
  util:   { f: '#d0d0d0', l: '#b0b0b0', r: '#a0a0a0', b: '#c4c4c4' },
};

const HOUSES = {
  1: { area: 75, dims: '8.55 \u00D7 8.78m', rooms: [
    { lbl: 'living', x: 0, y: 0, w: 7.80, h: 4.38, size: '34.17' },
    { lbl: 'bed_d', x: 0, y: 4.6, w: 3.80, h: 3.15, size: '13.21' },
    { lbl: 'bath', x: 4.0, y: 4.6, w: 1.80, h: 3.15, size: '5.68' },
    { lbl: 'util', x: 6.0, y: 4.6, w: 1.80, h: 3.15, size: '11.81' },
  ]},
  2: { area: 88, dims: '10.28 \u00D7 8.78m', rooms: [
    { lbl: 'living', x: 0, y: 0, w: 7.80, h: 4.38, size: '34.17' },
    { lbl: 'bed_d', x: 0, y: 4.6, w: 3.80, h: 3.15, size: '13.21' },
    { lbl: 'bed_s', x: 4.0, y: 4.6, w: 3.80, h: 3.15, size: '13.21' },
    { lbl: 'bath', x: 8.0, y: 0, w: 1.80, h: 3.15, size: '5.68' },
    { lbl: 'util', x: 8.0, y: 3.35, w: 1.80, h: 4.40, size: '11.81' },
  ]},
  3: { area: 128, dims: '12.60 \u00D7 10.16m', rooms: [
    { lbl: 'living', x: 0, y: 0, w: 7.80, h: 4.38, size: '34.17' },
    { lbl: 'bed_m', x: 0, y: 4.6, w: 5.10, h: 3.95, size: '20.13' },
    { lbl: 'walkin', x: 5.3, y: 4.6, w: 2.80, h: 2.82, size: '7.89' },
    { lbl: 'bed_s', x: 8.3, y: 0, w: 3.80, h: 3.15, size: '13.21' },
    { lbl: 'bed_s', x: 8.3, y: 3.35, w: 3.80, h: 3.15, size: '13.21', uid: 'bed_s2' },
    { lbl: 'bath', x: 5.3, y: 7.6, w: 2.80, h: 2.0, size: '5.68' },
    { lbl: 'bath', x: 8.3, y: 6.7, w: 1.80, h: 2.9, size: '5.68', uid: 'bath2' },
    { lbl: 'util', x: 10.3, y: 6.7, w: 1.80, h: 2.9, size: '11.81' },
  ]},
};

// Build flat walkthrough sequence for a house (all rooms with images)
function buildWalkthrough(house) {
  const seq = [];
  house.rooms.forEach(r => {
    const imgs = ROOM_IMAGES[r.lbl];
    if (imgs) imgs.forEach(img => seq.push({ ...r, img }));
  });
  return seq;
}

const VirtualTour = ({ houseId, isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = labels[language] || labels.en;
  const [activeRoom, setActiveRoom] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [panOffset, setPanOffset] = useState(0);
  const timerRef = useRef(null);

  const house = HOUSES[houseId];

  // Build walkthrough and panoramic images list for the current active room or full walkthrough
  const walkthrough = house ? buildWalkthrough(house) : [];

  // Get the current image list based on activeRoom or full walkthrough
  const currentImages = activeRoom
    ? (ROOM_IMAGES[activeRoom.lbl] || []).map(img => ({ ...activeRoom, img }))
    : walkthrough;

  const currentItem = currentImages[imgIndex] || currentImages[0];

  // Auto-advance
  useEffect(() => {
    if (!isOpen || !playing || currentImages.length <= 0) return;
    timerRef.current = setInterval(() => {
      setImgIndex(prev => (prev + 1) % currentImages.length);
      setPanOffset(0);
    }, 4000);
    return () => clearInterval(timerRef.current);
  }, [isOpen, playing, currentImages.length, activeRoom]);

  // Slow pan animation
  useEffect(() => {
    if (!isOpen) return;
    let frame, pos = 0, dir = 1;
    const animate = () => {
      pos += 0.02 * dir;
      if (pos > 8) dir = -1;
      if (pos < -8) dir = 1;
      setPanOffset(pos);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isOpen, imgIndex]);

  const handleRoomClick = useCallback((room) => {
    if (room.lbl === 'util') return;
    setActiveRoom(room);
    setImgIndex(0);
    setPlaying(true);
  }, []);

  const handleBackToPlan = useCallback(() => {
    setActiveRoom(null);
    setImgIndex(0);
  }, []);

  const goNext = () => setImgIndex(prev => (prev + 1) % currentImages.length);
  const goPrev = () => setImgIndex(prev => (prev - 1 + currentImages.length) % currentImages.length);

  if (!isOpen || !house) return null;

  // Calculate SVG bounds
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const geoRooms = house.rooms.map((r, i) => {
    const g = isoRect(r.x * U, r.y * U, r.w * U, r.h * U, WH);
    g.floor.split(' ').map(p => p.split(',').map(Number)).forEach(([px, py]) => {
      minX = Math.min(minX, px); minY = Math.min(minY, py - WH);
      maxX = Math.max(maxX, px); maxY = Math.max(maxY, py);
    });
    return { ...r, g, uid: r.uid || `${r.lbl}-${i}` };
  });
  const pad = 15;

  return (
    <div className="fixed inset-0 z-[70] bg-[#080e1a] flex flex-col" data-testid="virtual-tour-modal">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#0a1628] border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-[#d4a650]" />
          <div>
            <h2 className="text-white font-bold text-lg">{t.title} &mdash; Casa {houseId} <span className="text-[#d4a650]">({house.area} m&sup2;)</span></h2>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white p-1"><X className="w-6 h-6" /></button>
      </div>

      {/* Main content: Floor Plan (left) + Image Viewer (right) */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: 3D Floor Plan */}
        <div className="md:w-[38%] bg-[#0a1628] p-4 flex flex-col items-center justify-center border-r border-gray-800 flex-shrink-0">
          <svg viewBox={`${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2 + 16}`}
            className="w-full" style={{ maxHeight: '70vh' }}>
            {/* Shadows */}
            {geoRooms.map((r, i) => <polygon key={`s${i}`} points={r.g.floor} fill="rgba(0,0,0,0.18)" transform="translate(3,5)" />)}
            {/* Rooms */}
            {geoRooms.map(r => {
              const c = CLR[r.lbl] || CLR.util;
              const isActive = activeRoom && (activeRoom.uid || activeRoom.lbl) === (r.uid || r.lbl) && activeRoom.x === r.x;
              const clickable = r.lbl !== 'util';
              return (
                <g key={r.uid} onClick={() => clickable && handleRoomClick(r)}
                  style={{ cursor: clickable ? 'pointer' : 'default' }}>
                  <polygon points={r.g.wallB} fill={isActive ? c.b : c.b + 'aa'} stroke="#fff3" strokeWidth="0.5" />
                  <polygon points={r.g.wallL} fill={isActive ? c.l : c.l + 'aa'} stroke="#fff3" strokeWidth="0.5" />
                  <polygon points={r.g.floor}
                    fill={isActive ? c.f : c.f + (clickable ? 'bb' : '77')}
                    stroke={isActive ? '#d4a650' : '#fff4'}
                    strokeWidth={isActive ? 2.5 : 0.7} />
                  <polygon points={r.g.wallR} fill={isActive ? c.r : c.r + 'aa'} stroke="#fff3" strokeWidth="0.5" />
                  <text x={r.g.cx} y={r.g.cy - 4} textAnchor="middle" fill={isActive ? '#0a1628' : '#fff'}
                    fontSize={r.w > 3 ? 7 : 5.5} fontWeight="700" style={{ pointerEvents: 'none' }}>{t[r.lbl]}</text>
                  <text x={r.g.cx} y={r.g.cy + 5} textAnchor="middle" fill={isActive ? '#0a1628' : '#d4a650'}
                    fontSize="5.5" fontWeight="600" style={{ pointerEvents: 'none' }}>{r.size} m&sup2;</text>
                </g>
              );
            })}
            <text x={(minX + maxX) / 2} y={maxY + 12} textAnchor="middle" fill="#d4a650" fontSize="7" fontWeight="700">
              {house.dims}
            </text>
          </svg>
          {activeRoom && (
            <button onClick={handleBackToPlan} className="mt-3 text-[#d4a650] text-sm flex items-center gap-1 hover:underline">
              <ChevronLeft className="w-4 h-4" /> {t.clickExplore}
            </button>
          )}
        </div>

        {/* Right: Cinematic Image Viewer */}
        <div className="flex-1 relative bg-black overflow-hidden">
          {currentItem?.img ? (
            <>
              {/* Cinematic pan image */}
              <img
                key={currentItem.img + imgIndex}
                src={currentItem.img}
                alt={t[currentItem.lbl]}
                className="absolute inset-0 w-full h-full object-cover animate-fadeIn"
                style={{
                  objectPosition: `${50 + panOffset * 1.5}% ${50 + panOffset * 0.5}%`,
                  transition: 'object-position 0.15s ease-out',
                }}
                draggable="false"
              />
              {/* Vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              {/* Room label overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-white text-2xl font-bold">{t[currentItem.lbl]}</h3>
                    <p className="text-[#d4a650] text-lg font-semibold">{currentItem.size} m&sup2;</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Playback controls */}
                    <button onClick={goPrev} className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white backdrop-blur-sm">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={() => setPlaying(!playing)} className="w-10 h-10 rounded-full bg-[#d4a650] hover:bg-[#c49640] flex items-center justify-center text-[#0a1628]">
                      {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                    <button onClick={goNext} className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white backdrop-blur-sm">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {/* Progress dots */}
                <div className="flex gap-1.5 mt-3">
                  {currentImages.map((_, i) => (
                    <button key={i} onClick={() => setImgIndex(i)}
                      className={`h-1 rounded-full transition-all ${i === imgIndex ? 'bg-[#d4a650] w-6' : 'bg-white/30 w-3 hover:bg-white/50'}`} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p className="text-lg">{t.clickExplore}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(1.05); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default VirtualTour;
