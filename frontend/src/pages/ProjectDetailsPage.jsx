import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, DollarSign, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const ProjectDetailsPage = () => {
  return (
    <div className="min-h-screen">
      <section className="relative py-32 bg-gradient-to-br from-[#0a1628] to-[#0d1f3a]">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <Badge className="bg-green-500 text-white px-4 py-2 mb-4">In Progress</Badge>
          <h1 className="text-5xl font-bold mb-4">The 37 Villa Collection - Valencia</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Build at Cost Model: Build your home at direct execution price and save developer profits</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80" alt="Project" className="rounded-2xl shadow-2xl" />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">About the Project</h2>
              <p className="text-gray-700 leading-relaxed">Modern residential development of 37 villas in Valencia. The project brings together a group of neighbors/investors to build together, giving us negotiating power to obtain high-quality materials at the lowest prices.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 text-center border-2">
                  <Building2 className="w-12 h-12 text-[#d4a650] mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">37</div>
                  <div className="text-sm text-gray-600">Villas</div>
                </Card>
                <Card className="p-6 text-center border-2">
                  <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900">40%</div>
                  <div className="text-sm text-gray-600">Savings</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Financial Value</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <DollarSign className="w-12 h-12 text-[#d4a650] mb-4" />
              <h3 className="text-xl font-bold mb-3">Savings</h3>
              <p className="text-gray-700">This model saves up to <strong>40%</strong> of the market value of the property upon delivery.</p>
            </Card>
            <Card className="p-8">
              <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Investment Return</h3>
              <p className="text-gray-700">Immediate capital gains upon completion thanks to the "cost price" advantage.</p>
            </Card>
            <Card className="p-8">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Tax Advantage</h3>
              <p className="text-gray-700">We manage the 21% VAT (IVA) refund process to reduce your final cost.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Fees - Full Transparency</h2>
          <div className="space-y-6">
            <Card className="p-8 border-2 border-[#d4a650]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Management Fee</h3>
                  <p className="text-gray-600 mt-2">Paid at start for legal structuring, permits, and project management</p>
                </div>
                <div className="text-3xl font-bold text-[#d4a650]">€5,000</div>
              </div>
            </Card>
            <Card className="p-8 border-2 border-green-600">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Success Fee</h3>
                  <p className="text-gray-600 mt-2">Paid only upon final delivery and habitability license (LPO)</p>
                </div>
                <div className="text-3xl font-bold text-green-600">€3,000</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Project Highlights</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              'Direct ownership: Own your land share officially from day one',
              'Smart building: Eco-friendly villas compliant with Spanish Technical Code (CTE)',
              'Transparency: Access all execution and material invoices without hidden profit margins',
              'Quality materials: Negotiated bulk pricing for premium finishes',
              'Legal protection: Full legal structure and permit management',
              'Expert supervision: Professional engineering oversight throughout construction'
            ].map((item, i) => (
              <div key={i} className="flex space-x-3 bg-white p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 text-[#d4a650] flex-shrink-0" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#d4a650]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#0a1628] mb-6">Start Your Journey in This Project</h2>
          <p className="text-xl text-[#0a1628]/80 mb-8">Join the 37 Villa Collection and save up to 40% with our Build-at-Cost model</p>
          <Link to="/journey/choose-neighbors">
            <Button className="bg-[#0a1628] hover:bg-[#0a1628]/90 text-white font-semibold px-8 py-6 text-lg rounded-lg flex items-center mx-auto space-x-2">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;