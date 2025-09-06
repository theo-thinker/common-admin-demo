<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">通用后台管理系统</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="usernameRef"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          autocomplete="on"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <el-icon><Lock /></el-icon>
          </template>
          <template #suffix>
            <el-icon @click="showPassword">
              <View v-if="passwordType === 'password'" />
              <Hide v-else />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
import { Hide, Lock, User, View } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref()
const usernameRef = ref()

const loginForm = reactive({
  username: 'admin',
  password: '123456',
})

const loginRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}

const passwordType = ref('password')
const loading = ref(false)

const showPassword = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    // passwordRef.value.focus()
  })
}

const handleLogin = () => {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        await userStore.login(loginForm)
        ElMessage({
          message: '登录成功',
          type: 'success',
          duration: 2000,
        })
        await router.push({ path: '/' })
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    } else {
      return false
    }
  })
}

onMounted(() => {
  if (loginForm.username === '') {
    usernameRef.value.focus()
  }
})
</script>

<style scoped lang="scss">
@use '@/styles/variables.scss' as *;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $background-color-base;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $primary-color;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
