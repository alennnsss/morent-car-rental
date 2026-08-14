<template>
    <div class="checkout-page">
        <div class="step-container">
            <KeepAlive>
                <component :is="currentComponent"/>
            </KeepAlive>
        </div>
        <div class="wizard-actions">
            <button @click="prevStep" >
                <img src="../assets/icons/back.png" alt="back">
            </button>
            <button @click="nextStep" v-if="currentStepIndex < steps.length -1">
                <img src="../assets/icons/next.png" alt="next">
            </button>
            <button v-else>
                Rent Now
            </button>
        </div>
    </div>
</template>

<script setup>
import StepBill from '../components/checkout/StepBill.vue';
import StepPayment from '../components/checkout/StepPayment.vue';
import StepRent from '../components/checkout/StepRent.vue';
import StepConfirmation from '../components/checkout/StepConfirmation.vue';
import { shallowRef } from 'vue';
import { ref, computed } from 'vue';

const currentStepIndex = ref(0);

const steps = shallowRef([
    {name: 'Billing Info', component: StepBill},
    {name: 'Rental Info', component: StepRent},
    {name: 'Payment Method', component: StepPayment},
    {name: 'Confirmation', component: StepConfirmation}
]);

const currentComponent = computed(() => steps.value[currentStepIndex.value].component);
const nextStep = () => {
    if(currentStepIndex.value < steps.value.length -1) {
        currentStepIndex.value++;
    }
}
const prevStep = () => {
    if(currentStepIndex.value >0) {
        currentStepIndex.value--;
    }
}
</script>

<style scoped>
    .checkout-page {
        padding: 32px;
        background-color: #F6F7F9;
    }
    .step-container {
        border-radius: 10px;
        background-color: white;
    }
    .steps-indicator {
        display: flex;
        gap: 40px;
    }
    button {
        border: none;
        background-color: var(--main-color);
        
    }
    img {
        width: 20px;
        height: 20px;
    }
    .wizard-actions {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
</style>