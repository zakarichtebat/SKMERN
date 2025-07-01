import axios from 'axios'

const API_URL = 'http://localhost:3000'

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

// Service d'authentification
export const authService = {
  // Inscription
  register(userData) {
    return api.post('/auth/register', userData)
  },

  // Connexion
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  // Récupérer le profil
  getProfile() {
    return api.get('/auth/profile')
  },

  // Mettre à jour le profil
  updateProfile(profileData) {
    return api.put('/auth/profile', profileData)
  },

  // Déconnexion
  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  // Vérifier si l'utilisateur est connecté
  isAuthenticated() {
    return !!localStorage.getItem('token')
  },

  // Récupérer l'utilisateur depuis le localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }
}

export default api 