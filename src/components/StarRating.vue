<template>
  <div class="star-rating">
    <div class="stars-empty">
        <span v-for="(star, index) in maxStars" :key="index"><img class="star-icon" src="../assets/icons/star-empty.png" alt="empty star"></span>
    </div>
    <div :style="{width: ratingWidth}" class="stars-box">
        <span v-for="(star, index) in maxStars" :key="index"><img class="star-icon" src="../assets/icons/star.png" alt="empty star"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    rating: {
        type: Number,
        required: true
    },
    maxStars: {
        type: Number,
        default: 5
    }
})
const ratingWidth = computed(() => {
    const safeRating = Math.min(Math.max(props.rating), props.maxStars)
    return (safeRating / props.maxStars) * 100 + '%'
})
</script>

<style scoped>
    .star-rating {
        display: inline-block;
        position: relative;
        line-height: 1;
    }
    .stars-empty {
        display: flex;

    }
    .stars-box {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        overflow: hidden;
        white-space: nowrap;
    }
    .star-icon {
        width: 16px;
        height: 16px;
        margin-right: 4px;
        display: block;
        flex-shrink: 0;
    }
</style>