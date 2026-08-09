<template>
    <div class="container">
        <TheBlocks />
        <!-- <TheReviews /> -->
        <TheOptions />
        <Cars />
        <router-view/>
        <div class="dount-wrapper">
            <Doughnut :data="chartData" :options="chartOptions"/>
        </div>
    </div>    
  
  
</template>

<script setup>
import TheOptions from '../components/TheOptions.vue';
import TheBlocks from '../components/TheBlocks.vue';
import TheReviews from '../components/TheReviews.vue';
import Cars from '../components/Cars.vue';
import { ref } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)
const chartData = ref({
    labels: [
        'Sport Car',
        'SUV',
        'Coupe',
        'Hatchback',
        'MPV'
    ],
    datasets: [
        {
            backgroundColor: ['#0D3559','#175D9C','#2185DE','#63A9E8','#A6CEF2'],
            data: [17.439, 9.478, 18.197, 12.510, 14.406]
        }
    ],

})
const chartOptions = ref({
    resposive: true,
    maintainAspectRatio: false,
    
})
</script>

<style>
    .dount-wrapper {
        height: 220px;
        width: 220px;
    }
</style>