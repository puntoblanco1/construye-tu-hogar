# WhatsApp Chatbot Flow - Construye Tu Hogar
## هيكل شجرة المحادثة للـ WhatsApp Chatbot

---

## المستوى 1: رسالة الترحيب واختيار اللغة

### Welcome Message (Trigger: First Contact)

**Arabic:**
```
مرحباً بك في Construye Tu Hogar! 🏠

نحن شركة إدارة مشاريع متخصصة في البناء السكني بإسبانيا.
نساعدك على بناء منزل أحلامك بتوفير يصل إلى 40%!

🌐 الرجاء اختيار لغتك المفضلة:
```

**English:**
```
Welcome to Construye Tu Hogar! 🏠

We are a project management company specializing in residential construction in Spain.
We help you build your dream home with savings up to 40%!

🌐 Please select your preferred language:
```

**Spanish:**
```
¡Bienvenido a Construye Tu Hogar! 🏠

Somos una empresa de gestión de proyectos especializada en construcción residencial en España.
¡Te ayudamos a construir tu hogar soñado con ahorros de hasta el 40%!

🌐 Por favor, selecciona tu idioma preferido:
```

### Language Selection Buttons:
| Button ID | Label AR | Label EN | Label ES |
|-----------|----------|----------|----------|
| `lang_ar` | العربية 🇸🇦 | Arabic 🇸🇦 | Árabe 🇸🇦 |
| `lang_en` | الإنجليزية 🇬🇧 | English 🇬🇧 | Inglés 🇬🇧 |
| `lang_es` | الإسبانية 🇪🇸 | Spanish 🇪🇸 | Español 🇪🇸 |

---

## المستوى 2: القائمة الرئيسية (Main Menu)

### بعد اختيار اللغة:

**Arabic Version:**
```
أهلاً بك! 👋

كيف يمكننا مساعدتك اليوم؟
اختر من القائمة أدناه:
```

**English Version:**
```
Hello! 👋

How can we help you today?
Choose from the menu below:
```

**Spanish Version:**
```
¡Hola! 👋

¿Cómo podemos ayudarte hoy?
Elige del menú a continuación:
```

### Main Menu Buttons:
| Button ID | Arabic | English | Spanish |
|-----------|--------|---------|---------|
| `menu_about` | عن الشركة 🏢 | About Us 🏢 | Sobre Nosotros 🏢 |
| `menu_model` | نموذج اختر جيرانك 🏘️ | Choose Your Neighbors Model 🏘️ | Modelo Elige Tus Vecinos 🏘️ |
| `menu_security` | الأمان والضمانات 🛡️ | Security & Guarantees 🛡️ | Seguridad y Garantías 🛡️ |
| `menu_timeline` | الجدول الزمني ⏱️ | Timeline ⏱️ | Plazos ⏱️ |
| `menu_human` | التحدث مع مستشار 👤 | Talk to Consultant 👤 | Hablar con Consultor 👤 |

---

## المستوى 3: قوائم الأسئلة الفرعية

---

### 3.1 عن الشركة (About Us) - `menu_about`

**Message Header:**
| Arabic | English | Spanish |
|--------|---------|---------|
| عن الشركة - اختر سؤالك: | About Us - Choose your question: | Sobre Nosotros - Elige tu pregunta: |

**Questions List:**
| Q_ID | Arabic | English | Spanish |
|------|--------|---------|---------|
| `about_q1` | هل أحتاج مجموعة جاهزة للبدء؟ | Do I need a ready group to start? | ¿Necesito un grupo listo para empezar? |
| `about_q2` | هل التوفير 40% يعني مواد رخيصة؟ | Does 40% saving mean cheap materials? | ¿El 40% de ahorro significa materiales baratos? |
| `about_q3` | هل المناطق المشتركة آمنة للأطفال؟ | Are shared areas safe for children? | ¿Son seguras las áreas comunes para niños? |
| `about_q4` | كيف تضمنون سلامة الأرض؟ | How do you ensure land safety? | ¿Cómo garantizan la seguridad del terreno? |

---

### 3.2 نموذج اختر جيرانك (Choose Neighbors Model) - `menu_model`

**Message Header:**
| Arabic | English | Spanish |
|--------|---------|---------|
| نموذج اختر جيرانك - اختر سؤالك: | Choose Neighbors Model - Choose your question: | Modelo Elige Vecinos - Elige tu pregunta: |

**Questions List:**
| Q_ID | Arabic | English | Spanish |
|------|--------|---------|---------|
| `model_q1` | ما هو نموذج "اختر جيرانك"؟ | What is "Choose Your Neighbors" model? | ¿Qué es el modelo "Elige tus Vecinos"? |
| `model_q2` | كيف أحصل على خصم 40%؟ | How do I get 40% discount? | ¿Cómo obtengo el 40% de descuento? |
| `model_q3` | ما الهيكل القانوني للتملك؟ | What's the legal ownership structure? | ¿Cuál es la estructura legal de propiedad? |
| `model_q4` | هل يجب أن تكون المنازل متطابقة؟ | Must all houses be identical? | ¿Deben ser idénticas todas las casas? |
| `model_q5` | كيف تصبح الرفاهية بأسعار معقولة؟ | How are luxury amenities affordable? | ¿Cómo son asequibles las amenidades de lujo? |
| `model_q6` | ما ميزة نظام التكلفة بلس؟ | What's the Cost-Plus benefit? | ¿Cuál es el beneficio del modelo Cost-Plus? |
| `model_q7` | لماذا أدفع أتعاب إدارة؟ | Why pay management fees? | ¿Por qué pagar tarifas de gestión? |

---

### 3.3 الأمان والضمانات (Security & Guarantees) - `menu_security`

**Message Header:**
| Arabic | English | Spanish |
|--------|---------|---------|
| الأمان والضمانات - اختر سؤالك: | Security & Guarantees - Choose your question: | Seguridad y Garantías - Elige tu pregunta: |

**Questions List:**
| Q_ID | Arabic | English | Spanish |
|------|--------|---------|---------|
| `sec_q1` | ماذا لو انسحب أحد الأعضاء؟ | What if a member withdraws? | ¿Qué pasa si un miembro se retira? |
| `sec_q2` | ماذا لو تجاوز المقاول الميزانية؟ | What if contractor exceeds budget? | ¿Qué pasa si el contratista excede el presupuesto? |
| `sec_q3` | ماذا لو تعثر عضو في الدفع؟ | What if a member fails to pay? | ¿Qué pasa si un miembro no paga? |
| `sec_q4` | ماذا لو أفلس المقاول؟ | What if contractor goes bankrupt? | ¿Qué pasa si el contratista quiebra? |
| `sec_q5` | ما هو تأمين العشر سنوات؟ | What is the 10-year insurance? | ¿Qué es el seguro decenal? |
| `sec_q6` | ماذا لو اختلفنا على التصميم؟ | What if we disagree on design? | ¿Qué pasa si no estamos de acuerdo en el diseño? |
| `sec_q7` | هل يمكن لعضو بيع منزله لغريب؟ | Can a member sell to a stranger? | ¿Puede un miembro vender a un extraño? |
| `sec_q8` | ماذا لو تغيرت قوانين البلدية؟ | What if municipal laws change? | ¿Qué pasa si cambian las leyes municipales? |

---

### 3.4 الجدول الزمني (Timeline) - `menu_timeline`

**Message Header:**
| Arabic | English | Spanish |
|--------|---------|---------|
| الجدول الزمني والتنفيذ - اختر سؤالك: | Timeline & Execution - Choose your question: | Plazos y Ejecución - Elige tu pregunta: |

**Questions List:**
| Q_ID | Arabic | English | Spanish |
|------|--------|---------|---------|
| `time_q1` | كم يستغرق المشروع من البداية للتسليم؟ | How long from start to handover? | ¿Cuánto tiempo desde el inicio hasta la entrega? |
| `time_q2` | كيف أتابع البناء من خارج إسبانيا؟ | How to monitor from outside Spain? | ¿Cómo monitorear desde fuera de España? |
| `time_q3` | لا أفهم في المقاولات، هل سأُرهَق؟ | I don't understand construction, will I struggle? | No entiendo de construcción, ¿me abrumaré? |
| `time_q4` | هل يمكنني زيارة الموقع أثناء البناء؟ | Can I visit during construction? | ¿Puedo visitar durante la construcción? |

---

### 3.5 التحدث مع مستشار (Talk to Human) - `menu_human`

**Message:**
| Arabic | English | Spanish |
|--------|---------|---------|
| سيتواصل معك أحد مستشارينا قريباً. يمكنك أيضاً الاتصال مباشرة على: +34 673 365 300 | One of our consultants will contact you soon. You can also call directly: +34 673 365 300 | Uno de nuestros consultores te contactará pronto. También puedes llamar directamente: +34 673 365 300 |

---

## المستوى 4: الإجابات الكاملة

### هيكل الإجابة:
```
[Answer Text]

━━━━━━━━━━━━━━━━━━━━

🔙 [Back to Main Menu Button]
📞 [Talk to Consultant Button]
```

---

## قاعدة بيانات الإجابات الكاملة

---

### 📁 عن الشركة (About Us)

#### `about_q1` - هل أحتاج مجموعة جاهزة للبدء؟

**Arabic:**
```
هل يجب أن يكون لديّ مجموعة جاهزة للبدء، أم يمكنكم إيجاد جيران مناسبين لي؟

كلا الخيارين متاح. إذا كان لديك أصدقاؤك أو عائلتك، نبدأ فوراً (النموذج 1). وإذا كنت بمفردك، نسجّلك في "قائمة الانتظار" ونوفّق بينك وبين أشخاص يشاركونك نفس الاهتمامات والميزانية، لأن هدفنا أن "تختار" جيرانك بنفسك وليس أن تفرضهم عليك الظروف.
```

**English:**
```
Do I need to have a pre-ready group to start, or can you find neighbors like me?

Both are possible. If you have your friends or family, we start immediately (Model 1). If you are alone, we add you to our "Waiting List" and match you with people who share your values and budget. Our goal is for you to choose your neighbors, not have them chosen by circumstances.
```

**Spanish:**
```
¿Necesito tener un grupo listo para empezar, o pueden encontrarme vecinos similares?

Ambas opciones son posibles. Si tienes amigos o familia, comenzamos de inmediato (Modelo 1). Si estás solo, te agregamos a nuestra "Lista de Espera" y te emparejamos con personas que comparten tus valores y presupuesto. Nuestro objetivo es que tú elijas a tus vecinos, no que las circunstancias los elijan por ti.
```

---

#### `about_q2` - هل التوفير 40% يعني مواد رخيصة؟

**Arabic:**
```
هل يعني التوفير بنسبة 40% أن المواد ستكون "رخيصة" أو أقل جودة؟

على العكس تماماً! نسبة الـ 40% هي "هامش ربح المطور" الذي أزلناه من المعادلة. هذا يعني أنه بنفس ميزانية شقة عادية، يمكنك بناء "فيلا عصرية" بمواد فاخرة (Premium) لأن أموالك تذهب بالكامل إلى جودة المنزل وليس إلى جيب المطور.
```

**English:**
```
Does the 40% saving mean using "cheaper" or lower-quality materials?

Quite the opposite! The 40% saving is the "Developer's Profit Margin" that we've removed from the equation. This means that with the budget of an ordinary apartment, you can build a "Premium Modern Villa" because every Euro goes into your home's quality, not the developer's pocket.
```

**Spanish:**
```
¿El ahorro del 40% significa usar materiales "baratos" o de menor calidad?

¡Todo lo contrario! El ahorro del 40% es el "Margen de Beneficio del Promotor" que hemos eliminado de la ecuación. Esto significa que con el presupuesto de un apartamento ordinario, puedes construir una "Villa Moderna Premium" porque cada euro va a la calidad de tu hogar, no al bolsillo del promotor.
```

---

#### `about_q3` - هل المناطق المشتركة آمنة للأطفال؟

**Arabic:**
```
نحن عائلات ولدينا أطفال، ما الذي يضمن لنا أن "المنطقة المشتركة" ستكون آمنة؟

الأمان هو أولويتنا. المنطقة المشتركة مصممة وفق معايير عالمية، وبما أن الجيران "مختارون بعناية" ومعروفون بالاسم، فإن أطفالكم يلعبون في بيئة "مغلقة" وآمنة تماماً تحت أعين عائلات تثقون بها.
```

**English:**
```
We are families with children; how do you guarantee the "Shared Amenities" are safe?

Safety is our priority. Shared amenities are designed to international standards. Since neighbors are "carefully chosen" and known by name, your children play in a secure, semi-private environment under the eyes of families you trust.
```

**Spanish:**
```
Somos familias con hijos; ¿cómo garantizan que las "Áreas Comunes" sean seguras?

La seguridad es nuestra prioridad. Las áreas comunes están diseñadas según estándares internacionales. Como los vecinos son "cuidadosamente elegidos" y conocidos por nombre, tus hijos juegan en un ambiente seguro y semi-privado bajo la supervisión de familias en las que confías.
```

---

#### `about_q4` - كيف تضمنون سلامة الأرض؟

**Arabic:**
```
ما الذي يضمن لي أن الأرض التي سنشتريها "سليمة" ولن يُبنى أمامي ما يحجب المنظر؟

نقوم بدراسة "التخطيط العمراني" للمنطقة بالكامل قبل الشراء. نفحص تراخيص البلدية لمعرفة الارتفاعات المسموحة من حولكم، ونضمن لكم أن استثماركم وحلمكم محمي قانونياً وهندسياً إلى الأبد.
```

**English:**
```
How do I know the land is "secure" and that no future construction will block my view?

We conduct a full "Urban Planning" study before acquisition. We check municipal zoning laws to know allowed heights around you, ensuring your view and investment are protected legally and architecturally forever.
```

**Spanish:**
```
¿Cómo sé que el terreno es "seguro" y que ninguna construcción futura bloqueará mi vista?

Realizamos un estudio completo de "Planificación Urbana" antes de la adquisición. Verificamos las leyes de zonificación municipal para conocer las alturas permitidas a tu alrededor, asegurando que tu vista e inversión estén protegidas legal y arquitectónicamente para siempre.
```

---

### 📁 نموذج اختر جيرانك (Choose Neighbors Model)

#### `model_q1` - ما هو نموذج "اختر جيرانك"؟

**Arabic:**
```
ما هو نموذج "اختر جيرانك" (Model 1)؟

هو أول نموذج سكن جماعي في إسبانيا يتيح للأصدقاء أو العائلات بناء مجمعاتهم السكنية الخاصة معاً. بدلاً من السكن بجوار غرباء، أنت من يختار جيرانك لبناء مجتمع قائم على القيم المشتركة.
```

**English:**
```
What is the "Choose Your Neighbors" (Model 1) model?

It is Spain's first collective housing model that allows friends or families to build their private residential clusters together. Instead of living next to strangers, you curate your own community based on shared values.
```

**Spanish:**
```
¿Qué es el modelo "Elige a Tus Vecinos" (Modelo 1)?

Es el primer modelo de vivienda colectiva en España que permite a amigos o familias construir sus conjuntos residenciales privados juntos. En lugar de vivir junto a extraños, tú creas tu propia comunidad basada en valores compartidos.
```

---

#### `model_q2` - كيف أحصل على خصم 40%؟

**Arabic:**
```
كيف أحصل على خصم 40% من سعر السوق؟

في النموذج التقليدي، يربح المطور العقاري حوالي 40% من السعر النهائي. في نموذجنا، نحن نزيل "هامش ربح المطور". أنت تدفع فقط تكلفة الأرض، البناء، والضرائب، بالإضافة إلى أتعاب إدارتنا الثابتة.
```

**English:**
```
How do I achieve a 40% saving compared to market prices?

In the traditional model, developers take around 40% as a profit margin. In our model, we remove that margin. You pay only the direct cost of land, construction, taxes, and our fixed management fee.
```

**Spanish:**
```
¿Cómo logro un ahorro del 40% comparado con los precios del mercado?

En el modelo tradicional, los promotores toman alrededor del 40% como margen de beneficio. En nuestro modelo, eliminamos ese margen. Solo pagas el costo directo del terreno, construcción, impuestos y nuestra tarifa de gestión fija.
```

---

#### `model_q3` - ما الهيكل القانوني للتملك؟

**Arabic:**
```
ما هو الهيكل القانوني لهذا النوع من التملك في إسبانيا؟

نعتمد هيكل "مجموعة الترويج الذاتي" (Self-Promotion Group/Cooperative) المعترف به قانونياً في إسبانيا، حيث تجتمع مجموعة من الملاك لشراء الأرض والبناء بشكل جماعي لتقليل التكاليف.
```

**English:**
```
What is the legal structure for this type of ownership in Spain?

We use the "Self-Promotion Group" (Autopromoción) or Cooperative legal structure, which is fully recognized under Spanish law. Owners unite to purchase land and build collectively to minimize costs.
```

**Spanish:**
```
¿Cuál es la estructura legal para este tipo de propiedad en España?

Utilizamos la estructura legal de "Grupo de Autopromoción" o Cooperativa, que está plenamente reconocida bajo la ley española. Los propietarios se unen para comprar terreno y construir colectivamente para minimizar costos.
```

---

#### `model_q4` - هل يجب أن تكون المنازل متطابقة؟

**Arabic:**
```
هل يجب أن تكون جميع المنازل في المجموعة متطابقة؟

لا، نحن نعتمد واجهة خارجية موحدة لتقليل التكاليف الإنشائية وإعطاء شكل جمالي فخم، ولكن كل عائلة لها الحرية الكاملة في تصميم التقسيم الداخلي والديكورات الخاصة بمنزلها مع المعماري.
```

**English:**
```
Do all houses in the group have to be identical?

No. We maintain a unified exterior for structural cost-savings and a luxury look, but each family has 100% freedom to customize their interior layout and finishes with our architect.
```

**Spanish:**
```
¿Todas las casas del grupo tienen que ser idénticas?

No. Mantenemos un exterior unificado para ahorrar costos estructurales y lograr un aspecto de lujo, pero cada familia tiene 100% de libertad para personalizar su distribución interior y acabados con nuestro arquitecto.
```

---

#### `model_q5` - كيف تصبح الرفاهية بأسعار معقولة؟

**Arabic:**
```
كيف يتم توفير تكاليف الرفاهية (حمام السباحة، الجيم)؟

من خلال المشاركة. الرفاهية التي قد تكون مكلفة جداً للفرد تصبح قياسية عند تقاسم تكلفة إنشائها وصيانتها بين 4 أو 5 عائلات، مما يوفر لكم 30-50% من تكلفة هذه الخدمات.
```

**English:**
```
How are luxury amenities (pool, gym) made affordable?

Through collective sharing. Luxury features that are individually unaffordable become standard when construction and maintenance costs are split among 4-5 families, saving you 30-50%.
```

**Spanish:**
```
¿Cómo se hacen asequibles las amenidades de lujo (piscina, gimnasio)?

A través del compartir colectivo. Las características de lujo que individualmente son inasequibles se vuelven estándar cuando los costos de construcción y mantenimiento se dividen entre 4-5 familias, ahorrándote 30-50%.
```

---

#### `model_q6` - ما ميزة نظام التكلفة بلس؟

**Arabic:**
```
ما هي ميزة نظام "التكلفة بلس" (Cost-Plus Model)؟

الشفافية المطلقة. أنت تدفع للموردين والمقاولين مباشرة بناءً على فواتير حقيقية. لا توجد عمولات خفية. نحن نتقاضى "أتعاب إدارة ثابتة" مقابل دورنا كمديرين للمشروع وممثلين لك أمام المقاولين.
```

**English:**
```
What is the benefit of the "Cost-Plus" model?

Absolute transparency. You pay suppliers and contractors directly based on real invoices. There are no hidden commissions. We charge a fixed management fee for our role as Project Managers representing you.
```

**Spanish:**
```
¿Cuál es el beneficio del modelo "Costo-Plus"?

Transparencia absoluta. Pagas a proveedores y contratistas directamente basándote en facturas reales. No hay comisiones ocultas. Cobramos una tarifa de gestión fija por nuestro rol como Gestores de Proyecto representándote.
```

---

#### `model_q7` - لماذا أدفع أتعاب إدارة؟

**Arabic:**
```
لماذا أدفع لكم "أتعاب إدارة" بدلاً من توظيف مهندس مستقل؟

المهندس المستقل يشرف على البناء فقط. نحن نقوم بـ:
1. تكوين المجموعة
2. البحث القانوني عن الأرض
3. التفاوض للحصول على أسعار "الجملة" للمواد
4. إدارة العلاقة بين الجيران
5. التمثيل القانوني أمام الموثق

نحن "مكتب عائلة" متكامل يحمي مصلحتك المالية والاجتماعية، وليس مجرد مشرف فني.
```

**English:**
```
Why pay you a "Management Fee" instead of hiring an independent engineer?

An independent engineer only supervises construction. We handle:
1. Group formation
2. Legal land vetting
3. Negotiating "Wholesale" prices for materials
4. Managing neighbor relations
5. Legal representation

We act as an all-in-one "Family Office" protecting your financial and social interests, not just technical supervisors.
```

**Spanish:**
```
¿Por qué pagarles una "Tarifa de Gestión" en lugar de contratar un ingeniero independiente?

Un ingeniero independiente solo supervisa la construcción. Nosotros manejamos:
1. Formación del grupo
2. Verificación legal del terreno
3. Negociación de precios "mayoristas" para materiales
4. Gestión de relaciones vecinales
5. Representación legal

Actuamos como una "Oficina Familiar" integral protegiendo tus intereses financieros y sociales.
```

---

### 📁 الأمان والضمانات (Security & Guarantees)

#### `sec_q1` - ماذا لو انسحب أحد الأعضاء؟

**Arabic:**
```
ماذا يحدث لو قرر أحد أفراد المجموعة الانسحاب فجأة أثناء البناء؟

هذا هو دورنا كمديري مشروع. العقد القانوني للمجموعة يتضمن "بند الاستبدال"؛ حيث يتم تقييم حصة العضو المنسحب وعرضها على مستثمر بديل من قائمة الانتظار لدينا. الهيكل القانوني مصمم لضمان استمرارية البناء دون تأثر باقي الأعضاء مالياً.
```

**English:**
```
What happens if one group member decides to withdraw during construction?

This is where our role as Project Managers is crucial. The legal agreement includes a "Substitution Clause" where the withdrawing member's share is appraised and offered to an alternative investor from our waiting list, ensuring the construction continues without financial strain on the remaining members.
```

**Spanish:**
```
¿Qué pasa si un miembro del grupo decide retirarse durante la construcción?

Aquí es donde nuestro rol como Gestores de Proyecto es crucial. El acuerdo legal incluye una "Cláusula de Sustitución" donde la participación del miembro que se retira es tasada y ofrecida a un inversor alternativo de nuestra lista de espera, asegurando que la construcción continúe sin tensión financiera para los miembros restantes.
```

---

#### `sec_q2` - ماذا لو تجاوز المقاول الميزانية؟

**Arabic:**
```
ماذا لو تجاوز المقاول الميزانية المتفق عليها؟

نحن نوقع مع المقاول عقداً بنظام "المبلغ المقطوع" (Lump Sum Contract) لضمان ثبات السعر. بالإضافة إلى ذلك، نقوم بتدقيق كافة الفواتير ومطابقتها بجداول الكميات قبل الدفع، مما يمنع أي تلاعب أو زيادات غير مبررة في التكلفة.
```

**English:**
```
What if the contractor exceeds the agreed budget?

We sign "Lump Sum Contracts" with contractors to lock in the price. Additionally, we audit every invoice against the Bill of Quantities (BOQ) before payment, preventing any unjustified cost escalations.
```

**Spanish:**
```
¿Qué pasa si el contratista excede el presupuesto acordado?

Firmamos "Contratos a Suma Alzada" con contratistas para fijar el precio. Además, auditamos cada factura contra el Presupuesto de Cantidades (BOQ) antes del pago, previniendo cualquier escalada de costos injustificada.
```

---

#### `sec_q3` - ماذا لو تعثر عضو في الدفع؟

**Arabic:**
```
ماذا لو تعثر أحد الأعضاء في دفع أقساط البناء للمقاول؟

لضمان حماية الجميع، يتم إنشاء "صندوق طوارئ" بسيط كجزء من الميزانية. بالإضافة إلى ذلك، الهيكل القانوني يعطي المجموعة الحق في "استرداد الحصة" وإعادة بيعها لمستثمر آخر لضمان عدم توقف العمل. نحن كمديرين للمشروع نراقب التدفقات المالية بدقة لمنع حدوث ذلك من الأساس.
```

**English:**
```
What if one member fails to pay their construction installments to the contractor?

To protect everyone, a small "contingency fund" is created within the budget. Additionally, the legal structure grants the group the right to "recover the share" and resell it to another investor to ensure work never stops. As Project Managers, we strictly monitor cash flows to prevent this.
```

**Spanish:**
```
¿Qué pasa si un miembro no paga sus cuotas de construcción al contratista?

Para proteger a todos, se crea un pequeño "fondo de contingencia" dentro del presupuesto. Además, la estructura legal otorga al grupo el derecho de "recuperar la participación" y revenderla a otro inversor para asegurar que el trabajo nunca se detenga. Como Gestores de Proyecto, monitoreamos estrictamente los flujos de efectivo para prevenir esto.
```

---

#### `sec_q4` - ماذا لو أفلس المقاول؟

**Arabic:**
```
ماذا لو أفلس المقاول أثناء عملية البناء؟

نحن لا ندفع للمقاول "مقدماً". الدفع يتم بنظام "الشهادات الشهرية" عن الأعمال التي تم تنفيذها بالفعل ومعاينتها هندسياً. بالإضافة إلى ذلك، نخصم 5% من كل فاتورة كـ "ضمان حسن تنفيذ" لا تُدفع للمقاول إلا بعد مرور عام من استلامك للمفتاح وتأكدنا من سلامة كل شيء.
```

**English:**
```
What if the contractor goes bankrupt during construction?

We do not pay contractors upfront. Payments are made through "Monthly Certificates" for work already completed and inspected. Additionally, we withhold 5% of every invoice as a "Retention Bond," only paid to the contractor one year after handover, ensuring everything is in perfect condition.
```

**Spanish:**
```
¿Qué pasa si el contratista quiebra durante la construcción?

No pagamos a los contratistas por adelantado. Los pagos se realizan mediante "Certificados Mensuales" por trabajo ya completado e inspeccionado. Además, retenemos el 5% de cada factura como "Bono de Retención", que solo se paga al contratista un año después de la entrega, asegurando que todo esté en perfectas condiciones.
```

---

#### `sec_q5` - ما هو تأمين العشر سنوات؟

**Arabic:**
```
ما هو "تأمين العشر سنوات" (Seguro Decenal) وهل يشملنا في هذا النموذج؟

بالتأكيد. القانون الإسباني يُلزم أي بناء جديد بتأمين عشري يغطي العيوب الإنشائية لمدة 10 سنوات. نحن نضمن استخراج هذا التأمين وتعيين مكتب فني خارجي (OCT) لمراقبة الجودة، مما يضمن لكم منزلاً بمواصفات فاخرة محمياً بالقانون.
```

**English:**
```
What is the "10-year Insurance" (Seguro Decenal) and are we covered in this model?

Absolutely. Spanish law mandates "Seguro Decenal," which covers structural defects for 10 years. We ensure this insurance is secured and appoint an external technical office (OCT) to monitor quality, guaranteeing your "Premium" home is legally protected.
```

**Spanish:**
```
¿Qué es el "Seguro Decenal" y estamos cubiertos en este modelo?

Absolutamente. La ley española exige el "Seguro Decenal", que cubre defectos estructurales durante 10 años. Nos aseguramos de que este seguro esté garantizado y designamos una oficina técnica externa (OCT) para monitorear la calidad, garantizando que tu hogar "Premium" esté legalmente protegido.
```

---

#### `sec_q6` - ماذا لو اختلفنا على التصميم؟

**Arabic:**
```
ماذا لو اختلفنا كمجموعة على لون الواجهة أو شكل المناظر الطبيعية؟

دورنا كمديري مشروع هو "الحوكمة". قبل البدء، نوقع جميعاً على "ميثاق التصميم" الذي يحدده المعماري لضمان التناسق. القرارات المتعلقة بالمناطق المشتركة تؤخذ بالتصويت، بينما قراراتك داخل منزلك هي ملكك وحدك 100%.
```

**English:**
```
What if we, as a group, disagree on the facade color or landscape design?

Our role as Project Managers is "Governance." Before starting, we all sign a "Design Charter" set by the architect to ensure harmony. Decisions for shared areas are made by vote, while decisions inside your home are 100% yours.
```

**Spanish:**
```
¿Qué pasa si, como grupo, no estamos de acuerdo en el color de la fachada o el diseño del paisaje?

Nuestro rol como Gestores de Proyecto es "Gobernanza". Antes de comenzar, todos firmamos una "Carta de Diseño" establecida por el arquitecto para asegurar armonía. Las decisiones para áreas compartidas se toman por votación, mientras que las decisiones dentro de tu hogar son 100% tuyas.
```

---

#### `sec_q7` - هل يمكن لعضو بيع منزله لغريب؟

**Arabic:**
```
هل يمكن لعضو في المجموعة أن يبيع منزله لشخص "غريب" لا نعرفه لاحقاً؟

لضمان روح "اختر جيرانك"، نضع بنداً قانونياً يسمى "حق الشفعة". هذا يعني أنه في حال البيع، الأولوية تكون لأعضاء المجموعة الحاليين لشرائه، أو الموافقة على المشتري الجديد لضمان الحفاظ على نسيج المجتمع الذي بنيناه.
```

**English:**
```
Can a group member sell their house to a "stranger" we don't know later on?

To protect the "Choose Your Neighbors" spirit, we include a "Right of First Refusal" clause. If someone sells, existing members have the priority to buy it or must approve the new buyer to maintain the community fabric we built.
```

**Spanish:**
```
¿Puede un miembro del grupo vender su casa a un "extraño" que no conocemos más adelante?

Para proteger el espíritu de "Elige a Tus Vecinos", incluimos una cláusula de "Derecho de Tanteo". Si alguien vende, los miembros existentes tienen prioridad para comprarlo o deben aprobar al nuevo comprador para mantener el tejido comunitario que construimos.
```

---

#### `sec_q8` - ماذا لو تغيرت قوانين البلدية؟

**Arabic:**
```
ماذا لو تغيرت قوانين البلدية في فالنسيا أثناء فترة الترخيص؟

نحن كمديرين للمشروع نتابع "المخطط العمراني" بدقة. في إسبانيا، بمجرد تقديم طلب الترخيص، تظل القوانين السارية وقت التقديم هي المرجعية (حقوق مكتسبة). نحن نضمن تقديم الأوراق في التوقيت المثالي لحماية تصميمات المجموعة من أي تغييرات مفاجئة.
```

**English:**
```
What if municipal laws in Valencia change during the licensing period?

As Project Managers, we closely monitor the "Plan General" (Urban Plan). In Spain, once a license application is submitted, the laws active at that time remain the reference. We ensure paperwork is filed at the perfect time to protect the group's designs from sudden changes.
```

**Spanish:**
```
¿Qué pasa si las leyes municipales en Valencia cambian durante el período de licencia?

Como Gestores de Proyecto, monitoreamos de cerca el "Plan General" (Plan Urbano). En España, una vez que se presenta una solicitud de licencia, las leyes activas en ese momento permanecen como referencia. Nos aseguramos de que el papeleo se presente en el momento perfecto para proteger los diseños del grupo de cambios repentinos.
```

---

### 📁 الجدول الزمني (Timeline)

#### `time_q1` - كم يستغرق المشروع؟

**Arabic:**
```
كم من الوقت يستغرق المشروع من البداية حتى استلام المفتاح؟

الجدول الزمني المتوقع هو 16 شهراً تقريباً:
• (1-2 شهر) لتكوين المجموعة وحجز الأرض
• (3-5 أشهر) للتراخيص
• (10 أشهر) للبناء والتشطيب النهائي
```

**English:**
```
How long does the project take from start to key handover?

The execution timeline is approximately 16 months:
• 1-2 months for group formation and land reservation
• 3-5 months for permits
• 10 months for construction and final finishing
```

**Spanish:**
```
¿Cuánto tiempo toma el proyecto desde el inicio hasta la entrega de llaves?

El plazo de ejecución es aproximadamente 16 meses:
• 1-2 meses para formación del grupo y reserva del terreno
• 3-5 meses para permisos
• 10 meses para construcción y acabado final
```

---

#### `time_q2` - كيف أتابع البناء من خارج إسبانيا؟

**Arabic:**
```
كيف يمكنني متابعة البناء إذا كنت أقيم خارج إسبانيا؟

نوفر تحديثات أسبوعية بالفيديو وتقارير فنية مفصلة عبر منصتنا. نحن نعمل كمديرين للمشروع ونتولى الرقابة الفنية الكاملة والتعامل مع كافة الأوراق الرسمية بالنيابة عنك.
```

**English:**
```
How can I monitor construction if I live outside Spain?

We provide weekly video updates and detailed technical reports through our platform. As Project Managers, we handle all technical supervision and paperwork on your behalf.
```

**Spanish:**
```
¿Cómo puedo monitorear la construcción si vivo fuera de España?

Proporcionamos actualizaciones semanales en video e informes técnicos detallados a través de nuestra plataforma. Como Gestores de Proyecto, manejamos toda la supervisión técnica y papeleo en tu nombre.
```

---

#### `time_q3` - لا أفهم في المقاولات

**Arabic:**
```
لا أفهم في المقاولات ولا الأوراق الرسمية في إسبانيا، هل سأُرهَق في هذه الإجراءات؟

لا لحظة واحدة. نحن "مديرو مشروعكم". نمثّلكم أمام المقاول والبلدية والموثّق. دوركم هو الاستمتاع باختيار ألوان منزلكم وتصميم مطبخكم، ونحن نتولى كامل العبء الإداري والتقني.
```

**English:**
```
I don't understand construction or Spanish paperwork. Will I be overwhelmed by the process?

Not for a second. We are your "Project Managers." We represent you before contractors, municipalities, and notaries. Your role is to enjoy choosing your home's colors and kitchen layout; we handle the entire administrative and technical headache.
```

**Spanish:**
```
No entiendo de construcción ni papeleo español. ¿Me abrumaré con el proceso?

Ni por un segundo. Somos tus "Gestores de Proyecto". Te representamos ante contratistas, municipios y notarios. Tu rol es disfrutar eligiendo los colores de tu hogar y el diseño de tu cocina; nosotros manejamos todo el dolor de cabeza administrativo y técnico.
```

---

#### `time_q4` - هل يمكنني زيارة الموقع؟

**Arabic:**
```
هل يمكنني زيارة الموقع أثناء البناء؟

بالتأكيد! نحن نشجع على ذلك. بالإضافة إلى التقارير الأسبوعية بالفيديو، يمكنكم تنسيق زيارات ميدانية لرؤية حلمكم وهو يتحول إلى واقع. نحن نؤمن بالشفافية المطلقة في كل لبنة توضع.
```

**English:**
```
Can I visit the site during construction?

Of course! We encourage it. Besides weekly video reports, you can coordinate site visits to see your dream becoming a reality. We believe in absolute transparency in every brick we lay.
```

**Spanish:**
```
¿Puedo visitar el sitio durante la construcción?

¡Por supuesto! Lo alentamos. Además de los informes semanales en video, puedes coordinar visitas al sitio para ver tu sueño convirtiéndose en realidad. Creemos en la transparencia absoluta en cada ladrillo que colocamos.
```

---

## أزرار التنقل (Navigation Buttons)

| Button ID | Arabic | English | Spanish |
|-----------|--------|---------|---------|
| `btn_back_main` | 🔙 العودة للقائمة الرئيسية | 🔙 Back to Main Menu | 🔙 Volver al Menú Principal |
| `btn_talk_human` | 👤 التحدث مع مستشار | 👤 Talk to Consultant | 👤 Hablar con Consultor |
| `btn_start_journey` | 🚀 ابدأ رحلتك الآن | 🚀 Start Your Journey | 🚀 Comienza Tu Viaje |

---

## معلومات الاتصال (Contact Info)

| Field | Value |
|-------|-------|
| WhatsApp | +34 673 365 300 |
| Website | construyetuhogar.es |
| Email | info@construyetuhogar.es |

---

## ملاحظات للمطور

1. **Session Management**: حفظ اللغة المختارة في الجلسة
2. **Fallback**: في حالة عدم فهم الرسالة، إرسال القائمة الرئيسية
3. **Business Hours**: إضافة رسالة "سنرد خلال ساعات العمل" للاستفسارات البشرية
4. **Analytics**: تتبع الأسئلة الأكثر طلباً لتحسين المحتوى

---

*تم إنشاء هذا الملف بواسطة Construye Tu Hogar Development Team*
*آخر تحديث: 2025*
