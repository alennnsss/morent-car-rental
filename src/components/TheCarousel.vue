<template>
    <div class="gallery">
        <div class="gallery-container">
            <Carousel
                :value="images"
                :numVisible="1"
                :numScroll="1"
                :page="selectedImage"
                @update:page="selectedImage = $event"
                :showIndicators="false"
            >
                <template #item="{ data }">
                    <div class="main-image">
                        <img
                            :src="data"
                            :alt="`Image ${selectedImage + 1}`"
                            draggable="false"
                        />
                    </div>
                </template>
            </Carousel>
            <div class="thumbnails">
                <div
                    v-for="(src, i) in images"
                    :key="i"
                    class="thumbnail"
                    :class="{ active: selectedImage === i }"
                    @click="selectedImage = i"
                >
                    <img
                        :src="src"
                        :alt="`Image ${i + 1}`"
                        draggable="false"
                    />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Carousel from 'primevue/carousel'

const selectedImage = ref(0)

const images = [
    'https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1704905832963-37d6f12654b7?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470130623320-9583a8d06241?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1678841446310-d045487ef299?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497752531616-c3afd9760a11?q=80&w=1470&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511885663737-eea53f6d6187?q=80&w=1374&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?q=80&w=1472&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1638255402906-e838358069ab?q=80&w=1631&auto=format&fit=crop'
]
</script>

<style scoped>
.gallery {
    width: 100%;
    margin-top: 32px;
    margin-bottom: 64px;
}

.gallery-container {
    width: 672px;
    max-width: 100%;
    margin: 0 auto;
}

.main-image {
    width: 100%;
    height: 396px;
    overflow: hidden;
    border-radius: 12px;
}

.main-image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
}

/* Миниатюры */
.thumbnails {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    overflow-x: auto;
}

.thumbnail {
    width: 120px;
    height: 80px;
    min-width: 120px;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
}

.thumbnail:hover {
    opacity: 1;
}

.thumbnail.active {
    opacity: 1;
}

.thumbnail img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
}
</style>