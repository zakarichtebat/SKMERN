<template>
  <div class="register-form">
    <h2>{{ t('register') }}</h2>
    <form @submit.prevent="handleRegister" class="form">
      <div class="form-group">
        <label for="nom">{{ t('lastName') }} *</label>
        <input
          type="text"
          id="nom"
          v-model="formData.nom"
          required
          class="form-input"
          :placeholder="getLastNamePlaceholder()"
        />
      </div>

      <div class="form-group">
        <label for="prenom">{{ t('firstName') }} *</label>
        <input
          type="text"
          id="prenom"
          v-model="formData.prenom"
          required
          class="form-input"
          :placeholder="getFirstNamePlaceholder()"
        />
      </div>

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
        <label for="tel">{{ t('phone') }} *</label>
        <input
          type="tel"
          id="tel"
          v-model="formData.tel"
          required
          class="form-input"
          :placeholder="getPhonePlaceholder()"
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

      <div class="form-group">
        <label for="confirmPassword">{{ getConfirmPasswordLabel() }} *</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          class="form-input"
          :placeholder="getConfirmPasswordPlaceholder()"
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="success" class="success-message">
        {{ success }}
      </div>

      <button type="submit" :disabled="loading" class="btn-submit">
        {{ loading ? getLoadingText() : getRegisterText() }}
      </button>
    </form>

    <p class="auth-link">
      {{ getHaveAccountText() }}
      <a href="#" @click="$emit('switchToLogin')">{{ t('login') }}</a>
    </p>
  </div>
</template>

<script>
import { authService } from '../services/api.js'
import { translationService } from '../services/translation.js'

export default {
  name: 'RegisterForm',
  emits: ['switchToLogin', 'authSuccess'],
  data() {
    return {
      formData: {
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        password: ''
      },
      confirmPassword: '',
      loading: false,
      error: '',
      success: ''
    }
  },
  methods: {
    t(key) {
      return translationService.t(key)
    },

    getFirstNamePlaceholder() {
      const lang = translationService.getCurrentLanguage()
      const placeholders = {
        fr: 'Votre prénom',
        en: 'Your first name',
        ar: 'اسمك الأول'
      }
      return placeholders[lang] || placeholders.fr
    },

    getLastNamePlaceholder() {
      const lang = translationService.getCurrentLanguage()
      const placeholders = {
        fr: 'Votre nom',
        en: 'Your last name',
        ar: 'اسم العائلة'
      }
      return placeholders[lang] || placeholders.fr
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

    getPhonePlaceholder() {
      const lang = translationService.getCurrentLanguage()
      const placeholders = {
        fr: 'Votre numéro de téléphone',
        en: 'Your phone number',
        ar: 'رقم هاتفك'
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

    getConfirmPasswordLabel() {
      const lang = translationService.getCurrentLanguage()
      const labels = {
        fr: 'Confirmer le mot de passe',
        en: 'Confirm password',
        ar: 'تأكيد كلمة المرور'
      }
      return labels[lang] || labels.fr
    },

    getConfirmPasswordPlaceholder() {
      const lang = translationService.getCurrentLanguage()
      const placeholders = {
        fr: 'Confirmer votre mot de passe',
        en: 'Confirm your password',
        ar: 'تأكيد كلمة المرور'
      }
      return placeholders[lang] || placeholders.fr
    },

    getLoadingText() {
      const lang = translationService.getCurrentLanguage()
      const texts = {
        fr: 'Inscription...',
        en: 'Registering...',
        ar: 'جاري التسجيل...'
      }
      return texts[lang] || texts.fr
    },

    getRegisterText() {
      const lang = translationService.getCurrentLanguage()
      const texts = {
        fr: 'S\'inscrire',
        en: 'Sign up',
        ar: 'إنشاء حساب'
      }
      return texts[lang] || texts.fr
    },

    getHaveAccountText() {
      const lang = translationService.getCurrentLanguage()
      const texts = {
        fr: 'Déjà un compte ?',
        en: 'Already have an account?',
        ar: 'لديك حساب بالفعل؟'
      }
      return texts[lang] || texts.fr
    },

    getPasswordMismatchError() {
      const lang = translationService.getCurrentLanguage()
      const errors = {
        fr: 'Les mots de passe ne correspondent pas',
        en: 'Passwords do not match',
        ar: 'كلمات المرور غير متطابقة'
      }
      return errors[lang] || errors.fr
    },

    getPasswordLengthError() {
      const lang = translationService.getCurrentLanguage()
      const errors = {
        fr: 'Le mot de passe doit contenir au moins 6 caractères',
        en: 'Password must be at least 6 characters long',
        ar: 'يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل'
      }
      return errors[lang] || errors.fr
    },

    getSuccessMessage() {
      const lang = translationService.getCurrentLanguage()
      const messages = {
        fr: 'Inscription réussie ! Redirection...',
        en: 'Registration successful! Redirecting...',
        ar: 'تم التسجيل بنجاح! جاري التحويل...'
      }
      return messages[lang] || messages.fr
    },

    getErrorMessage() {
      const lang = translationService.getCurrentLanguage()
      const messages = {
        fr: 'Erreur lors de l\'inscription',
        en: 'Registration error',
        ar: 'خطأ في التسجيل'
      }
      return messages[lang] || messages.fr
    },

    async handleRegister() {
      this.error = ''
      this.success = ''

      // Validation des mots de passe
      if (this.formData.password !== this.confirmPassword) {
        this.error = this.getPasswordMismatchError()
        return
      }

      if (this.formData.password.length < 6) {
        this.error = this.getPasswordLengthError()
        return
      }

      this.loading = true

      try {
        const response = await authService.register(this.formData)
        
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
.register-form {
  max-width: 500px;
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
  gap: 1rem;
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
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
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
</style> 