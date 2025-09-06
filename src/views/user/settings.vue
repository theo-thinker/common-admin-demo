<template>
  <div class="app-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>个人设置</span>
        </div>
      </template>
      
      <el-tabs v-model="activeTab">
        <el-tab-pane label="基本设置" name="basic">
          <el-form
            ref="basicFormRef"
            :model="basicForm"
            label-width="100px"
          >
            <el-form-item label="昵称">
              <el-input v-model="basicForm.nickname" />
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input v-model="basicForm.phone" />
            </el-form-item>
            <el-form-item label="个人简介">
              <el-input
                v-model="basicForm.introduction"
                type="textarea"
                :rows="4"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveBasic">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="安全设置" name="security">
          <el-form
            ref="securityFormRef"
            :model="securityForm"
            label-width="100px"
          >
            <el-form-item label="旧密码">
              <el-input
                v-model="securityForm.oldPassword"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input
                v-model="securityForm.newPassword"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                v-model="securityForm.confirmPassword"
                type="password"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveSecurity">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeTab = ref('basic')

const basicFormRef = ref()
const basicForm = reactive({
  nickname: '管理员',
  phone: '13800138000',
  introduction: '这个人很懒，什么都没留下'
})

const securityFormRef = ref()
const securityForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const saveBasic = () => {
  ElMessage.success('基本设置保存成功')
}

const saveSecurity = () => {
  if (securityForm.newPassword !== securityForm.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  ElMessage.success('安全设置保存成功')
}
</script>

<style scoped lang="scss">
.app-container {
  padding: 20px;
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>