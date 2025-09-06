// API入口文件
import request from '@/utils/request'

// 导入各模块API
import * as userApi from './modules/user'
import * as systemApi from './modules/system'

export { userApi, systemApi }
export default request
