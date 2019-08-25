/*
    退款审核弹窗
 */
<template>
  <el-dialog title="退款审核" :visible.sync="showDialog" @close="$emit('closeDialogRefund')">
    <el-table :model="[]" border>
      <el-table-column label="商品图片" align="center" />
      <el-table-column label="商品名称" align="center" />
      <el-table-column label="数量" align="center" />
      <el-table-column label="价格" align="center" />
      <el-table-column label="优惠" align="center" />
      <el-table-column label="小计" align="center" />
    </el-table>
    <div class="price">合计： <span class="mark">&yen; 700.00</span></div>
    <h3 class="title">服务单信息</h3>
    <el-form :model="formData" class="form-wrap">
      <el-form-item label="状态：" />
      <el-form-item label="订单编号：" />
      <el-form-item label="申请时间：" />
      <el-form-item label="用户账号：" />
      <el-form-item label="联系人：" />
      <el-form-item label="联系电话：" />
      <el-form-item label="退款原因：" />
      <el-form-item label="订单金额：" />
      <el-form-item label="退款项：">
        <el-radio-group v-model="formData.refund">
          <el-radio label="1">退官费 300元</el-radio>
          <el-radio label="2">退服务费 18元</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="确认退款金额：" />
      <el-form-item label="审核意见：">
        <el-radio-group v-model="formData.auditMsg">
          <el-radio label="1">通过</el-radio>
          <el-radio label="2">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核备注：">
        <el-input
          v-model="formData.remark"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item class="btn-wrap">
        <el-button type="success" @click="handleClickRefund">确认退款</el-button>
        <el-button type="danger" @click="handleClickRefuse">拒绝退款</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'Refund',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: this.isShow, // 是否展示弹窗
      formData: { // 表单数据
        refund: '2', // 退款项
        auditMsg: '1', // 审核意见
        remark: '' // 审核备注
      }
    }
  },
  watch: {
    isShow(newV) {
      this.showDialog = newV
    }
  },
  methods: {
    // 确定退款
    handleClickRefund() {
      console.log('退款')
    },
    // 拒绝退款
    handleClickRefuse() {
      console.log('拒绝')
    }
  }
}
</script>

<style lang='scss' scoped>
.price {
  padding-right: 20px;
  line-height: 50px;
  text-align: right;
  .mark {
    color: #F15754;
    font-size: 18px;
    font-weight: bolder;
  }
}
.title {
  padding-left: 20px;
  line-height: 50px;
  background-color: #F3F3F3;
}
.form-wrap {
  position: relative;
  margin: 30px 20px 60px;
  border: 1px solid #ddd;
  .el-form-item {
    display: flex;
    margin-bottom: 0;
    border-bottom: 1px solid #ddd;
    &:last-child, &:nth-last-child(2) {
      border-bottom: 0;
    }
    &:nth-last-child(2) {
      /deep/ .el-form-item__content {
        padding: 10px 20px;
      }
    }
    & > /deep/ label {
      flex: 0 0 20%;
      vertical-align: middle;
      border-right: 1px solid #ddd;
      background-color: #F9FAFC;
    }
    /deep/ .el-form-item__content {
      flex: 1;
      padding-left: 20px;
    }
  }
  .btn-wrap {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -60px;
    /deep/ .el-form-item__content {
      text-align: center;
    }
  }
}
</style>
