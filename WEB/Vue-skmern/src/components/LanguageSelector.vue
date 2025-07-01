<template>
  <div class="language-selector">
    <div class="dropdown" :class="{ open: isOpen }">
      <button @click="toggleDropdown" class="dropdown-trigger">
        <span class="current-lang">
          {{ currentLanguage.flag }} {{ currentLanguage.name }}
        </span>
        <svg class="dropdown-arrow" :class="{ rotated: isOpen }" width="12" height="12" viewBox="0 0 12 12">
          <path d="M6 8L2 4h8l-4 4z" fill="currentColor"/>
        </svg>
      </button>
      
      <div v-if="isOpen" class="dropdown-menu">
        <button 
          v-for="lang in availableLanguages" 
          :key="lang.code"
          @click="selectLanguage(lang)"
          class="dropdown-item"
          :class="{ active: lang.code === currentLanguage.code }"
        >
          <span class="lang-flag">{{ lang.flag }}</span>
          <span class="lang-name">{{ lang.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { translationService } from '../services/translation.js'

export default {
  name: 'LanguageSelector',
  data() {
    return {
      isOpen: false,
      availableLanguages: translationService.getAvailableLanguages()
    }
  },
  computed: {
    currentLanguage() {
      const currentLang = translationService.getCurrentLanguage()
      return this.availableLanguages.find(lang => lang.code === currentLang)
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    
    selectLanguage(language) {
      translationService.setLanguage(language.code)
      this.isOpen = false
      this.$emit('languageChanged', language.code)
    },
    
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdown)
  }
}
</script>

<style scoped>
.language-selector {
  position: relative;
  z-index: 1000;
}

.dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.dropdown-trigger:hover {
  background: rgba(255, 255, 255, 0.3);
}

.current-lang {
  font-size: 0.9rem;
  font-weight: 500;
}

.dropdown-arrow {
  transition: transform 0.3s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 150px;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin-top: 0.5rem;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  transition: background-color 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background: #f8f9fa;
}

.dropdown-item.active {
  background: #667eea;
  color: white;
}

.lang-flag {
  font-size: 1.2rem;
}

.lang-name {
  font-size: 0.9rem;
  font-weight: 500;
}

/* Styles RTL */
[dir="rtl"] .dropdown-menu {
  right: auto;
  left: 0;
}

[dir="rtl"] .dropdown-item {
  text-align: right;
}

/* Responsive */
@media (max-width: 768px) {
  .dropdown-trigger {
    padding: 0.4rem 0.8rem;
  }
  
  .current-lang {
    font-size: 0.8rem;
  }
  
  .dropdown-menu {
    min-width: 120px;
  }
  
  .lang-name {
    font-size: 0.8rem;
  }
}
</style> 