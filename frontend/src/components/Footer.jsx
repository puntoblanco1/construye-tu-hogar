import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#0a1628] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0a1628]" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M3 10h18M12 3l9 7-9-7-9 7 9-7z" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 10v11M18 10v11M10 14h4M10 18h4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-lg font-bold text-white">
                <span className="text-[#d4a650]">CONSTRUYE</span> TU HOGAR
              </span>
            </div>
            <p className="text-sm text-gray-400">
              {t.footer.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#journey" className="text-sm hover:text-[#d4a650] transition-colors">
                  {t.nav.yourJourney}
                </Link>
              </li>
              <li>
                <Link to="/#projects" className="text-sm hover:text-[#d4a650] transition-colors">
                  {t.nav.ourProjects}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-[#d4a650] transition-colors">
                  {t.nav.aboutUs}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[#d4a650] transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.nav.contact}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#d4a650] flex-shrink-0 mt-0.5" />
                <span className="text-sm">Valencia, Spain</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#d4a650] flex-shrink-0" />
                <span className="text-sm">+34 123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#d4a650] flex-shrink-0" />
                <span className="text-sm">info@construyetuhogar.es</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.followUs}</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#d4a650] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#d4a650] flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-[#d4a650] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
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