import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WHATSAPP_NUMBER = '34673365300';

const FloatingWhatsApp = () => {
  const { language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const tooltipText = {
    en: 'Chat with us on WhatsApp',
    es: 'Chatea con nosotros en WhatsApp',
    ar: 'تحدث معنا عبر واتساب'
  };

  const greetingText = {
    en: 'Hello! I would like more information about Construye Tu Hogar.',
    es: 'Hola! Me gustaría más información sobre Construye Tu Hogar.',
    ar: 'مرحبا! أود الحصول على مزيد من المعلومات حول ابنِ منزلك.'
  };

  const handleClick = () => {
    const msg = greetingText[language] || greetingText.en;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3" data-testid="floating-whatsapp">
      {showTooltip && (
        <div
          className="bg-white rounded-xl shadow-2xl p-4 max-w-[240px] animate-in fade-in slide-in-from-right-4 duration-300 border border-gray-100"
          data-testid="floating-whatsapp-tooltip"
        >
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <p className="text-sm text-gray-700 font-medium pr-4">
            {tooltipText[language] || tooltipText.en}
          </p>
        </div>
      )}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bf5b] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
        aria-label="WhatsApp"
        data-testid="floating-whatsapp-btn"
      >
        <MessageCircle className="w-7 h-7" fill="white" strokeWidth={0} />
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
