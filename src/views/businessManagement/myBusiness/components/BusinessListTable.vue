<template>
  <div class="list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!-- 商机名称 -->
      <el-form-item>
        <el-input v-model="formInline.bussinessName" placeholder="请输入商机名称" clearable />
      </el-form-item>
      <!-- 客户名称 -->
      <el-form-item>
        <el-input v-model="formInline.companyName" placeholder="请输入客户名称" clearable />
      </el-form-item>
      <!-- 商机来源 -->
      <el-form-item v-if="activeTabsName === '-1'">
        <el-select v-model="formInline.businessType" value="" clearable placeholder="请选择商机来源">
          <el-option label="全部" value="-1" />
          <el-option label="我创建的" value="0" />
          <el-option label="他人转入" value="1" />
        </el-select>
      </el-form-item>
      <!-- 意向业务 -->
      <el-form-item>
        <el-select v-model="formInline.businessPurpose" value="" clearable placeholder="请选择意向业务">
          <el-option label="全部" value="-1" />
          <el-option label="商标服务" value="1" />
          <el-option label="专利" value="2" />
          <el-option label="版权" value="3" />
          <el-option label="财税" value="4" />
          <el-option label="项目" value="6" />
          <el-option label="高新" value="7" />
          <el-option label="商标交易" value="8" />
          <el-option label="法律服务" value="9" />
          <el-option label="人事社保" value="10" />
          <el-option label="工商" value="11" />
          <el-option label="其他" value="5" />
        </el-select>
      </el-form-item>
      <!-- 商机进度 -->
      <el-form-item>
        <el-select v-model="formInline.businessProgress" value="" clearable placeholder="请选择商机进度">
          <el-option label="全部" value="-1" />
          <el-option label="初步洽谈" value="0" />
          <el-option label="是否发送函件" value="1" />
          <el-option label="是否约谈" value="2" />
          <el-option label="销售报价" value="3" />
          <el-option label="合同发票" value="4" />
          <el-option label="项目失败" value="5" />
          <el-option label="项目收款" value="6" />
        </el-select>
      </el-form-item>
      <!-- 跟进时间 -->
      <el-form-item v-if="activeTabsName !== '0'">
        <el-select v-model="formInline.selectType" value="" clearable placeholder="请选择跟进时间">
          <el-option label="全部" value="0" />
          <el-option label="近三天待跟进" value="1" />
          <el-option label="近一周待跟进" value="2" />
          <el-option label="近一月待跟进" value="3" />
          <el-option label="超一个月未回访" value="4" />
        </el-select>
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
        <el-button type="success" icon="el-icon-plus" size="small" @click="addBusinessVisible = true">新建商机</el-button>
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
    >
      <!--<el-table-column type="selection" width="55" align="center"></el-table-column>-->
      <el-table-column label="序号" type="index" width="60" align="center" />
      <el-table-column label="商机编号" width="250" prop="businessId" header-align="center" />
      <el-table-column label="商机名称" width="220" class-name="company-name" header-align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/businessManagement/businessDetail/' + scope.row.businessId}">
            <div class="name">{{ scope.row.bussinessName }}</div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="客户名称" width="220" class-name="company-name" header-align="center">
        <template slot-scope="scope">
          <router-link v-if="scope.row.contactType == 1" :to="{path:'/customerManagement/customerDetail/' + scope.row.companyId, query: {ifOwnCompany: scope.row.ifOwnCompany}}">
            <div class="name">{{ scope.row.companyName }}</div>
          </router-link>
          <router-link v-else-if="scope.row.contactType == 0" :to="{path:'/customerManagement/resourceCustomerDetail/' + scope.row.companyId}">
            <div class="name">{{ scope.row.companyName }}</div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="150" class-name="tags" header-align="center" prop="userName" />
      <el-table-column label="联系电话" width="100" class-name="tags" header-align="center">
        <template slot-scope="scope">
          <span class="user-phone">{{ scope.row.userMobile ? scope.row.userMobile : '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="意向业务" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.businessPurpose | businessPurposeFilter }}</template>
      </el-table-column>
      <el-table-column label="商机进度" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.businessProgress | businessProgressFilter }}</template>
      </el-table-column>
      <el-table-column label="成交几率" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.dealPercent > 0 ? scope.row.dealPercent * 10 : 0 }}%</template>
      </el-table-column>
      <el-table-column v-if="activeTabsName !== '2'" label="下次跟进时间" prop="nextFollowTime" sortable width="130" align="center">
        <template slot-scope="scope">
          <span>{{ (scope.row.nextFollowTime == null || scope.row.nextFollowTime === "") ? "" : scope.row.nextFollowTime.toString().substr(0,10) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime" sortable width="160" align="center" />
      <el-table-column label="操作" align="center" class-name="operation" fixed="right" min-width="200">
        <template v-if="activeTabsName !== '2'" slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleFollowUp(scope.row)">跟进</el-button>
          <el-button type="primary" size="small">代客下单</el-button>
        </template>
        <template v-else>
          <el-button type="warning" size="small">继续下单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="listData.start"
      :page-size="listData.length"
      :total="listData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 新建商机 -->
    <create-Business-dialog :visible.sync="addBusinessVisible" />

    <!-- 跟进商机 -->
    <follow-up-dialog :visible.sync="followUpVisible" :follow-up-data="followUpData" />
  </div>
</template>

<script>
import CreateBusinessDialog from './CreateBusinessDialog'
import FollowUpDialog from '../../businessDetail/FollowUpDialog'
export default {
  name: 'BusinessListTable',
  components: {
    CreateBusinessDialog,
    FollowUpDialog
  },
  filters: {
    // 意向业务
    businessPurposeFilter(status) {
      const statusMap = {
        '-1': '全部',
        '1': '商标服务',
        '2': '专利',
        '3': '版权',
        '4': '财税',
        '5': '其他',
        '6': '项目',
        '7': '高新',
        '8': '商标交易',
        '9': '法律服务',
        '10': '人事社保',
        '11': '工商'
      }
      return statusMap[status]
    },
    // 商机进度
    businessProgressFilter(status) {
      const statusMap = {
        '-1': '全部',
        '0': '初步洽谈',
        '1': '是否发送函件',
        '2': '是否约谈',
        '3': '销售报价',
        '4': '合同报价',
        '5': '项目失败',
        '6': '项目收款'
      }
      return statusMap[status]
    }
  },
  props: {
    listData: {
      type: Object,
      default: null
    },
    activeTabsName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      formInline: { // 传参字段
        start: '1', // 第几页
        length: '10', // 每页几条
        selectType: '0', // 跟进时间 0.全部 1.近三天待跟进 2.近一周待跟进 3.近一月待跟进 4.超一个月未回访
        businessType: '-1', // 来源 -2.商机详情, -1.我的商机, 0.我创建的, 1.他人转入, 2.组内释放商机-待处理（组内商机释放列表必填条件，待处理-值为2）, 3.组内释放商机-已失效（组内商机释放列表必填条件，已失效-值为3）
        dealType: '0', // 成交标示  0.未成交（即我的商机和他人转入列表错用参数） 1.已成交商机
        businessPurpose: '-1', // 意向业务： -1.全部 1，商标服务，2：专利，3：版权，4：财税，5：其他， 6.项目、7.高新、8.商标交易 9.法律服务、10.人事社保、11.工商
        businessProgress: '-1', // 阶段 -1.全部 0:初步洽谈，1：是否发送函件，2：是否约谈，3：销售报价，4：合同报价，5：项目失败，6：项目收款
        releasingFlage: '0' // 即将掉落  -1.全部 0.非即将掉落 1.即将掉落（除'即将掉落'列表值为1外，其余都为0）
      },
      addBusinessVisible: false,
      followUpVisible: false,
      followUpData: {}, // 商机跟进参数
      currentCompanyId: null
    }
  },
  watch: {
    activeTabsName: {
      handler: function(val, oldVal) {
        switch (val) {
          case 'myBusiness': // 我的商机
            this.formInline = Object.assign({}, this.formInline, {
              businessType: '-1',
              dealType: '0',
              releasingFlage: '0'
            })
            break
          case 'othersTurnIn': // 他人转入
            this.formInline = Object.assign({}, this.formInline, {
              businessType: '1',
              dealType: '0',
              releasingFlage: '0'
            })
            break
          case 'aboutToFall': // 即将掉落
            this.formInline = Object.assign({}, this.formInline, {
              businessType: '-1',
              dealType: '0',
              releasingFlage: '1'
            })
            break
          case 'dealConcluded': // 已成交
            this.formInline = Object.assign({}, this.formInline, {
              businessType: '-1',
              dealType: '1',
              releasingFlage: '0'
            })
            break
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 搜索
    onSubmit() {
      this.$message.success('搜索成功!')
      this.$emit('fetchData', this.formInline)
    },

    // 重置
    onReset() {
      this.formInline = {
        start: '1',
        length: '10',
        selectType: '0',
        businessType: '-1',
        dealType: '0',
        businessPurpose: '-1',
        businessProgress: '-1',
        releasingFlage: '0'
      }
      switch (this.activeTabsName) {
        case 'myBusiness': // 我的商机
          this.formInline = Object.assign({}, this.formInline, {
            businessType: '-1',
            dealType: '0',
            releasingFlage: '0'
          })
          break
        case 'othersTurnIn': // 他人转入
          this.formInline = Object.assign({}, this.formInline, {
            businessType: '1',
            dealType: '0',
            releasingFlage: '0'
          })
          break
        case 'aboutToFall': // 即将掉落
          this.formInline = Object.assign({}, this.formInline, {
            businessType: '-1',
            dealType: '0',
            releasingFlage: '1'
          })
          break
        case 'dealConcluded': // 已成交
          this.formInline = Object.assign({}, this.formInline, {
            businessType: '-1',
            dealType: '1',
            releasingFlage: '0'
          })
          break
      }
      this.$message('重置搜索项!')
    },

    // 每页条数
    handleSizeChange(val) {
      this.$set(this.formInline, 'length', val)
      this.$emit('fetchData', this.formInline)
    },

    // 当前页
    handleCurrentChange(val) {
      this.$set(this.formInline, 'start', val)
      this.$emit('fetchData', this.formInline)
    },

    // 跟进
    handleFollowUp(val) {
      this.followUpVisible = true
      this.followUpData = val
    }
  }
}
</script>

<style lang="scss" scoped>
.list-table{
  .el-form{
    .el-date-editor {
      width: 410px;
      /deep/ .el-range-input{ // 加 /deep/ 或 >>> 是为了给 element 元素添加自定义样式
        width: 80%;
      }
    }
    .el-button{
      /deep/ span{
        font-size: 15px;
      }
    }
    .el-form-item{
      &.search-con, &.follow-time, &.created-time{
        display: none;
      }
      &.show{
        display: inline-block;
      }
    }
  }
  .el-table{
    /deep/ td{
      padding: 6px 0;
    }
    .svg-icon{
      cursor: pointer;
      display: inline-block;
      font-size: 18px;
    }
    .company-name{
      div.name{
        display: inline-block;
        position: relative;
        max-width: 180px;
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
        vertical-align: top;
        font-style: normal;
        padding-right: 25px;
        box-sizing: content-box;
        color: #238def;
      }
    }
    .user-info{
      .user-name{
        display: block;
      }
      .user-phone{
        display: inline-block;
      }
      .svg-icon{
        margin-left: 5px;
      }
    }
    .dynamic{
      span{
        display: block;
      }
    }
    .tags{
      .el-tag{
        margin-right: 5px;
        height: 28px;
        line-height: 26px;
        padding: 0 6px;
      }
      .el-tag:last-child{
        margin-right: 0;
      }
    }
    .operation{
      .el-button{
        font-size: 14px;
      }
    }
  }
  .el-pagination{
    text-align: right;
    margin-top: 20px;
  }
}
.el-popover.el-popper.remark-popover{
  p{
    margin: 0;
    max-width: 140px;
    &.remark-tit{
      padding: 0 12px 10px 12px;
      border-bottom: 1px solid #ebebeb;
      font-weight: bold;
    }
    &.remark-con{
      padding: 12px 12px 0 12px;
      line-height: 1.5;
    }
  }
}
</style>
