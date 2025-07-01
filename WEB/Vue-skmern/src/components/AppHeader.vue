<template>
  <header class="app-header">
    <div class="header-content">
      <div class="header-left">
        <h1 class="app-title" @click="goToHome">SKMERN</h1>
        <nav class="main-nav">
          <button 
            @click="changeView('home')" 
            :class="{ active: currentView === 'home' }"
            class="nav-button"
          >
            {{ t('home') }}
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
      </div>
      
      <div class="header-right">
        <LanguageSelector @languageChanged="handleLanguageChange" />
        <div v-if="currentUser" class="user-info">
          {{ t('welcomeUser') }}, {{ currentUser.prenom }} {{ currentUser.nom }}
          <button @click="handleLogout" class="logout-button">
            {{ t('logout') }}
          </button>
        </div>
      </div>
    </div>
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
    }
  }
}
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.2rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.header-content {
  width: 100%;
  margin: 0;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-title {
  color: white;
  font-size: 2.2rem;
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
  position: relative;
}

.app-title:hover {
  transform: scale(1.05);
  text-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.main-nav {
  display: flex;
  gap: 1rem;
}

.nav-button {
  background: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  backdrop-filter: blur(10px);
  font-size: 0.95rem;
  letter-spacing: 0.5px;
}

.nav-button:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.nav-button.active {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.user-info {
  color: white;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logout-button {
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.logout-button:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    padding: 0 0.5rem;
  }

  .header-left {
    flex-direction: column;
    gap: 1rem;
  }

  .header-right {
    flex-direction: column-reverse;
    gap: 0.5rem;
  }

  .main-nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .app-title {
    font-size: 1.5rem;
  }

  .user-info {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style> 