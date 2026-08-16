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
            <div class="visa">
                <div class="visa-container">
                    <input type="radio" v-model="selectedPayment" value="card" id="radio">
                    <label for="radio">
                        {{ $t('credit_card') }}
                    </label>
                </div>
                <div class="visa-images">
                    <img :src="visa" class="visa__image" alt="visa image">
                    <img src="../../assets/images/circles.png" class="visa__circle" alt="circle visa">
                </div>
            </div>
            <div class="main-box" v-if="selectedPayment === 'card'">
                <div class="input-container">
                    <div class="input-item">
                        <label for="name" :class="{ 'has-error': v$.cardNumber.$error }">
                            {{ $t('cardNumber') }}
                            <input class="input" @blur="v$.cardNumber.$touch()" v-model="dataStore.profileData.cardNumber" id="name" type="text" :placeholder="$t('cardNumber')">
                            <span class="error-msg" v-if="v$.cardNumber.$error">
                                {{ v$.cardNumber.$errors[0].$message }}
                            </span>
                        </label>
                        <label for="phone" :class="{ 'has-error': v$.expDate.$error }">
                            {{ $t('expDate') }}
                            <input class="input" @blur="v$.expDate.$touch()" v-model="dataStore.profileData.expDate" type="tel" id="phone" :placeholder="$t('expDate')">
                            <span class="error-msg" v-if="v$.expDate.$error">
                                {{ v$.expDate.$errors[0].$message }}
                            </span>
                        </label>
                    </div>    
                </div>
                <div class="input-container">
                    <div class="input-item">
                        <label for="address" :class="{ 'has-error': v$.cardHolder.$error }">
                            {{ $t('cardHolder') }}
                            <input class="input" @blur="v$.cardHolder.$touch()" v-model="dataStore.profileData.cardHolder" id="address" type="text" :placeholder="$t('cardHolder')">
                            <span class="error-msg" v-if="v$.cardHolder.$error">
                                {{ v$.cardHolder.$errors[0].$message }}
                            </span>
                        </label>
                        <label for="location" :class="{ 'has-error': v$.cvc.$error }">
                            {{ $t('cvc') }}
                            <input class="input" @blur="v$.cvc.$touch()" v-model="dataStore.profileData.cvc" type="text" id="location" :placeholder="$t('cvc')">
                            <span class="error-msg" v-if="v$.cvc.$error">
                                {{ v$.cvc.$errors[0].$message }}
                            </span>
                        </label>
                    </div>
                </div>    
            </div>
        </div>    
    </div>        
    <div class="box">   
        <div class="radio-box">
            <div class="visa">
                <div class="visa-container">
                    <input type="radio" v-model="selectedPayment" value="paypal" id="paypal">
                    <label for="paypal">
                        PayPal
                    </label>
                </div>
                <div class="visa-images">
                    <img src="../../assets/images/paypal.png" alt="paypal logo" width="100px" height="24px">
                </div>
            </div>
            <div class="main-box" v-if="selectedPayment === 'paypal'">
                <div class="input-container">
                    <div class="input-item">
                        <label for="name" :class="{ 'has-error': v$.cardNumber.$error }">
                            {{ $t('cardNumber') }}
                            <input class="input" @blur="v$.cardNumber.$touch()" v-model="dataStore.profileData.cardNumber" id="name" type="text" :placeholder="$t('cardNumber')">
                            <span class="error-msg" v-if="v$.cardNumber.$error">
                                {{ v$.cardNumber.$errors[0].$message }}
                            </span>
                        </label>
                        <label for="phone" :class="{ 'has-error': v$.expDate.$error }">
                            {{ $t('expDate') }}
                            <input class="input" @blur="v$.expDate.$touch()" v-model="dataStore.profileData.expDate" type="tel" id="phone" :placeholder="$t('expDate')">
                            <span class="error-msg" v-if="v$.expDate.$error">
                                {{ v$.expDate.$errors[0].$message }}
                            </span>
                        </label>
                    </div>    
                </div>
                <div class="input-container">
                    <div class="input-item">
                        <label for="address" :class="{ 'has-error': v$.cardHolder.$error }">
                            {{ $t('cardHolder') }}
                            <input class="input" @blur="v$.cardHolder.$touch()" v-model="dataStore.profileData.cardHolder" id="address" type="text" :placeholder="$t('cardHolder')">
                            <span class="error-msg" v-if="v$.cardHolder.$error">
                                {{ v$.cardHolder.$errors[0].$message }}
                            </span>
                        </label>
                        <label for="location" :class="{ 'has-error': v$.cvc.$error }">
                            {{ $t('cvc') }}
                            <input class="input" @blur="v$.cvc.$touch()" v-model="dataStore.profileData.cvc" type="text" id="location" :placeholder="$t('cvc')">
                            <span class="error-msg" v-if="v$.cvc.$error">
                                {{ v$.cvc.$errors[0].$message }}
                            </span>
                        </label>
                    </div>
                </div>    
            </div>
        </div>    
    </div>  
    <div class="box">   
        <div class="radio-box">
            <div class="visa">
                <div class="visa-container">
                    <input type="radio" v-model="selectedPayment" value="bitcoin" id="bitcoin">
                    <label for="bitcoin">
                        Bitcoin
                    </label>
                </div>
                <div class="visa-images">
                    <img src="../../assets/images/bitcoinlogo.png" alt="bitcoin logo" width="100px" height="24px">
                </div>
            </div>
            <div class="main-box" v-if="selectedPayment === 'bitcoin'">
                <div class="input-container">
                    <div class="input-item">
                        <label for="name" :class="{ 'has-error': v$.cardNumber.$error }">
                            {{ $t('cardNumber') }}
                            <input class="input" @blur="v$.cardNumber.$touch()" v-model="dataStore.profileData.cardNumber" id="name" type="text" :placeholder="$t('cardNumber')">
                            <span class="error-msg" v-if="v$.cardNumber.$error">
                                {{ v$.cardNumber.$errors[0].$message }}
                            </span>
                        </label>
                        <label for="phone" :class="{ 'has-error': v$.expDate.$error }">
                            {{ $t('expDate') }}
                            <input class="input" @blur="v$.expDate.$touch()" v-model="dataStore.profileData.expDate" type="tel" id="phone" :placeholder="$t('expDate')">
                            <span class="error-msg" v-if="v$.expDate.$error">
                                {{ v$.expDate.$errors[0].$message }}
                            </span>
                        </label>
                    </div>    
                </div>
                <div class="input-container">
                    <div class="input-item">
                        <label for="address" :class="{ 'has-error': v$.cardHolder.$error }">
                            {{ $t('cardHolder') }}
                            <input class="input" @blur="v$.cardHolder.$touch()" v-model="dataStore.profileData.cardHolder" id="address" type="text" :placeholder="$t('cardHolder')">
                            <span class="error-msg" v-if="v$.cardHolder.$error">
                                {{ v$.cardHolder.$errors[0].$message }}
                            </span>
                        </label>
                        <label for="location" :class="{ 'has-error': v$.cvc.$error }">
                            {{ $t('cvc') }}
                            <input class="input" @blur="v$.cvc.$touch()" v-model="dataStore.profileData.cvc" type="text" id="location" :placeholder="$t('cvc')">
                            <span class="error-msg" v-if="v$.cvc.$error">
                                {{ v$.cvc.$errors[0].$message }}
                            </span>
                        </label>
                    </div>
                </div>    
            </div>
        </div>    
        <RentalSummary />
    </div> 
</template>

<script setup>
import visa from '../../assets/images/visa.png';
import { useVuelidate } from '@vuelidate/core';
import { helpers, maxLength, minLength, required, email } from '@vuelidate/validators';
import { useDataStore } from '../../stores/useDataStore';
import { ref } from 'vue';
import RentalSummary from '../RentalSummary.vue';
const selectedPayment = ref('')
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
        minLength: helpers.withMessage('Invalid expiration date', minLength(8))
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
    flex-direction: column;
}
.visa {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
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
.input {
    width: 386px;
    width: 100%;
    height: 56px;
    border-radius: 10px;
    margin-top: 16px;
    padding: 16px 32px;
    border: none;
    background-color: #FFFFFF;
}
label {
    max-width: 386px;
    width: 100%;
}
h1 {
    font-size: 20px;
}
.payment-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.enter-info {
    display: flex;
    justify-content: space-between;
}
.enter-info p {
    color: #90A3BF;
}
.box {
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: var(--white-color);
  padding: 24px;
  border-radius: 10px;
}
.input-container {
    display: flex;
    flex-direction: column;
}
.input-item {
    display: flex;
    gap: 32px;
}

.error-msg {
    color: red;
    font-size: 12px;
}
.main-box {
    display: flex;
    flex-direction: column;
    gap: 24px;
}
</style>