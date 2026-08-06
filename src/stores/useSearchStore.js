import { defineStore } from "pinia";
import { ref } from 'vue';

export const useSearchStore = defineStore('stores',() => {
    const searchQuery = ref('');
    const selectedTypes = ref([]);
    return {searchQuery, selectedTypes}
})