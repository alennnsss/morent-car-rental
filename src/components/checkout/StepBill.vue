<script setup>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, minLength } from '@vuelidate/validators';
import { reactive } from 'vue';
const userData = reactive({
    name: '',
    phoneNumber: '',
    address: '',
    city: ''
})
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
const v$ = useVuelidate(rules, userData)
</script>

<template>
    <div class="box">
        <div class="biling-info">
            <div>
                <h1>Billing Info</h1>
            </div>
            <div class="enter-info">
                <p>Please enter your billing info</p>
                <p>Step 1 of 4</p>
            </div>
        </div>    
        <div class="input-container">
            <div class="input-item">
                <label for="name" :class="{ 'has-error': v$.name.$error }">
                    Name
                    <input @blur="v$.name.$touch()" v-model="userData.name" id="name" type="text" placeholder="Your Name">
                    <span class="error-msg" v-if="v$.name.$error">
                        {{ v$.name.$errors[0].$message }}
                    </span>
                </label>
                <label for="phone" :class="{ 'has-error': v$.phoneNumber.$error }">
                    Phone Number
                    <input @blur="v$.phoneNumber.$touch()" v-model="userData.phoneNumber" type="tel" id="phone" placeholder="Phone number">
                    <span class="error-msg" v-if="v$.phoneNumber.$error">
                        {{ v$.phoneNumber.$errors[0].$message }}
                    </span>
                </label>
            </div>
            <div class="input-item">
                <label for="address" :class="{ 'has-error': v$.address.$error }">
                    Address
                    <input @blur="v$.address.$touch()" v-model="userData.address" id="address" type="text" placeholder="Address">
                    <span class="error-msg" v-if="v$.address.$error">
                        {{ v$.address.$errors[0].$message }}
                    </span>
                </label>
                <label for="location" :class="{ 'has-error': v$.city.$error }">
                    Town/ City
                    <input @blur="v$.city.$touch()" v-model="userData.city" type="text" id="location" placeholder="Town or city">
                    <span class="error-msg" v-if="v$.city.$error">
                        {{ v$.city.$errors[0].$message }}
                    </span>
                </label>
            </div>
        </div>
    </div>    
</template>

<style scoped>
    .box {
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding: 24px;
        background-color: var(--white-color);
        border-radius: 10px;
    }
    .biling-info {
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
    .input-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    .input-item {
        display: flex;
        gap: 32px;
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
    .error-msg {
        color: red;
        font-size: 12px;
    }
</style>