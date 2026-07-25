<template>
    <div class="blocks-container">
        <div class="blocks-container-box1">
            <div class="blocks-container-box1__info">
                <h1>
                    The Best Platform 
                    for Car Rental
                </h1>
                <p>
                    Ease of doing a car rental safely and 
                    reliably. Of course at a low price.
                </p>
            </div>    
            <button>
                Rental Car
            </button>
            <img class="blocks-container-box1__image" src="../assets/images/korvette.png" alt="korvette">
        </div>
        <div class="blocks-container-box2">

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
    }
    .blocks-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 32px;
        padding: 32px 64px;
        
    }
    .blocks-container-box1 {
        background-color: #54A6FF;
        display: flex;
        flex-direction: column;
        height: 360px;
        border-radius: 10px;
        padding: 24px;
    }
    .blocks-container-box1__image {
        width: 50%;
        height: 116px;
    }
</style>