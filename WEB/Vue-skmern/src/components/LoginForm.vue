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
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}

.btn-submit {
  background-color: #007bff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.btn-submit:hover:not(:disabled) {
  background-color: #0056b3;
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  background-color: #f8d7da;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
}

.success-message {
  color: #155724;
  background-color: #d4edda;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #c3e6cb;
}

.auth-link {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.auth-link a {
  color: #007bff;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style> 