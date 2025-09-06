// 通用工具函数

import type { RouteRecordRaw } from 'vue-router'

// 解析路径
export function getNormalPath(p: string) {
  if (p.length === 0 || !p || p == 'undefined') {
    return p
  }
  const res = p.replace('//', '/')
  if (res[res.length - 1] === '/') {
    return res.slice(0, res.length - 1)
  }
  return res
}

// 过滤异步路由
export function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]) {
  const res: RouteRecordRaw[] = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

// 判断是否有权限
function hasPermission(roles: string[], route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role))
  } else {
    return true
  }
}

// 防抖函数
export function debounce(func: Function, wait: number) {
  let timeout: number | null = null
  return function (...args: any[]) {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait) as any
  }
}

// 节流函数
export function throttle(func: Function, delay: number) {
  let timer: number | null = null
  let startTime = Date.now()
  return function (...args: any[]) {
    const curTime = Date.now()
    const remaining = delay - (curTime - startTime)
    if (timer) clearTimeout(timer)
    if (remaining <= 0) {
      func.apply(this, args)
      startTime = Date.now()
    } else {
      timer = setTimeout(() => {
        func.apply(this, args)
        startTime = Date.now()
      }, remaining) as any
    }
  }
}
