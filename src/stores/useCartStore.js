import { defineStore } from "pinia";
import { ref, watch, computed } from 'vue';
 
export const useCartStore = defineStore('cart', () => {
    const items = ref(JSON.parse(localStorage.getItem('cart_items')) || []);
    const addToCart = (product, productQuantity = 1) => {
        const existingItem = items.value.find(item => item.id === product.id)
        if(existingItem) {
            existingItem.quantity += productQuantity
        } else {
            items.value.push({...product, quantity: productQuantity})
        }
    }
    const totalItemsCount = computed(() => {
        return items.value.reduce((total, item) => total + item.quantity, 0)
    })
    const removeFromCart = (product) => {
        items.value = items.value.filter(item => item.id !== product.id)
    }
    const totalPrice = () => {
        return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
    watch(items, (newValue) => {
        localStorage.setItem('cart_items', JSON.stringify(newValue))
    }, {deep: true})
    return {
        items,
        addToCart, 
        removeFromCart,
        totalPrice,
        totalItemsCount,
    }
})