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
        cardNumber: '',
        expDate: '',
        cardHolder: '',
        cvc: '',
        city: savedData.city || '',
        terms_right: false,
        send_emails: true,
    })
    watch(profileData, (newValue) => {
        // payment card data must never be stored in localStorage
        const { cardNumber, expDate, cardHolder, cvc, ...safeData } = newValue
        localStorage.setItem('profile_data', JSON.stringify(safeData))
    }, {deep: true})
    
    return {
        profileData
    }
})