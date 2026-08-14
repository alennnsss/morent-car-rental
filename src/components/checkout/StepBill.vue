<script setup>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, minLength } from '@vuelidate/validators';
import { useDataStore } from '../../stores/useDataStore';

const dataStore = useDataStore()
const phoneRegex = /^\+?[0-9]{10,15}$/
const rules = {
    name: {
        required: helpers.withMessage('Name is required', required),
        minLength: helpers.withMessage('Name should be at least 3 symbols', minLength(3))
    },
    city: {
        required: helpers.withMessage('Town/City is required', required),
        minLength: helpers.withMessage('Town/City should be at least 2 symbols', minLength(2))
    },
    phoneNumber: {
        required: helpers.withMessage('Phone number is required', required),
        phone: helpers.withMessage(
            'Invalid phone number',
            helpers.regex(phoneRegex)
        )
    },
    address: {
        required: helpers.withMessage('Address is required', required),
        minLength: helpers.withMessage('Address should be at least 5 symbols', minLength(5))
    }
}
const v$ = useVuelidate(rules, dataStore.profileData)
</script>

<template>
    <div class="box">
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
                <label for="name" :class="{ 'has-error': v$.name.$error }">
                    {{ $t('name') }}
                    <input @blur="v$.name.$touch()" v-model="dataStore.profileData.name" id="name" type="text" :placeholder="$t('your_name')">
                    <span class="error-msg" v-if="v$.name.$error">
                        {{ v$.name.$errors[0].$message }}
                    </span>
                </label>
                <label for="phone" :class="{ 'has-error': v$.phoneNumber.$error }">
                    {{ $t('phoneNumber') }}
                    <input @blur="v$.phoneNumber.$touch()" v-model="dataStore.profileData.phoneNumber" type="tel" id="phone" :placeholder="$t('phoneNumber')">
                    <span class="error-msg" v-if="v$.phoneNumber.$error">
                        {{ v$.phoneNumber.$errors[0].$message }}
                    </span>
                </label>
            </div>
            <div class="input-item">
                <label for="address" :class="{ 'has-error': v$.address.$error }">
                    {{ $t('address') }}
                    <input @blur="v$.address.$touch()" v-model="dataStore.profileData.address" id="address" type="text" :placeholder="$t('address')">
                    <span class="error-msg" v-if="v$.address.$error">
                        {{ v$.address.$errors[0].$message }}
                    </span>
                </label>
                <label for="location" :class="{ 'has-error': v$.city.$error }">
                    {{ $t('town_city') }}
                    <input @blur="v$.city.$touch()" v-model="dataStore.profileData.town" type="text" id="location" :placeholder="$t('town_city')">
                    <span class="error-msg" v-if="v$.city.$error">
                        {{ v$.city.$errors[0].$message }}
                    </span>
                </label>
            </div>
        </div>
    </div>    
</template>

<style scoped>
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