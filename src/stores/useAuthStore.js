import { defineStore } from "pinia";
import { capitalize, ref } from "vue";
import { useToastStore } from "./useToastStore";
import { computed } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const isLoading = ref(false);
    const isError = ref(false);
    const toastStore = useToastStore();
    const token = ref(localStorage.getItem('user_token') || null);
    const user = ref(null);

    const isAuthenticated = computed(() => !!token.value)
    
    const login = async() => {
        isLoading.value = true
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                username,
                password,
                expiresInMins: 60
            })
            token.value = response.data.accessToken
            localStorage.setItem('user_token', response.data.accessToken)
            user.value = response.data
        } catch(error) {
            isError.value = true
            console.error('Error', error.message);
            toastStore.addToast('Wrong password or username', 'error')
        } finally {
            isLoading.value = false
        }
    }
    const logout = () => {
        user.value = null;
        token.value = null;
        localStorage.removeItem('user_token')
    }
    return {
        login, logout, user, token, isAuthenticated
    }
})