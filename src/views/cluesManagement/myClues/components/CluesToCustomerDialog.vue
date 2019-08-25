<template>
  <el-dialog title="转为客户" :close-on-click-modal="flag" :visible.sync="visible" width="650px" @close="closeDia()" @open="openDia()">
    <el-form ref="dataForm" :rules="rules" :model="clues" label-width="90px" size="mini">
      <template>
        <el-form-item label="客户类型:" prop="companyName" label-width="90px">
          <el-radio-group v-model="formInline.comapnyType">
            <el-radio :label="0">企业用户</el-radio>
            <el-radio :label="1">个体工商</el-radio>
            <el-radio :label="2">自然人</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="客户名称:" prop="companyName" label-width="90px">
          <el-input v-model="formInline.companyName" placeholder="请输入客户名称" />
        </el-form-item>
        <el-form-item label="客户地区:" prop="region" label-width="90px">
          <el-input v-model="formInline.region" placeholder="请输入客户地区" />
        </el-form-item>
        <el-form-item label="联系人:" prop="nickName" label-width="90px">
          <el-input v-model="formInline.nickName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="职位:" prop="position" label-width="90px">
          <el-input v-model="formInline.position" placeholder="请输入职位" />
        </el-form-item>
        <el-form-item label="手机号:" prop="mobile" label-width="90px">
          <el-input v-model="formInline.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="预测意向:" prop="region">
          <el-input v-model="formInline.region" placeholder="请输入预测意向" />
        </el-form-item>
        <el-form-item label="沟通记录:" prop="record">
          <el-input v-model="formInline.record" type="textarea" />
        </el-form-item>
        <el-form-item label="渠道客户:" prop="isChannel" label-width="90px">
          <el-radio-group v-model="formInline.isChannel">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </template>
      <!-- 保存, 取消 -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="save('dataForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CluesToCustomerDialog',
  props: {
    cluesToCustomerVisible: {
      type: Boolean,
      default: false
    },
    cluesDataVisible: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      visible: this.cluesToCustomerVisible,
      clues: this.cluesDataVisible,
      formInline: {},
      rules: {
        companyName: [
          { required: true, message: '请输入客户名称', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        record: [
          { required: true, message: '请填写沟通记录', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    cluesToCustomerVisible: function() {
      this.visible = this.cluesToCustomerVisible
    },
    cluesDataVisible: function() {
      this.clues = this.cluesDataVisible
    }
  },
  methods: {
    openDia() {
      this.clues = this.cluesDataVisible
    },
    closeDia() {
      this.$emit('update:cluesToCustomerVisible', false)
      this.clues = {}
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-row{
    padding: 0 20px;
  }
  /deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
    font-weight: normal;
  }
  /deep/ .el-form .el-form-item__content .el-select {
    width: 100%;
  }
  /deep/ .el-form .label-style .el-form-item__label{
    font-weight: bold;
  }
  /deep/ .el-form .label-style .el-form-item__content{
    margin-top: 10px;
  }
</style>
