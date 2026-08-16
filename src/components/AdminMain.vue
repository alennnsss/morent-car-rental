<template>
    <main>
        <div class="rental-detail">
            <div class="">

            </div>
            <div>

            </div>
            <div>
                
            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
        <div>

        </div>
    </main>
</template>

<script setup>

</script>

<style scoped>
    main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        width: 80%;
        gap: 32px;
        background-color: var(--main-color);
        padding: 32px;
    }
    .rental-detail {
        display: flex;
        flex-direction: column;
        gap: 32px;
        background-color: white;
        border-radius: 10px;
        padding: 24px;
    }
</style>