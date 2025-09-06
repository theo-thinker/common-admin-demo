<template>
  <div class="sidebar">
    <div class="sidebar-logo">
      <img src="@/assets/images/logo.png" alt="logo" />
      <span class="sidebar-title">通用后台管理系统</span>
    </div>

    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="sidebarBackgroundColor"
        :text-color="sidebarTextColor"
        :active-text-color="sidebarActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import { usePermissionStore } from '@/stores/modules/permission'
import SidebarItem from './sidebar-item.vue'

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

// 定义主题变量
const sidebarBackgroundColor = '#001529'
const sidebarTextColor = '#FFFFFF'
const sidebarActiveTextColor = '#409EFF'

const activeMenu = computed(() => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})

const isCollapse = computed(() => {
  return !appStore.sidebar.opened
})
</script>

<style scoped lang="scss">
@import '@/styles/themes/default.scss';
@import '@/styles/variables.scss';

.sidebar {
  height: 100%;
  overflow: hidden;

  .sidebar-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $header-height;
    line-height: $header-height;
    background-color: darken($sidebar-background-color, 5%);

    img {
      width: 32px;
      height: 32px;
      margin-right: 12px;
    }

    .sidebar-title {
      color: $sidebar-text-color;
      font-size: $font-size-base;
      font-weight: $font-weight-bold;
      white-space: nowrap;
    }
  }

  .el-scrollbar {
    height: calc(100% - #{$header-height});

    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;
    }
  }
}
</style>
