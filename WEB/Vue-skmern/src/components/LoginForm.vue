<template>
  <div class="login-form">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin" class="form">
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

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-if="success" class="success-message">
        {{ success }}
      </div>

      <button type="submit" :disabled="loading" class="btn-submit">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>

    <p class="auth-link">
      Pas encore de compte ? 
      <a href="#" @click="$emit('switchToRegister')">S'inscrire</a>
    </p>
  </div>
</template>

<script>
import { authService } from '../services/api.js'

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
    async handleLogin() {
      this.error = ''
      this.success = ''
      this.loading = true

      try {
        const response = await authService.login(this.formData)
        
        // Sauvegarder le token et les informations utilisateur
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        this.success = 'Connexion réussie ! Redirection...'
        
        setTimeout(() => {
          this.$emit('authSuccess', response.data.user)
        }, 1500)

      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur lors de la connexion'
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