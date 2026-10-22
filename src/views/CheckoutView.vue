<template>
    <div class="checkout-page">
        <div class="step-container">
            <KeepAlive>
                <component :is="currentComponent"/>
            </KeepAlive>
        </div>
        <div class="wizard-actions">
            <button @click="prevStep" :style="{ visibility: currentStepIndex > 0 ? 'visible' : 'hidden' }">
                <img src="../assets/icons/back.png" alt="back">
            </button>
            <button @click="nextStep" v-if="currentStepIndex < steps.length -1">
                <img src="../assets/icons/next.png" alt="next">
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
import { useVuelidate } from '@vuelidate/core';

const v$ = useVuelidate();

const currentStepIndex = ref(0);

const steps = shallowRef([
    {name: 'Billing Info', component: StepBill},
    {name: 'Rental Info', component: StepRent},
    {name: 'Payment Method', component: StepPayment},
    {name: 'Confirmation', component: StepConfirmation}
]);

const currentComponent = computed(() => steps.value[currentStepIndex.value].component);
const nextStep = async () => {
    const isValid = await v$.value.$validate()
    if(!isValid) return
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
    }
    .steps-indicator {
        display: flex;
        gap: 40px;
    }
    button {
        border: 1px solid #C3D4E9;
        border-radius: 50%;
        background-color: var(--white-color);
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    button:hover {
        border-color: var(--button-dark-color);
    }
    img {
        width: 20px;
        height: 20px;
    }
    .wizard-actions {
        display: flex;
        width: 100%;
        justify-content: space-between;
        margin-top: 24px;
    }
    @media screen and (max-width: 768px) {
        .checkout-page {
            padding: 16px;
        }
    }
</style>