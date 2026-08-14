import { defineStore } from 'pinia';
import { reactive, watch } from 'vue';

export const useDataStore = defineStore('data', () => {
    const savedData = JSON.parse(
        localStorage.getItem('profile_data') || '{}'
    )
    const profileData = reactive({
        name: savedData.name || '',
        address: savedData.address || '',
        phoneNumber: savedData.phoneNumber || '',
        cardNumber: savedData.cardNumber || '',
        expDate: savedData.expDate || '',
        cardHolder: savedData.cardHolder || '',
        cvc: savedData.cvc || '',
        town: savedData.town || ''
    })
    watch(profileData, (newValue) => {
        localStorage.setItem('profile_data', newValue)
    })
    
    return {
        profileData
    }
})