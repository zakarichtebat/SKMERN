<template>
  <header class="app-header">
    <div class="header-content">
      <div class="header-left">
        <h1 class="app-title" @click="goToHome">FIXILYA</h1>
      </div>
      
      <!-- Mobile Menu Toggle -->
      <button 
        class="mobile-menu-toggle" 
        @click="toggleMobileMenu"
        :class="{ active: isMobileMenuOpen }"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      
      <!-- Desktop Navigation -->
      <div class="header-right desktop-nav">
        <nav class="main-nav">
          <button 
            @click="changeView('home')" 
            :class="{ active: currentView === 'home' }"
            class="nav-button"
          >
            {{ t('home') }}
          </button>
          <button 
            @click="changeView('contact')" 
            :class="{ active: currentView === 'contact' }"
            class="nav-button"
          >
            {{ t('contact') }}
          </button>
          <button 
            v-if="!isAuthenticated"
            @click="changeView('login')" 
            :class="{ active: currentView === 'login' }"
            class="nav-button"
          >
            {{ t('login') }}
          </button>
          <button 
            v-if="!isAuthenticated"
            @click="changeView('register')" 
            :class="{ active: currentView === 'register' }"
            class="nav-button"
          >
            {{ t('register') }}
          </button>
        </nav>
        
        <LanguageSelector @languageChanged="handleLanguageChange" />
        
        <div v-if="currentUser" class="user-info">
          <div class="user-avatar">
            <span>{{ currentUser.prenom.charAt(0) }}{{ currentUser.nom.charAt(0) }}</span>
          </div>
          <div class="user-details">
            <span class="user-welcome">{{ t('welcomeUser') }}</span>
            <span class="user-name">{{ currentUser.prenom }} {{ currentUser.nom }}</span>
          </div>
          <button @click="handleLogout" class="logout-button">
            {{ t('logout') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    <div class="mobile-nav" :class="{ open: isMobileMenuOpen }">
      <div class="mobile-nav-content">
        <!-- Mobile User Info -->
        <div v-if="currentUser" class="mobile-user-info">
          <div class="mobile-user-avatar">
            <span>{{ currentUser.prenom.charAt(0) }}{{ currentUser.nom.charAt(0) }}</span>
          </div>
          <div class="mobile-user-details">
            <span class="mobile-user-welcome">{{ t('welcomeUser') }}</span>
            <span class="mobile-user-name">{{ currentUser.prenom }} {{ currentUser.nom }}</span>
          </div>
        </div>

        <!-- Mobile Navigation Links -->
        <nav class="mobile-main-nav">
          <button 
            @click="mobileNavClick('home')" 
            :class="{ active: currentView === 'home' }"
            class="mobile-nav-button"
          >
            🏠 {{ t('home') }}
          </button>
          <button 
            @click="mobileNavClick('contact')" 
            :class="{ active: currentView === 'contact' }"
            class="mobile-nav-button"
          >
            📞 {{ t('contact') }}
          </button>
          <button 
            v-if="!isAuthenticated"
            @click="mobileNavClick('login')" 
            :class="{ active: currentView === 'login' }"
            class="mobile-nav-button"
          >
            🔐 {{ t('login') }}
          </button>
          <button 
            v-if="!isAuthenticated"
            @click="mobileNavClick('register')" 
            :class="{ active: currentView === 'register' }"
            class="mobile-nav-button"
          >
            📝 {{ t('register') }}
          </button>
        </nav>

        <!-- Mobile Language Selector -->
        <div class="mobile-language">
          <LanguageSelector @languageChanged="handleLanguageChange" />
        </div>

        <!-- Mobile Logout -->
        <div v-if="currentUser" class="mobile-actions">
          <button @click="mobileLogout" class="mobile-logout-button">
            🚪 {{ t('logout') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      class="mobile-overlay" 
      :class="{ open: isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </header>
</template>

<script>
import LanguageSelector from './LanguageSelector.vue'
import { translationService } from '../services/translation.js'

export default {
  name: 'AppHeader',
  components: {
    LanguageSelector
  },
  props: {
    currentView: String,
    isAuthenticated: Boolean,
    currentUser: Object
  },
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  emits: ['viewChange', 'logout', 'languageChanged'],
  methods: {
    t(key) {
      return translationService.t(key)
    },

    goToHome() {
      this.$emit('viewChange', 'home')
    },

    changeView(view) {
      this.$emit('viewChange', view)
    },

    handleLogout() {
      this.$emit('logout')
    },

    handleLanguageChange(languageCode) {
      this.$emit('languageChanged', languageCode)
    },

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
    },

    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },

    mobileNavClick(view) {
      this.changeView(view)
      this.closeMobileMenu()
    },

    mobileLogout() {
      this.handleLogout()
      this.closeMobileMenu()
    }
  },
  
  mounted() {
    // Close mobile menu on resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.isMobileMenuOpen = false
      }
    })
  }
}
</script>

<style scoped>
/* === MOBILE-FIRST RESPONSIVE HEADER === */

/* Base Mobile Styles */
.app-header {
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 30%, #1976d2 70%, #0d1660 100%);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(26, 35, 126, 0.15),
    0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.app-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
    linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.02) 50%, transparent 100%);
  pointer-events: none;
}

.header-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  min-height: 70px;
}

/* Mobile Logo */
.header-left {
  display: flex;
  align-items: center;
}

.app-title {
  color: #ffffff;
  font-family: 'Poppins', 'Inter', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  margin: 0;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  letter-spacing: -0.05em;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #e3f2fd 50%, #bbdefb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
}

.app-title::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #ffc107 0%, #00acc1 50%, #4caf50 100%);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
}

.app-title:hover::after {
  width: 100%;
}

/* === MOBILE MENU TOGGLE === */
.mobile-menu-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.mobile-menu-toggle:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

.hamburger-line {
  display: block;
  width: 20px;
  height: 2px;
  background: #ffffff;
  margin: 3px 0;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  border-radius: 2px;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-menu-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Desktop Navigation - Hidden on Mobile */
.desktop-nav {
  display: none;
}

/* === MOBILE NAVIGATION MENU === */
.mobile-nav {
  position: fixed;
  top: 0;
  right: -100%;
  width: 300px;
  height: 100vh;
  background: linear-gradient(180deg, #1a237e 0%, #0d1660 100%);
  backdrop-filter: blur(20px);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 1001;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav-content {
  padding: 5rem 2rem 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Mobile User Info */
.mobile-user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.mobile-user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffc107 0%, #ff5722 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 20px rgba(255, 193, 7, 0.3);
}

.mobile-user-details {
  display: flex;
  flex-direction: column;
}

.mobile-user-welcome {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.mobile-user-name {
  font-weight: 600;
  color: #ffffff;
  font-size: 1.1rem;
}

/* Mobile Navigation Links */
.mobile-main-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-nav-button {
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(10px);
  text-align: left;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.mobile-nav-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateX(5px);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

.mobile-nav-button.active {
  background: linear-gradient(135deg, #ffc107 0%, #ff5722 100%);
  border-color: rgba(255, 193, 7, 0.5);
  box-shadow: 0 6px 25px rgba(255, 193, 7, 0.3);
}

/* Mobile Language Selector */
.mobile-language {
  padding: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Mobile Actions */
.mobile-actions {
  margin-top: auto;
}

.mobile-logout-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.mobile-logout-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(244, 67, 54, 0.4);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.mobile-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* === TABLET STYLES === */
@media (min-width: 768px) {
  .header-content {
    padding: 1.2rem 2rem;
    min-height: 80px;
  }

  .app-title {
    font-size: 2.2rem;
  }

  .mobile-nav {
    width: 350px;
  }
}

/* === DESKTOP STYLES === */
@media (min-width: 1024px) {
  .header-content {
    max-width: 1400px;
    padding: 1.2rem 2rem;
  }

  .app-title {
    font-size: 2.8rem;
  }

  .app-title:hover {
    transform: translateY(-3px) scale(1.05);
    filter: brightness(1.1);
  }

  /* Hide Mobile Menu on Desktop */
  .mobile-menu-toggle {
    display: none;
  }

  .mobile-nav {
    display: none;
  }

  .mobile-overlay {
    display: none;
  }

  /* Show Desktop Navigation */
  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .main-nav {
    display: flex;
    gap: 1.2rem;
  }

  .nav-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: #ffffff;
    padding: 0.8rem 1.5rem;
    border-radius: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    backdrop-filter: blur(10px);
    font-size: 1rem;
    position: relative;
    overflow: hidden;
  }

  .nav-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .nav-button:hover::before {
    left: 100%;
  }

  .nav-button:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .nav-button.active {
    background: linear-gradient(135deg, #ffc107 0%, #ff5722 100%);
    border-color: rgba(255, 193, 7, 0.8);
    box-shadow: 0 6px 25px rgba(255, 193, 7, 0.3);
  }

  /* User Info Desktop */
  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1.2rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .user-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffc107 0%, #ff5722 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.1rem;
    box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
  }

  .user-details {
    display: flex;
    flex-direction: column;
  }

  .user-welcome {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.8);
  }

  .user-name {
    font-weight: 600;
    color: #ffffff;
  }

  .logout-button {
    padding: 0.6rem 1rem;
    background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%);
    border: none;
    border-radius: 8px;
    color: #ffffff;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    font-size: 0.9rem;
  }

  .logout-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(244, 67, 54, 0.4);
  }
}

/* === LARGE DESKTOP === */
@media (min-width: 1440px) {
  .app-title {
    font-size: 3.2rem;
  }

  .nav-button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}
</style> 