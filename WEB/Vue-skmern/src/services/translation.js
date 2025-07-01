import { reactive } from 'vue'

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    profile: 'Profil',
    contact: 'Contact',
    
    // Page d'accueil
    welcome: 'Bienvenue sur SKMERN',
    subtitle: 'Mise en relation entre clients et techniciens',
    findTechnician: 'Trouvez votre technicien',
    searchPlaceholder: 'Rechercher un technicien (ex: plombier, électricien...)',
    searchButton: 'Rechercher',
    categories: 'Catégories',
    
    // Catégories de techniciens
    plumber: 'Plombier',
    electrician: 'Électricien',
    carpenter: 'Menuisier',
    mechanic: 'Mécanicien',
    painter: 'Peintre',
    gardener: 'Jardinier',
    
    // Formulaires
    email: 'Email',
    password: 'Mot de passe',
    firstName: 'Prénom',
    lastName: 'Nom',
    phone: 'Téléphone',
    
    // Messages
    welcomeUser: 'Bienvenue',
    noTechniciansFound: 'Aucun technicien trouvé',
    loading: 'Chargement...',
    searchResults: 'Résultats de recherche',
    techniciansCount: 'techniciens',
    contactAction: 'Contacter',
    
    // Footer
    copyright: '© 2024 SKMERN. Système de mise en relation complet.',
    
    // Slider
    slider1Title: 'Des Professionnels Qualifiés',
    slider1Desc: 'Trouvez les meilleurs techniciens près de chez vous',
    slider2Title: 'Service de Qualité',
    slider2Desc: 'Des interventions rapides et efficaces',
    slider3Title: 'Confiance et Sécurité',
    slider3Desc: 'Tous nos techniciens sont vérifiés et assurés',
    
    // Page Contact
    contactTitle: 'Contactez-nous',
    contactSubtitle: 'Nous sommes là pour vous accompagner dans tous vos projets',
    sendMessage: 'Envoyer un message',
    contactDescription: 'Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les plus brefs délais.',
    firstNamePlaceholder: 'Votre prénom',
    lastNamePlaceholder: 'Votre nom',
    emailPlaceholder: 'votre@email.com',
    phonePlaceholder: '+33 1 23 45 67 89',
    subject: 'Sujet',
    selectSubject: 'Sélectionnez un sujet',
    cleaning: 'Service de ménage',
    gardening: 'Jardinage',
    repair: 'Réparation',
    other: 'Autre',
    message: 'Message',
    messagePlaceholder: 'Décrivez votre demande en détail...',
    sending: 'Envoi en cours...',
    messageSent: 'Message envoyé avec succès !',
    messageError: 'Erreur lors de l\'envoi du message',
    contactInfo: 'Nos coordonnées',
    address: 'Adresse',
    hours: 'Horaires',
    workingHours: 'Lun-Ven : 9h-18h\nSam : 9h-12h',
    followUs: 'Suivez-nous',
    
    // Footer Ultra-Professionnel
    companyTagline: 'Innovation & Excellence',
    companyDescription: 'Plateforme leader connectant clients et professionnels qualifiés pour tous vos besoins quotidiens. Service de qualité, sécurité et confiance garantis.',
    happyClients: 'Clients Satisfaits',
    yearsExperience: 'Années d\'Expérience',
    support: 'Support',
    ourServices: 'Nos Services',
    maintenance: 'Maintenance',
    consulting: 'Conseil',
    quickLinks: 'Liens Rapides',
    about: 'À Propos',
    privacy: 'Confidentialité',
    terms: 'Conditions d\'Utilisation',
    faq: 'FAQ',
    stayConnected: 'Restez Connecté',
    newsletter: 'Newsletter',
    allRightsReserved: 'Tous droits réservés.',
    madeWith: 'Créé avec',
    inParis: 'à Paris',
    certified: 'Certifié',
    secure: 'Sécurisé',
    verified: 'Vérifié'
  },
  
  en: {
    // Navigation
    home: 'Home',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    contact: 'Contact',
    
    // Page d'accueil
    welcome: 'Welcome to SKMERN',
    subtitle: 'Connecting clients and technicians',
    findTechnician: 'Find your technician',
    searchPlaceholder: 'Search for a technician (ex: plumber, electrician...)',
    searchButton: 'Search',
    categories: 'Categories',
    
    // Catégories de techniciens
    plumber: 'Plumber',
    electrician: 'Electrician',
    carpenter: 'Carpenter',
    mechanic: 'Mechanic',
    painter: 'Painter',
    gardener: 'Gardener',
    
    // Formulaires
    email: 'Email',
    password: 'Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    
    // Messages
    welcomeUser: 'Welcome',
    noTechniciansFound: 'No technicians found',
    loading: 'Loading...',
    searchResults: 'Search Results',
    techniciansCount: 'technicians',
    contactAction: 'Contact',
    
    // Footer
    copyright: '© 2024 SKMERN. Complete connection system.',
    
    // Slider
    slider1Title: 'Qualified Professionals',
    slider1Desc: 'Find the best technicians near you',
    slider2Title: 'Quality Service',
    slider2Desc: 'Fast and efficient interventions',
    slider3Title: 'Trust and Security',
    slider3Desc: 'All our technicians are verified and insured',
    
    // Contact Page
    contactTitle: 'Contact Us',
    contactSubtitle: 'We\'re here to support you in all your projects',
    sendMessage: 'Send Message',
    contactDescription: 'Fill out the form below and our team will get back to you as soon as possible.',
    firstNamePlaceholder: 'Your first name',
    lastNamePlaceholder: 'Your last name',
    emailPlaceholder: 'your@email.com',
    phonePlaceholder: '+1 234 567 8900',
    subject: 'Subject',
    selectSubject: 'Select a subject',
    cleaning: 'Cleaning Service',
    gardening: 'Gardening',
    repair: 'Repair',
    other: 'Other',
    message: 'Message',
    messagePlaceholder: 'Describe your request in detail...',
    sending: 'Sending...',
    messageSent: 'Message sent successfully!',
    messageError: 'Error sending message',
    contactInfo: 'Contact Information',
    address: 'Address',
    hours: 'Hours',
    workingHours: 'Mon-Fri: 9am-6pm\nSat: 9am-12pm',
    followUs: 'Follow Us',
    
    // Footer Ultra-Professionnel
    companyTagline: 'Innovation & Excellence',
    companyDescription: 'Leading platform connecting clients with qualified professionals for all your daily needs. Quality service, security and trust guaranteed.',
    happyClients: 'Happy Clients',
    yearsExperience: 'Years Experience',
    support: 'Support',
    ourServices: 'Our Services',
    maintenance: 'Maintenance',
    consulting: 'Consulting',
    quickLinks: 'Quick Links',
    about: 'About Us',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    faq: 'FAQ',
    stayConnected: 'Stay Connected',
    newsletter: 'Newsletter',
    allRightsReserved: 'All rights reserved.',
    madeWith: 'Made with',
    inParis: 'in Paris',
    certified: 'Certified',
    secure: 'Secure',
    verified: 'Verified'
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',
    contact: 'اتصل بنا',
    
    // Page d'accueil
    welcome: 'مرحباً بكم في SKMERN',
    subtitle: 'ربط العملاء بالفنيين',
    findTechnician: 'اعثر على الفني المناسب',
    searchPlaceholder: 'البحث عن فني (مثال: سباك، كهربائي...)',
    searchButton: 'بحث',
    categories: 'الفئات',
    
    // Catégories de techniciens
    plumber: 'سباك',
    electrician: 'كهربائي',
    carpenter: 'نجار',
    mechanic: 'ميكانيكي',
    painter: 'دهان',
    gardener: 'بستاني',
    
    // Formulaires
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    phone: 'الهاتف',
    
    // Messages
    welcomeUser: 'مرحباً',
    noTechniciansFound: 'لم يتم العثور على فنيين',
    loading: 'جاري التحميل...',
    searchResults: 'نتائج البحث',
    techniciansCount: 'فنيين',
    contactAction: 'تواصل',
    
    // Footer
    copyright: '© 2024 SKMERN. نظام ربط شامل.',
    
    // صفحة الاتصال
    contactTitle: 'اتصل بنا',
    contactSubtitle: 'نحن هنا لدعمكم في جميع مشاريعكم',
    sendMessage: 'إرسال رسالة',
    contactDescription: 'املأ النموذج أدناه وسيتواصل معك فريقنا في أقرب وقت ممكن.',
    firstNamePlaceholder: 'الاسم الأول',
    lastNamePlaceholder: 'اسم العائلة',
    emailPlaceholder: 'your@email.com',
    phonePlaceholder: '+966 50 123 4567',
    subject: 'الموضوع',
    selectSubject: 'اختر موضوعاً',
    cleaning: 'خدمة التنظيف',
    gardening: 'البستنة',
    repair: 'الإصلاح',
    other: 'أخرى',
    message: 'الرسالة',
    messagePlaceholder: 'صف طلبك بالتفصيل...',
    sending: 'جاري الإرسال...',
    messageSent: 'تم إرسال الرسالة بنجاح!',
    messageError: 'خطأ في إرسال الرسالة',
    contactInfo: 'معلومات الاتصال',
    address: 'العنوان',
    hours: 'أوقات العمل',
    workingHours: 'الإثنين-الجمعة: 9ص-6م\nالسبت: 9ص-12ظ',
    followUs: 'تابعونا',
    
    // Footer Ultra-Professionnel
    companyTagline: 'الابتكار والتميز',
    companyDescription: 'منصة رائدة تربط العملاء بالمهنيين المؤهلين لجميع احتياجاتكم اليومية. خدمة عالية الجودة، أمان وثقة مضمونة.',
    happyClients: 'عملاء سعداء',
    yearsExperience: 'سنوات خبرة',
    support: 'الدعم',
    ourServices: 'خدماتنا',
    maintenance: 'الصيانة',
    consulting: 'الاستشارات',
    quickLinks: 'روابط سريعة',
    about: 'من نحن',
    privacy: 'سياسة الخصوصية',
    terms: 'شروط الاستخدام',
    faq: 'الأسئلة الشائعة',
    stayConnected: 'ابقوا على تواصل',
    newsletter: 'النشرة الإخبارية',
    allRightsReserved: 'جميع الحقوق محفوظة.',
    madeWith: 'صُنع بـ',
    inParis: 'في باريس',
    certified: 'معتمد',
    secure: 'آمن',
    verified: 'مُوثق'
  }
}

// État réactif pour la langue actuelle
const state = reactive({
  currentLanguage: 'fr',
  isRTL: false
})

export const translationService = {
  // Changer la langue
  setLanguage(lang) {
    if (translations[lang]) {
      state.currentLanguage = lang
      state.isRTL = lang === 'ar'
      localStorage.setItem('selectedLanguage', lang)
      
      // Mettre à jour la direction du document
      document.documentElement.dir = state.isRTL ? 'rtl' : 'ltr'
      document.documentElement.lang = lang
    }
  },

  // Obtenir la traduction
  t(key) {
    return translations[state.currentLanguage][key] || key
  },

  // Obtenir la langue actuelle
  getCurrentLanguage() {
    return state.currentLanguage
  },

  // Vérifier si c'est RTL
  isRTL() {
    return state.isRTL
  },

  // Initialiser la langue depuis localStorage
  init() {
    const savedLang = localStorage.getItem('selectedLanguage') || 'fr'
    this.setLanguage(savedLang)
  },

  // Obtenir les langues disponibles
  getAvailableLanguages() {
    return [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'ar', name: 'العربية', flag: '🇸🇦' }
    ]
  }
}

// Méthode globale pour les templates
export const t = (key) => translationService.t(key) 