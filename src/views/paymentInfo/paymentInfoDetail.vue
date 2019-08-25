<!--付款信息-付款信息详情-->
<template>
  <div class="paymentInfoDetail">
    <!--显示详情-->
    <h3>支付信息详情</h3>
    <ul>
      <li><span class="title">服务单号</span><span>{{ payDetailInfo.payId }}</span></li>
      <li><span class="title">流水号</span><span>{{ payDetailInfo.flowId }}</span></li>
      <li><span class="title">客户名称</span><span>{{ payDetailInfo.companyName }}</span></li>
      <li><span class="title">打款账户</span><span>{{ payDetailInfo.customerName }}</span></li>
      <li><span class="title">客户开户行</span><span>{{ payDetailInfo.customerBank }}</span></li>
      <li><span class="title">客户账号</span><span>{{ payDetailInfo.customerAccount	}}</span></li>
      <li><span class="title">到账时间（支付时间）</span><span>{{ payDetailInfo.incomeTime }}</span></li>
      <li><span class="title">支付金额</span><span>{{ payDetailInfo.price }}</span></li>
      <li><span class="title">支付方式</span><span>{{ payDetailInfo.payWay | payWayFiler }}</span></li>
      <li><span class="title">汇入途径</span><span>{{ payDetailInfo.remitAccount }}</span></li>
      <li><span class="title">申请时间</span><span>{{ payDetailInfo.createTime }}</span></li>
      <li><span class="title">匹配时间</span><span>{{ payDetailInfo.matchTime }}</span></li>
    </ul>
    <!--表单-->
    <el-table
      :data="payDetailInfo.contractList"
      border
      style="width: 100%"
    >
      <el-table-column
        label="合同编号"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.contractId }}
        </template>
      </el-table-column>
      <el-table-column
        prop="signDate"
        label="合同日期"
        align="center"
      />
      <el-table-column
        prop="companyName"
        label="客户名称"
        align="center"
      />
      <el-table-column
        prop="price"
        label="合同金额"
        align="center"
      />
    </el-table>
    <!--底部-->
    <div class="footer">
      <el-button type="primary" size="small" @click="goBcak">返回</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { payDetail } from 'api/paymentService'
export default {
  name: 'PaymentInfoDetail',
  filters: {
    // 支付方式 balance 线下转账:offline 微信H5支付：weH5 微信native支付：weNative 微信公众号支付：weJs 支付宝H5支付：aliWap 支付宝PC网页支付：aliPage
    payWayFiler(status) {
      const statusMap = {
        'balance': '余额支付',
        'offline': '线下转账',
        'weH5': '微信H5支付',
        'weNative': '微信native支付',
        'weJs': '微信公众号支付',
        'aliWap': '支付宝H5支付',
        'aliPage': '支付宝PC网页支付'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      payDetailInfo: {}
    }
  },
  created() {
    this.payDetail()
  },
  methods: {
    // 详情
    payDetail() {
      // this.$route.params.payId = '2019081914351476517000005'
      payDetail(this.$route.params.payId).then(response => {
        if (response.data.code === 10000) {
          this.payDetailInfo = response.data.data
        } else {
          this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    },

    // 返回
    goBcak() {
      // 返回列表
      this.$router.push({ name: 'PaymentInfo' })
    }
  }
}

</script>

<style scoped>
  .paymentInfoDetail{
    padding: 20px;
  }
  ul{
    border:1px solid #dfe6ec;
    padding: 0;
    font-size: 14px;
  }
  ul li{
    list-style: none;
    border-bottom:1px solid #dfe6ec;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    color: #606266;
  }
  li:last-child{
    border-bottom: none;
  }
  ul .title{
    width: 152px;
    display: inline-block;
    text-align: right;
    border-right: 1px solid #dfe6ec;
    padding-right: 10px;
    margin-right: 10px;
  }
  .footer{
    text-align: center;
    margin-top: 20px;
  }
</style>
