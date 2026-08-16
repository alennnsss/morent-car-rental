import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useRecentStore = defineStore('recent', () => {
    const savedRecent = localStorage.getItem('recent');

    const items = ref(
        savedRecent ? JSON.parse(savedRecent) : []
    );

    const addToRecent = (product) => {
        if (!product?.id) return;

        items.value = items.value.filter(item => item.id !== product.id);
        items.value.unshift({
            id: product.id,
            name: product.name,
            type: product.type,
            image: product.image,
            pricePerDay: product.pricePerDay
        });
        items.value = items.value.slice(0, 5);
    };

    watch(items,(newValue) => {
            localStorage.setItem('recent', JSON.stringify(newValue));
    },{deep: true,immediate: true});

    return {
        items,
        addToRecent
    };
});