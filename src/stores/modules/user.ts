import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login as loginApi, logout as logoutApi, getInfo as getUserInfo } from '@/api/modules/user'
import { removeToken, setToken } from '@/utils/auth'

export const useUserStore = defineStore('user', () => {
  // 用户令牌
  const token = ref<string>(localStorage.getItem('token') || '')

  // 用户信息
  const userInfo = ref<any>({
    id: '',
    name: '',
    avatar: '',
    roles: [],
  })

  // 登录
  const login = async (loginForm: any) => {
    const { username, password } = loginForm
    const res: any = await loginApi({ username: username.trim(), password })
    const { data } = res
    token.value = data.token
    setToken(data.token)
    return res
  }

  // 获取用户信息
  const getInfo = async () => {
    const res: any = await getUserInfo()
    const { data } = res
    if (!data) {
      throw new Error('Verification failed, please Login again.')
    }

    const { id, name, avatar, roles } = data
    if (!roles || roles.length <= 0) {
      throw new Error('getInfo: roles must be a non-null array!')
    }

    userInfo.value = {
      id,
      name,
      avatar,
      roles,
    }

    return data
  }

  // 登出
  const logout = async () => {
    try {
      await logoutApi()
    } finally {
      token.value = ''
      userInfo.value = {
        id: '',
        name: '',
        avatar: '',
        roles: [],
      }
      removeToken()
    }
  }

  // 设置用户信息
  const setUserInfo = (info: any) => {
    userInfo.value = info
  }

  return {
    token,
    userInfo,
    login,
    getInfo,
    logout,
    setUserInfo,
  }
})
