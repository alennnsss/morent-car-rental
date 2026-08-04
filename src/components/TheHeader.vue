<template>
  <header class="header" :class="valueTheme">
    <div class="header-logo-box">
        <h1 class="header-logo__title">
            MORENT
        </h1>
        <div class="header-search__box">
            <img src="../assets/icons/search-button.png" alt="search-button" class="header-search__img">
            <input ref="nameInputRef" class="header-search__input" type="text" placeholder="Search something here">
            <img src="../assets/icons/option-button.png" alt="option-button" class="header-option__img">
        </div>
    </div>
    <div class="navigation-box">
        <router-link class="navigation-box__link" to="/">
            <img class="navigation-box__svg" src="../assets/icons/heart.png" alt="heart">
            <p class="cart-badge" v-if="cartStore.totalItemsCount > 0">
                {{ cartStore.totalItemsCount }}
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
        <button @click="changeTheme" class="change-theme">
            Change theme
        </button>
    </div>    
  </header>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { useCartStore } from '../stores/useCartStore';
    
    const cartStore = useCartStore()
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
        border-radius: 50%;
        height: 1rem;
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -0.47rem;
        right: -0.5rem;
        background-color: red;
        color: white;
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
    @media screen and (max-width: 768px){
        .navigation-box__link {
            display: none;
        }
        .navigation-box__link-profile {
            display: flex;
        }
    }
</style>