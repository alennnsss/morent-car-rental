<template>
  <header class="header">
    <div class="header-logo-box">
        <h1 class="header-logo__title">
            MORENT
        </h1>
        <div class="header-search__box">
            <img src="../assets/icons/search-button.png" alt="search-button" class="header-search__img">
            <input class="header-search__input" type="text" placeholder="Search something here">
            <img src="../assets/icons/option-button.png" alt="option-button" class="header-option__img">
        </div>
    </div>
    <div class="navigation-box">
        <router-link class="navigation-box__link" to="/">
            <img class="navigation-box__svg" src="../assets/icons/heart.png" alt="heart">
        </router-link>
        <router-link class="navigation-box__link" to="/">
            <img class="navigation-box__svg" src="../assets/icons/notification.png" alt="heart">
        </router-link>
        <router-link class="navigation-box__link" to="/">
            <img class="navigation-box__svg" src="../assets/icons/settings.png" alt="heart">
        </router-link>
        <router-link class="navigation-box__link" to="/">
            <img class="navigation-box__svg" src="../assets/icons/profile.png" alt="heart">
        </router-link>
    </div>    
  </header>
</template>

<script setup>

</script>

<style scoped>
    .header {
        width: 100%;
        padding: 40px 60px 32px 40px;
        height: 124px;
        border: 1px solid #C3D4E966;
        display: flex;
        justify-content: space-around;
    }
    
    .header-logo-box {
        display: flex;
        gap: 64px;
        width: 100%;
    }
    .header-logo__title {
        color: #3563E9;
        font-weight: 700;
        font-size: 32px;
    }
    .header-search__box {
        display: flex;
        border: 1px solid #C3D4E966;
        border-radius: 70px;
        padding: 10px 20px;
        gap: 20px;
        width: 40%;
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
    }
    .header-option__img {
        width: 24px;
        height: 24px;
    }
    .navigation-box {
        display: flex;
        gap: 20px;
        align-items: center;
    }
    .navigation-box__link {
        border: 1px solid #C3D4E9;
        border-radius: 50%;
        width: 44px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .navigation-box__svg {
        height: 20px;
        width: 20px;
    }
</style>