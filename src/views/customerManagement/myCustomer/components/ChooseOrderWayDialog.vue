<template>
  <el-dialog title="选择下单方式" :visible.sync="visible" :close-on-click-modal="flag" width="650px">
    <el-form ref="dataForm" :model="temp" label-width="120px">
      <!-- 合同类型 -->
      <el-form-item label="合同类型:">
        <el-radio v-model="temp.radio1" label="1">标准合同</el-radio>
        <el-radio v-model="temp.radio1" label="2">非标合同</el-radio>
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="createdDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'ChooseOrderWayDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: false,
      temp: {}
    }
  },
  methods: {}
}
</script>

<style scoped>
/deep/ .el-dialog .el-dialog__header{
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}
/deep/ .el-dialog .el-dialog__body{
  padding:30px 80px 0 50px
}
/deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
  font-weight: normal;
  font-size: 15px;
}
</style>
