<template>
  <div class="customer-list-table">
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
      <!-- 转移方式 -->
      <el-form-item>
        <el-select v-model="formInline.selectType" value="" clearable placeholder="请选择转移方式">
          <el-option label="全部" value="-1" />
          <el-option label="转出" value="0" />
          <el-option label="分配" value="1" />
          <el-option label="转入" value="2" />
          <el-option label="被分配" value="3" />
        </el-select>
      </el-form-item>
      <!-- 操作 -->
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
      <el-table-column label="创建时间" prop="createTime" sortable width="160" align="center" />
      <el-table-column label="转移方式" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.moveType | moveTypeFilter }}</template>
      </el-table-column>
      <el-table-column label="转移给" prop="moveTo" width="100" align="center" />
      <el-table-column label="来源于" prop="moveFrom" width="100" align="center" />
      <el-table-column label="转移时间" prop="moveTime" width="160" align="center" />
      <el-table-column label="转移理由" prop="dealRemark" min-width="150" align="center" />
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
  </div>
</template>

<script>
export default {
  name: 'BusinessListTable',
  filters: {
    // 转移方式
    moveTypeFilter(status) { // 转移方式 -1.全部 0.转出 1.分配 2.转入 3.被分配
      const statusMap = {
        '-1': '全部',
        '0': '转出',
        '1': '分配',
        '2': '转入',
        '3': '被分配'
      }
      return statusMap[status]
    }
  },
  props: {
    listData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formInline: {
        start: '1', // 第几页
        length: '10', // 每页几条
        selectType: '-1' //  转移方式 -1.全部 0.转出 1.分配 2.转入 3.被分配
      }
    }
  },
  methods: {
    // 搜索
    onSubmit() {
      this.$emit('fetchData', this.formInline)
    },

    // 重置
    onReset() {
      this.formInline = {
        start: '1',
        length: '10',
        selectType: '-1'
      }
      this.$message('重置搜索项!')
    },

    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$set(this.formInline, 'length', val)
      this.$emit('fetchData', this.formInline)
    },

    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$set(this.formInline, 'start', val)
      this.$emit('fetchData', this.formInline)
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-list-table{
  padding: 25px 15px 15px;
  background: #fff;
  border: 1px solid #DCDFE6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
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
        span{
          position: absolute;
          top: 1px;
          right: 0;
        }
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
