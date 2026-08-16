<script setup>
import { db } from '../api/firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBookStore } from '../stores/useBookStore.js';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs';
import { useRecentStore } from '../stores/useRecentStore.js';

const recentStore = useRecentStore()
const route = useRoute()
const product = ref()
const bookStore = useBookStore()
const isLoading = ref(false);
const isError = ref(false) 

ChartJS.register(ArcElement, Tooltip, Legend)
const chartData = ref({
    
    datasets: [
        {
            backgroundColor: ['#0D3559','#175D9C','#2185DE','#63A9E8','#A6CEF2'],
            data: [17.439, 9.478, 18.197, 12.510, 14.406]
        }
    ],
        
    plugins: {
        legend: {
            display: false
        }
    }
})
const chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%'
})

const loadCar = async() => {
    try {
        isLoading.value = true;
        const carId = route.params.id;
        const q = query(collection(db, 'cars'), where('id', '==', carId))
        const response = await getDocs(q);
        if(response.empty) {
            isError.value = true;
            return
        }
        const car = response.docs[0];
        product.value = {
            id: car.data().id,
            ...car.data()
        }
    } catch(error) {
        console.error('Error', error.message)
        isError.value = true
    } finally {
        isLoading.value = false
    }
}
onMounted(() => {
    loadCar()
})
const formatDate = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const formatTime = (date) => {
    if (!date) return '';

    return new Date(date).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
    });
};
</script>

<template>
    <main>
        <div class="rental-detail">
            <div class="rental-title">
                <h1>{{ $t('details_rental') }}</h1>
            </div>
            <div>
                <img class="map" src="../assets/images/map.png" alt="map">
            </div>
            <div class="product" v-if="product">
                <div class="product-info">
                    <div class="product-image">
                        <img :src="product.image" :alt="product.name">
                    </div>
                    <div class="product-title">
                        <h1 class="product-name">
                            {{ product.name }}
                        </h1>
                        <p>{{ product.type }}</p>
                    </div>
                </div>
                <div>
                    <p class="product-number">#9761</p>
                </div>
            </div>
            <div class="select-box">
                <div class="select">
                    <div class="select-title">
                        <h1>{{ $t('pick_up') }}</h1>
                    </div>
                    <div class="option-box">
                        <div class="option">
                            <h1>
                                {{ $t('locations') }}
                            </h1>
                            <p>{{ bookStore.formData.cityPick.cname }}</p>
                        </div>
                        <div class="border"></div>
                        <div class="option">
                            <h1>{{ $t('date') }}</h1>
                            <p>{{ formatDate(bookStore.formData.datePick) }}</p>
                        </div>
                        <div class="border"></div>
                        <div class="option">
                            <h1>{{ $t('time') }}</h1>
                            <p>{{ formatTime(bookStore.formData.timePick) }}</p>
                        </div>
                    </div>
                </div>
                <div class="select">
                    <div class="select-title">
                        <h1>{{ $t('drop_off') }}</h1>
                    </div>
                    <div class="option-box">
                        <div class="option">
                            <h1>
                                {{ $t('locations') }}
                            </h1>
                            <p>{{ bookStore.formData.cityDrop.cname }}</p>
                        </div>
                        <div class="border"></div>
                        <div class="option">
                            <h1>{{ $t('date') }}</h1>
                            <p>{{ formatDate(bookStore.formData.dateDrop) }}</p>
                        </div>
                        <div class="border"></div>
                        <div class="option">
                            <h1>{{ $t('time') }}</h1>
                            <p>{{ formatTime(bookStore.formData.timeDrop) }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="final-border"></div>
            <div class="total-price">
                <div class="overall">
                    <h1 class='total-price-h1'>{{ $t('total_price') }}</h1>
                    <p>{{ $t('overall') }}</p>
                </div>
                <h1 class="price" v-if="product">${{ product.pricePerDay }}.00</h1>
            </div>
        </div>
        <div class="second-block">
            <div class="statistics">
                <div class="statistics-header">
                    <h1>{{ $t('top5') }}</h1>
                </div>
                <div class="chart-box">
                    <div class="dount-wrapper">
                        <Doughnut :data="chartData" :options="chartOptions"/>
                        <div class="chart-text">
                            <h2>72,030</h2>
                            <p>Rental Car</p>
                        </div>
                    </div>
                    
                    <div class="legend">
                        <div class="legend-item">
                            <span><i class="sport"></i>Sport Car</span>
                            <b>17,439</b>
                        </div>

                        <div class="legend-item">
                            <span><i class="suv"></i>SUV</span>
                            <b>9,478</b>
                        </div>

                        <div class="legend-item">
                            <span><i class="coupe"></i>Coupe</span>
                            <b>18,197</b>
                        </div>

                        <div class="legend-item">
                            <span><i class="hatchback"></i>Hatchback</span>
                            <b>12,510</b>
                        </div>

                        <div class="legend-item">
                            <span><i class="mpv"></i>MPV</span>
                            <b>14,406</b>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="recent-tran">
                <div>
                    <h1>{{ $t('recent_transaction') }}</h1>
                </div>
                <div v-for="item in recentStore.items" :key="item.id">
                    <div class="recent-image">
                        <img :src="item.image" :alt="item.title">
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>    
    </main>
</template>

<style scoped>
    main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        width: 80%;
        gap: 32px;
        background-color: var(--main-color);
        padding: 32px;
    }
    .rental-detail {
        display: flex;
        flex-direction: column;
        gap: 32px;
        background-color: white;
        border-radius: 10px;
        padding: 24px;
    }
    .rental-title h1 {
        font-size: 20px;
        font-weight: 700;
    }
    .map {
        width: 100%;
        height: 272px;
    }
    .product {
        display: flex;
        justify-content: space-between;
    }
    .product-image {
        border-radius: 8px;
        height: 72px;
        padding: 18px 8px;
        background-color: #3563E9;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .product-image img {
        width: 116px;
        height: 56px;
    }
    .product-info {
        display: flex;
        gap: 16px;
    }
    .product-title {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .product-name {
        font-size: 24px;
        font-weight: 700;
    }
    .product-number {
        font-size: 14px;
        font-weight: 500;
        color: #3D5278;
    }
    .select-box {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .select {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .select-title h1 {
        font-size: 16px;
        font-weight: 600;
    }
    .option-box {
        display: flex;
        justify-content: space-between;
    }
    .border {
        border-right: 1px solid #C3D4E966;
    }
    .option h1 {
        font-size: 16px;
        font-weight: 700;
    }
    .final-border {
        border-bottom: 1px solid #C3D4E966;
        margin-top: 40px;
        margin-bottom: 36px;
    }
    .total-price-h1{
        font-size: 20px;
        font-weight: 700;
    }
    .total-price {
        display: flex;
        justify-content: space-between;
    }
    .overall {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .price {
        font-size: 32px;
        font-weight: 700;
    }
    .dount-wrapper {
        height: 220px;
        width: 220px;
        margin-top: 20px;
        position: relative;
    }
    .chart-text {
        position: absolute;
        top: 50%;
        left: 50%;
        text-align: center;
        transform: translate(-50%, -50%);
    }
    .chart-text h2 {
        margin: 0;
        font-size: 28px;
    }

    .chart-text p {
        margin: 4px 0 0;
        color: #90A3BF;
        font-size: 14px;
    }
    .second-block {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .statistics {
        height: 324px;
        background-color: var(--white-color);
        border-radius: 10px;
        padding: 24px;
    }
    .statistics h1 {
        font-size: 20px;
        font-weight: 700;
    }
    .chart-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
    }
    .legend {
        display: flex;
        flex-direction: column;
        gap: 22px;
    }
    .legend-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 40px;
        width: 220px;
    }
    .legend-item span {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #90A3BF;
    }
    .legend-item i {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }
    .sport {
        background-color: #0D3559;
    }

    .suv {
        background-color: #175D9C;
    }

    .coupe {
        background-color: #2185DE;
    }

    .hatchback {
        background-color: #63A9E8;
    }

    .mpv {
        background-color: #A6CEF2;
    }
    .recent-tran {
        display: flex;
        flex-direction: column;
        padding: 24px;
        background-color: var(--white-color);
        border-radius: 10px;
    }
</style>