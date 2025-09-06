import type { RouteRecordRaw } from 'vue-router'

// 系统管理路由
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    component: () => import('@/layouts/default.vue'),
    redirect: '/system/user',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: 'Setting'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/system/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          icon: 'User'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/system/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          icon: 'UserFilled'
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        name: 'Menu',
        meta: {
          title: '菜单管理',
          icon: 'Menu'
        }
      }
    ]
  }
]

export default systemRoutes