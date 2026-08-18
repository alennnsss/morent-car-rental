<template>
    <div class="admin">
        <AdminSidebar class="sidebar" />
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
    @media screen and (max-width: 800px){
        .sidebar {
            display: none;
        }
    }
</style>