import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import JourneyForm from '../components/JourneyForm';
import { spanishCities, countries } from '../data/cities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useToast } from '../hooks/use-toast';

const RetirementOasisPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({ country: '', city: '', lifestyle: '', garden: '', totalRooms: '', floors: '', finishing: '', fullName: '', email: '', whatsapp: '', countryCode: '+34' });

  const ftxt = language === 'en' ? { step1: 'Residency', step2: 'Lifestyle', step3: 'Residential Specs', step4: 'Contact', countryLabel: 'Current Country', cityLabel: 'Target City in Spain', lifestyleLabel: 'Lifestyle Preference', independent: 'Fully Independent', shared: 'Community with Shared Services', gardenLabel: 'Garden Area (m²)', roomsLabel: 'Total Rooms', floorsLabel: 'Number of Floors', finishingLabel: 'Finishing Type', economic: 'Economic', standard: 'Standard', luxury: 'Luxury', fullNameLabel: 'Full Name', emailLabel: 'Email', whatsappLabel: 'WhatsApp Number', submit: 'Submit via WhatsApp' } : language === 'es' ? { step1: 'Residencia', step2: 'Estilo de Vida', step3: 'Especificaciones', step4: 'Contacto', countryLabel: 'País Actual', cityLabel: 'Ciudad Objetivo en España', lifestyleLabel: 'Preferencia de Estilo de Vida', independent: 'Completamente Independiente', shared: 'Comunidad con Servicios Compartidos', gardenLabel: 'Área de Jardín (m²)', roomsLabel: 'Total de Habitaciones', floorsLabel: 'Número de Pisos', finishingLabel: 'Tipo de Acabado', economic: 'Económico', standard: 'Estándar', luxury: 'Lujo', fullNameLabel: 'Nombre Completo', emailLabel: 'Correo Electrónico', whatsappLabel: 'Número de WhatsApp', submit: 'Enviar por WhatsApp' } : { step1: 'الإقامة', step2: 'نمط الحياة', step3: 'المواصفات', step4: 'التواصل', countryLabel: 'البلد الحالي', cityLabel: 'المدينة المستهدفة في إسبانيا', lifestyleLabel: 'تفضيل نمط الحياة', independent: 'مستقل تماماً', shared: 'مجتمع مع خدمات مشتركة', gardenLabel: 'مساحة الحديقة (م²)', roomsLabel: 'إجمالي الغرف', floorsLabel: 'عدد الطوابق', finishingLabel: 'نوع التشطيب', economic: 'اقتصادي', standard: 'قياسي', luxury: 'فاخر', fullNameLabel: 'الاسم الكامل', emailLabel: 'البريد الإلكتروني', whatsappLabel: 'رقم الواتساب', submit: 'إرسال عبر الواتساب' };

  const gardens = Array.from({ length: 10 }, (_, i) => (i + 1) * 50);
  const rooms = Array.from({ length: 10 }, (_, i) => i + 1);
  const stepLabels = [ftxt.step1, ftxt.step2, ftxt.step3, ftxt.step4];

  const handleSubmit = () => {
    const message = `*Senior Living*\n\nCountry: ${formData.country}\nCity: ${formData.city}\nLifestyle: ${formData.lifestyle}\nGarden: ${formData.garden}m²\nRooms: ${formData.totalRooms}\nFloors: ${formData.floors}\nFinishing: ${formData.finishing}\nName: ${formData.fullName}\nEmail: ${formData.email}\nWhatsApp: ${formData.countryCode}${formData.whatsapp}`;
    window.open(`https://wa.me/34123456789?text=${encodeURIComponent(message)}`, '_blank');
    toast({ title: "Success!", description: "Opening WhatsApp..." });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12"><h1 className="text-4xl font-bold text-gray-900 mb-4">Senior Living</h1></div>
        <JourneyForm stepLabels={stepLabels}>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step1}</h2><div><Label>{ftxt.countryLabel}</Label><Select value={formData.country} onValueChange={(val) => setFormData({...formData, country: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div><div><Label>{ftxt.cityLabel}</Label><Select value={formData.city} onValueChange={(val) => setFormData({...formData, city: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{spanishCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div></div>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step2}</h2><div><Label>{ftxt.lifestyleLabel}</Label><Select value={formData.lifestyle} onValueChange={(val) => setFormData({...formData, lifestyle: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="independent">{ftxt.independent}</SelectItem><SelectItem value="shared">{ftxt.shared}</SelectItem></SelectContent></Select></div><div><Label>{ftxt.gardenLabel}</Label><Select value={formData.garden} onValueChange={(val) => setFormData({...formData, garden: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{gardens.map(g => <SelectItem key={g} value={g.toString()}>{g} m²</SelectItem>)}</SelectContent></Select></div></div>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step3}</h2><div className="grid grid-cols-3 gap-4"><div><Label>{ftxt.roomsLabel}</Label><Select value={formData.totalRooms} onValueChange={(val) => setFormData({...formData, totalRooms: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{rooms.map(r => <SelectItem key={r} value={r.toString()}>{r}</SelectItem>)}</SelectContent></Select></div><div><Label>{ftxt.floorsLabel}</Label><Select value={formData.floors} onValueChange={(val) => setFormData({...formData, floors: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem><SelectItem value="2">2</SelectItem><SelectItem value="3">3</SelectItem></SelectContent></Select></div><div><Label>{ftxt.finishingLabel}</Label><Select value={formData.finishing} onValueChange={(val) => setFormData({...formData, finishing: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="economic">{ftxt.economic}</SelectItem><SelectItem value="standard">{ftxt.standard}</SelectItem><SelectItem value="luxury">{ftxt.luxury}</SelectItem></SelectContent></Select></div></div></div>
          <div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step4}</h2><div><Label>{ftxt.fullNameLabel}</Label><Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} /></div><div><Label>{ftxt.emailLabel}</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div><div><Label>{ftxt.whatsappLabel}</Label><div className="flex space-x-2"><Input className="w-24" value={formData.countryCode} onChange={(e) => setFormData({...formData, countryCode: e.target.value})} /><Input className="flex-1" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} /></div></div><Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-6">{ftxt.submit}</Button></div>
        </JourneyForm>
      </div>
    </div>
  );
};

export default RetirementOasisPage;