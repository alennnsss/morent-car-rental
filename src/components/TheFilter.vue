<template>
    <div class="catalog-sidebar">
        <div class="sidebar-type">
            <span>T Y P E</span>
            <div class="checkbox" v-for="type in types" :key="type.id">
                <input
                    :id="type.id"
                    type="checkbox"
                    :value="type.title"
                    v-model="filterStore.selectedType"
                >
                <label :for="type.id">
                    {{ type.title }}
                </label>
                <span class="number">{{ type.count }}</span>
            </div>
        </div>
        <div class="sidebar-type" >
            <span>C A P A C I T Y</span>
            <div v-for="capacity in capacities" :key="capacity.id" class="checkbox">
                <input :id="capacity.id" :value="capacity.title" v-model="filterStore.selectedCapacity" type="checkbox">
                <label :for="capacity.id">
                    {{ capacity.title }}
                </label>
                <span class="number">{{ capacity.count }}</span>
            </div>
        </div>
        <div class="sidebar-type">
            <span>P R I C E</span>
            <input v-model="filterStore.selectedPrice" type="range" max="100" min="72" step="1">
            <p>Current value: ${{ filterStore.selectedPrice }}.00</p>
            <h2>Max. $100.00</h2>
        </div>
    </div>
</template>

<script setup>
import TheOptions from '../components/TheOptions.vue';
import Cars from '../components/Cars.vue';
import { ref } from 'vue';
import { useFilterStore } from '../stores/useFilterStore.js';
import { useSearchStore } from '../stores/useSearchStore.js';

const filterStore = useFilterStore()
const types = ref([
    { id:1, title: 'Sport', count: 10 },
    { id:2, title: 'SUV', count: 12 },
    { id:3, title: 'MPV', count: 16 },
    { id:4, title: 'Sedan', count: 20 },
    { id:5, title: 'Coupe', count: 14 },
    { id:6, title: 'Hatchback', count: 14 },
])
const capacities = ref([
  { id: 2, title: '2 People', count: 10 },
  { id: 6, title: '6 People', count: 12 },
])
</script>

<style scoped>
    
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