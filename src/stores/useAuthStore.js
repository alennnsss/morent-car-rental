import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
export const useAuthStore = defineStore('auth', () => {
    const isLoading = ref(false);
    const isError = ref(false);
    const toast = useToast();
    const token = ref(localStorage.getItem('user_token') || null);
    const user = ref(null);

    const isAuthenticated = computed(() => !!token.value)
    
    const login = async(name, password) => {
        isError.value = false
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
            if (!response.ok) {
                throw new Error(data.message || "Invalid login data");
            }

            if (!data.accessToken) {
                throw new Error("Access token not found");
            }
            token.value = data.accessToken
            localStorage.setItem('user_token', data.accessToken)
            user.value = data
        } catch(error) {
            isError.value = true
            console.error('Error', error.message);
            token.value = null
            user.value = null
            localStorage.removeItem('user_token')
            throw error;
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