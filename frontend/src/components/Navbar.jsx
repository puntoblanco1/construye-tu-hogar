import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';

const Navbar = () => {
  const { language, changeLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-lg' : 'bg-[#0a1628]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md p-1">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight">
                <span className="text-[#d4a650]">CONSTRUYE</span> TU HOGAR
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/#projects" 
              className="text-gray-300 hover:text-[#d4a650] transition-colors text-sm font-medium"
            >
              {t.nav.ourProjects}
            </a>
            <Link 
              to="/about" 
              className="text-gray-300 hover:text-[#d4a650] transition-colors text-sm font-medium"
            >
              {t.nav.aboutUs}
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-300 hover:text-[#d4a650] transition-colors text-sm font-medium"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Language Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm">{currentLang.flag}</span>
                <span className="text-sm font-medium">{currentLang.code.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showLangMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors flex items-center space-x-3 ${
                        language === lang.code ? 'bg-gray-50' : ''
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/contact">
              <Button className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
                {t.nav.contact}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a1628] border-t border-gray-700">
          <div className="px-4 py-4 space-y-3">
            <a 
              href="/#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#d4a650] transition-colors py-2"
            >
              {t.nav.ourProjects}
            </a>
            <Link 
              to="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#d4a650] transition-colors py-2"
            >
              {t.nav.aboutUs}
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-[#d4a650] transition-colors py-2"
            >
              {t.nav.contact}
            </Link>
            <div className="border-t border-gray-700 pt-3 space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded ${
                    language === lang.code ? 'bg-gray-700' : 'hover:bg-gray-700'
                  } text-gray-300 transition-colors flex items-center space-x-2`}
                >
                  <span>{lang.flag}</span>
                  <span className="text-sm">{lang.name}</span>
                </button>
              ))}
            </div>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold py-2 mt-2">
                {t.nav.contact}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;