/**
 * @author ApplePie
 * @date 2024-11-30 16:39:58
 * @version 0.0.1
 * @description 路由配置
 */

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'

const routes = [
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
  {
    path: '/',
    name: 'Home',
    //redirect: '/', //重定向功能，需要再研究研究
    component: Layout,
    children: [
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
        path: 'catalogbycategory',
        name: 'CatalogByCategory',
        component: () => import('@/views/CatalogByCategory.vue')
      },
      {
        path: 'records',
        name: 'Records',
        component: () => import('@/views/Records.vue')
      },
      {
        path: "/services/renew",
        name: "Renew",
        component: () => import("@/views/Renew.vue"),
      },
      {
        path: "/services/reserve",
        name: "Reserve",
        component: () => import("@/views/Reservation.vue"),
      },
      {
        path: "/announcements",
        name: "Announcements",
        component: () => import("@/views/Announcement.vue"),
      },
      // {
      //   path: "/announcements/:id",
      //   name: "AnnouncementDetail",
      //   component: () => import("@/views/AnnouncementDetail.vue"),
      // },
      {
        path: '/change-user-info',
        name: 'Change-user-info',
        component: () => import('@/views/ChangeUserInfo.vue')
      },
      {
        path: '/change-pwd',
        name: 'Change-pwd',
        component: () => import('@/views/ChangePassword.vue')
      },
      {
        path: '/bookentry',
        name: 'BookEntry',
        component: () => import('@/views/BookEntry.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),  // import.meta.env.BASE_URL
  routes
})

// 添加全局前置守卫
// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/forget'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = isAuthenticated(); // 可以检查登录状态

//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else if (to.path === '/login' && loggedIn) {
//     next('/');
//   } else {
//     next();
//   }
// });

// 定义一个简单的认证检查函数
// function isAuthenticated() {
//   return !!sessionStorage.getItem('userInfo') || !!localStorage.getItem('userInfo');
// }

export default router