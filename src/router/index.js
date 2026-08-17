import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/useAuthStore.js";
import { useToastStore } from "../stores/useToastStore.js";
import HomeView from "../views/HomeView.vue";
import CatalogView from "../views/CatalogView.vue";
import DetailView from '../views/DetailView.vue';
import CheckoutView from "../views/CheckoutView.vue";
import AdminView from "../views/AdminView.vue";
import LoginView from "../views/LoginView.vue";
import { nextTick } from 'vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: CatalogView
    },
    {
        path: '/cars/:id',
        name: 'cars',
        component: DetailView
    },
    {
        path: '/checkout/:id',
        name:'checkout',
        component: CheckoutView,
        meta: {requiresAuth: true}
    },
    {
        path: '/admin/:id',
        name: 'admin',
        component: AdminView,
        meta: {requiresAuth: true}
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})  

router.beforeEach((to,from, next) => {
    const authStore = useAuthStore()
    const toastStore = useToastStore()
    if(to.meta.requiresAuth && !authStore.isAuthenticated) {
        toastStore.addToast('Login requires', 'error')
        next({ name: 'login' })
    } else if(to.path === '/login' && authStore.isAuthenticated) {
        next({ name: 'admin' })
    } else {
        next()
    }
})

export default router