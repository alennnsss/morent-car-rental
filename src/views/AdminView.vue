<template>
    <div class="admin">
        <AdminSidebar />
        <AdminMain />
    </div>    
</template>

<script setup>
import AdminSidebar from '../components/AdminSidebar.vue';
import AdminMain from '../components/AdminMain.vue';
</script>

<style scoped>
    .admin {
        display: flex;

    }
</style>