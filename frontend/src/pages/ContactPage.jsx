import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { createLead } from '../services/api';

const ContactPage = () => {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      heroTitle: 'CONTACT US',
      heroHeading: 'Get in Touch',
      heroDesc: 'Ready to start your journey? Contact us today to learn more about our Build-at-Cost methodology.',
      formTitle: 'Send us a message',
      nameLabel: 'Full Name',
      namePlaceholder: 'John Doe',
      emailLabel: 'Email Address',
      emailPlaceholder: 'john@example.com',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+34 673 365 300',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Tell us about your project...',
      submitBtn: 'Send via WhatsApp',
      submitEmail: 'Send via Email',
      sending: 'Sending...',
      contactInfo: 'Contact Information',
      contactDesc: 'Reach out to us through any of these channels. We\'re here to help you build your dream home.',
      address: 'Address',
      phone: 'Phone / WhatsApp',
      email: 'Email',
      workHours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      whatsappDirect: 'Chat on WhatsApp',
      successTitle: 'Message Sent!',
      successDesc: 'Thank you for contacting us. We\'ll get back to you soon.',
      savedToNotion: 'Saved to CRM!'
    },
    es: {
      heroTitle: 'CONTÁCTANOS',
      heroHeading: 'Ponte en Contacto',
      heroDesc: '¿Listo para comenzar tu viaje? Contáctanos hoy para conocer más sobre nuestra metodología de Construir al Costo.',
      formTitle: 'Envíanos un mensaje',
      nameLabel: 'Nombre Completo',
      namePlaceholder: 'Juan García',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'juan@ejemplo.com',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: '+34 673 365 300',
      messageLabel: 'Tu Mensaje',
      messagePlaceholder: 'Cuéntanos sobre tu proyecto...',
      submitBtn: 'Enviar por WhatsApp',
      submitEmail: 'Enviar por Email',
      sending: 'Enviando...',
      contactInfo: 'Información de Contacto',
      contactDesc: 'Contáctanos a través de cualquiera de estos canales. Estamos aquí para ayudarte a construir tu hogar soñado.',
      address: 'Dirección',
      phone: 'Teléfono / WhatsApp',
      email: 'Correo',
      workHours: 'Lun-Vie: 9:00 AM - 6:00 PM',
      whatsappDirect: 'Chatear en WhatsApp',
      successTitle: '¡Mensaje Enviado!',
      successDesc: 'Gracias por contactarnos. Te responderemos pronto.',
      savedToNotion: '¡Guardado en CRM!'
    },
    ar: {
      heroTitle: 'اتصل بنا',
      heroHeading: 'تواصل معنا',
      heroDesc: 'هل أنت مستعد لبدء رحلتك؟ تواصل معنا اليوم لمعرفة المزيد عن منهجية البناء بالتكلفة.',
      formTitle: 'أرسل لنا رسالة',
      nameLabel: 'الاسم الكامل',
      namePlaceholder: 'أحمد محمد',
      emailLabel: 'البريد الإلكتروني',
      emailPlaceholder: 'ahmed@example.com',
      phoneLabel: 'الهاتف / واتساب',
      phonePlaceholder: '+34 673 365 300',
      messageLabel: 'رسالتك',
      messagePlaceholder: 'أخبرنا عن مشروعك...',
      submitBtn: 'إرسال عبر واتساب',
      submitEmail: 'إرسال عبر البريد',
      sending: 'جاري الإرسال...',
      contactInfo: 'معلومات الاتصال',
      contactDesc: 'تواصل معنا عبر أي من هذه القنوات. نحن هنا لمساعدتك في بناء منزل أحلامك.',
      address: 'العنوان',
      phone: 'الهاتف / واتساب',
      email: 'البريد الإلكتروني',
      workHours: 'الإثنين-الجمعة: 9:00 ص - 6:00 م',
      whatsappDirect: 'محادثة واتساب',
      successTitle: 'تم الإرسال!',
      successDesc: 'شكراً لتواصلك معنا. سنرد عليك قريباً.',
      savedToNotion: 'تم الحفظ في CRM!'
    }
  };

  const txt = content[language] || content.en;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Save to Notion first
      await createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        language: language,
        source: 'Website Contact Form'
      });
      
      toast({
        title: txt.savedToNotion,
        description: txt.successDesc,
      });
    } catch (error) {
      console.error('Failed to save to Notion:', error);
      // Continue to WhatsApp even if Notion fails
    }
    
    // 2. Open WhatsApp
    const message = `*New Contact Request*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone}

*Message:*
${formData.message}`;
    
    window.open(`https://wa.me/34673365300?text=${encodeURIComponent(message)}`, '_blank');
    
    toast({
      title: txt.successTitle,
      description: txt.successDesc,
    });
    
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  const handleEmailSubmit = () => {
    const subject = `Contact from ${formData.name} - Construye Tu Hogar`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}`;
    
    window.open(`mailto:puntoblancorealestate@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  const openWhatsAppDirect = () => {
    window.open('https://wa.me/34673365300', '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#d4a650] font-semibold text-sm tracking-widest mb-4">
            {txt.heroTitle}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {txt.heroHeading}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {txt.heroDesc}
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{txt.formTitle}</h2>
              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {txt.nameLabel}
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder={txt.namePlaceholder}
                    data-testid="contact-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {txt.emailLabel}
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder={txt.emailPlaceholder}
                    data-testid="contact-email-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {txt.phoneLabel}
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    placeholder={txt.phonePlaceholder}
                    data-testid="contact-phone-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {txt.messageLabel}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full"
                    placeholder={txt.messagePlaceholder}
                    data-testid="contact-message-input"
                  />
                </div>
                
                {/* WhatsApp Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center space-x-2"
                  data-testid="contact-whatsapp-btn"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{isSubmitting ? txt.sending : txt.submitBtn}</span>
                </Button>

                {/* Email Submit Button */}
                <Button 
                  type="button"
                  onClick={handleEmailSubmit}
                  variant="outline"
                  className="w-full border-2 border-[#d4a650] text-[#d4a650] hover:bg-[#d4a650] hover:text-white font-semibold py-6 text-lg rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  data-testid="contact-email-btn"
                >
                  <Mail className="w-5 h-5" />
                  <span>{txt.submitEmail}</span>
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{txt.contactInfo}</h2>
                <p className="text-gray-600 mb-8">
                  {txt.contactDesc}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-[#d4a650] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{txt.address}</h3>
                    <p className="text-gray-600">Valencia, Spain</p>
                  </div>
                </div>

                <a 
                  href="https://wa.me/34673365300" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start space-x-4 p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{txt.phone}</h3>
                    <p className="text-gray-600">+34 673 365 300</p>
                    <p className="text-green-600 font-medium text-sm mt-1">{txt.whatsappDirect} →</p>
                  </div>
                </a>

                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-[#d4a650] rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{txt.workHours}</h3>
                    <p className="text-gray-600">+34 673 365 300</p>
                  </div>
                </div>

                <a 
                  href="mailto:puntoblancorealestate@gmail.com"
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="w-12 h-12 bg-[#d4a650] rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{txt.email}</h3>
                    <p className="text-gray-600">puntoblancorealestate@gmail.com</p>
                  </div>
                </a>
              </div>

              {/* Direct WhatsApp CTA */}
              <Button 
                onClick={openWhatsAppDirect}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-xl flex items-center justify-center space-x-3"
                data-testid="contact-whatsapp-direct-btn"
              >
                <MessageCircle className="w-6 h-6" />
                <span>{txt.whatsappDirect}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
