import React from 'react';
import { Link } from 'react-router-dom';
import { Home, CheckCircle, Heart, Shield, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const RetirementOasisPage = () => {
  const { t } = useLanguage();
  const journey = t.journey.card4;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Home className="w-10 h-10" />
            </div>
            <p className="text-purple-200 font-semibold text-sm tracking-widest mb-4">
              {journey.category}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {journey.title}
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              {journey.description}
            </p>
            <div className="mt-8">
              <span className="inline-block bg-white text-purple-900 font-bold px-6 py-3 rounded-full text-lg">
                {journey.badge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Designed for Your Comfort</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Healthcare Services</h3>
              <p className="text-gray-600">On-site medical care and health monitoring services</p>
            </Card>
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">24/7 Security</h3>
              <p className="text-gray-600">Round-the-clock security and emergency response</p>
            </Card>
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Independent Living</h3>
              <p className="text-gray-600">Private residences with community amenities</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80" 
                alt="Retirement Oasis" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Community Amenities</h2>
              <p className="text-lg text-gray-600">
                Our retirement community offers a wide range of amenities and services designed to enhance your quality of life.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Wellness center',
                  'Swimming pool',
                  'Gardens & walking paths',
                  'Social activity rooms',
                  'Restaurant & cafe',
                  'Library',
                  'Fitness center',
                  'Medical clinic',
                  'Transportation services',
                  'Housekeeping services'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Valencia - The Perfect Location</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Valencia offers the perfect climate, culture, and healthcare infrastructure for your retirement years.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Perfect Climate', desc: '300+ days of sunshine per year' },
              { title: 'Quality Healthcare', desc: 'World-class medical facilities' },
              { title: 'Rich Culture', desc: 'Museums, theaters, and festivals' },
              { title: 'Safe Environment', desc: 'Low crime rates and peaceful living' }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Plan Your Golden Years</h2>
          <p className="text-xl text-purple-100 mb-8">
            Contact us to learn more about our retirement community and schedule a visit to see our facilities.
          </p>
          <Link to="/contact">
            <Button className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-xl flex items-center mx-auto space-x-2">
              <span>Schedule a Visit</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default RetirementOasisPage;