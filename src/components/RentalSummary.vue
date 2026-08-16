<script setup>
import { collection, getDocs, query, where } from 'firebase/firestore';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { db } from '../api/firebase';
import StarRating from './StarRating.vue';

const route = useRoute()
const isLoading = ref(false);
const isError = ref(false);
const product = ref(); 

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

<template>
  <div class="rental-summary">
    <div class="rental-title">
        <h1 class="h1"> 
            {{ $t('rental_summary') }}
        </h1>
        <span>
            {{ $t('prices_may') }}
        </span>
    </div>
    <div v-if="product" class="rental">
        <div class="rental-info">
            <div class="rental-image">
                <img :src="product.image" :alt="product.name">
            </div>
            <div class="rental-desc">
                <h1 class="product-title">{{ product.name }}</h1>
                <div class="rating">
                    <StarRating :rating="4" />
                    <p>440+Reviewer</p>
                </div>
            </div>
        </div>    
        <div class="border"></div>
        <div class="rental-price">
            <div class="rental-subtotal">
                <h2 class="h2">{{ $t('subtotal') }}</h2>
                <h2 class="h2">{{ $t('tax') }}</h2>
            </div>
            <div class="rental-subtotal">
                <h2 class="price">
                    ${{ product.pricePerDay }}.00
                </h2>
                <h2 class="price">
                    $0
                </h2>
            </div>
        </div>
        <div class="promo">
            <h2 class="h2">
                {{ $t('promo_code') }}
            </h2>
            <h2 class="price">
                {{ $t('apply_now') }}
            </h2>
        </div>
        <div class="rental-outro">
            <div class="rental-total">
                <h1>
                    {{ $t('total_price') }}
                </h1>
                <p>
                    {{ $t('overall') }}
                </p>
            </div>
            <div>
                <h1 class="total-price">
                    ${{ product.pricePerDay }}.00
                </h1>
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped>
    .rental-summary {
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        width: 100%;
        padding: 24px;
        gap: 32px;
        background-color: var(--white-color);
    }
    span {
        color: var(--span-color);
        font-size: 14px;
        font-weight: 500;
    }
    .rental-title {
        display: flex;
        flex-direction: column;
        gap:4px;
    }
    .h1 {
        font-weight: 700;
        font-size: 20px;
    }
    .rental-image {
        background-color: #3563E9;
        border-radius: 8px;
        height: 108px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .rental-image img {
        width: 116px;
        height: 106px;
    }
    .rental {
        display: flex;
        flex-direction: column;
    }
    .rental-info {
        display: flex;
        gap: 16px;
    }
    .rental-desc {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .product-title {
        font-size: 32px;
        font-weight: 700;
    } 
    p {
        color: #596780;
        font-weight: 500;
        font-size: 14px;
    }
    .rating {
        display: flex;
        gap: 8px;
    }
    .border {
        border: 1px solid #C3D4E966;
        margin-top: 32px;
        margin-bottom: 32px;
        width: 100%;
    }
    .rental-price {
        display: flex;
        justify-content: space-between;
    }
    .h2 {
        font-size: 16px;
        font-weight: 500;
        color: var(--span-color)
    }
    .rental-subtotal {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    .price {
        font-size: 16px;
        font-weight: 500;
    }
    .promo {
        background-color: var(--main-color);
        padding: 16px 32px;
        height: 56px;
        border-radius: 10px;
        margin-top: 32px;
        display: flex;
        justify-content: space-between;
    }
    .rental-total {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .rental-outro {
        display: flex;
        margin-top: 32px;
        justify-content: space-between;
    }
    .total-price {
        font-size: 32px;
        font-weight: 700;
    }
    @media screen and (max-width: 768px) {
        .rating {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
</style>