<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!-- 选择来源 -->
      <el-form-item>
        <el-select v-model="formInline.sourceId" clearable placeholder="请选择来源">
          <el-option label="官网推广" value="0" />
          <el-option label="顾问录入" value="1" />
          <el-option label="第三方数据" value="2" />
        </el-select>
      </el-form-item>
      <!-- 输入地区 -->
      <el-form-item>
        <el-input v-model="formInline.region" placeholder="请输入地址关键词" />
      </el-form-item>
      <!-- 公司名称 -->
      <el-form-item>
        <el-input v-model="formInline.companyName" placeholder="请输入公司名称" />
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
        <el-button type="success" icon="el-icon-search" size="mini" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" size="mini" @click="onReset">重置</el-button>
        <el-button type="success" icon="el-icon-search" size="mini" @click="createdCluesVisible = true">创建线索</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table
      v-loading="listDatas.listLoading"
      :data="listDatas.list"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
    >
      <el-table-column label="序号" type="index" width="60" align="center" />
      <el-table-column label="公司名称" width="220" class-name="company-name" align="center">
        <template slot-scope="scope">
          <router-link :to="{path:'/CluesManagement/cluesDetail/' + scope.row.companyId}">
            <div class="name">{{ scope.row.companyName }}</div>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="195" class-name="user-info" align="center">
        <template slot-scope="scope">
          <span class="user-name">姓名: {{ scope.row.nickName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" width="90" align="center">
        <template slot-scope="scope">{{ scope.row.position }}</template>
      </el-table-column>
      <el-table-column label="联系方式" width="190" class-name="tags" align="center">
        <template slot-scope="scope">
          <span class="user-phone">{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司地址" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.region }}</template>
      </el-table-column>
      <el-table-column label="知产数量" width="100" align="center">
        <!-- <template slot-scope="scope">{{ scope.row. }}</template> -->
        <template slot-scope="scope">
          <div>商标: {{ scope.row.trCount }}</div>
          <div>专利: {{ scope.row.patentCount }}</div>
        </template>
      </el-table-column>
      <el-table-column label="线索备注" width="170" align="center">
        <template slot-scope="scope">{{ scope.row.region }}</template>
      </el-table-column>
      <el-table-column label="初始来源" width="150" align="center">
        <template slot-scope="scope">{{ scope.row.businessPurpose }}</template>
      </el-table-column>
      <el-table-column prop="createTime" label="收录时间" width="150" align="center" sortable>
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column v-if="activeTabsName < 4" label="操作" header-align="center" class-name="operation" fixed="right" min-width="170" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="handlCluesToCustomer(scope.row)">转为客户</el-button>
          <el-button v-if="activeTabsName === '0' || activeTabsName === '3'" type="success" size="mini" @click="handlLaterDispose(scope.row.pkSid)">稍后处理</el-button>
          <el-button type="danger" size="mini" @click="handlCloseClues(scope.row.pkSid)">关闭</el-button>
        </template>
      </el-table-column>
      <el-table-column v-else-if="activeTabsName === '4'" label="转化时间" prop="createTime" align="center" sortable>
        <template slot-scope="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <template v-else-if="activeTabsName === '5'">
        <el-table-column label="关闭时间" prop="closeTime" width="150" align="center" sortable>
          <template slot-scope="scope">{{ scope.row.closeTime }}</template>
        </el-table-column>
        <el-table-column label="关闭原因" prop="closeReason" align="center">
          <template slot-scope="scope">{{ scope.row.closeReason }}</template>
        </el-table-column>
      </template>
    </el-table>
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
    <!-- 创建线索 -->
    <create-clues-dialog :created-clues-visible.sync="createdCluesVisible" />

    <!-- 转为客户 -->
    <clues-to-customer-dialog :clues-to-customer-visible.sync="cluesToCustomerVisible" :clues-data-visible.sync="cluesData" />

    <!-- 关闭线索 -->
    <close-clues-dialog :close-clues-visible.sync="closeCluesVisible" :clues-data-visible.sync="cluesData" />
  </div>
</template>

<script>
import CreateCluesDialog from './CreatedCluesDialog'
import CluesToCustomerDialog from './CluesToCustomerDialog'
import CloseCluesDialog from './CloseCluesDialog'

export default {
  inject: ['reload'],
  name: 'CluesListTable',
  components: { CloseCluesDialog, CluesToCustomerDialog, CreateCluesDialog },
  props: {
    listData: {
      type: Object,
      default: null
    },
    searchData: {
      type: Object,
      default: null
    },
    dialogVisible: {
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
      propsDeptId: {
        label: 'deptName',
        value: 'pkSid',
        children: 'children',
        checkStrictly: true
      }, // 选择部门props设置
      formInline: { // 传参字段
        start: '1',
        length: '10',
        deleteStatus: '0'
      }, // 搜索条件参数
      sourceId: 0,
      listDatas: {
        list: [
          {
            companyId: 1,
            companyName: '测试公司',
            nickName: '测试联系人',
            position: '总裁',
            mobile: '手机：11111111111',
            region: '北京',
            businessPurpose: '官网',
            createTime: '2019-07-19',
            closeTime: '2019-07-19',
            closeReason: '测试',
            patentCount: 12,
            trCount: 12
          },
          {
            companyId: 2,
            companyName: '测试公司2',
            nickName: '测试联系人2',
            position: '经历',
            mobile: '手机：11111111111',
            region: '河北',
            businessPurpose: '官网',
            createTime: '2019-07-18',
            closeTime: '2019-07-18',
            closeReason: '测试',
            patentCount: 12,
            trCount: 12
          }
        ]
      },
      cluesData: {},
      createdCluesVisible: false,
      cluesToCustomerVisible: false,
      closeCluesVisible: false
    }
  },
  watch: {
    listData: {
      handler: function(val, oldVal) {
        this.list = val.list
      },
      deep: true,
      immediate: true
    },
    'searchData.sysUserPageList': {
      handler: function(val, oldVal) {
        this.userList = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleDeptTree(val) {
      if (val.length > 0) {
        this.getSysUserPage(val.slice(val.length - 1))
        this.formInline.deptIds = val.slice(val.length - 1).toString()
      } else {
        this.userList = this.searchData.sysUserPageList
        this.formInline.currentUserId = null
      }
    },

    /**
       * @desc 搜索
       * @author jinlijing
       */
    onSubmit() {
      this.formInline.deptIds = this.deptIdsVisible
      this.$message.success('搜索成功!')
      this.$emit('fetchData', this.formInline)
    },

    /**
       * @desc 重置
       * @author jinlijing
       */
    onReset() {
      this.formInline = {
        start: '1', // 第几页
        length: '10', // 每页几条
        deleteStatus: '0' // 是否删除
      }
      this.$message('重置搜索项!')
    },

    /**
       * @desc 每页条数 listData.list.length
       * @author jinlijing
       */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$set(this.formInline, 'length', val)
      this.$emit('fetchData', this.formInline)
    },

    /**
       * @desc 当前页 listData.list.start
       * @author jinlijing
       */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$set(this.formInline, 'start', val)
      this.$emit('fetchData', this.formInline)
    },

    // 创建线索
    handleCreatedClues() {
      this.createdCluesVisible = true
    },

    // 转为客户
    handlCluesToCustomer(val) {
      this.cluesToCustomerVisible = true
      this.cluesData = val
    },

    // 稍后处理
    handlLaterDispose(val) {
      this.reload()
    },

    // 关闭
    handlCloseClues(val) {
      this.closeCluesVisible = true
      this.cluesData = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .customer-list-table{
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
          /*display: none;*/
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
