<template>
    <div v-if="isLoading">
      <cars-skeleton v-for="value in 1" :key="value.id"/>
    </div>
    <div v-else-if="isError">
      <h1>Unfortunately, cars not found!</h1>
      <button @click="loadCar">Reload Page</button>
    </div>
    <div class="detail" v-else-if="product">
        <TheFilter/>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { getDocs, doc, where, query, collection } from 'firebase/firestore';
import { db } from '../api/firebase';
import CarsSkeleton from '../components/CarsSkeleton.vue';
import TheFilter from '../components/TheFilter.vue';

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