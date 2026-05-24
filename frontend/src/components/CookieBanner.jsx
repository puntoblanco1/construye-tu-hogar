import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CookieBanner = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const isRTL = language === 'ar';

  const content = {
    en: {
      title: 'We use cookies',
      description: 'This website uses cookies to improve your experience and analyze site traffic. By clicking "Accept", you consent to our use of cookies.',
      accept: 'Accept All',
      reject: 'Reject',
      settings: 'Cookie Settings',
      privacy: 'Privacy Policy'
    },
    es: {
      title: 'Usamos cookies',
      description: 'Este sitio web utiliza cookies para mejorar tu experiencia y analizar el tráfico. Al hacer clic en "Aceptar", consientes el uso de cookies.',
      accept: 'Aceptar Todo',
      reject: 'Rechazar',
      settings: 'Configuración',
      privacy: 'Política de Privacidad'
    },
    ar: {
      title: 'نستخدم ملفات تعريف الارتباط',
      description: 'يستخدم هذا الموقع ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور. بالنقر على "قبول"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
      accept: 'قبول الكل',
      reject: 'رفض',
      settings: 'الإعدادات',
      privacy: 'سياسة الخصوصية'
    }
  };

  const txt = content[language] || content.en;

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4 animate-slide-up"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-4xl mx-auto bg-[#0a1628] rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
        <div className="p-6">
          <div className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Cookie Icon */}
            <div className="flex-shrink-0 w-12 h-12 bg-[#d4a650]/20 rounded-full flex items-center justify-center">
              <Cookie className="w-6 h-6 text-[#d4a650]" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg mb-2">{txt.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {txt.description}
              </p>

              {/* Buttons */}
              <div className={`flex flex-wrap gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={handleAccept}
                  className="px-6 py-2.5 bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                  data-testid="cookie-accept-btn"
                >
                  {txt.accept}
                </button>
                <button
                  onClick={handleReject}
                  className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-all duration-300"
                  data-testid="cookie-reject-btn"
                >
                  {txt.reject}
                </button>
                <a
                  href="/privacy"
                  className="px-6 py-2.5 text-gray-400 hover:text-white font-medium transition-colors flex items-center"
                >
                  {txt.privacy}
                </a>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleReject}
              className="flex-shrink-0 text-gray-500 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
