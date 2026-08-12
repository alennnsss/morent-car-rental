import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CatalogView from "../views/CatalogView.vue";
import DetailView from '../views/DetailView.vue';
import CheckoutView from "../views/CheckoutView.vue";

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
    }
]

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})  
export default router