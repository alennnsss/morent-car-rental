<template>
  <div class="catalog">
    <div class="catalog-sidebar">
        <div class="sidebar-type" v-for="type in typeCars" :key="type.id">
            <span>T Y P E</span>
            <div class="checkbox">
                <input type="checkbox" v-model="searchStore.selectedTypes" name="sport" id="sport">
                <h2>Sport</h2>
                <span class="number">(10)</span>
            </div>
            <div class="checkbox">
                <input type="checkbox"  v-model="searchStore.selectedTypes"  id="suv">
                <h2>SUV</h2>
                <span class="number">(12)</span>
            </div>
            <div class="checkbox">
                <input type="checkbox"  v-model="searchStore.selectedTypes"  id="mpv">
                <h2>MPV</h2>
                <span class="number">(16)</span>
            </div>
            <div class="checkbox">
                <input type="checkbox"  v-model="searchStore.selectedTypes"  id="sedan">
                <h2>Sedan</h2>
                <span class="number">(20)</span>
            </div>
            <div class="checkbox">
                <input type="checkbox"  v-model="searchStore.selectedTypes"  id="coupe">
                <h2>Coupe</h2>
                <span class="number">(14)</span>
            </div>
            <div class="checkbox">
                <input type="checkbox"  v-model="searchStore.selectedTypes"  id="hatchback">
                <h2>Hatchback</h2>
                <span class="number">(14)</span>
            </div>

        </div>
        <div class="sidebar-type">
            <span>C A P A C I T Y</span>
            <div class="checkbox">
                <input type="checkbox" name="2" id="2">
                <h2>2 People</h2>
                <span class="number">(10)</span>
            </div>
            <div class="checkbox">
                <input type="checkbox" id="4">
                <h2>4 People</h2>
                <span class="number">(14)</span>
            </div>
            <div class="checkbox">
                <input type="checkbox" id="6">
                <h2>6 People</h2>
                <span class="number">(12)</span>
            </div>
            <div class="checkbox">
                <input type="checkbox" id="8">
                <h2>8 or More</h2>
                <span class="number">(16)</span>
            </div>
            
        </div>
        <div class="sidebar-type">
            <span>P R I C E</span>
            <input v-model="price" type="range" max="100" min="72" step="1">
            <p>Current value: ${{ price }}.00</p>
            <h2>Max. $100.00</h2>
        </div>
    </div>
    <div class="catalog-main">
        <TheOptions />
        <Cars />
    </div>
  </div>
</template>

<script setup>
import TheOptions from '../components/TheOptions.vue';
import Cars from '../components/Cars.vue';
import { ref } from 'vue';

import { useSearchStore } from '../stores/useSearchStore.js';

const searchStore = useSearchStore()
const price = ref(72);
const typeCars = ['Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback']
</script>

<style scoped>
    .catalog {
        display: flex;
    }
    .catalog-sidebar {
        width: 23%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 32px 32px;
        gap: 56px;
    }
    .sidebar-type {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .number {
        margin-top: 3px;
    }
    .checkbox {
        display: flex;
        gap: 8px;

    }
    .catalog-main {
        width: 90%;
        
    }
    span {
        color: var(--span-color);
        font-weight: 600;
        font-size: 12px;
    }
    h2 {
        font-weight: 600;
    }
</style>