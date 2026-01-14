import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, CheckCircle, Shield, Award, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import JourneyForm from '../components/JourneyForm';
import { spanishCities } from '../data/cities';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useToast } from '../hooks/use-toast';

const ChooseNeighborsPage = () => {
  const { t } = useLanguage();
  const journey = t.journey.card1;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Users className="w-10 h-10" />
            </div>
            <p className="text-blue-200 font-semibold text-sm tracking-widest mb-4">
              {journey.category}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {journey.title}
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              {journey.description}
            </p>
            <div className="mt-8">
              <span className="inline-block bg-white text-blue-900 font-bold px-6 py-3 rounded-full text-lg">
                {journey.badge}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose This Path?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Build with Friends</h3>
              <p className="text-gray-600">Create a private community with people you trust and love</p>
            </Card>
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enhanced Security</h3>
              <p className="text-gray-600">Gated community with shared security resources</p>
            </Card>
            <Card className="p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cost Savings</h3>
              <p className="text-gray-600">Shared infrastructure reduces individual costs by up to 30%</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" 
                alt="Community" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">What's Included</h2>
              <div className="space-y-4">
                {[
                  'Private residential complex design',
                  'Shared amenities (pool, gym, common areas)',
                  'Gated security with shared costs',
                  'Custom home designs per family',
                  'Transparent cost breakdown',
                  'Legal documentation and permits'
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <p className="text-gray-700 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Community?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today to discuss your vision and get started with your private community project.
          </p>
          <Link to="/contact">
            <Button className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-xl flex items-center mx-auto space-x-2">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ChooseNeighborsPage;