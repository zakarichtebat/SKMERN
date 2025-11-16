<template>
  <div class="contact-page">
    <!-- Hero Section Contact -->
    <div class="contact-hero">
      <div class="hero-background">
        <div class="cosmic-particles">
          <div v-for="i in 30" :key="i" class="particle" :style="getParticleStyle(i)"></div>
        </div>
      </div>
      
      <div class="hero-content">
        <h1 class="hero-title">{{ t('contactTitle') }}</h1>
        <p class="hero-subtitle">{{ t('contactSubtitle') }}</p>
      </div>
    </div>

    <!-- Section Principale -->
    <div class="contact-section">
      <div class="contact-container">
        
        <!-- Formulaire de Contact -->
        <div class="contact-form-card">
          <div class="card-header">
            <h2 class="form-title">{{ t('sendMessage') }}</h2>
            <p class="form-description">{{ t('contactDescription') }}</p>
          </div>

          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="prenom">{{ t('firstName') }} *</label>
                <input
                  type="text"
                  id="prenom"
                  v-model="formData.prenom"
                  required
                  class="form-input"
                  :placeholder="t('firstNamePlaceholder')"
                />
              </div>
              
              <div class="form-group">
                <label for="nom">{{ t('lastName') }} *</label>
                <input
                  type="text"
                  id="nom"
                  v-model="formData.nom"
                  required
                  class="form-input"
                  :placeholder="t('lastNamePlaceholder')"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="email">{{ t('email') }} *</label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                required
                class="form-input"
                :placeholder="t('emailPlaceholder')"
              />
            </div>

            <div class="form-group">
              <label for="telephone">{{ t('phone') }}</label>
              <input
                type="tel"
                id="telephone"
                v-model="formData.telephone"
                class="form-input"
                :placeholder="t('phonePlaceholder')"
              />
            </div>

            <div class="form-group">
              <label for="sujet">{{ t('subject') }} *</label>
              <select
                id="sujet"
                v-model="formData.sujet"
                required
                class="form-select"
              >
                <option value="">{{ t('selectSubject') }}</option>
                <option value="menage">🏠 Service de Ménage</option>
                <option value="jardinage">🌱 Jardinage</option>
                <option value="reparation">🔧 Réparation</option>
                <option value="plomberie">🚿 Plomberie</option>
                <option value="electricite">⚡ Électricité</option>
                <option value="peinture">🎨 Peinture et Décoration</option>
                <option value="autre">{{ t('other') }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">{{ t('message') }} *</label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="5"
                class="form-textarea"
                :placeholder="t('messagePlaceholder')"
              ></textarea>
            </div>

            <div v-if="error" class="error-message">
              {{ error }}
            </div>

            <div v-if="success" class="success-message">
              {{ success }}
            </div>

            <button type="submit" :disabled="loading" class="submit-btn">
              <span class="btn-content">
                <span class="btn-icon">📨</span>
                <span class="btn-text">{{ loading ? t('sending') : t('sendMessage') }}</span>
              </span>
              <div class="btn-effects">
                <div class="btn-glow"></div>
                <div class="btn-particles">
                  <div v-for="i in 6" :key="i" class="btn-particle"></div>
                </div>
              </div>
            </button>
          </form>
        </div>

        <!-- Informations de Contact -->
        <div class="contact-info-card">
          <h3 class="info-title">{{ t('contactInfo') }}</h3>
          
          <div class="contact-items">
            <div class="contact-item">
              <div class="item-icon">📍</div>
              <div class="item-content">
                <h4>{{ t('address') }}</h4>
                <p>NADOR-Maroc SELOUANE<br>62000, MAROC</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="item-icon">📞</div>
              <div class="item-content">
                <h4>{{ t('phone') }}</h4>
                <p>+212 06 19 95 58 98</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="item-icon">📧</div>
              <div class="item-content">
                <h4>{{ t('email') }}</h4>
                <p>abdelilahsakkiou.21@gmail.com</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="item-icon">🕒</div>
              <div class="item-content">
                <h4>{{ t('hours') }}</h4>
                <p>{{ t('workingHours') }}</p>
              </div>
            </div>
          </div>

          <!-- Réseaux Sociaux -->
          <div class="social-section">
            <h4 class="social-title">{{ t('followUs') }}</h4>
            <div class="social-links">
              <a href="#" class="social-link facebook">
                <span class="social-icon">📘</span>
              </a>
              <a href="#" class="social-link twitter">
                <span class="social-icon">🐦</span>
              </a>
              <a href="#" class="social-link instagram">
                <span class="social-icon">📷</span>
              </a>
              <a href="#" class="social-link linkedin">
                <span class="social-icon">💼</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { translationService } from '../services/translation.js'

export default {
  name: 'ContactPage',
  data() {
    return {
      formData: {
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
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

    getParticleStyle(index) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.random() * 4 + 2
      const delay = Math.random() * 5

      return {
        left: x + '%',
        top: y + '%',
        width: size + 'px',
        height: size + 'px',
        animationDelay: delay + 's'
      }
    },

    async handleSubmit() {
      this.error = ''
      this.success = ''
      this.loading = true

      try {
        // Simulation d'envoi (remplacer par votre API)
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        this.success = this.t('messageSent')
        this.resetForm()
        
      } catch (error) {
        this.error = this.t('messageError')
      } finally {
        this.loading = false
      }
    },

    resetForm() {
      this.formData = {
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
/* ================================
   Style Ultra-Professionnel Contact
   ================================ */

/* Page Container Professionnelle */
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-section) 100%);
  position: relative;
  overflow-x: hidden;
}

.contact-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(26,35,126,0.05) 0%, transparent 70%),
    radial-gradient(circle at 80% 70%, rgba(0,172,193,0.05) 0%, transparent 70%),
    linear-gradient(135deg, transparent 0%, rgba(26,35,126,0.02) 100%);
  pointer-events: none;
  z-index: 0;
}

/* Hero Section Corporate */
.contact-hero {
  background: linear-gradient(135deg, var(--primary-corporate) 0%, var(--primary-light) 100%);
  padding: var(--spacing-xxl) 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--border-light);
}

.contact-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%),
    radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 50%);
  pointer-events: none;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.cosmic-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 8s infinite linear;
}

@keyframes particleFloat {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(1);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--text-light);
  margin-bottom: var(--spacing-md);
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: 400;
}

/* Section Principale Corporate */
.contact-section {
  padding: var(--spacing-xxl) 0;
  position: relative;
  z-index: 1;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xxl);
}

/* Carte Formulaire Ultra-Professionnelle */
.contact-form-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xxl);
  box-shadow: var(--shadow-corporate);
  border: 1px solid var(--border-light);
  position: relative;
  overflow: hidden;
}

.contact-form-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-corporate), var(--accent-teal), var(--accent-gold));
}

.card-header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.form-title {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  letter-spacing: -0.01em;
}

.form-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

/* Formulaire Professionnel */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-group label {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
  letter-spacing: 0.01em;
}

.form-input,
.form-select,
.form-textarea {
  padding: var(--spacing-md);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-md);
  background: var(--bg-section);
  color: var(--text-primary);
  font-size: 1rem;
  transition: var(--transition-smooth);
  font-family: var(--font-primary);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-corporate);
  background: var(--bg-secondary);
  box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.1);
  transform: translateY(-1px);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
  line-height: 1.6;
}

/* Bouton Submit Ultra-Premium */
.submit-btn {
  background: linear-gradient(135deg, var(--primary-corporate) 0%, var(--primary-light) 100%);
  border: none;
  border-radius: var(--radius-lg);
  padding: var(--spacing-md) var(--spacing-xl);
  color: var(--text-light);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
  margin-top: var(--spacing-md);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: var(--shadow-medium);
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: var(--transition-slow);
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-heavy);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  position: relative;
  z-index: 1;
}

.btn-icon {
  font-size: 1.2rem;
}

/* Messages */
.error-message {
  background: linear-gradient(135deg, #ff5252, #f44336);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  font-weight: 500;
}

.success-message {
  background: linear-gradient(135deg, var(--accent-green), #388e3c);
  color: white;
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  text-align: center;
  font-weight: 500;
}

/* Carte Informations Corporate */
.contact-info-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-medium);
  border: 1px solid var(--border-light);
  height: fit-content;
  position: sticky;
  top: var(--spacing-xl);
}

.info-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  position: relative;
}

.info-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background: linear-gradient(90deg, var(--primary-corporate), var(--accent-teal));
  border-radius: 2px;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  background: var(--bg-section);
  border: 1px solid var(--border-light);
  transition: var(--transition-smooth);
}

.contact-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-light);
  border-color: var(--primary-corporate);
}

.item-icon {
  font-size: 1.5rem;
  background: linear-gradient(135deg, var(--primary-corporate), var(--accent-teal));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  min-width: 24px;
}

.item-content h4 {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  font-size: 1rem;
}

.item-content p {
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Section Réseaux Sociaux */
.social-section {
  border-top: 1px solid var(--border-light);
  padding-top: var(--spacing-lg);
}

.social-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  text-align: center;
  font-size: 1.1rem;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--bg-section), var(--bg-primary));
  border: 2px solid var(--border-light);
  text-decoration: none;
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-corporate), var(--accent-teal));
  opacity: 0;
  transition: var(--transition-smooth);
}

.social-link:hover::before {
  opacity: 1;
}

.social-link:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: var(--shadow-medium);
}

.social-icon {
  font-size: 1.25rem;
  position: relative;
  z-index: 1;
  transition: var(--transition-smooth);
}

.social-link:hover .social-icon {
  filter: brightness(0) invert(1);
}

/* Responsive Design Corporate */
@media (max-width: 1024px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  
  .contact-info-card {
    position: static;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .contact-form-card,
  .contact-info-card {
    padding: var(--spacing-lg);
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .contact-container {
    padding: 0 var(--spacing-md);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .contact-section {
    padding: var(--spacing-lg) 0;
  }
  
  .contact-form-card,
  .contact-info-card {
    padding: var(--spacing-md);
  }
  
  .hero-content {
    padding: 0 var(--spacing-md);
  }
}

/* Support RTL */
.rtl .contact-item {
  flex-direction: row-reverse;
}

.rtl .btn-content {
  flex-direction: row-reverse;
}

/* Focus States pour Accessibilité */
.form-input:focus-visible,
.form-select:focus-visible,
.form-textarea:focus-visible {
  outline: 2px solid var(--primary-corporate);
  outline-offset: 2px;
}

.submit-btn:focus-visible,
.social-link:focus-visible {
  outline: 2px solid var(--accent-gold);
  outline-offset: 3px;
}

/* Performance */
.submit-btn,
.contact-item,
.social-link {
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* Animations avancées */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.contact-form-card,
.contact-info-card {
  animation: fadeInUp 0.8s var(--transition-smooth);
}

.contact-info-card {
  animation-delay: 0.2s;
}
</style> 