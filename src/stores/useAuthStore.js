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
    
    const login = async(name, password) => {
        isLoading.value = true
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                    password: password,
                    expiresInMins: 60
                })
            })
            const data = await response.json()
            token.value = data.accessToken
            localStorage.setItem('user_token', data.accessToken)
            user.value = data
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