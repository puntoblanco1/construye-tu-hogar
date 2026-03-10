import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Menu, X, Heart, LogOut, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { language, changeLanguage, t } = useLanguage();
  const { user, logout, favorites } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const location = useLocation();
  const isRTL = language === 'ar';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const close = () => { setShowLangMenu(false); setShowUserMenu(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '\uD83C\uDDEC\uD83C\uDDE7' },
    { code: 'es', name: 'Espa\u00F1ol', flag: '\uD83C\uDDEA\uD83C\uDDF8' },
    { code: 'ar', name: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629', flag: '\uD83C\uDDF8\uD83C\uDDE6' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  };

  const openAuth = (mode) => {
    setAuthMode(mode);
    setShowAuth(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-lg' : 'bg-[#0a1628]'
      }`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" onClick={handleLinkClick} className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <img src="/logo.png" alt="Logo" className="w-14 h-14 object-contain rounded-full" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white tracking-tight">
                  <span className="text-[#d4a650]">CONSTRUYE</span> TU HOGAR
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-8' : 'space-x-8'}`}>
              <a href="/#projects" className="text-gray-300 hover:text-[#d4a650] transition-colors text-sm font-medium">
                {t.nav.ourProjects}
              </a>
              <Link to="/about" onClick={handleLinkClick} className="text-gray-300 hover:text-[#d4a650] transition-colors text-sm font-medium">
                {t.nav.aboutUs}
              </Link>
              <Link to="/faq" onClick={handleLinkClick} className="text-gray-300 hover:text-[#d4a650] transition-colors text-sm font-medium">
                {t.nav.faq || 'FAQ'}
              </Link>
              <a href="/#opportunities" className="text-gray-300 hover:text-[#d4a650] transition-colors text-sm font-medium" data-testid="nav-opportunities">
                {t.nav.opportunities || 'Opportunities'}
              </a>
              <Link to="/contact" onClick={handleLinkClick} className="text-gray-300 hover:text-[#d4a650] transition-colors text-sm font-medium">
                {t.nav.contact}
              </Link>
            </div>

            {/* Right Side */}
            <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              {/* Language */}
              <div className="relative" onClick={e => e.stopPropagation()}>
                <button
                  onClick={() => { setShowLangMenu(!showLangMenu); setShowUserMenu(false); }}
                  className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-gray-300 hover:text-white transition-colors`}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{currentLang.flag}</span>
                  <span className="text-sm font-medium">{currentLang.code.toUpperCase()}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showLangMenu && (
                  <div className={`absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-200`}>
                    {languages.map((lang) => (
                      <button key={lang.code} onClick={() => { changeLanguage(lang.code); setShowLangMenu(false); }}
                        className={`w-full px-4 py-2 text-${isRTL ? 'right' : 'left'} hover:bg-gray-100 transition-colors flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'} ${language === lang.code ? 'bg-gray-50' : ''}`}>
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User / Auth */}
              {user ? (
                <div className="relative" onClick={e => e.stopPropagation()}>
                  <button
                    onClick={() => { setShowUserMenu(!showUserMenu); setShowLangMenu(false); }}
                    className={`flex items-center ${isRTL ? 'space-x-reverse space-x-2' : 'space-x-2'} text-gray-300 hover:text-white transition-colors`}
                    data-testid="user-menu-btn"
                  >
                    {user.picture ? (
                      <img src={user.picture} alt="" className="w-8 h-8 rounded-full border-2 border-[#d4a650]" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#d4a650] flex items-center justify-center text-[#0a1628] font-bold text-sm">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium hidden lg:block">{user.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showUserMenu && (
                    <div className={`absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 w-52 bg-white rounded-lg shadow-xl py-2 border border-gray-200`}>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link to="/favorites" onClick={() => { setShowUserMenu(false); handleLinkClick(); }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">Favorites</span>
                        {favorites.length > 0 && (
                          <span className="ml-auto bg-[#d4a650] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{favorites.length}</span>
                        )}
                      </Link>
                      <button onClick={() => { logout(); setShowUserMenu(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-red-500">
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button onClick={() => openAuth('login')} className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg" data-testid="nav-login-btn">
                  {t.nav.contact ? 'Login' : 'Login'}
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a1628] border-t border-gray-700">
            <div className="px-4 py-4 space-y-3">
              <a href="/#projects" onClick={handleLinkClick} className="block text-gray-300 hover:text-[#d4a650] transition-colors py-2">
                {t.nav.ourProjects}
              </a>
              <Link to="/about" onClick={handleLinkClick} className="block text-gray-300 hover:text-[#d4a650] transition-colors py-2">
                {t.nav.aboutUs}
              </Link>
              <Link to="/faq" onClick={handleLinkClick} className="block text-gray-300 hover:text-[#d4a650] transition-colors py-2">
                {t.nav.faq || 'FAQ'}
              </Link>
              <a href="/#opportunities" onClick={handleLinkClick} className="block text-gray-300 hover:text-[#d4a650] transition-colors py-2">
                {t.nav.opportunities || 'Opportunities'}
              </a>
              <Link to="/contact" onClick={handleLinkClick} className="block text-gray-300 hover:text-[#d4a650] transition-colors py-2">
                {t.nav.contact}
              </Link>
              {user && (
                <Link to="/favorites" onClick={handleLinkClick} className="flex items-center gap-2 text-gray-300 hover:text-[#d4a650] transition-colors py-2">
                  <Heart className="w-4 h-4" /> Favorites {favorites.length > 0 && `(${favorites.length})`}
                </Link>
              )}
              <div className="border-t border-gray-700 pt-3 space-y-2">
                {languages.map((lang) => (
                  <button key={lang.code} onClick={() => { changeLanguage(lang.code); setMobileMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded ${language === lang.code ? 'bg-gray-700' : 'hover:bg-gray-700'} text-gray-300 transition-colors flex items-center space-x-2`}>
                    <span>{lang.flag}</span><span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
              {user ? (
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex items-center gap-3 mb-3 text-gray-300">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <Button onClick={() => { logout(); setMobileMenuOpen(false); }} variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10">
                    Logout
                  </Button>
                </div>
              ) : (
                <Button onClick={() => openAuth('login')} className="w-full bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold py-2 mt-2">
                  Login
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultMode={authMode} />
    </>
  );
};

export default Navbar;
