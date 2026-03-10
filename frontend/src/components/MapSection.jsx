import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Search, Filter, MapPin, Home, Ruler, Building2, X, ChevronDown, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import propertiesData from '../data/properties.json';

import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const goldIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const content = {
  en: {
    sectionTitle: 'OPPORTUNITIES',
    heading: 'Explore Property Opportunities',
    subheading: 'Over 1,700 land parcels and properties across Spain',
    searchPlaceholder: 'Search by municipality, address...',
    filterRegion: 'All Regions',
    filterMunicipality: 'All Municipalities',
    filterPrice: 'All Prices',
    resetFilters: 'Reset',
    results: 'properties found',
    viewOnMap: 'View on Google Maps',
    noResults: 'No properties match your filters.',
    showFilters: 'Filters',
    hideFilters: 'Hide',
    priceLow: 'Under 50K',
    priceMid: '50K - 200K',
    priceHigh: '200K - 500K',
    priceVHigh: 'Over 500K',
    priceConsult: 'Price on Request',
    save: 'Save',
    saved: 'Saved',
    loginToSave: 'Login to save',
    contactAbout: 'Ask about this property',
  },
  es: {
    sectionTitle: 'OPORTUNIDADES',
    heading: 'Explora Oportunidades Inmobiliarias',
    subheading: 'M\u00E1s de 1.700 parcelas y propiedades en toda Espa\u00F1a',
    searchPlaceholder: 'Buscar por municipio, direcci\u00F3n...',
    filterRegion: 'Todas las Regiones',
    filterMunicipality: 'Todos los Municipios',
    filterPrice: 'Todos los Precios',
    resetFilters: 'Restablecer',
    results: 'propiedades encontradas',
    viewOnMap: 'Ver en Google Maps',
    noResults: 'Ninguna propiedad coincide con tus filtros.',
    showFilters: 'Filtros',
    hideFilters: 'Ocultar',
    priceLow: 'Menos de 50K',
    priceMid: '50K - 200K',
    priceHigh: '200K - 500K',
    priceVHigh: 'M\u00E1s de 500K',
    priceConsult: 'Precio a consultar',
    save: 'Guardar',
    saved: 'Guardado',
    loginToSave: 'Inicia sesi\u00F3n para guardar',
    contactAbout: 'Preguntar sobre esta propiedad',
  },
  ar: {
    sectionTitle: '\u0627\u0644\u0641\u0631\u0635',
    heading: '\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0641\u0631\u0635 \u0627\u0644\u0639\u0642\u0627\u0631\u064A\u0629',
    subheading: '\u0623\u0643\u062B\u0631 \u0645\u0646 1,700 \u0642\u0637\u0639\u0629 \u0623\u0631\u0636 \u0648\u0639\u0642\u0627\u0631 \u0641\u064A \u062C\u0645\u064A\u0639 \u0623\u0646\u062D\u0627\u0621 \u0625\u0633\u0628\u0627\u0646\u064A\u0627',
    searchPlaceholder: '\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0628\u0644\u062F\u064A\u0629\u060C \u0627\u0644\u0639\u0646\u0648\u0627\u0646...',
    filterRegion: '\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0646\u0627\u0637\u0642',
    filterMunicipality: '\u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u0644\u062F\u064A\u0627\u062A',
    filterPrice: '\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0633\u0639\u0627\u0631',
    resetFilters: '\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646',
    results: '\u0639\u0642\u0627\u0631 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u064A\u0647',
    viewOnMap: '\u0639\u0631\u0636 \u0639\u0644\u0649 \u062E\u0631\u0627\u0626\u0637 \u062C\u0648\u062C\u0644',
    noResults: '\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0642\u0627\u0631\u0627\u062A \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631.',
    showFilters: '\u0627\u0644\u0641\u0644\u0627\u062A\u0631',
    hideFilters: '\u0625\u062E\u0641\u0627\u0621',
    priceLow: '\u0623\u0642\u0644 \u0645\u0646 50K',
    priceMid: '50K - 200K',
    priceHigh: '200K - 500K',
    priceVHigh: '\u0623\u0643\u062B\u0631 \u0645\u0646 500K',
    priceConsult: '\u0627\u0644\u0633\u0639\u0631 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0641\u0633\u0627\u0631',
    save: '\u062D\u0641\u0638',
    saved: '\u0645\u062D\u0641\u0648\u0638',
    loginToSave: '\u0633\u062C\u0644 \u0644\u0644\u062D\u0641\u0638',
    contactAbout: '\u0627\u0633\u062A\u0641\u0633\u0631 \u0639\u0646 \u0647\u0630\u0627 \u0627\u0644\u0639\u0642\u0627\u0631',
  }
};

const PRICE_RANGES = [
  { key: 'low', min: 1, max: 50000 },
  { key: 'mid', min: 50000, max: 200000 },
  { key: 'high', min: 200000, max: 500000 },
  { key: 'vhigh', min: 500000, max: Infinity },
  { key: 'consult', min: 0, max: 0 },
];

function FitBounds({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  }, [markers, map]);
  return null;
}

const PropertyPopup = ({ p, txt, onSave, isSaved, user }) => {
  const handleWhatsApp = () => {
    const msg = `Hi, I'm interested in property #${p.id} at ${p.municipio}, ${p.provincia}. Address: ${p.direccion}`;
    window.open(`https://wa.me/34673365300?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="text-sm space-y-2 min-w-[260px]">
      <div className="flex items-start justify-between gap-2 border-b border-gray-200 pb-2">
        <h3 className="font-bold text-[#0a1628] text-base">{p.municipio}</h3>
        <button
          onClick={(e) => { e.stopPropagation(); onSave(p.id); }}
          className={`flex-shrink-0 p-1.5 rounded-full transition-colors ${isSaved ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-400 hover:bg-red-50'}`}
          title={user ? (isSaved ? txt.saved : txt.save) : txt.loginToSave}
          data-testid={`fav-btn-${p.id}`}
        >
          <Heart className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <p className="text-gray-500 text-xs">{p.direccion}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#d4a650] flex-shrink-0" />
          <span className="text-xs text-gray-600">{p.provincia}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-[#d4a650] flex-shrink-0" />
          <span className="text-xs text-gray-600">{p.uso}</span>
        </div>
        {p.superficie > 0 && (
          <div className="flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-[#d4a650] flex-shrink-0" />
            <span className="text-xs text-gray-600">{p.superficie.toLocaleString()} m&sup2;</span>
          </div>
        )}
        {p.viviendas > 0 && (
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#d4a650] flex-shrink-0" />
            <span className="text-xs text-gray-600">{p.viviendas}</span>
          </div>
        )}
      </div>
      {p.pvp && p.pvp !== 'nan' && (
        <p className="text-[#d4a650] font-bold text-sm pt-1 border-t border-gray-100">
          {p.numericPrice > 0 ? `${p.numericPrice.toLocaleString()} \u20AC` : p.pvp}
        </p>
      )}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleWhatsApp}
          className="flex-1 text-xs bg-green-600 hover:bg-green-700 text-white rounded-lg py-1.5 px-2 transition-colors font-medium"
          data-testid={`contact-btn-${p.id}`}
        >
          {txt.contactAbout}
        </button>
        {p.mapsLink && p.mapsLink !== 'nan' && (
          <a href={p.mapsLink} target="_blank" rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center">
            Maps
          </a>
        )}
      </div>
    </div>
  );
};

const MapSection = ({ onAuthRequired }) => {
  const { language } = useLanguage();
  const { user, isFavorite, toggleFavorite } = useAuth();
  const isRTL = language === 'ar';
  const txt = content[language] || content.en;

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { properties, filters } = propertiesData;

  const priceLabels = {
    low: txt.priceLow,
    mid: txt.priceMid,
    high: txt.priceHigh,
    vhigh: txt.priceVHigh,
    consult: txt.priceConsult,
  };

  const filteredMunicipalities = useMemo(() => {
    if (!region) return filters.municipalities;
    return [...new Set(properties.filter(p => p.ccaa === region).map(p => p.municipio))].sort();
  }, [region, properties, filters.municipalities]);

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (search) {
        const q = search.toLowerCase();
        if (!(
          (p.municipio && p.municipio.toLowerCase().includes(q)) ||
          (p.direccion && p.direccion.toLowerCase().includes(q)) ||
          (p.provincia && p.provincia.toLowerCase().includes(q))
        )) return false;
      }
      if (region && p.ccaa !== region) return false;
      if (municipality && p.municipio !== municipality) return false;
      if (priceRange) {
        const range = PRICE_RANGES.find(r => r.key === priceRange);
        if (range) {
          if (range.key === 'consult') {
            if (p.numericPrice > 0) return false;
          } else {
            if (p.numericPrice < range.min || p.numericPrice >= (range.max === Infinity ? Infinity : range.max)) return false;
          }
        }
      }
      return true;
    });
  }, [properties, search, region, municipality, priceRange]);

  const handleReset = () => {
    setSearch('');
    setRegion('');
    setMunicipality('');
    setPriceRange('');
  };

  const handleSave = (propertyId) => {
    if (!user) {
      onAuthRequired();
      return;
    }
    toggleFavorite(propertyId);
  };

  const activeFilterCount = [region, municipality, priceRange].filter(Boolean).length + (search ? 1 : 0);

  return (
    <section id="opportunities" className="py-20 bg-gray-50" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-3">{txt.sectionTitle}</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4" data-testid="map-section-heading">{txt.heading}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{txt.subheading}</p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
            <Input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={txt.searchPlaceholder}
              className={`${isRTL ? 'pr-10' : 'pl-10'} w-full bg-white`}
              data-testid="map-search"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border-gray-300"
            data-testid="map-filter-toggle"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? txt.hideFilters : txt.showFilters}
            {activeFilterCount > 0 && (
              <span className="bg-[#d4a650] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{activeFilterCount}</span>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm" data-testid="map-filters-panel">
            <div className="relative">
              <select value={region} onChange={e => { setRegion(e.target.value); setMunicipality(''); }}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4a650]"
                data-testid="filter-region">
                <option value="">{txt.filterRegion}</option>
                {filters.regions.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} w-4 h-4 text-gray-400 pointer-events-none`} />
            </div>
            <div className="relative">
              <select value={municipality} onChange={e => setMunicipality(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4a650]"
                data-testid="filter-municipality">
                <option value="">{txt.filterMunicipality}</option>
                {filteredMunicipalities.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} w-4 h-4 text-gray-400 pointer-events-none`} />
            </div>
            <div className="relative">
              <select value={priceRange} onChange={e => setPriceRange(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4a650]"
                data-testid="filter-price">
                <option value="">{txt.filterPrice}</option>
                {PRICE_RANGES.map(r => <option key={r.key} value={r.key}>{priceLabels[r.key]}</option>)}
              </select>
              <ChevronDown className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} w-4 h-4 text-gray-400 pointer-events-none`} />
            </div>
            {activeFilterCount > 0 && (
              <Button variant="ghost" onClick={handleReset} className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1 sm:col-span-3 justify-center">
                <X className="w-3.5 h-3.5" /> {txt.resetFilters}
              </Button>
            )}
          </div>
        )}

        {/* Count */}
        <p className="text-sm text-gray-500 mb-4" data-testid="map-count">
          <span className="font-semibold text-[#0a1628]">{filtered.length.toLocaleString()}</span> {txt.results}
        </p>

        {/* Map */}
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200" data-testid="map-container" style={{ height: '65vh' }}>
          <MapContainer center={[40.0, -3.7]} zoom={6} style={{ height: '100%', width: '100%' }} scrollWheelZoom={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds markers={filtered.length > 0 && filtered.length <= 2000 ? filtered : properties} />
            <MarkerClusterGroup chunkedLoading maxClusterRadius={60}>
              {filtered.map(p => (
                <Marker key={p.id} position={[p.lat, p.lng]} icon={goldIcon}>
                  <Popup maxWidth={320} className="property-popup">
                    <PropertyPopup
                      p={p}
                      txt={txt}
                      onSave={handleSave}
                      isSaved={isFavorite(p.id)}
                      user={user}
                    />
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
