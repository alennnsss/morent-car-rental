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
                    <div v-if="data.type === 'car'" class="sport-car">
                        <div class="sport-car__text">
                            <h1>
                                {{ $t('best_design') }}
                            </h1>

                            <p>
                                {{ $t('safety_comfort') }}
                            </p>
                        </div>
                        <img
                            class="car-image"
                            :src="data.src"
                            alt="Car"
                            draggable="false"
                        />
                    </div>
                    <div v-else class="main-image">
                        <img
                            :src="data.src"
                            :alt="data.alt"
                            draggable="false"
                        />
                    </div>

                </template>
            </Carousel>

            <div class="thumbnails">
                <div
                    v-for="(image, i) in images"
                    :key="i"
                    class="thumbnail"
                    :class="{ active: selectedImage === i }"
                    @click="selectedImage = i"
                >
                    <div v-if="image.type === 'car'" class="thumbnail-car">
                        <img :src="image.src" alt="Car" />
                    </div>

                    <img
                        v-else
                        :src="image.src"
                        :alt="image.alt"
                    />
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Carousel from 'primevue/carousel'
import Salon1 from '../assets/images/salon1.png'
import Salon2 from '../assets/images/salon2.png'

const props = defineProps({
    carImage: {
        type: String,
        required: true
    }
})

const selectedImage = ref(0)

const images = [
    {
        type: 'car',
        src: props.carImage
    },
    {
        type: 'image',
        src: Salon1,
        alt: 'Salon'
    },
    {
        type: 'image',
        src: Salon2,
        alt: 'Salon'
    }
]
</script>
<style scoped>
.gallery {
    width: 100%;
}

.gallery-container {
    width: 492px;
    max-width: 100%;
    margin: 0 auto;
}

.sport-car {
    display: flex;
    flex-direction: column;
    padding: 24px;
    height: 360px;
    box-sizing: border-box;
    border-radius: 10px;
    background-color: var(--button-dark-color);
    color: white;
}

.sport-car__text {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.sport-car__text h1 {
    margin: 0;
    font-size: 24px;
}

.sport-car__text p {
    margin: 0;
}

.car-image {
    width: 100%;
    height: 220px;
    object-fit: contain;
    margin-top: auto;
}

.main-image {
    width: 100%;
    height: 360px;
    overflow: hidden;
    border-radius: 10px;
}

.main-image img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumbnails {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

.thumbnail {
    width: 148px;
    height: 124px;
    min-width: 120px;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
}

.thumbnail:hover,
.thumbnail.active {
    opacity: 1;
}

.thumbnail img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.thumbnail-car {
    width: 100%;
    height: 100%;
    background-color: var(--button-dark-color);
    position: relative;
}

.thumbnail-car::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    color: white;
    font-size: 10px;
    z-index: 1;
}

.thumbnail-car img {
    object-fit: contain;
    padding: 20px 5px 0;
    box-sizing: border-box;
}
@media screen and (max-width: 380px) {
    .thumbnails {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>