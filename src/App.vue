<script setup>
import TheToast from './components/TheToast.vue';
import CookiesBanner from './components/CookiesBanner.vue';
import ScrollTopButton from './components/ScrollTopButton.vue';
import TheHeader from './components/TheHeader.vue';
import { onMounted } from 'vue';

const checkTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'white'
  if(savedTheme === 'dark') {
    document.body.classList.add('dark-theme')
    document.body.classList.remove('white-theme')
  } else {
    document.body.classList.add('white-theme');
    document.body.classList.remove('dark-theme')
  }
}
onMounted(() => {
  checkTheme()
})
</script>

<template>
  <the-header />
  <router-view />
  <cookies-banner />
  <scroll-top-button />
  <the-toast />
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
