/*
    退款审核进度弹窗
 */
<template>
  <el-dialog title="退款审核进度" :visible.sync="showDialog" @close="$emit('closeDialogRefundAudit')">
    <el-steps direction="vertical" :active="1" finish-status="success" :space="120">
      <el-step title="步骤 1" />
      <el-step title="步骤 2">
        <template slot="description">
          <div>213123123</div>
        </template>
      </el-step>
      <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字" />
    </el-steps>
  </el-dialog>
</template>

<script>
export default {
  name: 'RefundAudit',
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
  }
}
</script>

<style lang='scss' scoped>
</style>
