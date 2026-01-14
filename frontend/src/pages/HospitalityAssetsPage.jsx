import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, CheckCircle, DollarSign, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const HospitalityAssetsPage = () => {
  const { t } = useLanguage();
  const journey = t.journey.card3;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-green-900 via-green-800 to-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <TrendingUp className="w-10 h-10" />
            </div>
            <p className="text-green-200 font-semibold text-sm tracking-widest mb-4">
              {journey.category}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {journey.title}
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              {journey.description}
            </p>
            <div className="mt-8">
              <span className="inline-block bg-white text-green-900 font-bold px-6 py-3 rounded-full text-lg">
                {journey.badge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Investment Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Tourism Rentals</h3>
              <p className="text-gray-600 mb-6">
                Build properties designed for short-term tourist rentals in Valencia's growing tourism market.
              </p>
              <div className="space-y-3">
                {[
                  'Prime tourist locations',
                  'High seasonal occupancy',
                  'Premium nightly rates',
                  'Full management services available'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-8 hover:shadow-xl transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4">Long-Term Rentals</h3>
              <p className="text-gray-600 mb-6">
                Develop residential properties for stable, long-term rental income in Valencia's rental market.
              </p>
              <div className="space-y-3">
                {[
                  'Steady monthly income',
                  'Lower management overhead',
                  'Professional tenant placement',
                  'Legal compliance support'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Expected Returns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-600 mb-2">8-12%</div>
              <div className="text-gray-600">Annual ROI</div>
            </Card>
            <Card className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-600 mb-2">15-20%</div>
              <div className="text-gray-600">Capital Appreciation</div>
            </Card>
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-4xl font-bold text-green-600 mb-2">85%+</div>
              <div className="text-gray-600">Average Occupancy</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" 
                alt="Hospitality Assets" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Why Valencia?</h2>
              <p className="text-lg text-gray-600">
                Valencia is one of Spain's fastest-growing tourism and residential markets, offering excellent opportunities for property investment.
              </p>
              <div className="space-y-4">
                {[
                  'Growing tourism industry',
                  'Strong rental demand',
                  'Favorable property prices',
                  'Excellent climate year-round',
                  'Rich culture and infrastructure',
                  'Strong international connectivity'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Build Your Investment Portfolio?</h2>
          <p className="text-xl text-green-100 mb-8">
            Contact our investment team to discuss opportunities and start building your hospitality asset portfolio in Spain.
          </p>
          <Link to="/contact">
            <Button className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-xl flex items-center mx-auto space-x-2">
              <span>Discuss Investment Options</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HospitalityAssetsPage;