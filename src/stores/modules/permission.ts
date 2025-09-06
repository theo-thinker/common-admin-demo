import { defineStore } from 'pinia'
import { ref } from 'vue'
import { asyncRoutes, constantRoutes } from '@/router'
import { filterAsyncRoutes } from '@/utils/common'

export const usePermissionStore = defineStore('permission', () => {
  // 权限路由
  const routes = ref<any[]>([])

  // 动态路由
  const addRoutes = ref<any[]>([])

  // 生成可访问的路由
  const generateRoutes = (roles: string[]) => {
    return new Promise((resolve) => {
      let accessedRoutes
      if (roles.includes('admin')) {
        // admin权限拥有所有路由
        accessedRoutes = asyncRoutes || []
      } else {
        // 根据角色过滤路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }

      routes.value = constantRoutes.concat(accessedRoutes)
      addRoutes.value = accessedRoutes
      resolve(accessedRoutes)
    })
  }

  return {
    routes,
    addRoutes,
    generateRoutes,
  }
})
