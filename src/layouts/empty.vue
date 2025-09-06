<template>
  <div class="empty-layout">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 空布局组件，用于不需要默认布局的页面（如登录页）
</script>

<style scoped lang="scss">
.empty-layout {
  height: 100%;
  width: 100%;
}
</style>
