import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from '../hooks/useScrollReveal';

const articleSlugs = ['save-40-percent', 'legal-guide-foreigners', 'valencia-rising-star'];

const blogData = {
  en: {
    sectionTitle: 'LATEST INSIGHTS',
    heading: 'Building in Spain',
    subheading: 'Expert articles and guides on real estate development in Spain',
    readMore: 'Read More',
    readTime: 'min read',
    articles: [
      {
        title: 'How to Save Up to 40% Building Your Home in Spain',
        excerpt: 'Discover the Build-at-Cost methodology that eliminates developer margins and puts you in control of your construction project with full transparency.',
        category: 'Cost Savings',
        date: 'Feb 2026',
        readTime: 5,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      },
      {
        title: 'Legal Guide: Buying Property in Spain as a Foreigner',
        excerpt: 'Everything you need to know about NIE numbers, property taxes, mortgage options, and legal requirements for foreign property buyers in Spain.',
        category: 'Legal Guide',
        date: 'Jan 2026',
        readTime: 8,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      },
      {
        title: 'Valencia: The Rising Star of Mediterranean Real Estate',
        excerpt: 'Why Valencia is becoming Europe\'s most sought-after destination for property investment, offering lifestyle, climate, and exceptional value.',
        category: 'Market Trends',
        date: 'Jan 2026',
        readTime: 6,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
      },
    ],
  },
  es: {
    sectionTitle: 'ÚLTIMAS PUBLICACIONES',
    heading: 'Construir en España',
    subheading: 'Artículos expertos y guías sobre el desarrollo inmobiliario en España',
    readMore: 'Leer Más',
    readTime: 'min de lectura',
    articles: [
      {
        title: 'Cómo Ahorrar Hasta un 40% al Construir Tu Casa en España',
        excerpt: 'Descubre la metodología de Construir al Costo que elimina los márgenes del promotor y te da el control total de tu proyecto de construcción con total transparencia.',
        category: 'Ahorro',
        date: 'Feb 2026',
        readTime: 5,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      },
      {
        title: 'Guía Legal: Comprar Propiedad en España como Extranjero',
        excerpt: 'Todo lo que necesitas saber sobre números NIE, impuestos inmobiliarios, opciones de hipoteca y requisitos legales para compradores extranjeros en España.',
        category: 'Guía Legal',
        date: 'Ene 2026',
        readTime: 8,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      },
      {
        title: 'Valencia: La Estrella Emergente del Mercado Inmobiliario Mediterráneo',
        excerpt: 'Por qué Valencia se está convirtiendo en el destino más buscado de Europa para la inversión inmobiliaria, ofreciendo estilo de vida, clima y valor excepcional.',
        category: 'Tendencias',
        date: 'Ene 2026',
        readTime: 6,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
      },
    ],
  },
  ar: {
    sectionTitle: 'أحدث المقالات',
    heading: 'البناء في إسبانيا',
    subheading: 'مقالات وأدلة متخصصة حول التطوير العقاري في إسبانيا',
    readMore: 'اقرأ المزيد',
    readTime: 'دقائق قراءة',
    articles: [
      {
        title: 'كيف توفر حتى 40% عند بناء منزلك في إسبانيا',
        excerpt: 'اكتشف منهجية البناء بالتكلفة التي تلغي هوامش المطورين وتمنحك السيطرة الكاملة على مشروع البناء الخاص بك بشفافية تامة.',
        category: 'توفير التكاليف',
        date: 'فبراير 2026',
        readTime: 5,
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      },
      {
        title: 'دليل قانوني: شراء عقار في إسبانيا كأجنبي',
        excerpt: 'كل ما تحتاج معرفته عن أرقام NIE والضرائب العقارية وخيارات الرهن العقاري والمتطلبات القانونية لمشتري العقارات الأجانب في إسبانيا.',
        category: 'دليل قانوني',
        date: 'يناير 2026',
        readTime: 8,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      },
      {
        title: 'فالنسيا: النجم الصاعد في سوق العقارات المتوسطي',
        excerpt: 'لماذا أصبحت فالنسيا الوجهة الأكثر طلباً في أوروبا للاستثمار العقاري، حيث توفر نمط حياة ومناخاً وقيمة استثنائية.',
        category: 'اتجاهات السوق',
        date: 'يناير 2026',
        readTime: 6,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
      },
    ],
  },
};

const BlogSection = () => {
  const { language } = useLanguage();
  const data = blogData[language] || blogData.en;

  return (
    <section data-testid="blog-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16">
            <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-3">{data.sectionTitle}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{data.heading}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{data.subheading}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.articles.map((article, i) => (
            <ScrollReveal key={i} animation="fade-up" delay={i * 150}>
              <Link to={`/blog/${articleSlugs[i]}`} data-testid={`blog-article-link-${i}`} className="block h-full">
              <article
                data-testid={`blog-article-${i}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer h-full flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#d4a650] text-[#0a1628] text-xs font-bold px-3 py-1.5 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime} {data.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#d4a650] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center text-[#d4a650] font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                    <span>{data.readMore}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
