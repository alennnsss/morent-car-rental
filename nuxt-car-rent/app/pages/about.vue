<template>
    <CarCard />
    <h1>
        About Page
    </h1>
    <div v-for="i in cars" :key="i.id">
        {{ i }}
    </div>
</template>

<script setup>
    const {data: cars, pending } = await useFetch('https://dummyjson.com/products')
</script>

<style>

</style>