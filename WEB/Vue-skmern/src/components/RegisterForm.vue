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