<template>
  <el-dialog title="编辑商机信息" :close-on-click-modal="flag" :visible.sync="templateDialog" width="550px" @close="closeDia">
    <el-form ref="ruleForm" :model="temp" :rules="rules" label-width="90px" size="mini">
      <!-- 放弃理由 -->
      <el-form-item label="商机编号:" prop="businessId">
        <el-input v-model="temp.businessId" disabled />
      </el-form-item>
      <!-- 名称 -->
      <el-form-item label="商机名称:" prop="bussinessName">
        <el-input v-model="temp.bussinessName" placeholder="请输入商机名称" />
      </el-form-item>
      <!-- 备注 -->
      <el-form-item label="商机备注:">
        <el-input v-model="temp.remark" type="textarea" placeholder="请输入商机备注" />
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDia">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateBusiness } from 'api/business'
export default {
  inject: ['reload'],
  name: 'EditBusinessDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    businessData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: false,
      temp: {},
      rules: {
        businessId: [
          { required: true, message: '请输入商机编号', trigger: 'blur' }
        ],
        bussinessName: [
          { required: true, message: '请输入商机名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible(val, oldVal) {
      this.templateDialog = val
    },
    businessData(val, oldVal) {
      this.temp = val
    }
  },
  methods: {
    closeDia() {
      this.temp = {}
      this.$emit('update:visible', false)
    },
    save(formName) {
      console.log(formName)
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          updateBusiness(_this.temp).then(response => {
            if (response.data.code === 10000) {
              _this.closeDia()
              _this.reload()
              _this.$message.success(response.data.message)
            } else {
              _this.$message.error('操作失败')
            }
          }).catch((err) => {
            _this.$message.error(err)
          })
        } else {
          _this.$message.warning('请完善您的数据')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
/deep/ .el-dialog .el-dialog__header{
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}
/deep/ .el-dialog .el-dialog__body{
  padding: 30px 70px 20px 50px;
}
/deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
  font-weight: normal;
  font-size: 15px;
}
/deep/ .el-form .el-radio{
  line-height: 1.5;
  margin-bottom: 15px;
}
</style>
