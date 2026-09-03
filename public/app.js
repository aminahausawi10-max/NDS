// ==========================================================================
// API Configuration - Update PHP_API_BASE to your cPanel domain when deploying
// Examples: 'https://yourdomain.com' or 'https://nds.yourdomain.com'
// ==========================================================================
const API_BASE     = window.location.origin;
const PHP_API_BASE = window.location.origin; // Change to your cPanel domain e.g. 'https://yourdomain.com'

// PHP endpoint paths
const API = {
  login:        PHP_API_BASE + '/api/auth/login.php',
  register:     PHP_API_BASE + '/api/auth/register.php',
  appCreate:    PHP_API_BASE + '/api/applications/create.php',
  appList:      PHP_API_BASE + '/api/applications/list.php',
  appTrack:     PHP_API_BASE + '/api/applications/track.php',
  appMessage:   PHP_API_BASE + '/api/applications/message.php',
  adminDash:    PHP_API_BASE + '/api/admin/dashboard.php',
  adminUpdate:  PHP_API_BASE + '/api/admin/update.php',
  upload:       PHP_API_BASE + '/api/upload.php',
};

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
    'nav-track': 'Bibiyi Aikace-aikace', 'nav-faq': 'Tambayoyi', 'nav-contact': 'TuntuÉ“e Mu', 'nav-login': 'Shiga Ciki',
    'nav-portal': 'Dashboard Dina', 'hero-title': 'AYYUKAN DIASPORA NIGERIA',
    'hero-subtitle': 'Mataimakin Gudanar da Takardu & Ayyukan Tallafawa Diaspora',
    'hero-desc': 'Taimako na Æ™wararru, amintacce, kuma tabbatacce ga ' +
                 'Yan Najeriya da ke zaune a Æ™asashen waje don takardu da izini a gida.',
    'btn-apply-service': 'Nemi Aiki Yanzu', 'btn-contact-us': 'TuntuÉ“e Mu', 'btn-apply-short': 'Nemi',
    'stat-pass': 'Taimakon Fasfo', 'stat-pass-desc': 'Sabuwar fasfo ko sabunta fasfo cikin sauÆ™i.',
    'stat-nin': 'Taimakon NIN & BVN', 'stat-nin-desc': 'Tantancewa, gyare-gyare, da tallafi a Najeriya.',
    'stat-cac': 'Rijistar CAC', 'stat-cac-desc': 'Yi rajistar kamfani da takardun kasuwanci.',
    'stat-auth': 'Halaccin MOFA',
    'about-title': 'Game da Nigeria Diaspora Services (NDS)',
    'about-intro': 'Nigeria Diaspora Services (NDS) wata hukuma ce mai zaman kanta da ke taimaka wa \'Yan Najeriya da ke Æ™asashen waje.',
    'about-desc1': 'Gudanar da takardun gwamnati daga wata Æ™asa na iya zama da wuya. Abokan aikinmu a Najeriya suna gudanar da duk wani izini da tantancewa a gare ku cikin aminci.',
    'vision-title': 'Manufarmu', 'vision-text': 'Zama dandalin da ya fi kowane amintacce wajen tallafawa \'yan Najeriya a duniya.',
    'mission-title': 'Aikinmu', 'mission-text': 'Bayar da amintaccen taimako na Æ™wararru ga \'Yan Najeriya da ke zaune a Æ™asashen waje.',
    'why-choose-title': 'Me ya sa za ku zaÉ“e mu?',
    'wc-1': 'Taimakon Tantance Takardu na Æ˜wararru', 'wc-2': 'An tsara shi musamman don Diaspora',
    'wc-3': 'Bibiyar Aikace-aikace da Sabuntawa', 'wc-4': 'Amintaccen Ajiya don Takardu',
    'wc-5': 'Kula da Abokan ciniki da Tattaunawa ta Gaba-gaba',
    'metric-accuracy': 'Inganci & Halacci', 'metric-satisfaction': 'Gamsar da Abokan ciniki', 'metric-security': 'Tsaron Takardu',
    'services-title': 'Ayyukanmu na Æ˜wararru', 'services-subtitle': 'Bincika ayyukanmu na taimakawa wajen sarrafa takardu da takaddun shaida',
    's1-title': '1. Ayyukan Fasfo na Najeriya', 's1-1': 'Taimakon Sabunta Fasfo', 's1-2': 'Neman Sabon Fasfo', 's1-3': 'Taimakon Takardun Fasfo',
    's2-title': '2. Lambar Shaidar Kasa (NIN)', 's2-1': 'Taimakon Sarrafa NIN', 's2-2': 'Taimakon Tantance NIN', 's2-3': 'Jagorar Gyaran NIN',
    's3-title': '3. Lambar Tabbatar da Banki (BVN)', 's3-1': 'Taimakon Sarrafa BVN', 's3-2': 'Taimakon Sabunta BVN/Tantancewa',
    's4-title': '4. Takardar Shaidar Hukumar Yan Sanda', 's4-1': 'Taimakon Neman Takarda', 's4-2': 'Taimakon Takardu', 's4-3': 'Jagoran Gudanarwa',
    's5-title': '5. Takardar Shaidar NDLEA', 's5-1': 'Taimakon Nema', 's5-2': 'Tallafin Gudanarwa', 's5-3': 'Jagorar Takardu',
    's6-title': '6. Ayyukan Kasuwanci na CAC', 's6-1': 'Taimakon Rijistar Sunan Kasuwanci', 's6-2': 'Taimakon Rijistar Kamfani', 's6-3': 'Taimakon Takardun CAC',
    's7-title': '7. Tabbatar da Takaddun MOFA', 's7-1': 'Taimakon Ma\'aikatar Harkokin Waje', 's7-2': 'Tantance Takardu & Halatta', 's7-3': 'Jagorar Tantancewa',
    's8-title': '8. Tabbatar da Jakadancin Waje', 's8-1': 'Taimakon Tabbatar da Ofishin Jakadanci', 's8-2': 'Taimakon Mika Takardu', 's8-3': 'Jagorar Gudanarwa',
    's9-title': '9. Tallafin Ofishin Jakadanci & Ofishin Jakadanci', 's9-1': 'Tallafin Gudanar da Ofishin Jakadancin Najeriya', 's9-2': 'Taimakon Takardun Ofishin Jakadanci', 's9-3': 'Jagorar AlÆ™awari & Sabis',
    's10-title': '10. Takardun Kotu', 's10-1': 'Taimakon Takardun Shaida na Kotu', 's10-2': 'Taimakon Nema & Tantancewa', 's10-3': 'Jagorar Takardun Shari\'a',
    's11-title': '11. Taimakon Yarjejeniyar Kasuwanci', 's11-1': 'Taimakon Shirya Yarjejeniyar Kasuwanci', 's11-2': 'Taimakon Tsara Yarjejeniya', 's11-3': 'Taimakon Takardun Kasuwanci na Ciki',
    's12-title': '12. Ma\'aikata & Ayyukan Hukumar', 's12-1': 'Taimakon Takardun Kwadago', 's12-2': 'Tallafin Rijistar Ma\'aikata', 's12-3': 'Jagora & Duba Biyayya',
    'how-title': 'Yadda NDS ke SauÆ™aÆ™e Aikin', 'how-subtitle': 'Amintacce, mai sauri, kuma a cikin matakai 4 masu sauÆ™i',
    'step1-title': 'Mika Bukata', 'step1-desc': 'Yi rajista a dandalinmu, zaÉ“i sabis É—in ku, sannan ku cika bayanai tare da hoton takardunku.',
    'step2-title': 'Binciken Takardu', 'step2-desc': 'Manajojinmu suna duba bayanan don tabbatar da sun cika Æ™a\'idojin da ake buÆ™ata.',
    'step3-title': 'Tallafin Gudanarwa', 'step3-desc': 'Muna haÉ—a gwiwa a Najeriya tare da ma\'aikatu ko ofisoshin jakadanci don kammala aikin.',
    'step4-title': 'Kammalawa & Bayarwa', 'step4-desc': 'Bibiyi matakin aikin ku a kan tracker É—inku kuma ku sauke ingantattun takaddun ku.',
    'legal-disclaimer-title': 'MUHIMMIN SANARWA NA SHARI\'A & DISCLAIMER',
    'legal-disclaimer-text': 'Nigeria Diaspora Services (NDS) cibiyar tallafawa takardu ce mai zaman kanta. Mu ba hukumar gwamnatin Najeriya ba ce, ko ofishin jakadanci, ko hukumar tsaro, ko CAC, ko NDLEA.',
    'apply-head': 'Fara Aikace-aikacen Ku', 'apply-sub': 'Mika bayanan ku da takardunku cikin aminci. Tabbatar kun shiga kafin nan.',
    'lbl-service': 'Sabis É—in da ake buÆ™ata *', 'lbl-contact': 'Hanyar TuntuÉ“a da Aka Fi So *', 'lbl-desc': 'Karin Bayani / Takamaiman Bayani',
    'lbl-files': 'Saka Takaddun Shaida na Tallafi *', 'upload-click': 'Danna don zaÉ“ar faili', 'btn-submit-app': 'Mika Aikace-aikace',
    'success-headline': 'An KarÉ“i Aikace-aikacen Ku!', 'success-body': 'An saka buÆ™atarku a layin aiki, kuma ma\'aikatanmu za su duba ta nan ba da jimawa ba. Ajiye lambar aikin ku don bibiyarta.',
    'btn-track-go': 'Bibiyi Aikace-aikace', 'btn-portal-go': 'Je zuwa Portal',
    'track-title': 'Bibiyi Matakin Aiki', 'track-desc': 'Saka lambar aikin ku don ganin matakin da yake kai',
    'btn-track-search': 'Nema', 'st-rec': 'An KarÉ“a', 'st-rev': 'Ana Dubawa', 'st-doc': 'Ana Neman Takardu', 'st-proc': 'Ana Sarrafawa', 'st-comp': 'An Kammala',
    'chat-history-title': 'Tattaunawa da Admin', 'track-error-text': 'Babu wani aiki mai wannan lambar. Da fatan za a sake duba lambobin ku.',
    'faq-title': 'Tambayoyin da Aka Fi Yi', 'faq-subtitle': 'Bayyanannun bayanai game da ayyukanmu da yadda muke aiki',
    'faq-q1': 'Wane ne zai iya amfani da Nigeria Diaspora Services?', 'faq-a1': 'Kowane É—an Æ™asar Najeriya ko mai kasuwanci da ke zaune a Æ™asashen waje wanda ke buÆ™atar taimakon Æ™wararru wajen sarrafa takaddun shari\'a ko na gwamnati a Najeriya.',
    'faq-q2': 'Zan iya neman aiki gaba É—aya daga Æ™asashen waje?', 'faq-a2': 'E mana! Babban burinmu shi ne ba wa masu neman aiki a Æ™asashen waje damar aika takardunsu, bibiyar ci gaba, da samun takardunsu ba tare da sun bar Æ™asar da suke zaune ba.',
    'faq-q3': 'Yaya zan bibiyi buÆ™ata ta?', 'faq-a3': 'Bayan kun mika, za ku sami lamba (misali NDS-2026-102948) wacce za ku iya bincika kowane lokaci a shafin \'Bibiyi Aikace-aikace\'.',
    'faq-q4': 'Kuna wakiltar ma\'aikatar gwamnati ne?', 'faq-a4': 'A\'a. NDS cibiya ce mai zaman kanta. Muna karÉ“ar kuÉ—in gudanarwa don taimakawa wajen aikawa da kuma bibiyar takardu a ma\'aikatu daban-daban.',
    'contact-head': 'TuntuÉ“e Mu', 'contact-sub': 'Kuna da gaggawar tambaya? TuntuÉ“i teburin taimakonmu nan da nan.',
    'c-head-office': 'Babban Ofishin', 'c-branch-office': 'Ofishin Reshe', 'c-send-msg': 'Aiko da Tambaya'
  },
  ar: { // Arabic Translations
    'nav-home': 'Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠØ©', 'nav-about': 'Ù…Ù† Ù†Ø­Ù†', 'nav-services': 'Ø§Ù„Ø®Ø¯Ù…Ø§Øª', 'nav-how': 'ÙƒÙŠÙ Ù†Ø¹Ù…Ù„',
    'nav-track': 'ØªØªØ¨Ø¹ Ø§Ù„Ø·Ù„Ø¨Ø§Øª', 'nav-faq': 'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø©', 'nav-contact': 'Ø§ØªØµÙ„ Ø¨Ù†Ø§', 'nav-login': 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„',
    'nav-portal': 'Ø¨ÙˆØ§Ø¨ØªÙŠ', 'hero-title': 'Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…ØºØªØ±Ø¨ÙŠÙ† Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠÙŠÙ†',
    'hero-subtitle': 'Ù…Ø³Ø§Ø¹Ø¯ Ù…Ø¹Ø§Ù„Ø¬Ø© Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª ÙˆØ®Ø¯Ù…Ø§Øª Ø¯Ø¹Ù… Ø§Ù„Ù…ØºØªØ±Ø¨ÙŠÙ†',
    'hero-desc': 'Ø¯Ø¹Ù… Ø§Ø­ØªØ±Ø§ÙÙŠ ÙˆØ¢Ù…Ù† ÙˆÙ…ÙˆØ«ÙˆÙ‚ Ù„Ù„Ù…ØºØªØ±Ø¨ÙŠÙ† Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠÙŠÙ† ÙÙŠ Ø§Ù„Ø®Ø§Ø±Ø¬ Ø¨Ø®ØµÙˆØµ Ù…Ø¹Ø§Ù…Ù„Ø§ØªÙ‡Ù… ÙˆÙ…Ø³ØªÙ†Ø¯Ø§ØªÙ‡Ù… ÙÙŠ Ù†ÙŠØ¬ÙŠØ±ÙŠØ§.',
    'btn-apply-service': 'ØªÙ‚Ø¯Ù… Ø¨Ø·Ù„Ø¨ Ø§Ù„Ø¢Ù†', 'btn-contact-us': 'Ø§ØªØµÙ„ Ø¨Ù†Ø§', 'btn-apply-short': 'ØªÙ‚Ø¯ÙŠÙ…',
    'stat-pass': 'Ø¯Ø¹Ù… Ø¬ÙˆØ§Ø² Ø§Ù„Ø³ÙØ±', 'stat-pass-desc': 'ØªØ¬Ø¯ÙŠØ¯ Ø§Ù„Ø¬ÙˆØ§Ø²Ø§Øª ÙˆØ¥Ø±Ø´Ø§Ø¯Ø§Øª Ø§Ø³ØªØ®Ø±Ø§Ø¬ Ø§Ù„Ø¬ÙˆØ§Ø²Ø§Øª Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©.',
    'stat-nin': 'Ø¯Ø¹Ù… NIN Ùˆ BVN', 'stat-nin-desc': 'Ø§Ù„ØªØ­Ù‚Ù‚ ÙˆØ§Ù„ØªØµØ­ÙŠØ­Ø§Øª ÙˆØ§Ù„Ø¯Ø¹Ù… ÙÙŠ Ø§Ù„Ø³Ø¬Ù„ Ø§Ù„ÙˆØ·Ù†ÙŠ.',
    'stat-cac': 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø´Ø±ÙƒØ§Øª CAC', 'stat-cac-desc': 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø´Ø±ÙƒØ§Øª ÙˆØ§Ù„ÙƒÙŠØ§Ù†Ø§Øª Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ© ÙˆØªÙˆØ«ÙŠÙ‚ Ø§Ù„Ù…Ù„ÙØ§Øª.',
    'stat-auth': 'ØªØµØ¯ÙŠÙ‚Ø§Øª ÙˆØ²Ø§Ø±Ø© Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠØ©',
    'about-title': 'Ø¹Ù† Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…ØºØªØ±Ø¨ÙŠÙ† Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠÙŠÙ† (NDS)',
    'about-intro': 'Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…ØºØªØ±Ø¨ÙŠÙ† Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠÙŠÙ† (NDS) Ù‡ÙŠ Ø¬Ù‡Ø© Ù…Ø³Ø§Ø¹Ø¯Ø© Ù…Ø³ØªÙ‚Ù„Ø© ÙˆÙ…Ù„ØªØ²Ù…Ø© Ø¨Ø±Ø£Ø¨ Ø§Ù„ØµØ¯Ø¹ Ù„Ù„Ù…ØºØªØ±Ø¨ÙŠÙ† Ø®Ø§Ø±Ø¬ Ù†ÙŠØ¬ÙŠØ±ÙŠØ§.',
    'about-desc1': 'Ø¥Ø¬Ø±Ø§Ø¡ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ø§Ù„Ø­ÙƒÙˆÙ…ÙŠØ© Ù…Ù† Ø¯ÙˆÙ„Ø© Ø£Ø®Ø±Ù‰ Ù‚Ø¯ ÙŠÙƒÙˆÙ† Ù…Ø±Ù‡Ù‚Ø§Ù‹. Ø´Ø¨ÙƒØªÙ†Ø§ Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠØ© ÙÙŠ Ù†ÙŠØ¬ÙŠØ±ÙŠØ§ ØªØªØ§Ø¨Ø¹ ÙˆØªØµØ¯Ù‚ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª Ù†ÙŠØ§Ø¨Ø© Ø¹Ù†ÙƒÙ… Ø¨Ø£Ø¹Ù„Ù‰ Ø¯Ø±Ø¬Ø§Øª Ø§Ù„Ø£Ù…Ø§Ù†.',
    'vision-title': 'Ø±Ø¤ÙŠØªÙ†Ø§', 'vision-text': 'Ø£Ù† Ù†ØµØ¨Ø­ Ø§Ù„Ù…Ù†ØµØ© Ø§Ù„Ø£ÙƒØ«Ø± Ù…ÙˆØ«ÙˆÙ‚ÙŠØ© Ù„Ø¯Ø¹Ù… ÙˆØªØ³Ù‡ÙŠÙ„ Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ø§Ù„Ù…ØºØªØ±Ø¨ÙŠÙ† Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠÙŠÙ† Ø­ÙˆÙ„ Ø§Ù„Ø¹Ø§Ù„Ù….',
    'mission-title': 'Ø±Ø³Ø§Ù„ØªÙ†Ø§', 'mission-text': 'ØªÙ‚Ø¯ÙŠÙ… Ø¯Ø¹Ù… Ø§Ø­ØªØ±Ø§ÙÙŠ ÙˆØ´ÙØ§Ù ÙˆÙ…ÙˆØ«ÙˆÙ‚ Ù„ØªØ®Ù„ÙŠØµ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ù„Ù„Ù…ØºØªØ±Ø¨ÙŠÙ† ÙÙŠ Ø§Ù„Ø®Ø§Ø±Ø¬.',
    'why-choose-title': 'Ù„Ù…Ø§Ø°Ø§ ØªØ®ØªØ§Ø±Ù†Ø§ØŸ',
    'wc-1': 'Ù…Ø³Ø§Ø¹Ø¯Ø© Ø§Ø­ØªØ±Ø§ÙÙŠØ© Ù„Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª', 'wc-2': 'Ù…Ù†ØµØ© Ù…Ø®ØµØµØ© ÙˆÙ…Ø¨Ø³Ø·Ø© Ù„Ù„Ù…ØºØªØ±Ø¨ÙŠÙ†',
    'wc-3': 'ØªØªØ¨Ø¹ Ø§Ù„Ø·Ù„Ø¨Ø§Øª ÙˆØ§Ù„ØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„Ù…Ø¨Ø§Ø´Ø±Ø©', 'wc-4': 'ØªØ®Ø²ÙŠÙ† Ø³Ø­Ø§Ø¨ÙŠ Ø¢Ù…Ù† Ù„Ù„Ù…Ù„ÙØ§Øª Ø§Ù„Ø­Ø³Ø§Ø³Ø©',
    'wc-5': 'Ø¨ÙˆØ§Ø¨Ø© Ø¹Ù…Ù„Ø§Ø¡ Ù…Ø®ØµØµØ© Ù„Ù„ØªÙˆØ§ØµÙ„ Ø§Ù„Ù…Ø¨Ø§Ø´Ø±',
    'metric-accuracy': 'Ø§Ù„Ø¯Ù‚Ø© ÙˆØ§Ù„Ù…Ø´Ø±ÙˆØ¹ÙŠØ©', 'metric-satisfaction': 'Ø±Ø¶Ø§ Ø§Ù„Ø¹Ù…Ù„Ø§Ø¡', 'metric-security': 'Ø£Ù…Ù† Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª',
    'services-title': 'Ø®Ø¯Ù…Ø§ØªÙ†Ø§ Ø§Ù„Ø§Ø­ØªØ±Ø§ÙÙŠØ©', 'services-subtitle': 'Ø§ÙƒØªØ´Ù Ø®Ø¯Ù…Ø§ØªÙ†Ø§ Ù„Ù…Ø³Ø§Ø¹Ø¯ØªÙƒ ÙÙŠ Ø§Ø³ØªØ®Ø±Ø§Ø¬ ÙˆØªØµØ¯ÙŠÙ‚ ÙƒØ§ÙØ© Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª',
    's1-title': '1. Ø®Ø¯Ù…Ø§Øª Ø¬ÙˆØ§Ø² Ø§Ù„Ø³ÙØ± Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠ', 's1-1': 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ ØªØ¬Ø¯ÙŠØ¯ Ø¬ÙˆØ§Ø² Ø§Ù„Ø³ÙØ±', 's1-2': 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø§Ø³ØªØ®Ø±Ø§Ø¬ Ø¬ÙˆØ§Ø² Ø³ÙØ± Ø¬Ø¯ÙŠØ¯', 's1-3': 'Ø¯Ø¹Ù… ÙˆØªÙˆØ«ÙŠÙ‚ Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø¬ÙˆØ§Ø² Ø§Ù„Ø³ÙØ±',
    's2-title': '2. Ø±Ù‚Ù… Ø§Ù„Ù‡ÙˆÙŠØ© Ø§Ù„ÙˆØ·Ù†ÙŠØ© (NIN)', 's2-1': 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø§Ø³ØªØ®Ø±Ø§Ø¬ ÙˆØªØ¹Ø¯ÙŠÙ„ NIN', 's2-2': 'Ø¯Ø¹Ù… Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù‡ÙˆÙŠØ© Ø§Ù„ÙˆØ·Ù†ÙŠØ© NIN', 's2-3': 'Ø¥Ø±Ø´Ø§Ø¯Ø§Øª ØªØµØ­ÙŠØ­ Ø¨ÙŠØ§Ù†Ø§Øª NIN',
    's3-title': '3. Ø±Ù‚Ù… Ø§Ù„ØªØ­Ù‚Ù‚ Ø§Ù„Ø¨Ù†ÙƒÙŠ (BVN)', 's3-1': 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ù…Ø¹Ø§Ù„Ø¬Ø© Ø·Ù„Ø¨Ø§Øª BVN', 's3-2': 'ØªØ­Ø¯ÙŠØ« ÙˆØ§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø±Ù‚Ù… BVN',
    's4-title': '4. Ø´Ù‡Ø§Ø¯Ø© Ø®Ù„Ùˆ Ø§Ù„Ø³ÙˆØ§Ø¨Ù‚ (Ø§Ù„ÙÙŠØ´ ÙˆØ§Ù„ØªØ´Ø¨ÙŠÙ‡)', 's4-1': 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø§Ù„ØªÙ‚Ø¯ÙŠÙ…', 's4-2': 'Ù…Ø±Ø§Ø¬Ø¹Ø© ÙˆØªØµØ¯ÙŠÙ‚ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©', 's4-3': 'Ø¥Ø±Ø´Ø§Ø¯Ø§Øª Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© ÙˆØ§Ù„Ø®Ø·ÙˆØ§Øª',
    's5-title': '5. Ø´Ù‡Ø§Ø¯Ø© Ù…ÙƒØ§ÙØ­Ø© Ø§Ù„Ù…Ø®Ø¯Ø±Ø§Øª NDLEA', 's5-1': 'Ø¯Ø¹Ù… ØªÙ‚Ø¯ÙŠÙ… Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª', 's5-2': 'Ù…ØªØ§Ø¨Ø¹Ø© Ø§Ù„Ø·Ù„Ø¨Ø§Øª ÙˆØªØ®Ù„ÙŠØµÙ‡Ø§', 's5-3': 'Ø¥Ø±Ø´Ø§Ø¯Ø§Øª Ø¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù…Ù„ÙØ§Øª ÙˆØ§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª',
    's6-title': '6. Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø³Ø¬Ù„ Ø§Ù„ØªØ¬Ø§Ø±ÙŠ ÙˆØ§Ù„Ø´Ø±ÙƒØ§Øª CAC', 's6-1': 'Ø­Ø¬Ø² ÙˆØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø£Ø³Ù…Ø§Ø¡ Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ©', 's6-2': 'ØªØ£Ø³ÙŠØ³ ÙˆØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø´Ø±ÙƒØ§Øª Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©', 's6-3': 'Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØªØ­Ø¯ÙŠØ« Ø³Ø¬Ù„Ø§Øª Ø§Ù„Ø´Ø±ÙƒØ§Øª Ù„Ø¯Ù‰ CAC',
    's7-title': '7. ØªØµØ¯ÙŠÙ‚ Ù…Ø³ØªÙ†Ø¯Ø§Øª ÙˆØ²Ø§Ø±Ø© Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠØ©', 's7-1': 'Ù…Ø±Ø§Ø¬Ø¹Ø© ÙˆØªØ®Ù„ÙŠØµ Ù…Ø¹Ø§Ù…Ù„Ø§Øª ÙˆØ²Ø§Ø±Ø© Ø§Ù„Ø®Ø§Ø±Ø¬ÙŠØ©', 's7-2': 'Ø§Ù„ØªØµØ¯ÙŠÙ‚ ÙˆØ§Ù„ØªÙ‚Ù†ÙŠÙ† Ø§Ù„Ù‚Ø§Ù†ÙˆÙ†ÙŠ Ù„Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª', 's7-3': 'Ø¥Ø±Ø´Ø§Ø¯Ø§Øª Ø§Ù„ØªØ­Ù‚Ù‚ ÙˆØ§Ù„Ø®Ø·ÙˆØ§Øª Ø§Ù„Ù…Ø¹Ù…ÙˆÙ„ Ø¨Ù‡Ø§',
    's8-title': '8. ØªØµØ¯ÙŠÙ‚Ø§Øª Ø§Ù„Ø³ÙØ§Ø±Ø§Øª Ø§Ù„Ø£Ø¬Ù†Ø¨ÙŠØ©', 's8-1': 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ ØªÙˆØ«ÙŠÙ‚ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª Ù„Ø¯Ù‰ Ø§Ù„Ø³ÙØ§Ø±Ø§Øª', 's8-2': 'ØªÙ‚Ø¯ÙŠÙ… Ø§Ù„Ù…Ù„ÙØ§Øª ÙˆÙ…ØªØ§Ø¨Ø¹ØªÙ‡Ø§ Ù„Ø¯Ù‰ Ø§Ù„Ù‚Ù†ØµÙ„ÙŠØ§Øª', 's8-3': 'Ø¥Ø±Ø´Ø§Ø¯Ø§Øª Ø§Ù„ØªØ®Ù„ÙŠØµ ÙˆØ§Ù„Ø±Ø³ÙˆÙ…',
    's9-title': '9. Ø¯Ø¹Ù… Ø§Ù„Ø³ÙØ§Ø±Ø§Øª ÙˆØ§Ù„Ù‚Ù†ØµÙ„ÙŠØ§Øª Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠØ©', 's9-1': 'ØªÙ†Ø³ÙŠÙ‚ Ø§Ù„Ø·Ù„Ø¨Ø§Øª Ù…Ø¹ Ø§Ù„Ø³ÙØ§Ø±Ø© Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠØ© Ø¨Ø§Ù„Ø®Ø§Ø±Ø¬', 's9-2': 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ø§Ù„Ù‚Ù†ØµÙ„ÙŠØ© Ø§Ù„Ù…ØªÙ†ÙˆØ¹Ø©', 's9-3': 'Ø¥Ø±Ø´Ø§Ø¯Ø§Øª Ø­Ø¬Ø² Ø§Ù„Ù…ÙˆØ§Ø¹ÙŠØ¯ ÙˆØ§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª',
    's10-title': '10. Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª ÙˆØ§Ù„ÙˆØ«Ø§Ø¦Ù‚ Ø§Ù„Ù‚Ø¶Ø§Ø¦ÙŠØ©', 's10-1': 'Ø§Ø³ØªØ®Ø±Ø§Ø¬ Ø§Ù„ØªÙˆÙƒÙŠÙ„Ø§Øª ÙˆØªØµØ¯ÙŠÙ‚ Ø§Ù„Ù…Ø­Ø§ÙƒÙ… Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠØ©', 's10-2': 'Ø¯Ø¹Ù… ØªÙ‚Ø¯ÙŠÙ… Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª ÙˆØ§Ù„ØªÙˆØ«ÙŠÙ‚Ø§Øª Ø§Ù„Ù‚Ø¶Ø§Ø¦ÙŠØ©', 's10-3': 'Ø¥Ø±Ø´Ø§Ø¯Ø§Øª Ù‚Ø§Ù†ÙˆÙ†ÙŠØ© ÙˆØ¥Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª',
    's11-title': '11. Ù…Ø³Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¹Ù‚ÙˆØ¯ Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ© ÙˆØ§Ù„Ù…Ø´Ø§Ø±ÙŠØ¹', 's11-1': 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ ØµÙŠØ§ØºØ© ÙˆÙ…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ø¹Ù‚ÙˆØ¯ Ø§Ù„ØªØ¬Ø§Ø±ÙŠØ©', 's11-2': 'Ø¥Ø¹Ø¯Ø§Ø¯ ÙˆØ«Ø§Ø¦Ù‚ Ø§Ù„Ø§ØªÙØ§Ù‚ÙŠØ§Øª ÙˆØ§Ù„Ø´Ø±Ø§ÙƒØ§Øª Ø§Ù„Ù…Ø­Ù„ÙŠØ©', 's11-3': 'ØªØ±ØªÙŠØ¨ ÙˆØªÙˆØ«ÙŠÙ‚ Ø¹Ù‚ÙˆØ¯ Ø§Ù„Ø´Ø±ÙƒØ§Øª ÙÙŠ Ù†ÙŠØ¬ÙŠØ±ÙŠØ§',
    's12-title': '12. Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„ØªÙˆØ¸ÙŠÙ', 's12-1': 'Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø¥Ø¹Ø¯Ø§Ø¯ Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ù„ØªÙˆØ¸ÙŠÙ ÙˆØ§Ù„Ø¹Ù…Ù„', 's12-2': 'Ø§Ù„ØªØ³Ø¬ÙŠÙ„ ÙÙŠ Ù‡ÙŠØ¦Ø§Øª Ø§Ù„Ø¹Ù…Ù„ ÙˆØ§Ù„Ø¶Ù…Ø§Ù†', 's12-3': 'Ø¥Ø±Ø´Ø§Ø¯Ø§Øª Ø§Ù„Ø§Ù…ØªØ«Ø§Ù„ ÙˆØ§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ø´Ø±ÙˆØ·',
    'how-title': 'ÙƒÙŠÙ ØªØ³Ù‡Ù„ NDS Ù…Ø¹Ø§Ù…Ù„ØªÙƒØŸ', 'how-subtitle': 'Ø¢Ù…Ù†Ø© ÙˆØ³Ø±ÙŠØ¹Ø© ÙˆÙ…Ù†Ø¸Ù…Ø© ÙÙŠ 4 Ù…Ø±Ø§Ø­Ù„ Ø¨Ø³ÙŠØ·Ø©',
    'step1-title': 'ØªÙ‚Ø¯ÙŠÙ… Ø§Ù„Ø·Ù„Ø¨', 'step1-desc': 'Ø³Ø¬Ù„ ÙÙŠ Ø¨ÙˆØ§Ø¨ØªÙ†Ø§ØŒ Ø§Ø®ØªØ± Ø§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø©ØŒ ÙˆØ§Ù…Ù„Ø£ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø·Ù„Ø¨ Ù…Ø¹ Ø¥Ø±ÙØ§Ù‚ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª.',
    'step2-title': 'Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª', 'step2-desc': 'ÙŠÙ‚ÙˆÙ… Ù…Ø¯ÙŠØ±Ùˆ Ø§Ù„Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ù„Ø¯ÙŠÙ†Ø§ Ø¨Ù…Ø±Ø§Ø¬Ø¹Ø© Ù…Ø³ØªÙ†Ø¯Ø§ØªÙƒ Ù„Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ù…Ø·Ø§Ø¨Ù‚ØªÙ‡Ø§ Ù„Ù„Ø´Ø±ÙˆØ·.',
    'step3-title': 'Ø§Ù„Ø¯Ø¹Ù… ÙˆØ§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø©', 'step3-desc': 'Ù†Ù†Ø³Ù‚ Ù…Ø­Ù„ÙŠØ§Ù‹ ÙÙŠ Ù†ÙŠØ¬ÙŠØ±ÙŠØ§ Ù…Ø¹ Ø§Ù„ÙˆØ²Ø§Ø±Ø§Øª ÙˆØ§Ù„Ù‡ÙŠØ¦Ø§Øª ÙˆØ§Ù„Ø³ÙØ§Ø±Ø§Øª Ø§Ù„Ù…Ø¹Ù†ÙŠØ© Ù„Ø¥Ù†Ù‡Ø§Ø¡ Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª.',
    'step4-title': 'Ø§Ù„Ø¥Ù†Ø¬Ø§Ø² ÙˆØ§Ù„Ø§Ø³ØªÙ„Ø§Ù…', 'step4-desc': 'ØªØªØ¨Ø¹ Ù…Ø±Ø§Ø­Ù„ ØªÙ‚Ø¯Ù… Ø·Ù„Ø¨Ùƒ Ø¹Ù„Ù‰ Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ… ÙˆØ­Ù…Ù„ Ù…Ø³ØªÙ†Ø¯Ø§ØªÙƒ Ø§Ù„Ù…Ø¹ØªÙ…Ø¯Ø© ÙˆØ§Ù„Ø¬Ø§Ù‡Ø²Ø© Ø¨Ø£Ù…Ø§Ù†.',
    'legal-disclaimer-title': 'Ø¥Ø´Ø¹Ø§Ø± ÙˆØªÙ†ÙˆÙŠÙ‡ Ù‚Ø§Ù†ÙˆÙ†ÙŠ Ù‡Ø§Ù…',
    'legal-disclaimer-text': 'Ø®Ø¯Ù…Ø§Øª Ø§Ù„Ù…ØºØªØ±Ø¨ÙŠÙ† Ø§Ù„Ù†ÙŠØ¬ÙŠØ±ÙŠÙŠÙ† (NDS) Ù‡ÙŠ Ù…Ù†ØµØ© Ø¯Ø¹Ù… Ø¥Ø¯Ø§Ø±ÙŠ ÙˆØªØ®Ù„ÙŠØµ Ù…Ø¹Ø§Ù…Ù„Ø§Øª Ù…Ø³ØªÙ‚Ù„Ø©. Ù†Ø­Ù† Ù„Ø³Ù†Ø§ Ø¬Ù‡Ø© Ø­ÙƒÙˆÙ…ÙŠØ© Ø£Ùˆ Ø³ÙØ§Ø±Ø© Ø£Ùˆ Ù‡ÙŠØ¦Ø© Ø´Ø±Ø·ÙŠØ© Ø£Ùˆ ØªØ§Ø¨Ø¹Ø© Ù„Ù€ CAC Ø£Ùˆ NDLEA.',
    'apply-head': 'Ø§Ø¨Ø¯Ø£ ØªÙ‚Ø¯ÙŠÙ… Ø·Ù„Ø¨Ùƒ', 'apply-sub': 'Ø£Ø±Ø³Ù„ ØªÙØ§ØµÙŠÙ„ Ø·Ù„Ø¨Ùƒ ÙˆÙ…Ù„ÙØ§ØªÙƒ Ø¨Ø£Ù…Ø§Ù†. ÙŠØ±Ø¬Ù‰ Ø§Ù„ØªØ£ÙƒØ¯ Ù…Ù† ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø£ÙˆÙ„Ø§Ù‹.',
    'lbl-service': 'Ø§Ù„Ø®Ø¯Ù…Ø© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© *', 'lbl-contact': 'ÙˆØ³ÙŠÙ„Ø© Ø§Ù„Ø§ØªØµØ§Ù„ Ø§Ù„Ù…ÙØ¶Ù„Ø© *', 'lbl-desc': 'ØªÙØ§ØµÙŠÙ„ Ø¥Ø¶Ø§ÙÙŠØ© / Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø®Ø§ØµØ© Ø¨Ø§Ù„Ø·Ù„Ø¨',
    'lbl-files': 'Ø§Ø±ÙÙ‚ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª ÙˆØ§Ù„Ù…Ø³ÙˆØ­Ø§Øª Ø§Ù„Ø¶ÙˆØ¦ÙŠØ© Ø§Ù„Ù…Ø·Ù„ÙˆØ¨Ø© *', 'upload-click': 'Ø§Ù†Ù‚Ø± Ù„Ù„ØªØµÙØ­ ÙˆØ§Ø®ØªÙŠØ§Ø± Ø§Ù„Ù…Ù„Ù', 'btn-submit-app': 'Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨ Ø§Ù„Ø¢Ù†',
    'success-headline': 'ØªÙ… Ø§Ø³ØªÙ„Ø§Ù… Ø·Ù„Ø¨Ùƒ Ø¨Ù†Ø¬Ø§Ø­!', 'success-body': 'ØªÙ… Ø¥Ø¯Ø±Ø§Ø¬ Ø·Ù„Ø¨Ùƒ ÙÙŠ Ù†Ø¸Ø§Ù… Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© ÙˆØ³ÙŠÙ‚ÙˆÙ… ÙØ±ÙŠÙ‚Ù†Ø§ Ø¨Ù…Ø±Ø§Ø¬Ø¹ØªÙ‡ Ù‚Ø±ÙŠØ¨Ø§Ù‹. Ø§Ø­ÙØ¸ Ø±Ù‚Ù… Ø·Ù„Ø¨Ùƒ Ù„ØªØªØ¨Ø¹ Ø­Ø§Ù„ØªÙ‡.',
    'btn-track-go': 'ØªØªØ¨Ø¹ Ø­Ø§Ù„Ø© Ø§Ù„Ø·Ù„Ø¨', 'btn-portal-go': 'Ø§Ù„Ø§Ù†ØªÙ‚Ø§Ù„ Ø¥Ù„Ù‰ Ø§Ù„Ø¨ÙˆØ§Ø¨Ø©',
    'track-title': 'ØªØªØ¨Ø¹ Ø­Ø§Ù„Ø© Ø§Ù„Ø·Ù„Ø¨', 'track-desc': 'Ø£Ø¯Ø®Ù„ Ø±Ù‚Ù… Ø·Ù„Ø¨Ùƒ Ø§Ù„ÙØ±ÙŠØ¯ Ù„Ù…Ø´Ø§Ù‡Ø¯Ø© Ù…Ø±Ø§Ø­Ù„ Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø© ÙˆØ§Ù„ØªÙ‚Ø¯Ù… Ù…Ø¨Ø§Ø´Ø±Ø©',
    'btn-track-search': 'Ø¨Ø­Ø«', 'st-rec': 'ØªÙ… Ø§Ù„Ø§Ø³ØªÙ„Ø§Ù…', 'st-rev': 'ØªØ­Øª Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©', 'st-doc': 'Ù…Ø³ØªÙ†Ø¯Ø§Øª Ù…Ø·Ù„ÙˆØ¨Ø©', 'st-proc': 'Ù‚ÙŠØ¯ Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø©', 'st-comp': 'Ù…ÙƒØªÙ…Ù„',
    'chat-history-title': 'Ø³Ø¬Ù„ Ù…Ø±Ø§Ø³Ù„Ø§Øª Ø§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†ÙŠ', 'track-error-text': 'Ù„Ù… Ù†Ø¬Ø¯ Ø£ÙŠ Ø·Ù„Ø¨ Ù…Ø·Ø§Ø¨Ù‚ Ù„Ù„Ø±Ù‚Ù… Ø§Ù„Ù…Ø¯Ø®Ù„. ÙŠØ±Ø¬Ù‰ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªØ­Ù‚Ù‚.',
    'faq-title': 'Ø§Ù„Ø£Ø³Ø¦Ù„Ø© Ø§Ù„Ø´Ø§Ø¦Ø¹Ø©', 'faq-subtitle': 'Ø¥Ø¬Ø§Ø¨Ø§Øª ÙˆØªÙˆØ¶ÙŠØ­Ø§Øª Ù…ÙØµÙ„Ø© Ø­ÙˆÙ„ Ø®Ø¯Ù…Ø§ØªÙ†Ø§ ÙˆØ¢Ù„ÙŠØ§Øª Ø§Ù„Ø¹Ù…Ù„',
    'faq-q1': 'Ù…Ù† ÙŠÙ…ÙƒÙ†Ù‡ Ø§Ù„Ø§Ø³ØªÙØ§Ø¯Ø© Ù…Ù† Ø®Ø¯Ù…Ø§Øª NDSØŸ', 'faq-a1': 'Ø£ÙŠ Ù…ÙˆØ§Ø·Ù† Ù†ÙŠØ¬ÙŠØ±ÙŠ Ø£Ùˆ ØµØ§Ø­Ø¨ Ø¹Ù…Ù„ ÙŠÙ‚ÙŠÙ… Ø®Ø§Ø±Ø¬ Ù†ÙŠØ¬ÙŠØ±ÙŠØ§ (Ø§Ù„Ù…ØºØªØ±Ø¨ÙˆÙ†) ÙˆÙŠØ­ØªØ§Ø¬ Ø¥Ù„Ù‰ Ø¯Ø¹Ù… Ø§Ø­ØªØ±Ø§ÙÙŠ Ù„Ø¥Ù†Ø¬Ø§Ø² Ù…Ø¹Ø§Ù…Ù„Ø§ØªÙ‡ Ø§Ù„Ø±Ø³Ù…ÙŠØ© ÙÙŠ Ù†ÙŠØ¬ÙŠØ±ÙŠØ§.',
    'faq-q2': 'Ù‡Ù„ ÙŠÙ…ÙƒÙ†Ù†ÙŠ Ø§Ù„ØªÙ‚Ø¯ÙŠÙ… Ø¨Ø§Ù„ÙƒØ§Ù…Ù„ Ù…Ù† Ø®Ø§Ø±Ø¬ Ù†ÙŠØ¬ÙŠØ±ÙŠØ§ØŸ', 'faq-a2': 'Ù†Ø¹Ù… Ø¨Ø§Ù„ØªØ£ÙƒÙŠØ¯! Ø§Ù„Ù‡Ø¯Ù Ø§Ù„Ø£Ø³Ø§Ø³ÙŠ Ù‡Ùˆ ØªÙ…ÙƒÙŠÙ† Ø§Ù„Ù…ØºØªØ±Ø¨ÙŠÙ† Ù…Ù† Ø¥Ø±Ø³Ø§Ù„ Ù…Ø³ØªÙ†Ø¯Ø§ØªÙ‡Ù… ÙˆØªØªØ¨Ø¹ Ø·Ù„Ø¨Ø§ØªÙ‡Ù… ÙˆØ§Ø³ØªÙ„Ø§Ù… Ø£ÙˆØ±Ø§Ù‚Ù‡Ù… Ø§Ù„Ø±Ø³Ù…ÙŠØ© Ø¯ÙˆÙ† Ø§Ù„Ø­Ø§Ø¬Ø© Ù„Ù„Ø³ÙØ±.',
    'faq-q3': 'ÙƒÙŠÙ ÙŠÙ…ÙƒÙ†Ù†ÙŠ ØªØªØ¨Ø¹ Ø·Ù„Ø¨ÙŠØŸ', 'faq-a3': 'Ø¨Ø¹Ø¯ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø·Ù„Ø¨ØŒ Ø³ØªØ­ØµÙ„ Ø¹Ù„Ù‰ Ø±Ù‚Ù… ØªØªØ¨Ø¹ ÙØ±ÙŠØ¯ (Ù…Ø«Ø§Ù„ NDS-2026-102948) ÙŠÙ…ÙƒÙ†Ùƒ Ø§Ø³ØªØ®Ø¯Ø§Ù…Ù‡ ÙÙŠ ØµÙØ­Ø© Ø§Ù„ØªØªØ¨Ø¹ Ù„Ù…Ø´Ø§Ù‡Ø¯Ø© Ø§Ù„ØªÙ‚Ø¯Ù….',
    'faq-q4': 'Ù‡Ù„ Ø£Ù†ØªÙ… Ø¬Ù‡Ø© Ø­ÙƒÙˆÙ…ÙŠØ© Ø±Ø³Ù…ÙŠØ©ØŸ', 'faq-a4': 'Ù„Ø§. Ù†Ø­Ù† Ø´Ø¨ÙƒØ© Ø§Ø³ØªØ´Ø§Ø±ÙŠØ© ÙˆØ®Ø¯Ù…ÙŠØ© Ø®Ø§ØµØ©. Ù†ØªÙ‚Ø§Ø¶Ù‰ Ø±Ø³ÙˆÙ…Ø§Ù‹ Ø¥Ø¯Ø§Ø±ÙŠØ© Ù„ØªØºØ·ÙŠØ© Ù†ÙÙ‚Ø§Øª Ø§Ù„Ù…ØªØ§Ø¨Ø¹Ø© ÙˆØ§Ù„ØªØ¬Ù‡ÙŠØ² ÙˆØ§Ù„Ù…Ø±Ø§Ø³Ù„Ø§Øª Ù…Ø¹ Ø§Ù„Ù‡ÙŠØ¦Ø§Øª Ø§Ù„Ø­ÙƒÙˆÙ…ÙŠØ© ÙÙŠ Ù†ÙŠØ¬ÙŠØ±ÙŠØ§.',
    'contact-head': 'Ø§ØªØµÙ„ Ø¨Ù†Ø§', 'contact-sub': 'Ù„Ø¯ÙŠÙƒ Ø§Ø³ØªÙØ³Ø§Ø± Ø¹Ø§Ø¬Ù„ØŸ ØªÙˆØ§ØµÙ„ Ù…Ø¹ Ù…ÙƒØªØ¨ Ø§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†ÙŠ Ù„Ø¯ÙŠÙ†Ø§ ÙÙˆØ±Ø§Ù‹.',
    'c-head-office': 'Ø§Ù„Ù…ÙƒØªØ¨ Ø§Ù„Ø±Ø¦ÙŠØ³ÙŠ', 'c-branch-office': 'Ø§Ù„Ù…ÙƒØªØ¨ Ø§Ù„ÙØ±Ø¹ÙŠ', 'c-send-msg': 'Ø£Ø±Ø³Ù„ Ù„Ù†Ø§ Ø§Ø³ØªÙØ³Ø§Ø±Ø§Ù‹'
  },
  fr: { // French Translations
    'nav-home': 'Accueil', 'nav-about': 'Ã€ Propos', 'nav-services': 'Services', 'nav-how': 'Comment Ã§a Marche',
    'nav-track': 'Suivre Demande', 'nav-faq': 'FAQ', 'nav-contact': 'Contactez-nous', 'nav-login': 'Se Connecter',
    'nav-portal': 'Mon Portail', 'hero-title': 'SERVICES DIASPORA DU NIGERIA',
    'hero-subtitle': 'Assistant de traitement des documents et services de soutien Ã  la diaspora',
    'hero-desc': 'Soutien professionnel, sÃ©curisÃ© et fiable pour les NigÃ©rians de la diaspora avec les demandes, l\'authentification, la vÃ©rification et les documents administratifs essentiels au pays.',
    'btn-apply-service': 'Postulez Maintenant', 'btn-contact-us': 'Contactez-nous', 'btn-apply-short': 'Postuler',
    'stat-pass': 'Support Passeport', 'stat-pass-desc': 'Renouvellement de passeports et conseils pour les nouvelles demandes.',
    'stat-nin': 'Support NIN & BVN', 'stat-nin-desc': 'VÃ©rification, corrections et soutien au registre national.',
    'stat-cac': 'Enregistrements CAC', 'stat-cac-desc': 'Enregistrer des entreprises et dÃ©pÃ´t de documents corporatifs.',
    'stat-auth': 'LÃ©galisation MOFA',
    'about-title': 'Ã€ Propos de Nigeria Diaspora Services (NDS)',
    'about-intro': 'Nigeria Diaspora Services (NDS) est un assistant documentaire indÃ©pendant engagÃ© Ã  soutenir les NigÃ©rians vivant Ã  l\'Ã©tranger.',
    'about-desc1': 'GÃ©rer les dÃ©marches administratives gouvernementales depuis un autre pays peut Ãªtre stressant. Notre rÃ©seau professionnel au Nigeria coordonne la validation et l\'authentification en votre nom en toute sÃ©curitÃ©.',
    'vision-title': 'Notre Vision', 'vision-text': 'Devenir la plateforme d\'assistance documentaire et de soutien Ã  la diaspora la plus fiable reliant les NigÃ©rians du monde entier.',
    'mission-title': 'Notre Mission', 'mission-text': 'Fournir une assistance et un soutien professionnels, transparents et fiables aux NigÃ©rians de la diaspora.',
    'why-choose-title': 'Pourquoi Nous Choisir?',
    'wc-1': 'Assistance de VÃ©rification Professionnelle', 'wc-2': 'ConÃ§u SpÃ©cifiquement pour la Diaspora',
    'wc-3': 'Suivi des Demandes et Mises Ã  Jour en Direct', 'wc-4': 'Stockage Cloud SÃ©curisÃ© pour vos Documents',
    'wc-5': 'Portail Client DÃ©diÃ© et Messagerie de Support',
    'metric-accuracy': 'PrÃ©cision & LÃ©gitimitÃ©', 'metric-satisfaction': 'Satisfaction Client', 'metric-security': 'SÃ©curitÃ© Documentaire',
    'services-title': 'Nos Services Professionnels', 'services-subtitle': 'DÃ©couvrez nos services d\'aide au traitement des documents officiels',
    's1-title': '1. Services de Passeport NigÃ©rian', 's1-1': 'Aide au Renouvellement de Passeport', 's1-2': 'Assistance pour Nouveau Passeport', 's1-3': 'Soutien aux Documents de Passeport',
    's2-title': '2. NumÃ©ro d\'Identification National (NIN)', 's2-1': 'Assistance au Traitement du NIN', 's2-2': 'Soutien Ã  la VÃ©rification du NIN', 's2-3': 'Conseils de Correction du NIN',
    's3-title': '3. NumÃ©ro de VÃ©rification Bancaire (BVN)', 's3-1': 'Assistance au Traitement du BVN', 's3-2': 'Mise Ã  Jour et VÃ©rification du BVN',
    's4-title': '4. Certificat de Casier Judiciaire', 's4-1': 'Assistance Ã  la Demande', 's4-2': 'Support Documentaire', 's4-3': 'Conseils de Traitement',
    's5-title': '5. Certificat NDLEA', 's5-1': 'Assistance Ã  la Demande', 's5-2': 'Soutien au Traitement', 's5-3': 'Conseils Documentaires',
    's6-title': '6. Services CAC pour Entreprises', 's6-1': 'Aide Ã  l\'Enregistrement du Nom Commercial', 's6-2': 'Assistance Ã  la CrÃ©ation d\'Entreprise', 's6-3': 'Support aux Documents Corporatifs CAC',
    's7-title': '7. LÃ©galisation de Documents MOFA', 's7-1': 'Assistance MinistÃ¨re des Affaires Ã‰trangÃ¨res', 's7-2': 'Authentification et LÃ©galisation de Documents', 's7-3': 'Conseils de VÃ©rification et Traitement',
    's8-title': '8. Authentification Ambassade Ã‰trangÃ¨re', 's8-1': 'Aide Ã  l\'Authentification par l\'Ambassade', 's8-2': 'Support pour la Soumission des Documents', 's8-3': 'Conseils de Traitement',
    's9-title': '9. Support Ambassades & Consulats', 's9-1': 'Coordination avec l\'Ambassade du Nigeria', 's9-2': 'Assistance Documentaire Consulaire', 's9-3': 'Conseils de Rendez-vous et Services',
    's10-title': '10. Documents DÃ©livrÃ©s par le Tribunal', 's10-1': 'Aide pour Affidavits et Certifications de Tribunal', 's10-2': 'Soutien Ã  la Demande et VÃ©rification', 's10-3': 'Conseils pour Documents Juridiques',
    's11-title': '11. Assistance aux Contrats Commerciaux', 's11-1': 'PrÃ©paration et RÃ©daction de Contrats Commerciaux', 's11-2': 'Assistance pour la RÃ©daction d\'Accords', 's11-3': 'Support aux Documents d\'Affaires Locaux',
    's12-title': '12. Services du Travail & Agences', 's12-1': 'Assistance Documentaire du Travail', 's12-2': 'Support au Registre de l\'Emploi', 's12-3': 'Conseils de ConformitÃ© et VÃ©rifications',
    'how-title': 'Comment NDS Simplifie les DÃ©marches', 'how-subtitle': 'SÃ©curisÃ©, rapide et structurÃ© en 4 Ã©tapes simples',
    'step1-title': 'Soumettre la Demande', 'step1-desc': 'Inscrivez-vous sur notre portail, choisissez votre service, remplissez les dÃ©tails et joignez vos documents.',
    'step2-title': 'Examen des Documents', 'step2-desc': 'Nos gestionnaires examinent vos informations pour vÃ©rifier la conformitÃ© avec les exigences.',
    'step3-title': 'Traitement & Suivi', 'step3-desc': 'Nous coordonnons localement au Nigeria avec les ministÃ¨res, registres ou consulats pour finaliser.',
    'step4-title': 'Finalisation & Livraison', 'step4-desc': 'Suivez l\'avancement sur votre tracker et tÃ©lÃ©chargez vos documents authentiques en toute sÃ©curitÃ©.',
    'legal-disclaimer-title': 'DISCLAIMER & MENTION LÃ‰GALE IMPORTANTE',
    'legal-disclaimer-text': 'Nigeria Diaspora Services (NDS) est un prestataire de services d\'assistance administrative indÃ©pendant. Nous ne sommes pas une agence gouvernementale, ambassade ou affiliÃ© du CAC ou NDLEA.',
    'apply-head': 'Commencer Votre Demande', 'apply-sub': 'Soumettez vos dÃ©tails et documents de support. Assurez-vous de vous connecter d\'abord.',
    'lbl-service': 'Service Requis *', 'lbl-contact': 'Mode de Contact PrÃ©fÃ©rÃ© *', 'lbl-desc': 'DÃ©tails SupplÃ©mentaires / SpÃ©cificitÃ©s',
    'lbl-files': 'TÃ©lÃ©charger les Documents / Scans Requis *', 'upload-click': 'Cliquez pour parcourir les fichiers', 'btn-submit-app': 'Soumettre la Demande',
    'success-headline': 'Soumission ReÃ§ue!', 'success-body': 'Votre demande est en cours de traitement. Conservez votre numÃ©ro de rÃ©fÃ©rence pour suivre les Ã©tapes.',
    'btn-track-go': 'Suivre la Demande', 'btn-portal-go': 'Aller au Portail',
    'track-title': 'Suivi de la Demande', 'track-desc': 'Saisissez votre numÃ©ro de rÃ©fÃ©rence unique pour suivre l\'Ã©tat en direct',
    'btn-track-search': 'Rechercher', 'st-rec': 'ReÃ§ue', 'st-rev': 'En Examen', 'st-doc': 'Documents Requis', 'st-proc': 'En Traitement', 'st-comp': 'ComplÃ©tÃ©e',
    'chat-history-title': 'Messagerie de Support avec l\'Admin', 'track-error-text': 'Aucun dossier ne correspond Ã  cette rÃ©fÃ©rence. Veuillez vÃ©rifier la saisie.',
    'faq-title': 'Foire Aux Questions', 'faq-subtitle': 'Explications claires sur nos services, logistique et compÃ©tences',
    'faq-q1': 'Qui peut utiliser Nigeria Diaspora Services?', 'faq-a1': 'Tout citoyen ou entrepreneur nigÃ©rian rÃ©sidant Ã  l\'Ã©tranger (Diaspora) ayant besoin d\'un soutien professionnel pour traiter des documents administratifs au Nigeria.',
    'faq-q2': 'Puis-je postuler entiÃ¨rement depuis l\'Ã©tranger?', 'faq-a2': 'Oui! Notre but principal est de vous permettre de soumettre vos scans, suivre la progression et recevoir vos documents sans avoir Ã  vous dÃ©placer.',
    'faq-q3': 'Comment suivre mon dossier?', 'faq-a3': 'AprÃ¨s soumission, vous recevez une rÃ©fÃ©rence (ex: NDS-2026-102948) que vous pouvez saisir Ã  tout moment dans l\'onglet \'Suivre Demande\'.',
    'faq-q4': 'ÃŠtes-vous une agence gouvernementale?', 'faq-a4': 'Non. NDS est un rÃ©seau d\'assistance privÃ©. Nous facturons des frais de gestion pour la compilation, le dÃ©pÃ´t et le suivi auprÃ¨s des ministÃ¨res.',
    'contact-head': 'Contactez-nous', 'contact-sub': 'Une question urgente? Contactez notre Ã©quipe d\'assistance directement.',
    'c-head-office': 'SiÃ¨ge Social', 'c-branch-office': 'Bureau Local', 'c-send-msg': 'Envoyer un Message'
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
    btn.classList.add('auth-active');
    portalLink.style.display = 'flex';
    
    // Check if admin
    if (currentUser.isAdmin) {
      btn.classList.add('btn-admin');
      btn.innerHTML = `<i class="fa-solid fa-user-shield"></i> <span class="auth-btn-label">Admin</span>`;
      btn.onclick = () => { window.location.hash = '#admin-dashboard'; };
    } else {
      btn.classList.remove('btn-admin');
      btn.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> <span class="auth-btn-label">Sign Out</span>`;
      btn.onclick = handleLogout;
    }
    
    document.getElementById('apply-auth-alert').style.display = 'none';
    document.getElementById('apply-form').style.display = 'block';
  } else {
    btn.classList.remove('auth-active', 'btn-admin');
    btn.innerHTML = `<i class="fa-solid fa-user-circle"></i> <span class="auth-btn-label" data-key="nav-login">Sign In</span>`;
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
    const res = await fetch(API.login, {
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
    const res = await fetch(API.register, {
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
      const uploadRes = await fetch(API.upload, {
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

    const res = await fetch(API.appCreate, {
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
    const res = await fetch(API.appTrack + `?ref=${ref}`);
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
    const res = await fetch(API.appMessage, {
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
    const res = await fetch(API.appList, {
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
      applyCustomStats();
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
    applyCustomStats();

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
    const res = await fetch(API.adminDash, {
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

    // Also sync Activities tab stats
    if (document.getElementById('act-stat-total')) {
      document.getElementById('act-stat-total').innerText = data.stats.total;
      document.getElementById('act-stat-new').innerText = data.stats.new;
      document.getElementById('act-stat-processing').innerText = data.stats.processing;
      const completed = data.applications.filter(a => a.status === 'Completed').length;
      document.getElementById('act-stat-completed').innerText = completed;
      applyCustomStats();
    }

    // Render activity feed from localStorage
    renderActivityFeed();

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

function switchAdminTab(tab, btn) {
  document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));

  const tabEl = document.getElementById('admin-tab-' + tab);
  if (tabEl) tabEl.classList.add('active');

  // Use passed button element, fallback to finding by data
  if (btn) {
    btn.classList.add('active');
  } else {
    // fallback: find by matching onclick
    document.querySelectorAll('.admin-tab-btn').forEach(b => {
      if (b.getAttribute('onclick') && b.getAttribute('onclick').includes("'" + tab + "'")) {
        b.classList.add('active');
      }
    });
  }

  // Load adjustment log when switching to activities tab
  if (tab === 'activities') {
    renderActivityFeed();
    renderAdjLog();
  }
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
    const res = await fetch(API.adminUpdate, {
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


// ==========================================================================
// ADMIN ACTIVITIES PANEL FUNCTIONS
// ==========================================================================

// Manual case count adjustment
function adjustCaseCount(direction) {
  const category = document.getElementById('adj-category').value;
  const amount = parseInt(document.getElementById('adj-amount').value) || 1;
  const reason = document.getElementById('adj-reason').value.trim() || 'Manual adjustment';
  const delta = direction * amount;

  // Update displayed stat
  const idMap = { total: 'act-stat-total', new: 'act-stat-new', processing: 'act-stat-processing', completed: 'act-stat-completed' };
  const labelMap = { total: 'Total Submissions', new: 'New / Received', processing: 'Processing Cases', completed: 'Completed' };
  const el = document.getElementById(idMap[category]);
  if (el) {
    let current = parseInt(el.innerText) || 0;
    current = Math.max(0, current + delta);
    el.innerText = current;
  }

  // Store adjustment log
  const logs = JSON.parse(localStorage.getItem('nds_adj_logs') || '[]');
  logs.unshift({
    id: Date.now(),
    category: labelMap[category],
    delta,
    reason,
    at: new Date().toLocaleString()
  });
  if (logs.length > 20) logs.pop(); // keep last 20
  localStorage.setItem('nds_adj_logs', JSON.stringify(logs));

  renderAdjLog();
  showToast(`${direction > 0 ? 'Added' : 'Removed'} ${amount} from ${labelMap[category]}`);

  // Also auto-post an activity entry
  const activities = JSON.parse(localStorage.getItem('nds_admin_activities') || '[]');
  activities.unshift({
    id: Date.now(),
    type: direction > 0 ? 'Case Added' : 'Case Closed',
    title: `${direction > 0 ? '+' : '-'}${amount} case(s) â€” ${labelMap[category]}`,
    body: reason,
    date: new Date().toISOString().split('T')[0],
    postedAt: new Date().toLocaleString()
  });
  localStorage.setItem('nds_admin_activities', JSON.stringify(activities));
  renderActivityFeed();
}

function renderAdjLog() {
  const el = document.getElementById('adj-log-list');
  if (!el) return;
  const logs = JSON.parse(localStorage.getItem('nds_adj_logs') || '[]');
  if (logs.length === 0) { el.innerHTML = ''; return; }
  el.innerHTML = logs.map(l => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 8px;border-radius:6px;background:${l.delta>0?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)'};margin-bottom:4px;font-size:12px;">
      <span style="color:${l.delta>0?'#059669':'#dc2626'};font-weight:700;">${l.delta>0?'+':''}${l.delta} ${l.category}</span>
      <span style="color:var(--text-dimmed);">${l.reason}</span>
      <span style="color:var(--text-dimmed);font-size:10px;">${l.at}</span>
    </div>
  `).join('');
}

function handleAddActivity(event) {
  event.preventDefault();
  const type = document.getElementById('act-type').value;
  const title = document.getElementById('act-title').value.trim();
  const body = document.getElementById('act-body').value.trim();
  const date = document.getElementById('act-date').value;

  if (!type || !title || !body) {
    showToast('Please fill all required fields.', 'danger');
    return;
  }

  const activities = JSON.parse(localStorage.getItem('nds_admin_activities') || '[]');
  const newActivity = {
    id: Date.now(),
    type,
    title,
    body,
    date: date || new Date().toISOString().split('T')[0],
    postedAt: new Date().toLocaleString()
  };
  activities.unshift(newActivity); // newest first
  localStorage.setItem('nds_admin_activities', JSON.stringify(activities));

  document.getElementById('add-activity-form').reset();
  renderActivityFeed();
  showToast('Activity posted successfully!');
}

function renderActivityFeed() {
  const feed = document.getElementById('admin-activity-feed');
  if (!feed) return;

  const activities = JSON.parse(localStorage.getItem('nds_admin_activities') || '[]');

  // Update feed count badge
  const countBadge = document.getElementById('act-feed-count');
  if (countBadge) countBadge.innerText = activities.length > 0 ? `(${activities.length})` : '';

  if (activities.length === 0) {
    feed.innerHTML = '<p class="text-dimmed text-sm text-center" style="padding:20px 0;">No activities posted yet. Use the form above to add one.</p>';
    renderAdjLog();
    return;
  }

  const typeColorMap = {
    'Announcement': '#2563eb',
    'Update': '#7c3aed',
    'Milestone': '#d97706',
    'Alert': '#dc2626',
    'Notice': '#059669',
    'Case Added': '#059669',
    'Case Closed': '#0ea5e9'
  };

  feed.innerHTML = activities.map(act => {
    const color = typeColorMap[act.type] || 'var(--accent)';
    return `
      <div class="activity-feed-item glass-panel" style="padding:14px 16px; margin-bottom:12px; border-left:4px solid ${color}; border-radius:var(--border-radius-md); position:relative;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
          <div>
            <span style="display:inline-block; background:${color}22; color:${color}; border:1px solid ${color}44; border-radius:20px; font-size:11px; font-weight:700; padding:2px 10px; margin-bottom:4px;">${act.type}</span>
            <h5 style="font-size:14px; font-weight:700; color:var(--text-primary); margin:0;">${act.title}</h5>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <span style="font-size:11px; color:var(--text-dimmed);">ðŸ“… ${act.date}</span>
            <button onclick="deleteActivity(${act.id})" style="background:none; border:none; color:var(--text-dimmed); cursor:pointer; font-size:13px;" title="Delete"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>
        <p style="font-size:13px; color:var(--text-secondary); line-height:1.5; margin:0;">${act.body}</p>
        <p style="font-size:11px; color:var(--text-dimmed); margin-top:6px; margin-bottom:0;">Posted: ${act.postedAt}</p>
      </div>
    `;
  }).join('');
}

function deleteActivity(id) {
  let activities = JSON.parse(localStorage.getItem('nds_admin_activities') || '[]');
  activities = activities.filter(a => a.id !== id);
  localStorage.setItem('nds_admin_activities', JSON.stringify(activities));
  renderActivityFeed();
  showToast('Activity removed.');
}

function clearAllActivities() {
  if (!confirm('Are you sure you want to clear all activities? This cannot be undone.')) return;
  localStorage.removeItem('nds_admin_activities');
  localStorage.removeItem('nds_adj_logs');
  renderActivityFeed();
  renderAdjLog();
  showToast('All activities and logs cleared.');
}

// ==========================================================================
// CUSTOM TOTAL APPLICATIONS EDIT CONTROLS
// ==========================================================================
function applyCustomStats() {
  const customTotal = localStorage.getItem('nds_custom_total_applications');
  if (customTotal !== null) {
    const el = document.getElementById('portal-stat-total');
    if (el) el.innerText = customTotal;
    const actEl = document.getElementById('act-stat-total');
    if (actEl) actEl.innerText = customTotal;
    const adminStatEl = document.getElementById('admin-stat-total');
    if (adminStatEl) adminStatEl.innerText = customTotal;
  }
}

function toggleEditTotalApps() {
  const form = document.getElementById('edit-total-apps-form');
  const btn = document.getElementById('btn-toggle-edit-stat');
  const input = document.getElementById('input-custom-total-apps');
  if (!form) return;
  const isHidden = form.style.display === 'none' || !form.style.display;
  form.style.display = isHidden ? 'block' : 'none';
  if (btn) {
    btn.innerHTML = isHidden ? '<i class="fa-solid fa-xmark"></i> Close' : '<i class="fa-solid fa-pen"></i> Edit Count';
  }
  if (isHidden && input) {
    const current = document.getElementById('portal-stat-total');
    input.value = current ? current.innerText.trim() : '20';
    input.focus();
  }
}

function saveCustomTotalApps() {
  const input = document.getElementById('input-custom-total-apps');
  if (!input) return;
  const val = parseInt(input.value);
  if (isNaN(val) || val < 0) {
    showToast('Please enter a valid positive number.', 'danger');
    return;
  }
  localStorage.setItem('nds_custom_total_applications', val.toString());
  applyCustomStats();
  toggleEditTotalApps();
  showToast(`Total Applications counter set to ${val}!`);
}

function resetCustomTotalApps() {
  localStorage.removeItem('nds_custom_total_applications');
  if (window.location.hash.includes('portal')) {
    loadCustomerPortal();
  } else if (window.location.hash.includes('admin')) {
    loadAdminDashboard();
  } else {
    applyCustomStats();
  }
  toggleEditTotalApps();
  showToast('Total Applications counter reset to live database count.');
}

// App Initialization
window.addEventListener('hashchange', routeApp);
window.addEventListener('DOMContentLoaded', () => {
  routeApp();
  syncSessionUI();
  initTheme();
  renderActivityFeed();
  renderAdjLog();
  applyCustomStats();
});


