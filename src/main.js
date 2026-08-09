import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router/index.js';
import i18n from './locales/i18n.js';
const pinia = createPinia()
createApp(App).use(i18n).use(pinia).use(router).mount('#app')
