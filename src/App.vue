<script setup>
import TheToast from './components/TheToast.vue';
import CookiesBanner from './components/CookiesBanner.vue';
import ScrollTopButton from './components/ScrollTopButton.vue';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';

</script>

<template>
  <the-header />
  <router-view />
  <cookies-banner />
  <scroll-top-button />
  <the-toast />
  <the-footer />
</template>
<style>
  .container {
    padding: 64px 32px;
    background-color: #F6F7F9;
  }

  .dark-theme .header-search__img,
  .dark-theme .header-option__img {
    filter: invert(80%);
    border-radius: 9px;
  }
  body.dark-theme {
    --bg-color: #111827;
    --text-color: #FFFFFF;
  }
  
</style>
