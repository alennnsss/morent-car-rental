<script setup>
import { ref, watch, computed } from 'vue'
import { db } from '../api/firebase.js'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { useFavouriteStore } from '../stores/useFavouriteStore.js'
import { useSearchStore } from '../stores/useSearchStore.js'
import CarsSkeleton from './CarsSkeleton.vue'
import BaseLoader from './BaseLoader.vue'
import { useFilterStore } from '../stores/useFilterStore.js'
import { useRoute } from 'vue-router';
import { useToast } from 'primevue/usetoast'

const route = useRoute()
const filterStore = useFilterStore()
const toast = useToast()
const searchStore = useSearchStore()
const favoriteStore = useFavouriteStore()
const isLoading = ref(false)
const cars = ref([])
const limitPerPage = ref(4)
const isButtonLoading = ref(null)

const fetchCars = async () => {
    isLoading.value = true
    try {
        const queryParams = query(
            collection(db, 'cars'),
            limit(limitPerPage.value)
        )
        const querySnapshot = await getDocs(queryParams)
        cars.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch (e) {
        console.error('Error', e.message)
        toast.add({
            severity: 'error',
            summary: 'Error in loading',
            detail: 'Mistake in downloading cars',
            life: 3000
        })
    } finally {
        isLoading.value = false
    }
}
const filteredCars = computed(() => {
    let result = cars.value
    if (searchStore.searchQuery.trim()) {
        result = result.filter((car) =>
            car.name
                .toLowerCase()
                .includes(searchStore.searchQuery.toLowerCase().trim())
        )
    }
    if (filterStore.selectedCapacity.length > 0) {
        result = result.filter((car) =>
            filterStore.selectedCapacity.includes(car.capacity)
        )
    }
    if (filterStore.selectedType.length > 0) {
        result = result.filter((car) =>
            filterStore.selectedType.includes(car.type)
        )
    }
    result = result.filter(
        (car) => car.pricePerDay <= filterStore.selectedPrice
    )

    return result
})
const reloadPage = () => {
    window.location.reload()
}
const showMore = () => (limitPerPage.value += 4)
const showAll = () => (limitPerPage.value += cars.value.length)
watch(
    limitPerPage,
    () => {
        fetchCars()
    },
    { immediate: true }
)
</script>

<template>
    <div class="cars-preview">
        <h2 class="cars-preview__title">
            {{ $t('popular_cars') }}
        </h2>
        <router-link v-if="route.path !== '/catalog'" to="/catalog">
            View All
        </router-link>
        <button v-else @click="showAll">
            View All
        </button>
    </div>
    <div class="no-cars" v-if="!isLoading && filteredCars.length === 0">
        <h2>
            {{ $t('cars_not') }}
        </h2>
    </div>
    <div v-else class="cars-grid">
        <template v-if="isLoading">
            <CarsSkeleton v-for="value in 4" :key="value" />
        </template>
        <div v-else v-for="car in filteredCars" :key="car.id" class="car-card">
            <div class="heart-div">
                <h2>{{ car.name }}</h2>
                <button
                    v-if="favoriteStore.favorites.includes(car.id)"
                    @click="
                        (favoriteStore.toggleFavorite(car.id))
                    "
                    class="heart-button"
                >
                    <img
                        class="heart-svg"
                        src="../assets/icons/heart-red.png"
                        alt="heart"
                    />
                </button>
                <button
                    @click="favoriteStore.toggleFavorite(car.id)"
                    :disabled="isButtonLoading"
                    v-else
                    class="heart-button"
                >
                    <img
                        class="heart-svg"
                        src="../assets/icons/heart-white.png"
                        alt="heart red"
                    />
                </button>
            </div>
            <span class="car-card__span">{{ car.type }}</span>
            <div class="car-modal">
                <img :src="car.image" :alt="car.name" class="car-card__img" />
                <div class="icons-container">
                    <div class="icons-container__item">
                        <img
                            class="icon"
                            src="../assets/icons/fuel.png"
                            alt="fuel"
                        />
                        <span class="icon car-card__span">{{
                            car.fuelCapacity
                        }}</span>
                    </div>
                    <div class="icons-container__item">
                        <img
                            class="icon"
                            src="../assets/icons/manual.png"
                            alt="manual"
                        />
                        <span class="icon car-card__span">{{ $t('manual') }}</span>
                    </div>
                    <div class="icons-container__item">
                        <img
                            class="icon"
                            src="../assets/icons/people.png"
                            alt="people"
                        />
                        <span class="icon car-card__span">{{ car.capacity }}</span>
                    </div>
                </div>
            </div>    
            <div class="car-card-rental-info">
                <div class="car-card-rental-info__box">
                    <p class="price">${{ car.pricePerDay }}.00/</p>
                    <span class="car-card__span">{{ $t('day') }}</span>
                </div>
                <BaseLoader v-if="isButtonLoading" :size="20" />
                <router-link v-else :to="`/cars/${car.id}`">
                    <button
                        :disabled="isButtonLoading === car.id"
                        class="rent-now__button"
                    >
                        {{ $t('rent_now') }}
                    </button>
                </router-link>
            </div>
        </div>
    </div>
    <div class="back-link" v-if="!isLoading && filteredCars.length === 0">
        <button @click="reloadPage">
            {{ $t('go_back') }}
        </button>
    </div>
    <div class="show-div" v-else>
        <button class="show-more" @click="showMore">
            {{ $t('show_more') }}
        </button>
        <h2 class="cars_number">
            {{ filteredCars.length }} {{ $t('cars_count') }}
        </h2>
    </div>
</template>

<style scoped>
.cars-preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32px 32px 20px 32px;
    background-color: var(--main-color);
}
.cars-preview__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--span-color);
    margin: 0;
}
.cars-preview__link {
    cursor: pointer;
    border: none;
    background-color: var(--main-color);
    color: var(--button-dark-color);
}
.cars-preview__link:hover {
    color: var(--button-color);
}
.no-cars {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.cars-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    padding: 24px;
    background-color: var(--main-color);
}
.car-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--white-color);
    border-radius: 10px;
    padding: 20px;
    height: 388px;
}
.heart-div {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.heart-button {
    width: 67px;
    height: 30px;
    background-color: var(--white-color);
    border: none;
    cursor: pointer;
}
.heart-svg {
    width: 16px;
    height: 16px;
}
.car-card__img {
    width: 100%;
    height: 190px;
    object-fit: contain;
    box-sizing: border-box;
    padding: 12px 16px;
}
.car-card__span {
    color: var(--span-color);
}
.car-card-rental-info {
    display: flex;
    height: 44px;
    margin-top: auto;
    justify-content: space-between;
}
.car-card-rental-info__box {
    display: flex;
    gap: 6px;
    width: 116px;
    height: 44px;
}
.price {
    font-weight: 700;
    font-size: 20px;
}
.rent-now__button {
    max-width: 186px;
    background-color: var(--button-dark-color);
    color: white;
    padding: 10px 20px;
    height: 56px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
}
.rent-now__button:hover {
    background-color: var(--button-color);
}
.icons-container {
    display: flex;
    width: 90%;
    gap: 18px;
}
.icons-container__item {
    display: flex;
    width: 100%;
    gap: 6px;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
}
.icon {
    width: 21.5px;
    height: 20.75px;
}
.back-link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
}
.back-link button {
    border: none;
    background-color: var(--main-color);
}
.show-div {
    width: 100%;
    display: flex;
    background-color: var(--main-color);
    padding: 64px 64px 64px;
    justify-content: space-between;
}
.show-more {
    background-color: var(--button-dark-color);
    max-width: 156px;
    height: 44px;
    border-radius: 4px;
    color: var(--white-color);
    border: none;
    padding: 10px 20px;
    height: 56px;
    cursor: pointer;
    margin: 0 auto;
}
.show-more:hover {
    background-color: var(--button-color);
}
.cars_number {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: var(--span-color);
    padding: 10px 0 0 10px;
}
a {
    text-decoration: none;
}
.car-modal {
    height: 250px;
}
@media screen and (max-width:380px) {
    .icons-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .car-card {
        width: 100%;
        height: 240px;
    }
    .cars-grid {
        padding: 0;
    }
    .car-modal {
        display: flex;
        gap: 10px;
    }
    .car-card__img {
        width: 46%;
        margin-left: -25px;
        margin-top: -35px;
    }
    .car-card-rental-info {
        display: flex;
        justify-content: space-between;
        margin-top: -66px;
    }
    .rent-now__button {
        width: 130px;
        height: 36px;
    }
}
</style>
