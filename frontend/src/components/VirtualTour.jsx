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
  en: { living: 'Living / Kitchen', bed_d: 'Double Bed', bed_s: 'Single Bed', bed_m: 'Master Bed', bath: 'Bath', walkin: 'Walk-in', util: 'Utilities', title: 'Floor Plans Comparison', sub: 'All three models at real proportional scale — click any room to explore', drag: 'Drag to look around', back: 'Back', ceiling: 'Ceiling: 2.70m', area: 'Area' },
  es: { living: 'Sal\u00F3n / Cocina', bed_d: 'Dorm. Doble', bed_s: 'Dorm. Indiv.', bed_m: 'Dorm. Principal', bath: 'Ba\u00F1o', walkin: 'Vestidor', util: 'Instalaciones', title: 'Comparaci\u00F3n de Planos', sub: 'Los tres modelos a escala proporcional real \u2014 haz clic para explorar', drag: 'Arrastra para mirar', back: 'Volver', ceiling: 'Altura: 2.70m', area: '\u00C1rea' },
  ar: { living: '\u0635\u0627\u0644\u0629 / \u0645\u0637\u0628\u062E', bed_d: '\u063A\u0631\u0641\u0629 \u0645\u0632\u062F\u0648\u062C\u0629', bed_s: '\u063A\u0631\u0641\u0629 \u0641\u0631\u062F\u064A\u0629', bed_m: '\u063A\u0631\u0641\u0629 \u0631\u0626\u064A\u0633\u064A\u0629', bath: '\u062D\u0645\u0627\u0645', walkin: '\u0645\u0644\u0627\u0628\u0633', util: '\u062E\u062F\u0645\u0627\u062A', title: '\u0645\u0642\u0627\u0631\u0646\u0629 \u0627\u0644\u0645\u062E\u0637\u0637\u0627\u062A', sub: '\u0627\u0644\u0646\u0645\u0627\u0630\u062C \u0627\u0644\u062B\u0644\u0627\u062B\u0629 \u0628\u0646\u0633\u0628 \u062D\u0642\u064A\u0642\u064A\u0629 \u2014 \u0627\u0636\u063A\u0637 \u0644\u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641', drag: '\u0627\u0633\u062D\u0628 \u0644\u0644\u0646\u0638\u0631', back: '\u0639\u0648\u062F\u0629', ceiling: '\u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639: 2.70\u0645', area: '\u0627\u0644\u0645\u0633\u0627\u062D\u0629' },
};

// Isometric projection helpers
const ISO_ANGLE = Math.PI / 6; // 30 degrees
const COS = Math.cos(ISO_ANGLE);
const SIN = Math.sin(ISO_ANGLE);

function toIso(x, y, z = 0) {
  return {
    x: (x - y) * COS,
    y: (x + y) * SIN - z,
  };
}

function isoRect(rx, ry, rw, rh, wallH = 0) {
  // Floor polygon
  const tl = toIso(rx, ry);
  const tr = toIso(rx + rw, ry);
  const br = toIso(rx + rw, ry + rh);
  const bl = toIso(rx, ry + rh);
  const floor = `${tl.x},${tl.y} ${tr.x},${tr.y} ${br.x},${br.y} ${bl.x},${bl.y}`;

  // Walls
  const wallLeft = wallH > 0 ? `${bl.x},${bl.y} ${tl.x},${tl.y} ${tl.x},${tl.y - wallH} ${bl.x},${bl.y - wallH}` : '';
  const wallRight = wallH > 0 ? `${br.x},${br.y} ${bl.x},${bl.y} ${bl.x},${bl.y - wallH} ${br.x},${br.y - wallH}` : '';
  const wallBack = wallH > 0 ? `${tl.x},${tl.y} ${tr.x},${tr.y} ${tr.x},${tr.y - wallH} ${tl.x},${tl.y - wallH}` : '';

  // Center for label
  const cx = (tl.x + br.x) / 2;
  const cy = (tl.y + br.y) / 2;

  return { floor, wallLeft, wallRight, wallBack, cx, cy };
}

// Scale: 1m = 14 SVG units
const U = 14;
const WALL_H = 18;

const COLORS = {
  living:  { floor: '#e8d5a8', wallL: '#c9b48a', wallR: '#b8a37a', wallB: '#dcc99e' },
  bed_d:   { floor: '#a8c8e8', wallL: '#8ab0d0', wallR: '#7aa0c0', wallB: '#9ec0e0' },
  bed_s:   { floor: '#c8a8e8', wallL: '#b090d0', wallR: '#a080c0', wallB: '#bea0e0' },
  bed_m:   { floor: '#8cb8e8', wallL: '#70a0d0', wallR: '#6090c0', wallB: '#80b0e0' },
  bath:    { floor: '#a8e8c8', wallL: '#8ad0b0', wallR: '#7ac0a0', wallB: '#9ee0c0' },
  walkin:  { floor: '#e8c8a8', wallL: '#d0b090', wallR: '#c0a080', wallB: '#e0c0a0' },
  util:    { floor: '#d0d0d0', wallL: '#b0b0b0', wallR: '#a0a0a0', wallB: '#c4c4c4' },
};

const HOUSES = [
  {
    id: 1, area: 75, dims: '8.55 \u00D7 8.78m',
    rooms: [
      { lbl: 'living', x: 0, y: 0, w: 7.80, h: 4.38, size: '34.17', img: 'living' },
      { lbl: 'bed_d',  x: 0, y: 4.60, w: 3.80, h: 3.15, size: '13.21', img: 'bedroom_double' },
      { lbl: 'bath',   x: 4.00, y: 4.60, w: 1.80, h: 3.15, size: '5.68', img: 'bathroom' },
      { lbl: 'util',   x: 6.00, y: 4.60, w: 1.80, h: 3.15, size: '11.81', img: null },
    ]
  },
  {
    id: 2, area: 88, dims: '10.28 \u00D7 8.78m',
    rooms: [
      { lbl: 'living', x: 0, y: 0, w: 7.80, h: 4.38, size: '34.17', img: 'living' },
      { lbl: 'bed_d',  x: 0, y: 4.60, w: 3.80, h: 3.15, size: '13.21', img: 'bedroom_double' },
      { lbl: 'bed_s',  x: 4.00, y: 4.60, w: 3.80, h: 3.15, size: '13.21', img: 'bedroom_single' },
      { lbl: 'bath',   x: 8.00, y: 0, w: 1.80, h: 3.15, size: '5.68', img: 'bathroom' },
      { lbl: 'util',   x: 8.00, y: 3.35, w: 1.80, h: 4.40, size: '11.81', img: null },
    ]
  },
  {
    id: 3, area: 128, dims: '12.60 \u00D7 10.16m',
    rooms: [
      { lbl: 'living', x: 0, y: 0, w: 7.80, h: 4.38, size: '34.17', img: 'living' },
      { lbl: 'bed_m',  x: 0, y: 4.60, w: 5.10, h: 3.95, size: '20.13', img: 'bedroom_master' },
      { lbl: 'walkin',  x: 5.30, y: 4.60, w: 2.80, h: 2.82, size: '7.89', img: 'walkin' },
      { lbl: 'bed_s',  x: 8.30, y: 0, w: 3.80, h: 3.15, size: '13.21', img: 'bedroom_single' },
      { lbl: 'bed_s',  x: 8.30, y: 3.35, w: 3.80, h: 3.15, size: '13.21', img: 'bedroom_single', id2: 'bed_s2' },
      { lbl: 'bath',   x: 5.30, y: 7.60, w: 2.80, h: 2.00, size: '5.68', img: 'bathroom' },
      { lbl: 'bath',   x: 8.30, y: 6.70, w: 1.80, h: 2.90, size: '5.68', img: 'bathroom', id2: 'bath2' },
      { lbl: 'util',   x: 10.30, y: 6.70, w: 1.80, h: 2.90, size: '11.81', img: null },
    ]
  }
];

// Furniture SVG elements (simple shapes in isometric)
function Furniture({ roomLbl, rx, ry, rw, rh }) {
  const items = [];
  const u = U;
  if (roomLbl === 'living') {
    // Sofa
    const sx = rx + 1, sy = ry + 2.5;
    const p = isoRect(sx * u, sy * u, 2 * u, 0.6 * u, 3);
    items.push(<polygon key="sofa" points={p.floor} fill="#8b7355" opacity="0.5" />);
    // Table
    const tx = rx + 1.5, ty = ry + 1.5;
    const tp = isoRect(tx * u, ty * u, 1 * u, 0.6 * u, 4);
    items.push(<polygon key="table" points={tp.floor} fill="#6b5b45" opacity="0.4" />);
    // Kitchen counter
    const kx = rx + rw - 1.2, ky = ry + 0.3;
    const kp = isoRect(kx * u, ky * u, 0.6 * u, 2.5 * u, 5);
    items.push(<polygon key="counter" points={kp.floor} fill="#888" opacity="0.4" />);
  } else if (roomLbl.startsWith('bed')) {
    // Bed
    const bx = rx + rw / 2 - 0.8, by = ry + rh / 2 - 0.6;
    const bw = roomLbl === 'bed_m' ? 1.8 : roomLbl === 'bed_d' ? 1.5 : 1.0;
    const bp = isoRect(bx * u, by * u, bw * u, 1.2 * u, 2);
    items.push(<polygon key="bed" points={bp.floor} fill="#7a6a5a" opacity="0.4" />);
  } else if (roomLbl === 'bath') {
    const bx = rx + 0.3, by = ry + 0.3;
    const bp = isoRect(bx * u, by * u, 0.6 * u, 0.6 * u, 2);
    items.push(<polygon key="sink" points={bp.floor} fill="#5a8a8a" opacity="0.4" />);
  }
  return <>{items}</>;
}

function IsoFloorPlan({ house, lang, hovered, setHovered, onRoomClick }) {
  const t = labels[lang] || labels.en;
  // Calculate bounding box
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const allRooms = house.rooms.map(r => {
    const geo = isoRect(r.x * U, r.y * U, r.w * U, r.h * U, WALL_H);
    // Track bounds
    const pts = geo.floor.split(' ').map(p => p.split(',').map(Number));
    pts.forEach(([px, py]) => {
      minX = Math.min(minX, px); minY = Math.min(minY, py - WALL_H);
      maxX = Math.max(maxX, px); maxY = Math.max(maxY, py);
    });
    return { ...r, geo };
  });
  
  const pad = 20;
  const vbX = minX - pad;
  const vbY = minY - pad;
  const vbW = maxX - minX + pad * 2;
  const vbH = maxY - minY + pad * 2 + 20;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-3 text-center">
        <span className="inline-block bg-[#d4a650] text-[#0a1628] text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
          Casa {house.id} &mdash; {house.area} m&sup2;
        </span>
      </div>
      <svg viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`} className="w-full" style={{ maxHeight: '55vh' }}>
        <defs>
          <filter id={`shadow-${house.id}`} x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="3" dy="5" stdDeviation="4" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Shadow base */}
        {allRooms.map((r, i) => (
          <polygon key={`sh-${i}`} points={r.geo.floor} fill="rgba(0,0,0,0.15)" transform="translate(4, 6)" />
        ))}

        {/* Rooms - back walls first, then floors, then front walls */}
        {allRooms.map((r, i) => {
          const c = COLORS[r.lbl] || COLORS.util;
          const rid = r.id2 || `${r.lbl}-${i}`;
          const isH = hovered === `${house.id}-${rid}`;
          const clickable = !!r.img;
          return (
            <g key={rid}
              onMouseEnter={() => setHovered(`${house.id}-${rid}`)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => clickable && onRoomClick(r)}
              style={{ cursor: clickable ? 'pointer' : 'default' }}
            >
              {/* Back wall */}
              <polygon points={r.geo.wallBack} fill={isH ? c.wallB : c.wallB + 'cc'} stroke="#fff" strokeWidth="0.5" />
              {/* Left wall */}
              <polygon points={r.geo.wallLeft} fill={isH ? c.wallL : c.wallL + 'cc'} stroke="#fff" strokeWidth="0.5" />
              {/* Floor */}
              <polygon points={r.geo.floor}
                fill={isH && clickable ? c.floor : c.floor + (clickable ? 'dd' : 'aa')}
                stroke={isH && clickable ? '#d4a650' : '#fff'}
                strokeWidth={isH && clickable ? 2 : 0.8}
              />
              {/* Right wall */}
              <polygon points={r.geo.wallRight} fill={isH ? c.wallR : c.wallR + 'cc'} stroke="#fff" strokeWidth="0.5" />

              {/* Furniture */}
              <Furniture roomLbl={r.lbl} rx={r.x} ry={r.y} rw={r.w} rh={r.h} />

              {/* Labels */}
              <text x={r.geo.cx} y={r.geo.cy - 5} textAnchor="middle"
                fill={isH && clickable ? '#0a1628' : '#fff'} fontSize="7" fontWeight="700"
                style={{ pointerEvents: 'none', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                {t[r.lbl]}
              </text>
              <text x={r.geo.cx} y={r.geo.cy + 5} textAnchor="middle"
                fill={isH && clickable ? '#0a1628' : '#d4a650'} fontSize="6" fontWeight="600"
                style={{ pointerEvents: 'none' }}>
                {r.size} m&sup2;
              </text>
            </g>
          );
        })}

        {/* Dimensions label */}
        <text x={(minX + maxX) / 2} y={maxY + 14} textAnchor="middle" fill="#d4a650" fontSize="8" fontWeight="700">
          {house.dims}
        </text>
      </svg>
    </div>
  );
}

const PanoViewer = ({ image, roomName, roomSize, lang, onClose }) => {
  const t = labels[lang] || labels.en;
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = React.useRef(0);
  const offsetStart = React.useRef(0);

  React.useEffect(() => {
    if (dragging) return;
    let frame, dir = 1, pos = offset;
    const animate = () => { pos += 0.03 * dir; if (pos > 15) dir = -1; if (pos < -15) dir = 1; setOffset(pos); frame = requestAnimationFrame(animate); };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [dragging]);

  return (
    <div className="fixed inset-0 z-[80] bg-black flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 bg-black/80">
        <div><h3 className="text-white font-bold text-xl">{roomName}</h3><p className="text-gray-400 text-sm">{t.area}: {roomSize} m&sup2; &middot; {t.ceiling}</p></div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm flex items-center gap-2"><Move className="w-4 h-4" />{t.drag}</span>
          <button onClick={onClose} className="text-white hover:text-[#d4a650] p-2"><X className="w-6 h-6" /></button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onPointerDown={e => { setDragging(true); dragStart.current = e.clientX; offsetStart.current = offset; e.target.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if (dragging) setOffset(offsetStart.current + (e.clientX - dragStart.current) * 0.15); }}
        onPointerUp={() => setDragging(false)}>
        <img src={image} alt={roomName} className="w-full h-full object-cover" draggable="false"
          style={{ objectPosition: `${50 + offset * 2}% 50%`, transition: dragging ? 'none' : 'object-position 0.1s' }} />
      </div>
      <div className="px-6 py-3 bg-black/80 flex justify-center">
        <button onClick={onClose} className="text-[#d4a650] text-sm font-medium flex items-center gap-2"><ChevronLeft className="w-4 h-4" />{t.back}</button>
      </div>
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
    return <PanoViewer image={ROOM_IMAGES[panoRoom.img]} roomName={t[panoRoom.lbl]} roomSize={panoRoom.size} lang={language} onClose={() => setPanoRoom(null)} />;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div className="relative bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-auto"
        onClick={e => e.stopPropagation()} data-testid="virtual-tour-modal">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700 sticky top-0 bg-[#0a1628] z-10">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2"><Eye className="w-5 h-5 text-[#d4a650]" /> {t.title}</h2>
            <p className="text-gray-400 text-sm">{t.sub}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {HOUSES.map(house => (
            <IsoFloorPlan key={house.id} house={house} lang={language} hovered={hovered} setHovered={setHovered} onRoomClick={r => setPanoRoom(r)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
