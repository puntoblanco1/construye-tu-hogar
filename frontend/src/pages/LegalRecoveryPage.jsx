import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, CheckCircle, FileText, Building, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const LegalRecoveryPage = () => {
  const { t } = useLanguage();
  const journey = t.journey.card2;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-orange-900 via-orange-800 to-orange-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Scale className="w-10 h-10" />
            </div>
            <p className="text-orange-200 font-semibold text-sm tracking-widest mb-4">
              {journey.category}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {journey.title}
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              {journey.description}
            </p>
            <div className="mt-8">
              <span className="inline-block bg-white text-orange-900 font-bold px-6 py-3 rounded-full text-lg">
                {journey.badge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">How Legal Recovery Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Property Identification', desc: 'We identify distressed properties with legal complications' },
              { step: '2', title: 'Legal Assessment', desc: 'Our legal team evaluates the case and resolution path' },
              { step: '3', title: 'Acquisition & Resolution', desc: 'We handle all legal procedures and acquire the property' },
              { step: '4', title: 'Delivery', desc: 'You receive a fully legal, ready property at best market price' }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-orange-600">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Why Legal Recovery?</h2>
              <p className="text-lg text-gray-600">
                Legal recovery properties offer unique opportunities for significant savings. Our expert team handles all complications, delivering you a ready property.
              </p>
              <div className="space-y-4">
                {[
                  'Up to 50% below market value',
                  'Full legal clearance guaranteed',
                  'Expert legal team handling all procedures',
                  'No hidden complications',
                  'Ready-to-move properties',
                  'Transparent process from start to finish'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" 
                alt="Legal Recovery" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-orange-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Interested in Legal Recovery Properties?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Contact our legal team to explore current opportunities and see how we can help you acquire premium properties at the best prices.
          </p>
          <Link to="/contact">
            <Button className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-xl flex items-center mx-auto space-x-2">
              <span>Contact Legal Team</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LegalRecoveryPage;