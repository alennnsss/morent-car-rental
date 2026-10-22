<template>
  <header class="header" :class="valueTheme">
    <div class="header-logo-box">
        <router-link to="/">
            <h1 class="header-logo__title">
                MORENT
            </h1>
        </router-link>    
        <div class="header-search__box">
            <img src="../assets/icons/search-button.png" alt="search-button" class="header-search__img">
            <input id="search" v-model="searchStore.searchQuery" ref="nameInputRef" class="header-search__input" type="text" :placeholder=" $t('search_input') ">
            <img src="../assets/icons/option-button.png" alt="option-button" class="header-option__img">
        </div>
    </div>
    <div class="navigation-box">
        <router-link class="navigation-box__link" to="/">
            <img class="navigation-box__svg" src="../assets/icons/heart.png" alt="heart">
            <p class="cart-badge" v-if="favouriteStore.totalItemsCount > 0">
                {{ favouriteStore.totalItemsCount }}
            </p>
        </router-link>
        <router-link class="navigation-box__link" to="/">
            <img class="navigation-box__svg" src="../assets/icons/notification.png" alt="heart">
        </router-link>
        <router-link class="navigation-box__link" to="/">
            <img class="navigation-box__svg" src="../assets/icons/settings.png" alt="heart">
        </router-link>
        <router-link v-if="authStore.isAuthenticated !== true" class="navigation-box__link  navigation-box__link-profile" to="/login">
            <img class="navigation-box__svg" src="../assets/icons/people.png" alt="heart">
        </router-link>
        <button class="language" @click="changeLanguage">
            <img src="../assets/icons/translate.png" class="translate" alt="translate">
            <h1 v-if="locale === 'en'">
                EN
            </h1>
            <h1 v-else-if="locale === 'ru'">
                RU
            </h1>
            <h1 v-else>
                KZ
            </h1>
        </button>
    </div>    
  </header>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useSearchStore } from '../stores/useSearchStore';
    import { useI18n } from 'vue-i18n';
    import { useFavouriteStore } from '../stores/useFavouriteStore';
    import { useAuthStore } from '../stores/useAuthStore';

    const authStore = useAuthStore()
    const { locale } = useI18n({useScope: 'global'});
    const searchStore = useSearchStore()
    const favouriteStore = useFavouriteStore()
    const currentTheme = ref(localStorage.getItem('theme') || 'white')
    const nameInputRef = ref(null);

    const valueTheme = computed(() => {
        if(currentTheme.value === 'dark') return 'dark'
        return 'white'
    })

    const changeTheme = () => {
        currentTheme.value = currentTheme.value === 'dark' ? 'white' : 'dark';
        localStorage.setItem('theme', currentTheme.value);
        if(currentTheme.value === 'dark') {
            document.body.classList.add('dark-theme')
            document.body.classList.remove('white-theme')
        } else {
            document.body.classList.add('white-theme')
            document.body.classList.remove('dark-theme')
        }
    }
    const changeLanguage = () => {
        if(locale.value === 'en') {
            locale.value = 'ru'
        } 
        else if (locale.value === 'ru') {
            locale.value = 'kz'
        } else {
            locale.value = 'en'
        }
        localStorage.setItem('language', locale.value)
    }
    onMounted(() => {
        if(nameInputRef.value) {
            nameInputRef.value.focus()
        }
    })
</script>

<style scoped>
    .header {
        width: 100%;
        padding: 24px 60px;
        border: 1px solid #C3D4E966;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 24px;
    }
    
    .header-logo-box {
        display: flex;
        width: 100%;
        flex: 1;
        gap: 32px;
    }
    .header-logo__title {
        color: #3563E9;
        font-weight: 700;
        font-size: 32px;
        flex-shrink: 0;
    }
    .header-search__box {
        display: flex;
        border: 1px solid #C3D4E966;
        border-radius: 70px;
        padding: 10px 20px;
        gap: 20px;
        max-width: 492px;
        width: 100%;
        min-width: 0;
        align-items: center;
        transition: border-color 0.2s;
    }
    .header-search__box:focus-within {
        border-color: #3563E9;
    }
    .header-search__button {
        border: none;
    }
    .header-search__img {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    }
    .header-search__input {
        border-radius: 70px;
        width: 100%;
        border: none;
        background: transparent;
        min-width: 0;
        outline: none;
    }
    .header-option__img {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
    }
    .navigation-box {
        display: flex;
        justify-content: space-around;
        gap: 20px;
        align-items: center;
        flex-shrink: 0;
    }
    .navigation-box__link {
        border: 1px solid #C3D4E9;
        border-radius: 50%;
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    .cart-badge {
        position: absolute;
        font-size: 10px;
        border-radius: 50%;
        height: 1rem;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -0.47rem;
        right: -0.5rem;
        background-color: rgb(222, 26, 26);
        color: rgb(255, 255, 255);
    }
    .navigation-box__svg {
        height: 17.8px;
        width: 20px;
    }
    .change-theme {
        border: none;
        background-color: white;
        cursor: pointer;
    }
    .language {
        border: none;
        background-color: transparent;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .translate {
        width: 1rem;
        height: 1rem;
    }
    a {
        text-decoration: none;
    }
    a:hover {
        border-bottom: 1px solid #c8c8c8;
        animation: border 0.5s ease-in-out;
    }
    @keyframes border {
        0% {
            opacity: 0;
            transform: translateX(5px);
        }
        100% {
            opacity: 100%;
            transform: translateX(0px);
        }
    }
    @media screen and (max-width: 768px){
        .navigation-box__link {
            display: none;
        }
        .navigation-box__link-profile {
            display: flex;
        }
        .header-logo-box {
            display: contents;
        }
        .header {
            padding: 24px;
            flex-wrap: wrap;
            gap: 24px 16px;
        }
        .navigation-box {
            order: 2;
            margin-left: auto;
        }
        .header-search__box {
            order: 3;
            max-width: none;
            flex-basis: 100%;
        }
    }
    @media screen and (max-width: 368px) {
        .header {
            padding: 12px;
        }
    }
</style>