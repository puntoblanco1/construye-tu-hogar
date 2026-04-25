import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const articles = {
  'save-40-percent': {
    en: { title: 'How to Save Up to 40% Building Your Home in Spain', category: 'Cost Savings', date: 'Feb 2026', readTime: 5, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      content: `The Build-at-Cost methodology is revolutionizing how people construct their homes in Spain. By eliminating developer margins and middlemen, homeowners can save between 25-40% compared to buying a finished property.\n\n## What is Build-at-Cost?\n\nBuild-at-Cost means you pay only for the actual construction costs plus a transparent management fee. There are no hidden markups, no developer profits eating into your budget.\n\n## How Does It Work?\n\n1. **Land Selection** - We help you find and verify the perfect plot\n2. **Custom Design** - Your home is designed to your exact specifications\n3. **Transparent Budgeting** - Every cost is itemized and visible\n4. **Professional Construction** - Licensed builders handle everything\n5. **Quality Control** - Independent inspections at every stage\n\n## Real Savings Examples\n\n- A 100m2 home in Valencia: Market price ~250,000 EUR vs Build-at-Cost ~160,000 EUR\n- A 150m2 villa in Alicante: Market price ~380,000 EUR vs Build-at-Cost ~245,000 EUR\n\n## Why Spain?\n\nSpain offers some of the most competitive construction costs in Western Europe, combined with a favorable climate that allows year-round building. The regulatory framework is well-established, and there is a large pool of skilled construction workers.\n\n## Getting Started\n\nThe first step is to configure your ideal home using our online tool. You will get an instant estimate based on your preferences for size, quality level, and location. From there, our team guides you through every step of the process.` },
    es: { title: 'Como Ahorrar Hasta un 40% al Construir Tu Casa en Espana', category: 'Ahorro', date: 'Feb 2026', readTime: 5, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      content: `La metodologia de Construir al Costo esta revolucionando la forma en que las personas construyen sus hogares en Espana. Al eliminar los margenes del promotor y los intermediarios, los propietarios pueden ahorrar entre un 25-40% en comparacion con comprar una propiedad terminada.\n\n## Que es Construir al Costo?\n\nConstruir al Costo significa que solo pagas los costos reales de construccion mas una tarifa de gestion transparente.\n\n## Como Funciona?\n\n1. **Seleccion del Terreno** - Te ayudamos a encontrar la parcela perfecta\n2. **Diseno Personalizado** - Tu casa se disena segun tus especificaciones\n3. **Presupuesto Transparente** - Cada costo esta desglosado y visible\n4. **Construccion Profesional** - Constructores licenciados se encargan de todo\n5. **Control de Calidad** - Inspecciones independientes en cada etapa\n\n## Ejemplos de Ahorro Real\n\n- Casa de 100m2 en Valencia: Precio de mercado ~250.000 EUR vs Construir al Costo ~160.000 EUR\n- Villa de 150m2 en Alicante: Precio de mercado ~380.000 EUR vs Construir al Costo ~245.000 EUR` },
    ar: { title: 'كيف توفر حتى 40% عند بناء منزلك في إسبانيا', category: 'توفير', date: 'فبراير 2026', readTime: 5, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      content: `منهجية البناء بالتكلفة تُحدث ثورة في طريقة بناء الناس لمنازلهم في إسبانيا. بإلغاء هوامش المطورين والوسطاء، يمكن لأصحاب المنازل توفير ما بين 25-40%.\n\n## ما هو البناء بالتكلفة؟\n\nالبناء بالتكلفة يعني أنك تدفع فقط تكاليف البناء الفعلية بالإضافة إلى رسوم إدارة شفافة.\n\n## كيف يعمل؟\n\n1. **اختيار الأرض** - نساعدك في إيجاد القطعة المثالية\n2. **تصميم مخصص** - منزلك يُصمم وفق مواصفاتك\n3. **ميزانية شفافة** - كل تكلفة مفصلة وواضحة\n4. **بناء احترافي** - بناؤون مرخصون يتولون كل شيء\n5. **مراقبة الجودة** - فحوصات مستقلة في كل مرحلة` },
  },
  'legal-guide-foreigners': {
    en: { title: 'Legal Guide: Buying Property in Spain as a Foreigner', category: 'Legal Guide', date: 'Jan 2026', readTime: 8, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      content: `Buying property in Spain as a foreigner is straightforward once you understand the process. This guide covers everything you need to know.\n\n## NIE Number\n\nThe first thing you need is a NIE (Numero de Identificacion de Extranjero). This is your foreign identification number required for all financial transactions in Spain.\n\n**How to get it:**\n- Apply at the Spanish consulate in your home country\n- Apply in person at a police station in Spain\n- Processing time: 1-4 weeks\n\n## Property Taxes\n\n- **Transfer Tax (ITP):** 6-10% for resale properties\n- **VAT (IVA):** 10% for new-build properties\n- **Stamp Duty (AJD):** 0.5-1.5%\n- **Annual Property Tax (IBI):** 0.4-1.1% of cadastral value\n\n## Mortgage Options\n\nForeigners can typically borrow 60-70% of the property value. Spanish banks offer competitive rates, and our partner specialists can help you secure the best deal.\n\n## Legal Requirements\n\n1. Open a Spanish bank account\n2. Obtain your NIE number\n3. Hire a lawyer (recommended)\n4. Sign the reservation contract\n5. Sign the purchase deed at a notary\n6. Register the property\n\n## Common Pitfalls\n\n- Not checking for outstanding debts on the property\n- Ignoring urban planning regulations\n- Not verifying the property boundaries\n- Skipping the energy performance certificate` },
    es: { title: 'Guia Legal: Comprar Propiedad en Espana como Extranjero', category: 'Guia Legal', date: 'Ene 2026', readTime: 8, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      content: `Comprar una propiedad en Espana como extranjero es sencillo una vez que entiendes el proceso.\n\n## Numero NIE\n\nLo primero que necesitas es un NIE (Numero de Identificacion de Extranjero).\n\n## Impuestos\n\n- **ITP:** 6-10% para propiedades de segunda mano\n- **IVA:** 10% para obra nueva\n- **AJD:** 0.5-1.5%\n- **IBI anual:** 0.4-1.1% del valor catastral\n\n## Hipotecas\n\nLos extranjeros pueden obtener financiacion del 60-70% del valor de la propiedad.\n\n## Requisitos Legales\n\n1. Abrir cuenta bancaria espanola\n2. Obtener el NIE\n3. Contratar un abogado\n4. Firmar contrato de reserva\n5. Firmar escritura ante notario\n6. Registrar la propiedad` },
    ar: { title: 'دليل قانوني: شراء عقار في إسبانيا كأجنبي', category: 'دليل قانوني', date: 'يناير 2026', readTime: 8, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      content: `شراء عقار في إسبانيا كأجنبي أمر بسيط بمجرد فهم العملية.\n\n## رقم NIE\n\nأول شيء تحتاجه هو رقم NIE (رقم تعريف الأجنبي).\n\n## الضرائب\n\n- **ضريبة النقل:** 6-10% للعقارات المستعملة\n- **ضريبة القيمة المضافة:** 10% للعقارات الجديدة\n- **ضريبة الطوابع:** 0.5-1.5%\n\n## المتطلبات القانونية\n\n1. فتح حساب بنكي إسباني\n2. الحصول على رقم NIE\n3. توكيل محامي\n4. توقيع عقد الحجز\n5. توقيع سند الملكية أمام كاتب العدل\n6. تسجيل العقار` },
  },
  'valencia-rising-star': {
    en: { title: 'Valencia: The Rising Star of Mediterranean Real Estate', category: 'Market Trends', date: 'Jan 2026', readTime: 6, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      content: `Valencia has emerged as one of Europe's most attractive destinations for property investment, offering an unbeatable combination of lifestyle, climate, and value.\n\n## Why Valencia?\n\n- **Climate:** 300+ days of sunshine per year\n- **Cost of Living:** 30-40% lower than Barcelona or Madrid\n- **Infrastructure:** Excellent transport links, international airport\n- **Culture:** Rich history, world-class cuisine, vibrant arts scene\n- **Beach Life:** Miles of Mediterranean coastline\n\n## Property Market Overview\n\nValencia's property market has seen steady growth of 5-8% annually over the past three years, yet prices remain significantly below other major Spanish cities.\n\n**Average prices (2026):**\n- City center apartment: 2,500-3,500 EUR/m2\n- Suburban villa: 1,800-2,800 EUR/m2\n- Beachfront property: 3,000-5,000 EUR/m2\n\n## Investment Potential\n\nRental yields in Valencia average 5-7%, making it one of the best markets for buy-to-let investment in Spain. The city's growing popularity with digital nomads and remote workers has created strong demand for quality rental properties.\n\n## The Build-at-Cost Advantage\n\nBy building in Valencia using our methodology, you can create a custom home at 30-40% below market rates while benefiting from the city's appreciation trends. This means immediate equity gain plus long-term capital growth.` },
    es: { title: 'Valencia: La Estrella Emergente del Mercado Inmobiliario', category: 'Tendencias', date: 'Ene 2026', readTime: 6, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      content: `Valencia se ha convertido en uno de los destinos mas atractivos de Europa para la inversion inmobiliaria.\n\n## Por que Valencia?\n\n- **Clima:** Mas de 300 dias de sol al ano\n- **Coste de vida:** 30-40% inferior a Barcelona o Madrid\n- **Infraestructura:** Excelentes conexiones de transporte\n- **Cultura:** Rica historia, gastronomia de clase mundial\n\n## Precios Medios (2026)\n\n- Apartamento en el centro: 2.500-3.500 EUR/m2\n- Villa en las afueras: 1.800-2.800 EUR/m2\n- Propiedad en primera linea de playa: 3.000-5.000 EUR/m2\n\n## Potencial de Inversion\n\nLos rendimientos de alquiler en Valencia promedian el 5-7%, siendo uno de los mejores mercados para inversion en Espana.` },
    ar: { title: 'فالنسيا: النجم الصاعد في سوق العقارات المتوسطي', category: 'اتجاهات', date: 'يناير 2026', readTime: 6, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      content: `أصبحت فالنسيا واحدة من أكثر الوجهات جاذبية في أوروبا للاستثمار العقاري.\n\n## لماذا فالنسيا؟\n\n- **المناخ:** أكثر من 300 يوم مشمس في السنة\n- **تكلفة المعيشة:** أقل بـ 30-40% من برشلونة أو مدريد\n- **البنية التحتية:** روابط نقل ممتازة\n\n## متوسط الأسعار (2026)\n\n- شقة في وسط المدينة: 2,500-3,500 يورو/م2\n- فيلا في الضواحي: 1,800-2,800 يورو/م2\n\n## إمكانية الاستثمار\n\nعوائد الإيجار في فالنسيا تتراوح بين 5-7%.` },
  },
};

const slugs = Object.keys(articles);

const BlogArticlePage = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const article = articles[slug];
  if (!article) return <div className="min-h-screen flex items-center justify-center text-xl">Article not found</div>;

  const data = article[language] || article.en;
  const backLabel = language === 'es' ? 'Volver' : language === 'ar' ? 'رجوع' : 'Back';

  const renderContent = (text) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>;
      if (line.startsWith('- **')) {
        const parts = line.replace('- **', '').split('**');
        return <li key={i} className="mb-2"><strong>{parts[0]}</strong>{parts[1]}</li>;
      }
      if (line.startsWith('- ')) return <li key={i} className="mb-1 ml-4">{line.replace('- ', '')}</li>;
      if (line.match(/^\d+\./)) return <li key={i} className="mb-2 ml-4">{line}</li>;
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="mb-4 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[50vh] overflow-hidden">
        <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-4xl mx-auto">
          <span className="bg-[#d4a650] text-[#0a1628] text-xs font-bold px-3 py-1.5 rounded-full">{data.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-4">{data.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-300 mt-3">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{data.date}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{data.readTime} min</span>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-[#d4a650] font-semibold mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4" />{backLabel}
        </Link>
        <article className="prose prose-lg max-w-none text-gray-700">
          {renderContent(data.content)}
        </article>
      </div>
    </div>
  );
};

export { slugs };
export default BlogArticlePage;
