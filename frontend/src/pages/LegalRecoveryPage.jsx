import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import JourneyForm from '../components/JourneyForm';
import { spanishCities } from '../data/cities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';

const LegalRecoveryPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({ groupType: '', city: '', purpose: '', budget: '', timeline: '', fullName: '', email: '', whatsapp: '', countryCode: '+34' });

  const ftxt = language === 'en' ? { step1: 'Group Identity', step2: 'Location & Purpose', step3: 'Budget & Timeline', step4: 'Contact', groupLabel: 'Select Type', individual: 'Individual', family: 'Single Family', investors: 'Group of Investors', cityLabel: 'Select City', purposeLabel: 'Purpose', residence: 'Personal Residence', resale: 'Investment for Resale', budgetLabel: 'Budget Range', timelineLabel: 'Timeline', urgent: 'Urgent', months6: 'Within 6 Months', exploring: 'Exploring', fullNameLabel: 'Full Name', emailLabel: 'Email', whatsappLabel: 'WhatsApp Number', submit: 'Submit via WhatsApp' } : language === 'es' ? { step1: 'Identidad', step2: 'Ubicación y Propósito', step3: 'Presupuesto y Tiempo', step4: 'Contacto', groupLabel: 'Seleccionar Tipo', individual: 'Individual', family: 'Familia Única', investors: 'Grupo de Inversores', cityLabel: 'Seleccionar Ciudad', purposeLabel: 'Propósito', residence: 'Residencia Personal', resale: 'Inversión para Reventa', budgetLabel: 'Rango de Presupuesto', timelineLabel: 'Cronograma', urgent: 'Urgente', months6: 'Dentro de 6 Meses', exploring: 'Explorando', fullNameLabel: 'Nombre Completo', emailLabel: 'Correo Electrónico', whatsappLabel: 'Número de WhatsApp', submit: 'Enviar por WhatsApp' } : { step1: 'الهوية', step2: 'الموقع والهدف', step3: 'الميزانية والوقت', step4: 'التواصل', groupLabel: 'اختر النوع', individual: 'فرد', family: 'عائلة واحدة', investors: 'مجموعة مستثمرين', cityLabel: 'اختر المدينة', purposeLabel: 'الهدف', residence: 'إقامة شخصية', resale: 'استثمار لإعادة البيع', budgetLabel: 'نطاق الميزانية', timelineLabel: 'الإطار الزمني', urgent: 'عاجل', months6: 'خلال 6 أشهر', exploring: 'استكشاف', fullNameLabel: 'الاسم الكامل', emailLabel: 'البريد الإلكتروني', whatsappLabel: 'رقم الواتساب', submit: 'إرسال عبر الواتساب' };

  const budgets = ['50k€ - 100k€', '100k€ - 250k€', '250k€ - 500k€', '500k€ - 1M€', '1M€ - 2M€', '2M€+'];
  const stepLabels = [ftxt.step1, ftxt.step2, ftxt.step3, ftxt.step4];

  const handleSubmit = () => {
    const message = `*Legal Recovery Request*\n\nType: ${formData.groupType}\nCity: ${formData.city}\nPurpose: ${formData.purpose}\nBudget: ${formData.budget}\nTimeline: ${formData.timeline}\nName: ${formData.fullName}\nEmail: ${formData.email}\nWhatsApp: ${formData.countryCode}${formData.whatsapp}`;
    window.open(`https://wa.me/34123456789?text=${encodeURIComponent(message)}`, '_blank');
    toast({ title: "Success!", description: "Opening WhatsApp..." });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12"><h1 className="text-4xl font-bold text-gray-900 mb-4">Legal Recovery</h1></div>
        <JourneyForm stepLabels={stepLabels}>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step1}</h2><div><Label>{ftxt.groupLabel}</Label><Select value={formData.groupType} onValueChange={(val) => setFormData({...formData, groupType: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="individual">{ftxt.individual}</SelectItem><SelectItem value="family">{ftxt.family}</SelectItem><SelectItem value="investors">{ftxt.investors}</SelectItem></SelectContent></Select></div></div>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step2}</h2><div><Label>{ftxt.cityLabel}</Label><Select value={formData.city} onValueChange={(val) => setFormData({...formData, city: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{spanishCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div><div><Label>{ftxt.purposeLabel}</Label><Select value={formData.purpose} onValueChange={(val) => setFormData({...formData, purpose: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="residence">{ftxt.residence}</SelectItem><SelectItem value="resale">{ftxt.resale}</SelectItem></SelectContent></Select></div></div>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step3}</h2><div><Label>{ftxt.budgetLabel}</Label><Select value={formData.budget} onValueChange={(val) => setFormData({...formData, budget: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{budgets.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></div><div><Label>{ftxt.timelineLabel}</Label><Select value={formData.timeline} onValueChange={(val) => setFormData({...formData, timeline: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="urgent">{ftxt.urgent}</SelectItem><SelectItem value="6months">{ftxt.months6}</SelectItem><SelectItem value="exploring">{ftxt.exploring}</SelectItem></SelectContent></Select></div></div>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step4}</h2><div><Label>{ftxt.fullNameLabel}</Label><Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} /></div><div><Label>{ftxt.emailLabel}</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div><div><Label>{ftxt.whatsappLabel}</Label><div className="flex space-x-2"><Input className="w-24" value={formData.countryCode} onChange={(e) => setFormData({...formData, countryCode: e.target.value})} /><Input className="flex-1" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} /></div></div><Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-6">{ftxt.submit}</Button></div>
        </JourneyForm>
      </div>
    </div>
  );
};

export default LegalRecoveryPage;