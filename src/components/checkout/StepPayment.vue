<template>
    <div class="box">
        <div class="user-info">
            <div>
                <h1>{{ $t('payment') }}</h1>
            </div>
            <div class="enter-info">
                <p>{{ $t('please_card') }}</p>
                <p>{{ $t('step3') }}</p>
            </div>
        </div>   
        <div class="radio-box">
            <div>
                <div class="visa-container">
                    <input type="radio" id="radio">
                    <label for="radio">
                        {{ $t('credit_card') }}
                    </label>
                </div>
                <div class="visa-images">
                    <img :src="visa" class="visa__image" alt="visa image">
                    <img src="../../assets/images/circles.png" class="visa__circle" alt="circle visa">
                </div>
            </div>
            <div>
                <div class="inputs-box">
                    <div class="user-info">
                        <div>
                            <h1>{{ $t('billing_info') }}</h1>
                        </div>
                        <div class="enter-info">
                            <p>{{ $t('please_enter') }}</p>
                            <p>{{ $t('step1')}}</p>
                        </div>
                    </div>    
                <div class="input-container">
                    <div class="input-item">
                        <label for="name" :class="{ 'has-error': v$.cardNumber.$error }">
                            {{ $t('cardNumber') }}
                            <input @blur="v$.cardNumber.$touch()" v-model="dataStore.profileData.cardNumber" id="name" type="text" :placeholder="$t('cardNumber')">
                            <span class="error-msg" v-if="v$.cardNumber.$error">
                                {{ v$.cardNumber.$errors[0].$message }}
                            </span>
                        </label>
                        <label for="phone" :class="{ 'has-error': v$.expDate.$error }">
                            {{ $t('expDate') }}
                            <input @blur="v$.expDate.$touch()" v-model="dataStore.profileData.expDate" type="tel" id="phone" :placeholder="$t('expDate')">
                            <span class="error-msg" v-if="v$.expDate.$error">
                                {{ v$.expDate.$errors[0].$message }}
                            </span>
                        </label>
                    </div>    
                </div>
                <div class="input-item">
                    <label for="address" :class="{ 'has-error': v$.cardHolder.$error }">
                        {{ $t('cardHolder') }}
                        <input @blur="v$.cardHolder.$touch()" v-model="dataStore.profileData.cardHolder" id="address" type="text" :placeholder="$t('cardHolder')">
                        <span class="error-msg" v-if="v$.cardHolder.$error">
                            {{ v$.cardHolder.$errors[0].$message }}
                        </span>
                    </label>
                    <label for="location" :class="{ 'has-error': v$.cvc.$error }">
                        {{ $t('cvc') }}
                        <input @blur="v$.cvc.$touch()" v-model="dataStore.profileData.cvc" type="text" id="location" :placeholder="$t('cvc')">
                        <span class="error-msg" v-if="v$.cvc.$error">
                            {{ v$.cvc.$errors[0].$message }}
                        </span>
                    </label>
                </div>
            </div>
        </div>    
    </div>        
    <div class="radio-box">

    </div>
    <div class="radio-box">
       
    </div>
    </div>
</template>

<script setup>
import visa from '../../assets/images/visa.png';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, required, email } from '@vuelidate/validators';
import { useDataStore } from '../../stores/useDataStore';

const dataStore = useDataStore()
const rules = {
    cardNumber: {
        required: helpers.withMessage('Card number is required', required),
    },
    cardHolder: {
        required: helpers.withMessage('Card Holder is required', required),
    },
    expDate: {
        required: helpers.withMessage('Expiration date is required', required),
    },
    cvc: {
        required: helpers.withMessage('CVC is required', required),
    }
}
const v$ = useVuelidate(rules, dataStore.profileData)
</script>

<style scoped>
.box {
    background-color: var(--white-color);
    padding: 24px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 24px;
}
.radio-box {
    background-color: var(--main-color);
    padding: 24px;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
}
.visa-container {
    display: flex;
    gap: 8px;
}
.visa-images {
    display: flex;
    gap: 12px;
}
.visa__image {
    width: 48px;
    height: 16px;
}
.visa__circle {
    width: 32px;
    height: 20px;
}
input {
    width: 386px;
    width: 100%;
    height: 56px;
    border-radius: 10px;
    margin-top: 16px;
    padding: 16px 32px;
    border: none;
    background-color: #F6F7F9;
}
label {
    max-width: 386px;
    width: 100%;
}
h1 {
    font-size: 20px;
}
</style>