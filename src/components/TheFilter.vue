<template>
    <div class="catalog-sidebar">
        <div class="sidebar-type">
            <span>{{ $t('type') }}</span>
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
            <span>{{$t('capacity')}}</span>
            <div v-for="capacity in capacities" :key="capacity.id" class="checkbox">
                <input :id="capacity.id" :value="capacity.title" v-model="filterStore.selectedCapacity" type="checkbox">
                <label :for="capacity.id">
                    {{ capacity.title }}
                </label>
                <span class="number">{{ capacity.count }}</span>
            </div>
        </div>
        <div class="sidebar-type">
            <span>{{ $t('price') }}</span>
            <input v-model="filterStore.selectedPrice" type="range" max="100" min="72" step="1">
            <p>{{ $t('curr_val') }}: ${{ filterStore.selectedPrice }}.00</p>
            <h2>{{ $t('max') }} $100.00</h2>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFilterStore } from '../stores/useFilterStore.js';

const filterStore = useFilterStore()
const types = ref([
    { id:1, title: 'Sport', count: 10 },//должно быть кол-во машин
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
        width: 20%;
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
    @media screen and (max-width: 768px) {
        .catalog-sidebar {
            display: none;
        }
    }
</style>