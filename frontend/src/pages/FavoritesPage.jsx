import React, { useState, useMemo } from 'react';
import { Heart, MapPin, Ruler, Building2, Home, MessageCircle, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import AuthModal from '../components/AuthModal';
import propertiesData from '../data/properties.json';

const content = {
  en: {
    heroTitle: 'MY FAVORITES',
    heroHeading: 'Saved Properties',
    heroDesc: 'Properties you have saved for later review.',
    empty: 'You have not saved any properties yet.',
    emptyAction: 'Browse Opportunities',
    remove: 'Remove',
    contactAbout: 'Ask via WhatsApp',
    loginTitle: 'Sign in to view your favorites',
    loginBtn: 'Sign In',
  },
  es: {
    heroTitle: 'MIS FAVORITOS',
    heroHeading: 'Propiedades Guardadas',
    heroDesc: 'Propiedades que has guardado para revisar.',
    empty: 'A\u00FAn no has guardado ninguna propiedad.',
    emptyAction: 'Explorar Oportunidades',
    remove: 'Eliminar',
    contactAbout: 'Preguntar por WhatsApp',
    loginTitle: 'Inicia sesi\u00F3n para ver tus favoritos',
    loginBtn: 'Iniciar Sesi\u00F3n',
  },
  ar: {
    heroTitle: '\u0627\u0644\u0645\u0641\u0636\u0644\u0629',
    heroHeading: '\u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062A \u0627\u0644\u0645\u062D\u0641\u0648\u0638\u0629',
    heroDesc: '\u0627\u0644\u0639\u0642\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u064A \u062D\u0641\u0638\u062A\u0647\u0627 \u0644\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0644\u0627\u062D\u0642\u0627\u064B.',
    empty: '\u0644\u0645 \u062A\u062D\u0641\u0638 \u0623\u064A \u0639\u0642\u0627\u0631\u0627\u062A \u0628\u0639\u062F.',
    emptyAction: '\u062A\u0635\u0641\u062D \u0627\u0644\u0641\u0631\u0635',
    remove: '\u0625\u0632\u0627\u0644\u0629',
    contactAbout: '\u0627\u0633\u062A\u0641\u0633\u0631 \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628',
    loginTitle: '\u0633\u062C\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0639\u0631\u0636 \u0627\u0644\u0645\u0641\u0636\u0644\u0629',
    loginBtn: '\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644',
  }
};

const FavoritesPage = () => {
  const { language } = useLanguage();
  const { user, favorites, toggleFavorite } = useAuth();
  const isRTL = language === 'ar';
  const txt = content[language] || content.en;
  const [showAuth, setShowAuth] = useState(false);

  const savedProperties = useMemo(() => {
    return propertiesData.properties.filter(p => favorites.includes(p.id));
  }, [favorites]);

  const handleWhatsApp = (p) => {
    const msg = `Hi, I'm interested in property #${p.id} at ${p.municipio}, ${p.provincia}. Address: ${p.direccion}`;
    window.open(`https://wa.me/34673365300?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (!user) {
    return (
      <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
        <section className="relative py-32 bg-gradient-to-br from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Heart className="w-16 h-16 text-[#d4a650] mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">{txt.loginTitle}</h1>
            <Button onClick={() => setShowAuth(true)} className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-3 text-lg rounded-lg" data-testid="favorites-login-btn">
              {txt.loginBtn}
            </Button>
          </div>
        </section>
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultMode="login" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <section className="relative py-28 bg-gradient-to-br from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-4">{txt.heroTitle}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" data-testid="favorites-heading">{txt.heroHeading}</h1>
          <p className="text-lg text-gray-300">{txt.heroDesc}</p>
        </div>
      </section>

      <section className="py-12 bg-gray-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {savedProperties.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-6">{txt.empty}</p>
              <a href="/#opportunities">
                <Button className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-6 py-3 rounded-lg">
                  {txt.emptyAction}
                </Button>
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="favorites-grid">
              {savedProperties.map(p => (
                <div key={p.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow" data-testid={`fav-card-${p.id}`}>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-[#0a1628]">{p.municipio}</h3>
                        <p className="text-sm text-gray-500">{p.provincia}, {p.ccaa}</p>
                      </div>
                      <button
                        onClick={() => toggleFavorite(p.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        title={txt.remove}
                        data-testid={`fav-remove-${p.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">{p.direccion}</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {p.uso && p.uso !== 'nan' && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Home className="w-3.5 h-3.5 text-[#d4a650]" />{p.uso}
                        </div>
                      )}
                      {p.superficie > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Ruler className="w-3.5 h-3.5 text-[#d4a650]" />{p.superficie.toLocaleString()} m&sup2;
                        </div>
                      )}
                      {p.viviendas > 0 && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Building2 className="w-3.5 h-3.5 text-[#d4a650]" />{p.viviendas} units
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5 text-[#d4a650]" />{p.tipologia}
                      </div>
                    </div>
                    {p.pvp && p.pvp !== 'nan' && (
                      <p className="text-[#d4a650] font-bold mb-3">
                        {p.numericPrice > 0 ? `${p.numericPrice.toLocaleString()} \u20AC` : p.pvp}
                      </p>
                    )}
                    <Button
                      onClick={() => handleWhatsApp(p)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2"
                      data-testid={`fav-whatsapp-${p.id}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {txt.contactAbout}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FavoritesPage;
