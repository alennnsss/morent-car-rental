<template>
    <div class="confirmation-block">
        <div class="confirmation">
            <div class="confirmation-intro">
                <div class="confirmation-title">
                    <h1>{{ $t('confirmation') }}</h1>
                </div>
                <div class="getting-closer">
                    <p>{{ $t('getting_closer') }}</p>
                </div>
            </div>    
            <div class="confirmation-check">
                <div class="checkbox">
                    <Checkbox v-model="dataStore.profileData.send_emails" binary inputId="send-emails" />
                    <label for="send-emails">{{ $t('sending') }}</label>
                    <span class="error-msg" v-if="v$.send_emails.$error">
                        {{ v$.send_emails.$errors[0].$message }}
                    </span>
                </div>
                <div class="checkbox">
                    <Checkbox v-model="dataStore.profileData.terms_right" binary inputId="terms-rights" />
                    <label for="terms-rights">{{ $t('terms_rights') }}</label>
                    <span class="error-msg" v-if="v$.terms_right.$error">
                        {{ v$.terms_right.$errors[0].$message }}
                    </span>
                </div>
                <div class="confirmation-closing">
                    <router-link>
                        <button @click="submit">{{ $t('rent_now') }}</button>
                    </router-link>
                    <div class="safety">
                        <img width="32px" height="32px" src="../../assets/images/safety.png" alt="safety icon">
                        <div class="all_data">
                            <h2>{{ $t('all_data') }}</h2>
                            <p>{{ $t('advanced_sec') }}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>    
        <RentalSummary />
    </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core';
import { helpers, required, sameAs  } from '@vuelidate/validators';
import { useDataStore } from '../../stores/useDataStore';
import Checkbox from 'primevue/checkbox';
import RentalSummary from '../RentalSummary.vue';
const dataStore = useDataStore()
const rules = {
    send_emails:{
        sameAs: helpers.withMessage('You need to agree with our policies', sameAs(true))
    },
    terms_right: {
        sameAs: helpers.withMessage('You need to agree with our policies', sameAs(true))
    }
}

const v$ = useVuelidate(rules, dataStore.profileData)
const submit = async () => {
    const isValid = await v$.value.$validate()

    if (!isValid) {
        return
    }

}
</script>

<style scoped>
    .confirmation-block {
        display: flex;
        gap: 32px;
    }
    .confirmation {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .confirmation-intro {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    h1 {
        font-size: 20px;
        font-weight: 700;
    }
    p {
        color: #90A3BF;
        font-size: 14px;
    }
    .getting-closer {
        display: flex;
        justify-content: space-between;
    }
    .confirmation-check {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    .checkbox {
        border-radius: 10px;
        width: 100%;
        padding: 16px 32px;
        display: flex;
        gap: 20px;
        background-color: var(--main-color);
    }
    label {
        font-size: 16px;
        font-weight: 600;
    }
    .confirmation-closing {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    button {
        background-color: #3563E9;
        border-radius: 10px;
        max-width: 140px;
        height: 56px;
        color: white;
        border: none;
    }
    .safety {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .all_data {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    .error-msg {
        color: red;
        font-size: 16px;
    }
</style>