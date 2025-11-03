<!-- 
  Composant AppFooter - Footer moderne du site
  Design 3D avec animations, thème bleu/noir
  Responsive pour tous les appareils
-->
<template>
  <footer class="app-footer">
    <div class="footer-container">
      <!-- Section Principale -->
      <div class="footer-main">
        <!-- À propos de l'entreprise -->
        <div class="footer-section company-section">
          <div class="company-logo">
            <h3 class="logo-text">FIXILYA</h3>
            <p class="company-tagline">{{ t('companyTagline') }}</p>
          </div>
          <p class="company-description">
            {{ t('companyDescription') }}
          </p>
          <div class="company-stats">
            <div class="stat-item">
              <span class="stat-number">500+</span>
              <span class="stat-label">{{ t('happyClients') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">5</span>
              <span class="stat-label">{{ t('yearsExperience') }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">{{ t('support') }}</span>
            </div>
          </div>
        </div>

        <!-- Services -->
        <div class="footer-section">
          <h4 class="section-title">{{ t('ourServices') }}</h4>
          <ul class="footer-links">
            <li><a @click="scrollToService('menage')" class="footer-link">{{ t('cleaning') }}</a></li>
            <li><a @click="scrollToService('jardinage')" class="footer-link">{{ t('gardening') }}</a></li>
            <li><a @click="scrollToService('reparation')" class="footer-link">{{ t('repair') }}</a></li>
            <li><a @click="scrollToService('plomberie')" class="footer-link">{{ t('maintenance') }}</a></li>
            <li><a @click="scrollToService('electricite')" class="footer-link">{{ t('consulting') }}</a></li>
          </ul>
        </div>

        <!-- Liens rapides -->
        <div class="footer-section">
          <h4 class="section-title">{{ t('quickLinks') }}</h4>
          <ul class="footer-links">
         
            <li><a href="#" class="footer-link">{{ t('contact') }}</a></li>
            <li><a href="#" class="footer-link">{{ t('Accueil') }}</a></li>
           
          </ul>
        </div>

        <!-- Contact & Newsletter -->
        <div class="footer-section contact-section">
          <h4 class="section-title">{{ t('stayConnected') }}</h4>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <span>NADOR-Maroc SELOUANE<br>62000, MAROC</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <span>+212 06 19 95 58 98</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <span>abdelilahsakkiou.21@gmail.com</span>
            </div>
          </div>
          
          <!-- Newsletter -->
          <div class="newsletter">
            <h5 class="newsletter-title">{{ t('newsletter') }}</h5>
            <div class="newsletter-form">
              <input 
                type="email" 
                placeholder="{{ t('emailPlaceholder') }}"
                class="newsletter-input"
              />
              <button type="submit" class="newsletter-btn">
                <span>📨</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Réseaux Sociaux -->
      <div class="footer-social">
        <h4 class="social-title">{{ t('followUs') }}</h4>
        <div class="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link facebook" aria-label="Facebook">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link instagram" aria-label="Instagram">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link linkedin" aria-label="LinkedIn">
            <svg class="social-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
         
        </div>
      </div>

      <!-- Section Copyright -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} FIXILYA. {{ t('allRightsReserved') }}</p>
          
        </div>
        <div class="footer-certifications">
          <div class="cert-badge">
            <span class="cert-icon">🏆</span>
            <span class="cert-text">{{ t('certified') }}</span>
          </div>
          <div class="cert-badge">
            <span class="cert-icon">🔒</span>
            <span class="cert-text">SSL {{ t('secure') }}</span>
          </div>
          <div class="cert-badge">
            <span class="cert-icon">✅</span>
            <span class="cert-text">{{ t('verified') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Background Effects -->
    <div class="footer-background">
      <div class="background-pattern"></div>
      <div class="floating-elements">
        <div v-for="i in 15" :key="i" class="floating-element" :style="getFloatingStyle(i)"></div>
      </div>
    </div>
  </footer>
</template>

<script>
import { translationService } from '../services/translation.js'

export default {
  name: 'AppFooter',
  emits: ['scroll-to-service'],
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    t(key) {
      return translationService.t(key)
    },

    scrollToService(category) {
      // Émet un événement avec la catégorie du service
      this.$emit('scroll-to-service', category)
      // Scroll vers le haut de la page d'abord
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    getFloatingStyle(index) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.random() * 6 + 2
      const delay = Math.random() * 10

      return {
        left: x + '%',
        top: y + '%',
        width: size + 'px',
        height: size + 'px',
        animationDelay: delay + 's'
      }
    }
  }
}
</script>

<style scoped>
/* Footer Ultra-Professionnel */
.app-footer {
  background: linear-gradient(135deg, var(--primary-corporate) 0%, var(--secondary-corporate) 100%);
  color: var(--text-light);
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-xxl) var(--spacing-lg) var(--spacing-lg);
  position: relative;
  z-index: 2;
}

/* Section Principale */
.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: var(--spacing-xxl);
  margin-bottom: var(--spacing-xxl);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

/* Section Entreprise */
.company-section {
  gap: var(--spacing-lg);
}

.company-logo .logo-text {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-light);
  margin: 0 0 var(--spacing-xs) 0;
  background: linear-gradient(135deg, #ffffff 0%, var(--accent-teal) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.company-tagline {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.company-description {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
}

.company-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.stat-item {
  text-align: center;
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--transition-smooth);
}

.stat-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-gold);
  margin-bottom: var(--spacing-xs);
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Titres de Section */
.section-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
  margin: 0 0 var(--spacing-md) 0;
  position: relative;
  padding-bottom: var(--spacing-xs);
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-teal), var(--accent-gold));
  border-radius: 1px;
}

/* Liens Footer */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.95rem;
  transition: var(--transition-smooth);
  padding: var(--spacing-xs) 0;
  border-left: 2px solid transparent;
  padding-left: var(--spacing-sm);
  position: relative;
}

.footer-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 100%;
  background: var(--accent-teal);
  transition: var(--transition-smooth);
}

.footer-link:hover::before {
  width: 2px;
}

.footer-link:hover {
  color: var(--text-light);
  padding-left: var(--spacing-md);
}

/* Section Contact */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-sm);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  line-height: 1.5;
}

.contact-icon {
  font-size: 1.1rem;
  min-width: 20px;
  opacity: 0.8;
}

/* Newsletter */
.newsletter {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.newsletter-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-light);
  margin: 0 0 var(--spacing-md) 0;
}

.newsletter-form {
  display: flex;
  gap: var(--spacing-xs);
}

.newsletter-input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  font-size: 0.9rem;
  transition: var(--transition-smooth);
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--accent-teal);
  background: rgba(255, 255, 255, 0.15);
}

.newsletter-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.newsletter-btn {
  padding: var(--spacing-sm);
  background: linear-gradient(135deg, var(--accent-teal), var(--accent-gold));
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-light);
  cursor: pointer;
  transition: var(--transition-smooth);
  font-size: 1rem;
}

.newsletter-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 172, 193, 0.4);
}

/* Section Réseaux Sociaux */
.footer-social {
  text-align: center;
  padding: var(--spacing-xl) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.social-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-light);
  margin: 0 0 var(--spacing-lg) 0;
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
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  text-decoration: none;
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-teal), var(--accent-gold));
  opacity: 0;
  transition: var(--transition-smooth);
}

.social-link:hover::before {
  opacity: 1;
}

.social-link:hover {
  transform: translateY(-5px) scale(1.1);
  border-color: var(--accent-teal);
  box-shadow: 0 8px 25px rgba(0, 172, 193, 0.4);
}

.social-icon {
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 1;
  transition: var(--transition-smooth);
  fill: white;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

/* Section Copyright */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-lg) 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-copyright {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.footer-copyright p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.made-with {
  font-size: 0.85rem !important;
  color: rgba(255, 255, 255, 0.6) !important;
}

.footer-certifications {
  display: flex;
  gap: var(--spacing-md);
}

.cert-badge {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cert-icon {
  font-size: 0.9rem;
}

.cert-text {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

/* Background Effects */
.footer-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(0,172,193,0.05) 0%, transparent 50%),
    linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%);
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  opacity: 0;
  animation: floatElement 15s infinite linear;
}

@keyframes floatElement {
  0% {
    opacity: 0;
    transform: translateY(100%) scale(0) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-100%) scale(1) rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
  }
  
  .company-stats {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
  
  .footer-certifications {
    justify-content: center;
  }
  
  .company-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .social-links {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: var(--spacing-lg) var(--spacing-md);
  }
  
  .company-stats {
    grid-template-columns: 1fr;
  }
  
  .social-link {
    width: 50px;
    height: 50px;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
}

/* Support RTL */
.rtl .footer-link {
  border-left: none;
  border-right: 2px solid transparent;
  padding-left: 0;
  padding-right: var(--spacing-sm);
}

.rtl .footer-link::before {
  left: auto;
  right: 0;
}

.rtl .footer-link:hover {
  padding-left: 0;
  padding-right: var(--spacing-md);
}

.rtl .contact-item {
  flex-direction: row-reverse;
}

/* Focus States */
.footer-link:focus-visible,
.social-link:focus-visible,
.newsletter-btn:focus-visible {
  outline: 2px solid var(--accent-gold);
  outline-offset: 2px;
}

.newsletter-input:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}

/* Performance */
.social-link,
.stat-item,
.cert-badge {
  transform: translateZ(0);
  backface-visibility: hidden;
}
</style> 