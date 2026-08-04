<template>
    <div class="container">
        <div class="option-box">
            <div class="checkbox">
                <input type="radio" id="pick">
                <label for="pick">
                    <h2>Pick - Up</h2>
                </label>
            </div>
            <div class="select-container">
                <div class="selection-box">
                    <label for="pickup-locations">
                        <h2>Locations</h2>
                    </label>
                    <select name="pickup-locations" id="pickup-locations">
                        <option value="default">Select your city</option>
                        <option value="almaty">Almaty</option>
                        <option value="london">London</option>
                        <option value="moskow">Moskow</option>
                        <option value="newyork">New York</option>
                    </select>
                </div>  
                <div class="selection-box">
                    <label for="pickup-date">
                        <h2>Date</h2>
                    </label>
                    <input type="date" name="pickup-date" id="pickup-date">
                </div>
                <div class="selection-box">
                    <label for="pickup-time">
                        <h2>Time</h2>
                    </label>
                    <input type="time" name="pickup-time" id="pickup-time">
                </div> 
            </div>     
        </div>
        
        <div class="option-box">
            <div class="checkbox">
                <input type="radio" id="drop">
                <label for="drop">
                    <h2>Drop - Off</h2>
                </label>
            </div>    
            <div class="select-container">
                <div class="selection-box">
                    <label for="dropoff-locations">
                        <h2>Locations</h2>
                    </label>
                    <select name="dropoff-locations" id="dropoff-locations">
                        <option value="default" class="text-gray">Select your city</option>
                        <option value="almaty">Almaty</option>
                        <option value="london">London</option>
                        <option value="moskow">Moskow</option>
                        <option value="newyork">New York</option>
                    </select>
                </div>  
                <div class="selection-box">
                    <label for="dropoff-date">
                        <h2>Date</h2>
                    </label>
                    <input type="date" name="dropoff-date" id="dropoff-date">
                </div>
                <div class="selection-box">
                    <label for="dropoff-time">
                        <h2>Time</h2>
                    </label>
                    <input type="time" name="dropoff-time" id="dropoff-time">
                </div> 
            </div>     
        </div>    
    </div>    
</template>

<script setup>

</script>

<style scoped>
    .container {
        display: grid;
        width: 100%;
        padding: 32px 26px;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 44px;
        position: relative;
    }
    .option-box {
        background-color: var(--white-color);
        border-radius: 10px;
        width: 100%;
        padding: 26px 48px 24px 48px;
    }
    .checkbox {
        display: flex;
        gap: 8px;
        margin-bottom: 12px;
    }
    .select-container {
        display: flex;
        width: 100%;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 16px;
    }
    .selection-box {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    h2 {
        font-weight: 600;
        margin: 0;
    }
    select {
        border: none;
        width: 100%;
        padding: 0;
    }
    .text-gray {
        color: var(--span-color);
    }
</style>