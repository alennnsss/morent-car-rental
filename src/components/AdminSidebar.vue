<template>
    <div class="admin-sidebar">
        <div class="sidebar-item">
            <span>
                {{ $t('main_menu') }}
            </span>
            <nav class="nav">
                <ul class="ul">
                    <li class="dashboard">
                        {{ $t('dashboard') }}
                    </li>
                    <router-link to="/">
                        <li class="car-rent icon" >
                            {{ $t('car_rent') }}
                        </li>
                    </router-link>    
                    <li class="insight icon">
                        {{ $t('insight') }}
                    </li>
                    <li class="reimburse icon">
                        {{ $t('reimburse') }}
                    </li>
                    <li class="inbox icon">
                        {{ $t('inbox') }}
                    </li>
                    <li class="calendar icon">
                        {{ $t('calendar') }}
                    </li>
                </ul>
                
            </nav>
        </div>
        <div class="sidebar-item">
            <span>
                {{ $t('preferences') }}
            </span>
            <nav class="nav">
                <ul class="ul">
                    <li class="settings icon">
                        {{ $t('settings') }}
                    </li>
                    <router-link to="/">
                        <li class="help icon" >
                            {{ $t('help_center') }}
                        </li>
                    </router-link>    
                    <li class="dark icon">
                        {{ $t('dark_mode') }}
                    </li>
                    
                </ul>
                
            </nav>
        </div>
        <div class="sidebar-item">
            <nav class="nav">
                <ul class="ul">
                    <button @click="logout">
                        <li class="logout icon">
                            {{ $t('log_out') }}
                        </li>
                    </button>    
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/useAuthStore';
import { useToastStore } from '../stores/useToastStore';

const router = useRouter()
const toastStore = useToastStore()
const authStore = useAuthStore()
const logout = () => {
    try {
        authStore.logout();
        toastStore.addToast('Succesful logout', 'success');
        router.push('/')
    } catch(error) {
        console.error('Error', error.message);
        toastStore.addToast('Error', 'error')
    }
}
</script>

<style scoped>
    .admin-sidebar {
        display: flex;
        flex-direction: column;
        width: 20%;
        padding: 16px;
        gap: 44px;
    }
    .sidebar-item {
        display: flex;
        flex-direction: column;
        gap: 28px;
    }
    span {
        font-weight: 600;
        font-size: 12px;
        color: #94A7CB66;
    }
    .nav {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .ul {
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding: 0;
        margin: 0;
    }
    li {
        list-style: none;
        font-size: 16px;
        display: flex;
        align-items: center;
        color: var(--span-color)
    }
    a {
        text-decoration: none;
    }
    .dashboard {
        background-color: #3563E9;
        color: white;
        height: 56px;
        border-radius: 10px;
        width: 100%;
    }

    .dashboard::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/dashboard.png') center / contain no-repeat;
        margin-right: 12px;
        margin-left: 18px;
    }
    .icon {
        padding: 18px;
        width: 100%;
        height: 56px;
    }
    .car-rent::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/carrent.png') center / contain no-repeat;
        margin-right: 12px;
    }
    .insight::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/insight.png') center / contain no-repeat;
        margin-right: 12px;
    }
    .reimburse::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/reimburse.png') center / contain no-repeat;
        margin-right: 12px;
    }
    .inbox::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/inbox.png') center / contain no-repeat;
        margin-right: 12px;
    }
    .calendar::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/calendar.png') center / contain no-repeat;
        margin-right: 12px;
    }
    .settings::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/settings.png') center / contain no-repeat;
        margin-right: 12px;
    }
    .help::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/help.png') center / contain no-repeat;
        margin-right: 12px; 
    }
    .dark::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/dark.png') center / contain no-repeat;
        margin-right: 12px;
    }
    .logout::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../assets/images/logout.png') center / contain no-repeat;
        margin-right: 12px;
    }
</style>