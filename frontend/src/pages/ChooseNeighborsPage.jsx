import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
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
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const journey = t.journey.card1;

  const [formData, setFormData] = useState({
    groupType: '',
    city: '',
    minArea: '',
    maxArea: '',
    totalRooms: '',
    masterBedrooms: '',
    individualRooms: '',
    floors: '',
    finishing: '',
    sharedPool: '',
    fullName: '',
    email: '',
    whatsapp: '',
    countryCode: '+34'
  });

  const texts = {
    en: {
      step1: 'Group Identity',
      step2: 'Location & Space',
      step3: 'Preferences',
      step4: 'Contact',
      groupLabel: 'Select Group Type',
      justMe: 'Just me and my family',
      groupSmall: 'Group of families < 5',
      groupLarge: 'Group of families >= 5',
      cityLabel: 'Select City',
      minAreaLabel: 'Minimum Area (m²)',
      maxAreaLabel: 'Maximum Area (m²)',
      totalRoomsLabel: 'Total Rooms',
      masterBedroomsLabel: 'Master Bedrooms',
      individualRoomsLabel: 'Individual Rooms',
      floorsLabel: 'Number of Floors',
      finishingLabel: 'Finishing Type',
      economic: 'Economic',
      standard: 'Standard',
      luxury: 'Luxury',
      sharedPoolLabel: 'Shared Pool?',
      yes: 'Yes',
      no: 'No',
      fullNameLabel: 'Full Name',
      emailLabel: 'Email',
      whatsappLabel: 'WhatsApp Number',
      countryCodeLabel: 'Country Code',
      submit: 'Submit via WhatsApp'
    },
    es: {
      step1: 'Identidad de Grupo',
      step2: 'Ubicación y Espacio',
      step3: 'Preferencias',
      step4: 'Contacto',
      groupLabel: 'Seleccionar Tipo de Grupo',
      justMe: 'Solo yo y mi familia',
      groupSmall: 'Grupo de familias < 5',
      groupLarge: 'Grupo de familias >= 5',
      cityLabel: 'Seleccionar Ciudad',
      minAreaLabel: 'Área Mínima (m²)',
      maxAreaLabel: 'Área Máxima (m²)',
      totalRoomsLabel: 'Total de Habitaciones',
      masterBedroomsLabel: 'Dormitorios Principales',
      individualRoomsLabel: 'Habitaciones Individuales',
      floorsLabel: 'Número de Pisos',
      finishingLabel: 'Tipo de Acabado',
      economic: 'Económico',
      standard: 'Estándar',
      luxury: 'Lujo',
      sharedPoolLabel: '¿Piscina Compartida?',
      yes: 'Sí',
      no: 'No',
      fullNameLabel: 'Nombre Completo',
      emailLabel: 'Correo Electrónico',
      whatsappLabel: 'Número de WhatsApp',
      countryCodeLabel: 'Código de País',
      submit: 'Enviar por WhatsApp'
    },
    ar: {
      step1: 'هوية المجموعة',
      step2: 'الموقع والمساحة',
      step3: 'التفضيلات',
      step4: 'التواصل',
      groupLabel: 'اختر نوع المجموعة',
      justMe: 'أنا وعائلتي فقط',
      groupSmall: 'مجموعة عائلات < 5',
      groupLarge: 'مجموعة عائلات >= 5',
      cityLabel: 'اختر المدينة',
      minAreaLabel: 'المساحة الدنيا (م²)',
      maxAreaLabel: 'المساحة القصوى (م²)',
      totalRoomsLabel: 'إجمالي الغرف',
      masterBedroomsLabel: 'غرف نوم رئيسية',
      individualRoomsLabel: 'غرف فردية',
      floorsLabel: 'عدد الطوابق',
      finishingLabel: 'نوع التشطيب',
      economic: 'اقتصادي',
      standard: 'قياسي',
      luxury: 'فاخر',
      sharedPoolLabel: 'مسبح مشترك؟',
      yes: 'نعم',
      no: 'لا',
      fullNameLabel: 'الاسم الكامل',
      emailLabel: 'البريد الإلكتروني',
      whatsappLabel: 'رقم الواتساب',
      countryCodeLabel: 'رمز الدولة',
      submit: 'إرسال عبر الواتساب'
    }
  };

  const txt = texts[language] || texts.en;
  const stepLabels = [txt.step1, txt.step2, txt.step3, txt.step4];

  const areas = Array.from({ length: 50 }, (_, i) => (i + 1) * 100);
  const rooms = Array.from({ length: 10 }, (_, i) => i + 1);
  const floors = [1, 2, 3];

  const handleSubmit = () => {
    const message = `*Choose Your Neighbors Request*\n\n` +
      `Group Type: ${formData.groupType}\n` +
      `City: ${formData.city}\n` +
      `Area: ${formData.minArea}m² - ${formData.maxArea}m²\n` +
      `Rooms: ${formData.totalRooms} (Master: ${formData.masterBedrooms}, Individual: ${formData.individualRooms})\n` +
      `Floors: ${formData.floors}\n` +
      `Finishing: ${formData.finishing}\n` +
      `Shared Pool: ${formData.sharedPool}\n\n` +
      `*Contact Information:*\n` +
      `Name: ${formData.fullName}\n` +
      `Email: ${formData.email}\n` +
      `WhatsApp: ${formData.countryCode}${formData.whatsapp}`;

    const whatsappUrl = `https://wa.me/34123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Success!",
      description: "Opening WhatsApp to send your request...",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{journey.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{journey.description}</p>
        </div>

        <JourneyForm stepLabels={stepLabels} onSubmit={handleSubmit}>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{txt.step1}</h2>
            <div>
              <Label>{txt.groupLabel}</Label>
              <Select value={formData.groupType} onValueChange={(val) => setFormData({...formData, groupType: val})}>
                <SelectTrigger>
                  <SelectValue placeholder={txt.groupLabel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="justme">{txt.justMe}</SelectItem>
                  <SelectItem value="small">{txt.groupSmall}</SelectItem>
                  <SelectItem value="large">{txt.groupLarge}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{txt.step2}</h2>
            <div>
              <Label>{txt.cityLabel}</Label>
              <Select value={formData.city} onValueChange={(val) => setFormData({...formData, city: val})}>
                <SelectTrigger>
                  <SelectValue placeholder={txt.cityLabel} />
                </SelectTrigger>
                <SelectContent>
                  {spanishCities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{txt.minAreaLabel}</Label>
                <Select value={formData.minArea} onValueChange={(val) => setFormData({...formData, minArea: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder={txt.minAreaLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map(area => (
                      <SelectItem key={area} value={area.toString()}>{area} m²</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{txt.maxAreaLabel}</Label>
                <Select value={formData.maxArea} onValueChange={(val) => setFormData({...formData, maxArea: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder={txt.maxAreaLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map(area => (
                      <SelectItem key={area} value={area.toString()}>{area} m²</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{txt.step3}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>{txt.totalRoomsLabel}</Label>
                <Select value={formData.totalRooms} onValueChange={(val) => setFormData({...formData, totalRooms: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder={txt.totalRoomsLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(r => (
                      <SelectItem key={r} value={r.toString()}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{txt.masterBedroomsLabel}</Label>
                <Select value={formData.masterBedrooms} onValueChange={(val) => setFormData({...formData, masterBedrooms: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder={txt.masterBedroomsLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(r => (
                      <SelectItem key={r} value={r.toString()}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{txt.individualRoomsLabel}</Label>
                <Select value={formData.individualRooms} onValueChange={(val) => setFormData({...formData, individualRooms: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder={txt.individualRoomsLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map(r => (
                      <SelectItem key={r} value={r.toString()}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>{txt.floorsLabel}</Label>
                <Select value={formData.floors} onValueChange={(val) => setFormData({...formData, floors: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder={txt.floorsLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    {floors.map(f => (
                      <SelectItem key={f} value={f.toString()}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{txt.finishingLabel}</Label>
                <Select value={formData.finishing} onValueChange={(val) => setFormData({...formData, finishing: val})}>
                  <SelectTrigger>
                    <SelectValue placeholder={txt.finishingLabel} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economic">{txt.economic}</SelectItem>
                    <SelectItem value="standard">{txt.standard}</SelectItem>
                    <SelectItem value="luxury">{txt.luxury}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>{txt.sharedPoolLabel}</Label>
              <RadioGroup value={formData.sharedPool} onValueChange={(val) => setFormData({...formData, sharedPool: val})}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes">{txt.yes}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no">{txt.no}</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{txt.step4}</h2>
            <div>
              <Label>{txt.fullNameLabel}</Label>
              <Input 
                value={formData.fullName} 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder={txt.fullNameLabel}
              />
            </div>
            <div>
              <Label>{txt.emailLabel}</Label>
              <Input 
                type="email"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder={txt.emailLabel}
              />
            </div>
            <div>
              <Label>{txt.whatsappLabel}</Label>
              <div className="flex space-x-2">
                <Input 
                  className="w-24"
                  value={formData.countryCode} 
                  onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                  placeholder="+34"
                />
                <Input 
                  className="flex-1"
                  value={formData.whatsapp} 
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  placeholder="123456789"
                />
              </div>
            </div>
            <Button 
              onClick={handleSubmit}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
            >
              {txt.submit}
            </Button>
          </div>
        </JourneyForm>
      </div>
    </div>
  );
};

export default ChooseNeighborsPage;