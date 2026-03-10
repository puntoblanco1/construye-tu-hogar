import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const legalText = {
    en: { title: 'Legal', privacy: 'Privacy Policy', terms: 'Terms of Service' },
    es: { title: 'Legal', privacy: 'Política de Privacidad', terms: 'Términos de Servicio' },
    ar: { title: 'قانوني', privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة' }
  };

  const legal = legalText[language] || legalText.en;

  return (
    <footer className="bg-[#0a1628] text-gray-300" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" onClick={scrollToTop} className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
              <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
              <span className="text-lg font-bold text-white">
                <span className="text-[#d4a650]">CONSTRUYE</span> TU HOGAR
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/#projects" className="text-sm hover:text-[#d4a650] transition-colors">
                  {t.nav.ourProjects}
                </a>
              </li>
              <li>
                <Link to="/about" onClick={scrollToTop} className="text-sm hover:text-[#d4a650] transition-colors">
                  {t.nav.aboutUs}
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={scrollToTop} className="text-sm hover:text-[#d4a650] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link to="/faq" onClick={scrollToTop} className="text-sm hover:text-[#d4a650] transition-colors">
                  {t.nav.faq || 'FAQ'}
                </Link>
              </li>
              <li>
                <a href="/#opportunities" className="text-sm hover:text-[#d4a650] transition-colors">
                  {t.nav.opportunities || 'Opportunities'}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{legal.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" onClick={scrollToTop} className="text-sm hover:text-[#d4a650] transition-colors">
                  {legal.privacy}
                </Link>
              </li>
              <li>
                <Link to="/terms" onClick={scrollToTop} className="text-sm hover:text-[#d4a650] transition-colors">
                  {legal.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.nav.contact}</h3>
            <ul className="space-y-3">
              <li className={`flex items-start ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <MapPin className="w-5 h-5 text-[#d4a650] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Valencia, Spain</span>
              </li>
              <li className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <Phone className="w-5 h-5 text-[#d4a650] flex-shrink-0" />
                <span className="text-sm" dir="ltr">+34 673 365 300</span>
              </li>
              <li className={`flex items-center ${isRTL ? 'space-x-reverse space-x-3' : 'space-x-3'}`}>
                <Mail className="w-5 h-5 text-[#d4a650] flex-shrink-0" />
                <span className="text-sm">info@construyetuhogar.es</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.followUs}</h3>
            <div className={`flex ${isRTL ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>
              <a 
                href="https://www.facebook.com/share/17eoof5B7R/?mibextid=wwXIfr" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#d4a650] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/construyetuhogarr/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#d4a650] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/construye-tu-hogar/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#d4a650] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
