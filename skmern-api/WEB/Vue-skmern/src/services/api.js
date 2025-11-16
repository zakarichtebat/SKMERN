import axios from 'axios'

// Détection automatique de l'environnement
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3000' 
  : window.location.origin + '/api'

const DEV_MODE = false // Mode production avec vraie API

// Configuration d'axios avec l'URL de base
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour ajouter le token JWT aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Simulation d'API pour le mode développement (utilisateurs avec mots de passe corrects)
const mockUsers = [
  {
    id: 1,
    email: 'test@example.com',
    password: 'password123',
    nom: 'Dupont',
    prenom: 'Jean',
    telephone: '+33123456789',
    adresse: '123 Rue de la Paix, 75001 Paris'
  },
  {
    id: 2,
    email: 'zakariachtebal@gmail.com',
    password: 'motdepasse',
    nom: 'Admin',
    prenom: 'Zakaria',
    telephone: '+33987654321',
    adresse: '456 Avenue des Champs, 75008 Paris'
  },
  {
    id: 4,
    email: 'test@skmern.com',
    password: 'test123',
    nom: 'Test',
    prenom: 'User',
    telephone: '+33100000000',
    adresse: 'Adresse de test'
  }
]

// Service d'authentification
export const authService = {
  // Inscription
  async register(userData) {
    if (DEV_MODE) {
      // Simulation d'inscription
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Vérifier si l'email existe déjà
          const existingUser = mockUsers.find(user => user.email === userData.email)
          if (existingUser) {
            reject({
              response: {
                data: { message: 'Un compte avec cet email existe déjà' }
              }
            })
          } else {
            const newUser = {
              id: mockUsers.length + 1,
              ...userData
            }
            mockUsers.push(newUser)
            const token = 'mock-jwt-token-' + Date.now()
            resolve({
              data: {
                user: { ...newUser, password: undefined },
                token: token
              }
            })
          }
        }, 1000)
      })
    }
    return api.post('/auth/register', userData)
  },

  // Connexion
  async login(credentials) {
    if (DEV_MODE) {
      console.log('🔄 Mode développement activé - Simulation de connexion')
      console.log('📧 Email:', credentials.email)
      console.log('🔍 Utilisateurs disponibles:', mockUsers.map(u => ({ email: u.email, password: u.password })))
      
      // Simulation de connexion
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = mockUsers.find(
            u => u.email === credentials.email && u.password === credentials.password
          )
          if (user) {
            console.log('✅ Connexion réussie pour:', user.email)
            const token = 'mock-jwt-token-' + Date.now()
            resolve({
              data: {
                user: { ...user, password: undefined },
                token: token
              }
            })
          } else {
            console.log('❌ Échec de connexion pour:', credentials.email)
            reject({
              response: {
                data: { message: 'Email ou mot de passe incorrect' }
              }
            })
          }
        }, 1000)
      })
    }
    
    // Mode production - appel API réel
    console.log('🚀 Tentative de connexion à l\'API réelle:', API_URL)
    console.log('📧 Email:', credentials.email)
    
    try {
      const response = await api.post('/auth/login', credentials)
      console.log('✅ Connexion API réussie:', response.data)
      return response
    } catch (error) {
      console.error('❌ Erreur API réelle:', error)
      console.error('📋 Détails de l\'erreur:', {
        message: error.message,
        code: error.code,
        response: error.response?.data
      })
      throw error
    }
  },

  // Récupérer le profil
  async getProfile() {
    if (DEV_MODE) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = this.getCurrentUser()
          resolve({ data: user })
        }, 500)
      })
    }
    return api.get('/auth/profile')
  },

  // Mettre à jour le profil
  async updateProfile(profileData) {
    if (DEV_MODE) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const currentUser = this.getCurrentUser()
          const updatedUser = { ...currentUser, ...profileData }
          localStorage.setItem('user', JSON.stringify(updatedUser))
          resolve({ data: updatedUser })
        }, 1000)
      })
    }
    return api.put('/auth/profile', profileData)
  },

  // Déconnexion
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    const token = localStorage.getItem('token')
    return !!(token && token !== 'undefined' && token !== 'null')
  },

  // Récupérer l'utilisateur depuis le localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user')
    if (!user || user === 'undefined' || user === 'null') {
      return null
    }
    try {
      return JSON.parse(user)
    } catch (error) {
      console.error('Erreur lors du parsing de l\'utilisateur:', error)
      // Nettoyer le localStorage si les données sont corrompues
      localStorage.removeItem('user')
      return null
    }
  },

  // Récupérer tous les utilisateurs (ADMIN uniquement)
  async getAllUsers() {
    return api.get('/auth/users')
  }
}

// Service pour gérer les services
export const servicesService = {
  // Récupérer tous les services
  async getAll(category = null, active = true) {
    const params = {};
    if (category && category !== 'all') {
      params.category = category;
    }
    if (active !== null) {
      params.active = active;
    }
    return api.get('/services', { params });
  },

  // Récupérer un service par ID
  async getById(id) {
    return api.get(`/services/${id}`);
  },

  // Créer un nouveau service
  async create(serviceData) {
    return api.post('/services', serviceData);
  },

  // Mettre à jour un service
  async update(id, serviceData) {
    return api.put(`/services/${id}`, serviceData);
  },

  // Supprimer un service
  async delete(id) {
    return api.delete(`/services/${id}`);
  }
}

// Service pour gérer les uploads
export const uploadService = {
  // Upload une image de service
  async uploadServiceImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post('/upload/service-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

// Service pour gérer les messages de contact
export const contactService = {
  // Envoyer un message de contact
  async sendMessage(contactData) {
    return api.post('/contact', contactData);
  }
}

export default api 