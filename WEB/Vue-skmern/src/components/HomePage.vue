<!-- 
  Composant HomePage - Page d'accueil principale
  Design moderne avec animations 3D, thème bleu/noir
  Responsive pour desktop et mobile
-->
<template>
  <div class="home-page">
    <!-- Section Hero avec animation 3D -->
    <section class="hero-section" :class="`bg-image-${currentImageIndex + 1}`">
      <div class="hero-content">
        <!-- Animation de particules en arrière-plan -->
        <div class="particles-bg">
          <div v-for="i in 50" :key="i" class="particle"></div>
        </div>
        
        <!-- Contenu principal du hero -->
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="text-animate">Bienvenue chez</span>
            <span class="brand-name">SKMERN</span>
          </h1>
          <p class="hero-subtitle">
            Votre plateforme de services à domicile moderne et fiable
          </p>
          <div class="hero-buttons">
            <button class="cta-button primary" @click="scrollToServices">
              <span>Découvrir nos services</span>
              <div class="button-bg"></div>
            </button>
            <button class="cta-button secondary" @click="$emit('viewChange', 'register')">
              <span>Rejoindre maintenant</span>
              <div class="button-bg"></div>
            </button>
          </div>
        </div>
        
        <!-- Animation 3D du logo/illustration -->
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

    <!-- Section Services avec filtres -->
    <section ref="servicesSection" class="services-section">
      <div class="container">
        <h2 class="section-title">Nos Services</h2>
        <p class="section-subtitle">Des services de qualité pour votre quotidien</p>
        
        <!-- Filtres de catégorie -->
        <div class="service-filters">
          <button 
            v-for="category in serviceCategories" 
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="['filter-btn', { active: selectedCategory === category.id }]"
          >
            <span class="filter-icon">{{ category.icon }}</span>
            <span>{{ category.name }}</span>
          </button>
        </div>
        
        <!-- Grille des services -->
        <div class="services-grid">
          <div 
            v-for="service in filteredServices" 
            :key="service.id"
            class="service-card"
            @click="openServiceDetail(service)"
          >
            <div class="service-image">
              <div class="service-icon">{{ service.icon }}</div>
              <div class="service-overlay">
                <button class="view-details">Voir détails</button>
              </div>
            </div>
            <div class="service-content">
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <div class="service-rating">
                <div class="stars">
                  <span v-for="star in 5" :key="star" 
                        :class="['star', { filled: star <= service.rating }]">⭐</span>
                </div>
                <span class="rating-text">({{ service.reviews }} avis)</span>
              </div>
              <div class="service-price">
                À partir de <strong>{{ service.price }}€</strong>
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
        { id: 'menage', name: 'Ménage', icon: '🏠' },
        { id: 'jardinage', name: 'Jardinage', icon: '🌱' },
        { id: 'reparation', name: 'Réparation', icon: '🔧' },
        { id: 'livraison', name: 'Livraison', icon: '📦' },
        { id: 'garde', name: 'Garde d\'enfants', icon: '👶' }
      ],
      
      // Liste des services disponibles
      services: [
        {
          id: 1,
          title: 'Ménage complet',
          description: 'Service de ménage professionnel pour votre domicile',
          category: 'menage',
          icon: '🧹',
          rating: 4.8,
          reviews: 127,
          price: 25
        },
        {
          id: 2,
          title: 'Jardinage et tonte',
          description: 'Entretien de jardin et tonte de pelouse',
          category: 'jardinage',
          icon: '🌿',
          rating: 4.9,
          reviews: 89,
          price: 30
        },
        {
          id: 3,
          title: 'Réparation électrique',
          description: 'Dépannage et réparation électrique',
          category: 'reparation',
          icon: '⚡',
          rating: 4.7,
          reviews: 156,
          price: 45
        },
        {
          id: 4,
          title: 'Livraison courses',
          description: 'Livraison de vos courses à domicile',
          category: 'livraison',
          icon: '🛒',
          rating: 4.6,
          reviews: 203,
          price: 15
        },
        {
          id: 5,
          title: 'Garde d\'enfants',
          description: 'Service de garde qualifié et sécurisé',
          category: 'garde',
          icon: '🎈',
          rating: 4.9,
          reviews: 94,
          price: 20
        },
        {
          id: 6,
          title: 'Plomberie',
          description: 'Réparation et installation plomberie',
          category: 'reparation',
          icon: '🚿',
          rating: 4.5,
          reviews: 78,
          price: 50
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
    }
  },
  
  mounted() {
    // Animation automatique des témoignages
    this.startTestimonialRotation()
    
    // Animation automatique des images de fond
    this.startImageRotation()
    
    // Animation des particules au scroll
    this.initScrollAnimations()
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
      // Ici on pourrait ouvrir une modal ou naviguer vers une page de détail
      alert(`Détail du service: ${service.title}`)
    },
    
    // Rotation automatique des témoignages
    startTestimonialRotation() {
      setInterval(() => {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length
      }, 5000) // Change toutes les 5 secondes
    },
    
    // Rotation automatique des images de fond
    startImageRotation() {
      setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % 3 // 3 images au total
      }, 4000) // Change toutes les 4 secondes
    },
    
    // Initialisation des animations au scroll
    initScrollAnimations() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
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

/* Section Hero avec animations 3D */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: background-image 1s ease-in-out;
}

/* Images de fond - Image 1: Intérieur moderne */
.hero-section.bg-image-1 {
  background: 
    linear-gradient(135deg, rgba(30, 60, 114, 0.85) 0%, rgba(42, 82, 152, 0.8) 50%, rgba(15, 20, 25, 0.9) 100%),
    url('/images/photo1.jpg') center/cover no-repeat;
}

/* Images de fond - Image 2: Jardinage */
.hero-section.bg-image-2 {
  background: 
    linear-gradient(135deg, rgba(30, 60, 114, 0.85) 0%, rgba(42, 82, 152, 0.8) 50%, rgba(15, 20, 25, 0.9) 100%),
    url('/images/photo4.jpg') center/cover no-repeat;
}

/* Images de fond - Image 3: Services techniques */
.hero-section.bg-image-3 {
  background: 
    linear-gradient(135deg, rgba(30, 60, 114, 0.85) 0%, rgba(42, 82, 152, 0.8) 50%, rgba(15, 20, 25, 0.9) 100%),
    url('/images/photo3.jpg') center/cover no-repeat;
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

/* Animation de particules en arrière-plan */
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
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.particle:nth-child(odd) {
  animation-delay: -3s;
  animation-duration: 8s;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg);
    opacity: 0.3;
  }
  50% { 
    transform: translateY(-20px) rotate(180deg);
    opacity: 1;
  }
}

/* Contenu textuel du hero */
.hero-text {
  animation: slideInLeft 1s ease-out;
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
  text-shadow: 0 0 30px rgba(79, 172, 254, 0.5);
}

.hero-subtitle {
  font-size: 1.3rem;
  color: var(--text-gray);
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Boutons call-to-action avec animations */
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
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
}

.cta-button span {
  position: relative;
  z-index: 2;
}

.button-bg {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--accent-blue), var(--secondary-blue));
  transition: left 0.3s ease;
  z-index: 1;
}

.cta-button:hover .button-bg {
  left: 0;
}

.cta-button.primary {
  background: linear-gradient(45deg, var(--primary-blue), var(--secondary-blue));
  color: white;
  box-shadow: 0 8px 25px var(--shadow-color);
}

.cta-button.secondary {
  background: transparent;
  color: white;
  border: 2px solid var(--accent-blue);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px var(--shadow-color);
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

/* Filtres de services */
.service-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary-blue);
  border-color: var(--accent-blue);
  transform: translateY(-2px);
}

/* Grille des services */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.service-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.service-card:hover {
  transform: translateY(-10px) rotateX(5deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.service-image {
  position: relative;
  height: 150px;
  background: linear-gradient(45deg, var(--primary-blue), var(--secondary-blue));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.service-icon {
  font-size: 3rem;
  z-index: 2;
}

.service-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service-card:hover .service-overlay {
  opacity: 1;
}

.view-details {
  background: var(--accent-blue);
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
}

.service-content {
  padding: 1.5rem;
}

.service-title {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: white;
}

.service-description {
  color: var(--text-gray);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.service-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  gap: 0.2rem;
}

.star {
  opacity: 0.3;
  transition: opacity 0.3s ease;
}

.star.filled {
  opacity: 1;
}

.service-price {
  color: var(--accent-blue);
  font-size: 1.1rem;
  font-weight: 600;
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