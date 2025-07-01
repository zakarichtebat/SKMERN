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
    AppHeader,
    AppFooter
  },
  data() {
    return {
      currentView: 'home', // 'home', 'login', 'register'
      currentUser: null,
      isAuthenticated: false
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

    handleViewChange(view) {
      this.currentView = view
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

body {
  font-family: 'Segoe UI', 'Arabic UI Text', Tahoma, 'Dubai', Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--darker-bg) 100%);
  margin: 0;
  padding: 0;
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  box-sizing: border-box;
  color: var(--text-light);
}

body[dir="rtl"] {
  font-family: 'Arabic UI Text', 'Segoe UI', 'Tahoma', 'Dubai', sans-serif;
}

#app {
  min-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--darker-bg) 100%);
}



/* Main Content */
.app-main {
  flex: 1;
  display: block;
  width: 100%;
  padding: 0;
}

.auth-container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.auth-tabs {
    display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.tab-button {
  flex: 1;
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  font-weight: 500;
}

.tab-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.tab-button.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  }

.auth-content {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-light);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.dashboard-container {
  width: 100%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-light);
  padding: 2rem;
  margin: 2rem auto;
}

/* Footer */
.app-footer {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  padding: 2rem;
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Styles RTL */
.rtl {
  direction: rtl;
}

.rtl .header-content {
  direction: rtl;
}

.rtl .header-left {
  order: 2;
}

.rtl .header-right {
  order: 1;
}

.rtl .main-nav {
  flex-direction: row-reverse;
}

.rtl .user-info {
  flex-direction: row-reverse;
}

/* Responsive */
@media (max-width: 768px) {
  .app-main {
    padding: 1rem;
  }

  .auth-container {
    max-width: 100%;
  }

  .tab-button {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-content,
.dashboard-container {
  animation: slideIn 0.3s ease-out;
}
</style>
