import type { RouteRecordRaw } from 'vue-router'

// 用户模块路由
const userRoutes: RouteRecordRaw[] = [
  {
    path: '/user',
    component: () => import('@/layouts/default.vue'),
    redirect: '/user/profile',
    name: 'UserCenter',
    meta: {
      title: '个人中心',
      icon: 'User'
    },
    children: [
      {
        path: 'profile',
        component: () => import('@/views/user/profile.vue'),
        name: 'Profile',
        meta: {
          title: '个人资料',
          icon: 'User'
        }
      },
      {
        path: 'settings',
        component: () => import('@/views/user/settings.vue'),
        name: 'Settings',
        meta: {
          title: '个人设置',
          icon: 'Tools'
        }
      }
    ]
  }
]

export default userRoutes