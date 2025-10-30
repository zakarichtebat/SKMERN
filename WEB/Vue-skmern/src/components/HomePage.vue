<!-- 
  Composant HomePage - Page d'accueil principale
  Design moderne avec animations 3D, thème bleu/noir
  Responsive pour desktop et mobile
-->
<template>
  <div class="home-page">
    <!-- Section Hero avec animation 3D -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="hero-image" :style="{ backgroundImage: 'url(' + currentImage + ')' }"></div>
        <div class="hero-overlay"></div>
      </div>
      
      <div class="hero-content">
        <!-- Animation de particules optimisée -->
        <div class="particles-bg">
          <div v-for="i in 10" :key="i" class="particle"></div>
        </div>
        
        <!-- Contenu principal du hero -->
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="text-animate">Bienvenue chez</span>
            <span class="brand-name">FIXILYA</span>
          </h1>
          <p class="hero-subtitle">
            Votre plateforme de services à domicile moderne et fiable
          </p>
          <div class="hero-buttons">
            <button class="cta-button primary" @click="scrollToServices">
              <span>Découvrir nos services</span>
            </button>
            <button class="cta-button secondary" @click="$emit('viewChange', 'register')">
              <span>Rejoindre maintenant</span>
            </button>
          </div>
        </div>
        
        <!-- Animation 3D simplifiée -->
        <div class="hero-visual">
          <div class="floating-card card-1">
            <div class="card-icon">🏠</div>
            <span>Ménage</span>
          </div>
          <div class="floating-card card-2">
            <div class="card-icon">🌱</div>
            <span>Jardinage</span>
          </div>
          <div class="floating-card card-3">
            <div class="card-icon">🔧</div>
            <span>Réparation</span>
          </div>
        </div>
        
        <!-- Indicateurs d'images -->
        <div class="hero-indicators">
          <button 
            v-for="(_, index) in 3" 
            :key="index"
            @click="currentImageIndex = index"
            :class="['indicator-dot', { active: currentImageIndex === index }]"
          ></button>
        </div>
      </div>
    </section>

    <!-- Section Services Ultra-Professionnelle -->
    <section ref="servicesSection" class="services-section">
      <div class="container">
        <!-- Header Section Premium -->
        <div class="services-header">
          <div class="header-content">
            <span class="header-badge">🏆 Excellence</span>
            <h2 class="section-title">Nos Services</h2>
            <p class="section-subtitle">Des solutions professionnelles adaptées à tous vos besoins quotidiens</p>
          </div>
          <div class="header-stats">
            <div class="stat-item">
              <span class="stat-number">1000+</span>
              <span class="stat-label">Interventions</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">98%</span>
              <span class="stat-label">Satisfaction</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">24h</span>
              <span class="stat-label">Support</span>
            </div>
          </div>
        </div>
        
        <!-- Filtres Ultra-Modernes -->
        <div class="service-filters">
          <button 
            v-for="category in serviceCategories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="['filter-btn', { active: selectedCategory === category.id }]"
          >
            <span class="filter-icon">{{ category.icon }}</span>
            <span>{{ category.name }}</span>
            <div class="filter-ripple"></div>
          </button>
        </div>
        
        <!-- Grille Services Premium -->
        <div class="services-grid">
          <div 
            v-for="service in filteredServices" 
            :key="service.id"
            class="service-card"
            @click="openServiceDetail(service)"
          >
            <!-- Background Pattern -->
            <div class="card-pattern"></div>
            
            <!-- Service Header -->
            <div class="service-header" :style="{ backgroundImage: 'linear-gradient(rgba(30, 60, 114, 0.8), rgba(79, 172, 254, 0.8)), url(' + service.image + ')' }">
              <div class="service-icon-container">
                <div class="service-icon">{{ service.icon }}</div>
                <div class="icon-glow"></div>
              </div>
              <div class="service-badge">Premium</div>
            </div>
            
            <!-- Service Content -->
            <div class="service-content">
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              
              <!-- Rating Premium -->
              <div class="service-rating">
                <div class="stars">
                  <span v-for="star in 5" :key="star" 
                        :class="['star', { filled: star <= service.rating }]">⭐</span>
                </div>
                <span class="rating-score">{{ service.rating }}</span>
                <span class="rating-text">({{ service.reviews }} avis)</span>
              </div>
              
              <!-- Features -->
              <div class="service-features">
                <div class="feature-item">
                  <span class="feature-icon">✓</span>
                  <span>Professionnel certifié</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">⚡</span>
                  <span>Intervention rapide</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🛡️</span>
                  <span>Assurance incluse</span>
                </div>
              </div>
              
              <!-- Price & Action -->
              <div class="service-footer">
                <div class="service-price">
                  <span class="price-label">À partir de</span>
                  <span class="price-value">{{ service.price }}€</span>
                  <span class="price-unit">/heure</span>
                </div>
                <button class="service-cta">
                  <span>Réserver</span>
                  <div class="cta-background"></div>
                </button>
              </div>
            </div>
            
                         <!-- Hover Effects -->
             <div class="card-overlay">
               <div class="overlay-content">
                 <h4>{{ service.title }}</h4>
                 <p>Disponible 7j/7</p>
                 <button class="view-details" @click.stop="openServiceDetail(service)">Voir détails</button>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section Témoignages -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">Ce que disent nos clients</h2>
        <div class="testimonials-slider">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            :class="['testimonial-card', { active: currentTestimonial === index }]"
          >
            <div class="testimonial-content">
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
              <div class="testimonial-author">
                <div class="author-avatar">{{ testimonial.avatar }}</div>
                <div class="author-info">
                  <h4>{{ testimonial.name }}</h4>
                  <span>{{ testimonial.service }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation des témoignages -->
        <div class="testimonial-nav">
          <button 
            v-for="(_, index) in testimonials" 
            :key="index"
            @click="currentTestimonial = index"
            :class="['nav-dot', { active: currentTestimonial === index }]"
          ></button>
        </div>
      </div>
    </section>

    <!-- Section Call to Action finale -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Prêt à commencer ?</h2>
          <p class="cta-text">Rejoignez des milliers de clients satisfaits</p>
          <button class="cta-button large" @click="$emit('viewChange', 'register')">
            <span>Créer mon compte</span>
            <div class="button-bg"></div>
          </button>
        </div>
        <div class="cta-visual">
          <div class="rotating-element"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  emits: ['viewChange'],
  data() {
    return {
      // Catégorie sélectionnée pour le filtre des services
      selectedCategory: 'all',
      
      // Index du témoignage actuellement affiché
      currentTestimonial: 0,
      
      // Index de l'image de fond actuelle (0, 1, 2 pour 3 images)
      currentImageIndex: 0,
      
      // Categories de services disponibles
      serviceCategories: [
        { id: 'all', name: 'Tous', icon: '🔍' },
        { id: 'jardinage', name: 'Jardinage', icon: '🌱' },
        { id: 'plomberie', name: 'Plomberie', icon: '🚿' },
        { id: 'electricite', name: 'Électricité', icon: '⚡' },
        { id: 'climatisation', name: 'Climatisation', icon: '❄️' }
      ],
      
      // Liste des services disponibles
      services: [
        {
          id: 1,
          title: 'Jardinage et tonte',
          description: 'Entretien complet de jardin, tonte de pelouse, taille des haies et plantation',
          category: 'jardinage',
          icon: '🌿',
          rating: 4.9,
          reviews: 156,
          price: 30,
          features: ['Tonte de pelouse', 'Taille des haies', 'Plantation', 'Désherbage'],
          image: '/images/photo1.jpg'
        },
        {
          id: 2,
          title: 'Plomberie',
          description: 'Réparation et installation plomberie, dépannage d\'urgence 24h/24',
          category: 'plomberie',
          icon: '🚿',
          rating: 4.8,
          reviews: 198,
          price: 50,
          features: ['Réparation fuites', 'Installation sanitaires', 'Débouchage', 'Urgence 24h'],
          image: '/images/photo2.jpg'
        },
        {
          id: 3,
          title: 'Électricité',
          description: 'Installation électrique, dépannage et mise aux normes par électriciens certifiés',
          category: 'electricite',
          icon: '⚡',
          rating: 4.7,
          reviews: 234,
          price: 45,
          features: ['Installation électrique', 'Dépannage urgent', 'Mise aux normes', 'Éclairage LED'],
          image: '/images/photo3.jpg'
        },
        {
          id: 4,
          title: 'Climatisation',
          description: 'Installation, entretien et réparation de systèmes de climatisation et chauffage',
          category: 'climatisation',
          icon: '❄️',
          rating: 4.9,
          reviews: 142,
          price: 60,
          features: ['Installation clim', 'Entretien annuel', 'Réparation', 'Dépannage urgence'],
          image: '/images/photo4.jpg'
        }
      ],
      
      // Témoignages clients
      testimonials: [
        {
          text: 'Service impeccable ! L\'équipe de ménage était très professionnelle et efficace.',
          name: 'Marie Dubois',
          service: 'Service ménage',
          avatar: '👩'
        },
        {
          text: 'Mon jardin n\'a jamais été aussi beau. Je recommande vivement leurs services.',
          name: 'Pierre Martin',
          service: 'Jardinage',
          avatar: '👨'
        },
        {
          text: 'Dépannage électrique rapide et de qualité. Très satisfaite du service.',
          name: 'Sophie Laurent',
          service: 'Réparation',
          avatar: '👩‍💼'
        }
      ]
    }
  },
  
  computed: {
    // Services filtrés selon la catégorie sélectionnée
    filteredServices() {
      if (this.selectedCategory === 'all') {
        return this.services
      }
      return this.services.filter(service => service.category === this.selectedCategory)
    },
    
    // Image actuelle pour le background
    currentImage() {
      const images = ['/photo1.jpg', '/photo4.jpg', '/photo3.jpg']
      return images[this.currentImageIndex]
    }
  },
  
  mounted() {
    // Animation automatique des témoignages (plus lente)
    this.testimonialTimer = setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length
    }, 6000) // Changé de 5s à 6s
    
    // Animation automatique des images de fond (plus lente)
    this.imageTimer = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % 3
    }, 8000) // Changé de 4s à 8s
    
    // Animation des particules au scroll
    this.initScrollAnimations()
  },
  
  beforeUnmount() {
    // Nettoyage des timers pour éviter les fuites mémoire
    if (this.testimonialTimer) {
      clearInterval(this.testimonialTimer)
    }
    if (this.imageTimer) {
      clearInterval(this.imageTimer)
    }
  },
  
  methods: {
    // Défilement vers la section services
    scrollToServices() {
      this.$refs.servicesSection?.scrollIntoView({ 
        behavior: 'smooth' 
      })
    },
    
    // Ouverture du détail d'un service
    openServiceDetail(service) {
      this.$emit('viewChange', 'serviceDetail', service)
    },
    
    // Initialisation des animations au scroll
    initScrollAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      })
      
      // Observer les sections pour les animations
      document.querySelectorAll('.services-section, .testimonials-section, .cta-section')
        .forEach(section => observer.observe(section))
    }
  }
}
</script>

<style scoped>
/* Variables CSS pour le thème bleu/noir */
:root {
  --primary-blue: #1e3c72;
  --secondary-blue: #2a5298;
  --accent-blue: #4facfe;
  --dark-bg: #0f1419;
  --darker-bg: #0a0e13;
  --text-light: #ffffff;
  --text-gray: #a0aec0;
  --shadow-color: rgba(30, 60, 114, 0.3);
}

/* Container principal responsive */
.home-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--darker-bg) 100%);
  color: var(--text-light);
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
}

/* Section Hero optimisée */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: opacity 0.8s ease-in-out;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(30, 60, 114, 0.85) 0%, rgba(42, 82, 152, 0.8) 50%, rgba(15, 20, 25, 0.9) 100%);
}

.hero-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* Animation de particules optimisée */
.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  animation: float 8s ease-in-out infinite;
}

.particle:nth-child(odd) {
  animation-delay: -4s;
}

.particle:nth-child(even) {
  animation-delay: -2s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px);
    opacity: 0.2;
  }
  50% { 
    transform: translateY(-15px);
    opacity: 0.6;
  }
}

/* Contenu textuel du hero */
.hero-text {
  animation: slideInLeft 0.8s ease-out;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.text-animate {
  display: block;
  color: var(--text-gray);
  font-size: 1.8rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.brand-name {
  background: linear-gradient(45deg, var(--accent-blue), #ffffff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: var(--text-gray);
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Boutons optimisés */
.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-button {
  position: relative;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  overflow: hidden;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.cta-button.primary {
  background: linear-gradient(45deg, var(--primary-blue), var(--secondary-blue));
  color: white;
  box-shadow: 0 4px 15px var(--shadow-color);
}

.cta-button.primary:hover {
  box-shadow: 0 8px 25px var(--shadow-color);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid var(--accent-blue);
}

.cta-button.secondary:hover {
  background: var(--accent-blue);
}

/* Animations 3D des cartes flottantes */
.hero-visual {
  position: relative;
  height: 400px;
  animation: slideInRight 1s ease-out;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  text-align: center;
  color: white;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: cardFloat 6s ease-in-out infinite;
}

.card-1 {
  top: 50px;
  left: 50px;
  animation-delay: 0s;
}

.card-2 {
  top: 150px;
  right: 50px;
  animation-delay: -2s;
}

.card-3 {
  bottom: 50px;
  left: 100px;
  animation-delay: -4s;
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

@keyframes cardFloat {
  0%, 100% { 
    transform: translateY(0px) rotateX(0deg);
  }
  50% { 
    transform: translateY(-20px) rotateX(10deg);
  }
}

/* Indicateurs d'images du hero */
.hero-indicators {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 3;
}

.indicator-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background: var(--accent-blue);
  border-color: var(--accent-blue);
  transform: scale(1.2);
}

.indicator-dot:hover {
  border-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.1);
}

/* Section Services */
.services-section {
  padding: 5rem 0;
  background: var(--dark-bg);
}

.section-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--accent-blue), white);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  color: var(--text-gray);
  font-size: 1.2rem;
  margin-bottom: 3rem;
}

/* Section Services Ultra-Professionnelle */
.services-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #0a0e13 0%, #1a1d29 50%, #0f1419 100%);
  position: relative;
  overflow: hidden;
}

.services-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(30, 60, 114, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(79, 172, 254, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

/* Header Section Premium */
.services-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.header-content {
  flex: 1;
  max-width: 600px;
}

.header-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
}

.header-stats {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem 1rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 800;
  color: var(--accent-blue);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-gray);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Filtres Ultra-Modernes */
.service-filters {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  position: relative;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 2px solid rgba(255, 255, 255, 0.15);
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 600;
  font-size: 1rem;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
  min-width: 140px;
  justify-content: center;
}

.filter-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.6s ease;
}

.filter-btn:hover::before {
  left: 100%;
}

.filter-btn:hover {
  background: rgba(30, 60, 114, 0.3);
  border-color: var(--accent-blue);
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 30px rgba(79, 172, 254, 0.2);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
  border-color: var(--accent-blue);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.3);
}

.filter-icon {
  font-size: 1.2rem;
}

.filter-ripple {
  position: absolute;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transition: all 0.4s ease;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.filter-btn:active .filter-ripple {
  width: 100px;
  height: 100px;
}

/* Grille Services Premium */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
  position: relative;
}

.service-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(79, 172, 254, 0.2);
}

.card-pattern {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 20%, rgba(79, 172, 254, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(30, 60, 114, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

/* Service Header */
.service-header {
  height: 120px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px 20px 0 0;
}

.service-icon-container {
  position: relative;
  z-index: 2;
}

.service-icon {
  font-size: 2.5rem;
  display: block;
  text-align: center;
}

.service-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, #ffd700, #ffb300);
  color: #000;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  z-index: 2;
}

/* Service Content */
.service-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.service-title {
  color: var(--text-light);
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  line-height: 1.3;
}

.service-description {
  color: var(--text-gray);
  margin-bottom: 1.5rem;
  line-height: 1.6;
  font-size: 0.95rem;
  flex-grow: 1;
}

/* Rating simplifié */
.service-rating {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  font-size: 1rem;
  opacity: 0.3;
  transition: opacity 0.2s ease;
}

.star.filled {
  opacity: 1;
}

.rating-score {
  font-weight: 700;
  color: var(--accent-blue);
  font-size: 1.1rem;
}

.rating-text {
  color: var(--text-gray);
  font-size: 0.9rem;
}

/* Features */
.service-features {
  margin-bottom: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-gray);
}

.feature-icon {
  width: 18px;
  height: 18px;
  background: var(--accent-blue);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
}

/* Service Footer */
.service-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  gap: 1rem;
  flex-wrap: wrap;
}

.service-price {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.price-label {
  font-size: 0.8rem;
  color: var(--text-gray);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.price-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--accent-blue);
  line-height: 1;
}

.price-unit {
  font-size: 0.8rem;
  color: var(--text-gray);
}

.service-cta {
  background: linear-gradient(135deg, var(--accent-blue), #00bcd4);
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-width: 100px;
}

.service-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
}

/* Card Overlay simplifié */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(30, 60, 114, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service-card:hover .card-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
}

.overlay-content h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.overlay-content p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.view-details {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s ease;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .services-header {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  
  .header-stats {
    justify-content: center;
    gap: 1rem;
  }
  
  .stat-item {
    padding: 1rem 0.8rem;
  }
  
  .service-filters {
    gap: 1rem;
  }
  
  .filter-btn {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    min-width: 120px;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .service-card {
    height: 380px;
  }
  
  .service-content {
    padding: 1.5rem;
    height: 260px;
  }
}

@media (max-width: 480px) {
  .services-section {
    padding: 4rem 0;
  }
  
  .service-filters {
    gap: 0.5rem;
  }
  
  .filter-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    min-width: 100px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .service-footer {
    flex-direction: column;
    gap: 1rem;
  }
  
  .service-cta {
    width: 100%;
  }
}

/* Section Témoignages */
.testimonials-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--darker-bg) 0%, var(--dark-bg) 100%);
}

.testimonials-slider {
  position: relative;
  height: 200px;
  margin: 2rem 0;
}

.testimonial-card {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) scale(0.8);
  width: 100%;
  max-width: 600px;
  opacity: 0;
  transition: all 0.5s ease;
}

.testimonial-card.active {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

.testimonial-content {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.testimonial-text {
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  color: white;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.author-info h4 {
  color: white;
  margin-bottom: 0.2rem;
}

.author-info span {
  color: var(--text-gray);
  font-size: 0.9rem;
}

.testimonial-nav {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.nav-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-dot.active {
  background: var(--accent-blue);
  transform: scale(1.2);
}

/* Section CTA finale */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
}

.cta-section .container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.cta-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
}

.cta-text {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.cta-button.large {
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
}

.cta-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rotating-element {
  width: 200px;
  height: 200px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  to { transform: rotate(360deg); }
}

/* Animations d'entrée */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-in {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Design responsive pour mobiles et tablettes */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .text-animate {
    font-size: 1.4rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .hero-visual {
    height: 300px;
  }
  
  .floating-card {
    padding: 1rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }
  
  .filter-btn {
    white-space: nowrap;
  }
  
  .cta-section .container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .testimonial-content {
    padding: 1.5rem;
  }
  
  .testimonial-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .text-animate {
    font-size: 1.2rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-button {
    width: 100%;
    max-width: 280px;
  }
  
  .service-card {
    margin: 0 0.5rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .floating-card {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
  
  .card-icon {
    font-size: 1.5rem;
  }
}

/* Optimisations pour les très petits écrans */
@media (max-width: 320px) {
  .hero-section {
    min-height: 80vh;
  }
  
  .services-section,
  .testimonials-section,
  .cta-section {
    padding: 3rem 0;
  }
  
  .hero-title {
    font-size: 1.8rem;
  }
  
  .section-title {
    font-size: 1.6rem;
  }
}
</style> 