<script setup>
import { getDocs, query, collection, limit } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { db } from '../api/firebase';
import StarRating from './StarRating.vue';
import { useToast } from 'primevue/usetoast';

const toast = useToast()
const limitPerReview = ref(2);
const reviews = ref([])
const isLoading = ref(false);
const isError = ref(false);

const fetchReviews = async() => {
    try {
        isLoading.value = true;
        const queryParams = query(collection(db, 'reviews'), limit(limitPerReview.value))
        const querySnapshot = await getDocs(queryParams)
        reviews.value = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))
    } catch(error) {
        console.error('Error', error.message)
        toast.add({
            severity: 'error',
            summary: 'Error in reviews',
            detail: 'Unfortunately, there is a mistake in downloading reviews',
            life: 3000
        })
        isError.value = true
    } finally {
        isLoading.value = false
    }
}
const showAll = async() => {
    limitPerReview.value += 11
    await fetchReviews()
}
onMounted(() => {
    fetchReviews()
})
</script>
<template>
  <div class="reviews-box">
    <div class="reviews-box-title">
        <h2>Reviews</h2>
        <div class="review-length">
            {{ reviews.length }}
        </div>
    </div>
    <div v-for="review in reviews" :key="review.id">
        <div class="review-author">
            <div class="author">
                <img class="author-image" :src="review.image" :alt="review.name">
                <div class="author-name">
                    <h1>{{ review.name }}</h1>
                    <p>{{ review.role }}</p>
                </div>    
            </div>
            <div class="review-rating">
                <p>{{ review.date }}</p>
                <StarRating :rating="review.rating"></StarRating>
            </div>
        </div>    
        <div class="review-info">
            <p>
                {{ review.desc }}
            </p>
        </div>
    </div>
    <div class="view">
        <button v-if="reviews.length < 13" @click="showAll">
            {{ $t('view_all') }}
        </button>
    </div>
  </div>
</template>

<style scoped>
    .reviews-box {
        background-color: var(--white-color);
        width: 100%;
        border-radius: 10px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .reviews-box-title {
        display: flex;
        gap: 12px;
    }
    .review-length {
        width: 44px;
        height: 28px;
        color: white;
    }
    .review-length {
        background-color: var(--button-dark-color);
        border-radius: 4px;
        height: 28px;
        width: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .review-author {
        display: flex;
        justify-content: space-between;
    }
    .review-rating {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .author {
        display: flex;
        gap: 16px;
    }
    .author-image {
        border-radius: 60px;
        width: 56px;
        height: 56px;
    }
    .author-name {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .review-info {
        width: 80%;
        margin-top: 12px;
        margin-left: 70px;
    }
    .view {
        margin: 0 auto;
    }
    p {
        font-weight: 400;
        font-size: 14px;
        line-height: 200%;
        color: #596780;
    }
    h1 {
        font-size: 20px;
        font-weight: 600;
    }
    button {
        border: none;
        background-color: white;
        cursor: pointer;
        color: #90A3BF;
    }
</style>