import { createI18n } from "vue-i18n";
import en from './en';
import ru from './ru';
import kz from "./kz";
const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('language'),
    fallbackLocale: 'ru',
    
    messages: {
        en,
        ru,
        kz,
    }
})
export default i18n