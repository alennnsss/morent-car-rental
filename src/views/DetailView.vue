<template>
    <div v-if="isLoading">
      <cars-skeleton v-for="value in 1" :key="value.id"/>
    </div>
    <div v-else-if="isError">
      <h1>Unfortunately, cars not found!</h1>
      <button @click="loadCar">Reload Page</button>
    </div>
    <div class="detail" v-else-if="product">
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
                        <div class="star">
                            <h1 class="car-name">
                                {{ product.name }}
                            </h1>
                            <div class="review-info">
                                <StarRating :rating="4" />
                                <p>
                                    440+ Reviewer
                                </p>
                            </div>    
                        </div>    
                        <button v-if="favoriteStore.favorites.includes(product.id)" @click="favoriteStore.toggleFavorite(product.id), toastStore.addToast()" class="heart-button">
                            <img class="heart-svg" src="../assets/icons/heart-red.png" alt="heart">
                        </button>
                        <button @click="favoriteStore.toggleFavorite(product.id)" :disabled="isButtonLoading" v-else class="heart-button">
                            <img class="heart-svg" src="../assets/icons/heart-white.png" alt="heart red">
                        </button>
                    </div>   
                    <div class="car-desc">
                        <span>
                            {{ product.desc }}
                        </span>
                    </div> 
                    <div class="charac">
                        <div class="charac-info">
                            <div class="info">
                                <p class="infop">
                                    {{ $t('type_car') }}
                                </p>
                                <p>
                                    {{ product.type }}
                                </p>
                            </div>
                            <div class="info">
                                <p class="infop">
                                    {{ $t('steering') }}
                                </p>
                                <p>
                                    {{ $t('manual') }}
                                </p>
                            </div>
                        </div>
                        <div class="charac-info">
                            <div class="info">
                                <p class="infop">
                                    {{ $t('capacity_p') }}
                                </p>
                                <p>
                                    {{ product.capacity }}
                                </p>
                            </div>
                            <div class="info">
                                <p class="infop">
                                    {{ $t('gasoline') }}
                                </p>
                                <p>
                                    {{ product.fuelCapacity }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="buttons-box">
                        <div class="price-box">
                            <h1>${{ product.pricePerDay }}.00/</h1>
                            <p class="day">{{ $t('day') }}</p>
                        </div>    
                        <button class="rent">
                            {{ $t('rent_now') }}
                        </button>
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
    margin-right: 56px;
    margin-left: 56px;
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
.star {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.review-info {
    display: flex;
    gap: 3px;
}
.review-info p {
    color: #596780;
}
.car-desc {
    display: flex;
    flex-direction: column;
    gap: 32px;
    line-height: 200%;
}
.charac {
    display: flex;
    justify-content: space-around;
}
.charac-info {
    display: grid;
    gap: 16px;
    white-space: nowrap;
}
.info {
    display: flex;
    gap: 16px;
}
.infop {
    color: #90A3BF;
}
.buttons-box {
    display: flex;
    justify-content: space-between;
}
.price-box {
    display: flex;
}
.day {
    margin-top: 12px;
    margin-left: 6px;
}
.rent {
    background-color: var(--button-dark-color);
    border-radius: 4px;
    border: none;
    max-width: 140px;
    height: 56px;
    color: white;
    width: 100%;    
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
button {
    cursor: pointer;
}
</style>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getDocs, doc, where, query, collection, limit } from 'firebase/firestore';
import { db } from '../api/firebase';
import CarsSkeleton from '../components/CarsSkeleton.vue';
import { useFavouriteStore } from '../stores/useFavouriteStore.js';
import StarRating from '../components/StarRating.vue';
import { useToastStore } from '../stores/useToastStore.js';

const toastStore = useToastStore()
const favoriteStore = useFavouriteStore()
const route = useRoute();
const router = useRouter();
const isLoading = ref(false);
const isError = ref(false);
const product = ref(null)
const limitPerReview = ref(2);
const reviews = ref([])

const fetchReviews = async() => {
    isLoading.value = true
    try {
        isLoading.value = true;
        const queryParams = query(collection(db, 'reviews'),
        limit(limitPerReview.value))
        const querySnapshot = await getDocs(queryParams)
        reviews.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch(error) {
        console.error('Error', error.message)
        toastStore.addToast('Error in reviews', 'error')
        isError.value = true
    } finally {
        isLoading.value = false
    }
}
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
  fetchReviews()
})
</script>

<style>

</style>