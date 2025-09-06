<template>
  <div class="error-page">
    <div class="error-content">
      <el-icon :size="120" color="#e6a23c"><Warning /></el-icon>
      <h1>403</h1>
      <h2>权限不足</h2>
      <p>抱歉，您没有权限访问该页面。</p>
      <el-button type="primary" @click="back">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Warning } from '@element-plus/icons-vue'

const router = useRouter()

const back = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f5f7f9;

  .error-content {
    text-align: center;

    h1 {
      font-size: 72px;
      color: #e6a23c;
      margin: 20px 0;
    }

    h2 {
      font-size: 36px;
      color: #303133;
      margin: 20px 0;
    }

    p {
      font-size: 18px;
      color: #606266;
      margin: 20px 0 40px;
    }
  }
}
</style>
