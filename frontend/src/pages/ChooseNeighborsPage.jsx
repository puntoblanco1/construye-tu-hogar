import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { CheckCircle, Users } from 'lucide-react';
import JourneyForm from '../components/JourneyForm';
import PrototypesSection from '../components/PrototypesSection';
import { spanishCities } from '../data/cities';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useToast } from '../hooks/use-toast';

const ChooseNeighborsPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [selectedPrototype, setSelectedPrototype] = useState(null);
  const [formData, setFormData] = useState({ groupType: '', city: '', minArea: '', maxArea: '', totalRooms: '', masterBedrooms: '', individualRooms: '', floors: '', finishing: '', sharedPool: '', fullName: '', email: '', whatsapp: '', countryCode: '+34' });

  const content = {
    en: { title: 'Choose Your Neighbors', subtitle: 'Build Your Own Community', intro: "Why live next to strangers? We give you the power to design your life with those you love. Partner with your friends or family to build a private residential complex that offers privacy, security, and savings.", stepsTitle: 'Execution Steps', steps: ['Select and legally verify the appropriate land.', 'Design residential units based on each group member\'s preferences.', 'Begin construction with full engineering and legal supervision.', 'Final delivery and issuance of individual property deeds.'], advantagesTitle: 'Model Advantages', advantages: ['Save up to 30% of market property value.', 'Full control over interior design and shared facilities (pool, garden, etc.).', 'Live in a community of your choice ensuring psychological comfort.'], startNow: 'Start Now' },
    es: { title: 'Elige a tus Vecinos', subtitle: 'Construye Tu Propia Comunidad', intro: '\u00BFPor qu\u00E9 vivir junto a extra\u00F1os? Te damos el poder de dise\u00F1ar tu vida con quienes amas. As\u00F3ciate con tus amigos o familia para construir un complejo residencial privado que ofrece privacidad, seguridad y ahorros.', stepsTitle: 'Pasos de Ejecuci\u00F3n', steps: ['Seleccionar y verificar legalmente el terreno apropiado.', 'Dise\u00F1ar unidades residenciales seg\u00FAn las preferencias de cada miembro del grupo.', 'Comenzar la construcci\u00F3n con supervisi\u00F3n completa de ingenier\u00EDa y legal.', 'Entrega final y emisi\u00F3n de escrituras de propiedad individuales.'], advantagesTitle: 'Ventajas del Modelo', advantages: ['Ahorro de hasta 30% del valor de mercado de la propiedad.', 'Control total sobre el dise\u00F1o interior y las instalaciones compartidas (piscina, jard\u00EDn, etc.).', 'Vivir en una comunidad de tu elecci\u00F3n que garantiza comodidad psicol\u00F3gica.'], startNow: 'Comienza Ahora' },
    ar: { title: '\u0627\u062E\u062A\u0631 \u062C\u064A\u0631\u0627\u0646\u0643', subtitle: '\u0627\u0628\u0646\u0650 \u0645\u062C\u062A\u0645\u0639\u0643 \u0627\u0644\u062E\u0627\u0635', intro: '\u0644\u0645\u0627\u0630\u0627 \u062A\u0633\u0643\u0646 \u0628\u062C\u0648\u0627\u0631 \u0627\u0644\u063A\u0631\u0628\u0627\u0621\u061F \u0646\u062D\u0646 \u0646\u0645\u0646\u062D\u0643 \u0627\u0644\u0642\u0648\u0629 \u0644\u062A\u0635\u0645\u064A\u0645 \u062D\u064A\u0627\u062A\u0643 \u0645\u0639 \u0645\u0646 \u062A\u062D\u0628. \u0627\u0634\u062A\u0631\u0643 \u0645\u0639 \u0623\u0635\u062F\u0642\u0627\u0626\u0643 \u0623\u0648 \u0639\u0627\u0626\u0644\u062A\u0643 \u0644\u0628\u0646\u0627\u0621 \u0645\u062C\u0645\u0639 \u0633\u0643\u0646\u064A \u062E\u0627\u0635 \u064A\u0648\u0641\u0631 \u0644\u0643 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629 \u0648\u0627\u0644\u0623\u0645\u0627\u0646 \u0648\u0627\u0644\u062A\u0648\u0641\u064A\u0631.', stepsTitle: '\u062E\u0637\u0648\u0627\u062A \u0627\u0644\u062A\u0646\u0641\u064A\u0630', steps: ['\u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0623\u0631\u0636 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0648\u062A\u062F\u0642\u064A\u0642\u0647\u0627 \u0642\u0627\u0646\u0648\u0646\u064A\u0627\u064B.', '\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u0648\u062D\u062F\u0627\u062A \u0627\u0644\u0633\u0643\u0646\u064A\u0629 \u0628\u0646\u0627\u0621\u064B \u0639\u0644\u0649 \u0631\u063A\u0628\u0629 \u0643\u0644 \u0641\u0631\u062F \u0641\u064A \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629.', '\u0627\u0644\u0628\u062F\u0621 \u0641\u064A \u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0625\u0646\u0634\u0627\u0621\u0627\u062A \u0628\u0625\u0634\u0631\u0627\u0641 \u0647\u0646\u062F\u0633\u064A \u0648\u0642\u0627\u0646\u0648\u0646\u064A \u0643\u0627\u0645\u0644.', '\u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0627\u0644\u0646\u0647\u0627\u0626\u064A \u0648\u0625\u0635\u062F\u0627\u0631 \u0635\u0643\u0648\u0643 \u0627\u0644\u0645\u0644\u0643\u064A\u0629 \u0627\u0644\u0645\u0633\u062A\u0642\u0644\u0629.'], advantagesTitle: '\u0645\u0645\u064A\u0632\u0627\u062A \u0627\u0644\u0646\u0645\u0648\u0630\u062C', advantages: ['\u062A\u0648\u0641\u064A\u0631 \u064A\u0635\u0644 \u0625\u0644\u0649 30% \u0645\u0646 \u0642\u064A\u0645\u0629 \u0627\u0644\u0639\u0642\u0627\u0631 \u0627\u0644\u0633\u0648\u0642\u064A\u0629.', '\u062A\u062D\u0643\u0645 \u0643\u0627\u0645\u0644 \u0641\u064A \u0627\u0644\u062A\u0635\u0645\u064A\u0645 \u0627\u0644\u062F\u0627\u062E\u0644\u064A \u0648\u0627\u0644\u0645\u0631\u0627\u0641\u0642 \u0627\u0644\u0645\u0634\u062A\u0631\u0643\u0629 (\u0645\u0633\u0628\u062D\u060C \u062D\u062F\u064A\u0642\u0629\u060C \u0625\u0644\u062E).', '\u0627\u0644\u0639\u064A\u0634 \u0641\u064A \u0645\u062C\u062A\u0645\u0639 \u0645\u0646 \u0627\u062E\u062A\u064A\u0627\u0631\u0643 \u064A\u0636\u0645\u0646 \u0644\u0643 \u0627\u0644\u0631\u0627\u062D\u0629 \u0627\u0644\u0646\u0641\u0633\u064A\u0629.'], startNow: '\u0627\u0628\u062F\u0623 \u0627\u0644\u0622\u0646' }
  };

  const txt = content[language] || content.en;
  const areas = Array.from({ length: 50 }, (_, i) => (i + 1) * 100);
  const rooms = Array.from({ length: 10 }, (_, i) => i + 1);
  const ftxt = language === 'en' ? { step1: 'Group Identity', step2: 'Location & Space', step3: 'Preferences', step4: 'Contact', groupLabel: 'Select Group Type', justMe: 'Just me and my family', groupSmall: 'Group of families < 5', groupLarge: 'Group of families >= 5', cityLabel: 'Select City', minAreaLabel: 'Minimum Area (m\u00B2)', maxAreaLabel: 'Maximum Area (m\u00B2)', totalRoomsLabel: 'Total Rooms', masterBedroomsLabel: 'Master Bedrooms', individualRoomsLabel: 'Individual Rooms', floorsLabel: 'Number of Floors', finishingLabel: 'Finishing Type', economic: 'Economic', standard: 'Standard', luxury: 'Luxury', sharedPoolLabel: 'Shared Pool?', yes: 'Yes', no: 'No', fullNameLabel: 'Full Name', emailLabel: 'Email', whatsappLabel: 'WhatsApp Number', submit: 'Submit via WhatsApp' } : language === 'es' ? { step1: 'Identidad', step2: 'Ubicaci\u00F3n', step3: 'Preferencias', step4: 'Contacto', groupLabel: 'Tipo de Grupo', justMe: 'Solo yo y mi familia', groupSmall: 'Grupo < 5', groupLarge: 'Grupo >= 5', cityLabel: 'Ciudad', minAreaLabel: '\u00C1rea M\u00EDnima', maxAreaLabel: '\u00C1rea M\u00E1xima', totalRoomsLabel: 'Habitaciones', masterBedroomsLabel: 'Principales', individualRoomsLabel: 'Individuales', floorsLabel: 'Pisos', finishingLabel: 'Acabado', economic: 'Econ\u00F3mico', standard: 'Est\u00E1ndar', luxury: 'Lujo', sharedPoolLabel: 'Piscina', yes: 'S\u00ED', no: 'No', fullNameLabel: 'Nombre', emailLabel: 'Email', whatsappLabel: 'WhatsApp', submit: 'Enviar' } : { step1: '\u0627\u0644\u0647\u0648\u064A\u0629', step2: '\u0627\u0644\u0645\u0648\u0642\u0639', step3: '\u0627\u0644\u062A\u0641\u0636\u064A\u0644\u0627\u062A', step4: '\u0627\u0644\u062A\u0648\u0627\u0635\u0644', groupLabel: '\u0646\u0648\u0639 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629', justMe: '\u0623\u0646\u0627 \u0648\u0639\u0627\u0626\u0644\u062A\u064A', groupSmall: '< 5 \u0639\u0627\u0626\u0644\u0627\u062A', groupLarge: '>= 5 \u0639\u0627\u0626\u0644\u0627\u062A', cityLabel: '\u0627\u0644\u0645\u062F\u064A\u0646\u0629', minAreaLabel: '\u0627\u0644\u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0623\u062F\u0646\u0649', maxAreaLabel: '\u0627\u0644\u0645\u0633\u0627\u062D\u0629 \u0627\u0644\u0623\u0642\u0635\u0649', totalRoomsLabel: '\u0625\u062C\u0645\u0627\u0644\u064A', masterBedroomsLabel: '\u0631\u0626\u064A\u0633\u064A\u0629', individualRoomsLabel: '\u0641\u0631\u062F\u064A\u0629', floorsLabel: '\u0627\u0644\u0637\u0648\u0627\u0628\u0642', finishingLabel: '\u0627\u0644\u062A\u0634\u0637\u064A\u0628', economic: '\u0627\u0642\u062A\u0635\u0627\u062F\u064A', standard: '\u0642\u064A\u0627\u0633\u064A', luxury: '\u0641\u0627\u062E\u0631', sharedPoolLabel: '\u0645\u0633\u0628\u062D', yes: '\u0646\u0639\u0645', no: '\u0644\u0627', fullNameLabel: '\u0627\u0644\u0627\u0633\u0645', emailLabel: '\u0627\u0644\u0628\u0631\u064A\u062F', whatsappLabel: '\u0648\u0627\u062A\u0633\u0627\u0628', submit: '\u0625\u0631\u0633\u0627\u0644' };
  const stepLabels = [ftxt.step1, ftxt.step2, ftxt.step3, ftxt.step4];

  const protoLabel = selectedPrototype ? `Casa ${selectedPrototype}` : 'Not selected';

  const handleSubmit = () => {
    const message = `*Choose Neighbors*\n\nPrototype: ${protoLabel}\nGroup: ${formData.groupType}\nCity: ${formData.city}\nArea: ${formData.minArea}-${formData.maxArea}m\u00B2\nRooms: ${formData.totalRooms}\nName: ${formData.fullName}\nEmail: ${formData.email}\nWhatsApp: ${formData.countryCode}${formData.whatsapp}`;
    window.open(`https://wa.me/34673365300?text=${encodeURIComponent(message)}`, '_blank');
    toast({ title: "Success!", description: "Opening WhatsApp..." });
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-20"><div className="max-w-7xl mx-auto px-4"><div className="text-center mb-12"><h1 className="text-4xl font-bold text-gray-900 mb-4">{txt.title}</h1></div><JourneyForm stepLabels={stepLabels}><div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step1}</h2><div><Label>{ftxt.groupLabel}</Label><Select value={formData.groupType} onValueChange={(val) => setFormData({...formData, groupType: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="justme">{ftxt.justMe}</SelectItem><SelectItem value="small">{ftxt.groupSmall}</SelectItem><SelectItem value="large">{ftxt.groupLarge}</SelectItem></SelectContent></Select></div></div><div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step2}</h2><div><Label>{ftxt.cityLabel}</Label><Select value={formData.city} onValueChange={(val) => setFormData({...formData, city: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{spanishCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div><div className="grid grid-cols-2 gap-4"><div><Label>{ftxt.minAreaLabel}</Label><Select value={formData.minArea} onValueChange={(val) => setFormData({...formData, minArea: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{areas.map(a => <SelectItem key={a} value={a.toString()}>{a}m\u00B2</SelectItem>)}</SelectContent></Select></div><div><Label>{ftxt.maxAreaLabel}</Label><Select value={formData.maxArea} onValueChange={(val) => setFormData({...formData, maxArea: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{areas.map(a => <SelectItem key={a} value={a.toString()}>{a}m\u00B2</SelectItem>)}</SelectContent></Select></div></div></div><div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step3}</h2><div className="grid grid-cols-3 gap-4"><div><Label>{ftxt.totalRoomsLabel}</Label><Select value={formData.totalRooms} onValueChange={(val) => setFormData({...formData, totalRooms: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{rooms.map(r => <SelectItem key={r} value={r.toString()}>{r}</SelectItem>)}</SelectContent></Select></div><div><Label>{ftxt.masterBedroomsLabel}</Label><Select value={formData.masterBedrooms} onValueChange={(val) => setFormData({...formData, masterBedrooms: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{rooms.map(r => <SelectItem key={r} value={r.toString()}>{r}</SelectItem>)}</SelectContent></Select></div><div><Label>{ftxt.individualRoomsLabel}</Label><Select value={formData.individualRooms} onValueChange={(val) => setFormData({...formData, individualRooms: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{rooms.map(r => <SelectItem key={r} value={r.toString()}>{r}</SelectItem>)}</SelectContent></Select></div></div><div className="grid grid-cols-2 gap-4"><div><Label>{ftxt.floorsLabel}</Label><Select value={formData.floors} onValueChange={(val) => setFormData({...formData, floors: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem><SelectItem value="2">2</SelectItem><SelectItem value="3">3</SelectItem></SelectContent></Select></div><div><Label>{ftxt.finishingLabel}</Label><Select value={formData.finishing} onValueChange={(val) => setFormData({...formData, finishing: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="economic">{ftxt.economic}</SelectItem><SelectItem value="standard">{ftxt.standard}</SelectItem><SelectItem value="luxury">{ftxt.luxury}</SelectItem></SelectContent></Select></div></div><div><Label>{ftxt.sharedPoolLabel}</Label><RadioGroup value={formData.sharedPool} onValueChange={(val) => setFormData({...formData, sharedPool: val})}><div className="flex space-x-4"><div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="yes" /><Label htmlFor="yes">{ftxt.yes}</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="no" id="no" /><Label htmlFor="no">{ftxt.no}</Label></div></div></RadioGroup></div></div><div className="space-y-6"><h2 className="text-2xl font-bold mb-6">{ftxt.step4}</h2><div><Label>{ftxt.fullNameLabel}</Label><Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} /></div><div><Label>{ftxt.emailLabel}</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div><div><Label>{ftxt.whatsappLabel}</Label><div className="flex space-x-2"><Input className="w-24" value={formData.countryCode} onChange={(e) => setFormData({...formData, countryCode: e.target.value})} /><Input className="flex-1" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} /></div></div><Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-6">{ftxt.submit}</Button></div></JourneyForm></div></div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative py-32 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-6" />
          <p className="text-blue-200 font-semibold text-sm tracking-widest mb-4">{txt.subtitle}</p>
          <h1 className="text-5xl font-bold mb-6">{txt.title}</h1>
          <p className="text-xl max-w-3xl mx-auto">{txt.intro}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{txt.stepsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {txt.steps.map((step, i) => (
              <div key={i} className="flex space-x-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">{i+1}</div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* House Prototypes - Selectable */}
      <PrototypesSection
        selectable
        selectedId={selectedPrototype}
        onSelect={(id) => setSelectedPrototype(id === selectedPrototype ? null : id)}
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{txt.advantagesTitle}</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {txt.advantages.map((adv, i) => (
              <div key={i} className="flex space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <p className="text-gray-700">{adv}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8">{txt.startNow}</h2>
          <Button onClick={() => setShowForm(true)} className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-6 text-lg">
            {txt.startNow}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ChooseNeighborsPage;
