/*
    发票列表 - 表格组件
 */
<template>
  <div>
    <el-form :inline="true" :model="formInline">
      <!-- 搜索发票条件 -->
      <el-select v-model="searchInvoice">
        <el-option label="发票单号" value="invoiceNum" />
        <el-option label="发票抬头" value="invoiceTitle" />
        <el-option label="订单号" value="orderNum" />
      </el-select>
      <!-- 搜索内容 -->
      <el-form-item>
        <el-input v-model="formInline.searchInvoice" :placeholder="`请输入${searchInvoiceAll[searchInvoice]}`" clearable />
      </el-form-item>
      <!-- 流程节点 -->
      <el-form-item label="流程节点：">
        <el-select v-model="formInline.processNode">
          <el-option label="全部" value="0" />
          <el-option label="已报件" value="1" />
        </el-select>
      </el-form-item>
      <!-- 搜索联系方式条件 -->
      <!-- <el-select v-model="searchContact">
        <el-option label="手机" value="iphone" />
        <el-option label="联系人" value="linkman" />
      </el-select> -->
      <!-- 搜索内容 -->
      <!-- <el-form-item>
        <el-input v-model="formInline.searchContact" :placeholder="`请输入${searchContactAll[searchContact]}`" clearable />
      </el-form-item> -->
      <!-- 发票类型 -->
      <el-form-item label="发票类型：">
        <el-select v-model="formInline.invoiceType" clearable>
          <el-option label="全部" value="0" />
          <el-option label="电子普通发票" value="1" />
          <el-option label="纸质普通发票" value="2" />
          <el-option label="纸质专用发票" value="3" />
        </el-select>
      </el-form-item>
      <!-- 发票状态 -->
      <el-form-item label="发票状态：">
        <el-select v-model="formInline.invoiceState" clearable>
          <el-option label="全部" value="0" />
          <el-option label="未开票" value="1" />
          <el-option label="已开票" value="2" />
          <el-option label="已拒绝" value="3" />
          <el-option label="待邮寄" value="4" />
          <el-option label="已邮寄" value="5" />
          <el-option label="待红冲" value="6" />
          <el-option label="已红冲" value="7" />
          <el-option label="待补票" value="8" />
        </el-select>
      </el-form-item>
      <!-- 订单状态 -->
      <el-form-item label="订单状态：">
        <el-select v-model="formInline.orderState" clearable>
          <el-option label="未付款" value="1" />
          <el-option label="已付款" value="2" />
          <el-option label="已完成" value="3" />
          <el-option label="办理中" value="4" />
          <el-option label="已关闭（已退款或特殊原因强行关闭）" value="5" />
        </el-select>
      </el-form-item>
      <!-- 申请时间 -->
      <el-form-item label="申请时间：">
        <el-date-picker
          v-model="formInline.applyTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <!-- 开票时间 -->
      <el-form-item label="开票时间：">
        <el-date-picker
          v-model="formInline.invoiceTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset()">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table
      v-loading="listData.listLoading"
      :data="listData.list"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      style="width: 100%"
      @selection-change="handleClickSelectChange"
    >
      <el-table-column type="selection" align="center" />
      <el-table-column label="订单号" align="center" />
      <el-table-column label="订单状态" align="center" />
      <el-table-column label="客户名称" align="center" />
      <el-table-column label="流程节点" align="center" />
      <el-table-column label="发票抬头" align="center" />
      <el-table-column label="订单金额" align="center" />
      <el-table-column label="发票类型" align="center" />
      <el-table-column label="开票方式" align="center" />
      <el-table-column label="发票号" align="center" />
      <el-table-column label="开票日期" align="center" />
      <el-table-column label="开票方" align="center" />
      <el-table-column label="操作人" align="center" />
      <el-table-column label="申请时间" align="center" />
      <el-table-column label="申请人" align="center" />
      <el-table-column label="发票状态" align="center" />
      <el-table-column label="备注信息" fixed="right" align="center" />
    </el-table>
    <!-- 红冲 -->
    <el-button type="primary" class="selecte-all" size="small" @click="isDialog = true">红冲</el-button>
    <!-- 红冲弹窗 -->
    <el-dialog title="红冲" :visible.sync="isDialog">
      <el-table :data="[{}, {}]" border @selection-change="handleChangeHC">
        <el-table-column type="selection" align="center" />
        <el-table-column label="发票号" align="center" />
        <el-table-column label="订单" align="center" />
        <el-table-column label="公司" align="center" />
        <el-table-column label="订单金额" align="center" />
      </el-table>
      <p class="hc-desc">选择您要红冲的订单</p>
      <p class="hc-desc">您一共选择了{{ 2 }}个发票，红冲金额：<strong>{{ '1766元' }}</strong></p>
      <el-button class="hc-btn" type="primary">提交申请红冲</el-button>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      class="el-pagination-right"
      background
      :current-page="listData.start"
      :page-size="listData.length"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'InvoiceListTable',
  props: {
    listData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formInline: {
        searchInvoice: '', // 搜索发票条件
        // searchContact: '', // 搜索联系方式条件
        processNode: '0', // 流程节点
        invoiceType: '0', // 发票类型
        invoiceState: '', // 发票状态
        orderState: '1', // 订单状态
        applyTime: '', // 申请时间
        invoiceTime: '' // 开票时间
      },
      searchInvoice: 'invoiceNum', // 搜索条件
      searchInvoiceAll: {
        invoiceNum: '发票单号',
        invoiceTitle: '发票抬头',
        orderNum: '订单号'
      },
      // searchContact: 'iphone', // 搜索联系方式
      // searchContactAll: {
      //   iphone: '手机',
      //   linkman: '联系人'
      // },
      isDialog: false // 弹窗是否展示
    }
  },
  methods: {
    // 搜索事件
    onSubmit() {
      console.log('搜索')
    },
    // 重置事件
    onReset() {
      this.formInline = {
        searchInvoice: '', // 搜索发票条件
        // searchContact: '', // 搜索联系方式条件
        processNode: '0', // 流程节点
        invoiceType: '0', // 发票类型
        invoiceState: '', // 发票状态
        orderState: '1', // 订单状态
        applyTime: '', // 申请时间
        invoiceTime: '' // 开票时间
      }
      this.$message('重置搜索项!')
    },
    // 表格复选框
    handleClickSelectChange(select) {
      console.log(select)
    },
    // 选择要红冲的复选框
    handleChangeHC(select) {
      console.log(select)
    },
    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style lang='scss' scoped>
.selecte-all {
  float: left;
  margin-top: 20px;
}
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
