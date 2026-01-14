import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, TrendingUp, Home, Scale, Building2, CheckCircle, MapPin, ArrowUpRight, DollarSign, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';

const HomePage = () => {
  const { t } = useLanguage();

  const journeyCards = [
    { id: 1, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', color: 'from-blue-600/80 to-blue-800/80', icon: Users, ...t.journey.card1 },
    { id: 2, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', color: 'from-orange-600/80 to-orange-800/80', icon: Scale, ...t.journey.card2 },
    { id: 3, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80', color: 'from-green-600/80 to-green-800/80', icon: TrendingUp, ...t.journey.card3 },
    { id: 4, image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', color: 'from-purple-600/80 to-purple-800/80', icon: Home, ...t.journey.card4 }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599995903128-531fc7fb694b?crop=entropy&cs=srgb&fm=jpg&q=85)' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/90 via-[#0a1628]/85 to-[#0a1628]/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
          <h1 className="text-5xl md:text-7xl font-bold text-[#d4a650] mb-6">{t.hero.title}</h1>
          <p className="text-xl md:text-2xl text-white mb-4 max-w-3xl mx-auto">{t.hero.subtitle}</p>
          <p className="text-base md:text-lg text-[#d4a650] mb-8 max-w-3xl mx-auto">Professional Project Management Firm - Save the developer&apos;s profit with expert legal and engineering services in Spain</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#journey">
              <Button className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center space-x-2">
                <span>{t.hero.startJourney}</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </a>
            <Link to="/about">
              <Button variant="outline" className="border-2 border-[#d4a650] text-[#d4a650] hover:bg-[#d4a650]/10 font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300">
                {t.hero.learnMore}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#0a1628]/60 backdrop-blur-md border border-gray-700 rounded-xl p-6 hover:border-[#d4a650] transition-all"><div className="text-4xl font-bold text-[#d4a650] mb-2">{t.hero.stat1}</div><div className="text-gray-300">{t.hero.stat1Sub}</div></div>
            <div className="bg-[#0a1628]/60 backdrop-blur-md border border-gray-700 rounded-xl p-6 hover:border-[#d4a650] transition-all"><div className="text-4xl font-bold text-[#d4a650] mb-2">{t.hero.stat2}</div><div className="text-gray-300">{t.hero.stat2Sub}</div></div>
            <div className="bg-[#0a1628]/60 backdrop-blur-md border border-gray-700 rounded-xl p-6 hover:border-[#d4a650] transition-all"><div className="text-4xl font-bold text-[#d4a650] mb-2">{t.hero.stat3}</div><div className="text-gray-300">{t.hero.stat3Sub}</div></div>
          </div>
        </div>
      </section>

      <section id="journey" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-3">{t.journey.sectionTitle}</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.journey.heading}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t.journey.subheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeyCards.map((card, index) => {
              const Icon = card.icon;
              const paths = ['/journey/choose-neighbors', '/journey/legal-recovery', '/journey/hospitality-assets', '/journey/senior-living'];
              return (
                <Link key={card.id} to={paths[index]}>
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
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-3">PROYECTOS REALES</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Nuestros Proyectos</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">Descubre nuestros proyectos en desarrollo</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" alt="37 Villa Collection" className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/50 to-transparent"></div>
            </div>

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
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;