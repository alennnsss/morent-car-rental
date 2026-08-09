<template>
  <div class="catalog">
    <TheFilter/>
    <div class="catalog-main">
        <TheOptions />
        <Cars />
    </div>
  </div>
</template>

<script setup>
import TheOptions from '../components/TheOptions.vue';
import Cars from '../components/Cars.vue';
import TheFilter from '../components/TheFilter.vue';
import { ref } from 'vue';
import { useFilterStore } from '../stores/useFilterStore.js';
import { useSearchStore } from '../stores/useSearchStore.js';

</script>

<style scoped>
    .catalog {
        display: flex;
    }
</style>