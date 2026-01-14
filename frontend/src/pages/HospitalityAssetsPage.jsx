import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import JourneyForm from '../components/JourneyForm';
import { spanishCities } from '../data/cities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const HospitalityAssetsPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ investorType: '', investmentPath: '', city: '', goal: '', cycle: '', fullName: '', email: '', whatsapp: '', countryCode: '+34' });

  const ftxt = language === 'en' ? { step1: 'Investor Type', step2: 'Investment Path', step3: 'Goal & Cycle', step4: 'Contact', typeLabel: 'Select Type', individual: 'Individual Investor', company: 'Company/Group', cooperative: 'Investment Cooperative', pathLabel: 'Investment Type', apartments: 'Tourist Apartments', hotel: 'Rural Hotel', building: 'Building for Tourism', events: 'Event Space', glamping: 'Glamping', cityLabel: 'Select City', goalLabel: 'Investment Goal', yield: 'High Operating Yield', preservation: 'Long-term Asset Preservation', cycleLabel: 'Investment Cycle (Years)', fullNameLabel: 'Full Name', emailLabel: 'Email', whatsappLabel: 'WhatsApp Number', submit: 'Submit via WhatsApp' } : language === 'es' ? { step1: 'Tipo de Inversor', step2: 'Camino de Inversión', step3: 'Objetivo y Ciclo', step4: 'Contacto', typeLabel: 'Seleccionar Tipo', individual: 'Inversor Individual', company: 'Empresa/Grupo', cooperative: 'Cooperativa de Inversión', pathLabel: 'Tipo de Inversión', apartments: 'Apartamentos Turísticos', hotel: 'Hotel Rural', building: 'Edificio para Turismo', events: 'Espacio para Eventos', glamping: 'Glamping', cityLabel: 'Seleccionar Ciudad', goalLabel: 'Objetivo de Inversión', yield: 'Alto Rendimiento Operativo', preservation: 'Preservación de Activos a Largo Plazo', cycleLabel: 'Ciclo de Inversión (Años)', fullNameLabel: 'Nombre Completo', emailLabel: 'Correo Electrónico', whatsappLabel: 'Número de WhatsApp', submit: 'Enviar por WhatsApp' } : { step1: 'نوع المستثمر', step2: 'مسار الاستثمار', step3: 'الهدف والدورة', step4: 'التواصل', typeLabel: 'اختر النوع', individual: 'مستثمر فردي', company: 'شركة/مجموعة', cooperative: 'تعاونية استثمارية', pathLabel: 'نوع الاستثمار', apartments: 'شقق سياحية', hotel: 'فندق ريفي', building: 'مبنى سياحي', events: 'مساحة للفعاليات', glamping: 'غلامبينغ', cityLabel: 'اختر المدينة', goalLabel: 'هدف الاستثمار', yield: 'عائد تشغيلي مرتفع', preservation: 'حفظ الأصول طويل الأمد', cycleLabel: 'دورة الاستثمار (سنوات)', fullNameLabel: 'الاسم الكامل', emailLabel: 'البريد الإلكتروني', whatsappLabel: 'رقم الواتساب', submit: 'إرسال عبر الواتساب' };

  const stepLabels = [ftxt.step1, ftxt.step2, ftxt.step3, ftxt.step4];

  const handleSubmit = () => {
    const message = `*Hospitality & Assets*\n\nType: ${formData.investorType}\nPath: ${formData.investmentPath}\nCity: ${formData.city}\nGoal: ${formData.goal}\nCycle: ${formData.cycle} years\nName: ${formData.fullName}\nEmail: ${formData.email}\nWhatsApp: ${formData.countryCode}${formData.whatsapp}`;
    window.open(`https://wa.me/34123456789?text=${encodeURIComponent(message)}`, '_blank');
    toast({ title: "Success!", description: "Opening WhatsApp..." });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12"><h1 className="text-4xl font-bold text-gray-900 mb-4">Hospitality & Assets</h1></div>
        <JourneyForm stepLabels={stepLabels}>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step1}</h2><div><Label>{ftxt.typeLabel}</Label><Select value={formData.investorType} onValueChange={(val) => setFormData({...formData, investorType: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="individual">{ftxt.individual}</SelectItem><SelectItem value="company">{ftxt.company}</SelectItem><SelectItem value="cooperative">{ftxt.cooperative}</SelectItem></SelectContent></Select></div></div>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step2}</h2><div><Label>{ftxt.pathLabel}</Label><Select value={formData.investmentPath} onValueChange={(val) => setFormData({...formData, investmentPath: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="apartments">{ftxt.apartments}</SelectItem><SelectItem value="hotel">{ftxt.hotel}</SelectItem><SelectItem value="building">{ftxt.building}</SelectItem><SelectItem value="events">{ftxt.events}</SelectItem><SelectItem value="glamping">{ftxt.glamping}</SelectItem></SelectContent></Select></div><div><Label>{ftxt.cityLabel}</Label><Select value={formData.city} onValueChange={(val) => setFormData({...formData, city: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{spanishCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div></div>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step3}</h2><div><Label>{ftxt.goalLabel}</Label><Select value={formData.goal} onValueChange={(val) => setFormData({...formData, goal: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="yield">{ftxt.yield}</SelectItem><SelectItem value="preservation">{ftxt.preservation}</SelectItem></SelectContent></Select></div><div><Label>{ftxt.cycleLabel}</Label><Select value={formData.cycle} onValueChange={(val) => setFormData({...formData, cycle: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="2">2</SelectItem><SelectItem value="3">3</SelectItem><SelectItem value="4">4</SelectItem><SelectItem value="5+">5+</SelectItem></SelectContent></Select></div></div>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step4}</h2><div><Label>{ftxt.fullNameLabel}</Label><Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} /></div><div><Label>{ftxt.emailLabel}</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div><div><Label>{ftxt.whatsappLabel}</Label><div className="flex space-x-2"><Input className="w-24" value={formData.countryCode} onChange={(e) => setFormData({...formData, countryCode: e.target.value})} /><Input className="flex-1" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} /></div></div><Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-6">{ftxt.submit}</Button></div>
        </JourneyForm>
      </div>
    </div>
  );
};

export default HospitalityAssetsPage;