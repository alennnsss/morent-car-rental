<template>
    <transition name="cookie">
        <div v-if="showBanner" class="cookie-banner">
            <h2>We are using cookie files to improve your using experience</h2>
            <button @click="acceptCookies">OK</button>
        </div>
    </transition>    
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showBanner = ref(false)
const acceptCookies = () => {
    document.cookie = 'cookies_accepted=true; max-age=2592000; path=/'
    showBanner.value = false
}
onMounted(() => {
    const allCookie = document.cookie
    if(!allCookie.includes('cookies_accepted=true')) {
        showBanner.value = true
    }
})
</script>

<style scoped>
    .cookie-banner {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: aquamarine;
        padding: 15px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 8px;
        max-width: 400px;
        width: 100%;
        z-index: 9999;
    }
    .cookie-banner button {
        background-color: white;
        border: none;
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 4px;
        color: black;
    }
    .cookie-leave-active,
    .cookie-enter-active {
        transition: all 0.5s ease;

    }
    .cookie-enter-from,
    .cookie-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>