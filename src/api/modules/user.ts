import request from '@/utils/request'

// 用户相关接口

// 登录
export function login(data: any) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

// 登出
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

// 获取用户列表
export function getUserList(params: any) {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  })
}

// 创建用户
export function createUser(data: any) {
  return request({
    url: '/user/create',
    method: 'post',
    data,
  })
}

// 更新用户
export function updateUser(id: string, data: any) {
  return request({
    url: `/user/update/${id}`,
    method: 'put',
    data,
  })
}

// 删除用户
export function deleteUser(id: string) {
  return request({
    url: `/user/delete/${id}`,
    method: 'delete',
  })
}
