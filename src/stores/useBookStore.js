import { defineStore } from "pinia";
import { watch } from "vue";
import { reactive } from "vue";
export const useBookStore = defineStore('book',() => {
    const savedData = JSON.parse(
        localStorage.getItem('user_data') || '{}'
    );

    const formData = reactive({
        cityPick: savedData.cityPick || '',
        cityDrop: savedData.cityDrop || '',
        datePick: savedData.datePick || '',
        dateDrop: savedData.dateDrop || '',
        timePick: savedData.timePick || '',
        timeDrop: savedData.timeDrop || '',
    });
    
    watch(formData, (newValue) => {
        localStorage.setItem('user_data', JSON.stringify(newValue))
    })
    return {
        formData
    }
})