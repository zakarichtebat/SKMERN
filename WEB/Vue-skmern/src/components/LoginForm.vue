<template>
  <div class="login-form">
    <h2>{{ t('login') }}</h2>
    <form @submit.prevent="handleLogin" class="form">
      <div class="form-group">
        <label for="email">{{ t('email') }} *</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
          class="form-input"
          :placeholder="getEmailPlaceholder()"
        />
      </div>

      <div class="form-group">
        <label for="password">{{ t('password') }} *</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
          class="form-input"
          :placeholder="getPasswordPlaceholder()"
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="success" class="success-message">
        {{ success }}
      </div>

      <button type="submit" :disabled="loading" class="btn-submit">
        {{ loading ? getLoadingText() : getLoginText() }}
      </button>
    </form>



    <p class="auth-link">
      {{ getNoAccountText() }}
      <a href="#" @click="$emit('switchToRegister')">{{ t('register') }}</a>
    </p>
  </div>
</template>

<script>
import { authService } from '../services/api.js'
import { translationService } from '../services/translation.js'

export default {
  name: 'LoginForm',
  emits: ['switchToRegister', 'authSuccess'],
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      loading: false,
      error: '',
      success: ''
    }
  },
  methods: {
    t(key) {
      return translationService.t(key)
    },

    getEmailPlaceholder() {
      const lang = translationService.getCurrentLanguage()
      const placeholders = {
        fr: 'votre@email.com',
        en: 'your@email.com',
        ar: 'email@example.com'
      }
      return placeholders[lang] || placeholders.fr
    },

    getPasswordPlaceholder() {
      const lang = translationService.getCurrentLanguage()
      const placeholders = {
        fr: 'Votre mot de passe',
        en: 'Your password',
        ar: 'كلمة المرور'
      }
      return placeholders[lang] || placeholders.fr
    },

    getLoadingText() {
      const lang = translationService.getCurrentLanguage()
      const texts = {
        fr: 'Connexion...',
        en: 'Logging in...',
        ar: 'جاري تسجيل الدخول...'
      }
      return texts[lang] || texts.fr
    },

    getLoginText() {
      const lang = translationService.getCurrentLanguage()
      const texts = {
        fr: 'Se connecter',
        en: 'Sign in',
        ar: 'تسجيل الدخول'
      }
      return texts[lang] || texts.fr
    },

    getNoAccountText() {
      const lang = translationService.getCurrentLanguage()
      const texts = {
        fr: 'Pas encore de compte ?',
        en: "Don't have an account?",
        ar: 'ليس لديك حساب؟'
      }
      return texts[lang] || texts.fr
    },

    getSuccessMessage() {
      const lang = translationService.getCurrentLanguage()
      const messages = {
        fr: 'Connexion réussie ! Redirection...',
        en: 'Login successful! Redirecting...',
        ar: 'تم تسجيل الدخول بنجاح! جاري التحويل...'
      }
      return messages[lang] || messages.fr
    },

    getErrorMessage(defaultMessage) {
      const lang = translationService.getCurrentLanguage()
      const messages = {
        fr: 'Erreur lors de la connexion',
        en: 'Login error',
        ar: 'خطأ في تسجيل الدخول'
      }
      return defaultMessage || messages[lang] || messages.fr
    },

    async handleLogin() {
      this.error = ''
      this.success = ''
      this.loading = true

      try {
        const response = await authService.login(this.formData)
        
        // Sauvegarder le token et les informations utilisateur
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        this.success = this.getSuccessMessage()
        
        setTimeout(() => {
          this.$emit('authSuccess', response.data.user)
        }, 1500)

      } catch (error) {
        this.error = error.response?.data?.message || this.getErrorMessage()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: transparent;
  border-radius: 8px;
  color: var(--text-light);
}

h2 {
  text-align: center;
  color: var(--text-light);
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
  background: linear-gradient(45deg, var(--accent-blue), #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.8rem;
  font-weight: 500;
  color: var(--text-light);
  font-size: 1rem;
}

.form-input {
  padding: 1rem;
  border: 2px solid var(--border-light);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.95);
  color: var(--text-primary);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: var(--text-gray);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-blue);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 20px rgba(79, 172, 254, 0.3);
}

.btn-submit {
  padding: 1rem 2rem;
  background: linear-gradient(45deg, var(--primary-blue), var(--secondary-blue));
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px var(--shadow-blue);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--shadow-blue);
  background: linear-gradient(45deg, var(--secondary-blue), var(--accent-blue));
}

.btn-submit:disabled {
  background: var(--text-gray);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.error-message {
  padding: 1rem;
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  font-weight: 500;
}

.success-message {
  padding: 1rem;
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  font-weight: 500;
}

.auth-link {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-gray);
  font-size: 0.95rem;
}

.auth-link a {
  color: var(--accent-blue);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.auth-link a:hover {
  color: var(--text-light);
  text-shadow: 0 0 8px var(--accent-blue);
}

/* Comptes de test */
.test-accounts {
  background: rgba(79, 172, 254, 0.1);
  border: 1px solid rgba(79, 172, 254, 0.3);
  border-radius: 12px;
  padding: 1rem;
  margin: 1.5rem 0;
  backdrop-filter: blur(10px);
}

.test-accounts h4 {
  color: var(--accent-blue);
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  text-align: center;
}

.test-accounts .account {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', monospace;
  font-size: 0.85rem;
  color: var(--text-light);
}

.test-accounts .account:last-child {
  margin-bottom: 0;
}

.test-accounts .account strong {
  color: var(--accent-blue);
}
</style> 