import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/default.vue'
import EmptyLayout from '@/layouts/empty.vue'

// 导入模块路由
import systemRoutes from './modules/system'
import userRoutes from './modules/user'

// 静态路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: EmptyLayout,
    meta: { hidden: true },
    children: [
      {
        path: '',
        component: () => import('@/views/login/index.vue'),
        name: 'Login',
        meta: {
          title: '登录',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { hidden: true },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        name: 'Dashboard',
        meta: {
          title: '首页',
          icon: 'Home',
          affix: true
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error/404.vue'),
    meta: { hidden: true }
  },
  {
    path: '/403',
    component: () => import('@/views/error/403.vue'),
    meta: { hidden: true }
  }
]

// 动态路由
export const asyncRoutes: RouteRecordRaw[] = [
  ...systemRoutes,
  ...userRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/404.vue'),
    meta: { hidden: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

export default router