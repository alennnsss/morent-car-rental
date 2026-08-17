import { defineStore } from "pinia";
import { ref, watch, computed } from 'vue'
import { useToast } from "primevue/usetoast";

export const useFavouriteStore = defineStore('favourites', () => {

    const toast = useToast();
    const savedFavorites = localStorage.getItem('morent_favorite');
    const isFavorite = ref(false);
    const favorites = ref(savedFavorites ? JSON.parse(savedFavorites) : []);

    watch(favorites, (newValue) => {
        localStorage.setItem('morent_favorite', JSON.stringify(newValue))
    }, {deep: true})
    const totalItemsCount = computed(() => {
        return favorites.value.length
    })
    const toggleFavorite = (id) => {
        const index = favorites.value.indexOf(id)
        if(index === -1) {
            favorites.value.push(id)
            toast.add({
                severity: 'success',
                summary: 'Saved successfully',
                detail: 'Your choice have been saved',
                life: 3000
            })
        } else {
            favorites.value.splice(index, 1)
            isFavorite.value = false
            toast.add({
                severity: 'info',
                summary: 'Deteled from saved',
                life: 3000
            })
        }
    }
    return {
        savedFavorites,
        isFavorite,
        toggleFavorite,
        favorites,
        totalItemsCount
    }
})