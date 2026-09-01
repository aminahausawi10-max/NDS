// ==========================================================================
// NIGERIA DIASPORA SERVICES (NDS) - CORE APPLICATION FRONTEND ENGINE
// ==========================================================================

const API_BASE = window.location.origin;

// State management
let currentUser = JSON.parse(localStorage.getItem('nds_user') || 'null');
let authToken = localStorage.getItem('nds_token') || '';
let selectedFiles = [];
let currentLang = localStorage.getItem('nds_lang') || 'en';

// Dictionary mapping for localization (EN, HA, AR, FR)
const dictionary = {
  en: {
    'nav-home': 'Home', 'nav-about': 'About Us', 'nav-services': 'Services', 'nav-how': 'How It Works',
    'nav-track': 'Track Application', 'nav-faq': 'FAQ', 'nav-contact': 'Contact Us', 'nav-login': 'Sign In',
    'nav-portal': 'My Portal', 'hero-title': 'NIGERIA DIASPORA SERVICES',
    'hero-subtitle': 'Documentation Processing Assistant & Diaspora Support Services',
    'hero-desc': 'Professional, secure, and reliable support for Nigerians in the Diaspora with applications, authentication, verification, and essential government documentation back home.',
    'btn-apply-service': 'Apply For Service', 'btn-contact-us': 'Contact Us', 'btn-apply-short': 'Apply',
    'stat-pass': 'Passport Support', 'stat-pass-desc': 'Passport renewals & fresh application processing guidance.',
    'stat-nin': 'NIN & BVN Support', 'stat-nin-desc': 'Verification, corrections, and registry support in Nigeria.',
    'stat-cac': 'CAC Registrations', 'stat-cac-desc': 'Register businesses, entities, and corporate document filing.',
    'stat-auth': 'MOFA Authentication',
    'about-title': 'About Nigeria Diaspora Services (NDS)',
    'about-intro': 'Nigeria Diaspora Services (NDS) is an independent documentation assistant committed to bridging the gap for Nigerians living abroad.',
    'about-desc1': 'Navigating bureaucratic government documentation processes from another country can be stress-inducing. Our professional support network in Nigeria coordinates validation, verification, fresh submissions, and legalization on your behalf with utmost security and transparency.',
    'vision-title': 'Our Vision', 'vision-text': 'To become the most trusted documentation assistance and diaspora support platform connecting Nigerians worldwide to essential services.',
    'mission-title': 'Our Mission', 'mission-text': 'To provide reliable, transparent, and professional documentation processing assistance and support to Nigerians in the Diaspora.',
    'why-choose-title': 'Why Choose Us?',
    'wc-1': 'Professional Verification Assistance', 'wc-2': 'Diaspora-Focused & User Friendly',
    'wc-3': 'Application Tracking & Updates', 'wc-4': 'Secure Cloud Storage for Sensitive Documents',
    'wc-5': 'Dedicated Customer Portal & Messenger Support',
    'metric-accuracy': 'Accuracy & Legitimacy', 'metric-satisfaction': 'Customer Satisfaction', 'metric-security': 'Document Security',
    'services-title': 'Our Professional Services', 'services-subtitle': 'Explore our processing assistance for essential documents and certificates',
    's1-title': '1. Nigerian Passport Services', 's1-1': 'Passport Renewal Processing Assistance', 's1-2': 'Fresh Passport Application Assistance', 's1-3': 'Passport Documentation Support',
    's2-title': '2. National Identification Number (NIN)', 's2-1': 'NIN Processing Assistance', 's2-2': 'NIN Verification Support', 's2-3': 'NIN Correction Guidance',
    's3-title': '3. Bank Verification Number (BVN)', 's3-1': 'BVN Processing Assistance', 's3-2': 'BVN Update/Verification Support',
    's4-title': '4. Police Clearance Certificate', 's4-1': 'Application Assistance', 's4-2': 'Documentation Support', 's4-3': 'Processing Guidance',
    's5-title': '5. NDLEA Certificate', 's5-1': 'Application Assistance', 's5-2': 'Processing Support', 's5-3': 'Documentation Guidance',
    's6-title': '6. CAC Corporate Services', 's6-1': 'Business Name Registration Assistance', 's6-2': 'Company Registration Assistance', 's6-3': 'CAC Corporate Documentation Support',
    's7-title': '7. MOFA Document Authentication', 's7-1': 'Ministry of Foreign Affairs Assistance', 's7-2': 'Document Authentication & Verification', 's7-3': 'Verification & Processing Guidance',
    's8-title': '8. Foreign Embassy Authentication', 's8-1': 'Embassy Authentication Assistance', 's8-2': 'Document Submission Support', 's8-3': 'Processing Guidance',
    's9-title': '9. Embassy & Consulate Support', 's9-1': 'Nigerian Embassy Coordination Support', 's9-2': 'Consular Documentation Assistance', 's9-3': 'Appointment & Service Guidance',
    's10-title': '10. Court-Issued Documents', 's10-1': 'Affidavits & Court Certification Support', 's10-2': 'Application & Verification Support', 's10-3': 'Legal Documentation Guidance',
    's11-title': '11. Business Contract Support', 's11-1': 'Business Contract Preparation Assist', 's11-2': 'Agreement Drafting Support', 's11-3': 'Local Business Documentation Setup',
    's12-title': '12. Labour & Agency Services', 's12-1': 'Labour Documentation Assistance', 's12-2': 'Employment Registry Support', 's12-3': 'Guidance & Compliance Checks',
    'how-title': 'How NDS Simplifies the Process', 'how-subtitle': 'Secure, fast, and structured in 4 simple stages',
    'step1-title': 'Submit Request', 'step1-desc': 'Register on our portal, choose your service, and fill in details with initial document scans.',
    'step2-title': 'Document Review', 'step2-desc': 'Our processing managers review inputs to check if parameters match requirement checklists.',
    'step3-title': 'Processing Support', 'step3-desc': 'We coordinate locally in Nigeria with ministries, registries, or consulates to complete processing.',
    'step4-title': 'Completion & Dispatch', 'step4-desc': 'Track status milestones on your tracker and securely download your authentic certifications.',
    'legal-disclaimer-title': 'IMPORTANT LEGAL NOTICE & DISCLAIMER',
    'legal-disclaimer-text': 'Nigeria Diaspora Services (NDS) is an independent documentation assistance and administrative support provider. We are not a government agency, embassy, consulate, law-enforcement body, court, CAC, or NDLEA affiliate.',
    'apply-head': 'Start Your Application', 'apply-sub': 'Submit your details and support files securely. Ensure you are signed in first.',
    'lbl-service': 'Service Required *', 'lbl-contact': 'Preferred Contact Method *', 'lbl-desc': 'Additional Details / Specific Request Info',
    'lbl-files': 'Upload Supporting Identification / Scans *', 'upload-click': 'Click to browse', 'btn-submit-app': 'Submit Application',
    'success-headline': 'Submission Received!', 'success-body': 'Your request is queued and our admin team will review it shortly. Save your reference number to track live milestones.',
    'btn-track-go': 'Track Application', 'btn-portal-go': 'Go to Portal',
    'track-title': 'Track Application Progress', 'track-desc': 'Enter your unique reference number to inspect live status milestones',
    'btn-track-search': 'Search', 'st-rec': 'Received', 'st-rev': 'Under Review', 'st-doc': 'Docs Needed', 'st-proc': 'Processing', 'st-comp': 'Completed',
    'chat-history-title': 'Admin Communication logs', 'track-error-text': 'No record matches that application reference. Please crosscheck characters.',
    'faq-title': 'Frequently Asked Questions', 'faq-subtitle': 'Clear explanations of our services, logistics, and capabilities',
    'faq-q1': 'Who can use Nigeria Diaspora Services?', 'faq-a1': 'Any Nigerian citizen or business owner residing outside Nigeria (Diaspora) requiring professional support processing legal or bureaucratic paperwork in Nigeria.',
    'faq-q2': 'Can I apply entirely from outside Nigeria?', 'faq-a2': 'Yes! The primary objective is to allow applicants abroad to submit scans of details, track progress, and get authentication documents processed remotely without leaving their country of residence.',
    'faq-q3': 'How do I track my request?', 'faq-a3': 'Once submitted, you\'ll get a reference (e.g. NDS-2026-102948) which you can query anytime under the \'Track Application\' tab to see visual stepper checkpoints.',
    'faq-q4': 'Are you a government agency?', 'faq-a4': 'No. NDS is a privately managed consulting assistance network. We charge handling/processing fees to support compiling, dispatching, and following up on files at ministries and consulates.',
    'contact-head': 'Connect With Us', 'contact-sub': 'Have urgent enquiries or requests? Get in touch with our helpdesk instantly.',
    'c-head-office': 'Head Office', 'c-branch-office': 'Branch Office', 'c-send-msg': 'Send Us an Inquiry'
  },
  ha: { // Hausa Translations
    'nav-home': 'Gida', 'nav-about': 'Game da Mu', 'nav-services': 'Ayyuka', 'nav-how': 'Yadda Yake Aiki',
    'nav-track': 'Bibiyi Aikace-aikace', 'nav-faq': 'Tambayoyi', 'nav-contact': 'Tuntuɓe Mu', 'nav-login': 'Shiga Ciki',
    'nav-portal': 'Dashboard Dina', 'hero-title': 'AYYUKAN DIASPORA NIGERIA',
    'hero-subtitle': 'Mataimakin Gudanar da Takardu & Ayyukan Tallafawa Diaspora',
    'hero-desc': 'Taimako na ƙwararru, amintacce, kuma tabbatacce ga ' +
                 'Yan Najeriya da ke zaune a ƙasashen waje don takardu da izini a gida.',
    'btn-apply-service': 'Nemi Aiki Yanzu', 'btn-contact-us': 'Tuntuɓe Mu', 'btn-apply-short': 'Nemi',
    'stat-pass': 'Taimakon Fasfo', 'stat-pass-desc': 'Sabuwar fasfo ko sabunta fasfo cikin sauƙi.',
    'stat-nin': 'Taimakon NIN & BVN', 'stat-nin-desc': 'Tantancewa, gyare-gyare, da tallafi a Najeriya.',
    'stat-cac': 'Rijistar CAC', 'stat-cac-desc': 'Yi rajistar kamfani da takardun kasuwanci.',
    'stat-auth': 'Halaccin MOFA',
    'about-title': 'Game da Nigeria Diaspora Services (NDS)',
    'about-intro': 'Nigeria Diaspora Services (NDS) wata hukuma ce mai zaman kanta da ke taimaka wa \'Yan Najeriya da ke ƙasashen waje.',
    'about-desc1': 'Gudanar da takardun gwamnati daga wata ƙasa na iya zama da wuya. Abokan aikinmu a Najeriya suna gudanar da duk wani izini da tantancewa a gare ku cikin aminci.',
    'vision-title': 'Manufarmu', 'vision-text': 'Zama dandalin da ya fi kowane amintacce wajen tallafawa \'yan Najeriya a duniya.',
    'mission-title': 'Aikinmu', 'mission-text': 'Bayar da amintaccen taimako na ƙwararru ga \'Yan Najeriya da ke zaune a ƙasashen waje.',
    'why-choose-title': 'Me ya sa za ku zaɓe mu?',
    'wc-1': 'Taimakon Tantance Takardu na Ƙwararru', 'wc-2': 'An tsara shi musamman don Diaspora',
    'wc-3': 'Bibiyar Aikace-aikace da Sabuntawa', 'wc-4': 'Amintaccen Ajiya don Takardu',
    'wc-5': 'Kula da Abokan ciniki da Tattaunawa ta Gaba-gaba',
    'metric-accuracy': 'Inganci & Halacci', 'metric-satisfaction': 'Gamsar da Abokan ciniki', 'metric-security': 'Tsaron Takardu',
    'services-title': 'Ayyukanmu na Ƙwararru', 'services-subtitle': 'Bincika ayyukanmu na taimakawa wajen sarrafa takardu da takaddun shaida',
    's1-title': '1. Ayyukan Fasfo na Najeriya', 's1-1': 'Taimakon Sabunta Fasfo', 's1-2': 'Neman Sabon Fasfo', 's1-3': 'Taimakon Takardun Fasfo',
    's2-title': '2. Lambar Shaidar Kasa (NIN)', 's2-1': 'Taimakon Sarrafa NIN', 's2-2': 'Taimakon Tantance NIN', 's2-3': 'Jagorar Gyaran NIN',
    's3-title': '3. Lambar Tabbatar da Banki (BVN)', 's3-1': 'Taimakon Sarrafa BVN', 's3-2': 'Taimakon Sabunta BVN/Tantancewa',
    's4-title': '4. Takardar Shaidar Hukumar Yan Sanda', 's4-1': 'Taimakon Neman Takarda', 's4-2': 'Taimakon Takardu', 's4-3': 'Jagoran Gudanarwa',
    's5-title': '5. Takardar Shaidar NDLEA', 's5-1': 'Taimakon Nema', 's5-2': 'Tallafin Gudanarwa', 's5-3': 'Jagorar Takardu',
    's6-title': '6. Ayyukan Kasuwanci na CAC', 's6-1': 'Taimakon Rijistar Sunan Kasuwanci', 's6-2': 'Taimakon Rijistar Kamfani', 's6-3': 'Taimakon Takardun CAC',
    's7-title': '7. Tabbatar da Takaddun MOFA', 's7-1': 'Taimakon Ma\'aikatar Harkokin Waje', 's7-2': 'Tantance Takardu & Halatta', 's7-3': 'Jagorar Tantancewa',
    's8-title': '8. Tabbatar da Jakadancin Waje', 's8-1': 'Taimakon Tabbatar da Ofishin Jakadanci', 's8-2': 'Taimakon Mika Takardu', 's8-3': 'Jagorar Gudanarwa',
    's9-title': '9. Tallafin Ofishin Jakadanci & Ofishin Jakadanci', 's9-1': 'Tallafin Gudanar da Ofishin Jakadancin Najeriya', 's9-2': 'Taimakon Takardun Ofishin Jakadanci', 's9-3': 'Jagorar Alƙawari & Sabis',
    's10-title': '10. Takardun Kotu', 's10-1': 'Taimakon Takardun Shaida na Kotu', 's10-2': 'Taimakon Nema & Tantancewa', 's10-3': 'Jagorar Takardun Shari\'a',
    's11-title': '11. Taimakon Yarjejeniyar Kasuwanci', 's11-1': 'Taimakon Shirya Yarjejeniyar Kasuwanci', 's11-2': 'Taimakon Tsara Yarjejeniya', 's11-3': 'Taimakon Takardun Kasuwanci na Ciki',
    's12-title': '12. Ma\'aikata & Ayyukan Hukumar', 's12-1': 'Taimakon Takardun Kwadago', 's12-2': 'Tallafin Rijistar Ma\'aikata', 's12-3': 'Jagora & Duba Biyayya',
    'how-title': 'Yadda NDS ke Sauƙaƙe Aikin', 'how-subtitle': 'Amintacce, mai sauri, kuma a cikin matakai 4 masu sauƙi',
    'step1-title': 'Mika Bukata', 'step1-desc': 'Yi rajista a dandalinmu, zaɓi sabis ɗin ku, sannan ku cika bayanai tare da hoton takardunku.',
    'step2-title': 'Binciken Takardu', 'step2-desc': 'Manajojinmu suna duba bayanan don tabbatar da sun cika ƙa\'idojin da ake buƙata.',
    'step3-title': 'Tallafin Gudanarwa', 'step3-desc': 'Muna haɗa gwiwa a Najeriya tare da ma\'aikatu ko ofisoshin jakadanci don kammala aikin.',
    'step4-title': 'Kammalawa & Bayarwa', 'step4-desc': 'Bibiyi matakin aikin ku a kan tracker ɗinku kuma ku sauke ingantattun takaddun ku.',
    'legal-disclaimer-title': 'MUHIMMIN SANARWA NA SHARI\'A & DISCLAIMER',
    'legal-disclaimer-text': 'Nigeria Diaspora Services (NDS) cibiyar tallafawa takardu ce mai zaman kanta. Mu ba hukumar gwamnatin Najeriya ba ce, ko ofishin jakadanci, ko hukumar tsaro, ko CAC, ko NDLEA.',
    'apply-head': 'Fara Aikace-aikacen Ku', 'apply-sub': 'Mika bayanan ku da takardunku cikin aminci. Tabbatar kun shiga kafin nan.',
    'lbl-service': 'Sabis ɗin da ake buƙata *', 'lbl-contact': 'Hanyar Tuntuɓa da Aka Fi So *', 'lbl-desc': 'Karin Bayani / Takamaiman Bayani',
    'lbl-files': 'Saka Takaddun Shaida na Tallafi *', 'upload-click': 'Danna don zaɓar faili', 'btn-submit-app': 'Mika Aikace-aikace',
    'success-headline': 'An Karɓi Aikace-aikacen Ku!', 'success-body': 'An saka buƙatarku a layin aiki, kuma ma\'aikatanmu za su duba ta nan ba da jimawa ba. Ajiye lambar aikin ku don bibiyarta.',
    'btn-track-go': 'Bibiyi Aikace-aikace', 'btn-portal-go': 'Je zuwa Portal',
    'track-title': 'Bibiyi Matakin Aiki', 'track-desc': 'Saka lambar aikin ku don ganin matakin da yake kai',
    'btn-track-search': 'Nema', 'st-rec': 'An Karɓa', 'st-rev': 'Ana Dubawa', 'st-doc': 'Ana Neman Takardu', 'st-proc': 'Ana Sarrafawa', 'st-comp': 'An Kammala',
    'chat-history-title': 'Tattaunawa da Admin', 'track-error-text': 'Babu wani aiki mai wannan lambar. Da fatan za a sake duba lambobin ku.',
    'faq-title': 'Tambayoyin da Aka Fi Yi', 'faq-subtitle': 'Bayyanannun bayanai game da ayyukanmu da yadda muke aiki',
    'faq-q1': 'Wane ne zai iya amfani da Nigeria Diaspora Services?', 'faq-a1': 'Kowane ɗan ƙasar Najeriya ko mai kasuwanci da ke zaune a ƙasashen waje wanda ke buƙatar taimakon ƙwararru wajen sarrafa takaddun shari\'a ko na gwamnati a Najeriya.',
    'faq-q2': 'Zan iya neman aiki gaba ɗaya daga ƙasashen waje?', 'faq-a2': 'E mana! Babban burinmu shi ne ba wa masu neman aiki a ƙasashen waje damar aika takardunsu, bibiyar ci gaba, da samun takardunsu ba tare da sun bar ƙasar da suke zaune ba.',
    'faq-q3': 'Yaya zan bibiyi buƙata ta?', 'faq-a3': 'Bayan kun mika, za ku sami lamba (misali NDS-2026-102948) wacce za ku iya bincika kowane lokaci a shafin \'Bibiyi Aikace-aikace\'.',
    'faq-q4': 'Kuna wakiltar ma\'aikatar gwamnati ne?', 'faq-a4': 'A\'a. NDS cibiya ce mai zaman kanta. Muna karɓar kuɗin gudanarwa don taimakawa wajen aikawa da kuma bibiyar takardu a ma\'aikatu daban-daban.',
    'contact-head': 'Tuntuɓe Mu', 'contact-sub': 'Kuna da gaggawar tambaya? Tuntuɓi teburin taimakonmu nan da nan.',
    'c-head-office': 'Babban Ofishin', 'c-branch-office': 'Ofishin Reshe', 'c-send-msg': 'Aiko da Tambaya'
  },
  ar: { // Arabic Translations
    'nav-home': 'الرئيسية', 'nav-about': 'من نحن', 'nav-services': 'الخدمات', 'nav-how': 'كيف نعمل',
    'nav-track': 'تتبع الطلبات', 'nav-faq': 'الأسئلة الشائعة', 'nav-contact': 'اتصل بنا', 'nav-login': 'تسجيل الدخول',
    'nav-portal': 'بوابتي', 'hero-title': 'خدمات المغتربين النيجيريين',
    'hero-subtitle': 'مساعد معالجة المستندات وخدمات دعم المغتربين',
    'hero-desc': 'دعم احترافي وآمن وموثوق للمغتربين النيجيريين في الخارج بخصوص معاملاتهم ومستنداتهم في نيجيريا.',
    'btn-apply-service': 'تقدم بطلب الآن', 'btn-contact-us': 'اتصل بنا', 'btn-apply-short': 'تقديم',
    'stat-pass': 'دعم جواز السفر', 'stat-pass-desc': 'تجديد الجوازات وإرشادات استخراج الجوازات الجديدة.',
    'stat-nin': 'دعم NIN و BVN', 'stat-nin-desc': 'التحقق والتصحيحات والدعم في السجل الوطني.',
    'stat-cac': 'تسجيل الشركات CAC', 'stat-cac-desc': 'تسجيل الشركات والكيانات التجارية وتوثيق الملفات.',
    'stat-auth': 'تصديقات وزارة الخارجية',
    'about-title': 'عن خدمات المغتربين النيجيريين (NDS)',
    'about-intro': 'خدمات المغتربين النيجيريين (NDS) هي جهة مساعدة مستقلة وملتزمة برأب الصدع للمغتربين خارج نيجيريا.',
    'about-desc1': 'إجراء المعاملات الحكومية من دولة أخرى قد يكون مرهقاً. شبكتنا الاحترافية في نيجيريا تتابع وتصدق المستندات نيابة عنكم بأعلى درجات الأمان.',
    'vision-title': 'رؤيتنا', 'vision-text': 'أن نصبح المنصة الأكثر موثوقية لدعم وتسهيل معاملات المغتربين النيجيريين حول العالم.',
    'mission-title': 'رسالتنا', 'mission-text': 'تقديم دعم احترافي وشفاف وموثوق لتخليص المعاملات للمغتربين في الخارج.',
    'why-choose-title': 'لماذا تختارنا؟',
    'wc-1': 'مساعدة احترافية للتحقق من المستندات', 'wc-2': 'منصة مخصصة ومبسطة للمغتربين',
    'wc-3': 'تتبع الطلبات والتحديثات المباشرة', 'wc-4': 'تخزين سحابي آمن للملفات الحساسة',
    'wc-5': 'بوابة عملاء مخصصة للتواصل المباشر',
    'metric-accuracy': 'الدقة والمشروعية', 'metric-satisfaction': 'رضا العملاء', 'metric-security': 'أمن المستندات',
    'services-title': 'خدماتنا الاحترافية', 'services-subtitle': 'اكتشف خدماتنا لمساعدتك في استخراج وتصديق كافة المستندات',
    's1-title': '1. خدمات جواز السفر النيجيري', 's1-1': 'المساعدة في تجديد جواز السفر', 's1-2': 'المساعدة في استخراج جواز سفر جديد', 's1-3': 'دعم وتوثيق مستندات جواز السفر',
    's2-title': '2. رقم الهوية الوطنية (NIN)', 's2-1': 'المساعدة في استخراج وتعديل NIN', 's2-2': 'دعم التحقق من الهوية الوطنية NIN', 's2-3': 'إرشادات تصحيح بيانات NIN',
    's3-title': '3. رقم التحقق البنكي (BVN)', 's3-1': 'المساعدة في معالجة طلبات BVN', 's3-2': 'تحديث والتحقق من رقم BVN',
    's4-title': '4. شهادة خلو السوابق (الفيش والتشبيه)', 's4-1': 'المساعدة في التقديم', 's4-2': 'مراجعة وتصديق المستندات المطلوبة', 's4-3': 'إرشادات المعالجة والخطوات',
    's5-title': '5. شهادة مكافحة المخدرات NDLEA', 's5-1': 'دعم تقديم المعاملات', 's5-2': 'متابعة الطلبات وتخليصها', 's5-3': 'إرشادات إعداد الملفات والمستندات',
    's6-title': '6. خدمات السجل التجاري والشركات CAC', 's6-1': 'حجز وتسجيل الأسماء التجارية', 's6-2': 'تأسيس وتسجيل الشركات الجديدة', 's6-3': 'متابعة وتحديث سجلات الشركات لدى CAC',
    's7-title': '7. تصديق مستندات وزارة الخارجية', 's7-1': 'مراجعة وتخليص معاملات وزارة الخارجية', 's7-2': 'التصديق والتقنين القانوني للمستندات', 's7-3': 'إرشادات التحقق والخطوات المعمول بها',
    's8-title': '8. تصديقات السفارات الأجنبية', 's8-1': 'المساعدة في توثيق المستندات لدى السفارات', 's8-2': 'تقديم الملفات ومتابعتها لدى القنصليات', 's8-3': 'إرشادات التخليص والرسوم',
    's9-title': '9. دعم السفارات والقنصليات النيجيرية', 's9-1': 'تنسيق الطلبات مع السفارة النيجيرية بالخارج', 's9-2': 'المساعدة في المعاملات القنصلية المتنوعة', 's9-3': 'إرشادات حجز المواعيد والمعاملات',
    's10-title': '10. المستندات والوثائق القضائية', 's10-1': 'استخراج التوكيلات وتصديق المحاكم النيجيرية', 's10-2': 'دعم تقديم المعاملات والتوثيقات القضائية', 's10-3': 'إرشادات قانونية وإعداد المستندات',
    's11-title': '11. مساعدة العقود التجارية والمشاريع', 's11-1': 'المساعدة في صياغة ومراجعة العقود التجارية', 's11-2': 'إعداد وثائق الاتفاقيات والشراكات المحلية', 's11-3': 'ترتيب وتوثيق عقود الشركات في نيجيريا',
    's12-title': '12. خدمات العمل والتوظيف', 's12-1': 'المساعدة في إعداد مستندات التوظيف والعمل', 's12-2': 'التسجيل في هيئات العمل والضمان', 's12-3': 'إرشادات الامتثال والتحقق من الشروط',
    'how-title': 'كيف تسهل NDS معاملتك؟', 'how-subtitle': 'آمنة وسريعة ومنظمة في 4 مراحل بسيطة',
    'step1-title': 'تقديم الطلب', 'step1-desc': 'سجل في بوابتنا، اختر الخدمة المطلوبة، واملأ تفاصيل الطلب مع إرفاق المستندات.',
    'step2-title': 'مراجعة المستندات', 'step2-desc': 'يقوم مديرو المعاملات لدينا بمراجعة مستنداتك للتحقق من مطابقتها للشروط.',
    'step3-title': 'الدعم والمعالجة', 'step3-desc': 'ننسق محلياً في نيجيريا مع الوزارات والهيئات والسفارات المعنية لإنهاء الإجراءات.',
    'step4-title': 'الإنجاز والاستلام', 'step4-desc': 'تتبع مراحل تقدم طلبك على لوحة التحكم وحمل مستنداتك المعتمدة والجاهزة بأمان.',
    'legal-disclaimer-title': 'إشعار وتنويه قانوني هام',
    'legal-disclaimer-text': 'خدمات المغتربين النيجيريين (NDS) هي منصة دعم إداري وتخليص معاملات مستقلة. نحن لسنا جهة حكومية أو سفارة أو هيئة شرطية أو تابعة لـ CAC أو NDLEA.',
    'apply-head': 'ابدأ تقديم طلبك', 'apply-sub': 'أرسل تفاصيل طلبك وملفاتك بأمان. يرجى التأكد من تسجيل الدخول أولاً.',
    'lbl-service': 'الخدمة المطلوبة *', 'lbl-contact': 'وسيلة الاتصال المفضلة *', 'lbl-desc': 'تفاصيل إضافية / معلومات خاصة بالطلب',
    'lbl-files': 'ارفق المستندات والمسوحات الضوئية المطلوبة *', 'upload-click': 'انقر للتصفح واختيار الملف', 'btn-submit-app': 'إرسال الطلب الآن',
    'success-headline': 'تم استلام طلبك بنجاح!', 'success-body': 'تم إدراج طلبك في نظام المعالجة وسيقوم فريقنا بمراجعته قريباً. احفظ رقم طلبك لتتبع حالته.',
    'btn-track-go': 'تتبع حالة الطلب', 'btn-portal-go': 'الانتقال إلى البوابة',
    'track-title': 'تتبع حالة الطلب', 'track-desc': 'أدخل رقم طلبك الفريد لمشاهدة مراحل المعالجة والتقدم مباشرة',
    'btn-track-search': 'بحث', 'st-rec': 'تم الاستلام', 'st-rev': 'تحت المراجعة', 'st-doc': 'مستندات مطلوبة', 'st-proc': 'قيد المعالجة', 'st-comp': 'مكتمل',
    'chat-history-title': 'سجل مراسلات الدعم الفني', 'track-error-text': 'لم نجد أي طلب مطابق للرقم المدخل. يرجى إعادة التحقق.',
    'faq-title': 'الأسئلة الشائعة', 'faq-subtitle': 'إجابات وتوضيحات مفصلة حول خدماتنا وآليات العمل',
    'faq-q1': 'من يمكنه الاستفادة من خدمات NDS؟', 'faq-a1': 'أي مواطن نيجيري أو صاحب عمل يقيم خارج نيجيريا (المغتربون) ويحتاج إلى دعم احترافي لإنجاز معاملاته الرسمية في نيجيريا.',
    'faq-q2': 'هل يمكنني التقديم بالكامل من خارج نيجيريا؟', 'faq-a2': 'نعم بالتأكيد! الهدف الأساسي هو تمكين المغتربين من إرسال مستنداتهم وتتبع طلباتهم واستلام أوراقهم الرسمية دون الحاجة للسفر.',
    'faq-q3': 'كيف يمكنني تتبع طلبي؟', 'faq-a3': 'بعد إرسال الطلب، ستحصل على رقم تتبع فريد (مثال NDS-2026-102948) يمكنك استخدامه في صفحة التتبع لمشاهدة التقدم.',
    'faq-q4': 'هل أنتم جهة حكومية رسمية؟', 'faq-a4': 'لا. نحن شبكة استشارية وخدمية خاصة. نتقاضى رسوماً إدارية لتغطية نفقات المتابعة والتجهيز والمراسلات مع الهيئات الحكومية في نيجيريا.',
    'contact-head': 'اتصل بنا', 'contact-sub': 'لديك استفسار عاجل؟ تواصل مع مكتب الدعم الفني لدينا فوراً.',
    'c-head-office': 'المكتب الرئيسي', 'c-branch-office': 'المكتب الفرعي', 'c-send-msg': 'أرسل لنا استفساراً'
  },
  fr: { // French Translations
    'nav-home': 'Accueil', 'nav-about': 'À Propos', 'nav-services': 'Services', 'nav-how': 'Comment ça Marche',
    'nav-track': 'Suivre Demande', 'nav-faq': 'FAQ', 'nav-contact': 'Contactez-nous', 'nav-login': 'Se Connecter',
    'nav-portal': 'Mon Portail', 'hero-title': 'SERVICES DIASPORA DU NIGERIA',
    'hero-subtitle': 'Assistant de traitement des documents et services de soutien à la diaspora',
    'hero-desc': 'Soutien professionnel, sécurisé et fiable pour les Nigérians de la diaspora avec les demandes, l\'authentification, la vérification et les documents administratifs essentiels au pays.',
    'btn-apply-service': 'Postulez Maintenant', 'btn-contact-us': 'Contactez-nous', 'btn-apply-short': 'Postuler',
    'stat-pass': 'Support Passeport', 'stat-pass-desc': 'Renouvellement de passeports et conseils pour les nouvelles demandes.',
    'stat-nin': 'Support NIN & BVN', 'stat-nin-desc': 'Vérification, corrections et soutien au registre national.',
    'stat-cac': 'Enregistrements CAC', 'stat-cac-desc': 'Enregistrer des entreprises et dépôt de documents corporatifs.',
    'stat-auth': 'Légalisation MOFA',
    'about-title': 'À Propos de Nigeria Diaspora Services (NDS)',
    'about-intro': 'Nigeria Diaspora Services (NDS) est un assistant documentaire indépendant engagé à soutenir les Nigérians vivant à l\'étranger.',
    'about-desc1': 'Gérer les démarches administratives gouvernementales depuis un autre pays peut être stressant. Notre réseau professionnel au Nigeria coordonne la validation et l\'authentification en votre nom en toute sécurité.',
    'vision-title': 'Notre Vision', 'vision-text': 'Devenir la plateforme d\'assistance documentaire et de soutien à la diaspora la plus fiable reliant les Nigérians du monde entier.',
    'mission-title': 'Notre Mission', 'mission-text': 'Fournir une assistance et un soutien professionnels, transparents et fiables aux Nigérians de la diaspora.',
    'why-choose-title': 'Pourquoi Nous Choisir?',
    'wc-1': 'Assistance de Vérification Professionnelle', 'wc-2': 'Conçu Spécifiquement pour la Diaspora',
    'wc-3': 'Suivi des Demandes et Mises à Jour en Direct', 'wc-4': 'Stockage Cloud Sécurisé pour vos Documents',
    'wc-5': 'Portail Client Dédié et Messagerie de Support',
    'metric-accuracy': 'Précision & Légitimité', 'metric-satisfaction': 'Satisfaction Client', 'metric-security': 'Sécurité Documentaire',
    'services-title': 'Nos Services Professionnels', 'services-subtitle': 'Découvrez nos services d\'aide au traitement des documents officiels',
    's1-title': '1. Services de Passeport Nigérian', 's1-1': 'Aide au Renouvellement de Passeport', 's1-2': 'Assistance pour Nouveau Passeport', 's1-3': 'Soutien aux Documents de Passeport',
    's2-title': '2. Numéro d\'Identification National (NIN)', 's2-1': 'Assistance au Traitement du NIN', 's2-2': 'Soutien à la Vérification du NIN', 's2-3': 'Conseils de Correction du NIN',
    's3-title': '3. Numéro de Vérification Bancaire (BVN)', 's3-1': 'Assistance au Traitement du BVN', 's3-2': 'Mise à Jour et Vérification du BVN',
    's4-title': '4. Certificat de Casier Judiciaire', 's4-1': 'Assistance à la Demande', 's4-2': 'Support Documentaire', 's4-3': 'Conseils de Traitement',
    's5-title': '5. Certificat NDLEA', 's5-1': 'Assistance à la Demande', 's5-2': 'Soutien au Traitement', 's5-3': 'Conseils Documentaires',
    's6-title': '6. Services CAC pour Entreprises', 's6-1': 'Aide à l\'Enregistrement du Nom Commercial', 's6-2': 'Assistance à la Création d\'Entreprise', 's6-3': 'Support aux Documents Corporatifs CAC',
    's7-title': '7. Légalisation de Documents MOFA', 's7-1': 'Assistance Ministère des Affaires Étrangères', 's7-2': 'Authentification et Légalisation de Documents', 's7-3': 'Conseils de Vérification et Traitement',
    's8-title': '8. Authentification Ambassade Étrangère', 's8-1': 'Aide à l\'Authentification par l\'Ambassade', 's8-2': 'Support pour la Soumission des Documents', 's8-3': 'Conseils de Traitement',
    's9-title': '9. Support Ambassades & Consulats', 's9-1': 'Coordination avec l\'Ambassade du Nigeria', 's9-2': 'Assistance Documentaire Consulaire', 's9-3': 'Conseils de Rendez-vous et Services',
    's10-title': '10. Documents Délivrés par le Tribunal', 's10-1': 'Aide pour Affidavits et Certifications de Tribunal', 's10-2': 'Soutien à la Demande et Vérification', 's10-3': 'Conseils pour Documents Juridiques',
    's11-title': '11. Assistance aux Contrats Commerciaux', 's11-1': 'Préparation et Rédaction de Contrats Commerciaux', 's11-2': 'Assistance pour la Rédaction d\'Accords', 's11-3': 'Support aux Documents d\'Affaires Locaux',
    's12-title': '12. Services du Travail & Agences', 's12-1': 'Assistance Documentaire du Travail', 's12-2': 'Support au Registre de l\'Emploi', 's12-3': 'Conseils de Conformité et Vérifications',
    'how-title': 'Comment NDS Simplifie les Démarches', 'how-subtitle': 'Sécurisé, rapide et structuré en 4 étapes simples',
    'step1-title': 'Soumettre la Demande', 'step1-desc': 'Inscrivez-vous sur notre portail, choisissez votre service, remplissez les détails et joignez vos documents.',
    'step2-title': 'Examen des Documents', 'step2-desc': 'Nos gestionnaires examinent vos informations pour vérifier la conformité avec les exigences.',
    'step3-title': 'Traitement & Suivi', 'step3-desc': 'Nous coordonnons localement au Nigeria avec les ministères, registres ou consulats pour finaliser.',
    'step4-title': 'Finalisation & Livraison', 'step4-desc': 'Suivez l\'avancement sur votre tracker et téléchargez vos documents authentiques en toute sécurité.',
    'legal-disclaimer-title': 'DISCLAIMER & MENTION LÉGALE IMPORTANTE',
    'legal-disclaimer-text': 'Nigeria Diaspora Services (NDS) est un prestataire de services d\'assistance administrative indépendant. Nous ne sommes pas une agence gouvernementale, ambassade ou affilié du CAC ou NDLEA.',
    'apply-head': 'Commencer Votre Demande', 'apply-sub': 'Soumettez vos détails et documents de support. Assurez-vous de vous connecter d\'abord.',
    'lbl-service': 'Service Requis *', 'lbl-contact': 'Mode de Contact Préféré *', 'lbl-desc': 'Détails Supplémentaires / Spécificités',
    'lbl-files': 'Télécharger les Documents / Scans Requis *', 'upload-click': 'Cliquez pour parcourir les fichiers', 'btn-submit-app': 'Soumettre la Demande',
    'success-headline': 'Soumission Reçue!', 'success-body': 'Votre demande est en cours de traitement. Conservez votre numéro de référence pour suivre les étapes.',
    'btn-track-go': 'Suivre la Demande', 'btn-portal-go': 'Aller au Portail',
    'track-title': 'Suivi de la Demande', 'track-desc': 'Saisissez votre numéro de référence unique pour suivre l\'état en direct',
    'btn-track-search': 'Rechercher', 'st-rec': 'Reçue', 'st-rev': 'En Examen', 'st-doc': 'Documents Requis', 'st-proc': 'En Traitement', 'st-comp': 'Complétée',
    'chat-history-title': 'Messagerie de Support avec l\'Admin', 'track-error-text': 'Aucun dossier ne correspond à cette référence. Veuillez vérifier la saisie.',
    'faq-title': 'Foire Aux Questions', 'faq-subtitle': 'Explications claires sur nos services, logistique et compétences',
    'faq-q1': 'Qui peut utiliser Nigeria Diaspora Services?', 'faq-a1': 'Tout citoyen ou entrepreneur nigérian résidant à l\'étranger (Diaspora) ayant besoin d\'un soutien professionnel pour traiter des documents administratifs au Nigeria.',
    'faq-q2': 'Puis-je postuler entièrement depuis l\'étranger?', 'faq-a2': 'Oui! Notre but principal est de vous permettre de soumettre vos scans, suivre la progression et recevoir vos documents sans avoir à vous déplacer.',
    'faq-q3': 'Comment suivre mon dossier?', 'faq-a3': 'Après soumission, vous recevez une référence (ex: NDS-2026-102948) que vous pouvez saisir à tout moment dans l\'onglet \'Suivre Demande\'.',
    'faq-q4': 'Êtes-vous une agence gouvernementale?', 'faq-a4': 'Non. NDS est un réseau d\'assistance privé. Nous facturons des frais de gestion pour la compilation, le dépôt et le suivi auprès des ministères.',
    'contact-head': 'Contactez-nous', 'contact-sub': 'Une question urgente? Contactez notre équipe d\'assistance directement.',
    'c-head-office': 'Siège Social', 'c-branch-office': 'Bureau Local', 'c-send-msg': 'Envoyer un Message'
  }
};

// Toggle Floating Compass Navigation Menu
function toggleFloatingNav() {
  const menu = document.getElementById('floating-menu');
  menu.classList.toggle('active');
}

// Toggle password visibility (show/hide eye)
function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const btn = input.nextElementSibling;
  const icon = btn.querySelector('i');
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  }
}

// Toast Alerts system
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'danger' ? 'text-danger' : ''}`;
  
  const icon = type === 'danger' ? 'fa-triangle-exclamation' : 'fa-circle-check';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideInToast 0.3s ease reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Language Switcher Dropdown Handler
function toggleLangDropdown(event) {
  if (event) event.stopPropagation();
  const dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.toggle('active');
}

// Mobile Navigation Handlers
function toggleMobileNav() {
  const panel = document.getElementById('mobile-nav-panel');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  if (panel) {
    panel.classList.toggle('active');
    if (toggleBtn) {
      toggleBtn.innerHTML = panel.classList.contains('active') ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    }
  }
}

function closeMobileNav() {
  const panel = document.getElementById('mobile-nav-panel');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  if (panel && panel.classList.contains('active')) {
    panel.classList.remove('active');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
}

// Global click listener to close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  const dd = document.getElementById('lang-dropdown');
  if (dd && !dd.contains(e.target)) {
    dd.classList.remove('active');
  }
});

// Set translation languages dynamically
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('nds_lang', lang);
  const langElem = document.getElementById('current-lang');
  if (langElem) langElem.innerText = lang.toUpperCase();
  
  // Close language dropdown if open
  const dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.remove('active');

  // Set RTL direction if Arabic
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.removeAttribute('dir');
  }
  
  // Replace texts based on data-key
  const translatables = document.querySelectorAll('[data-key]');
  translatables.forEach(elem => {
    const key = elem.getAttribute('data-key');
    if (dictionary[lang] && dictionary[lang][key]) {
      // Check if it's input placeholder
      if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
        elem.placeholder = dictionary[lang][key];
      } else {
        elem.innerText = dictionary[lang][key];
      }
    }
  });
}

// SPA Routing and section toggler
function routeApp() {
  const hash = window.location.hash || '#home';
  const cleanHash = hash.split('?')[0];
  
  // Deactivate all views, activate matching view
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });
  
  const targetView = document.querySelector(cleanHash);
  if (targetView) {
    targetView.classList.add('active');
  } else {
    document.querySelector('#home').classList.add('active');
  }
  
  // Sync active header links
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === cleanHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Handle service queries from services card shortcuts
  if (cleanHash === '#apply') {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const serviceName = params.get('service');
    if (serviceName) {
      document.getElementById('apply-service').value = serviceName;
    }
  }

  // Handle portal or admin specific loads
  if (cleanHash === '#portal') {
    loadPortalData();
  } else if (cleanHash === '#admin-dashboard') {
    loadAdminDashboard();
  }

  // Show or hide bottom nav depending on active portal/dashboard views
  const bottomNav = document.querySelector('.portal-bottom-nav');
  if (bottomNav) {
    if (cleanHash === '#portal' || cleanHash === '#admin-dashboard') {
      bottomNav.classList.add('active-view');
    } else {
      bottomNav.classList.remove('active-view');
    }
  }
}

// Open / Close Modals
function openAuthModal() {
  document.getElementById('auth-modal').classList.add('active');
}
function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('active');
}
function switchAuthModalTab(tab) {
  document.getElementById('modal-tab-login').className = tab === 'login' ? 'active' : '';
  document.getElementById('modal-tab-register').className = tab === 'register' ? 'active' : '';
  document.getElementById('pane-login').className = tab === 'login' ? 'modal-pane active' : 'modal-pane';
  document.getElementById('pane-register').className = tab === 'register' ? 'modal-pane active' : 'modal-pane';
}

function closeAdminActionModal() {
  document.getElementById('admin-action-modal').classList.remove('active');
}

// Toggle session-specific headers
function syncSessionUI() {
  const btn = document.getElementById('auth-header-btn');
  const portalLink = document.getElementById('floating-portal-link');
  
  if (authToken && currentUser) {
    btn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> <span>Sign Out</span>`;
    btn.onclick = handleLogout;
    portalLink.style.display = 'flex';
    
    // Check if admin
    if (currentUser.isAdmin) {
      btn.innerHTML = `<i class="fa-solid fa-user-shield"></i> <span>Admin Panel</span>`;
      btn.onclick = () => { window.location.hash = '#admin-dashboard'; };
    }
    
    document.getElementById('apply-auth-alert').style.display = 'none';
    document.getElementById('apply-form').style.display = 'block';
  } else {
    btn.innerHTML = `<i class="fa-solid fa-user-circle"></i> <span data-key="nav-login">Sign In</span>`;
    btn.onclick = openAuthModal;
    portalLink.style.display = 'none';
    
    document.getElementById('apply-auth-alert').style.display = 'block';
    document.getElementById('apply-form').style.display = 'none';
  }
  setLanguage(currentLang);
}

// Handle login submissions
async function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  try {
    const res = await fetch(`${API_BASE}/api/auth/login.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    
    localStorage.setItem('nds_token', data.token);
    localStorage.setItem('nds_user', JSON.stringify(data.user));
    authToken = data.token;
    currentUser = data.user;
    
    showToast('Login successful!');
    closeAuthModal();
    syncSessionUI();
    
    if (data.user.isAdmin) {
      window.location.hash = '#admin-dashboard';
    } else {
      window.location.hash = '#portal';
    }
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

// Handle register submissions
async function handleRegisterSubmit(event) {
  event.preventDefault();
  const fullName = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const phone = document.getElementById('reg-phone').value;
  const country = document.getElementById('reg-country').value;
  const stateOrigin = document.getElementById('reg-state').value;
  const password = document.getElementById('reg-password').value;
  
  try {
    const res = await fetch(`${API_BASE}/api/auth/register.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone, country, stateOrigin, password })
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    
    localStorage.setItem('nds_token', data.token);
    localStorage.setItem('nds_user', JSON.stringify(data.user));
    authToken = data.token;
    currentUser = data.user;
    
    showToast('Registration successful!');
    closeAuthModal();
    syncSessionUI();
    window.location.hash = '#portal';
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

// Handle sign out
function handleLogout() {
  localStorage.removeItem('nds_token');
  localStorage.removeItem('nds_user');
  authToken = '';
  currentUser = null;
  showToast('Logged out successfully');
  syncSessionUI();
  window.location.hash = '#home';
}

// File drop/upload handlers
function handleFileSelect(event) {
  const files = event.target.files;
  const preview = document.getElementById('file-list-preview');
  preview.innerHTML = '';
  selectedFiles = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    selectedFiles.push(file);
    const item = document.createElement('div');
    item.className = 'file-item-chip';
    item.innerHTML = `<span>${file.name} (${(file.size / 1024).toFixed(1)} KB)</span> <i class="fa-solid fa-trash" onclick="removeSelectedFile(${i})"></i>`;
    preview.appendChild(item);
  }
}

function removeSelectedFile(index) {
  selectedFiles.splice(index, 1);
  const preview = document.getElementById('file-list-preview');
  preview.innerHTML = '';
  selectedFiles.forEach((file, idx) => {
    const item = document.createElement('div');
    item.className = 'file-item-chip';
    item.innerHTML = `<span>${file.name} (${(file.size / 1024).toFixed(1)} KB)</span> <i class="fa-solid fa-trash" onclick="removeSelectedFile(${idx})"></i>`;
    preview.appendChild(item);
  });
}

// Base64 helper for Cloudinary uploads
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Handle application form submit
async function handleApplySubmit(event) {
  event.preventDefault();
  if (selectedFiles.length === 0) {
    showToast('Please upload at least one verification scan.', 'danger');
    return;
  }

  const submitBtn = document.getElementById('apply-submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Uploading documents...`;

  try {
    // 1. Upload files to Cloudinary via serverless endpoint
    const uploadedUrls = [];
    for (const file of selectedFiles) {
      const base64Data = await getBase64(file);
      const uploadRes = await fetch(`${API_BASE}/api/upload.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ fileData: base64Data, fileName: file.name })
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || 'Upload failed');
      uploadedUrls.push(uploadData.url);
    }

    // 2. Submit application details
    const serviceRequired = document.getElementById('apply-service').value;
    const contactMethod = document.getElementById('apply-contact').value;
    const description = document.getElementById('apply-desc').value;

    const res = await fetch(`${API_BASE}/api/applications/create.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ serviceRequired, contactMethod, description, documents: uploadedUrls })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Submission failed');

    // Reset Form & Show Success Screen
    document.getElementById('apply-form').reset();
    document.getElementById('file-list-preview').innerHTML = '';
    selectedFiles = [];
    
    document.getElementById('apply-form').style.display = 'none';
    document.getElementById('created-ref-num').innerText = data.application.reference_number;
    document.getElementById('apply-success-panel').style.display = 'block';
    
    showToast('Application submitted successfully!');

  } catch (err) {
    showToast(err.message, 'danger');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span data-key="btn-submit-app">Submit Application</span>`;
  }
}

// Copy reference number helper
function copyRefText() {
  const refNum = document.getElementById('created-ref-num').innerText;
  navigator.clipboard.writeText(refNum);
  showToast('Reference number copied to clipboard!');
}

// Track application details query
async function searchTracking() {
  const ref = document.getElementById('track-ref-input').value.trim();
  const searchBtn = document.getElementById('track-search-btn');
  
  if (!ref) {
    showToast('Please enter a reference number.', 'danger');
    return;
  }

  searchBtn.disabled = true;
  searchBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i>`;
  document.getElementById('track-result-panel').style.display = 'none';
  document.getElementById('track-not-found').style.display = 'none';

  try {
    const res = await fetch(`${API_BASE}/api/applications/track.js?ref=${ref}`);
    const data = await res.json();

    if (!res.ok) {
      document.getElementById('track-not-found').style.display = 'block';
      return;
    }

    const app = data.application;
    document.getElementById('track-val-service').innerText = app.serviceRequired;
    document.getElementById('track-val-ref').innerText = app.referenceNumber;
    
    const badge = document.getElementById('track-val-status-badge');
    badge.innerText = app.status;
    badge.className = `badge badge-${getStatusClass(app.status)}`;

    // Set stepper nodes
    document.querySelectorAll('.step-node').forEach(node => node.className = 'step-node');
    
    const nodeStatusMap = {
      'Application Received': ['received'],
      'Under Review': ['received', 'review'],
      'Documents Required': ['received', 'review', 'action'],
      'Processing': ['received', 'review', 'processing'],
      'Completed': ['received', 'review', 'processing', 'completed'],
      'Closed': ['received', 'review', 'processing', 'completed']
    };

    const activeNodes = nodeStatusMap[app.status] || ['received'];
    activeNodes.forEach(id => {
      document.getElementById(`node-${id === 'action' ? 'action' : id}`).classList.add('active');
    });

    // Update Progress bar line width
    const progressLines = {
      'Application Received': '0%',
      'Under Review': '25%',
      'Documents Required': '50%',
      'Processing': '75%',
      'Completed': '100%',
      'Closed': '100%'
    };
    document.getElementById('track-progress-line').style.width = progressLines[app.status] || '0%';

    // Chat render
    document.getElementById('track-msg-app-id').value = app.id || '';
    const logs = document.getElementById('track-chat-logs');
    logs.innerHTML = '';

    if (data.messages.length === 0) {
      logs.innerHTML = `<p class="text-sm text-dimmed text-center my-20">No support chats started. Send a message below to start communicating with NDS admin.</p>`;
    } else {
      data.messages.forEach(msg => {
        const bubble = document.createElement('div');
        bubble.className = `chat-msg ${msg.sender}`;
        bubble.innerHTML = `${msg.message} <span class="chat-msg-time">${new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>`;
        logs.appendChild(bubble);
      });
      // Scroll to bottom
      logs.scrollTop = logs.scrollHeight;
    }

    document.getElementById('track-result-panel').style.display = 'block';

  } catch (err) {
    showToast(err.message, 'danger');
  } finally {
    searchBtn.disabled = false;
    searchBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i> <span data-key="btn-track-search">Search</span>`;
  }
}

// Customer send message in tracking chat
async function handleSendTrackingMessage(event) {
  event.preventDefault();
  const appId = document.getElementById('track-msg-app-id').value;
  const msgText = document.getElementById('track-msg-text').value;

  if (!authToken) {
    showToast('Please sign in to send messages.', 'danger');
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/applications/message.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ applicationId: appId, messageText: msgText })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    document.getElementById('track-msg-text').value = '';
    
    // Refresh search list
    searchTracking();
    showToast('Message sent');
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

// Convert status text to simple short slug for classes
function getStatusClass(status) {
  switch (status) {
    case 'Application Received': return 'received';
    case 'Under Review': return 'review';
    case 'Documents Required': return 'action';
    case 'Processing': return 'processing';
    case 'Completed': return 'completed';
    case 'Closed': return 'closed';
    default: return 'received';
  }
}

// Customer Portal data loading
async function loadPortalData() {
  if (!authToken) {
    window.location.hash = '#home';
    return;
  }

  document.getElementById('portal-user-name').innerText = currentUser.fullName;

  try {
    const res = await fetch(`${API_BASE}/api/applications/list.js`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    const list = document.getElementById('portal-applications-list');
    list.innerHTML = '';

    if (data.applications.length === 0) {
      list.innerHTML = `<tr><td colspan="5" class="text-center text-dimmed">No applications submitted yet.</td></tr>`;
      document.getElementById('portal-stat-total').innerText = '0';
      document.getElementById('portal-stat-pending').innerText = '0';
      document.getElementById('portal-stat-completed').innerText = '0';
      return;
    }

    let pendingCount = 0;
    let completedCount = 0;

    data.applications.forEach(app => {
      if (app.status === 'Completed') completedCount++;
      else if (app.status !== 'Closed') pendingCount++;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong class="text-gold">${app.reference_number}</strong></td>
        <td>${app.service_required}</td>
        <td>${new Date(app.created_at).toLocaleDateString()}</td>
        <td><span class="badge badge-${getStatusClass(app.status)}">${app.status}</span></td>
        <td>
          <button onclick="viewAppTracker('${app.reference_number}')" class="btn-glass btn-sm"><i class="fa-solid fa-eye"></i> Track</button>
        </td>
      `;
      list.appendChild(tr);
    });

    document.getElementById('portal-stat-total').innerText = data.applications.length;
    document.getElementById('portal-stat-pending').innerText = pendingCount;
    document.getElementById('portal-stat-completed').innerText = completedCount;

    // Load Inbox logs
    const inbox = document.getElementById('portal-inbox-list');
    inbox.innerHTML = '';
    data.applications.forEach(app => {
      const card = document.createElement('div');
      card.className = 'glass-panel p-15 mt-10 display-flex justify-between align-items-center';
      card.style.display = 'flex';
      card.style.justifyContent = 'space-between';
      card.style.alignItems = 'center';
      card.innerHTML = `
        <div>
          <h6>Support Chat: Ref <strong>${app.reference_number}</strong></h6>
          <p class="text-sm text-dimmed">${app.service_required} - Current Status: <strong class="text-gold">${app.status}</strong></p>
        </div>
        <button onclick="viewAppTracker('${app.reference_number}')" class="btn-primary btn-sm"><i class="fa-solid fa-comments"></i> Open Chat</button>
      `;
      inbox.appendChild(card);
    });

  } catch (err) {
    showToast(err.message, 'danger');
  }
}

function viewAppTracker(refNum) {
  document.getElementById('track-ref-input').value = refNum;
  window.location.hash = '#track';
  searchTracking();
}

function switchPortalTab(tab) {
  document.querySelectorAll('.portal-tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.portal-tab-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(`portal-tab-${tab}`).classList.add('active');
  event.currentTarget.classList.add('active');
}

// ==========================================================================
// ADMIN DASHBOARD ACTIONS
// ==========================================================================
let allAdminApplications = [];

async function loadAdminDashboard() {
  if (!authToken || !currentUser.isAdmin) {
    window.location.hash = '#home';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/admin/dashboard.js`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${authToken}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    allAdminApplications = data.applications;

    // Set metrics
    document.getElementById('admin-stat-total').innerText = data.stats.total;
    document.getElementById('admin-stat-new').innerText = data.stats.new;
    document.getElementById('admin-stat-processing').innerText = data.stats.processing;
    document.getElementById('admin-stat-users').innerText = data.stats.usersCount;

    // Render Recent Table (limit to 5)
    const recentList = document.getElementById('admin-recent-apps');
    recentList.innerHTML = '';
    data.applications.slice(0, 5).forEach(app => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong class="text-gold">${app.reference_number}</strong></td>
        <td>${app.full_name}</td>
        <td>${app.service_required}</td>
        <td><span class="badge badge-${getStatusClass(app.status)}">${app.status}</span></td>
        <td><button class="btn-primary btn-sm" onclick="openAdminAction('${app.id}')">Manage</button></td>
      `;
      recentList.appendChild(tr);
    });

    // Render All list
    renderAdminApplicationsList(data.applications);

  } catch (err) {
    showToast(err.message, 'danger');
  }
}

function renderAdminApplicationsList(apps) {
  const list = document.getElementById('admin-applications-list');
  list.innerHTML = '';

  if (apps.length === 0) {
    list.innerHTML = `<tr><td colspan="6" class="text-center text-dimmed">No applications found.</td></tr>`;
    return;
  }

  apps.forEach(app => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong class="text-gold">${app.reference_number}</strong></td>
      <td>${app.full_name}</td>
      <td>${app.email}<br><span class="text-dimmed">${app.phone}</span></td>
      <td>${app.service_required}</td>
      <td><span class="badge badge-${getStatusClass(app.status)}">${app.status}</span></td>
      <td><button class="btn-primary btn-sm" onclick="openAdminAction('${app.id}')">Review & Actions</button></td>
    `;
    list.appendChild(tr);
  });
}

function filterAdminApplications() {
  const filter = document.getElementById('admin-status-filter').value;
  if (filter === 'All') {
    renderAdminApplicationsList(allAdminApplications);
  } else {
    const filtered = allAdminApplications.filter(app => app.status === filter);
    renderAdminApplicationsList(filtered);
  }
}

function switchAdminTab(tab) {
  document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
  
  document.getElementById(`admin-tab-${tab}`).classList.add('active');
  event.currentTarget.classList.add('active');
}

// Open application record details editor for admin
function openAdminAction(appId) {
  const app = allAdminApplications.find(a => String(a.id) === String(appId));
  if (!app) return;

  document.getElementById('admin-action-app-id').value = app.id;
  document.getElementById('admin-detail-ref').innerText = app.reference_number;
  document.getElementById('admin-detail-user').innerText = `${app.full_name} (${app.phone})`;
  document.getElementById('admin-detail-email').innerText = app.email;
  document.getElementById('admin-detail-service').innerText = app.service_required;
  document.getElementById('admin-detail-desc').innerText = app.description || 'No additional description provided.';
  
  const statusBadge = document.getElementById('admin-detail-status-badge');
  statusBadge.innerText = app.status;
  statusBadge.className = `badge badge-${getStatusClass(app.status)}`;
  
  document.getElementById('admin-update-status').value = app.status;
  document.getElementById('admin-update-notes').value = app.notes || '';
  document.getElementById('admin-update-message').value = '';

  // Render Documents
  const docsRow = document.getElementById('admin-detail-docs');
  docsRow.innerHTML = '';
  if (app.documents && app.documents.length > 0) {
    app.documents.forEach((url, i) => {
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.className = 'doc-link-item';
      a.innerHTML = `<i class="fa-solid fa-file-pdf"></i> View Scan ${i + 1}`;
      docsRow.appendChild(a);
    });
  } else {
    docsRow.innerHTML = `<span class="text-sm text-dimmed">No files attached.</span>`;
  }

  document.getElementById('admin-action-modal').classList.add('active');
}

async function handleAdminUpdate(event) {
  event.preventDefault();
  const appId = document.getElementById('admin-action-app-id').value;
  const status = document.getElementById('admin-update-status').value;
  const notes = document.getElementById('admin-update-notes').value;
  const messageText = document.getElementById('admin-update-message').value;

  try {
    const res = await fetch(`${API_BASE}/api/admin/update.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ applicationId: appId, status, notes, messageText })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    showToast('Application updated successfully!');
    closeAdminActionModal();
    loadAdminDashboard(); // Refresh tables
  } catch (err) {
    showToast(err.message, 'danger');
  }
}

// Handling Simple Inquiry form submissions
function handleInquiry(event) {
  event.preventDefault();
  const name = document.getElementById('c-name').value;
  showToast(`Thank you ${name}! Your inquiry has been logged.`);
  document.getElementById('contact-inquiry-form').reset();
}

// Accordion listeners for FAQ
document.querySelectorAll('.faq-question').forEach(q => {
  q.addEventListener('click', () => {
    const item = q.parentElement;
    item.classList.toggle('active');
  });
});

// Theme Toggle System
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  const toggleBtn = document.getElementById('theme-toggle');
  
  if (nextTheme === 'dark') {
    body.classList.add('dark-theme');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('dark-theme');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
  localStorage.setItem('nds_theme', nextTheme);
  showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode!`);
}

function initTheme() {
  const savedTheme = localStorage.getItem('nds_theme') || 'light';
  const body = document.body;
  const toggleBtn = document.getElementById('theme-toggle');
  
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    body.classList.remove('dark-theme');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

// App Initialization
window.addEventListener('hashchange', routeApp);
window.addEventListener('DOMContentLoaded', () => {
  routeApp();
  syncSessionUI();
  initTheme();
});
