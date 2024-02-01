import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: async () => await import('../views/Home.vue')
  },
  {
    path: '/details/:id',
    name: 'details',
    component: async () => await import('../views/Details.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: async () => await import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
