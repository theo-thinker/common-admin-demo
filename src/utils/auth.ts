// 权限相关工具函数

const TokenKey = 'token'

// 获取令牌
export function getToken() {
  return localStorage.getItem(TokenKey)
}

// 设置令牌
export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}

// 移除令牌
export function removeToken() {
  return localStorage.removeItem(TokenKey)
}
