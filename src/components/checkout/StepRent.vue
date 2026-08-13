<template>
    <div class="box">
        <div class="user-info">
            <div>
                <h1>Rental info</h1>
            </div>
            <div class="enter-info">
                <p>Please enter your rental date</p>
                <p>Step 2 of 4</p>
            </div>
        </div>  
        <div>
            <TheOptions />
        </div>
    </div>
</template>

<script setup>
import TheOptions from '../TheOptions.vue';
</script>

<style scoped>
    .box {
        background-color: var(--white-color);

    }
    h1 {
        font-size: 20px;
    }
</style>