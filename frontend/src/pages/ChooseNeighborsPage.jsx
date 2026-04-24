import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, CheckCircle, Shield, Award, ArrowRight, ZoomIn, X, Star, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import JourneyForm from '../components/JourneyForm';
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
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const journey = t.journey.card1;
  const [showForm, setShowForm] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [fd, setFd] = useState({
    groupType: '', landOwnership: '', selectedDesign: '', qualityTier: '', budget: '',
    city: '', minArea: '', maxArea: '', totalRooms: '', masterBedrooms: '', individualRooms: '',
    floors: '', finishing: '', sharedPool: '', fullName: '', email: '', whatsapp: '', countryCode: '+34',
  });
  const up = (key, val) => setFd(p => ({...p, [key]: val}));
  const areas = Array.from({length: 50}, (_, i) => (i + 1) * 100);
  const rooms = Array.from({length: 10}, (_, i) => i + 1);
  const reqLabel = language === 'es' ? '(Obligatorio)' : language === 'ar' ? '(مطلوب)' : '(Required)';
  const Req = () => <span className="text-red-500 text-sm font-semibold ms-2">{reqLabel}</span>;

  const labels = language === 'es'
    ? ['Identidad','Terreno','Diseño','Calidad','Presupuesto','Ubicación','Preferencias','Contacto']
    : language === 'ar'
    ? ['الهوية','الأرض','التصميم','الجودة','الميزانية','الموقع','التفضيلات','التواصل']
    : ['Identity','Land','Design','Quality','Budget','Location','Preferences','Contact'];

  const handleSubmit = () => {
    const d = designs.find(x => x.id === fd.selectedDesign);
    const dl = d ? `Casa ${d.rooms} - ${d.area}m2` : '-';
    const msg = `*Choose Neighbors*%0ADesign: ${dl}%0AQuality: ${fd.qualityTier}%0ABudget: ${fd.budget}%0ALand: ${fd.landOwnership}%0AGroup: ${fd.groupType}%0ACity: ${fd.city}%0AArea: ${fd.minArea}-${fd.maxArea}m2%0ARooms: ${fd.totalRooms}%0AFinishing: ${fd.finishing}%0APool: ${fd.sharedPool}%0AName: ${fd.fullName}%0AEmail: ${fd.email}%0AWhatsApp: ${fd.countryCode}${fd.whatsapp}`;
    window.open(`https://wa.me/34673365300?text=${msg}`, '_blank');
    toast({title: 'Success!', description: 'Opening WhatsApp...'});
  };

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
          <Button onClick={() => setShowForm(true)} className="bg-[#d4a650] hover:bg-[#c49640] text-[#0a1628] font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-xl flex items-center mx-auto space-x-2">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Multi-step Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 overflow-y-auto py-10">
          <div className="max-w-5xl mx-auto px-4 relative">
            <button onClick={() => setShowForm(false)} className="absolute -top-2 right-6 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100">
              <X className="w-5 h-5" />
            </button>
            <JourneyForm stepLabels={labels}>
              {/* 1: Group */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{labels[0]}<Req /></h2>
                <Select value={fd.groupType} onValueChange={v => up('groupType', v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="justme">{language === 'es' ? 'Solo yo y mi familia' : language === 'ar' ? 'أنا وعائلتي' : 'Just me and my family'}</SelectItem>
                    <SelectItem value="small">{language === 'es' ? 'Grupo < 5' : language === 'ar' ? '< 5 عائلات' : 'Group < 5 families'}</SelectItem>
                    <SelectItem value="large">{language === 'es' ? 'Grupo >= 5' : language === 'ar' ? '>= 5 عائلات' : 'Group >= 5 families'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* 2: Land */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{language === 'es' ? 'Ya tienes el terreno?' : language === 'ar' ? 'هل لديك أرض؟' : 'Do you have land?'}<Req /></h2>
                <RadioGroup value={fd.landOwnership} onValueChange={v => up('landOwnership', v)} className="space-y-3">
                  {[{v:'owned',en:'Yes, I own it',es:'Si, lo tengo en propiedad',ar:'نعم، أملكها'},{v:'decided',en:'Decided, pending purchase',es:'Tengo decidido, pendiente de comprar',ar:'قررت، بانتظار الشراء'},{v:'searching',en:'Looking for land',es:'Estoy buscando terreno',ar:'أبحث عن أرض'},{v:'no',en:'No',es:'No',ar:'لا'}].map(o => (
                    <div key={o.v} className="flex items-center space-x-3">
                      <RadioGroupItem value={o.v} id={`land-${o.v}`} /><Label htmlFor={`land-${o.v}`} className="cursor-pointer">{o[language] || o.en}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {/* 3: Design */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">{language === 'es' ? 'Elige tu diseño' : language === 'ar' ? 'اختر التصميم' : 'Choose your design'}<Req /></h2>
                  <p className="text-gray-400 text-sm mt-2 flex items-center justify-center gap-1"><ZoomIn className="w-4 h-4" />{language === 'es' ? 'Clic para ampliar' : language === 'ar' ? 'اضغط للتكبير' : 'Click to zoom'}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {designs.map(d => (
                    <div key={d.id} className={`rounded-2xl overflow-hidden border-2 transition-all ${fd.selectedDesign === d.id ? 'border-[#d4a650] shadow-xl ring-2 ring-[#d4a650]/30' : 'border-gray-200 hover:border-gray-400'}`}>
                      <div className="relative bg-white p-3 cursor-zoom-in group" onClick={() => setZoomImage(d.image)}>
                        <img src={d.image} alt={`Casa ${d.rooms}`} className="w-full h-auto rounded-lg" />
                        <div className="absolute inset-3 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all flex items-center justify-center"><ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" /></div>
                      </div>
                      <button className="w-full p-4 bg-white border-t text-left" onClick={() => up('selectedDesign', d.id)}>
                        <div className="flex items-center justify-between">
                          <div><h3 className="text-lg font-bold">{d.rooms} {d.rooms === 1 ? 'bedroom' : 'bedrooms'}</h3><p className="text-sm text-gray-500">{d.area} m2 - {d.baths} bath</p></div>
                          {fd.selectedDesign === d.id && <div className="w-7 h-7 bg-[#d4a650] rounded-full flex items-center justify-center"><CheckCircle className="w-5 h-5 text-white" /></div>}
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* 4: Quality */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">{language === 'es' ? 'Gama de calidad' : language === 'ar' ? 'مستوى الجودة' : 'Quality Range'}<Req /></h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {v:'essential',label:'Essential',desc:language==='es'?'Todo lo que requiere una vivienda de acuerdo a la normativa vigente.':language==='ar'?'يشمل كل ما يتطلبه المنزل وفقا للمعايير.':'Basic compliance with current building regulations.',icon:Shield,bg:'bg-gray-100 text-gray-600'},
                    {v:'premium',label:'Premium',desc:language==='es'?'Supera los estándares de eficiencia, vivienda más confortable.':language==='ar'?'يتجاوز معايير الكفاءة، منزل أكثر راحة.':'Exceeds efficiency standards for a more comfortable home.',icon:Award,bg:'bg-blue-50 text-blue-600'},
                    {v:'excellent',label:'Excellent',desc:language==='es'?'Optimiza confort y eficiencia, reduce demanda energética.':language==='ar'?'يحسن الراحة والكفاءة، يقلل استهلاك الطاقة.':'Optimizes comfort and efficiency, reduces energy demand.',icon:Star,bg:'bg-amber-50 text-amber-600'},
                    {v:'nature',label:'Nature',desc:language==='es'?'Máximo equipamiento, cercano a PassiveHaus, consumo casi cero.':language==='ar'?'أعلى مستوى، قريب من PassiveHaus، استهلاك قريب من الصفر.':'Maximum equipment near PassiveHaus, near-zero consumption.',icon:Leaf,bg:'bg-green-50 text-green-600'},
                  ].map(tier => {
                    const Icon = tier.icon;
                    return (
                      <button key={tier.v} onClick={() => up('qualityTier', tier.v)} className={`relative p-5 rounded-xl border-2 text-left transition-all ${fd.qualityTier === tier.v ? 'border-[#d4a650] shadow-md ring-2 ring-[#d4a650]/30' : 'border-gray-200 hover:border-gray-400 bg-white'}`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${tier.bg}`}><Icon className="w-6 h-6" /></div>
                          <div><h3 className="text-lg font-bold">{tier.label}</h3><p className="text-sm text-gray-500 mt-1">{tier.desc}</p></div>
                        </div>
                        {fd.qualityTier === tier.v && <div className="absolute top-3 right-3 w-6 h-6 bg-[#d4a650] rounded-full flex items-center justify-center"><CheckCircle className="w-4 h-4 text-white" /></div>}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* 5: Budget */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center">{language === 'es' ? 'Tu presupuesto' : language === 'ar' ? 'ميزانيتك' : 'Your Budget'}<Req /></h2>
                <RadioGroup value={fd.budget} onValueChange={v => up('budget', v)} className="space-y-3">
                  {[{v:'over480',l:'+480,000 EUR'},{v:'300to480',l:'300,000 - 480,000 EUR'},{v:'150to300',l:'150,000 - 300,000 EUR'},{v:'under150',l:'-150,000 EUR'}].map(o => (
                    <div key={o.v} className="flex items-center space-x-3 p-4 rounded-lg border hover:border-[#d4a650]/50 transition-colors">
                      <RadioGroupItem value={o.v} id={`budget-${o.v}`} /><Label htmlFor={`budget-${o.v}`} className="cursor-pointer flex-1">{o.l}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {/* 6: Location */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{labels[5]}<Req /></h2>
                <div><Label>{language === 'es' ? 'Ciudad' : language === 'ar' ? 'المدينة' : 'City'}<Req /></Label>
                  <Select value={fd.city} onValueChange={v => up('city', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{spanishCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>{language === 'es' ? 'Area Min' : language === 'ar' ? 'الأدنى' : 'Min Area'}<Req /></Label><Select value={fd.minArea} onValueChange={v => up('minArea', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{areas.map(a => <SelectItem key={a} value={String(a)}>{a}m2</SelectItem>)}</SelectContent></Select></div>
                  <div><Label>{language === 'es' ? 'Area Max' : language === 'ar' ? 'الأقصى' : 'Max Area'}<Req /></Label><Select value={fd.maxArea} onValueChange={v => up('maxArea', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{areas.map(a => <SelectItem key={a} value={String(a)}>{a}m2</SelectItem>)}</SelectContent></Select></div>
                </div>
              </div>
              {/* 7: Preferences */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{labels[6]}<Req /></h2>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label>{language === 'es' ? 'Total' : language === 'ar' ? 'إجمالي' : 'Total Rooms'}<Req /></Label><Select value={fd.totalRooms} onValueChange={v => up('totalRooms', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{rooms.map(r => <SelectItem key={r} value={String(r)}>{r}</SelectItem>)}</SelectContent></Select></div>
                  <div><Label>{language === 'es' ? 'Principales' : language === 'ar' ? 'رئيسية' : 'Master'}<Req /></Label><Select value={fd.masterBedrooms} onValueChange={v => up('masterBedrooms', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{rooms.map(r => <SelectItem key={r} value={String(r)}>{r}</SelectItem>)}</SelectContent></Select></div>
                  <div><Label>{language === 'es' ? 'Individuales' : language === 'ar' ? 'فردية' : 'Individual'}<Req /></Label><Select value={fd.individualRooms} onValueChange={v => up('individualRooms', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{rooms.map(r => <SelectItem key={r} value={String(r)}>{r}</SelectItem>)}</SelectContent></Select></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>{language === 'es' ? 'Pisos' : language === 'ar' ? 'طوابق' : 'Floors'}<Req /></Label><Select value={fd.floors} onValueChange={v => up('floors', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1</SelectItem><SelectItem value="2">2</SelectItem><SelectItem value="3">3</SelectItem></SelectContent></Select></div>
                  <div><Label>{language === 'es' ? 'Acabado' : language === 'ar' ? 'التشطيب' : 'Finishing'}<Req /></Label><Select value={fd.finishing} onValueChange={v => up('finishing', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="economic">{language === 'es' ? 'Economico' : language === 'ar' ? 'اقتصادي' : 'Economic'}</SelectItem><SelectItem value="standard">{language === 'es' ? 'Estandar' : language === 'ar' ? 'قياسي' : 'Standard'}</SelectItem><SelectItem value="luxury">{language === 'es' ? 'Lujo' : language === 'ar' ? 'فاخر' : 'Luxury'}</SelectItem></SelectContent></Select></div>
                </div>
                <div><Label>{language === 'es' ? 'Piscina?' : language === 'ar' ? 'مسبح؟' : 'Pool?'}<Req /></Label>
                  <RadioGroup value={fd.sharedPool} onValueChange={v => up('sharedPool', v)}><div className="flex space-x-4"><div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="pool-y" /><Label htmlFor="pool-y">{language === 'es' ? 'Si' : language === 'ar' ? 'نعم' : 'Yes'}</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="no" id="pool-n" /><Label htmlFor="pool-n">{language === 'es' ? 'No' : language === 'ar' ? 'لا' : 'No'}</Label></div></div></RadioGroup>
                </div>
              </div>
              {/* 8: Contact */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">{labels[7]}<Req /></h2>
                <div><Label>{language === 'es' ? 'Nombre' : language === 'ar' ? 'الاسم' : 'Full Name'}<Req /></Label><Input value={fd.fullName} onChange={e => up('fullName', e.target.value)} /></div>
                <div><Label>Email<Req /></Label><Input type="email" value={fd.email} onChange={e => up('email', e.target.value)} /></div>
                <div><Label>WhatsApp<Req /></Label><div className="flex space-x-2"><Input className="w-24" value={fd.countryCode} onChange={e => up('countryCode', e.target.value)} /><Input className="flex-1" value={fd.whatsapp} onChange={e => up('whatsapp', e.target.value)} /></div></div>
                <Button onClick={handleSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-6">{language === 'es' ? 'Enviar por WhatsApp' : language === 'ar' ? 'إرسال عبر واتساب' : 'Submit via WhatsApp'}</Button>
              </div>
            </JourneyForm>
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {zoomImage && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setZoomImage(null)}>
          <button className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center" onClick={() => setZoomImage(null)}><X className="w-6 h-6 text-white" /></button>
          <img src={zoomImage} alt="Zoom" className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default ChooseNeighborsPage;