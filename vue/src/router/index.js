import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    // redirect: '/', 重定向功能，需要再研究研究
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/User.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue')
      },
      {
        path: 'catalog',
        name: 'Catalog',
        component: () => import('@/views/Catalog.vue')
      },
      {
        path: 'records',
        name: 'Records',
        component: () => import('@/views/Records.vue')
      },
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
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('@/views/Forget.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),  // import.meta.env.BASE_URL
  routes
})

export default router