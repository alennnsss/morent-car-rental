import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router/index.js';
import i18n from './locales/i18n.js';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';

const pinia = createPinia()
const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(ToastService)
app.use(i18n)
app.use(pinia)
app.use(router)
app.mount('#app')
