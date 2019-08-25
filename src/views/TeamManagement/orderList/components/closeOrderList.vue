/*
 *  已关闭订单组件
 */
<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!-- 选择搜索条件 -->
      <el-form-item>
        <el-select v-model="searchCriteria" placeholder="请选择搜索条件">
          <el-option label="订单编号" value="orderNum" />
          <el-option label="合同编号" value="contractNum" />
          <el-option label="客户名称" value="userName" />
          <el-option label="联系人手机号" value="linkmanMobile" />
        </el-select>
      </el-form-item>
      <!-- 输对应搜索条件的内容 -->
      <el-form-item>
        <el-input v-model="formInline.searchCon" :placeholder="`请输入${searchCriteriaTxt[searchCriteria]}`" clearable />
      </el-form-item>
      <!-- 订单状态 -->
      <el-form-item label="订单状态：">
        <el-select v-model="formInline.orderState">
          <el-option label="全部" value="0" />
          <el-option label="已退款" value="1" />
          <el-option label="交易关闭" value="2" />
          <el-option label="服务关闭" value="3" />
        </el-select>
      </el-form-item>
      <!-- 提交时间 -->
      <el-form-item label="提交时间：">
        <el-date-picker
          v-model="formInline.submitTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始创建时间"
          end-placeholder="结束创建时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
        />
        <!-- @change="handleCreatedTime" -->
      </el-form-item>
      <!-- 合同状态 -->
      <el-form-item label="合同状态：">
        <el-select v-model="formInline.contractState">
          <el-option label="全部" value="0" />
          <el-option label="未提交" value="1" />
          <el-option label="待审核" value="2" />
          <el-option label="已审核" value="3" />
        </el-select>
      </el-form-item>
      <!-- 支付方式 -->
      <el-form-item label="支付方式：">
        <el-select v-model="formInline.payment">
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
        <el-select v-model="formInline.invoiceType">
          <el-option label="全部" value="0" />
          <el-option label="电子普通发票" value="1" />
          <el-option label="纸质普通发票" value="2" />
          <el-option label="纸质专用发票" value="3" />
        </el-select>
      </el-form-item>
      <!-- 发票状态 -->
      <el-form-item label="发票状态：">
        <el-select v-model="formInline.invoiceState">
          <el-option label="全部" value="0" />
          <el-option label="未开票" value="1" />
          <el-option label="已开票" value="2" />
          <el-option label="未邮寄" value="3" />
        </el-select>
      </el-form-item>
      <!-- 业务类型 -->
      <el-form-item label="业务类型：">
        <el-cascader
          v-model="formInline.workType"
          :options="optionsArr"
          :props="{ expandTrigger: 'hover' }"
          clearable
          @change="handleChangeWorkType"
        />
      </el-form-item>
      <!-- 流程节点 -->
      <el-form-item label="流程节点：">
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
      <!-- 所属团队 -->
      <el-form-item label="所属团队：">
        <el-select v-model="formInline.company" clearable>
          <el-option label="所在公司及团队" value="0" />
        </el-select>
      </el-form-item>
      <!-- 顾问 -->
      <el-form-item label="顾问：">
        <el-select v-model="formInline.counselor" clearable>
          <el-option label="团队下的顾问" value="0" />
        </el-select>
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table
      v-loading="listData.listLoading"
      :data="listData.list = [{}]"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="序号" type="index" width="60" align="center" /> -->
      <el-table-column label="订单信息" width="200" fixed align="center" />
      <el-table-column label="客户名称" width="220" class-name="company-name" header-align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/customerManagement/resourceCustomerDetail/' + scope.row.companyId}">
            <div class="name">{{ scope.row.companyName }}
              <el-popover
                placement="bottom"
                trigger="hover"
                popper-class="remark-popover"
              >
                <p class="remark-tit">最后一次跟进</p>
                <p class="remark-con">{{ scope.row.remark }}</p>
                <svg-icon slot="reference" icon-class="message" class-name="message" />
              </el-popover>
            </div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="提交时间" width="200" align="center" />
      <el-table-column label="订单金额" width="200" align="center" />
      <el-table-column label="合同编号" width="200" align="center" />
      <el-table-column label="订单状态" width="200" align="center" />
      <el-table-column label="流程节点" width="200" align="center" />
      <el-table-column label="报件日期" width="200" align="center" />
      <el-table-column label="全同类型" width="200" align="center" />
      <el-table-column label="发票状态" width="200" align="center" />
      <el-table-column label="操作" align="center" fixed="right">
        <!-- <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="$emit('pickUpPrivate', scope.row.companyId)">捡入私海</el-button>
        </template> -->
        <el-button type="text" size="small" @click="isRefundDialog = true">退款审核</el-button>
      </el-table-column>
    </el-table>
    <!-- 批量操作 -->
    <el-button type="primary" class="selecte-all" size="small" @click="handleClickSelectAllClose">关闭订单</el-button>
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
    <!-- 退款审核弹窗 -->
    <refund-dialog :is-show="isRefundDialog" @closeDialogRefund="isRefundDialog = false" />
  </div>
</template>

<script>
import refundDialog from './modal/refund'

export default {
  name: 'CustomerListTable',
  components: {
    refundDialog
  },
  props: {
    listData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      list: [],
      searchCriteriaTxt: { // 当选择搜索条件是，展示对应搜索条件输入框的 placeholder 值
        orderNum: '订单编号',
        contractNum: '合同编号',
        userName: '客户名称',
        linkmanMobile: '联系人手机号'
      },
      searchCriteria: 'orderNum', // 搜索条件
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
      createdTime: null, // 创建时间
      formInline: { // 传参字段
        searchCon: '', // 搜索条件对应的输入框
        orderState: '0', // 订单状态
        submitTime: '', // 提交时间
        contractState: '', // 合同状态
        payment: '0', // 支付方式
        invoiceType: '', // 发票类型
        invoiceState: '', // 发票状态
        workType: [], // 业务类型
        flowNode: '', // 流程节点
        company: '', // 所属团队
        counselor: '' // 顾问
      },
      isRefundDialog: false // 退款审核弹窗
    }
  },
  methods: {
    // 搜索
    onSubmit() {
      console.log('搜索')
      this.$message.success('搜索成功!')
      // this.$emit('fetchData', this.formInline)
    },
    // 重置
    onReset() {
      this.formInline = {
        searchCon: '', // 搜索条件对应的输入框
        orderState: '0', // 订单状态
        submitTime: '', // 提交时间
        contractState: '', // 合同状态
        payment: '0', // 支付方式
        invoiceType: '', // 发票类型
        invoiceState: '', // 发票状态
        workType: [], // 业务类型
        flowNode: '', // 流程节点
        company: '', // 所属团队
        counselor: '' // 顾问
      }
      this.$message('重置搜索项!')
    },
    // 业务类型
    handleChangeWorkType(val) {
      console.log(val)
    },
    // 表单复选框事件
    handleSelectionChange(val) {
      console.log(val)
    },
    // 关闭订单
    handleClickSelectAllClose() {
      console.log('关闭订单')
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

<style lang="scss" scoped>
.selecte-all {
  float: left;
  margin-top: 20px;
}
</style>
