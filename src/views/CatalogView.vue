<template>
  <div class="catalog">
    <TheFilter class="filter"/>
    <div class="catalog-main">
        <TheOptions class="options" />
        <Cars />
    </div>
  </div>
</template>

<script setup>
import TheOptions from '../components/TheOptions.vue';
import Cars from '../components/Cars.vue';
import TheFilter from '../components/TheFilter.vue';

</script>

<style scoped>
    .filter {
      width: 20%;
    }
    .catalog-main {
      width: 80%;
      background-color: var(--main-color);
    }
    .catalog {
        display: flex;
    }
    @media screen and (max-width: 768px) {
        .options {
          padding: 0;
        }
        .catalog-main {
          width:100%;
        }
    } 
</style>