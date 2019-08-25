import request from '@/utils/request'

// 客户清单
export function getList(params) {
  return request({
    url: '/zgCompany/all/condition/pager',
    method: 'post',
    params: params
  })
}

// 部门树状列表
export function getDeptTreeList() {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysDept/getDeptTreeListBySysId',
    method: 'get'
  })
}

// 根据部门id集合获取本部门及下级部门员工集合
export function getSysUserPageList(data) {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysUser/getSysUserListByDeptIds',
    method: 'post',
    data
  })
}

// 获取当前用户及下属用户列表
export function getCurrentUserDeptUsers() {
  return request({
    baseURL: process.env.VUE_APP_PERMISSION_API + '/sysUser/getCurrentUserDeptUsers',
    method: 'get'
  })
}

// 分配顾问
export function collectCompanyToOther(params) {
  return request({
    url: '/zgCompany/collectCompanyToOther',
    method: 'post',
    params: params
  })
}

// 变更客户
export function changeCompanyToOther(params) {
  return request({
    url: '/zgCompany/changeCompanyToOther',
    method: 'post',
    params: params
  })
}

// 审核无效客户
export function checkCompany(params) {
  return request({
    url: '/zgCompany/checkCompany',
    method: 'post',
    params: params
  })
}
