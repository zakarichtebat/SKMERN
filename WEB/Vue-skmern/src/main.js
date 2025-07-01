import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { translationService } from './services/translation.js'

// Initialiser le service de traduction
translationService.init()

const app = createApp(App)

// Rendre le service de traduction disponible globalement
app.config.globalProperties.$t = (key) => translationService.t(key)

app.mount('#app')
