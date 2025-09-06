import request from '@/utils/request'

// 系统相关接口

// 获取菜单列表
export function getMenuList() {
  return request({
    url: '/system/menu/list',
    method: 'get',
  })
}

// 创建菜单
export function createMenu(data: any) {
  return request({
    url: '/system/menu/create',
    method: 'post',
    data,
  })
}

// 更新菜单
export function updateMenu(id: string, data: any) {
  return request({
    url: `/system/menu/update/${id}`,
    method: 'put',
    data,
  })
}

// 删除菜单
export function deleteMenu(id: string) {
  return request({
    url: `/system/menu/delete/${id}`,
    method: 'delete',
  })
}

// 获取角色列表
export function getRoleList(params: any) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params,
  })
}

// 创建角色
export function createRole(data: any) {
  return request({
    url: '/system/role/create',
    method: 'post',
    data,
  })
}

// 更新角色
export function updateRole(id: string, data: any) {
  return request({
    url: `/system/role/update/${id}`,
    method: 'put',
    data,
  })
}

// 删除角色
export function deleteRole(id: string) {
  return request({
    url: `/system/role/delete/${id}`,
    method: 'delete',
  })
}
