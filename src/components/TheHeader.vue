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
        <router-link class="navigation-box__link  navigation-box__link-profile" to="/">
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
    }
    .header-search__button {
        border: none;
    }
    .header-search__img {
        width: 24px;
        height: 24px;
    }
    .header-search__input {
        border-radius: 70px;
        width: 100%;
        border: none;
        background: transparent;
    }
    .header-option__img {
        width: 24px;
        height: 24px;
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
        background-color: white;
        cursor: pointer;
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
            gap: 30px;
        }
    }
</style>