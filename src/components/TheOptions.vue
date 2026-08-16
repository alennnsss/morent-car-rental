<template>
    <div class="box">
        <div class="option-box">
            <div class="checkbox">
                <Checkbox binary inputId="preview-checkbox"  v-model="radio" id="pick" />
                <label for="pick">
                    <h2>{{ $t('pick_up')}}</h2>
                </label>
            </div>
            <div class="select-container">
                <div class="selection-box">
                    <label for="pickup-locations">
                        <h2>{{ $t('locations')}}</h2>
                    </label>
                    <CascadeSelect v-model="bookStore.formData.cityPick" :disabled="!radio" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'districts']" placeholder="Select a City"/>
                </div>  
                <div class="border"></div>
                <div class="selection-box">
                    <label for="pickup-date">
                        <h2>{{ $t('date')}}</h2>
                    </label>
                    <DatePicker v-model="bookStore.formData.datePick" :disabled="!radio" />
                </div>
                <div class="border"></div>
                <div class="selection-box">
                    <label for="pickup-time">
                        <h2>{{ $t('time')}}</h2>
                    </label>
                    <DatePicker v-model="bookStore.formData.timePick" :disabled="!radio" showIcon fluid iconDisplay="input" timeOnly inputId="templatedisplay">
                        <template>
                            <Clock />
                        </template>
                    </DatePicker>
                </div>    
            </div>     
        </div>
        <button :disabled="!radio" @click="swapCities" class="inverse-button">
            <img class="inverse-image" src="../assets/images/inverse.png" alt="inverse">
        </button>
        <div class="option-box">
            <div class="checkbox">
                <Checkbox binary inputId="preview-checkbox"  v-model="radio" id="pick" />
                <label for="drop">
                    <h2>{{ $t('drop_off') }}</h2>
                </label>
            </div>    
            <div class="select-container">
                <div class="selection-box">
                    <label for="dropoff-locations">
                        <h2>{{ $t('locations')}}</h2>
                    </label>
                    <CascadeSelect v-model="bookStore.formData.cityDrop" :disabled="!radio" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'districts']" placeholder="Select a City"/>
                </div>  
                <div class="border"></div>
                <div class="selection-box">
                    <label for="dropoff-date">
                        <h2>{{ $t('date')}}</h2>
                    </label>
                    <DatePicker v-model="bookStore.formData.dateDrop" :disabled="!radio" />
                </div>
                <div class="border"></div>
                <div class="selection-box">
                    <label for="dropoff-time">
                        <h2>{{ $t('time')}}</h2>
                    </label>
                    <DatePicker v-model="bookStore.formData.timeDrop" :disabled="!radio" showIcon fluid iconDisplay="input" timeOnly inputId="templatedisplay">
                        <template>
                            <Clock />
                        </template>
                    </DatePicker>
            </div>     
        </div>   
    </div>     
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { CascadeSelect } from 'primevue';
import DatePicker from 'primevue/datepicker';
import Checkbox from 'primevue/checkbox';
import { useBookStore } from '../stores/useBookStore';

const bookStore = useBookStore()
const radio = ref(false);

const countries = ref([
    {
        name: 'Kazakhstan',
        code: 'KZ',
        states: [
            {
                name: 'Almaty',
                districts: [
                    { cname: 'Almaly', code: 'ALM' },
                    { cname: 'Auezov', code: 'AUZ' },
                    { cname: 'Bostandyk', code: 'BOS' },
                    { cname: 'Zhetysu', code: 'ZHE' },
                    { cname: 'Medeu', code: 'MED' },
                    { cname: 'Nauryzbay', code: 'NAU' },
                    { cname: 'Turksib', code: 'TUR' },
                    { cname: 'Alatau', code: 'ALA' },
                ]
            },
            {
                name: 'Astana',
                districts: [
                    { cname: 'Almaty', code: 'AST-ALM' },
                    { cname: 'Baikonur', code: 'AST-BAI' },
                    { cname: 'Yesil', code: 'AST-YES' },
                    { cname: 'Saryarka', code: 'AST-SAR' },
                ]
            },
            {
                name: 'Shymkent',
                districts: [
                    { cname: 'Abay', code: 'SHY-ABA' },
                    { cname: 'Al-Farabi', code: 'SHY-ALF' },
                    { cname: 'Enbekshinsky', code: 'SHY-ENB' },
                    { cname: 'Karatau', code: 'SHY-KAR' },
                    { cname: 'Turan', code: 'SHY-TUR' },
                ]
            }    
        ]
    }
])
const swapCities = () => {
    [bookStore.formData.cityPick,bookStore.formData.cityDrop] = [bookStore.formData.cityDrop, bookStore.formData.cityPick]
}
</script>

<style scoped>
    .box {
        display: flex;
        width: 100%;
        padding: 32px 26px;;
        justify-content: space-around;
        position: relative;
    }
    .option-box {
        background-color: var(--white-color);
        border-radius: 10px;
        padding: 20px;
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
    input {
        max-width: 40px;
    }
    
</style>