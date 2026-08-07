<template>
    <div>
        <TheSlider>
            <template #review="{ item }">
                <div class="reviews-box">
                    <div class="review">
                        <img class="reviews-img" :src="item.avatar" :alt="item.name">
                        <h2>{{ item.name }}</h2>
                        <p>{{ item.position }}</p>
                        <span>{{ item.text }}</span>
                    </div>
                </div>
            </template>
        </TheSlider>
    </div>
</template>

<script setup>
import TheSlider from '../components/TheSlider.vue';
</script>

<style>
.reviews-box {
    color: white;
    border-radius: 10px;
    max-height: 452px;
    padding: 24px;
}    
</style>