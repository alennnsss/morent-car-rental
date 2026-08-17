<template>
    <form @submit.prevent="submitForm" class="form">
        <div class="form-header">
            <h1>{{ $t('login') }}</h1>
            <p>{{ $t('please_login') }}</p>
        </div>
        <div class="form-box">
            <div class="input-box">
                <label for="name">
                    {{ $t('name') }}
                </label>
                <input type="text" id="name" v-model="loginData.name" @blur="v$.name.$touch()">
                <span v-if="v$.name.$error" class="error-msg">
                    {{ v$.$errors[0].$message }}
                </span>    
            </div>
            <div class="input-box"> 
                <label for="pass">
                    {{ $t('password') }}
                </label>
                <input v-model="loginData.password" @blur="v$.password.$touch()" :type="showPassword ? 'text' : 'password'" name="pass">
                <span v-if="v$.password.$error" class="error-msg">
                    {{ v$.$errors[0].$message }}
                </span>    
                <button type="button" class="toggle-btn" @click="togglePassword">{{ showPassword ? 'Hide': 'Show' }}</button>
            </div>    
        </div>
        <button type="submit">Login</button>
    </form>
</template>

<script setup>
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, minLength } from '@vuelidate/validators';
import { useRouter } from 'vue-router';
import { ref, reactive } from 'vue';

const showPassword = ref(false)
const router = useRouter()
const toastStore = useToastStore()
const authStore = useAuthStore()

const loginData = reactive({
    name: '',
    password: ''
})
const rules = {
    name: {
        required: helpers.withMessage('Name is required', required),
        minLength: helpers.withMessage('Name should be at least 3 symbols', minLength(3))
    },
    password: {
        required: helpers.withMessage('Password is required', required),
        minLength: helpers.withMessage('Password should be at least 6 symbols', minLength(6))
    }
}
const v$ = useVuelidate(rules, loginData)

const submitForm = async() => {
    const isFormValid = await v$.value.$validate()
    if(!isFormValid) return 

    try {
        await authStore.login(loginData.name, loginData.password);
        toastStore.addToast('Succesful login', 'success');
        router.push('/')
    } catch(error) {
        console.error('Error', error.message);
        toastStore.addToast('Invalid password or name', 'error')
        loginData.password = '';
        v$.value.$reset()
    }
}
const togglePassword = () => {
    showPassword.value = !showPassword.value
}
</script>

<style scoped>
    .form {
        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 32px;
    }
    .form-box {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 32px;
    }
    .input-box {
        display: flex;
        flex-direction: column;
        gap: 16px;
        position: relative;
    }
    input {
        width: 386px;
        width: 100%;
        height: 56px;
        border-radius: 10px;
        margin-top: 16px;
        padding: 16px 32px;
        border: none;
        background-color: #F6F7F9;
    }
    label {
        max-width: 386px;
        width: 100%;
    }
    h1 {
        font-size: 20px;
    }
    .toggle-btn {
        position: absolute;
        right: -20px;
        background: none;
        border: none;
        color: #666;
        cursor: pointer;
        font-size: 12px;
        top: 54px;
    }
    .error-msg {
        font-size: 12px;
        color: red;
    }
    button {
        border: none;
        background-color: #3563E9;
        color: white;
        border-radius: 10px;
        width: 150px;
        height: 56px;
        margin: 0 auto;
    }
</style>