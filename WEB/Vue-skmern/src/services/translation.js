import { reactive } from 'vue'

const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    login: 'Connexion',
    register: 'Inscription',
    logout: 'Déconnexion',
    profile: 'Profil',
    
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
    slider3Desc: 'Tous nos techniciens sont vérifiés et assurés'
  },
  
  en: {
    // Navigation
    home: 'Home',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    profile: 'Profile',
    
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
    slider3Desc: 'All our technicians are verified and insured'
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',
    
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
    copyright: '© 2024 SKMERN. نظام ربط شامل.'
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