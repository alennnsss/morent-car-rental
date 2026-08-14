<template>
    <div class="box">
        <div class="user-info">
            <div>
                <h1>{{ $t('rental_info') }}</h1>
            </div>
            <div class="enter-info">
                <p>{{ $t('please_rental') }}</p>
                <p>{{ $t('step2') }}</p>
            </div>
        </div>  
        <div class="options">
            <TheOptions />
        </div>
    </div>
</template>

<script setup>
import TheOptions from '../TheOptions.vue';
</script>

<style scoped>
    .box {
        background-color: var(--white-color);
        padding: 24px;
        border-radius: 10px;
    }
    h1 {
        font-size: 20px;
    }
    .options {
        background-color: var(--white-color);
    }
    .enter-info {
        display: flex;
        justify-content: space-between;
    }   
    .enter-info p {
        color: #90A3BF;
    }
</style>