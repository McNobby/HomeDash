import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthStore from './data-management/stores/auth'

import Home from './pages/Home.vue'
import Login from './pages/Login.vue'
import Dashboard from "./pages/Dashboard.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: Home,
            name: 'home'
        },
        { 
            path: '/login', 
            component: Login,
            name: 'login'
        },
        {
            path: '/dash/:id',
            component: Dashboard,
            name: Dashboard.name
        }
    ]
})

router.beforeEach((to) => {
    if(!AuthStore.isLoggedIn() && to.name !== 'login') {
        return {name: 'login'}
    }
    else if(AuthStore.isLoggedIn() && to.name === 'login') {
        return {name: 'home'}
    }
})

createApp(App)
.use(router)
.mount('#app')
