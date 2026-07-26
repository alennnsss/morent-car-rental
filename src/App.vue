<script setup>
import TheBlocks from './components/TheBlocks.vue';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <div class="container">
    <TheBlocks />
    <router-view/>
  </div>  
  
</template>
<style>
  .container {
    padding: 64px 32px;
    background-color: #F6F7F9;
  }
</style>
