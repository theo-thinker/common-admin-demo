<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="statistic-card">
          <div class="statistic-item">
            <div class="statistic-icon" style="background-color: #409eff">
              <el-icon :size="24" color="#fff"><User /></el-icon>
            </div>
            <div class="statistic-info">
              <div class="statistic-title">用户数</div>
              <div class="statistic-value">128</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="statistic-card">
          <div class="statistic-item">
            <div class="statistic-icon" style="background-color: #67c23a">
              <el-icon :size="24" color="#fff"><Document /></el-icon>
            </div>
            <div class="statistic-info">
              <div class="statistic-title">文章数</div>
              <div class="statistic-value">562</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="statistic-card">
          <div class="statistic-item">
            <div class="statistic-icon" style="background-color: #e6a23c">
              <el-icon :size="24" color="#fff"><Comment /></el-icon>
            </div>
            <div class="statistic-info">
              <div class="statistic-title">评论数</div>
              <div class="statistic-value">328</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="statistic-card">
          <div class="statistic-item">
            <div class="statistic-icon" style="background-color: #f56c6c">
              <el-icon :size="24" color="#fff"><Warning /></el-icon>
            </div>
            <div class="statistic-info">
              <div class="statistic-title">待处理</div>
              <div class="statistic-value">12</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="16">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>数据统计</span>
            </div>
          </template>
          <div ref="chartRef" style="height: 400px"></div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最新动态</span>
            </div>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Comment, Document, User, Warning } from '@element-plus/icons-vue'
// import * as echarts from 'echarts'

const chartRef = ref()

const activities = ref([
  {
    content: '创建了新的用户管理页面',
    timestamp: '2023-06-01',
  },
  {
    content: '修复了登录页面的bug',
    timestamp: '2023-05-28',
  },
  {
    content: '优化了系统性能',
    timestamp: '2023-05-25',
  },
  {
    content: '发布了新版本v1.2.0',
    timestamp: '2023-05-20',
  },
])

onMounted(() => {
  // 初始化图表
  initChart()
})

const initChart = () => {
  // 这里应该是echarts的初始化代码
  // 由于我们没有安装echarts，暂时注释掉
  /*
  const chart = echarts.init(chartRef.value)
  chart.setOption({
    title: {
      text: '用户访问量统计'
    },
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  })
  */
}
</script>

<style scoped lang="scss">
.dashboard-container {
  padding: 20px;

  .statistic-card {
    :deep(.el-card__body) {
      padding: 20px;
    }
  }

  .statistic-item {
    display: flex;
    align-items: center;

    .statistic-icon {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
    }

    .statistic-info {
      .statistic-title {
        font-size: 14px;
        color: #909399;
        margin-bottom: 10px;
      }

      .statistic-value {
        font-size: 24px;
        font-weight: bold;
        color: #303133;
      }
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
