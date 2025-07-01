<template>
  <div id="app">
    <div class="app-container">
      <!-- Header -->
      <header class="app-header">
        <div class="header-content">
          <h1 class="app-title">SKMERN Auth</h1>
          <div v-if="currentUser" class="user-info">
            Bienvenue, {{ currentUser.prenom }} {{ currentUser.nom }}
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="app-main">
        <!-- Si l'utilisateur n'est pas connecté -->
        <div v-if="!isAuthenticated" class="auth-container">
          <div class="auth-tabs">
            <button 
              @click="currentView = 'login'" 
              :class="{ active: currentView === 'login' }"
              class="tab-button"
            >
              Connexion
            </button>
            <button 
              @click="currentView = 'register'" 
              :class="{ active: currentView === 'register' }"
              class="tab-button"
            >
              Inscription
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

        <!-- Si l'utilisateur est connecté -->
        <div v-else class="dashboard-container">
          <UserProfile 
            :user="currentUser"
            @logout="handleLogout"
            @userUpdated="handleUserUpdated"
          />
        </div>
      </main>

      <!-- Footer -->
      <footer class="app-footer">
        <p>&copy; 2024 SKMERN. Système d'authentification complet.</p>
      </footer>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import UserProfile from './components/UserProfile.vue'
import { authService } from './services/api.js'

export default {
  name: 'App',
  components: {
    LoginForm,
    RegisterForm,
    UserProfile
  },
  data() {
    return {
      currentView: 'login', // 'login' ou 'register'
      currentUser: null,
      isAuthenticated: false
    }
  },
  methods: {
    handleAuthSuccess(user) {
      this.currentUser = user
      this.isAuthenticated = true
    },

    handleLogout() {
      this.currentUser = null
      this.isAuthenticated = false
      this.currentView = 'login'
    },

    handleUserUpdated(updatedUser) {
      this.currentUser = updatedUser
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

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-title {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.user-info {
  color: white;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(5px);
}

/* Main Content */
.app-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.auth-container {
  width: 100%;
  max-width: 500px;
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.dashboard-container {
  width: 100%;
  max-width: 1000px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Footer */
.app-footer {
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 1rem;
  backdrop-filter: blur(10px);
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .app-title {
    font-size: 1.5rem;
  }

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
