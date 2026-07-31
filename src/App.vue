<script setup>
import TheToast from './components/TheToast.vue'
</script>

<template>
  <router-view />
  <the-toast />
</template>
<style>
  .container {
    padding: 64px 32px;
    background-color: #F6F7F9;
  }
</style>
