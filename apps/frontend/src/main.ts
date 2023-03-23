import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AuthStore from './data-management/stores/auth'
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

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

const app = createApp(App)

if (import.meta.env.MODE === 'production') {
    Sentry.init({
        app,
        dsn: "https://2ba756bdd4154f8aaa253574363c526f@o4504889279578112.ingest.sentry.io/4504889281282048",
        integrations: [
            new BrowserTracing({
                routingInstrumentation: Sentry.vueRouterInstrumentation(router),
                tracePropagationTargets: ["localhost", "dash.teobb.no", /^\//],
            }),
        ],
        tracesSampleRate: import.meta.env.MODE === 'production' ? 0.2 : 1.0,
        environment: import.meta.env.MODE,
    });
}

app.use(router).mount('#app')