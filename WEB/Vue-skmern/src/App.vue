<template>
  <div id="app" :class="{ 'rtl': isRTL }">
    <div class="app-container">
      <!-- Header Component -->
      <AppHeader 
        :currentView="currentView"
        :isAuthenticated="isAuthenticated"
        :currentUser="currentUser"
        @viewChange="handleViewChange"
        @logout="handleLogout"
        @languageChanged="handleLanguageChange"
      />

      <!-- Main Content -->
      <main class="app-main">
        <!-- Page d'accueil -->
        <HomePage v-if="currentView === 'home'" @viewChange="handleViewChange" />
        
        <!-- Page de contact -->
        <ContactPage v-else-if="currentView === 'contact'" />
        
        <!-- Page de détail service -->
        <ServiceDetail 
          v-else-if="currentView === 'serviceDetail' && selectedService" 
          :service="selectedService"
          @goBack="goBackToHome"
        />
        
        <!-- Pages d'authentification -->
        <div v-else-if="currentView === 'login' || currentView === 'register'" class="auth-container">
          <div class="auth-tabs">
            <button 
              @click="currentView = 'login'" 
              :class="{ active: currentView === 'login' }"
              class="tab-button"
            >
              {{ t('login') }}
            </button>
            <button 
              @click="currentView = 'register'" 
              :class="{ active: currentView === 'register' }"
              class="tab-button"
            >
              {{ t('register') }}
            </button>
          </div>

          <div class="auth-content">
            <LoginForm 
              v-if="currentView === 'login'"
              @switchToRegister="currentView = 'register'"
              @authSuccess="handleAuthSuccess"
            />
            <RegisterForm 
              v-if="currentView === 'register'"
              @switchToLogin="currentView = 'login'"
              @authSuccess="handleAuthSuccess"
            />
          </div>
        </div>

        <!-- Dashboard utilisateur -->
        <div v-else-if="isAuthenticated" class="dashboard-container">
          <UserProfile 
            :user="currentUser"
            @logout="handleLogout"
            @userUpdated="handleUserUpdated"
          />
        </div>
      </main>

      <!-- Footer Component -->
      <AppFooter />
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import UserProfile from './components/UserProfile.vue'
import HomePage from './components/HomePage.vue'
import ContactPage from './components/ContactPage.vue'
import ServiceDetail from './components/ServiceDetail.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { authService } from './services/api.js'
import { translationService } from './services/translation.js'

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm,
    UserProfile,
    HomePage,
    ContactPage,
    ServiceDetail,
    AppHeader,
    AppFooter
  },
  data() {
    return {
      currentView: 'home', // 'home', 'login', 'register', 'contact', 'serviceDetail'
      currentUser: null,
      isAuthenticated: false,
      selectedService: null
    }
  },
  computed: {
    isRTL() {
      return translationService.isRTL()
    }
  },
  methods: {
    t(key) {
      return translationService.t(key)
    },

    handleAuthSuccess(user) {
      this.currentUser = user
      this.isAuthenticated = true
      this.currentView = 'home'
    },

    handleLogout() {
      authService.logout()
      this.currentUser = null
      this.isAuthenticated = false
      this.currentView = 'home'
    },

    handleUserUpdated(updatedUser) {
      this.currentUser = updatedUser
    },

    handleLanguageChange(languageCode) {
      // Force update of the component to reflect language changes
      this.$forceUpdate()
    },

    handleViewChange(view, data = null) {
      this.currentView = view
      
      // Si on va vers les détails d'un service, stocker les données du service
      if (view === 'serviceDetail' && data) {
        this.selectedService = data
      }
    },

    goBackToHome() {
      this.currentView = 'home'
      this.selectedService = null
    },

    checkAuthState() {
      // Vérifier si l'utilisateur est déjà connecté au chargement de la page
      if (authService.isAuthenticated()) {
        const user = authService.getCurrentUser()
        if (user) {
          this.currentUser = user
          this.isAuthenticated = true
        }
      }
    }
  },
  mounted() {
    // Initialiser le service de traduction
    translationService.init()
    this.checkAuthState()
  }
}
</script>

<style>
/* Reset et styles de base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
}

html, body {
  width: 100vw;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* Variables CSS Professionnelles */
:root {
  /* Palette Corporative Moderne */
  --primary-corporate: #1a237e;
  --primary-light: #3949ab;
  --primary-dark: #0d1660;
  --secondary-corporate: #37474f;
  --secondary-light: #62727b;
  --secondary-dark: #102027;
  
  /* Accents Professionnels */
  --accent-gold: #ffc107;
  --accent-teal: #00acc1;
  --accent-green: #4caf50;
  --accent-orange: #ff9800;
  
  /* Backgrounds Corporate */
  --bg-primary: #fafafa;
  --bg-secondary: #ffffff;
  --bg-dark: #263238;
  --bg-darker: #1c2427;
  --bg-section: #f8f9fa;
  
  /* Text Corporate */
  --text-primary: #212121;
  --text-secondary: #757575;
  --text-light: #ffffff;
  --text-muted: #9e9e9e;
  
  /* Borders & Shadows */
  --border-light: #e0e0e0;
  --border-medium: #bdbdbd;
  --shadow-light: 0 2px 4px rgba(0,0,0,0.1);
  --shadow-medium: 0 4px 16px rgba(0,0,0,0.15);
  --shadow-heavy: 0 8px 32px rgba(0,0,0,0.2);
  --shadow-corporate: 0 6px 20px rgba(26,35,126,0.15);
  
  /* Spacing Corporate */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  --spacing-xxl: 4rem;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  
  /* Typography */
  --font-primary: 'Inter', 'Segoe UI', 'Arial', sans-serif;
  --font-secondary: 'Roboto', 'Helvetica Neue', sans-serif;
  --font-display: 'Poppins', 'Inter', sans-serif;
  
  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-smooth: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

body {
  font-family: var(--font-primary);
  line-height: 1.7;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-section) 100%);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  box-sizing: border-box;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 400;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body[dir="rtl"] {
  font-family: 'Arabic UI Text', var(--font-primary);
}

#app {
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  position: relative;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: var(--bg-primary);
  position: relative;
}

/* Background Pattern Corporate */
.app-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 20%, rgba(26,35,126,0.03) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0,172,193,0.03) 0%, transparent 50%),
    linear-gradient(135deg, transparent 0%, rgba(26,35,126,0.01) 100%);
  pointer-events: none;
  z-index: -1;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background: transparent;
}

/* Conteneur d'authentification professionnel */
.auth-container {
  max-width: 480px;
  margin: var(--spacing-xxl) auto;
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-corporate);
  border: 1px solid var(--border-light);
  position: relative;
  overflow: hidden;
}

.auth-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-corporate), var(--accent-teal));
}

.auth-tabs {
  display: flex;
  margin-bottom: var(--spacing-lg);
  background: var(--bg-section);
  border-radius: var(--radius-md);
  padding: 4px;
  gap: 4px;
}

.tab-button {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  background: transparent;
  color: var(--text-secondary);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-smooth);
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
}

.tab-button.active {
  background: var(--bg-secondary);
  color: var(--primary-corporate);
  box-shadow: var(--shadow-light);
  font-weight: 600;
}

.tab-button:hover:not(.active) {
  color: var(--text-primary);
  background: rgba(26,35,126,0.05);
}

.auth-content {
  position: relative;
}

/* Dashboard professionnel */
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-lg);
  width: 100%;
}

/* Support RTL amélioré */
.rtl {
  direction: rtl;
}

.rtl .auth-container,
.rtl .dashboard-container {
  text-align: right;
}

/* Animations professionnelles */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.auth-container,
.dashboard-container {
  animation: fadeInUp 0.6s var(--transition-smooth);
}

/* Media Queries Responsives */
@media (max-width: 768px) {
  .auth-container {
    margin: var(--spacing-lg) auto;
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
  }
  
  .dashboard-container {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  .tab-button {
    padding: var(--spacing-sm);
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .auth-container {
    margin: var(--spacing-md) var(--spacing-sm);
    padding: var(--spacing-md);
  }
  
  body {
    font-size: 15px;
  }
}

/* Optimisations Performance */
* {
  will-change: auto;
}

.auth-container,
.tab-button,
.dashboard-container {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Amélioration de l'accessibilité */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Focus pour l'accessibilité */
.tab-button:focus-visible {
  outline: 2px solid var(--primary-corporate);
  outline-offset: 2px;
}
</style>


