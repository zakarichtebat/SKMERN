<!-- 
  Composant AppFooter - Footer moderne du site
  Design 3D avec animations, thème bleu/noir
  Responsive pour tous les appareils
-->
<template>
  <footer class="app-footer">
    <!-- Waves animation en arrière-plan -->
    <div class="footer-waves">
      <div class="wave wave-1"></div>
      <div class="wave wave-2"></div>
      <div class="wave wave-3"></div>
    </div>
    
    <div class="footer-content">
      <!-- Section principale du footer -->
      <div class="footer-main">
        <div class="footer-section company-info">
          <h3 class="footer-title">
            <span class="brand-logo">SKMERN</span>
          </h3>
          <p class="company-description">
            Votre plateforme de services à domicile de confiance. 
            Nous connectons les clients avec des professionnels qualifiés 
            pour tous vos besoins quotidiens.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <div class="social-icon">📘</div>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <div class="social-icon">🐦</div>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <div class="social-icon">📷</div>
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn">
              <div class="social-icon">💼</div>
            </a>
          </div>
        </div>

        <!-- Section Services -->
        <div class="footer-section">
          <h4 class="section-title">Nos Services</h4>
          <ul class="footer-links">
            <li><a href="#" @click="scrollToServices">Ménage</a></li>
            <li><a href="#" @click="scrollToServices">Jardinage</a></li>
            <li><a href="#" @click="scrollToServices">Réparation</a></li>
            <li><a href="#" @click="scrollToServices">Livraison</a></li>
            <li><a href="#" @click="scrollToServices">Garde d'enfants</a></li>
            <li><a href="#" @click="scrollToServices">Tous les services</a></li>
          </ul>
        </div>

        <!-- Section Support -->
        <div class="footer-section">
          <h4 class="section-title">Support</h4>
          <ul class="footer-links">
            <li><a href="#" @click="openSupport('help')">Centre d'aide</a></li>
            <li><a href="#" @click="openSupport('contact')">Nous contacter</a></li>
            <li><a href="#" @click="openSupport('faq')">FAQ</a></li>
            <li><a href="#" @click="openSupport('feedback')">Laisser un avis</a></li>
            <li><a href="#" @click="openSupport('report')">Signaler un problème</a></li>
          </ul>
        </div>

        <!-- Section Légal -->
        <div class="footer-section">
          <h4 class="section-title">Légal</h4>
          <ul class="footer-links">
            <li><a href="#" @click="openLegal('terms')">Conditions d'utilisation</a></li>
            <li><a href="#" @click="openLegal('privacy')">Politique de confidentialité</a></li>
            <li><a href="#" @click="openLegal('cookies')">Politique des cookies</a></li>
            <li><a href="#" @click="openLegal('gdpr')">RGPD</a></li>
          </ul>
        </div>

        <!-- Section Contact -->
        <div class="footer-section contact-info">
          <h4 class="section-title">Contact</h4>
          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <div class="contact-details">
              <span class="contact-label">Email</span>
              <a href="mailto:contact@skmern.com" class="contact-value">contact@skmern.com</a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📞</div>
            <div class="contact-details">
              <span class="contact-label">Téléphone</span>
              <a href="tel:+33123456789" class="contact-value">+33 1 23 45 67 89</a>
            </div>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <div class="contact-details">
              <span class="contact-label">Adresse</span>
              <span class="contact-value">123 Rue de la Paix<br>75001 Paris, France</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Newsletter signup -->
      <div class="newsletter-section">
        <div class="newsletter-content">
          <h3 class="newsletter-title">Restez informé</h3>
          <p class="newsletter-description">
            Recevez nos dernières actualités et offres spéciales
          </p>
          <form class="newsletter-form" @submit.prevent="subscribeNewsletter">
            <div class="input-group">
              <input 
                type="email" 
                v-model="newsletterEmail"
                placeholder="Votre adresse email"
                class="newsletter-input"
                required
              >
              <button type="submit" class="newsletter-button" :disabled="isSubscribing">
                <span v-if="!isSubscribing">S'abonner</span>
                <span v-else>⏳</span>
              </button>
            </div>
            <p v-if="subscriptionMessage" class="subscription-message" :class="messageType">
              {{ subscriptionMessage }}
            </p>
          </form>
        </div>
        <div class="newsletter-visual">
          <div class="floating-elements">
            <div class="floating-icon icon-1">✉️</div>
            <div class="floating-icon icon-2">🔔</div>
            <div class="floating-icon icon-3">⭐</div>
          </div>
        </div>
      </div>

      <!-- Ligne de séparation avec animation -->
      <div class="footer-divider">
        <div class="divider-line"></div>
      </div>

      <!-- Copyright et informations légales -->
      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; {{ currentYear }} SKMERN. Tous droits réservés.</p>
          <p class="legal-text">
            Plateforme de services à domicile · Société par actions simplifiée
          </p>
        </div>
        <div class="footer-badges">
          <div class="badge secure" title="Site sécurisé SSL">
            <div class="badge-icon">🔒</div>
            <span>Sécurisé</span>
          </div>
          <div class="badge certified" title="Services certifiés">
            <div class="badge-icon">✅</div>
            <span>Certifié</span>
          </div>
          <div class="badge support" title="Support 24/7">
            <div class="badge-icon">🛟</div>
            <span>Support 24/7</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to top button -->
    <button 
      class="back-to-top" 
      @click="scrollToTop"
      :class="{ visible: showBackToTop }"
      aria-label="Retour en haut"
    >
      <div class="arrow-up">⬆️</div>
    </button>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      // Email pour la newsletter
      newsletterEmail: '',
      
      // État du processus d'abonnement
      isSubscribing: false,
      
      // Message de confirmation/erreur
      subscriptionMessage: '',
      messageType: '', // 'success' ou 'error'
      
      // Affichage du bouton back-to-top
      showBackToTop: false,
      
      // Année actuelle pour le copyright
      currentYear: new Date().getFullYear()
    }
  },
  
  mounted() {
    // Gestion du scroll pour le bouton back-to-top
    window.addEventListener('scroll', this.handleScroll)
    
    // Animation des éléments au scroll
    this.initScrollAnimations()
  },
  
  beforeUnmount() {
    // Nettoyage des event listeners
    window.removeEventListener('scroll', this.handleScroll)
  },
  
  methods: {
    /**
     * Gestion du scroll pour afficher/masquer le bouton back-to-top
     */
    handleScroll() {
      this.showBackToTop = window.scrollY > 500
    },
    
    /**
     * Retour en haut de page avec animation smooth
     */
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    },
    
    /**
     * Scroll vers la section services
     */
    scrollToServices() {
      const servicesSection = document.querySelector('.services-section')
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    
    /**
     * Ouverture des pages de support
     * @param {string} type - Type de support (help, contact, faq, etc.)
     */
    openSupport(type) {
      // Simulation d'ouverture de modal ou redirection
      alert(`Ouverture de la page de support: ${type}`)
    },
    
    /**
     * Ouverture des pages légales
     * @param {string} type - Type de page légale (terms, privacy, etc.)
     */
    openLegal(type) {
      // Simulation d'ouverture de modal ou redirection
      alert(`Ouverture de la page légale: ${type}`)
    },
    
    /**
     * Abonnement à la newsletter
     */
    async subscribeNewsletter() {
      if (!this.newsletterEmail) return
      
      this.isSubscribing = true
      this.subscriptionMessage = ''
      
      try {
        // Simulation d'appel API
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Simulation de succès (90% de chance)
        if (Math.random() > 0.1) {
          this.subscriptionMessage = 'Merci ! Vous êtes maintenant abonné à notre newsletter.'
          this.messageType = 'success'
          this.newsletterEmail = ''
        } else {
          throw new Error('Erreur de connexion')
        }
      } catch (error) {
        this.subscriptionMessage = 'Erreur lors de l\'abonnement. Veuillez réessayer.'
        this.messageType = 'error'
      } finally {
        this.isSubscribing = false
        
        // Effacer le message après 5 secondes
        setTimeout(() => {
          this.subscriptionMessage = ''
        }, 5000)
      }
    },
    
    /**
     * Initialisation des animations au scroll
     */
    initScrollAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, {
        threshold: 0.1
      })
      
      // Observer les sections du footer
      this.$nextTick(() => {
        const sections = this.$el.querySelectorAll('.footer-section, .newsletter-section')
        sections.forEach(section => observer.observe(section))
      })
    }
  }
}
</script>

<style scoped>
/* Variables CSS pour le thème du footer */
:root {
  --footer-primary: #0a0e13;
  --footer-secondary: #1a1f2e;
  --footer-accent: #2a5298;
  --footer-blue: #4facfe;
  --footer-text: #ffffff;
  --footer-text-muted: #a0aec0;
  --footer-border: rgba(255, 255, 255, 0.1);
  --footer-hover: rgba(79, 172, 254, 0.2);
}

/* Container principal du footer */
.app-footer {
  position: relative;
  background: linear-gradient(135deg, var(--footer-primary) 0%, var(--footer-secondary) 100%);
  color: var(--footer-text);
  overflow: hidden;
  margin-top: auto;
}

/* Animation des vagues en arrière-plan */
.footer-waves {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  overflow: hidden;
  z-index: 1;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100px;
  background: linear-gradient(45deg, 
    transparent 0%, 
    rgba(79, 172, 254, 0.1) 50%, 
    transparent 100%);
  border-radius: 50%;
  animation: wave-animation 6s ease-in-out infinite;
}

.wave-1 {
  animation-delay: 0s;
  opacity: 0.7;
}

.wave-2 {
  animation-delay: -2s;
  opacity: 0.5;
}

.wave-3 {
  animation-delay: -4s;
  opacity: 0.3;
}

@keyframes wave-animation {
  0%, 100% {
    transform: translateX(-50%) rotate(0deg);
  }
  50% {
    transform: translateX(-50%) rotate(180deg);
  }
}

/* Contenu principal du footer */
.footer-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem 1rem;
}

/* Grille principale du footer */
.footer-main {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

/* Sections du footer */
.footer-section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.footer-section.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Informations de l'entreprise */
.company-info .footer-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.brand-logo {
  background: linear-gradient(45deg, var(--footer-blue), #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(79, 172, 254, 0.3);
}

.company-description {
  color: var(--footer-text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

/* Liens sociaux */
.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
  backdrop-filter: blur(10px);
  border: 1px solid var(--footer-border);
}

.social-link:hover {
  background: var(--footer-hover);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);
}

.social-icon {
  font-size: 1.2rem;
}

/* Titres des sections */
.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--footer-blue);
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(45deg, var(--footer-blue), transparent);
  border-radius: 1px;
}

/* Listes de liens */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: var(--footer-text-muted);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  position: relative;
  padding: 0.2rem 0;
}

.footer-links a:hover {
  color: var(--footer-blue);
  transform: translateX(5px);
}

.footer-links a::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--footer-blue);
  transition: width 0.3s ease;
}

.footer-links a:hover::before {
  width: 100%;
}

/* Section contact */
.contact-info .contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact-icon {
  width: 40px;
  height: 40px;
  background: var(--footer-accent);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 1.1rem;
}

.contact-details {
  flex: 1;
}

.contact-label {
  display: block;
  font-size: 0.85rem;
  color: var(--footer-text-muted);
  margin-bottom: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  color: var(--footer-text);
  text-decoration: none;
  font-weight: 500;
}

.contact-value:hover {
  color: var(--footer-blue);
}

/* Section Newsletter */
.newsletter-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  border: 1px solid var(--footer-border);
  backdrop-filter: blur(20px);
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: center;
}

.newsletter-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--footer-blue);
}

.newsletter-description {
  color: var(--footer-text-muted);
  margin-bottom: 1.5rem;
}

.newsletter-form {
  max-width: 400px;
}

.input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid var(--footer-border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--footer-text);
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.newsletter-input:focus {
  outline: none;
  border-color: var(--footer-blue);
  background: rgba(255, 255, 255, 0.15);
}

.newsletter-input::placeholder {
  color: var(--footer-text-muted);
}

.newsletter-button {
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, var(--footer-accent), var(--footer-blue));
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.newsletter-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
}

.newsletter-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.subscription-message {
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 8px;
  text-align: center;
}

.subscription-message.success {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.subscription-message.error {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

/* Éléments flottants de la newsletter */
.newsletter-visual {
  position: relative;
  height: 150px;
}

.floating-elements {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-icon {
  position: absolute;
  font-size: 2rem;
  animation: float-newsletter 4s ease-in-out infinite;
}

.icon-1 {
  top: 20px;
  left: 20px;
  animation-delay: 0s;
}

.icon-2 {
  top: 60px;
  right: 30px;
  animation-delay: -1.5s;
}

.icon-3 {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation-delay: -3s;
}

@keyframes float-newsletter {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

/* Ligne de séparation */
.footer-divider {
  margin: 2rem 0;
  text-align: center;
}

.divider-line {
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    var(--footer-border) 20%, 
    var(--footer-blue) 50%, 
    var(--footer-border) 80%, 
    transparent 100%);
  position: relative;
}

.divider-line::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: var(--footer-blue);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--footer-blue);
}

/* Footer bottom */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid var(--footer-border);
}

.copyright p {
  margin: 0;
  color: var(--footer-text-muted);
  font-size: 0.9rem;
}

.legal-text {
  font-size: 0.8rem !important;
  margin-top: 0.3rem !important;
}

/* Badges de confiance */
.footer-badges {
  display: flex;
  gap: 1rem;
}

.badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid var(--footer-border);
}

.badge-icon {
  font-size: 1rem;
}

/* Bouton back-to-top */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, var(--footer-accent), var(--footer-blue));
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(79, 172, 254, 0.3);
  transition: all 0.3s ease;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  z-index: 1000;
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  transform: translateY(-3px) scale(1.1);
  box-shadow: 0 8px 30px rgba(79, 172, 254, 0.5);
}

.arrow-up {
  font-size: 1.2rem;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

/* Design responsive */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }
  
  .company-info {
    grid-column: 1 / -1;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .newsletter-section {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .footer-content {
    padding: 2rem 1rem 1rem;
  }
  
  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  
  .company-info {
    grid-column: 1 / -1;
  }
  
  .contact-info {
    grid-column: 1 / -1;
  }
  
  .newsletter-section {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .footer-badges {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .back-to-top {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .newsletter-button {
    width: 100%;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .floating-elements {
    display: none;
  }
  
  .newsletter-section {
    grid-template-columns: 1fr;
  }
  
  .contact-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .badge {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
}

/* Optimisations pour les très petits écrans */
@media (max-width: 320px) {
  .footer-content {
    padding: 1.5rem 0.5rem 1rem;
  }
  
  .newsletter-section {
    padding: 1rem;
  }
  
  .company-info .footer-title {
    font-size: 1.5rem;
  }
  
  .newsletter-title {
    font-size: 1.2rem;
  }
}
</style> 