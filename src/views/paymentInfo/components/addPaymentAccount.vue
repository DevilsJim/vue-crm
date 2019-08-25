<!--付款信息-添加打款账户弹框-->
<template>
  <el-dialog
    title="打款账户"
    :close-on-click-modal="flag"
    :visible.sync="visible"
    width="30%"
    @open="openDialog"
    @close="close"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="客户打款账户：" prop="customerName">
        <el-input v-model="ruleForm.customerName" placeholder="请输入客户打款账户" />
      </el-form-item>
      <el-form-item label="客户开户行：" prop="customerBank">
        <el-input v-model="ruleForm.customerBank" placeholder="请输入客户开户行" />
      </el-form-item>
      <el-form-item label="开户行账号：" prop="customerAccount">
        <el-input v-model="ruleForm.customerAccount" placeholder="请输入开户行账号" />
      </el-form-item>
      <el-form-item label="打款时间：" prop="incomeTime">
        <el-date-picker
          v-model="ruleForm.incomeTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择打款时间"
        />
      </el-form-item>
      <el-form-item label="汇入途径：">
        <span>{{ itemInfo.remitAccount }}</span>
      </el-form-item>
    </el-form>
    <!--底部-->
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="resetForm('ruleForm')">取消</el-button>
      <el-button size="small" type="primary" @click="submitForm('ruleForm')">确定</el-button>
    </span>
  </el-dialog>

</template>

<script type="text/ecmascript-6">
import { editIncomeInfo } from 'api/paymentService'
export default {
  inject: ['reload'], // 弹框关闭自动刷新
  name: 'AddPaymentAccount',
  props: {
    addPaymentAccountDia: {
      type: Boolean,
      default: false
    },
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visible: this.addPaymentAccountDia,
      flag: false, // 不可通过点击外面关闭弹框
      ruleForm: {},
      rules: {
        customerName: [
          { required: true, message: '请输入客户打款账户', trigger: 'blur' }
        ],
        customerBank: [
          { required: true, message: '请输入客户开户行', trigger: 'blur' }
        ],
        customerAccount: [
          { required: true, message: '请输入开户行账号', trigger: 'blur' }
        ],
        incomeTime: [
          { required: true, message: '请选择打款时间', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    addPaymentAccountDia() {
      this.visible = this.addPaymentAccountDia
    }
  },
  methods: {
    // 打开弹框调取数据
    openDialog() {
      this.ruleForm = {
        payId: this.itemInfo.payId // 服务单号
      }
    },
    // 取消/重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.$emit('update:addPaymentAccountDia', false)
    },
    // 关闭弹框
    close() {
      this.resetForm('ruleForm')
    },
    // 保存
    submitForm(formName) {
      // 调接口
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调接口
          editIncomeInfo(this.ruleForm).then(res => {
            if (res.data.code === 10000) {
              this.$message.success(res.data.message)
              this.resetForm(formName)
              this.reload() // 自动刷新列表
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            this.$message.error(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}

</script>

<style scoped>

</style>
