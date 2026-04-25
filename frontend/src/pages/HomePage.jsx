import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Home, Scale, Building2, CheckCircle, MapPin, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import MapSection from '../components/MapSection';
import AuthModal from '../components/AuthModal';
import HeroCarousel from '../components/HeroCarousel';
import ParallaxDivider from '../components/ParallaxDivider';
import BlogSection from '../components/BlogSection';
import { ScrollReveal } from '../hooks/useScrollReveal';

const parallaxContent = {
  en: {
    divider1: { title: 'Build Your Dream Home', subtitle: 'Save up to 40% with our Build-at-Cost methodology' },
    divider2: { title: 'Your Investment, Your Future', subtitle: 'Professional project management from planning to keys' },
  },
  es: {
    divider1: { title: 'Construye Tu Casa de Ensueño', subtitle: 'Ahorra hasta un 40% con nuestra metodología de Construir al Costo' },
    divider2: { title: 'Tu Inversión, Tu Futuro', subtitle: 'Gestión profesional de proyectos desde la planificación hasta las llaves' },
  },
  ar: {
    divider1: { title: 'ابنِ منزل أحلامك', subtitle: 'وفّر حتى 40% مع منهجية البناء بالتكلفة' },
    divider2: { title: 'استثمارك، مستقبلك', subtitle: 'إدارة مشاريع احترافية من التخطيط حتى التسليم' },
  },
};

const HomePage = () => {
  const { t, language } = useLanguage();
  const [showAuth, setShowAuth] = useState(false);
  const pc = parallaxContent[language] || parallaxContent.en;

  const journeyCards = [
    { id: 1, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', color: 'from-blue-600/80 to-blue-800/80', icon: Users, ...t.journey.card1 },
    { id: 2, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', color: 'from-orange-600/80 to-orange-800/80', icon: Scale, ...t.journey.card2 },
    { id: 3, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', color: 'from-green-600/80 to-green-800/80', icon: TrendingUp, ...t.journey.card3 },
    { id: 4, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', color: 'from-purple-600/80 to-purple-800/80', icon: Home, ...t.journey.card4 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Journey */}
      <section id="journey" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-3">{t.journey.sectionTitle}</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.journey.heading}</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.journey.subheading}</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeyCards.map((card, index) => {
              const Icon = card.icon;
              const paths = ['/journey/choose-neighbors', '/journey/legal-recovery', '/journey/hospitality-assets', '/journey/senior-living'];
              return (
                <ScrollReveal key={card.id} animation="fade-up" delay={index * 120}>
                  <Link to={paths[index]}>
                    <Card className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full">
                      <div className="relative h-64">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} group-hover:opacity-90 transition-opacity`}></div>
                        <div className="absolute top-4 left-4"><div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"><Icon className="w-6 h-6 text-white" /></div></div>
                        <div className="absolute top-4 right-4"><Badge className="bg-white text-gray-900 font-semibold px-3 py-1 text-xs">{card.badge}</Badge></div>
                      </div>
                      <div className="p-6 bg-white">
                        <p className="text-xs font-bold text-[#d4a650] mb-2 tracking-wider">{card.category}</p>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{card.description}</p>
                        <Button className="w-full bg-[#0a1628] hover:bg-[#0a1628]/90 text-white font-semibold py-2 rounded-lg flex items-center justify-center space-x-2"><span>{card.button}</span><ArrowRight className="w-4 h-4" /></Button>
                      </div>
                    </Card>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parallax Divider 1 */}
      <ParallaxDivider index={0}>
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{pc.divider1.title}</h2>
          <p className="text-lg md:text-xl text-[#d4a650]">{pc.divider1.subtitle}</p>
        </ScrollReveal>
      </ParallaxDivider>

      {/* Industrialized Construction Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-3">
                {language === 'es' ? 'CONSTRUCCION INDUSTRIALIZADA' : language === 'ar' ? 'البناء الصناعي المتطور' : 'INDUSTRIALIZED CONSTRUCTION'}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {language === 'es' ? 'Mucho mas que una constructora' : language === 'ar' ? 'أكثر بكثير من مجرد شركة بناء' : 'Much More Than a Builder'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === 'es' ? 'Estamos contigo de principio a fin. Te acompanamos en todo el proceso para construir tu casa con precio cerrado y sin sorpresas.' : language === 'ar' ? 'معك من البداية للنهاية. نرافقك في كل خطوة لبناء منزلك بسعر محدد وبدون مفاجآت.' : 'We are with you from start to finish. We accompany you through the entire process to build your home with a fixed price and no surprises.'}
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {step:'01', en:'Land Search & Verification', es:'Busqueda y Verificacion del Terreno', ar:'البحث عن الأرض والتحقق منها', descEn:'We help you find the ideal land, verify its legal and technical viability, and ensure it is suitable for building your dream home.', descEs:'Te ayudamos a buscar el terreno ideal, verificamos su viabilidad tecnica y legal, y nos aseguramos de que sea apto para construir.', descAr:'نساعدك في العثور على الأرض المثالية، نتحقق من جدواها القانونية والتقنية، ونتأكد من ملاءمتها للبناء.'},
              {step:'02', en:'Technical Report & Budget', es:'Informe Tecnico y Presupuesto', ar:'التقرير الفني والميزانية', descEn:'Our technicians analyze your land, design your custom home, and provide a detailed budget for every item - no hidden costs.', descEs:'Nuestros tecnicos analizan tu terreno, disenan tu casa a medida y generan un presupuesto detallado de cada partida.', descAr:'يقوم فنيونا بتحليل أرضك، وتصميم منزلك المخصص، وتقديم ميزانية مفصلة لكل بند.'},
              {step:'03', en:'Land Preparation', es:'Preparacion del Terreno', ar:'تجهيز الأرض', descEn:'We prepare your land with leveling, excavation, foundation work and access roads - ensuring a solid base for construction.', descEs:'Preparamos tu terreno con nivelacion, excavacion, cimentacion y accesos, garantizando una base solida.', descAr:'نجهز أرضك بالتسوية والحفر والأساسات وطرق الوصول لضمان قاعدة صلبة.'},
              {step:'04', en:'Architecture Project', es:'Proyecto de Arquitectura', ar:'المشروع المعماري', descEn:'We create your ideal home architecture, maximizing the potential of your plot with functional and aesthetically pleasing spaces.', descEs:'Creamos el proyecto de arquitectura de tu casa ideal, maximizando el potencial de la parcela.', descAr:'نصمم مشروعك المعماري المثالي، مستغلين كامل إمكانيات الأرض بمساحات عملية وجمالية.'},
              {step:'05', en:'Prefabricated Construction', es:'Construccion Prefabricada', ar:'البناء المُصنّع مسبقاً', descEn:'We build using prefabricated systems - faster execution, better materials, precision manufacturing, less waste and lower environmental impact.', descEs:'Construimos con sistema prefabricado: mayor rapidez, mejor calidad, precision en fabricacion y menor impacto ambiental.', descAr:'نبني بنظام مُصنّع مسبقاً: أسرع في التنفيذ، جودة أعلى، دقة في التصنيع، وأقل تأثيراً على البيئة.'},
              {step:'06', en:'Legalization & Keys', es:'Legalizacion y Entrega de Llaves', ar:'التقنين وتسليم المفاتيح', descEn:'We handle all legalization procedures and documentation so you can receive the keys to your home, ready to enjoy.', descEs:'Nos encargamos de todos los tramites de legalizacion para que recibas las llaves de tu hogar listo para disfrutar.', descAr:'نتولى جميع إجراءات التقنين والتوثيق حتى تستلم مفاتيح منزلك جاهزاً للسكن.'},
            ].map((item, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
                <div className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-[#0a1628] hover:text-white transition-all duration-500 h-full">
                  <div className="text-5xl font-bold text-[#d4a650]/20 group-hover:text-[#d4a650]/40 mb-4 transition-colors">{item.step}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-[#d4a650] transition-colors">{item[language] || item.en}</h3>
                  <p className="text-sm text-gray-600 group-hover:text-gray-300 transition-colors leading-relaxed">
                    {language === 'es' ? item.descEs : language === 'ar' ? item.descAr : item.descEn}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <ScrollReveal animation="fade-up">
        <MapSection onAuthRequired={() => setShowAuth(true)} />
      </ScrollReveal>

      {/* Parallax Divider 2 */}
      <ParallaxDivider index={1}>
        <ScrollReveal animation="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{pc.divider2.title}</h2>
          <p className="text-lg md:text-xl text-[#d4a650]">{pc.divider2.subtitle}</p>
        </ScrollReveal>
      </ParallaxDivider>

      {/* Projects */}
      <section id="projects" className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-3">PROYECTOS REALES</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Proyectos</h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">Descubre nuestros proyectos en desarrollo</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <ScrollReveal animation="fade-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" alt="37 Villa Collection" className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent"></div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-left" delay={200}>
              <div className="space-y-6">
                <div className="flex items-center space-x-3"><Badge className="bg-green-500 text-white px-3 py-1">In Progress</Badge><span className="text-sm text-gray-400">Build at Cost Model</span></div>
                <h3 className="text-3xl font-bold text-[#d4a650]">The 37 Valencia Collection</h3>
                <p className="text-gray-300 leading-relaxed">37 residential units in Valencia. Build-at-Cost methodology delivering premium properties with up to 40% savings.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a1628]/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4"><Building2 className="w-8 h-8 text-[#d4a650] mb-2" /><div className="text-2xl font-bold text-white">37</div><div className="text-sm text-gray-400">Units</div></div>
                  <div className="bg-[#0a1628]/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4"><TrendingUp className="w-8 h-8 text-[#d4a650] mb-2" /><div className="text-2xl font-bold text-white">40%</div><div className="text-sm text-gray-400">Savings</div></div>
                  <div className="bg-[#0a1628]/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4"><MapPin className="w-8 h-8 text-[#d4a650] mb-2" /><div className="text-base font-bold text-white">Valencia, Spain</div><div className="text-sm text-gray-400">Location</div></div>
                  <div className="bg-[#0a1628]/60 backdrop-blur-sm border border-gray-700 rounded-lg p-4"><CheckCircle className="w-8 h-8 text-[#d4a650] mb-2" /><div className="text-base font-bold text-white">Active</div><div className="text-sm text-gray-400">Status</div></div>
                </div>
                <Link to="/project/37-villa-collection">
                  <Button className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-6 text-base rounded-lg transition-all hover:shadow-xl flex items-center space-x-2"><span>View Project Details</span><ArrowUpRight className="w-5 h-5" /></Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />

      {/* Auth Modal */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} defaultMode="register" />
    </div>
  );
};

export default HomePage;
