import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useFilterStore = defineStore('filter',() => {
    const selectedCapacity = ref([]);
    const selectedPrice = ref(100);
    const selectedType = ref([]);
    return {selectedCapacity, selectedPrice, selectedType}
})