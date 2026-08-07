<template>
    <div class="container">
        <TheBlocks />
        <TheReviews />
        <TheOptions />
        <Cars />
        <router-view/>
    </div>    
  
  
</template>

<script setup>
import TheOptions from '../components/TheOptions.vue';
import TheBlocks from '../components/TheBlocks.vue';
import TheReviews from '../components/TheReviews.vue';
import Cars from '../components/Cars.vue';
</script>

<style>

</style>