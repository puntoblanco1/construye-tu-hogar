import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Move, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ROOM_IMAGES = {
  living: 'https://images.unsplash.com/photo-1648475236583-2e25a6cbf3bd?w=1400&q=80',
  bedroom_double: 'https://images.unsplash.com/photo-1766928210452-2470f91bae26?w=1400&q=80',
  bedroom_single: 'https://images.unsplash.com/photo-1772567732957-29e0c950f3ca?w=1400&q=80',
  bedroom_master: 'https://images.unsplash.com/photo-1762803733564-fecc7669a91a?w=1400&q=80',
  bathroom: 'https://images.unsplash.com/photo-1758548157466-7c454382035a?w=1400&q=80',
  walkin: 'https://images.unsplash.com/photo-1774812184032-8f55b7e18af8?w=1400&q=80',
};

const txt = {
  en: {
    title: 'Virtual Tour',
    clickRoom: 'Click any room to explore',
    dragHint: 'Drag to look around',
    close: 'Close',
    living: 'Living / Kitchen / Dining',
    bedroom_double: 'Double Bedroom',
    bedroom_single: 'Single Bedroom',
    bedroom_master: 'Master Bedroom',
    bathroom: 'Bathroom',
    bathroom2: 'Bathroom 2',
    walkin: 'Walk-in Closet',
    install: 'Utilities',
    area: 'Area',
    height: 'Ceiling: 2.70m',
    back: 'Back to floor plan',
  },
  es: {
    title: 'Tour Virtual',
    clickRoom: 'Haz clic en cualquier habitaci\u00F3n para explorar',
    dragHint: 'Arrastra para mirar alrededor',
    close: 'Cerrar',
    living: 'Sal\u00F3n / Cocina / Comedor',
    bedroom_double: 'Dormitorio Doble',
    bedroom_single: 'Dormitorio Individual',
    bedroom_master: 'Dormitorio Principal',
    bathroom: 'Ba\u00F1o',
    bathroom2: 'Ba\u00F1o 2',
    walkin: 'Vestidor',
    install: 'Instalaciones',
    area: '\u00C1rea',
    height: 'Altura: 2.70m',
    back: 'Volver al plano',
  },
  ar: {
    title: '\u062C\u0648\u0644\u0629 \u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629',
    clickRoom: '\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0623\u064A \u063A\u0631\u0641\u0629 \u0644\u0627\u0633\u062A\u0643\u0634\u0627\u0641\u0647\u0627',
    dragHint: '\u0627\u0633\u062D\u0628 \u0644\u0644\u0646\u0638\u0631 \u062D\u0648\u0644\u0643',
    close: '\u0625\u063A\u0644\u0627\u0642',
    living: '\u0635\u0627\u0644\u0629 / \u0645\u0637\u0628\u062E / \u063A\u0631\u0641\u0629 \u0637\u0639\u0627\u0645',
    bedroom_double: '\u063A\u0631\u0641\u0629 \u0646\u0648\u0645 \u0645\u0632\u062F\u0648\u062C\u0629',
    bedroom_single: '\u063A\u0631\u0641\u0629 \u0646\u0648\u0645 \u0641\u0631\u062F\u064A\u0629',
    bedroom_master: '\u063A\u0631\u0641\u0629 \u0627\u0644\u0646\u0648\u0645 \u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629',
    bathroom: '\u062D\u0645\u0627\u0645',
    bathroom2: '\u062D\u0645\u0627\u0645 2',
    walkin: '\u063A\u0631\u0641\u0629 \u0645\u0644\u0627\u0628\u0633',
    install: '\u063A\u0631\u0641\u0629 \u0627\u0644\u062E\u062F\u0645\u0627\u062A',
    area: '\u0627\u0644\u0645\u0633\u0627\u062D\u0629',
    height: '\u0627\u0644\u0627\u0631\u062A\u0641\u0627\u0639: 2.70\u0645',
    back: '\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u0645\u062E\u0637\u0637',
  },
};

// Floor plan data: rooms with positions, sizes, labels, images (proportional coordinates 0-400 for SVG viewBox)
const FLOOR_PLANS = {
  1: {
    viewBox: '0 0 400 300',
    outerWall: 'M 20,20 L 380,20 L 380,280 L 20,280 Z',
    rooms: [
      { id: 'living', x: 25, y: 25, w: 200, h: 160, size: '34.17 m\u00B2', img: 'living', color: '#e8d5a8' },
      { id: 'bedroom_double', x: 235, y: 25, w: 140, h: 110, size: '13.21 m\u00B2', img: 'bedroom_double', color: '#a8c8e8' },
      { id: 'bathroom', x: 235, y: 145, w: 70, h: 60, size: '5.68 m\u00B2', img: 'bathroom', color: '#a8e8c8' },
      { id: 'install', x: 315, y: 145, w: 60, h: 60, size: '11.81 m\u00B2', img: null, color: '#d8d8d8' },
      { id: 'hall', x: 225, y: 145, w: 10, h: 130, size: '', img: null, color: '#f0f0f0', noClick: true },
    ],
  },
  2: {
    viewBox: '0 0 400 350',
    outerWall: 'M 20,20 L 380,20 L 380,330 L 20,330 Z',
    rooms: [
      { id: 'living', x: 25, y: 25, w: 200, h: 160, size: '34.17 m\u00B2', img: 'living', color: '#e8d5a8' },
      { id: 'bedroom_double', x: 235, y: 25, w: 140, h: 100, size: '13.21 m\u00B2', img: 'bedroom_double', color: '#a8c8e8' },
      { id: 'bedroom_single', x: 235, y: 135, w: 140, h: 100, size: '13.21 m\u00B2', img: 'bedroom_single', color: '#c8a8e8' },
      { id: 'bathroom', x: 25, y: 195, w: 90, h: 65, size: '5.68 m\u00B2', img: 'bathroom', color: '#a8e8c8' },
      { id: 'install', x: 125, y: 195, w: 100, h: 65, size: '11.81 m\u00B2', img: null, color: '#d8d8d8' },
    ],
  },
  3: {
    viewBox: '0 0 440 380',
    outerWall: 'M 20,20 L 420,20 L 420,360 L 20,360 Z',
    rooms: [
      { id: 'living', x: 25, y: 25, w: 200, h: 160, size: '34.17 m\u00B2', img: 'living', color: '#e8d5a8' },
      { id: 'bedroom_single', x: 235, y: 25, w: 85, h: 100, size: '13.21 m\u00B2', img: 'bedroom_single', color: '#c8a8e8' },
      { id: 'bedroom_single2', x: 330, y: 25, w: 85, h: 100, size: '13.21 m\u00B2', img: 'bedroom_single', color: '#c8a8e8', labelOverride: 'bedroom_single' },
      { id: 'bedroom_master', x: 25, y: 195, w: 160, h: 130, size: '20.13 m\u00B2', img: 'bedroom_master', color: '#8cb8e8' },
      { id: 'walkin', x: 195, y: 250, w: 80, h: 75, size: '7.89 m\u00B2', img: 'walkin', color: '#e8c8a8' },
      { id: 'bathroom', x: 235, y: 135, w: 85, h: 70, size: '5.68 m\u00B2', img: 'bathroom', color: '#a8e8c8' },
      { id: 'bathroom2', x: 330, y: 135, w: 85, h: 70, size: '5.68 m\u00B2', img: 'bathroom', color: '#a8e8c8' },
      { id: 'install', x: 285, y: 250, w: 130, h: 75, size: '11.81 m\u00B2', img: null, color: '#d8d8d8' },
    ],
  },
};

// Panoramic image viewer with drag-to-pan
const PanoViewer = ({ image, roomName, roomSize, lang, onClose }) => {
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);
  const offsetStart = useRef(0);
  const t = txt[lang] || txt.en;

  const handlePointerDown = (e) => {
    setDragging(true);
    dragStart.current = e.clientX;
    offsetStart.current = offset;
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    const delta = e.clientX - dragStart.current;
    setOffset(offsetStart.current + delta * 0.15);
  };

  const handlePointerUp = () => setDragging(false);

  // Auto-pan animation
  useEffect(() => {
    if (dragging) return;
    let frame;
    let dir = 1;
    let pos = offset;
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
    <div className="fixed inset-0 z-[70] bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/80 backdrop-blur-sm">
        <div>
          <h3 className="text-white font-bold text-xl">{roomName}</h3>
          <p className="text-gray-400 text-sm">{t.area}: {roomSize} &middot; {t.height}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Move className="w-4 h-4" />
            {t.dragHint}
          </div>
          <button onClick={onClose} className="text-white hover:text-[#d4a650] transition-colors p-2" data-testid="pano-close">
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Panoramic View */}
      <div
        ref={containerRef}
        className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ perspective: '800px' }}
      >
        <div
          className="w-full h-full"
          style={{
            transform: `rotateY(${offset}deg)`,
            transformStyle: 'preserve-3d',
            transition: dragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <img
            src={image}
            alt={roomName}
            className="w-full h-full object-cover"
            draggable="false"
            style={{
              objectPosition: `${50 + offset * 2}% 50%`,
              transition: dragging ? 'none' : 'object-position 0.1s ease-out',
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-black/80 backdrop-blur-sm flex justify-center">
        <button onClick={onClose} className="text-[#d4a650] hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          {t.back}
        </button>
      </div>
    </div>
  );
};

const VirtualTour = ({ houseId, isOpen, onClose }) => {
  const { language } = useLanguage();
  const t = txt[language] || txt.en;
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const plan = FLOOR_PLANS[houseId];

  if (!isOpen || !plan) return null;

  const getRoomLabel = (room) => {
    const key = room.labelOverride || room.id;
    return t[key] || room.id;
  };

  if (selectedRoom) {
    const room = plan.rooms.find(r => r.id === selectedRoom);
    if (room?.img) {
      return (
        <PanoViewer
          image={ROOM_IMAGES[room.img]}
          roomName={getRoomLabel(room)}
          roomSize={room.size}
          lang={language}
          onClose={() => setSelectedRoom(null)}
        />
      );
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
        data-testid="virtual-tour-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#d4a650]" />
              {t.title} &mdash; Casa {houseId}
            </h2>
            <p className="text-gray-400 text-sm mt-1">{t.clickRoom}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" data-testid="tour-close">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Floor Plan */}
        <div className="p-6">
          <svg viewBox={plan.viewBox} className="w-full h-auto" style={{ maxHeight: '60vh' }}>
            {/* Background */}
            <rect x="15" y="15" width={plan.viewBox.split(' ')[2] - 30} height={plan.viewBox.split(' ')[3] - 30} fill="#1a2744" rx="8" />

            {/* Rooms */}
            {plan.rooms.map(room => {
              const isHovered = hoveredRoom === room.id;
              const isClickable = room.img && !room.noClick;
              return (
                <g key={room.id}
                  onMouseEnter={() => !room.noClick && setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => isClickable && setSelectedRoom(room.id)}
                  style={{ cursor: isClickable ? 'pointer' : 'default' }}
                >
                  <rect
                    x={room.x} y={room.y} width={room.w} height={room.h}
                    rx="4"
                    fill={isHovered && isClickable ? room.color : room.color + '40'}
                    stroke={isHovered && isClickable ? '#d4a650' : room.color}
                    strokeWidth={isHovered && isClickable ? 3 : 1.5}
                    style={{ transition: 'all 0.2s ease' }}
                  />
                  {/* Room Label */}
                  {!room.noClick && (
                    <>
                      <text
                        x={room.x + room.w / 2}
                        y={room.y + room.h / 2 - (room.size ? 6 : 0)}
                        textAnchor="middle"
                        fill={isHovered && isClickable ? '#0a1628' : '#ffffff'}
                        fontSize={room.w > 100 ? 11 : 9}
                        fontWeight="600"
                        style={{ transition: 'fill 0.2s', pointerEvents: 'none' }}
                      >
                        {getRoomLabel(room)}
                      </text>
                      {room.size && (
                        <text
                          x={room.x + room.w / 2}
                          y={room.y + room.h / 2 + 10}
                          textAnchor="middle"
                          fill={isHovered && isClickable ? '#0a1628' : '#d4a650'}
                          fontSize="10"
                          fontWeight="500"
                          style={{ pointerEvents: 'none' }}
                        >
                          {room.size}
                        </text>
                      )}
                      {isClickable && isHovered && (
                        <text
                          x={room.x + room.w / 2}
                          y={room.y + room.h / 2 + 24}
                          textAnchor="middle"
                          fill="#0a1628"
                          fontSize="8"
                          fontWeight="700"
                        >
                          &#9654; EXPLORE
                        </text>
                      )}
                    </>
                  )}
                </g>
              );
            })}

            {/* Dimension lines on edges */}
            <text x={plan.viewBox.split(' ')[2] / 2} y="14" textAnchor="middle" fill="#667" fontSize="9">
              {houseId === 3 ? '17.10m' : '17.10m'}
            </text>
            <text x="12" y={plan.viewBox.split(' ')[3] / 2} textAnchor="middle" fill="#667" fontSize="9" transform={`rotate(-90 12 ${plan.viewBox.split(' ')[3] / 2})`}>
              {houseId === 3 ? '14.70m' : '11.90m'}
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VirtualTour;
