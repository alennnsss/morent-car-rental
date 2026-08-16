import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CatalogView from "../views/CatalogView.vue";
import DetailView from '../views/DetailView.vue';
import CheckoutView from "../views/CheckoutView.vue";
import AdminView from "../views/AdminView.vue";
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
        path: '/checkout',
        name:'checkout',
        component: CheckoutView
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminView,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})  
export default router