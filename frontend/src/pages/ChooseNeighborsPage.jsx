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

const designs = [
  { id: 'casa1', image: '/designs/casa-1-75m2.png', rooms: 1, area: 75, floors: 1, baths: 1 },
  { id: 'casa2', image: '/designs/casa-2-100m2.png', rooms: 2, area: 100, floors: 1, baths: 2 },
  { id: 'casa3', image: '/designs/casa-3-128m2.png', rooms: 3, area: 128, floors: 1, baths: 2 },
];

const ChooseNeighborsPage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [selectedPrototype, setSelectedPrototype] = useState(null);
  const [formData, setFormData] = useState({
    groupType: '', landOwnership: '', selectedDesign: '',
    city: '', minArea: '', maxArea: '',
    totalRooms: '', masterBedrooms: '', individualRooms: '',
    floors: '', finishing: '', sharedPool: '',
    fullName: '', email: '', whatsapp: '', countryCode: '+34',
  });

  const content = {
    en: {
      title: 'Choose Your Neighbors', subtitle: 'Build Your Own Community',
      intro: "Why live next to strangers? We give you the power to design your life with those you love. Partner with your friends or family to build a private residential complex that offers privacy, security, and savings.",
      stepsTitle: 'Execution Steps',
      steps: ['Select and legally verify the appropriate land.', 'Design residential units based on each group member\'s preferences.', 'Begin construction with full engineering and legal supervision.', 'Final delivery and issuance of individual property deeds.'],
      advantagesTitle: 'Model Advantages',
      advantages: ['Save up to 30% of market property value.', 'Full control over interior design and shared facilities (pool, garden, etc.).', 'Live in a community of your choice ensuring psychological comfort.'],
      startNow: 'Start Now',
    },
    es: {
      title: 'Elige a tus Vecinos', subtitle: 'Construye Tu Propia Comunidad',
      intro: '¿Por qué vivir junto a extraños? Te damos el poder de diseñar tu vida con quienes amas. Asóciate con tus amigos o familia para construir un complejo residencial privado que ofrece privacidad, seguridad y ahorros.',
      stepsTitle: 'Pasos de Ejecución',
      steps: ['Seleccionar y verificar legalmente el terreno apropiado.', 'Diseñar unidades residenciales según las preferencias de cada miembro del grupo.', 'Comenzar la construcción con supervisión completa de ingeniería y legal.', 'Entrega final y emisión de escrituras de propiedad individuales.'],
      advantagesTitle: 'Ventajas del Modelo',
      advantages: ['Ahorro de hasta 30% del valor de mercado de la propiedad.', 'Control total sobre el diseño interior y las instalaciones compartidas (piscina, jardín, etc.).', 'Vivir en una comunidad de tu elección que garantiza comodidad psicológica.'],
      startNow: 'Comienza Ahora',
    },
    ar: {
      title: 'اختر جيرانك', subtitle: 'ابنِ مجتمعك الخاص',
      intro: 'لماذا تسكن بجوار الغرباء؟ نحن نمنحك القوة لتصميم حياتك مع من تحب. اشترك مع أصدقائك أو عائلتك لبناء مجمع سكني خاص يوفر لك الخصوصية والأمان والتوفير.',
      stepsTitle: 'خطوات التنفيذ',
      steps: ['اختيار الأرض المناسبة وتدقيقها قانونياً.', 'تصميم الوحدات السكنية بناءً على رغبة كل فرد في المجموعة.', 'البدء في أعمال الإنشاءات بإشراف هندسي وقانوني كامل.', 'التسليم النهائي وإصدار صكوك الملكية المستقلة.'],
      advantagesTitle: 'مميزات النموذج',
      advantages: ['توفير يصل إلى 30% من قيمة العقار السوقية.', 'تحكم كامل في التصميم الداخلي والمرافق المشتركة (مسبح، حديقة، إلخ).', 'العيش في مجتمع من اختيارك يضمن لك الراحة النفسية.'],
      startNow: 'ابدأ الآن',
    },
  };

  const txt = content[language] || content.en;
  const areas = Array.from({ length: 50 }, (_, i) => (i + 1) * 100);
  const rooms = Array.from({ length: 10 }, (_, i) => i + 1);

  const ftxt = language === 'en' ? {
    step1: 'Group Identity', step2: 'Land', step3: 'Design', step4: 'Location & Space', step5: 'Preferences', step6: 'Contact',
    groupLabel: 'Select Group Type', justMe: 'Just me and my family', groupSmall: 'Group of families < 5', groupLarge: 'Group of families >= 5',
    landQuestion: 'Do you already have land for your house?', landRequired: '(Required)',
    landYes: 'Yes, I own it', landDecided: 'I have decided on the land, pending purchase', landSearching: "I'm looking for land", landNo: 'No',
    designQuestion: 'Choose your preferred design', designRequired: '(Required)',
    designRooms: 'bedroom', designRoomsPlural: 'bedrooms', designArea: 'Area', designFloor: 'floor', designBaths: 'bathroom', designBathsPlural: 'bathrooms',
    cityLabel: 'Select City', minAreaLabel: 'Minimum Area (m²)', maxAreaLabel: 'Maximum Area (m²)',
    totalRoomsLabel: 'Total Rooms', masterBedroomsLabel: 'Master Bedrooms', individualRoomsLabel: 'Individual Rooms',
    floorsLabel: 'Number of Floors', finishingLabel: 'Finishing Type', economic: 'Economic', standard: 'Standard', luxury: 'Luxury',
    sharedPoolLabel: 'Shared Pool?', yes: 'Yes', no: 'No',
    fullNameLabel: 'Full Name', emailLabel: 'Email', whatsappLabel: 'WhatsApp Number', submit: 'Submit via WhatsApp',
  } : language === 'es' ? {
    step1: 'Identidad', step2: 'Terreno', step3: 'Diseño', step4: 'Ubicación', step5: 'Preferencias', step6: 'Contacto',
    groupLabel: 'Tipo de Grupo', justMe: 'Solo yo y mi familia', groupSmall: 'Grupo < 5', groupLarge: 'Grupo >= 5',
    landQuestion: '¿Ya tienes el terreno para tu casa?', landRequired: '(Obligatorio)',
    landYes: 'Sí, lo tengo en propiedad', landDecided: 'Tengo decidido el terreno pendiente de comprar', landSearching: 'Estoy buscando terreno', landNo: 'No',
    designQuestion: '¿Cuál diseño prefieres?', designRequired: '(Obligatorio)',
    designRooms: 'habitación', designRoomsPlural: 'habitaciones', designArea: 'Área', designFloor: 'planta', designBaths: 'baño', designBathsPlural: 'baños',
    cityLabel: 'Ciudad', minAreaLabel: 'Área Mínima', maxAreaLabel: 'Área Máxima',
    totalRoomsLabel: 'Habitaciones', masterBedroomsLabel: 'Principales', individualRoomsLabel: 'Individuales',
    floorsLabel: 'Pisos', finishingLabel: 'Acabado', economic: 'Económico', standard: 'Estándar', luxury: 'Lujo',
    sharedPoolLabel: 'Piscina', yes: 'Sí', no: 'No',
    fullNameLabel: 'Nombre', emailLabel: 'Email', whatsappLabel: 'WhatsApp', submit: 'Enviar',
  } : {
    step1: 'الهوية', step2: 'الأرض', step3: 'التصميم', step4: 'الموقع', step5: 'التفضيلات', step6: 'التواصل',
    groupLabel: 'نوع المجموعة', justMe: 'أنا وعائلتي', groupSmall: '< 5 عائلات', groupLarge: '>= 5 عائلات',
    landQuestion: 'هل لديك أرض لبناء منزلك؟', landRequired: '(مطلوب)',
    landYes: 'نعم، أملكها', landDecided: 'قررت الأرض وبانتظار الشراء', landSearching: 'أبحث عن أرض', landNo: 'لا',
    designQuestion: 'اختر التصميم المفضل لك', designRequired: '(مطلوب)',
    designRooms: 'غرفة نوم', designRoomsPlural: 'غرف نوم', designArea: 'المساحة', designFloor: 'طابق', designBaths: 'حمام', designBathsPlural: 'حمامات',
    cityLabel: 'المدينة', minAreaLabel: 'المساحة الأدنى', maxAreaLabel: 'المساحة الأقصى',
    totalRoomsLabel: 'إجمالي', masterBedroomsLabel: 'رئيسية', individualRoomsLabel: 'فردية',
    floorsLabel: 'الطوابق', finishingLabel: 'التشطيب', economic: 'اقتصادي', standard: 'قياسي', luxury: 'فاخر',
    sharedPoolLabel: 'مسبح', yes: 'نعم', no: 'لا',
    fullNameLabel: 'الاسم', emailLabel: 'البريد', whatsappLabel: 'واتساب', submit: 'إرسال',
  };

  const stepLabels = [ftxt.step1, ftxt.step2, ftxt.step3, ftxt.step4, ftxt.step5, ftxt.step6];
  const protoLabel = selectedPrototype ? `Casa ${selectedPrototype}` : 'Not selected';
  const designLabel = formData.selectedDesign ? designs.find(d => d.id === formData.selectedDesign) : null;

  const handleSubmit = () => {
    const dl = designLabel ? `Casa ${designLabel.rooms} Hab - ${designLabel.area}m²` : 'Not selected';
    const message = `*Choose Neighbors*\n\nPrototype: ${protoLabel}\nDesign: ${dl}\nLand: ${formData.landOwnership}\nGroup: ${formData.groupType}\nCity: ${formData.city}\nArea: ${formData.minArea}-${formData.maxArea}m²\nRooms: ${formData.totalRooms}\nName: ${formData.fullName}\nEmail: ${formData.email}\nWhatsApp: ${formData.countryCode}${formData.whatsapp}`;
    window.open(`https://wa.me/34673365300?text=${encodeURIComponent(message)}`, '_blank');
    toast({ title: "Success!", description: "Opening WhatsApp..." });
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{txt.title}</h1>
          </div>
          <JourneyForm stepLabels={stepLabels}>
            {/* Step 1: Group Identity */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{ftxt.step1}</h2>
              <div>
                <Label>{ftxt.groupLabel}</Label>
                <Select value={formData.groupType} onValueChange={(val) => setFormData({...formData, groupType: val})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="justme">{ftxt.justMe}</SelectItem>
                    <SelectItem value="small">{ftxt.groupSmall}</SelectItem>
                    <SelectItem value="large">{ftxt.groupLarge}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Step 2: Land Ownership */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-2">{ftxt.landQuestion}</h2>
              <span className="text-red-500 text-sm font-semibold">{ftxt.landRequired}</span>
              <RadioGroup
                value={formData.landOwnership}
                onValueChange={(val) => setFormData({...formData, landOwnership: val})}
                className="space-y-4 mt-6"
              >
                {[
                  { value: 'owned', label: ftxt.landYes },
                  { value: 'decided', label: ftxt.landDecided },
                  { value: 'searching', label: ftxt.landSearching },
                  { value: 'no', label: ftxt.landNo },
                ].map(opt => (
                  <div key={opt.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={opt.value} id={`land-${opt.value}`} data-testid={`land-option-${opt.value}`} />
                    <Label htmlFor={`land-${opt.value}`} className="text-base cursor-pointer">{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Step 3: Design Selection */}
            <div className="space-y-6">
              <div className="text-center mb-2">
                <h2 className="text-2xl font-bold">{ftxt.designQuestion}</h2>
                <span className="text-red-500 text-sm font-semibold">{ftxt.designRequired}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {designs.map(d => {
                  const isSelected = formData.selectedDesign === d.id;
                  const roomText = d.rooms === 1 ? ftxt.designRooms : ftxt.designRoomsPlural;
                  const bathText = d.baths === 1 ? ftxt.designBaths : ftxt.designBathsPlural;
                  return (
                    <button
                      key={d.id}
                      data-testid={`design-option-${d.id}`}
                      onClick={() => setFormData({...formData, selectedDesign: d.id})}
                      className={`group rounded-2xl overflow-hidden border-3 transition-all duration-300 text-left ${
                        isSelected
                          ? 'border-[#d4a650] shadow-xl ring-2 ring-[#d4a650]/30 scale-[1.02]'
                          : 'border-gray-200 hover:border-gray-400 hover:shadow-lg'
                      }`}
                    >
                      <div className="relative bg-white p-3">
                        <img
                          src={d.image}
                          alt={`Casa ${d.rooms} - ${d.area}m²`}
                          className="w-full h-auto rounded-lg"
                        />
                        {isSelected && (
                          <div className="absolute top-5 right-5 w-7 h-7 bg-[#d4a650] rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-white border-t">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {d.rooms} {roomText}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {ftxt.designArea}: {d.area} m² · {d.floors} {ftxt.designFloor} · {d.baths} {bathText}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Location & Space */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{ftxt.step4}</h2>
              <div>
                <Label>{ftxt.cityLabel}</Label>
                <Select value={formData.city} onValueChange={(val) => setFormData({...formData, city: val})}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{spanishCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{ftxt.minAreaLabel}</Label>
                  <Select value={formData.minArea} onValueChange={(val) => setFormData({...formData, minArea: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{areas.map(a => <SelectItem key={a} value={a.toString()}>{a}m²</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{ftxt.maxAreaLabel}</Label>
                  <Select value={formData.maxArea} onValueChange={(val) => setFormData({...formData, maxArea: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{areas.map(a => <SelectItem key={a} value={a.toString()}>{a}m²</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Step 5: Preferences */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{ftxt.step5}</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>{ftxt.totalRoomsLabel}</Label>
                  <Select value={formData.totalRooms} onValueChange={(val) => setFormData({...formData, totalRooms: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{rooms.map(r => <SelectItem key={r} value={r.toString()}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{ftxt.masterBedroomsLabel}</Label>
                  <Select value={formData.masterBedrooms} onValueChange={(val) => setFormData({...formData, masterBedrooms: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{rooms.map(r => <SelectItem key={r} value={r.toString()}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{ftxt.individualRoomsLabel}</Label>
                  <Select value={formData.individualRooms} onValueChange={(val) => setFormData({...formData, individualRooms: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{rooms.map(r => <SelectItem key={r} value={r.toString()}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{ftxt.floorsLabel}</Label>
                  <Select value={formData.floors} onValueChange={(val) => setFormData({...formData, floors: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{ftxt.finishingLabel}</Label>
                  <Select value={formData.finishing} onValueChange={(val) => setFormData({...formData, finishing: val})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economic">{ftxt.economic}</SelectItem>
                      <SelectItem value="standard">{ftxt.standard}</SelectItem>
                      <SelectItem value="luxury">{ftxt.luxury}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>{ftxt.sharedPoolLabel}</Label>
                <RadioGroup value={formData.sharedPool} onValueChange={(val) => setFormData({...formData, sharedPool: val})}>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="pool-yes" /><Label htmlFor="pool-yes">{ftxt.yes}</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="pool-no" /><Label htmlFor="pool-no">{ftxt.no}</Label></div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Step 6: Contact */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">{ftxt.step6}</h2>
              <div><Label>{ftxt.fullNameLabel}</Label><Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} /></div>
              <div><Label>{ftxt.emailLabel}</Label><Input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} /></div>
              <div>
                <Label>{ftxt.whatsappLabel}</Label>
                <div className="flex space-x-2">
                  <Input className="w-24" value={formData.countryCode} onChange={(e) => setFormData({...formData, countryCode: e.target.value})} />
                  <Input className="flex-1" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} />
                </div>
              </div>
              <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-6">{ftxt.submit}</Button>
            </div>
          </JourneyForm>
        </div>
      </div>
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
