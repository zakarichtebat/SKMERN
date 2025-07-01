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
            <h3 class="logo-text">SKMERN</h3>
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
            <li><a href="#" class="footer-link">{{ t('cleaning') }}</a></li>
            <li><a href="#" class="footer-link">{{ t('gardening') }}</a></li>
            <li><a href="#" class="footer-link">{{ t('repair') }}</a></li>
            <li><a href="#" class="footer-link">{{ t('maintenance') }}</a></li>
            <li><a href="#" class="footer-link">{{ t('consulting') }}</a></li>
          </ul>
        </div>

        <!-- Liens rapides -->
        <div class="footer-section">
          <h4 class="section-title">{{ t('quickLinks') }}</h4>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">{{ t('about') }}</a></li>
            <li><a href="#" class="footer-link">{{ t('contact') }}</a></li>
            <li><a href="#" class="footer-link">{{ t('privacy') }}</a></li>
            <li><a href="#" class="footer-link">{{ t('terms') }}</a></li>
            <li><a href="#" class="footer-link">{{ t('faq') }}</a></li>
          </ul>
        </div>

        <!-- Contact & Newsletter -->
        <div class="footer-section contact-section">
          <h4 class="section-title">{{ t('stayConnected') }}</h4>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <span>123 Rue de la Technologie<br>75001 Paris, France</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <span>+33 1 23 45 67 89</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <span>contact@skmern.com</span>
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
          <a href="#" class="social-link facebook" aria-label="Facebook">
            <span class="social-icon">📘</span>
          </a>
          <a href="#" class="social-link twitter" aria-label="Twitter">
            <span class="social-icon">🐦</span>
          </a>
          <a href="#" class="social-link instagram" aria-label="Instagram">
            <span class="social-icon">📷</span>
          </a>
          <a href="#" class="social-link linkedin" aria-label="LinkedIn">
            <span class="social-icon">💼</span>
          </a>
          <a href="#" class="social-link youtube" aria-label="YouTube">
            <span class="social-icon">📺</span>
          </a>
        </div>
      </div>

      <!-- Section Copyright -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} SKMERN. {{ t('allRightsReserved') }}</p>
          <p class="made-with">{{ t('madeWith') }} ❤️ {{ t('inParis') }}</p>
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
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    t(key) {
      return translationService.t(key)
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
  font-size: 1.5rem;
  position: relative;
  z-index: 1;
  transition: var(--transition-smooth);
}

.social-link:hover .social-icon {
  filter: brightness(0) invert(1);
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