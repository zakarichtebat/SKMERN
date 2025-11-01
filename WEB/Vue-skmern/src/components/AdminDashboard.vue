<template>
  <div class="admin-dashboard">
    <!-- Header Admin -->
    <div class="admin-header">
      <div class="header-content">
        <h1 class="dashboard-title">
          <span class="admin-icon">⚙️</span>
          Dashboard Administrateur
        </h1>
        <div class="admin-user-info">
          <span class="admin-badge">ADMIN</span>
          <span>{{ currentUser.prenom }} {{ currentUser.nom }}</span>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="admin-tabs">
      <button 
        @click="activeTab = 'stats'" 
        :class="['tab-btn', { active: activeTab === 'stats' }]"
      >
        📊 Statistiques
      </button>
      <button 
        @click="activeTab = 'services'" 
        :class="['tab-btn', { active: activeTab === 'services' }]"
      >
        🛠️ Services
      </button>
      <button 
        @click="activeTab = 'users'" 
        :class="['tab-btn', { active: activeTab === 'users' }]"
      >
        👥 Utilisateurs
      </button>
    </div>

    <!-- Content Area -->
    <div class="admin-content">
      <!-- Statistiques -->
      <div v-if="activeTab === 'stats'" class="stats-section">
        <h2 class="section-title">📊 Statistiques Générales</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <span class="stat-number">{{ stats.totalUsers }}</span>
              <span class="stat-label">Utilisateurs</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🛠️</div>
            <div class="stat-info">
              <span class="stat-number">{{ stats.totalServices }}</span>
              <span class="stat-label">Services</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">🔐</div>
            <div class="stat-info">
              <span class="stat-number">{{ stats.totalAdmins }}</span>
              <span class="stat-label">Administrateurs</span>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon">👤</div>
            <div class="stat-info">
              <span class="stat-number">{{ stats.totalClients }}</span>
              <span class="stat-label">Clients</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Gestion des Services -->
      <div v-if="activeTab === 'services'" class="services-section">
        <div class="section-header">
          <h2 class="section-title">🛠️ Gestion des Services</h2>
          <button @click="showServiceModal = true; editingService = null" class="btn-add">
            ➕ Ajouter un service
          </button>
        </div>

        <!-- Liste des services -->
        <div v-if="servicesLoading" class="loading">Chargement...</div>
        <div v-else class="services-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Icône</th>
                <th>Titre</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Note</th>
                <th>Actif</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="service in services" :key="service.id">
                <td>{{ service.id }}</td>
                <td class="image-cell">
                  <img 
                    v-if="service.image" 
                    :src="getServiceImageUrl(service.image)" 
                    :alt="service.title"
                    class="service-thumbnail"
                    @error="handleImageError"
                  />
                  <span v-else class="no-image">❌</span>
                </td>
                <td class="icon-cell">{{ service.icon }}</td>
                <td>{{ service.title }}</td>
                <td>{{ service.category }}</td>
                <td>{{ service.price }}€/h</td>
                <td>{{ service.rating }}/5</td>
                <td>
                  <span :class="['status-badge', service.active ? 'active' : 'inactive']">
                    {{ service.active ? 'Actif' : 'Inactif' }}
                  </span>
                </td>
                <td class="actions-cell">
                  <button @click="editService(service)" class="btn-edit">✏️</button>
                  <button @click="deleteService(service.id)" class="btn-delete">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Gestion des Utilisateurs -->
      <div v-if="activeTab === 'users'" class="users-section">
        <div class="section-header">
          <h2 class="section-title">👥 Gestion des Utilisateurs</h2>
          <button @click="showUserModal = true; editingUser = null" class="btn-add">
            ➕ Ajouter un utilisateur
          </button>
        </div>

        <!-- Liste des utilisateurs -->
        <div v-if="usersLoading" class="loading">Chargement...</div>
        <div v-else class="users-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Date création</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.prenom }} {{ user.nom }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.tel }}</td>
                <td>
                  <span :class="['role-badge', user.role.toLowerCase()]">
                    {{ user.role }}
                  </span>
                </td>
                <td>
                  <span :class="['status-badge', user.statut === 'active' ? 'active' : 'inactive']">
                    {{ user.statut }}
                  </span>
                </td>
                <td>{{ formatDate(user.createdAt) }}</td>
                <td class="actions-cell">
                  <button @click="editUser(user)" class="btn-edit">✏️</button>
                  <button @click="deleteUser(user.id)" class="btn-delete" v-if="user.id !== currentUser.id">🗑️</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Service -->
    <div v-if="showServiceModal" class="modal-overlay" @click.self="showServiceModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingService ? 'Modifier le service' : 'Nouveau service' }}</h3>
          <button @click="showServiceModal = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="saveService" class="modal-form">
          <div class="form-group">
            <label>Titre *</label>
            <input v-model="serviceForm.title" required type="text" />
          </div>
          <div class="form-group">
            <label>Description *</label>
            <textarea v-model="serviceForm.description" required rows="3"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Catégorie *</label>
              <input v-model="serviceForm.category" required type="text" />
            </div>
            <div class="form-group">
              <label>Icône *</label>
              <input v-model="serviceForm.icon" required type="text" placeholder="🏠" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Prix (€/h) *</label>
              <input v-model.number="serviceForm.price" required type="number" step="0.01" />
            </div>
            <div class="form-group">
              <label>Note (0-5)</label>
              <input v-model.number="serviceForm.rating" type="number" step="0.1" min="0" max="5" />
            </div>
          </div>
          <div class="form-group">
            <label>Image du service</label>
            <div v-if="imagePreview" class="image-preview">
              <img :src="imagePreview" alt="Aperçu" />
              <div class="image-actions">
                <button type="button" @click="$refs.fileInput.click()" class="btn-change-image">
                  🔄 Changer l'image
                </button>
                <button type="button" @click="removeImage" class="btn-remove-image">
                  🗑️ Supprimer
                </button>
              </div>
            </div>
            <input 
              type="file" 
              @change="handleImageChange" 
              accept="image/*"
              ref="fileInput"
              class="file-input"
              :style="{ display: imagePreview ? 'none' : 'block' }"
            />
            <div v-if="uploadingImage" class="upload-progress">
              📤 Upload en cours...
            </div>
          </div>
          <div class="form-group">
            <label class="checkbox-label">
              <input v-model="serviceForm.active" type="checkbox" />
              Service actif
            </label>
          </div>
          <div v-if="serviceError" class="error-message">{{ serviceError }}</div>
          <div class="modal-actions">
            <button type="button" @click="showServiceModal = false" class="btn-cancel">Annuler</button>
            <button type="submit" class="btn-save" :disabled="serviceSaving">
              {{ serviceSaving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Utilisateur -->
    <div v-if="showUserModal" class="modal-overlay" @click.self="showUserModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingUser ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur' }}</h3>
          <button @click="showUserModal = false" class="btn-close">✕</button>
        </div>
        <form @submit.prevent="saveUser" class="modal-form">
          <div class="form-row">
            <div class="form-group">
              <label>Prénom *</label>
              <input v-model="userForm.prenom" required type="text" />
            </div>
            <div class="form-group">
              <label>Nom *</label>
              <input v-model="userForm.nom" required type="text" />
            </div>
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input v-model="userForm.email" required type="email" />
          </div>
          <div class="form-group">
            <label>Téléphone *</label>
            <input v-model="userForm.tel" required type="tel" />
          </div>
          <div class="form-group" v-if="!editingUser">
            <label>Mot de passe *</label>
            <input v-model="userForm.password" :required="!editingUser" type="password" minlength="6" />
          </div>
          <div class="form-group">
            <label>Rôle *</label>
            <select v-model="userForm.role" required>
              <option value="CLIENT">Client</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>
          <div v-if="userError" class="error-message">{{ userError }}</div>
          <div class="modal-actions">
            <button type="button" @click="showUserModal = false" class="btn-cancel">Annuler</button>
            <button type="submit" class="btn-save" :disabled="userSaving">
              {{ userSaving ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { servicesService, authService, uploadService } from '../services/api.js'

export default {
  name: 'AdminDashboard',
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      activeTab: 'stats',
      
      // Stats
      stats: {
        totalUsers: 0,
        totalServices: 0,
        totalAdmins: 0,
        totalClients: 0
      },
      
      // Services
      services: [],
      servicesLoading: false,
      showServiceModal: false,
      editingService: null,
      serviceSaving: false,
      serviceError: null,
      selectedImageFile: null,
      imagePreview: null,
      uploadingImage: false,
      serviceForm: {
        title: '',
        description: '',
        category: '',
        icon: '',
        image: '/photo1.jpg',
        price: 0,
        rating: 5,
        active: true
      },
      
      // Users
      users: [],
      usersLoading: false,
      showUserModal: false,
      editingUser: null,
      userSaving: false,
      userError: null,
      userForm: {
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        password: '',
        role: 'CLIENT'
      }
    }
  },
  
  mounted() {
    this.loadStats()
    this.loadServices()
    this.loadUsers()
  },
  
  methods: {
    async loadStats() {
      try {
        const [servicesRes, usersRes] = await Promise.all([
          servicesService.getAll(null, null),
          fetch('http://localhost:3000/auth/users', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }).then(r => r.json())
        ])
        
        this.stats.totalServices = servicesRes.data.length
        this.stats.totalUsers = usersRes.length
        this.stats.totalAdmins = usersRes.filter(u => u.role === 'ADMIN').length
        this.stats.totalClients = usersRes.filter(u => u.role === 'CLIENT').length
      } catch (error) {
        console.error('Erreur chargement stats:', error)
      }
    },
    
    async loadServices() {
      this.servicesLoading = true
      try {
        console.log('\n🔄 CHARGEMENT DES SERVICES depuis l\'API...')
        const response = await servicesService.getAll(null, null)
        this.services = response.data
        console.log('✅ Services chargés:', this.services.length)
        
        // Log détaillé de chaque service
        console.log('\n📋 DÉTAIL DES SERVICES:')
        console.log('═══════════════════════════════════════')
        this.services.forEach((service, index) => {
          console.log(`\n${index + 1}. Service ID ${service.id}: ${service.title}`)
          console.log(`   📷 Image: ${service.image}`)
          console.log(`   📦 Catégorie: ${service.category}`)
          console.log(`   💰 Prix: ${service.price}€`)
          console.log(`   ⭐ Note: ${service.rating}/5`)
          console.log(`   ✓ Actif: ${service.active}`)
        })
        console.log('═══════════════════════════════════════\n')
      } catch (error) {
        console.error('❌ Erreur chargement services:', error)
      } finally {
        this.servicesLoading = false
      }
    },
    
    getServiceImageUrl(imagePath) {
      if (!imagePath) {
        return '/photo1.jpg'
      }
      // Si le chemin commence par /uploads/, ajouter l'URL du serveur
      if (imagePath.startsWith('/uploads/')) {
        return `http://localhost:3000${imagePath}`
      }
      // Sinon, retourner le chemin tel quel
      return imagePath
    },
    
    handleImageError(event) {
      console.error('❌ Erreur de chargement d\'image:', event.target.src)
      event.target.src = '/photo1.jpg' // Image par défaut en cas d'erreur
    },
    
    async loadUsers() {
      this.usersLoading = true
      try {
        const response = await fetch('http://localhost:3000/auth/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        this.users = await response.json()
      } catch (error) {
        console.error('Erreur chargement utilisateurs:', error)
      } finally {
        this.usersLoading = false
      }
    },
    
    handleImageChange(event) {
      console.log('📸 handleImageChange appelé')
      const file = event.target.files[0]
      if (file) {
        console.log('📁 Fichier sélectionné:', file.name, 'Taille:', file.size, 'Type:', file.type)
        this.selectedImageFile = file
        
        // Créer un aperçu de l'image
        const reader = new FileReader()
        reader.onload = (e) => {
          console.log('✅ Aperçu de l\'image créé')
          this.imagePreview = e.target.result
        }
        reader.onerror = (e) => {
          console.error('❌ Erreur lors de la lecture du fichier:', e)
        }
        reader.readAsDataURL(file)
      } else {
        console.log('⚠️ Aucun fichier sélectionné')
      }
    },
    
    removeImage() {
      console.log('🗑️ Suppression de l\'image')
      this.selectedImageFile = null
      this.imagePreview = null
      this.serviceForm.image = '' // Réinitialiser aussi le champ image du formulaire
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
    },
    
    editService(service) {
      console.log('✏️ Édition du service:', service.id, service.title)
      console.log('📷 Image du service:', service.image)
      
      this.editingService = service
      // Copier UNIQUEMENT les champs nécessaires, PAS id, createdAt, updatedAt
      this.serviceForm = {
        title: service.title,
        description: service.description,
        category: service.category,
        icon: service.icon,
        image: service.image,
        price: service.price,
        rating: service.rating,
        active: service.active
      }
      
      // Si le service a une image, afficher l'aperçu
      if (service.image) {
        const imageUrl = `http://localhost:3000${service.image}`
        console.log('🖼️ URL de l\'aperçu:', imageUrl)
        this.imagePreview = imageUrl
      } else {
        console.log('⚠️ Aucune image pour ce service')
        this.imagePreview = null
      }
      
      this.showServiceModal = true
    },
    
    async saveService() {
      this.serviceSaving = true
      this.serviceError = null
      
      try {
        console.log('═══════════════════════════════════════')
        console.log('🔄 DÉBUT DE saveService')
        console.log('═══════════════════════════════════════')
        console.log('📝 Mode édition?', !!this.editingService)
        if (this.editingService) {
          console.log('   → Service ID:', this.editingService.id)
          console.log('   → Ancienne image:', this.editingService.image)
        }
        console.log('📷 Nouvelle image sélectionnée?', !!this.selectedImageFile)
        if (this.selectedImageFile) {
          console.log('   → Nom fichier:', this.selectedImageFile.name)
          console.log('   → Taille:', this.selectedImageFile.size, 'bytes')
        }
        console.log('🖼️ Image dans le formulaire AVANT upload:', this.serviceForm.image)
        
        // Si une nouvelle image est sélectionnée, l'uploader d'abord
        if (this.selectedImageFile) {
          console.log('\n📤 DÉBUT UPLOAD de la nouvelle image...')
          this.uploadingImage = true
          try {
            const uploadResponse = await uploadService.uploadServiceImage(this.selectedImageFile)
            console.log('✅ Upload réussi!')
            console.log('   → Réponse complète:', JSON.stringify(uploadResponse.data, null, 2))
            console.log('   → Nouveau chemin:', uploadResponse.data.path)
            
            // IMPORTANT: Sauvegarder l'ancien chemin pour comparaison
            const oldImagePath = this.serviceForm.image
            this.serviceForm.image = uploadResponse.data.path
            
            console.log('🔄 Changement de chemin:')
            console.log('   → AVANT:', oldImagePath)
            console.log('   → APRÈS:', this.serviceForm.image)
            
            this.uploadingImage = false
          } catch (uploadError) {
            console.error('❌ ERREUR lors de l\'upload:', uploadError)
            console.error('   → Message:', uploadError.message)
            console.error('   → Réponse serveur:', uploadError.response?.data)
            this.uploadingImage = false
            throw new Error('Erreur lors de l\'upload de l\'image: ' + (uploadError.response?.data?.message || uploadError.message))
          }
        } else {
          console.log('\n⚠️ Aucune nouvelle image sélectionnée')
          console.log('   → L\'image actuelle sera conservée:', this.serviceForm.image)
        }
        
        // Préparer les données en excluant les champs générés automatiquement
        const serviceData = {
          title: this.serviceForm.title,
          description: this.serviceForm.description,
          category: this.serviceForm.category,
          icon: this.serviceForm.icon,
          image: this.serviceForm.image,
          price: this.serviceForm.price,
          rating: this.serviceForm.rating || 5.0,
          active: this.serviceForm.active !== undefined ? this.serviceForm.active : true
        }
        
        console.log('\n📦 PRÉPARATION DES DONNÉES')
        console.log('═══════════════════════════════════════')
        console.log('Données complètes:', JSON.stringify(serviceData, null, 2))
        console.log('Image à envoyer:', serviceData.image)
        
        // Validation: l'image est obligatoire pour la création
        if (!this.editingService && !serviceData.image) {
          throw new Error('Une image est obligatoire pour créer un service')
        }
        
        if (this.editingService) {
          console.log('\n✏️ MODE MODIFICATION')
          console.log('═══════════════════════════════════════')
          console.log('Service ID:', this.editingService.id)
          console.log('Image originale:', this.editingService.image)
          console.log('Nouvelle image:', serviceData.image)
          console.log('Image changée?', serviceData.image !== this.editingService.image)
          
          console.log('\n📡 Envoi de la requête PUT...')
          const response = await servicesService.update(this.editingService.id, serviceData)
          console.log('✅ Réponse du serveur:', JSON.stringify(response.data, null, 2))
        } else {
          console.log('\n➕ MODE CRÉATION')
          console.log('═══════════════════════════════════════')
          
          console.log('\n📡 Envoi de la requête POST...')
          const response = await servicesService.create(serviceData)
          console.log('✅ Réponse du serveur:', JSON.stringify(response.data, null, 2))
        }
        
        console.log('\n🎉 Service sauvegardé avec succès!')
        console.log('═══════════════════════════════════════')
        
        this.showServiceModal = false
        
        console.log('\n🔄 Rechargement des services...')
        await this.loadServices()
        await this.loadStats()
        this.resetServiceForm()
        
        console.log('✅ Rechargement terminé')
        console.log('═══════════════════════════════════════\n')
      } catch (error) {
        this.uploadingImage = false
        this.serviceError = error.message || error.response?.data?.message || 'Erreur lors de l\'enregistrement'
        console.error('❌ Erreur détaillée:', error.response?.data || error)
      } finally {
        this.serviceSaving = false
      }
    },
    
    async deleteService(id) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return
      
      try {
        await servicesService.delete(id)
        await this.loadServices()
        await this.loadStats()
      } catch (error) {
        alert('Erreur lors de la suppression')
      }
    },
    
    editUser(user) {
      this.editingUser = user
      this.userForm = {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        tel: user.tel,
        role: user.role
      }
      this.showUserModal = true
    },
    
    async saveUser() {
      this.userSaving = true
      this.userError = null
      
      try {
        if (this.editingUser) {
          // Update user (à implémenter dans l'API)
          alert('Fonctionnalité de mise à jour en cours de développement')
        } else {
          await authService.register(this.userForm)
        }
        
        this.showUserModal = false
        await this.loadUsers()
        await this.loadStats()
        this.resetUserForm()
      } catch (error) {
        this.userError = error.response?.data?.message || 'Erreur lors de l\'enregistrement'
      } finally {
        this.userSaving = false
      }
    },
    
    async deleteUser(id) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
      
      alert('Fonctionnalité de suppression en cours de développement')
    },
    
    resetServiceForm() {
      console.log('🔄 Réinitialisation du formulaire de service')
      this.serviceForm = {
        title: '',
        description: '',
        category: '',
        icon: '',
        image: '',
        price: 0,
        rating: 5,
        active: true
      }
      this.editingService = null
      this.selectedImageFile = null
      this.imagePreview = null
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = ''
      }
      this.serviceError = null
    },
    
    resetUserForm() {
      this.userForm = {
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        password: '',
        role: 'CLIENT'
      }
      this.editingUser = null
    },
    
    formatDate(date) {
      return new Date(date).toLocaleDateString('fr-FR')
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e13 0%, #1a1d29 100%);
  padding-bottom: 2rem;
}

/* Header */
.admin-header {
  background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-title {
  color: white;
  font-size: 2rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.admin-icon {
  font-size: 2.5rem;
}

.admin-user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.admin-badge {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
}

/* Tabs */
.admin-tabs {
  max-width: 1400px;
  margin: 2rem auto 0;
  padding: 0 2rem;
  display: flex;
  gap: 1rem;
}

.tab-btn {
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1rem;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--accent-blue);
}

.tab-btn.active {
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  border-color: var(--accent-blue);
}

/* Content */
.admin-content {
  max-width: 1400px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.section-title {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-blue);
  box-shadow: 0 10px 30px rgba(79, 172, 254, 0.3);
}

.stat-icon {
  font-size: 3rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--accent-blue);
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

/* Tables */
.services-table, .users-table {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

td {
  padding: 1rem;
  color: rgba(255, 255, 255, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

tr:hover {
  background: rgba(255, 255, 255, 0.05);
}

.icon-cell {
  font-size: 1.5rem;
}

.image-cell {
  padding: 0.5rem;
}

.service-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.service-thumbnail:hover {
  transform: scale(1.5);
  border-color: var(--accent-blue);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
  z-index: 10;
}

.no-image {
  display: inline-block;
  font-size: 1.5rem;
  opacity: 0.5;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
}

/* Badges */
.status-badge, .role-badge {
  padding: 0.4rem 0.8rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.active {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.status-badge.inactive {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
}

.role-badge.admin {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.role-badge.client {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
}

/* Buttons */
.btn-add {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(135deg, #4caf50, #45a049);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-add:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
}

.btn-edit, .btn-delete {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.btn-edit {
  background: rgba(33, 150, 243, 0.2);
}

.btn-edit:hover {
  background: rgba(33, 150, 243, 0.4);
}

.btn-delete {
  background: rgba(244, 67, 54, 0.2);
}

.btn-delete:hover {
  background: rgba(244, 67, 54, 0.4);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: linear-gradient(145deg, rgba(26, 29, 41, 0.98), rgba(10, 14, 19, 0.98));
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
}

.btn-close {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.modal-form {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

input, textarea, select {
  width: 100%;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 1rem;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--accent-blue);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
}

.file-input {
  padding: 0.5rem;
  cursor: pointer;
}

.image-preview {
  margin-top: 1rem;
  position: relative;
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.3);
}

.image-preview img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.image-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
}

.btn-change-image,
.btn-remove-image {
  flex: 1;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  color: white;
}

.btn-change-image {
  background: linear-gradient(135deg, #2196f3, #1976d2);
}

.btn-change-image:hover {
  background: linear-gradient(135deg, #1976d2, #1565c0);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
}

.btn-remove-image {
  background: linear-gradient(135deg, #f44336, #d32f2f);
}

.btn-remove-image:hover {
  background: linear-gradient(135deg, #d32f2f, #c62828);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.4);
}

.upload-progress {
  margin-top: 0.5rem;
  color: var(--accent-blue);
  font-weight: 600;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-cancel, .btn-save {
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-cancel {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.btn-save {
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  color: white;
}

.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 172, 254, 0.4);
}

.error-message {
  background: rgba(244, 67, 54, 0.2);
  color: #f44336;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.loading {
  text-align: center;
  color: white;
  padding: 2rem;
  font-size: 1.2rem;
}
</style>

