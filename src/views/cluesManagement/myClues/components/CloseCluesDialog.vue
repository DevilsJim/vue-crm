<template>
  <el-dialog title="关闭线索" :close-on-click-modal="flag" :visible.sync="visible" width="650px" @close="closeDia()" @open="openDia()">
    <el-form ref="dataForm" :model="clues" label-width="90px" size="mini">
      <template>
        <el-form-item label="关闭原因:" label-width="90px">
          <el-checkbox-group v-model="formInline.closeReason">
            <el-checkbox label="信息不全" />
            <el-checkbox label="信息有误" />
            <el-checkbox label="电话打不通" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="其它原因:" prop="desc" label-width="90px">
          <el-input v-model="formInline.desc" type="textarea" />
        </el-form-item>
      </template>
      <!-- 保存, 取消 -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="warning" @click="save('dataForm')">确认关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CloseCluesDialog',
  props: {
    closeCluesVisible: {
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
      visible: this.closeCluesVisible,
      formInline: {
        closeReason: []
      },
      clues: {}
    }
  },
  watch: {
    closeCluesVisible: function() {
      this.visible = this.closeCluesVisible
    }
  },
  methods: {
    openDia() {
      this.clues = this.cluesDataVisible
      console.log(this.cluesDataVisible)
    },
    closeDia() {
      this.$emit('update:closeCluesVisible', false)
      this.formInline = {}
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
