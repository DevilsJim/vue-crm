import request from '@/utils/payment'

// 付款信息列表 【后台付款信息列表】
export function getPayList(params) {
  return request({
    url: '/account/getPayList',
    method: 'post',
    data: params
  })
}

// 付款信息列表 详情【付款详情接口】
export function payDetail(params) {
  return request({
    url: '/account/payDetail/' + params,
    method: 'get'
  })
}

// 付款信息列表 添加打款账户【添加线下支付打款信息】
export function editIncomeInfo(params) {
  return request({
    url: '/account/editIncomeInfo',
    method: 'post',
    data: params
  })
}
