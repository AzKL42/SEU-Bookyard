import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: "user",
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/User.vue')
      },
      {
        path: 'person',
        name: 'Person',
        component: () => import('@/views/Person.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Toggle.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Toggle.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router