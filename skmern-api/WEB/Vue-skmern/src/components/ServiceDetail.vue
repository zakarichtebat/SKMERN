<template>
  <div class="service-detail" v-if="service">
    <!-- Header avec retour -->
    <div class="detail-header">
      <button type="button" @click.stop.prevent="handleGoBack" class="back-button">
        <span class="back-icon">←</span>
        <span>Retour aux services</span>
      </button>
      <div class="service-breadcrumb">
        <span>Services</span>
        <span class="separator">></span>
        <span>{{ service.title }}</span>
      </div>
    </div>

    <!-- Hero Section du service -->
    <section class="service-hero">
      <div class="hero-content">
        <div class="hero-text">
          <div class="service-badge">{{ service.category }}</div>
          <h1 class="service-title">
            <span class="service-icon">{{ service.icon }}</span>
            {{ service.title }}
          </h1>
          <p class="service-description">{{ service.description }}</p>
          
          <!-- Rating et prix -->
          <div class="service-meta">
            <div class="rating-section">
              <div class="stars">
                <span v-for="star in 5" :key="star" 
                      :class="['star', { filled: star <= service.rating }]">⭐</span>
              </div>
              <span class="rating-score">{{ service.rating }}/5</span>
             
            </div>
            <div class="price-section">
              <span class="price-label">À partir de votre besoins</span>
             
              <span class="price-unit">/heure</span>
            </div>
          </div>
          
          <!-- CTA Principal -->
          <div class="hero-actions">
            <button type="button" class="primary-cta">
              <span>Réserver maintenant</span>
              <div class="cta-background"></div>
            </button>
            <button type="button" class="secondary-cta">
              <span>Demander un devis</span>
            </button>
          </div>
        </div>
        
        <!-- Image principale -->
        <div class="hero-image">
          <img :src="service.image || '/images/default-service.jpg'" :alt="service.title" />
          <div class="image-overlay">
            <button type="button" class="play-video" @click.prevent="showVideoModal = true">
              <span class="play-icon">▶</span>
              <span>Voir la vidéo</span>
            </button>
          </div>
        </div>
      </div>
    </section>


    <!-- Galerie Photos Améliorée -->
    <section class="gallery-section">
      <div class="container">
        <h2 class="section-title">Galerie Photos</h2>
        <p class="section-subtitle">Découvrez nos réalisations et notre savoir-faire en images</p>
        <div class="photos-grid">
          <div v-for="(photo, index) in servicePhotos" :key="index" 
               class="photo-item" @click="openPhotoModal(index)">
            <img :src="photo.url" :alt="photo.alt" loading="lazy" />
            <div class="photo-overlay">
              <span class="zoom-icon">🔍</span>
              <div class="photo-title">{{ photo.alt }}</div>
            </div>
          </div>
        </div>
        
        <!-- Compteur de photos -->
        <div class="gallery-counter">
          <span class="counter-text">{{ servicePhotos.length }} photos disponibles</span>
          <div class="counter-stats">
            <div class="stat-item">
              <span class="stat-icon">📸</span>
              <span>Haute qualité</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon">✨</span>
              <span>Réalisations récentes</span>
            </div>
            <div class="stat-item">
              <span class="stat-icon">🏆</span>
              <span>Travail certifié</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  

   

    <!-- CTA Final -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Prêt à réserver ce service ?</h2>
          <p class="cta-subtitle">Nos professionnels sont disponibles pour vous accompagner</p>
          <div class="cta-actions">
            <button type="button" class="primary-cta large">
              <span>Réserver maintenant</span>
              <div class="cta-background"></div>
            </button>
            <div class="contact-info">
              <span class="phone">📞 06 19 95 58 98</span>
              <span class="availability">Disponible 24h/24</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal Photo -->
    <div v-if="showPhotoModal" class="modal-overlay" @click="closePhotoModal">
      <div class="photo-modal" @click.stop>
        <button type="button" class="modal-close" @click.prevent="closePhotoModal">×</button>
        <img :src="servicePhotos[currentPhotoIndex]?.url" :alt="servicePhotos[currentPhotoIndex]?.alt" />
        <div class="photo-nav">
          <button type="button" @click.prevent="prevPhoto" class="nav-button">‹</button>
          <span class="photo-counter">{{ currentPhotoIndex + 1 }} / {{ servicePhotos.length }}</span>
          <button type="button" @click.prevent="nextPhoto" class="nav-button">›</button>
        </div>
      </div>
    </div>

    <!-- Modal Vidéo -->
    <div v-if="showVideoModal" class="modal-overlay" @click="closeVideoModal">
      <div class="video-modal" @click.stop>
        <button type="button" class="modal-close" @click.prevent="closeVideoModal">×</button>
        <div class="video-player">
          <video v-if="currentVideo" controls autoplay>
            <source :src="currentVideo.url" type="video/mp4">
            Votre navigateur ne supporte pas la lecture vidéo.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceDetail',
  props: {
    service: {
      type: Object,
      required: true
    }
  },
  emits: ['goBack'],
  data() {
    return {
      showPhotoModal: false,
      showVideoModal: false,
      currentPhotoIndex: 0,
      currentVideo: null
    }
  },
  computed: {
    servicePhotos() {
      // Photos spécifiques selon le service avec vraies images disponibles
      const photosSets = {
        jardinage: [
          { url: '/photo1.jpg', alt: 'Jardinage professionnel - Tonte de pelouse' },
          { url: '/photo3.jpg', alt: 'Entretien d\'espaces verts' },
          { url: '/photo4.jpg', alt: 'Aménagement paysager' },
          { url: '/photo1.jpg', alt: 'Taille des haies et arbustes' },
          { url: '/photo3.jpg', alt: 'Plantation et semis' },
          { url: '/photo4.jpg', alt: 'Nettoyage de jardin' },
          { url: '/photo1.jpg', alt: 'Arrosage automatique' },
          { url: '/photo3.jpg', alt: 'Création de massifs' }
        ],
        plomberie: [
          { url: '/photo4.jpg', alt: 'Réparation de fuite d\'eau' },
          { url: '/photo1.jpg', alt: 'Installation sanitaire complète' },
          { url: '/photo3.jpg', alt: 'Débouchage de canalisations' },
          { url: '/photo4.jpg', alt: 'Maintenance plomberie' },
          { url: '/photo1.jpg', alt: 'Installation de robinetterie' },
          { url: '/photo3.jpg', alt: 'Réparation chauffe-eau' },
          { url: '/photo4.jpg', alt: 'Détection de fuites' },
          { url: '/photo1.jpg', alt: 'Raccordement eau' }
        ],
        electricite: [
          { url: '/photo3.jpg', alt: 'Installation électrique moderne' },
          { url: '/photo4.jpg', alt: 'Tableau électrique aux normes' },
          { url: '/photo1.jpg', alt: 'Éclairage LED professionnel' },
          { url: '/photo3.jpg', alt: 'Dépannage électrique urgent' },
          { url: '/photo4.jpg', alt: 'Câblage et raccordements' },
          { url: '/photo1.jpg', alt: 'Installation prises électriques' },
          { url: '/photo3.jpg', alt: 'Mise aux normes électriques' },
          { url: '/photo4.jpg', alt: 'Diagnostic électrique' }
        ],
        climatisation: [
          { url: '/photo1.jpg', alt: 'Installation climatisation murale' },
          { url: '/photo4.jpg', alt: 'Entretien climatiseur professionnel' },
          { url: '/photo3.jpg', alt: 'Réparation système de clim' },
          { url: '/photo1.jpg', alt: 'Climatisation multi-split' },
          { url: '/photo4.jpg', alt: 'Nettoyage filtre climatisation' },
          { url: '/photo3.jpg', alt: 'Installation groupe extérieur' },
          { url: '/photo1.jpg', alt: 'Maintenance préventive clim' },
          { url: '/photo4.jpg', alt: 'Réglage température optimale' }
        ]
      }
      return photosSets[this.service.category] || [
        { url: '/photo1.jpg', alt: 'Service professionnel' },
        { url: '/photo3.jpg', alt: 'Intervention de qualité' },
        { url: '/photo4.jpg', alt: 'Résultat garanti' }
      ]
    },
    
    serviceVideos() {
      // Vidéos spécifiques selon le service
      const videosSets = {
        jardinage: [
          {
            title: 'Tonte de pelouse professionnelle',
            description: 'Découvrez notre technique de tonte pour un résultat parfait',
            thumbnail: '/photo1.jpg',
            url: '#',
            duration: '2:30'
          },
          {
            title: 'Aménagement paysager complet',
            description: 'Transformation complète d\'un espace extérieur',
            thumbnail: '/photo3.jpg',
            url: '#',
            duration: '4:15'
          },
          {
            title: 'Entretien des espaces verts',
            description: 'Nos techniques d\'entretien saisonnier',
            thumbnail: '/photo4.jpg',
            url: '#',
            duration: '3:45'
          }
        ],
        plomberie: [
          {
            title: 'Réparation de fuite d\'eau urgente',
            description: 'Intervention rapide pour stopper les fuites',
            thumbnail: '/photo4.jpg',
            url: '#',
            duration: '1:45'
          },
          {
            title: 'Installation sanitaire complète',
            description: 'Étapes complètes d\'installation salle de bain',
            thumbnail: '/photo1.jpg',
            url: '#',
            duration: '5:20'
          },
          {
            title: 'Débouchage canalisation',
            description: 'Techniques professionnelles de débouchage',
            thumbnail: '/photo3.jpg',
            url: '#',
            duration: '2:10'
          }
        ],
        electricite: [
          {
            title: 'Installation tableau électrique',
            description: 'Mise aux normes électriques par nos experts',
            thumbnail: '/photo3.jpg',
            url: '#',
            duration: '3:45'
          },
          {
            title: 'Dépannage électrique urgent',
            description: 'Intervention rapide pour panne électrique',
            thumbnail: '/photo4.jpg',
            url: '#',
            duration: '2:10'
          },
          {
            title: 'Installation éclairage LED',
            description: 'Modernisation de l\'éclairage intérieur',
            thumbnail: '/photo1.jpg',
            url: '#',
            duration: '3:30'
          }
        ],
        climatisation: [
          {
            title: 'Installation climatiseur split',
            description: 'Pose complète d\'un système de climatisation',
            thumbnail: '/photo1.jpg',
            url: '#',
            duration: '5:30'
          },
          {
            title: 'Entretien annuel climatisation',
            description: 'Maintenance préventive pour optimiser votre clim',
            thumbnail: '/photo4.jpg',
            url: '#',
            duration: '2:55'
          },
          {
            title: 'Réparation groupe extérieur',
            description: 'Diagnostic et réparation système de clim',
            thumbnail: '/photo3.jpg',
            url: '#',
            duration: '4:15'
          }
        ]
      }
      return videosSets[this.service.category] || []
    },
    
    serviceTestimonials() {
      // Témoignages spécifiques selon le service
      const testimonialsSets = {
        jardinage: [
          {
            name: 'Marie Dubois',
            rating: 5,
            text: 'Excellent travail de jardinage ! Mon jardin n\'a jamais été aussi beau. L\'équipe est très professionnelle.',
            date: '15 Mars 2024'
          },
          {
            name: 'Pierre Martin',
            rating: 5,
            text: 'Service de tonte impeccable, ponctuel et soigné. Je recommande vivement.',
            date: '8 Mars 2024'
          }
        ],
        plomberie: [
          {
            name: 'Sophie Laurent',
            rating: 5,
            text: 'Dépannage plomberie très rapide. Fuite réparée en 30 minutes. Merci !',
            date: '20 Mars 2024'
          },
          {
            name: 'Jean Moreau',
            rating: 4,
            text: 'Installation de lavabo parfaite. Travail propre et prix correct.',
            date: '12 Mars 2024'
          }
        ],
        electricite: [
          {
            name: 'Claire Bernard',
            rating: 5,
            text: 'Électricien très compétent. Mise aux normes réalisée rapidement.',
            date: '18 Mars 2024'
          },
          {
            name: 'David Chen',
            rating: 5,
            text: 'Dépannage électrique en urgence. Intervention rapide et efficace.',
            date: '10 Mars 2024'
          }
        ],
        climatisation: [
          {
            name: 'Anne Petit',
            rating: 5,
            text: 'Installation de climatisation parfaite. L\'équipe est très professionnelle.',
            date: '22 Mars 2024'
          },
          {
            name: 'Michel Durand',
            rating: 4,
            text: 'Entretien de clim bien fait. Service de qualité, je recommande.',
            date: '5 Mars 2024'
          }
        ]
      }
      return testimonialsSets[this.service.category] || []
    }
  },
  methods: {
    handleGoBack(event) {
      // Empêcher toute navigation par défaut
      if (event) {
        event.preventDefault()
        event.stopPropagation()
      }
      // Émet l'événement pour retourner à la page précédente
      this.$emit('goBack')
    },
    
    openPhotoModal(index) {
      this.currentPhotoIndex = index
      this.showPhotoModal = true
    },
    
    closePhotoModal() {
      this.showPhotoModal = false
    },
    
    prevPhoto() {
      this.currentPhotoIndex = this.currentPhotoIndex > 0 
        ? this.currentPhotoIndex - 1 
        : this.servicePhotos.length - 1
    },
    
    nextPhoto() {
      this.currentPhotoIndex = this.currentPhotoIndex < this.servicePhotos.length - 1 
        ? this.currentPhotoIndex + 1 
        : 0
    },
    
    playVideo(video) {
      this.currentVideo = video
      this.showVideoModal = true
    },
    
    closeVideoModal() {
      this.showVideoModal = false
      this.currentVideo = null
    }
  }
}
</script>

<style scoped>
/* Variables pour le thème */
:root {
  --primary-blue: #1e3c72;
  --secondary-blue: #2a5298;
  --accent-blue: #4facfe;
  --dark-bg: #0f1419;
  --darker-bg: #0a0e13;
  --text-light: #ffffff;
  --text-gray: #a0aec0;
}

/* Container principal */
.service-detail {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--dark-bg) 0%, var(--darker-bg) 100%);
  color: var(--text-light);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Header avec navigation */
.detail-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}

.back-button {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 600;
  margin: 0 2rem 1rem 2rem;
}

.back-button:hover {
  background: var(--primary-blue);
  transform: translateX(-5px);
}

.back-icon {
  font-size: 1.2rem;
}

.service-breadcrumb {
  margin: 0 2rem;
  color: var(--text-gray);
  font-size: 0.9rem;
}

.separator {
  margin: 0 0.5rem;
  opacity: 0.5;
}

/* Hero Section */
.service-hero {
  padding: 4rem 0;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.service-badge {
  background: linear-gradient(135deg, var(--accent-blue), #00bcd4);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  margin-bottom: 1rem;
}

.service-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  line-height: 1.2;
}

.service-icon {
  font-size: 3.5rem;
}

.service-description {
  font-size: 1.2rem;
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* Meta informations */
.service-meta {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.rating-section, .price-section {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
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

.rating-score {
  font-weight: 700;
  color: var(--accent-blue);
}

.reviews-count {
  color: var(--text-gray);
  font-size: 0.9rem;
}

.price-section {
  background: rgba(255, 255, 255, 0.05);
  padding: 0.8rem 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.price-label {
  font-size: 0.9rem;
  color: var(--text-gray);
}

.price-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--accent-blue);
  margin: 0 0.3rem;
}

.price-unit {
  font-size: 0.9rem;
  color: var(--text-gray);
}

/* Actions CTA */
.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-cta, .secondary-cta {
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.primary-cta {
  background: linear-gradient(135deg, var(--accent-blue), #00bcd4);
  border: none;
  color: white;
}

.primary-cta:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(79, 172, 254, 0.4);
}

.secondary-cta {
  background: transparent;
  border: 2px solid var(--accent-blue);
  color: var(--accent-blue);
}

.secondary-cta:hover {
  background: var(--accent-blue);
  color: white;
}

.cta-background {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: all 0.6s ease;
}

.primary-cta:hover .cta-background {
  left: 100%;
}

/* Image Hero */
.hero-image {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.hero-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-image:hover .image-overlay {
  opacity: 1;
}

.play-video {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: var(--primary-blue);
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.play-video:hover {
  transform: scale(1.05);
}

.play-icon {
  font-size: 1.2rem;
}

/* Sections communes */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--accent-blue), #00bcd4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  text-align: center;
  color: var(--text-gray);
  font-size: 1.1rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

/* Section Features */
.features-section {
  padding: 5rem 0;
  background: rgba(255, 255, 255, 0.02);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(79, 172, 254, 0.15);
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--accent-blue), #00bcd4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 0 auto 1rem auto;
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
}

.feature-description {
  color: var(--text-gray);
  line-height: 1.5;
}

/* Galerie Photos Améliorée */
.gallery-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, rgba(30, 60, 114, 0.05), rgba(79, 172, 254, 0.05));
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.photo-item {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.photo-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px rgba(79, 172, 254, 0.25);
}

.photo-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.photo-item:hover img {
  transform: scale(1.1);
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(30, 60, 114, 0.7), rgba(79, 172, 254, 0.7));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.photo-item:hover .photo-overlay {
  opacity: 1;
}

.zoom-icon {
  font-size: 2rem;
  color: white;
  background: rgba(255, 255, 255, 0.2);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.photo-item:hover .zoom-icon {
  transform: scale(1.1);
  background: rgba(255, 255, 255, 0.3);
}

.photo-title {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  padding: 0 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease 0.1s;
}

.photo-item:hover .photo-title {
  opacity: 1;
  transform: translateY(0);
}

/* Amélioration de la grille pour différentes tailles d'écran */
@media (min-width: 768px) {
  .photos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .photos-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1200px) {
  .photos-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Compteur de galerie */
.gallery-counter {
  margin-top: 3rem;
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.counter-text {
  display: block;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--accent-blue);
  margin-bottom: 1.5rem;
}

.counter-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-gray);
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-icon {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .counter-stats {
    flex-direction: column;
    gap: 1rem;
  }
}

/* Section Vidéos */
.videos-section {
  padding: 5rem 0;
  background: rgba(255, 255, 255, 0.02);
}

.videos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.video-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.video-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.video-thumbnail {
  position: relative;
  height: 200px;
}

.video-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-blue);
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.video-item:hover .play-button {
  transform: scale(1.1);
}

.video-duration {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 10px;
  font-size: 0.8rem;
}

.video-info {
  padding: 1.5rem;
}

.video-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
}

.video-description {
  color: var(--text-gray);
  line-height: 1.5;
  font-size: 0.9rem;
}

/* Section Témoignages */
.testimonials-section {
  padding: 5rem 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(79, 172, 254, 0.1);
}

.testimonial-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.client-avatar {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--accent-blue), #00bcd4);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.client-name {
  color: white;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.testimonial-stars {
  display: flex;
  gap: 0.2rem;
}

.testimonial-text {
  color: var(--text-gray);
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
}

.testimonial-date {
  color: var(--text-gray);
  font-size: 0.8rem;
  opacity: 0.7;
}

/* CTA Section */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--primary-blue), var(--accent-blue));
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
}

.cta-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.primary-cta.large {
  font-size: 1.2rem;
  padding: 1.2rem 3rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.phone {
  font-size: 1.1rem;
  font-weight: 600;
}

.availability {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.photo-modal, .video-modal {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  backdrop-filter: blur(20px);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  z-index: 1001;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

.photo-modal img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.photo-nav {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: white;
}

.nav-button {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.3rem;
  transition: all 0.3s ease;
}

.nav-button:hover {
  color: var(--accent-blue);
}

.photo-counter {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.video-player {
  width: 100%;
  height: 100%;
}

.video-player video {
  width: 100%;
  height: 500px;
  max-height: 80vh;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  
  .service-title {
    font-size: 2rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .service-meta {
    justify-content: center;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .photos-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  .videos-grid {
    grid-template-columns: 1fr;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .service-title {
    font-size: 1.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .primary-cta, .secondary-cta {
    width: 100%;
  }
  
  .photos-grid {
    grid-template-columns: 1fr;
  }
}
</style> 