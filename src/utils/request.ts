import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getToken } from '@/utils/auth'
import { useUserStore } from '@/stores/modules/user'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // request timeout
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    const token = getToken()
    if (token) {
      // 让每个请求携带自定义token
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error)
  },
)

// response拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data

    // 如果自定义代码不是200，则将其判断为错误。
    if (res.code !== 200) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })

      // 50008: 非法令牌; 50012: 其他客户端登录; 50014: 令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        ElMessageBox.confirm('您已注销，您可以取消以留在此页面，或再次登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          const userStore = useUserStore()
          userStore.logout().then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    console.log('err' + error)
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    })
    return Promise.reject(error)
  },
)

export default service
