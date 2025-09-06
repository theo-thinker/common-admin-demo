<template>
  <div class="navbar">
    <div class="left-menu">
      <div class="hamburger-container" @click="toggleSideBar">
        <el-icon :size="20">
          <component :is="appStore.sidebar.opened ? 'Fold' : 'Expand'" />
        </el-icon>
      </div>

      <breadcrumb />
    </div>

    <div class="right-menu">
      <div class="right-menu-item">
        <el-dropdown trigger="click">
          <div class="avatar-wrapper">
            <img :src="userStore.avatar" class="user-avatar" alt="用户头像" />
            <el-icon>
              <ArrowDown />
            </el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="logout">
                <span>退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessageBox, ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import { useAppStore } from '@/stores/modules/app'
import { useUserStore } from '@/stores/modules/user'
import Breadcrumb from './breadcrumb.vue'
import { ArrowDown } from '@element-plus/icons-vue'

const appStore = useAppStore()
const userStore = useUserStore()

const toggleSideBar = () => {
  appStore.toggleSidebar()
}

const logout = async () => {
  await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })

  await userStore.logout()
}
</script>

<style scoped lang="scss">
.navbar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .left-menu {
    display: flex;
    align-items: center;

    .hamburger-container {
      padding: 0 15px;
      cursor: pointer;
      transition: background 0.3s;
      height: 100%;
      display: flex;
      align-items: center;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .right-menu {
    display: flex;
    align-items: center;

    .right-menu-item {
      padding: 0 10px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        cursor: pointer;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
