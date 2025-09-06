import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const useAppStore = defineStore('app', () => {
  // 侧边栏状态
  const sidebar = reactive({
    opened: true,
    withoutAnimation: false,
  })

  // 设备类型
  const device = ref('desktop')

  // 已访问的视图
  const visitedViews = ref<RouteLocationNormalizedLoaded[]>([])

  // 缓存的视图
  const cachedViews = ref<string[]>([])

  // 切换侧边栏
  const toggleSidebar = () => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = false
  }

  // 关闭侧边栏
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }

  // 切换设备类型
  const toggleDevice = (deviceType: string) => {
    device.value = deviceType
  }

  // 添加已访问视图
  const addVisitedView = (view: RouteLocationNormalizedLoaded) => {
    if (visitedViews.value.some((v) => v.path === view.path)) return
    visitedViews.value.push(
      Object.assign({}, view, {
        title: view.meta?.title || 'no-name',
      }),
    )
  }

  // 添加视图
  const addView = (view: RouteLocationNormalizedLoaded) => {
    addVisitedView(view)
    if (!view.meta?.noCache) {
      cachedViews.value.push(view.name as string)
    }
  }

  // 删除已访问视图
  const delVisitedView = (view: RouteLocationNormalizedLoaded) => {
    return new Promise((resolve) => {
      for (const [i, v] of visitedViews.value.entries()) {
        if (v.path === view.path) {
          visitedViews.value.splice(i, 1)
          break
        }
      }
      resolve([...visitedViews.value])
    })
  }

  // 删除视图
  const delView = (view: RouteLocationNormalizedLoaded) => {
    return new Promise((resolve) => {
      delVisitedView(view)
      delCachedView(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value],
      })
    })
  }

  // 删除缓存视图
  const delCachedView = (view: RouteLocationNormalizedLoaded) => {
    return new Promise((resolve) => {
      const index = cachedViews.value.indexOf(view.name as string)
      index > -1 && cachedViews.value.splice(index, 1)
      resolve([...cachedViews.value])
    })
  }

  // 删除其他视图
  const delOthersViews = (view: RouteLocationNormalizedLoaded) => {
    return new Promise((resolve) => {
      visitedViews.value = visitedViews.value.filter((v) => {
        return v.meta?.affix || v.path === view.path
      })
      cachedViews.value = cachedViews.value.filter((name) => {
        return name === view.name
      })
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value],
      })
    })
  }

  // 删除所有视图
  const delAllViews = () => {
    return new Promise((resolve) => {
      visitedViews.value = visitedViews.value.filter((v) => v.meta?.affix)
      cachedViews.value = []
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value],
      })
    })
  }

  // 删除所有缓存视图
  const delAllCachedViews = () => {
    return new Promise((resolve) => {
      cachedViews.value = []
      resolve([...cachedViews.value])
    })
  }

  // 更新已访问视图
  const updateVisitedView = (view: RouteLocationNormalizedLoaded) => {
    for (let v of visitedViews.value) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }

  return {
    sidebar,
    device,
    visitedViews,
    cachedViews,
    toggleSidebar,
    closeSidebar,
    toggleDevice,
    addVisitedView,
    addView,
    delVisitedView,
    delView,
    delCachedView,
    delOthersViews,
    delAllViews,
    delAllCachedViews,
    updateVisitedView,
  }
})
