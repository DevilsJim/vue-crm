/*
    退款弹窗
 */
<template>
  <el-dialog title="申请退款" :visible.sync="showDialog" @close="$emit('closeDialogRefund')">
    <el-form :model="form" label-width="120px">
      <el-form-item label="申请原因：">
        <el-col :span="10">
          <el-select v-model="form.select" placeholder="请选择" size="small">
            <el-option label="公司已注销" value="1" />
            <el-option label="被同行切户" value="2" />
            <el-option label="政策原因" value="3" />
            <el-option label="风险客户" value="4" />
            <el-option label="业务无法继续进行" value="5" />
            <el-option label="转让" value="6" />
            <el-option label="订单与服务业务不匹配" value="7" />
            <el-option label="报单错误" value="8" />
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="订单金额：">20元</el-form-item>
      <el-form-item label="退款项：">
        <el-checkbox-group v-model="form.checkList">
          <el-checkbox label="expense">
            官费<el-input v-model="expense" class="mini-input" size="mini" />元
          </el-checkbox>
          <el-checkbox label="service">
            服务费<el-input v-model="service" class="mini-input" size="mini" />元
          </el-checkbox>
          <el-checkbox label="other">
            其它<el-input v-model="other" class="mini-input" size="mini" />元
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="退款金额：">18元</el-form-item>
      <el-form-item label="备注：">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="退款银行：" class="bank-wrap">
        <el-input v-model="form.bankName" placeholder="请输入客户账号名称" />
        <el-input v-model="form.bankNum" placeholder="请输入客户银行卡号" />
      </el-form-item>
      <el-form-item>
        <el-button @click="$emit('closeDialogRefund')">取消</el-button>
        <el-button type="primary" @click="onSubmit">提交申请</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'RefundRialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: this.isShow,
      form: {
        select: '',
        checkList: [],
        desc: '',
        bankName: '',
        bankNum: ''
      },
      expense: '',
      service: '',
      other: ''
    }
  },
  watch: {
    isShow(newV) {
      this.showDialog = newV
    }
  },
  methods: {
    // 表单提交
    onSubmit() {
      console.log('提交')
    }
  }
}
</script>

<style lang='scss' scoped>
.el-input {
  margin: 0 3px;
  width: 60px;
  /deep/ .mini-input {
    padding: 0 5px;
  }
}
.bank-wrap {
  /deep/ .el-input  {
    width: 40%;
  }
}
</style>
