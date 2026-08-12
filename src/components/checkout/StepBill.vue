<script setup>

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
                <label for="name">
                    Name
                    <input id="name" type="text" placeholder="Your Name">
                </label>
                <label for="phone">
                    <input type="tel" id="phone" placeholder="Phone number">
                </label>
            </div>
            <div class="input-item">
                <label for="address">
                    Address
                    <input id="address" type="text" placeholder="Address">
                </label>
                <label for="location">
                    <input type="text" id="location" placeholder="Town or city">
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
        gap: 24px;
    }
    .input-item {
        display: flex;
        justify-content: space-around;
    }
    input {
        max-width: 386px;
        width: 100%;
        margin-top: 16px;
        padding: 16px 32px;
    }
</style>