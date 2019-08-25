import request from '@/utils/request'

export function getInvoiceList(params) {
  return request({
    url: '/zgCompanyBill/condition',
    method: 'post',
    params: params
  })
}

export function updateInvoiceData(params) {
  return request({
    url: '/zgCompanyBill/update',
    method: 'post',
    params: params
  })
}
export function updateZgCompanyBillToDefault(params) {
  return request({
    url: '/zgCompanyBill/updateZgCompanyBillToDefault',
    method: 'post',
    params: params
  })
}
export function saveInvoiceData(params) {
  return request({
    url: '/zgCompanyBill/save',
    method: 'post',
    params: params
  })
}
