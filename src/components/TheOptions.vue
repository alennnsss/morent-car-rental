<template>
    <div class="container">
        <div class="option-box">
            <input type="checkbox" name="pick">
            <label for="name">Pick Up</label>
        </div>
        <div>
            <img class="arrow" src="../assets/images/option-arrow.png" alt="arrow">
        </div>
        <div class='option-box'>
            <input type="checkbox" name="drop">
            <label for="drop">Drop off</label>
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
        gap: 148px;
    }
    .option-box {
        background-color: var(--white-color);
        border-radius: 10px;
        width: 100%;
        height: 136px;
    }
    .arrow {
        width: 100px;
        height: 100px;
    }
</style>