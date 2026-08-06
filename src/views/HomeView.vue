<template>
    <div class="container">
        <TheBlocks />
        <TheOptions />
        <Cars />
        <router-view/>
    </div>    
  
  
</template>

<script setup>
import TheOptions from '../components/TheOptions.vue';
import TheFooter from '../components/TheFooter.vue';
import TheBlocks from '../components/TheBlocks.vue';
import Cars from '../components/Cars.vue';
</script>

<style>

</style>