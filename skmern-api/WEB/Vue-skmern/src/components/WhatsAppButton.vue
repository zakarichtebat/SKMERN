<template>
  <a 
    :href="whatsappLink" 
    target="_blank"
    rel="noopener noreferrer"
    class="whatsapp-button"
    aria-label="Contacter sur WhatsApp"
  >
    <svg viewBox="0 0 32 32" class="whatsapp-icon">
      <path fill="currentColor" d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-4.713 1.262 1.262-4.669-0.292-0.508c-1.207-2.100-1.847-4.507-1.847-6.924 0-7.435 6.050-13.485 13.485-13.485s13.485 6.050 13.485 13.485c0 7.435-6.050 13.485-13.485 13.485zM21.960 18.429c-0.329-0.164-1.936-0.955-2.236-1.065s-0.518-0.164-0.736 0.164c-0.219 0.329-0.846 1.065-1.038 1.284s-0.383 0.246-0.711 0.082c-0.329-0.164-1.391-0.513-2.649-1.635-0.979-0.873-1.640-1.952-1.832-2.281s-0.021-0.507 0.144-0.671c0.147-0.147 0.329-0.383 0.493-0.575s0.219-0.329 0.329-0.548 0.055-0.411-0.027-0.575c-0.082-0.164-0.736-1.773-1.010-2.430s-0.542-0.548-0.736-0.548c-0.191-0.014-0.411-0.014-0.630-0.014s-0.575 0.082-0.875 0.411c-0.301 0.329-1.147 1.120-1.147 2.729s1.174 3.165 1.338 3.384c0.164 0.219 2.313 3.653 5.648 5.019 3.335 1.367 3.335 0.911 3.937 0.853s1.936-0.791 2.210-1.557 0.273-1.420 0.191-1.557c-0.082-0.137-0.301-0.219-0.630-0.383z"/>
    </svg>
    <span class="whatsapp-text">WhatsApp</span>
  </a>
</template>

<script>
export default {
  name: 'WhatsAppButton',
  data() {
    return {
      phoneNumber: '+212619955898', // Numéro sans espaces pour l'URL
      message: 'Bonjour FIXILYA,\n\nJe souhaite obtenir plus d\'informations sur vos services.\n\nMerci !'
    }
  },
  computed: {
    whatsappLink() {
      const encodedMessage = encodeURIComponent(this.message)
      return `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`
    }
  }
}
</script>

<style scoped>
.whatsapp-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  cursor: pointer;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  z-index: 9999;
  animation: pulse 2s infinite;
}

.whatsapp-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
}

.whatsapp-icon {
  width: 35px;
  height: 35px;
}

.whatsapp-text {
  font-size: 9px;
  font-weight: 600;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  }
  50% {
    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.8);
  }
}

/* Animation d'apparition */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.whatsapp-button {
  animation: slideIn 0.5s ease-out, pulse 2s infinite 0.5s;
}

/* Responsive */
@media (max-width: 768px) {
  .whatsapp-button {
    width: 55px;
    height: 55px;
    bottom: 20px;
    right: 20px;
  }
  
  .whatsapp-icon {
    width: 30px;
    height: 30px;
  }
  
  .whatsapp-text {
    font-size: 8px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .whatsapp-button {
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
  }
  
  .whatsapp-button:hover {
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
  }
}
</style>

