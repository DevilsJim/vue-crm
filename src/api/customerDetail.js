import request from '@/utils/request'

// 查询动态记录
export function getCustomerDynamics(params) {
  return request({
    url: '/crmDynamicLog/condition/pager',
    method: 'post',
    params: params
  })
}

// 获取公司信息
export function getCompanyDetail(params) {
  return request({
    url: '/zgCompany/condition',
    method: 'post',
    params: params
  })
}

// 查询主子公司关系
export function getCompanyChildrenDetail(params) {
  return request({
    url: '/zgCompany/releationCondition',
    method: 'post',
    params: params
  })
}

// 查询联系人列表（没权限）
export function getLatentUserPager(params) {
  return request({
    url: '/zgLatentUser/condition/pager',
    method: 'post',
    params: params
  })
}
// 查询商机联系人列表（有权限）
export function getBusinessUserPager(params) {
  return request({
    url: '/zgLatentUser/condition/pager/business',
    method: 'post',
    params: params
  })
}

// 修改公司下的联系人
export function updateLatentUserDetail(params) {
  return request({
    url: '/zgLatentUser/update',
    method: 'post',
    params: params
  })
}

export function saveZgLatentUser(params) {
  return request({
    url: '/zgLatentUser/save',
    method: 'post',
    params: params
  })
}

// 设置子公司为主显公司
export function setChild2Parent(params) {
  return request({
    url: '/zgCompany/selectAndUpdateToMainCompany',
    method: 'post',
    params: params
  })
}
export function saveFollow(params) {
  return request({
    url: '/tCompanyFollow/save',
    method: 'post',
    params: params
  })
}

// 当前负责人详情查询
export function getLeaderInfo(params) {
  return request({
    url: '/zgUserPrivate/condition',
    method: 'post',
    params: params
  })
}

export function saveBusinessDataR(params) {
  return request({
    url: '/zgBusiness/save',
    method: 'post',
    params: params
  })
}

// 释放原因列表
export function releaseReasonList(params) {
  return request({
    baseURL: process.env.VUE_APP_RULE_API + '/releaseReason/condition',
    method: 'post',
    params: params
  })
}

// 释放到公海
export function setPrivateToPublic(params) {
  return request({
    url: '/zgCompany/releaseCompanyToPublic',
    method: 'post',
    params: params
  })
}

// 商机列表（没权限）
export function getBusinessPager(params) {
  return request({
    url: '/zgBusiness/condition/pager',
    method: 'post',
    params: params
  })
}

// 商机列表（有权限）
export function getBusinessPagerVo(params) {
  return request({
    url: '/zgBusiness/condition/pager/vo',
    method: 'post',
    params: params
  })
}

export function getBusinessDetail(params) {
  return request({
    url: '/zgBusiness/condition',
    method: 'post',
    params: params
  })
}

// 保存商机
export function saveBusiness(params) {
  return request({
    url: '/zgBusiness/save',
    method: 'post',
    params: params
  })
}

// 保存商机
export function updateBusiness(params) {
  return request({
    url: '/zgBusiness/update',
    method: 'post',
    params: params
  })
}

// 公司详情修改
export function updateCompanyInfo(params) {
  return request({
    url: '/zgCompany/update',
    method: 'post',
    params: params
  })
}

// 标签总列表
export function getTagsList(params) {
  return request({
    url: '/tag/all/list',
    method: 'post',
    params: params
  })
}

// 添加标签
export function saveTags(params) {
  return request({
    url: '/tag/save/tag/relation',
    method: 'post',
    params: params
  })
}

// 获取专利信息
export function getParentInfo(params) {
  return request({
    baseURL: process.env.VUE_APP_QUANTUM_API + '/parent/info',
    method: 'post',
    params: params
  })
}

// 获取商标信息
export function getTrademarkInfo(params) {
  return request({
    baseURL: process.env.VUE_APP_QUANTUM_API + '/trade/mark/info',
    method: 'post',
    params: params
  })
}

// 获取工商信息
export function getCommerceInfo(params) {
  return request({
    baseURL: process.env.VUE_APP_QUANTUM_API + '/commerce/info',
    method: 'post',
    params: params
  })
}
