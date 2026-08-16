import { defineStore } from "pinia";
import { ref,watch } from "vue";

export const useRecentStore = defineStore('recent',() => {
    const items = ref(JSON.parse(localStorage.getItem('recent')) || []);

    const addToRecent = (product) => {
        const existingItem = items.value.find(item => item.id === product.id);
        if(existingItem) {
            return
        } else {
            items.value.push({...product})
        }
    }
    watch(items,(newValue) => {
        localStorage.setItem('recent', newValue)
    })
    return {
        addToRecent,
        items
    }
})