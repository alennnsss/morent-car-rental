<template>
    <div class="blocks-container">
        <div class="blocks-container-box box1">
            <div class="blocks-container__info">
                <h1>
                    The Best Platform 
                    for Car Rental
                </h1>
                <p>
                    Ease of doing a car rental safely and 
                    reliably. Of course at a low price.
                </p>
            </div>    
            <div class="blocks-container__image-box">
                <button class="button1">
                    Rental Car
                </button>
                <img class="car-image" src="../assets/images/korvette.png" alt="korvette">
            </div>    
        </div>
        <div class="blocks-container-box box2">
            <div class="blocks-container__info">
                <h1>
                    Easy way to rent a car at a low price
                </h1>
                <p>
                    Providing cheap car rental services and safe and comfortable facilities.
                </p>
            </div>    
            <div class="blocks-container__image-box">
                <button class="rental-car__button">
                    Rental Car
                </button>
                <img class="car-image" src="../assets/images/nissan.png" alt="nissan">
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
    h1 {
        font-weight: 600;
        color: #FFFFFF;
        font-size: 32px;
    }
    p {
        color: #FFFFFF;
        font-weight: 500;

    }
    .blocks-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 2fr));
        gap: 32px;
        padding: 24px;
    }
    .blocks-container-box {
        display: flex;
        flex-direction: column;
        height: 360px;
        border-radius: 10px;
        gap: 30px;
        padding: 24px;
        position: relative;
        overflow: hidden;
    }
    .box1 {
        background-color: #54A6FF;
    }  
    .box2 {
        background-color: #3563E9;
        padding: 24px 24px 24px 24px;
    } 
    .blocks-container__info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        max-width: 55%; 
        z-index: 2;
    }
    .blocks-container-box1__image-box {
        display: flex;
    }
    .blocks-container-box__image {
        width: 50%;
        height: 100%;
    }
    .blocks-container__image-box {
        display: flex;
        width: 100%;
    }
    .button1 {
        max-width: 120px;
        width: 100%;
        height: 44px;
        border-radius: 4px;
        background-color: #3563E9;
        color: white;
        border: none;
        padding: 10px 20px;
    }
    .button1:hover {
        background-color: #1a2c94;
    }
    .blocks-container-box2 {
        background-color: #3563E9;
        display: flex;
        flex-direction: column;
        height: 360px;
        border-radius: 10px;
        padding: 24px 24px 10px 24px;
    }
    .rental-car__button {
        background-color: #54A6FF;
        max-width: 120px;
        width: 100%;
        height: 44px;
        border-radius: 4px;
        color: white;
        border: none;
        padding: 10px 20px;
    }
    .blocks-container-box2__image {
        width: 50%;
        height: 100%;
        margin-left: 137px;
    }
    .car-image {
        position: absolute;
        right: 24px;
        bottom: 10px;
        width: 50%;
        max-height: 140px;
        object-fit: contain;
        z-index: 1;
    }
    .rental-car__button:hover {
        background-color: #0A196F;
    }
</style>