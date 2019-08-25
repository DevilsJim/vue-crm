/*
    红冲弹窗
 */
<template>
  <el-dialog title="红冲" :visible.sync="showDialog" @close="$emit('closeDialogHc')">
    <el-table :data="[{}, {}]" border @selection-change="handleChangeHC">
      <el-table-column type="selection" align="center" />
      <el-table-column label="发票号" align="center" />
      <el-table-column label="订单" align="center" />
      <el-table-column label="公司" align="center" />
      <el-table-column label="订单金额" align="center" />
    </el-table>
    <p class="hc-desc">选择您要红冲的订单</p>
    <p class="hc-desc">您一共选择了{{ 2 }}个发票，关联2个订单，红冲金额：<strong>{{ '1766元' }}</strong>，补票金额：<strong>{{ 880 }}</strong></p>
    <el-button class="hc-btn" type="primary">提交申请红冲</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: 'HcRialog',
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
    handleChangeHC(select) {
      console.log(select)
    }
  }
}
</script>

<style lang='scss' scoped>
.hc-desc {
  line-height: 20px;
  strong {
    color: #FF0001;
    font-size: 16px;
  }
}
.hc-btn {
  display: block;
  margin: 0 auto;
}
</style>
