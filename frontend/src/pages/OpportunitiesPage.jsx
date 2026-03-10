import React, { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Search, Filter, MapPin, Home, Ruler, Building2, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import propertiesData from '../data/properties.json';

import 'leaflet/dist/leaflet.css';

// Fix default marker icon
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
    heroTitle: 'OPPORTUNITIES',
    heroHeading: 'Land & Property Opportunities in Spain',
    heroDesc: 'Explore over 1,700 land parcels and property opportunities across Spain. Filter by region, province, or property type.',
    searchPlaceholder: 'Search by municipality, address...',
    filterRegion: 'All Regions',
    filterProvince: 'All Provinces',
    filterUse: 'All Uses',
    resetFilters: 'Reset',
    results: 'properties found',
    municipality: 'Municipality',
    address: 'Address',
    type: 'Type',
    use: 'Use',
    classification: 'Classification',
    area: 'Land Area',
    buildability: 'Buildability',
    homes: 'Housing Units',
    price: 'Price',
    viewOnMap: 'View on Google Maps',
    noResults: 'No properties match your filters.',
    sqm: 'm\u00B2',
    showFilters: 'Filters',
    hideFilters: 'Hide Filters',
  },
  es: {
    heroTitle: 'OPORTUNIDADES',
    heroHeading: 'Oportunidades de Suelo e Inmuebles en Espa\u00F1a',
    heroDesc: 'Explora m\u00E1s de 1.700 parcelas y oportunidades inmobiliarias en toda Espa\u00F1a. Filtra por regi\u00F3n, provincia o tipo de propiedad.',
    searchPlaceholder: 'Buscar por municipio, direcci\u00F3n...',
    filterRegion: 'Todas las Regiones',
    filterProvince: 'Todas las Provincias',
    filterUse: 'Todos los Usos',
    resetFilters: 'Restablecer',
    results: 'propiedades encontradas',
    municipality: 'Municipio',
    address: 'Direcci\u00F3n',
    type: 'Tipo',
    use: 'Uso',
    classification: 'Clasificaci\u00F3n',
    area: 'Superficie',
    buildability: 'Edificabilidad',
    homes: 'Viviendas',
    price: 'Precio',
    viewOnMap: 'Ver en Google Maps',
    noResults: 'Ninguna propiedad coincide con tus filtros.',
    sqm: 'm\u00B2',
    showFilters: 'Filtros',
    hideFilters: 'Ocultar Filtros',
  },
  ar: {
    heroTitle: '\u0627\u0644\u0641\u0631\u0635',
    heroHeading: '\u0641\u0631\u0635 \u0627\u0644\u0623\u0631\u0627\u0636\u064A \u0648\u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062A \u0641\u064A \u0625\u0633\u0628\u0627\u0646\u064A\u0627',
    heroDesc: '\u0627\u0633\u062A\u0643\u0634\u0641 \u0623\u0643\u062B\u0631 \u0645\u0646 1,700 \u0642\u0637\u0639\u0629 \u0623\u0631\u0636 \u0648\u0641\u0631\u0635\u0629 \u0639\u0642\u0627\u0631\u064A\u0629 \u0641\u064A \u062C\u0645\u064A\u0639 \u0623\u0646\u062D\u0627\u0621 \u0625\u0633\u0628\u0627\u0646\u064A\u0627. \u0642\u0645 \u0628\u0627\u0644\u062A\u0635\u0641\u064A\u0629 \u062D\u0633\u0628 \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0623\u0648 \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0629 \u0623\u0648 \u0646\u0648\u0639 \u0627\u0644\u0639\u0642\u0627\u0631.',
    searchPlaceholder: '\u0627\u0628\u062D\u062B \u0628\u0627\u0644\u0628\u0644\u062F\u064A\u0629\u060C \u0627\u0644\u0639\u0646\u0648\u0627\u0646...',
    filterRegion: '\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u0646\u0627\u0637\u0642',
    filterProvince: '\u062C\u0645\u064A\u0639 \u0627\u0644\u0645\u062D\u0627\u0641\u0638\u0627\u062A',
    filterUse: '\u062C\u0645\u064A\u0639 \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645\u0627\u062A',
    resetFilters: '\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646',
    results: '\u0639\u0642\u0627\u0631 \u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u064A\u0647',
    municipality: '\u0627\u0644\u0628\u0644\u062F\u064A\u0629',
    address: '\u0627\u0644\u0639\u0646\u0648\u0627\u0646',
    type: '\u0627\u0644\u0646\u0648\u0639',
    use: '\u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645',
    classification: '\u0627\u0644\u062A\u0635\u0646\u064A\u0641',
    area: '\u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0623\u0631\u0636',
    buildability: '\u0627\u0644\u0628\u0646\u0627\u0621',
    homes: '\u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0627\u0644\u0633\u0643\u0646\u064A\u0629',
    price: '\u0627\u0644\u0633\u0639\u0631',
    viewOnMap: '\u0639\u0631\u0636 \u0639\u0644\u0649 \u062E\u0631\u0627\u0626\u0637 \u062C\u0648\u062C\u0644',
    noResults: '\u0644\u0627 \u062A\u0648\u062C\u062F \u0639\u0642\u0627\u0631\u0627\u062A \u062A\u0637\u0627\u0628\u0642 \u0627\u0644\u0641\u0644\u0627\u062A\u0631.',
    sqm: '\u0645\u00B2',
    showFilters: '\u0627\u0644\u0641\u0644\u0627\u062A\u0631',
    hideFilters: '\u0625\u062E\u0641\u0627\u0621 \u0627\u0644\u0641\u0644\u0627\u062A\u0631',
  }
};

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

const OpportunitiesPage = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const txt = content[language] || content.en;

  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');
  const [use, setUse] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const { properties, filters } = propertiesData;

  const filteredProvincesForRegion = useMemo(() => {
    if (!region) return filters.provinces;
    return [...new Set(properties.filter(p => p.ccaa === region).map(p => p.provincia))].sort();
  }, [region, properties, filters.provinces]);

  const filtered = useMemo(() => {
    return properties.filter(p => {
      if (search) {
        const q = search.toLowerCase();
        const matchesSearch =
          (p.municipio && p.municipio.toLowerCase().includes(q)) ||
          (p.direccion && p.direccion.toLowerCase().includes(q)) ||
          (p.provincia && p.provincia.toLowerCase().includes(q));
        if (!matchesSearch) return false;
      }
      if (region && p.ccaa !== region) return false;
      if (province && p.provincia !== province) return false;
      if (use && p.uso !== use) return false;
      return true;
    });
  }, [properties, search, region, province, use]);

  const handleReset = () => {
    setSearch('');
    setRegion('');
    setProvince('');
    setUse('');
  };

  const activeFilterCount = [region, province, use].filter(Boolean).length + (search ? 1 : 0);

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative py-28 bg-gradient-to-br from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-4">
            {txt.heroTitle}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6" data-testid="opportunities-heading">
            {txt.heroHeading}
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            {txt.heroDesc}
          </p>
        </div>
      </section>

      {/* Filters + Map */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar + Toggle */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
              <Input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={txt.searchPlaceholder}
                className={`${isRTL ? 'pr-10' : 'pl-10'} w-full bg-white`}
                data-testid="opportunities-search"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-gray-300"
              data-testid="opportunities-filter-toggle"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? txt.hideFilters : txt.showFilters}
              {activeFilterCount > 0 && (
                <span className="bg-[#d4a650] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </div>

          {/* Filter Dropdowns */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm" data-testid="opportunities-filters-panel">
              <div className="relative">
                <select
                  value={region}
                  onChange={e => { setRegion(e.target.value); setProvince(''); }}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4a650] focus:border-[#d4a650]"
                  data-testid="filter-region"
                >
                  <option value="">{txt.filterRegion}</option>
                  {filters.regions.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} w-4 h-4 text-gray-400 pointer-events-none`} />
              </div>
              <div className="relative">
                <select
                  value={province}
                  onChange={e => setProvince(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4a650] focus:border-[#d4a650]"
                  data-testid="filter-province"
                >
                  <option value="">{txt.filterProvince}</option>
                  {filteredProvincesForRegion.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-3' : 'right-3'} w-4 h-4 text-gray-400 pointer-events-none`} />
              </div>
              <div className="relative">
                <select
                  value={use}
                  onChange={e => setUse(e.target.value)}
                  className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#d4a650] focus:border-[#d4a650]"
                  data-testid="filter-use"
                >
                  <option value="">{txt.filterUse}</option>
                  {filters.uses.map(u => <option key={u} value={u}>{u}</option>)}
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

          {/* Results Count */}
          <p className="text-sm text-gray-500 mb-4" data-testid="opportunities-count">
            <span className="font-semibold text-[#0a1628]">{filtered.length.toLocaleString()}</span> {txt.results}
          </p>

          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200" data-testid="opportunities-map" style={{ height: '65vh' }}>
            <MapContainer
              center={[40.0, -3.7]}
              zoom={6}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FitBounds markers={filtered.length > 0 && filtered.length <= 2000 ? filtered : properties} />
              <MarkerClusterGroup chunkedLoading maxClusterRadius={60}>
                {filtered.map(p => (
                  <Marker key={p.id} position={[p.lat, p.lng]} icon={goldIcon}>
                    <Popup maxWidth={320} className="property-popup">
                      <div className="text-sm space-y-2 min-w-[240px]">
                        <h3 className="font-bold text-[#0a1628] text-base border-b border-gray-200 pb-2">
                          {p.municipio}
                        </h3>
                        <p className="text-gray-500 text-xs">{p.direccion}</p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#d4a650]" />
                            <span className="text-xs text-gray-600">{p.provincia}, {p.ccaa}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Home className="w-3.5 h-3.5 text-[#d4a650]" />
                            <span className="text-xs text-gray-600">{p.uso}</span>
                          </div>
                          {p.superficie > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Ruler className="w-3.5 h-3.5 text-[#d4a650]" />
                              <span className="text-xs text-gray-600">{p.superficie.toLocaleString()} m&sup2;</span>
                            </div>
                          )}
                          {p.viviendas > 0 && (
                            <div className="flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-[#d4a650]" />
                              <span className="text-xs text-gray-600">{p.viviendas} {content.en.homes}</span>
                            </div>
                          )}
                        </div>
                        {p.pvp && p.pvp !== 'nan' && (
                          <p className="text-[#d4a650] font-bold text-sm pt-1 border-t border-gray-100">
                            {p.pvp}
                          </p>
                        )}
                        {p.mapsLink && p.mapsLink !== 'nan' && (
                          <a
                            href={p.mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs text-blue-600 hover:text-blue-800 underline pt-1"
                          >
                            {content[language]?.viewOnMap || content.en.viewOnMap} &rarr;
                          </a>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OpportunitiesPage;
