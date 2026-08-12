<template>
    <div class="checkout-page">
        <div class="steps-indicator">
            <span v-for="(step, index) in steps" :key="index" :class="{ active: index===currentStepIndex }">
                {{ index + 1 }}. {{ step.name }}
            </span>
        </div>
        <div class="step-container">
            <KeepAlive>
                <component :is="currentComponent"/>
            </KeepAlive>
        </div>
        <div class="wizard-actions">
            <button @click="prevStep" :disabled="currentStepIndex === 0">
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
import { shallowRef } from 'vue';
import { ref, computed } from 'vue';

const currentStepIndex = ref(0);

const steps = shallowRef([
    {name: 'Billing Info', component: StepBill}
]);

const currentComponent = computed(() => steps.value[currentStepIndex.value].component);
const nextStep = () => {
    if(currentStepIndex.value < steps.value -1) {
        currentStepIndex.value++;
    }
}
const prevStep = () => {
    if(currentStepIndex.value >0) {
        currentStepIndex--;
    }
}
</script>

<style>
    .checkout-page {
        background-color: #F6F7F9;
        padding: 32px;
    }
    .step-container {
        border-radius: 10px;
    }
</style>