import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/details/:id',
        name: 'details',
        component: () => import('../views/Details.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import('../views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router