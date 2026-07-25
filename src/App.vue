<script setup>
import TheBlocks from './components/TheBlocks.vue';
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <TheHeader />
  <router-view/>
  <TheBlocks />
</template>
