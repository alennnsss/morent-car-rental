<template>
  <div class="cars-grid">
    <div v-for="car in cars" :key="car.id" class="car-card">
        <h2>{{ car.name }}</h2>
        <span class="car-card__span">{{ car.type }}</span>
        <img :src="car.image" :alt="car.name" class="" />
            <div>
                <p class='fuel car-card__span'>{{ car.fuelCapacity }}</p>    
                <p class="manual car-card__span">Manual</p>
                <p class="capacity car-card__span">{{ car.capacity }}</p>
            </div>
        <div class="car-card-rental-info">
            <div class="car-card-rental-info__box">
                <p>${{ car.pricePerDay }}/</p> 
                <span class="car-card__span">day</span>
            </div>    
            <button class="rent-now__button">Rent Now</button>
        </div>
        
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db }  from '../firebase'
import { collection, getDocs } from 'firebase/firestore'

const cars = ref([])

const fetchCars = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'cars'))
        cars.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch(e) {
        console.error('Error', e.message)  
    }
    
}

onMounted(() => {
  fetchCars()
})
</script>


<style scoped>
    .cars-grid {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 2fr);
        gap: 24px;
        background-color: #F6F7F9;
    }
    .car-card {
        width: 90%;
        background-color: #FFFFFF;
        border-radius: 10px;
        padding: 26px;
        height: 388px;
    }
    .car-card img {
        width: 100%;
        max-width: 100%;
        height: 150px;
    }
    .car-card__span {
        color: #90A3BF;
    }
    .car-card-rental-info {
        display: flex;
        height: 44px;
        margin-top: 24px;
    }
    .car-card-rental-info__box {
        display: flex;
        gap: 6px;
        width: 116px;
        height: 44px;
        
    }
    .rent-now__button {
        width: 116px;
        /* height: 44px; */
        background-color: #3563E9;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        border: none;
    }
    .fuel::before {
        content: url(../);
    }
</style>