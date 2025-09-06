<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="sidebar-container">
      <sidebar />
    </div>

    <div class="main-container">
      <!-- 顶部导航 -->
      <div class="header-container">
        <navbar />
      </div>

      <!-- 标签页 -->
      <div class="tags-view-container">
        <tags-view />
      </div>

      <!-- 主内容区域 -->
      <div class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/stores/modules/app'
import { usePermissionStore } from '@/stores/modules/permission'
import Sidebar from '@/components/common/sidebar.vue'
import Navbar from '@/components/common/navbar.vue'
import TagsView from '@/components/common/tags-view.vue'

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()

const cachedViews = computed(() => appStore.cachedViews)
</script>

<style scoped lang="scss">
@import '@/styles/themes/default.scss';

.app-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sidebar-width !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  background-color: $sidebar-background-color;
}

.main-container {
  min-height: 100%;
  margin-left: $sidebar-width;
  position: relative;
  transition: margin-left 0.28s;
}

.header-container {
  height: $header-height;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: relative;
  z-index: 9;
  background-color: $header-background-color;
}

.tags-view-container {
  height: $tags-view-height;
  border-bottom: 1px solid $tags-view-border-color;
  background-color: $tags-view-background-color;
}

.app-main {
  min-height: calc(100vh - #{$header-height} - #{$tags-view-height});
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
  background-color: $content-background-color;
}
</style>
