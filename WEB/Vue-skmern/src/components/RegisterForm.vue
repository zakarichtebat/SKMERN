<template>
  <div class="register-form">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister" class="form">
      <div class="form-group">
        <label for="nom">Nom *</label>
        <input
          type="text"
          id="nom"
          v-model="formData.nom"
          required
          class="form-input"
          placeholder="Votre nom"
        />
      </div>

      <div class="form-group">
        <label for="prenom">Prénom *</label>
        <input
          type="text"
          id="prenom"
          v-model="formData.prenom"
          required
          class="form-input"
          placeholder="Votre prénom"
        />
      </div>

      <div class="form-group">
        <label for="email">Email *</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          required
          class="form-input"
          placeholder="votre@email.com"
        />
      </div>

      <div class="form-group">
        <label for="tel">Téléphone *</label>
        <input
          type="tel"
          id="tel"
          v-model="formData.tel"
          required
          class="form-input"
          placeholder="Votre numéro de téléphone"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe *</label>
        <input
          type="password"
          id="password"
          v-model="formData.password"
          required
          class="form-input"
          placeholder="Votre mot de passe"
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirmer le mot de passe *</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          class="form-input"
          placeholder="Confirmer votre mot de passe"
        />
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="success" class="success-message">
        {{ success }}
      </div>

      <button type="submit" :disabled="loading" class="btn-submit">
        {{ loading ? 'Inscription...' : 'S\'inscrire' }}
      </button>
    </form>

    <p class="auth-link">
      Déjà un compte ? 
      <a href="#" @click="$emit('switchToLogin')">Se connecter</a>
    </p>
  </div>
</template>

<script>
import { authService } from '../services/api.js'

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
    async handleRegister() {
      this.error = ''
      this.success = ''

      // Validation des mots de passe
      if (this.formData.password !== this.confirmPassword) {
        this.error = 'Les mots de passe ne correspondent pas'
        return
      }

      if (this.formData.password.length < 6) {
        this.error = 'Le mot de passe doit contenir au moins 6 caractères'
        return
      }

      this.loading = true

      try {
        const response = await authService.register(this.formData)
        
        // Sauvegarder le token et les informations utilisateur
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        this.success = 'Inscription réussie ! Redirection...'
        
        setTimeout(() => {
          this.$emit('authSuccess', response.data.user)
        }, 1500)

      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur lors de l\'inscription'
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