<template>
  <el-dialog title="释放线索" :close-on-click-modal="flag" :visible.sync="visible" width="650px" @close="closeDia()" @open="openDia()">
    <el-form ref="dataForm" :rules="rules" :model="clues" label-width="90px" size="mini">
      <template>
        <el-form-item label="公司名称:" prop="companyName" label-width="90px">
          <el-input v-model="clues.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="联系人:" prop="nickName" label-width="90px">
          <el-input v-model="clues.nickName" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="手机号:" prop="mobile" label-width="90px">
          <el-input v-model="clues.mobile" placeholder="请输入手机号" />
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
  name: 'ReleaseCluesDialog',
  props: {
    releaseCluesVisible: {
      type: Boolean,
      default: false
    },
    cluesDataVisible: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      flag: false,
      visible: this.cluesToCustomerVisible,
      clues: this.cluesDataVisible,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    releaseCluesVisible: function() {
      this.visible = this.releaseCluesVisible
    },
    cluesDataVisible: function() {
      this.clues = this.cluesDataVisible
    }
  },
  methods: {
    openDia() {
      this.clues = this.cluesDataVisible
      console.log(this.cluesDataVisible)
    },
    closeDia() {
      this.$emit('update:releaseCluesVisible', false)
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
