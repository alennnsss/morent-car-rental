<template>
  <div class="cars-grid">
    <template v-if="isLoading">
        <CarsSkeleton v-for="value in 4" :key="value.id"/>
    </template>
    <div v-else v-for="car in cars" :key="car.id" class="car-card">
        <div class="heart-div">
            <h2>{{ car.name }}</h2>
            <button v-if="favoriteStore.favorites.includes(car.id)" @click="favoriteStore.toggleFavorite(car.id)" class="heart-button">
                <img class="heart-svg" src="../assets/icons/heart-red.png" alt="heart">
            </button>
            <button @click="favoriteStore.toggleFavorite(car.id)" v-else class="heart-button">
                <img class="heart-svg" src="../assets/icons/heart-white.png" alt="heart red">
            </button>
        </div>
        <span class="car-card__span">{{ car.type }}</span>
        <img :src="car.image" :alt="car.name" class="car-card__img" />
            <div class="icons-container">
                <div class="icons-container__item">
                    <img class="icon" src="../assets/icons/fuel.png" alt="fuel">
                    <span class='icon car-card__span'>{{ car.fuelCapacity }}</span> 
                </div>
                <div class="icons-container__item">
                    <img class="icon" src="../assets/icons/manual.png" alt="manual">
                    <span class="icon car-card__span">Manual</span>
                </div>
                <div class="icons-container__item">
                    <img class="icon" src="../assets/icons/people.png" alt="people">
                    <span class="icon car-card__span">{{ car.capacity }}</span>
                </div> 
            </div>
        <div class="car-card-rental-info">
            <div class="car-card-rental-info__box">
                <p class="price">${{ car.pricePerDay }}.00/</p> 
                <span class="car-card__span">day</span>
            </div>    
            <button class="rent-now__button">Rent Now</button>
        </div>
    </div>

  </div>
  <div class="show-div">
    <button class="show-more" @click="showMore">Show More Car</button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { db }  from '../api/firebase.js'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import CarsSkeleton from './CarsSkeleton.vue';
import { useFavouriteStore } from '../stores/useFavouriteStore.js';


const favoriteStore = useFavouriteStore()
const isLoading = ref(false)
const cars = ref([])
const limitPerPage = ref(3)

const fetchCars = async () => {
    isLoading.value = true
    try {
        const queryParams = query(collection(db, 'cars'), limit(limitPerPage.value))
        const querySnapshot = await getDocs(queryParams)
        cars.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch(e) {
        console.error('Error', e.message)  
    } finally {
        isLoading.value = false
    }
    
}
const showMore = () => limitPerPage.value += 3;
const showAll = () => limitPerPage.value += 12;
watch(limitPerPage, () => {
    fetchCars()
}, {immediate: true})

</script>


<style scoped>
    .cars-grid {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 24px;
        padding: 24px;
        background-color: #F6F7F9;
    }
    .car-card {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #FFFFFF;
        border-radius: 10px;
        padding: 20px;
        height: 100%;
    }
    .heart-div {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .heart-button {
        width: 67px; 
        height: 30px;
        background-color: white;
        border: none;
        cursor: pointer;
    }
    .heart-svg {
        width: 16px;
        height: 16px;
    }
    .car-card__img {
        width: 100%;
        max-width: 100%;
        height: 100%;
        object-fit: contain;
        box-sizing: border-box;
        padding: 12px 16px;
    }
    .car-card__span {
        color: #90A3BF;
    }
    .car-card-rental-info {
        display: flex;
        height: 44px;
        margin-top: 24px;
        gap: 12px;
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
        width: 116px;
        background-color: #3563E9;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        border: none;
    }
    .rent-now__button:hover {
        background-color: #54A6FF;
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
    .show-div {
        margin: 0 auto;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #F6F7F9;
    }
    .show-more {
        background-color:#3563E9;
        max-width: 156px;
        width: 100;
        height: 44px;
        border-radius: 4px;
        color: white;
        border: none;
        padding: 10px 20px;
    }
    .show-more:hover {
        background-color: #54A6FF;
    }
</style>