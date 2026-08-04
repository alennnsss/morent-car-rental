<template>
    <transition name="scroll" tag="div">
        <div v-if="isButton" class="scroll-box">
            <button @click="scrollUp">
                <img src="../assets/icons/scroll.png" alt="scroll">
            </button>
        </div>
    </transition>    
</template>

<script setup>
import { ref,onMounted, onUnmounted } from 'vue';
const scrollY = ref();
const isButton = ref(false)
const scrollTopButton = () => {
    scrollY.value = window.scrollY
    if(scrollY.value > 300) {
        isButton.value = true
    } else {
        isButton.value = false
    }
}
const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(() => {
    window.addEventListener('scroll', scrollTopButton)
})
onUnmounted(() => {
    window.removeEventListener('scroll', scrollTopButton)
})
</script>

<style scoped>
    .scroll-box {
        bottom: 40px;
        position: fixed;
        right: 20px;
    }
    button {
        border: none;
        background-color: white;
        cursor: pointer;
    }
    .scroll-leave-active,
    .scroll-enter-active {
        transition: all 0.5s ease;

    }
    .scroll-enter-from,
    .scroll-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    img {
        width: 30px;
        height: 30px;
    }
</style>