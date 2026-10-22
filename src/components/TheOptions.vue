<template>
    <div class="box">
        <div class="option-box">
            <div class="checkbox">
                <Checkbox binary inputId="pick" v-model="radio" />
                <label for="pick">
                    <h2>{{ $t('pick_up')}}</h2>
                </label>
            </div>
            <div class="select-container" :class="specialClass">
                <div class="selection-box">
                    <label for="pickup-locations">
                        <h2>{{ $t('locations')}}</h2>
                    </label>
                    <CascadeSelect inputId="pickup-locations" v-model="bookStore.formData.cityPick" :disabled="!radio" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'districts']" placeholder="Select a City" fluid />
                </div>  
                <div class="border"></div>
                <div class="selection-box">
                    <label for="pickup-date">
                        <h2>{{ $t('date')}}</h2>
                    </label>
                    <DatePicker inputId="pickup-date" v-model="bookStore.formData.datePick" :disabled="!radio" fluid />
                </div>
                <div class="border"></div>
                <div class="selection-box">
                    <label for="pickup-time">
                        <h2>{{ $t('time')}}</h2>
                    </label>
                    <DatePicker v-model="bookStore.formData.timePick" :disabled="!radio" showIcon fluid iconDisplay="input" timeOnly inputId="pickup-time">
                        <template>
                            <Clock />
                        </template>
                    </DatePicker>
                </div>    
            </div>     
        </div>
        <button :disabled="!radio" @click="swapCities" class="inverse-button" v-if="route.name !== 'admin'">
            <img class="inverse-image" src="../assets/images/inverse.png" alt="inverse">
        </button>
        <div class="option-box">
            <div class="checkbox">
                <Checkbox binary inputId="drop" v-model="radio" />
                <label for="drop">
                    <h2>{{ $t('drop_off') }}</h2>
                </label>
            </div>    
            <div class="select-container">
                <div class="selection-box">
                    <label for="dropoff-locations">
                        <h2>{{ $t('locations')}}</h2>
                    </label>
                    <CascadeSelect inputId="dropoff-locations" v-model="bookStore.formData.cityDrop" :disabled="!radio" :options="countries" optionLabel="cname" optionGroupLabel="name" :optionGroupChildren="['states', 'districts']" placeholder="Select a City" fluid />
                </div>  
                <div class="border"></div>
                <div class="selection-box">
                    <label for="dropoff-date">
                        <h2>{{ $t('date')}}</h2>
                    </label>
                    <DatePicker inputId="dropoff-date" v-model="bookStore.formData.dateDrop" :disabled="!radio" fluid />
                </div>
                <div class="border"></div>
                <div class="selection-box">
                    <label for="dropoff-time">
                        <h2>{{ $t('time')}}</h2>
                    </label>
                    <DatePicker v-model="bookStore.formData.timeDrop" :disabled="!radio" showIcon fluid iconDisplay="input" timeOnly inputId="dropoff-time">
                        <template>
                            <i class="pi pi-clock"></i>                            
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
import { useRoute } from 'vue-router';
const bookStore = useBookStore()
const radio = ref(false);
const route = useRoute()
defineProps({
    specialClass: {
        customClass: String,
    }
})

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
        padding: 32px 26px;
        justify-content: space-around;
        align-items: center;
        position: relative;
        box-sizing: border-box;
        gap: 24px;
    }
    .option-box {
        background-color: var(--white-color);
        border-radius: 10px;
        padding: 20px;
        flex: 1;
        min-width: 0;
    }
    .inverse-button {
        border-radius: 10px;
        background-color: var(--button-dark-color);
        width: 60px;
        height: 60px;
        border: none;
        flex-shrink: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .inverse-button:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
    .inverse-image {
        width: 24px;
        height: 24px;
    }
    .checkbox {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 12px;
    }
    .select-container {
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 16px;
    }
    .selection-box {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
        min-width: 0;
    }
    .border {
        border-right: 1px solid #C3D4E966;
    }

    h2 {
        font-weight: 600;
        margin: 0;
    }
    @media screen and (max-width: 1200px) {
        .box {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
        }
        .inverse-button {
            align-self: center;
        }
    }
    @media screen and (max-width: 600px) {
        .box {
            padding: 24px 0;
        }
        .option-box {
            padding: 16px;
        }
        .select-container {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px 12px;
        }
        .selection-box:first-child {
            grid-column: 1 / -1;
        }
        .border {
            display: none;
        }
    }
</style>
