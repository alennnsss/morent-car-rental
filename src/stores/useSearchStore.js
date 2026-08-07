import { defineStore } from "pinia";
import { ref } from 'vue';

export const useSearchStore = defineStore('stores',() => {
    const searchQuery = ref('');
    return {searchQuery}
})