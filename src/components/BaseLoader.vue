<template>
    <div class="base-loader" :style="{width: size + 'px', height: size + 'px'}">

    </div>
</template>

<script setup>
defineProps({
    size: {
        type: Number,
        default: 20,
    }
})
</script>

<style scoped>
    * {
        box-sizing: border-box;
    }
    .base-loader {
        border: 3px solid #fafafa;
        border-radius: 50%;
        animation: spin 1s ease-in-out infinite;
        border-top-color: #2A254B;
        display: inline-block;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>