import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Privacy Policy',
      subtitle: 'Your privacy is important to us',
      lastUpdated: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Information We Collect',
          content: `We collect information you provide directly to us, such as when you:
• Fill out a contact form
• Request information about our services
• Subscribe to our newsletter
• Communicate with us via email, phone, or WhatsApp

This information may include your name, email address, phone number, and any other information you choose to provide.`
        },
        {
          title: '2. How We Use Your Information',
          content: `We use the information we collect to:
• Respond to your inquiries and provide customer service
• Send you information about our services
• Process and manage your requests
• Improve our website and services
• Comply with legal obligations`
        },
        {
          title: '3. Information Sharing',
          content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
• With your consent
• To comply with legal obligations
• To protect our rights and safety
• With service providers who assist us in operating our business`
        },
        {
          title: '4. Data Security',
          content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.`
        },
        {
          title: '5. Your Rights (GDPR)',
          content: `Under the General Data Protection Regulation (GDPR), you have the right to:
• Access your personal data
• Rectify inaccurate data
• Request deletion of your data
• Object to processing of your data
• Data portability
• Withdraw consent at any time

To exercise these rights, please contact us at info@construyetuhogar.es`
        },
        {
          title: '6. Cookies',
          content: `We use cookies to improve your experience on our website. Cookies are small files stored on your device that help us understand how you use our site. You can control cookies through your browser settings.`
        },
        {
          title: '7. Data Retention',
          content: `We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements.`
        },
        {
          title: '8. Contact Us',
          content: `If you have any questions about this Privacy Policy, please contact us:
• Email: info@construyetuhogar.es
• WhatsApp: +34 673 365 300
• Address: Valencia, Spain`
        }
      ]
    },
    es: {
      title: 'Política de Privacidad',
      subtitle: 'Tu privacidad es importante para nosotros',
      lastUpdated: 'Última actualización: Enero 2025',
      sections: [
        {
          title: '1. Información que Recopilamos',
          content: `Recopilamos la información que nos proporcionas directamente, como cuando:
• Rellenas un formulario de contacto
• Solicitas información sobre nuestros servicios
• Te suscribes a nuestro boletín
• Te comunicas con nosotros por email, teléfono o WhatsApp

Esta información puede incluir tu nombre, dirección de correo electrónico, número de teléfono y cualquier otra información que decidas proporcionar.`
        },
        {
          title: '2. Cómo Usamos Tu Información',
          content: `Usamos la información que recopilamos para:
• Responder a tus consultas y proporcionar servicio al cliente
• Enviarte información sobre nuestros servicios
• Procesar y gestionar tus solicitudes
• Mejorar nuestro sitio web y servicios
• Cumplir con obligaciones legales`
        },
        {
          title: '3. Compartir Información',
          content: `No vendemos, comercializamos ni alquilamos tu información personal a terceros. Solo compartimos tu información en las siguientes circunstancias:
• Con tu consentimiento
• Para cumplir con obligaciones legales
• Para proteger nuestros derechos y seguridad
• Con proveedores de servicios que nos ayudan a operar nuestro negocio`
        },
        {
          title: '4. Seguridad de Datos',
          content: `Implementamos medidas técnicas y organizativas apropiadas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.`
        },
        {
          title: '5. Tus Derechos (RGPD)',
          content: `Bajo el Reglamento General de Protección de Datos (RGPD), tienes derecho a:
• Acceder a tus datos personales
• Rectificar datos inexactos
• Solicitar la eliminación de tus datos
• Oponerte al procesamiento de tus datos
• Portabilidad de datos
• Retirar el consentimiento en cualquier momento

Para ejercer estos derechos, contáctanos en info@construyetuhogar.es`
        },
        {
          title: '6. Cookies',
          content: `Usamos cookies para mejorar tu experiencia en nuestro sitio web. Las cookies son pequeños archivos almacenados en tu dispositivo que nos ayudan a entender cómo usas nuestro sitio. Puedes controlar las cookies a través de la configuración de tu navegador.`
        },
        {
          title: '7. Retención de Datos',
          content: `Conservamos tu información personal durante el tiempo necesario para cumplir los fines para los que fue recopilada, incluyendo satisfacer requisitos legales, contables o de informes.`
        },
        {
          title: '8. Contáctanos',
          content: `Si tienes alguna pregunta sobre esta Política de Privacidad, contáctanos:
• Email: info@construyetuhogar.es
• WhatsApp: +34 673 365 300
• Dirección: Valencia, España`
        }
      ]
    },
    ar: {
      title: 'سياسة الخصوصية',
      subtitle: 'خصوصيتك مهمة بالنسبة لنا',
      lastUpdated: 'آخر تحديث: يناير 2025',
      sections: [
        {
          title: '1. المعلومات التي نجمعها',
          content: `نجمع المعلومات التي تقدمها لنا مباشرة، مثل عندما:
• تملأ نموذج الاتصال
• تطلب معلومات حول خدماتنا
• تشترك في نشرتنا الإخبارية
• تتواصل معنا عبر البريد الإلكتروني أو الهاتف أو واتساب

قد تشمل هذه المعلومات اسمك وعنوان بريدك الإلكتروني ورقم هاتفك وأي معلومات أخرى تختار تقديمها.`
        },
        {
          title: '2. كيف نستخدم معلوماتك',
          content: `نستخدم المعلومات التي نجمعها من أجل:
• الرد على استفساراتك وتقديم خدمة العملاء
• إرسال معلومات حول خدماتنا
• معالجة وإدارة طلباتك
• تحسين موقعنا وخدماتنا
• الامتثال للالتزامات القانونية`
        },
        {
          title: '3. مشاركة المعلومات',
          content: `نحن لا نبيع أو نتاجر أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك معلوماتك فقط في الظروف التالية:
• بموافقتك
• للامتثال للالتزامات القانونية
• لحماية حقوقنا وسلامتنا
• مع مقدمي الخدمات الذين يساعدوننا في تشغيل أعمالنا`
        },
        {
          title: '4. أمان البيانات',
          content: `ننفذ التدابير التقنية والتنظيمية المناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الإفصاح أو التدمير. ومع ذلك، لا توجد طريقة نقل عبر الإنترنت آمنة بنسبة 100%.`
        },
        {
          title: '5. حقوقك (GDPR)',
          content: `بموجب اللائحة العامة لحماية البيانات (GDPR)، لديك الحق في:
• الوصول إلى بياناتك الشخصية
• تصحيح البيانات غير الدقيقة
• طلب حذف بياناتك
• الاعتراض على معالجة بياناتك
• نقل البيانات
• سحب الموافقة في أي وقت

لممارسة هذه الحقوق، يرجى الاتصال بنا على info@construyetuhogar.es`
        },
        {
          title: '6. ملفات تعريف الارتباط',
          content: `نستخدم ملفات تعريف الارتباط لتحسين تجربتك على موقعنا. ملفات تعريف الارتباط هي ملفات صغيرة مخزنة على جهازك تساعدنا على فهم كيفية استخدامك لموقعنا. يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات المتصفح.`
        },
        {
          title: '7. الاحتفاظ بالبيانات',
          content: `نحتفظ بمعلوماتك الشخصية طالما كان ذلك ضرورياً لتحقيق الأغراض التي جُمعت من أجلها، بما في ذلك تلبية المتطلبات القانونية أو المحاسبية أو متطلبات الإبلاغ.`
        },
        {
          title: '8. اتصل بنا',
          content: `إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا:
• البريد الإلكتروني: info@construyetuhogar.es
• واتساب: +34 673 365 300
• العنوان: فالنسيا، إسبانيا`
        }
      ]
    }
  };

  const txt = content[language] || content.en;
  const isRTL = language === 'ar';

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-[#0a1628] via-[#0d1f3a] to-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Shield className="w-16 h-16 text-[#d4a650] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{txt.title}</h1>
          <p className="text-gray-300 text-lg">{txt.subtitle}</p>
          <p className="text-gray-400 text-sm mt-4">{txt.lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            {txt.sections.map((section, index) => (
              <div key={index} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                <h2 className="text-xl font-bold text-[#0a1628] mb-4">{section.title}</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
