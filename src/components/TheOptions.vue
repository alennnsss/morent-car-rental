<template>
    <div class="container">
        <div class="option-box">
            <div class="checkbox">
                <input type="checkbox" v-model="radio" id="pick">
                <label for="pick">
                    <h2>Pick - Up</h2>
                </label>
            </div>
            <div class="select-container">
                <div class="selection-box">
                    <label for="pickup-locations">
                        <h2>Locations</h2>
                    </label>
                    <select v-model="formData.cityPick" :disabled="!radio" name="pickup-locations" id="pickup-locations">
                        <option value="default">Select your city</option>
                        <option value="almaty">Almaty</option>
                        <option value="london">London</option>
                        <option value="moskow">Moskow</option>
                        <option value="newyork">New York</option>
                    </select>
                </div>  
                <div class="border"></div>
                <div class="selection-box">
                    <label for="pickup-date">
                        <h2>Date</h2>
                    </label>
                    <input v-model="formData.datePick" :disabled="!radio" type="date" name="pickup-date" id="pickup-date">
                </div>
                <div class="border"></div>
                <div class="selection-box">
                    <label for="pickup-time">
                        <h2>Time</h2>
                    </label>
                    <input v-model="formData.timePick" :disabled="!radio" type="time" name="pickup-time" id="pickup-time">
                </div> 
            </div>     
        </div>
        <button :disabled="!radio" @click="saveFormData" class="inverse-button">
            <img class="inverse-image" src="../assets/images/inverse.png" alt="inverse">
        </button>
        <div class="option-box">
            <div class="checkbox">
                <input type="checkbox" v-model="radio" id="pick">
                <label for="drop">
                    <h2>Drop - Off</h2>
                </label>
            </div>    
            <div class="select-container">
                <div class="selection-box">
                    <label for="dropoff-locations">
                        <h2>Locations</h2>
                    </label>
                    <select v-model="formData.cityDrop" :disabled="!radio" name="dropoff-locations" id="dropoff-locations">
                        <option value="default" class="text-gray">Select your city</option>
                        <option value="almaty">Almaty</option>
                        <option value="london">London</option>
                        <option value="moskow">Moskow</option>
                        <option value="newyork">New York</option>
                    </select>
                </div>  
                <div class="border"></div>
                <div class="selection-box">
                    <label for="dropoff-date">
                        <h2>Date</h2>
                    </label>
                    <input v-model="formData.dateDrop" :disabled="!radio" type="date" name="dropoff-date" id="dropoff-date">
                </div>
                <div class="border"></div>
                <div class="selection-box">
                    <label for="dropoff-time">
                        <h2>Time</h2>
                    </label>
                    <input v-model="formData.timeDrop" :disabled="!radio" type="time" name="dropoff-time" id="dropoff-time">
                </div> 
            </div>     
        </div>    
    </div>   
    <div v-for="item in data" :key="item.id">
        <h2>{{ item.cityPick }}</h2>
    </div> 
</template>

<script setup>
import { ref, watch } from 'vue';

const radio = ref(false);
const formData = {
    cityPick: '',
    cityDrop: '',
    datePick: '',
    dateDrop: '',
    timePick: '',
    timeDrop: '',
}
const saveFormData = () => {
    const savedForm = localStorage.setItem('rent_info', JSON.stringify(formData))

}

</script>

<style scoped>
    .container {
        display: flex;
        width: 100%;
        padding: 32px 26px;;
        justify-content: space-around;
        position: relative;
    }
    .option-box {
        background-color: var(--white-color);
        border-radius: 10px;
        width: 45%;
        padding: 26px 48px 24px 48px;
    }
    .inverse-button {
        border-radius: 10px;
        background-color: var(--button-dark-color);
        width: 60px;
        height: 60px;
        border: none;
        margin-top: 36px;
    }
    .inverse-image {
        width: 24px;
        height: 24px;
    }
    .checkbox {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
    }
    .select-container {
        display: flex;
        width: 100%;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 16px;
    }
    .selection-box {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .border {
        border-right: 1px solid #C3D4E966;
    }

    h2 {
        font-weight: 600;
        margin: 0;
    }
    select {
        border: none;
        width: 100%;
        padding: 0;
    }
    .text-gray {
        color: var(--span-color);
    }
</style>