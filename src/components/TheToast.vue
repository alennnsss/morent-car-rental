<template>
    <transition-group name="toast-box" tag="div">
        <div class="toast-container" v-for="item in toastStore.toast" :key="item.id" :class="[ 'toast-item', item.type ]">
            <h2>
                {{ item.message }}
            </h2>
        
        </div>
    </transition-group>
</template>

<script setup>
import { useToastStore } from '../stores/useToastStore';

const toastStore = useToastStore()
</script>

<style scoped>
    .toast-item.success {
        background-color: rgb(2, 159, 2);
        color: white;
    }    
    .toast-item.error {
        background-color: red;
        color: rgb(255, 254, 254);
    }
    .toast-container {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        padding: 20px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        border-radius: 8px;
    }
    .toast {
        min-width: 250px;
        padding: 16px;
        color: white;
        border-radius: 8px;
        display: flex;
        justify-content: space-between; 
        align-items: center;
        box-shadow: 0 4px 6px #19191926;

    }
    button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
    }
    .toast-box-enter-active,
    .toast-box-leave-active {
        transition: all 1s ease;
    }
    .toast-box-enter-from,
    .toast-box-leave-to {
        opacity: 0;
        transform: translateX(80px);
    }
</style>