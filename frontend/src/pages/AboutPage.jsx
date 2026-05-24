import React from 'react';
import { CheckCircle, Target, Users, TrendingUp, Award, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Card } from '../components/ui/card';

const AboutPage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t.about.feature1,
      description: t.about.feature1Desc
    },
    {
      icon: Shield,
      title: t.about.feature2,
      description: t.about.feature2Desc
    },
    {
      icon: TrendingUp,
      title: t.about.feature3,
      description: t.about.feature3Desc
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-4">
            {t.about.sectionTitle}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {t.about.heading}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.about.description}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-[#d4a650]"
                >
                  <div className="w-16 h-16 bg-[#d4a650]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-[#d4a650]" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80" 
                alt="Construction team" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe everyone deserves to build their dream home without paying excessive developer margins. Our team of licensed engineers and legal professionals work together to provide direct access to construction services at cost.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#d4a650] flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Direct access to construction services</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#d4a650] flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Full transparency in costs and progress</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#d4a650] flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Expert legal and engineering guidance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#d4a650] flex-shrink-0 mt-1" />
                  <p className="text-gray-700">Up to 50% savings compared to traditional development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#0a1628] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Built on transparency, expertise, and commitment to our clients
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-[#d4a650] transition-all duration-300">
              <Target className="w-12 h-12 text-[#d4a650] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Transparency</h3>
              <p className="text-gray-400">Full visibility into every aspect of your project</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-[#d4a650] transition-all duration-300">
              <Award className="w-12 h-12 text-[#d4a650] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-400">Delivering the highest quality in every project</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-[#d4a650] transition-all duration-300">
              <Shield className="w-12 h-12 text-[#d4a650] mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-400">Building trust through honest relationships</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;