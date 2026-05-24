import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText } from 'lucide-react';

const TermsPage = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: 'Terms of Service',
      subtitle: 'Please read these terms carefully',
      lastUpdated: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: `By accessing and using the Construye Tu Hogar website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.`
        },
        {
          title: '2. Description of Services',
          content: `Construye Tu Hogar provides project management services for residential construction in Spain. Our services include:
• Land acquisition consultation
• Construction project management
• Legal and administrative support
• Group formation for collective building projects

We act as project managers and representatives, not as property developers or real estate agents.`
        },
        {
          title: '3. User Responsibilities',
          content: `When using our services, you agree to:
• Provide accurate and complete information
• Maintain the confidentiality of any account credentials
• Notify us of any unauthorized use of your account
• Comply with all applicable laws and regulations
• Not use our services for any illegal or unauthorized purpose`
        },
        {
          title: '4. Project Terms',
          content: `For construction projects:
• All project timelines are estimates and may vary
• Costs are based on actual expenses plus our management fee
• Changes to project scope may affect timelines and costs
• Group projects require agreement from all participating members
• We do not guarantee specific outcomes or property values`
        },
        {
          title: '5. Payment Terms',
          content: `• All fees and payment schedules will be clearly outlined in individual contracts
• Payments are made directly to suppliers and contractors
• Our management fee is fixed and disclosed upfront
• Refund policies are specified in individual service agreements
• Late payments may incur additional charges as specified in contracts`
        },
        {
          title: '6. Intellectual Property',
          content: `All content on this website, including text, graphics, logos, and images, is the property of Construye Tu Hogar and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.`
        },
        {
          title: '7. Limitation of Liability',
          content: `To the maximum extent permitted by law:
• We are not liable for any indirect, incidental, or consequential damages
• Our total liability is limited to the fees paid for our services
• We do not guarantee uninterrupted or error-free service
• We are not responsible for third-party actions or services`
        },
        {
          title: '8. Dispute Resolution',
          content: `Any disputes arising from these terms or our services shall be:
• First attempted to be resolved through good-faith negotiation
• Subject to mediation in Valencia, Spain
• Governed by Spanish law
• Subject to the exclusive jurisdiction of Spanish courts`
        },
        {
          title: '9. Modifications',
          content: `We reserve the right to modify these Terms of Service at any time. Changes will be effective upon posting to this website. Your continued use of our services after changes constitutes acceptance of the modified terms.`
        },
        {
          title: '10. Contact Information',
          content: `For questions about these Terms of Service:
• Email: info@construyetuhogar.es
• WhatsApp: +34 673 365 300
• Address: Valencia, Spain`
        }
      ]
    },
    es: {
      title: 'Términos de Servicio',
      subtitle: 'Por favor, lee estos términos cuidadosamente',
      lastUpdated: 'Última actualización: Enero 2025',
      sections: [
        {
          title: '1. Aceptación de Términos',
          content: `Al acceder y usar el sitio web y servicios de Construye Tu Hogar, aceptas y acuerdas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con estos términos, por favor no uses nuestros servicios.`
        },
        {
          title: '2. Descripción de Servicios',
          content: `Construye Tu Hogar proporciona servicios de gestión de proyectos para construcción residencial en España. Nuestros servicios incluyen:
• Consultoría en adquisición de terrenos
• Gestión de proyectos de construcción
• Soporte legal y administrativo
• Formación de grupos para proyectos de construcción colectiva

Actuamos como gestores de proyectos y representantes, no como promotores inmobiliarios o agentes de bienes raíces.`
        },
        {
          title: '3. Responsabilidades del Usuario',
          content: `Al usar nuestros servicios, aceptas:
• Proporcionar información precisa y completa
• Mantener la confidencialidad de cualquier credencial de cuenta
• Notificarnos de cualquier uso no autorizado de tu cuenta
• Cumplir con todas las leyes y regulaciones aplicables
• No usar nuestros servicios para ningún propósito ilegal o no autorizado`
        },
        {
          title: '4. Términos del Proyecto',
          content: `Para proyectos de construcción:
• Todos los plazos del proyecto son estimaciones y pueden variar
• Los costos se basan en gastos reales más nuestra tarifa de gestión
• Los cambios en el alcance del proyecto pueden afectar plazos y costos
• Los proyectos grupales requieren acuerdo de todos los miembros participantes
• No garantizamos resultados específicos o valores de propiedad`
        },
        {
          title: '5. Términos de Pago',
          content: `• Todas las tarifas y calendarios de pago se detallarán claramente en contratos individuales
• Los pagos se realizan directamente a proveedores y contratistas
• Nuestra tarifa de gestión es fija y se divulga por adelantado
• Las políticas de reembolso se especifican en acuerdos de servicio individuales
• Los pagos atrasados pueden incurrir en cargos adicionales según se especifica en los contratos`
        },
        {
          title: '6. Propiedad Intelectual',
          content: `Todo el contenido de este sitio web, incluyendo texto, gráficos, logotipos e imágenes, es propiedad de Construye Tu Hogar y está protegido por leyes de propiedad intelectual. No puedes reproducir, distribuir o crear obras derivadas sin nuestro permiso escrito.`
        },
        {
          title: '7. Limitación de Responsabilidad',
          content: `En la máxima medida permitida por la ley:
• No somos responsables de daños indirectos, incidentales o consecuentes
• Nuestra responsabilidad total está limitada a las tarifas pagadas por nuestros servicios
• No garantizamos un servicio ininterrumpido o libre de errores
• No somos responsables de acciones o servicios de terceros`
        },
        {
          title: '8. Resolución de Disputas',
          content: `Cualquier disputa que surja de estos términos o nuestros servicios será:
• Primero intentada resolver mediante negociación de buena fe
• Sujeta a mediación en Valencia, España
• Regida por la ley española
• Sujeta a la jurisdicción exclusiva de los tribunales españoles`
        },
        {
          title: '9. Modificaciones',
          content: `Nos reservamos el derecho de modificar estos Términos de Servicio en cualquier momento. Los cambios serán efectivos una vez publicados en este sitio web. Tu uso continuado de nuestros servicios después de los cambios constituye aceptación de los términos modificados.`
        },
        {
          title: '10. Información de Contacto',
          content: `Para preguntas sobre estos Términos de Servicio:
• Email: info@construyetuhogar.es
• WhatsApp: +34 673 365 300
• Dirección: Valencia, España`
        }
      ]
    },
    ar: {
      title: 'شروط الخدمة',
      subtitle: 'يرجى قراءة هذه الشروط بعناية',
      lastUpdated: 'آخر تحديث: يناير 2025',
      sections: [
        {
          title: '1. قبول الشروط',
          content: `من خلال الوصول إلى موقع Construye Tu Hogar واستخدام خدماته، فإنك تقبل وتوافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.`
        },
        {
          title: '2. وصف الخدمات',
          content: `توفر Construye Tu Hogar خدمات إدارة المشاريع للبناء السكني في إسبانيا. تشمل خدماتنا:
• استشارات اقتناء الأراضي
• إدارة مشاريع البناء
• الدعم القانوني والإداري
• تشكيل مجموعات لمشاريع البناء الجماعية

نحن نعمل كمديري مشاريع وممثلين، وليس كمطورين عقاريين أو وكلاء عقارات.`
        },
        {
          title: '3. مسؤوليات المستخدم',
          content: `عند استخدام خدماتنا، فإنك توافق على:
• تقديم معلومات دقيقة وكاملة
• الحفاظ على سرية أي بيانات اعتماد للحساب
• إخطارنا بأي استخدام غير مصرح به لحسابك
• الامتثال لجميع القوانين واللوائح المعمول بها
• عدم استخدام خدماتنا لأي غرض غير قانوني أو غير مصرح به`
        },
        {
          title: '4. شروط المشروع',
          content: `لمشاريع البناء:
• جميع الجداول الزمنية للمشروع هي تقديرات وقد تختلف
• التكاليف تعتمد على النفقات الفعلية بالإضافة إلى رسوم إدارتنا
• قد تؤثر التغييرات في نطاق المشروع على الجداول الزمنية والتكاليف
• تتطلب المشاريع الجماعية موافقة جميع الأعضاء المشاركين
• لا نضمن نتائج محددة أو قيم العقارات`
        },
        {
          title: '5. شروط الدفع',
          content: `• سيتم تحديد جميع الرسوم وجداول الدفع بوضوح في العقود الفردية
• تتم المدفوعات مباشرة إلى الموردين والمقاولين
• رسوم إدارتنا ثابتة ويتم الإفصاح عنها مقدماً
• يتم تحديد سياسات الاسترداد في اتفاقيات الخدمة الفردية
• قد تترتب على المدفوعات المتأخرة رسوم إضافية كما هو محدد في العقود`
        },
        {
          title: '6. الملكية الفكرية',
          content: `جميع المحتويات على هذا الموقع، بما في ذلك النصوص والرسومات والشعارات والصور، هي ملك لـ Construye Tu Hogar ومحمية بموجب قوانين الملكية الفكرية. لا يجوز لك إعادة إنتاج أو توزيع أو إنشاء أعمال مشتقة دون إذن كتابي منا.`
        },
        {
          title: '7. تحديد المسؤولية',
          content: `إلى أقصى حد يسمح به القانون:
• لسنا مسؤولين عن أي أضرار غير مباشرة أو عرضية أو تبعية
• مسؤوليتنا الإجمالية محدودة بالرسوم المدفوعة مقابل خدماتنا
• لا نضمن خدمة متواصلة أو خالية من الأخطاء
• لسنا مسؤولين عن إجراءات أو خدمات الأطراف الثالثة`
        },
        {
          title: '8. حل النزاعات',
          content: `أي نزاعات ناشئة عن هذه الشروط أو خدماتنا تخضع لـ:
• محاولة الحل أولاً من خلال التفاوض بحسن نية
• الوساطة في فالنسيا، إسبانيا
• القانون الإسباني
• الاختصاص الحصري للمحاكم الإسبانية`
        },
        {
          title: '9. التعديلات',
          content: `نحتفظ بالحق في تعديل شروط الخدمة هذه في أي وقت. ستكون التغييرات سارية المفعول عند نشرها على هذا الموقع. استمرارك في استخدام خدماتنا بعد التغييرات يشكل قبولاً للشروط المعدلة.`
        },
        {
          title: '10. معلومات الاتصال',
          content: `للاستفسارات حول شروط الخدمة هذه:
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
          <FileText className="w-16 h-16 text-[#d4a650] mx-auto mb-6" />
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

export default TermsPage;
