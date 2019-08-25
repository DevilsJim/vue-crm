/*
    订单列表 - 搜索组件
 */

<template>
  <div>
    <el-form :inline="true" :model="formInline">
      <!-- 搜索条件 -->
      <el-select v-model="searchCriteria">
        <el-option label="订单编号" value="orderNum" />
        <el-option label="合同编号" value="contractNum" />
        <el-option label="客户名称" value="userName" />
        <el-option label="联系人手机号" value="latentTelephone" />
      </el-select>
      <!-- 搜索内容 -->
      <el-form-item>
        <el-input v-model="formInline.searchCon" :placeholder="`请输入${searchAll[searchCriteria]}`" clearable />
      </el-form-item>
      <!-- 订单状态 -->
      <el-form-item label="订单状态：">
        <el-select v-model="formInline.orderState" clearable>
          <el-option label="全部" value="0" />
          <el-option label="待付款" value="1" />
          <el-option label="已付款" value="2" />
          <el-option label="退款中" value="3" />
          <el-option label="已退款" value="4" />
          <el-option label="未通过" value="5" />
          <el-option label="已完成" value="6" />
          <el-option label="已关闭（已退款或特殊原因强行关闭）" value="7" />
        </el-select>
      </el-form-item>
      <!-- 提交时间 -->
      <el-form-item label="提交时间：">
        <el-date-picker
          v-model="formInline.subTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <!-- 支付方式 -->
      <el-form-item label="支付方式：">
        <el-select v-model="formInline.payType" clearable>
          <el-option label="全部" value="0" />
          <el-option label="支付宝" value="1" />
          <el-option label="微信" value="2" />
          <el-option label="银行卡支付" value="3" />
          <el-option label="转账汇款" value="4" />
          <el-option label="余额支付" value="5" />
        </el-select>
      </el-form-item>
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
        </el-select>
      </el-form-item>
      <!-- 业务类型 -->
      <el-form-item label="业务类型：">
        <el-cascader
          v-model="formInline.workType"
          :options="optionsArr"
          :props="{ expandTrigger: 'hover' }"
          clearable
          @change="handleChange"
        />
      </el-form-item>
      <!-- 流程节点 -->
      <el-form-item label="流程节点">
        <el-select v-model="formInline.flowNode" clearable>
          <el-option label="数据来源于业务办理过程节点" value="0" />
          <el-option label="业务审核" value="1" />
          <el-option label="审核" value="2" />
          <el-option label="分配" value="3" />
          <el-option label="办案" value="4" />
          <el-option label="核查" value="5" />
          <el-option label="交付" value="6" />
          <el-option label="报告" value="7" />
        </el-select>
      </el-form-item>
      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
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
      <el-table-column prop="a" label="订单信息" align="center" />
      <el-table-column label="客户名称" align="center" />
      <el-table-column label="提交时间" align="center" />
      <el-table-column label="订单金额" align="center" />
      <el-table-column label="合同编号" align="center" />
      <el-table-column label="订单状态" align="center" />
      <el-table-column label="支付方式" align="center" />
      <el-table-column label="流程节点" align="center">
        <template slot-scope="scope">
          <el-tooltip effect="light" placement="top">
            <template slot="content">
              <!-- 步骤条 -->
              <div>
                <step :setp-data="scope" />
              </div>
            </template>
            <div>123123</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="报件日期" align="center" />
      <el-table-column label="全同类型" align="center" />
      <el-table-column label="发票状态" align="center" />
      <el-table-column label="操作" align="center">
        <!-- 查看订单 -->
        <a href="#">
          <el-button type="text" size="small">查看订单</el-button>
        </a>
        <el-button type="text" size="small" @click="isShowRefund = true">申请退款</el-button>
        <el-button type="text" size="small" @click="isShowRefundAudit = true">退款审核进度</el-button>
        <el-button type="text" size="small" @click="isShowRefundDetail = true">退款详情</el-button>
        <el-button type="text" size="small" @click="isShowHc = true">红冲</el-button>
        <el-button type="text" size="small" @click="isShowInvoice = true">申请开票</el-button>
        <el-button type="text" size="small" @click="isShowInvoice = true">申请补票</el-button>
        <!-- <el-button type="text" size="small" @click="isShowInvoice = true">业务办理</el-button> -->
      </el-table-column>
    </el-table>
    <!-- 申请退款弹窗 -->
    <refund-modal :is-show="isShowRefund" @closeDialogRefund="isShowRefund = false" />
    <!-- 退款审核弹窗 -->
    <refund-audit :is-show="isShowRefundAudit" @closeDialogRefundAudit="isShowRefundAudit = false" />
    <!-- 退款详情 -->
    <refund-detail :is-show="isShowRefundDetail" @closeDialogRefundDetail="isShowRefundDetail = false" />
    <!-- 红冲弹窗 -->
    <hc-modal :is-show="isShowHc" @closeDialogHc="isShowHc = false" />
    <!-- 开票信息弹窗 -->
    <invoice-msg :is-show="isShowInvoice" :is-maintain="isMaintain" @closeDialogInvoice="isShowInvoice = false" />
    <!-- 批量操作 -->
    <el-button type="primary" class="selecte-all" size="small" @click="handleClickSelectAll">批量操作</el-button>
    <!-- 分页 -->
    <el-pagination
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
import refundModal from './modal/refund'
import refundAudit from './modal/refundAudit'
import refundDetail from './modal/refundDetail'
import hcModal from './modal/hc'
import invoiceMsg from './modal/invoiceMsg'
import step from './step'

export default {
  name: 'OrderListTable',
  components: {
    refundModal,
    refundAudit,
    refundDetail,
    hcModal,
    invoiceMsg,
    step
  },
  props: {
    listData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      searchAll: {
        orderNum: '订单编号',
        contractNum: '合同编号',
        userName: '客户名称',
        latentTelephone: '联系人手机号'
      },
      searchCriteria: 'orderNum', // 搜索条件
      formInline: {
        searchCon: '', // 关键字搜索
        orderState: '0', // 订单状态
        subTime: '', // 提交时间
        payType: '0', // 支付方式
        invoiceType: '0', // 发票类型
        invoiceState: '', // 发票状态
        workType: [], // 业务类型
        flowNode: '0' // 流程节点
      },
      // 及联数据
      optionsArr: [
        {
          label: '商标服务',
          value: '0',
          children: [
            {
              label: '商标注册',
              value: '01'
            },
            {
              label: '驳回复审',
              value: '02'
            }
          ]
        },
        {
          label: '版权服务',
          value: '1'
        },
        {
          label: '专利服务',
          value: '2'
        },
        {
          label: '其它服务',
          value: '3'
        }
      ],
      // 是否已经设置过发票信息
      isMaintain: false,
      // 退款弹窗
      isShowRefund: false,
      // 退款审核弹窗
      isShowRefundAudit: false,
      // 退款详情
      isShowRefundDetail: false,
      // 红冲弹窗
      isShowHc: false,
      // 申请开票
      isShowInvoice: false
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
    // 查看点击事件
    handleClickLook(scope) {
      console.log(scope)
    },
    // 搜索事件
    onSubmit() {
      console.log('搜索')
    },
    // 重置事件
    onReset() {
      this.formInline = {
        searchCon: '', // 关键字搜索
        orderState: '0', // 订单状态
        subTime: '', // 提交时间
        payType: '0', // 支付方式
        invoiceType: '0', // 发票类型
        invoiceState: '', // 发票状态
        workType: [], // 业务类型
        flowNode: '0' // 流程节点
      }
      this.$message('重置搜索项!')
    },
    // 表格复选框
    handleClickSelectChange(select) {
      console.log(select)
    },
    // 批量操作
    handleClickSelectAll() {
      console.log('批量操作')
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
.el-pagination {
  text-align: right;
  margin-top: 20px;
}
</style>
