import { defineStore } from "pinia";
import { ref, watch } from 'vue'
export const useFavouriteStore = defineStore('favourites', () => {
    const savedFavorites = localStorage.getItem('morent_favorite');
    const isFavorite = ref(false);
    const favorites = ref(savedFavorites ? JSON.parse(savedFavorites) : []);
    watch(favorites, (newValue) => {
        localStorage.setItem('morent_favorite', JSON.stringify(newValue))
    }, {deep: true})
    const toggleFavorite = (id) => {
        const index = favorites.value.indexOf(id)
        if(index === -1) {
            favorites.value.push(id)
        } else {
            favorites.value.splice(index, 1)
            isFavorite.value = false
        }
    }
    return {
        savedFavorites,
        isFavorite,
        toggleFavorite,
        favorites
    }
})