import Cookies from 'js-cookie'

// const TokenKey = 'vue_admin_template_token'
const TokenKey = 'Admin-Token'
const UserInfoKey = 'Crm-Admin-User-Info'
const DeptKey = 'Crm-Admin-Dept'
const RoleKey = 'Crm-Admin-Role'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(UserInfoKey)
  Cookies.remove(DeptKey)
  return Cookies.remove(RoleKey)
}

export function setUserInfo(data) {
  return Cookies.set(UserInfoKey, data)
}

export function getUserInfo() {
  return Cookies.get(UserInfoKey)
}

export function setDept(data) {
  return Cookies.set(DeptKey, data)
}

export function setRole(data) {
  return Cookies.set(RoleKey, data)
}

export function getDept() {
  return Cookies.get(DeptKey)
}

export function getRole() {
  return Cookies.get(RoleKey)
}
