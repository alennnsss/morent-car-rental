<template>
  <TheHeader />
    <div class="container">
        <TheBlocks />
        <Cars />
        <router-view/>
    </div>    
    <TheFooter />
  
  
</template>

<script setup>
import TheHeader from '../components/TheHeader.vue';
import TheFooter from '../components/TheFooter.vue';
import TheBlocks from '../components/TheBlocks.vue';
import Cars from '../components/Cars.vue';
</script>

<style>

</style>