<template>
  <div class="user-profile">
    <div class="profile-header">
      <h2>Mon Profil</h2>
      <button @click="logout" class="btn-logout">Déconnexion</button>
    </div>

    <div class="profile-content">
      <!-- Informations de base (non modifiables après inscription) -->
      <div class="profile-section">
        <h3>Informations personnelles</h3>
        <div class="info-grid">
          <div class="info-item">
            <label>Nom</label>
            <p>{{ user.nom }}</p>
          </div>
          <div class="info-item">
            <label>Prénom</label>
            <p>{{ user.prenom }}</p>
          </div>
          <div class="info-item">
            <label>Email</label>
            <p>{{ user.email }}</p>
          </div>
          <div class="info-item">
            <label>Téléphone</label>
            <p>{{ user.tel }}</p>
          </div>
        </div>
      </div>

      <!-- Informations complémentaires (modifiables) -->
      <div class="profile-section">
        <h3>Informations complémentaires</h3>
        <form @submit.prevent="updateProfile" class="form">
          <div class="form-group">
            <label for="cv">CV</label>
            <textarea
              id="cv"
              v-model="profileData.cv"
              class="form-textarea"
              placeholder="Décrivez votre parcours professionnel..."
              rows="4"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="photo">Photo de profil (URL)</label>
            <input
              type="url"
              id="photo"
              v-model="profileData.photo"
              class="form-input"
              placeholder="https://exemple.com/photo.jpg"
            />
            <div v-if="profileData.photo" class="photo-preview">
              <img :src="profileData.photo" alt="Aperçu photo" @error="handleImageError" />
            </div>
          </div>

          <div class="form-group">
            <label for="statut">Statut</label>
            <select id="statut" v-model="profileData.statut" class="form-select">
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
              <option value="pending">En attente</option>
              <option value="blocked">Bloqué</option>
            </select>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="success" class="success-message">
            {{ success }}
          </div>

          <button type="submit" :disabled="loading" class="btn-submit">
            {{ loading ? 'Mise à jour...' : 'Mettre à jour le profil' }}
          </button>
        </form>
      </div>

      <!-- Informations système -->
      <div class="profile-section">
        <h3>Informations système</h3>
        <div class="info-grid">
          <div class="info-item">
            <label>Date d'inscription</label>
            <p>{{ formatDate(user.createdAt) }}</p>
          </div>
          <div class="info-item">
            <label>Dernière mise à jour</label>
            <p>{{ formatDate(user.updatedAt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { authService } from '../services/api.js'

export default {
  name: 'UserProfile',
  emits: ['logout'],
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      profileData: {
        cv: this.user.cv || '',
        photo: this.user.photo || '',
        statut: this.user.statut || 'active'
      },
      loading: false,
      error: '',
      success: ''
    }
  },
  methods: {
    async updateProfile() {
      this.error = ''
      this.success = ''
      this.loading = true

      try {
        const response = await authService.updateProfile(this.profileData)
        
        // Mettre à jour les informations utilisateur locales
        const updatedUser = { ...this.user, ...response.data }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        
        this.success = 'Profil mis à jour avec succès !'
        
        // Émettre l'événement pour mettre à jour l'utilisateur dans le composant parent
        this.$emit('userUpdated', updatedUser)

      } catch (error) {
        this.error = error.response?.data?.message || 'Erreur lors de la mise à jour'
      } finally {
        this.loading = false
      }
    },

    logout() {
      authService.logout()
      this.$emit('logout')
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A'
      const date = new Date(dateString)
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    handleImageError() {
      this.profileData.photo = ''
      this.error = 'Impossible de charger l\'image. Vérifiez l\'URL.'
    }
  },

  watch: {
    user: {
      handler(newUser) {
        this.profileData = {
          cv: newUser.cv || '',
          photo: newUser.photo || '',
          statut: newUser.statut || 'active'
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.user-profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e9ecef;
}

.profile-header h2 {
  color: #333;
  margin: 0;
}

.btn-logout {
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #c82333;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-section h3 {
  color: #495057;
  margin-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 0.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
}

.info-item label {
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.info-item p {
  color: #212529;
  margin: 0;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-radius: 4px;
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

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

.form-input,
.form-textarea,
.form-select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #007bff;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.photo-preview {
  margin-top: 0.5rem;
}

.photo-preview img {
  max-width: 150px;
  max-height: 150px;
  border-radius: 8px;
  border: 2px solid #dee2e6;
}

.btn-submit {
  background-color: #28a745;
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
  background-color: #218838;
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

@media (max-width: 768px) {
  .user-profile {
    padding: 1rem;
  }
  
  .profile-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style> 