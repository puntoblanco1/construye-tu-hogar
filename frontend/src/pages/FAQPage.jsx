import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, Search, Building2, Scale, Palette, DollarSign, Clock, AlertTriangle, Users, Shield, Landmark, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  const faq = t.faq || {};

  const categories = [
    { id: 'all', icon: HelpCircle, label: faq.categories?.all || 'All' },
    { id: 'general', icon: Building2, label: faq.categories?.general || 'General' },
    { id: 'philosophy', icon: Users, label: faq.categories?.philosophy || 'Philosophy' },
    { id: 'legal', icon: Scale, label: faq.categories?.legal || 'Legal' },
    { id: 'design', icon: Palette, label: faq.categories?.design || 'Design' },
    { id: 'transparency', icon: DollarSign, label: faq.categories?.transparency || 'Transparency' },
    { id: 'timeline', icon: Clock, label: faq.categories?.timeline || 'Timeline' },
    { id: 'risk', icon: AlertTriangle, label: faq.categories?.risk || 'Risk' },
    { id: 'financial', icon: Landmark, label: faq.categories?.financial || 'Financial' },
    { id: 'guarantees', icon: Shield, label: faq.categories?.guarantees || 'Guarantees' },
  ];

  const faqData = useMemo(() => {
    const questions = faq.questions || {};
    return [
      // General Company Questions
      { id: 'g1', category: 'general', q: questions.g1?.q, a: questions.g1?.a },
      { id: 'g2', category: 'general', q: questions.g2?.q, a: questions.g2?.a },
      { id: 'g3', category: 'general', q: questions.g3?.q, a: questions.g3?.a },
      { id: 'g4', category: 'general', q: questions.g4?.q, a: questions.g4?.a },
      
      // Philosophy & Model
      { id: 'p1', category: 'philosophy', q: questions.p1?.q, a: questions.p1?.a },
      { id: 'p2', category: 'philosophy', q: questions.p2?.q, a: questions.p2?.a },
      
      // Legal & Security
      { id: 'l1', category: 'legal', q: questions.l1?.q, a: questions.l1?.a },
      { id: 'l2', category: 'legal', q: questions.l2?.q, a: questions.l2?.a },
      { id: 'l3', category: 'legal', q: questions.l3?.q, a: questions.l3?.a },
      { id: 'l4', category: 'legal', q: questions.l4?.q, a: questions.l4?.a },
      
      // Design & Customization
      { id: 'd1', category: 'design', q: questions.d1?.q, a: questions.d1?.a },
      { id: 'd2', category: 'design', q: questions.d2?.q, a: questions.d2?.a },
      { id: 'd3', category: 'design', q: questions.d3?.q, a: questions.d3?.a },
      
      // Transparency & Fees
      { id: 't1', category: 'transparency', q: questions.t1?.q, a: questions.t1?.a },
      { id: 't2', category: 'transparency', q: questions.t2?.q, a: questions.t2?.a },
      { id: 't3', category: 'transparency', q: questions.t3?.q, a: questions.t3?.a },
      
      // Timeline & Execution
      { id: 'e1', category: 'timeline', q: questions.e1?.q, a: questions.e1?.a },
      { id: 'e2', category: 'timeline', q: questions.e2?.q, a: questions.e2?.a },
      { id: 'e3', category: 'timeline', q: questions.e3?.q, a: questions.e3?.a },
      { id: 'e4', category: 'timeline', q: questions.e4?.q, a: questions.e4?.a },
      
      // Risk Management
      { id: 'r1', category: 'risk', q: questions.r1?.q, a: questions.r1?.a },
      { id: 'r2', category: 'risk', q: questions.r2?.q, a: questions.r2?.a },
      { id: 'r3', category: 'risk', q: questions.r3?.q, a: questions.r3?.a },
      { id: 'r4', category: 'risk', q: questions.r4?.q, a: questions.r4?.a },
      
      // Financial & Tax
      { id: 'f1', category: 'financial', q: questions.f1?.q, a: questions.f1?.a },
      { id: 'f2', category: 'financial', q: questions.f2?.q, a: questions.f2?.a },
      { id: 'f3', category: 'financial', q: questions.f3?.q, a: questions.f3?.a },
      
      // Guarantees
      { id: 'gu1', category: 'guarantees', q: questions.gu1?.q, a: questions.gu1?.a },
      { id: 'gu2', category: 'guarantees', q: questions.gu2?.q, a: questions.gu2?.a },
      { id: 'gu3', category: 'guarantees', q: questions.gu3?.q, a: questions.gu3?.a },
      { id: 'gu4', category: 'guarantees', q: questions.gu4?.q, a: questions.gu4?.a },
      { id: 'gu5', category: 'guarantees', q: questions.gu5?.q, a: questions.gu5?.a },
    ].filter(item => item.q && item.a);
  }, [faq]);

  const filteredFAQ = useMemo(() => {
    return faqData.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = !searchQuery || 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [faqData, activeCategory, searchQuery]);

  const toggleItem = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`min-h-screen bg-[#F5F5F5] pt-24 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <div className="bg-[#0a1628] py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {faq.title || 'Frequently Asked Questions'}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {faq.subtitle || 'Find answers to common questions about our services'}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'right-4' : 'left-4'}`} />
          <input
            type="text"
            placeholder={faq.searchPlaceholder || 'Search questions...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full py-4 bg-white rounded-xl shadow-lg border-0 focus:ring-2 focus:ring-[#D4AF37] outline-none text-gray-700 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
            data-testid="faq-search-input"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#000080] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
                data-testid={`faq-category-${cat.id}`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {filteredFAQ.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{faq.noResults || 'No questions found'}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQ.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
                data-testid={`faq-item-${item.id}`}
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full flex items-center justify-between p-5 text-${isRTL ? 'right' : 'left'} hover:bg-gray-50 transition-colors`}
                  data-testid={`faq-toggle-${item.id}`}
                >
                  <span className="font-semibold text-[#000080] text-lg flex-1">
                    {item.q}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ${isRTL ? 'mr-4' : 'ml-4'} ${
                      openItems[item.id] ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openItems[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className={`p-5 pt-0 text-gray-600 leading-relaxed border-t border-gray-100 ${isRTL ? 'border-r-4' : 'border-l-4'} border-[#D4AF37] mx-5 mb-5`}>
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-[#0a1628] py-16 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {faq.ctaTitle || "Still have questions?"}
          </h2>
          <p className="text-gray-300 mb-6">
            {faq.ctaSubtitle || "Our team is here to help you"}
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#D4AF37] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg"
            data-testid="faq-contact-btn"
          >
            {faq.ctaButton || 'Contact Us'}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
