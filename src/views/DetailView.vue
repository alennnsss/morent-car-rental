<template>
    <div v-if="isLoading">
      <cars-skeleton v-for="value in 1" :key="value.id"/>
    </div>
    <div v-else-if="isError">
      <h1>Unfortunately, cars not found!</h1>
      <button @click="loadCar">Reload Page</button>
    </div>
    <div class="detail" v-else-if="product">
        <TheFilter class="filter"/>
        <main class="main">
            
            <div class="car-box">
                <div class="car-box-image">
                    <div class="sport-car">
                        <div class="sport-car__text">
                            <h1>
                                {{ $t('best_design') }}
                            </h1>
                            <p>
                                {{ $t('safety_comfort') }}
                            </p>
                        </div>    
                        <img class="car-image" :src="product.image" :alt="product.title">
                    </div>
                </div>
                <div class="car-box-info">
                    <div class="heart-box">
                        <h1 class="car-name">
                            {{ product.name }}
                        </h1>
                        <button v-if="favoriteStore.favorites.includes(product.id)" @click="favoriteStore.toggleFavorite(product.id), toastStore.addToast()" class="heart-button">
                            <img class="heart-svg" src="../assets/icons/heart-red.png" alt="heart">
                        </button>
                        <button @click="favoriteStore.toggleFavorite(product.id)" :disabled="isButtonLoading" v-else class="heart-button">
                            <img class="heart-svg" src="../assets/icons/heart-white.png" alt="heart red">
                        </button>
                    </div>   
                    <div class="car-desc">
                        <span>
                            {{ $t('car_desc') }}
                        </span>
                    </div> 
                </div>
            </div>
        </main>
    </div>
</template>
<style scoped>
.detail {
    display: flex;
    
}
.filter {
    width: 30%;
}
.main {
    padding: 32px;
    background-color: var(--main-color);
    width: 100%;
}
.car-box {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
    
}
.car-box-image {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;
    color: white;
}
.car-image {
    max-width: 340px;
    max-height: 300px;
}
.sport-car {
    display: flex;
    flex-direction: column;
    padding: 24px;
    border-radius: 10px;
    background-color: var(--button-dark-color);
    height: 360px;
}
.sport-car__text {
    display: flex;
    flex-direction: column;
    gap: 16px;
}
.car-box-info {
    background-color: white;
    border-radius: 10px;
    height: 508px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}
.car-name {
    font-weight: 700;
}
.heart-box {
    display: flex;
    justify-content: space-between;
}
.heart-box {
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
.car-desc {
    display: flex;
    flex-direction: column;
    gap: 32px;
    line-height: 200%;
}
h1 {
    font-weight: 500;
    font-size: 32px;
}
p {
    font-size: 16px;
}
span {
    color: var(--span-color);
}
</style>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getDocs, doc, where, query, collection } from 'firebase/firestore';
import { db } from '../api/firebase';
import CarsSkeleton from '../components/CarsSkeleton.vue';
import TheFilter from '../components/TheFilter.vue';
import { useFavouriteStore } from '../stores/useFavouriteStore.js';


const favoriteStore = useFavouriteStore()
const product = ref(null)
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isError = ref(false);


const loadCar = async () => {
    isError.value = false
    isLoading.value = true

    try {
        const carId = route.params.id

        const q = query(
            collection(db, 'cars'),
            where('id', '==', carId)
        )
        const response = await getDocs(q)

        if (response.empty) {
            isError.value = true
            return
        }
        const car = response.docs[0]

        product.value = {
            id: car.data().id,
            ...car.data()
        }
    } catch (error) {
        console.error('Error:', error)
        isError.value = true
    } finally {
        isLoading.value = false
    }
}
onMounted(() => {
  loadCar()
})
</script>

<style>

</style>