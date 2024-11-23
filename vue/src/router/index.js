import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Toggle.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router