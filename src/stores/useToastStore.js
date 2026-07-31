import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useToastStore = defineStore('toast', () => {
    const toast = ref([]);

    const addToast = (message, type = 'error') => {
        const id = Date.now()
        toast.value.push({id, message, type})
        setTimeout(() => {
           removeToast(id)
        }, 3000)
    }
    const removeToast = (id) => {
        toast.value = toast.value.filter(t => t.id !== id)
    }
    return {
        addToast, removeToast, toast
    }
})