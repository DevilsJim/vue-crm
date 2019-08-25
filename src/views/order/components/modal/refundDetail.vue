/*
* 退款详情弹窗
*/
<template>
  <el-dialog title="退款详情" :visible.sync="showDialog" @close="$emit('closeDialogRefundDetail')">
    <table id="printHtml" border="1" cellspacing="0" cellpadding="0" style="border: 1px solid #ddd" width="100%">
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">申请人</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">申请时间</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">汇入途径</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">收款日期</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">付款名称</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">订单号</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">收款金额</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">退款金额</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">是否开票</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">户名</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">账号</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">开户行</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">审批意见</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">分总</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">财务经理</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="width: 24%; border-right: 1px solid #ddd; padding: 10px 20px; text-align: right; background-color: #F9FAFC;">北京会计审核</td>
        <td style="padding-left: 20px;">123</td>
      </tr>
    </table>
    <div class="btn-wrap">
      <el-button size="small" @click="$emit('closeDialogRefundDetail')">关闭</el-button>
      <el-button type="primary" size="small" @click="handleClickPrint">打印</el-button>
    </div>
  </el-dialog>
</template>

<script>
import print from 'print-js'

export default {
  name: 'RefundDetail',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: this.isShow
    }
  },
  watch: {
    isShow(newV) {
      this.showDialog = newV
    }
  },
  methods: {
    handleClickPrint() {
      print({
        printable: 'printHtml',
        type: 'html',
        scanStyles: false,
        targetStyles: ['*'],
        honorColor: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-wrap {
  margin-top: 20px;
  text-align: center;
}
</style>
