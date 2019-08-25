import request from '@/utils/request'

/*
* 获取公共线索列表
* */
export function getCommonCluesList(params) {
  return request({
    url: '/thread/pager/public/thread',
    method: 'post',
    params: params
  })
}

/*
* 获取公共线索详情
* */
export function getCommonCluesDetail(params) {
  return request({
    url: '/thread/public/thread/detail',
    method: 'post',
    params: params
  })
}

/*
* 获取线索联系人列表
* */
export function getCommonCluesCustomerList(params) {
  return request({
    url: '/thread/pager/customer/linkman/info',
    method: 'post',
    params: params
  })
}

/*
* 捡入线索
* */
export function pickUpCommonCluesToPrivate(params) {
  return request({
    url: '/thread/pick/up/thread',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----全部线索列表
* */
export function getAllCluesList(params) {
  return request({
    url: '/thread/pager/all/private/thread',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----我录入的列表
* */
export function getMyPrivateClues(params) {
  return request({
    url: '/thread/pager/my/private/thread',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----稍后处理列表
* */
export function getLaterPrivateClues(params) {
  return request({
    url: '/thread/pager/later/deal',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----即将掉落列表
* */
export function getPrivateDropClues(params) {
  return request({
    url: '/thread/pager/drop/info',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----已转化线索列表
* */
export function getTransCluesList(params) {
  return request({
    url: '/thread/pager/trans/form/info',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----已关闭线索
* */
export function getCloseCluesList(params) {
  return request({
    url: '/thread/pager/close/info',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----录入线索
* */
export function savePrivateClues(params) {
  return request({
    url: '/thread/save',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----稍后处理
* */
export function laterPrivateClues(params) {
  return request({
    url: '/thread/later/deal',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----联系人详情
* */
export function getCustomerDetail(params) {
  return request({
    url: '/thread/linkman/detail/info',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----保存或修改联系人信息
* */
export function saveOrUpdateCustomerInfo(params) {
  return request({
    url: '/thread/save/or/update',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----编辑线索信息
* */
export function updateCluesData(params) {
  return request({
    url: '/thread/update',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----释放线索
* */
export function releaseClues(params) {
  return request({
    url: '/thread/update/thread/release',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----关闭线索
* */
export function closeClues(params) {
  return request({
    url: '/thread/update/thread/close',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----转为客户详情
* */
export function getTransferThreadDetail(params) {
  return request({
    url: '/thread/transfer/thread/detail',
    method: 'post',
    params: params
  })
}

/*
* 我的线索----转为客户
* */
export function transferCustomer(params) {
  return request({
    url: '/thread/update/transfer/customer',
    method: 'post',
    params: params
  })
}
