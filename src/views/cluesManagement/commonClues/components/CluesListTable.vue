<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-container direction="vertical">
      <p style="margin-bottom: 20px; border-bottom: 1px solid #e6ebf5;">筛选条件</p>
      <el-form :inline="true" :model="formInline" size="small">
        <!-- 选择来源 -->
        <el-form-item>
          <el-select v-model="formInline.source" clearable placeholder="请选择来源">
            <el-option
              v-for="item in sourceOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <!-- 地址关键词 -->
        <el-form-item prop="addressName" label-width="90px">
          <el-input v-model="formInline.addressName" placeholder="请输入公司地址关键词" />
        </el-form-item>
        <!-- 操作 -->
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small" @click="onSubmit">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" size="small" @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-container>

    <!-- 列表 -->
    <el-container direction="vertical">
      <p>数据列表
        <el-button type="success" style="float: right;" size="mini" @click="handlePatchPickUp()">批量捡入</el-button>

      </p>
      <el-table
        :data="tableData.list"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="选择" width="50" align="center" type="selection" prop="companyId" />
        <el-table-column label="序号" type="index" width="60" align="center" />
        <el-table-column label="公司名称" width="220" class-name="company-name" align="center">
          <template slot-scope="scope">
            <router-link :to="{path:'/CluesManagement/commonCluesDetail/' + scope.row.companyId}">
              <div class="name">{{ scope.row.companyName }}</div>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="联系人" width="180" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.nickName">
              {{ scope.row.nickName }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column label="职位" width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.position">
              {{ scope.row.position }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column label="联系方式" width="300" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.mobile">
              手机：{{ scope.row.mobile }}
              <el-tooltip placement="top" content="点击拨打电话">
                <svg-icon icon-class="phone" class-name="phone" />
              </el-tooltip>
            </span>
            <span v-else-if="scope.row.tel">
              座机：{{ scope.row.tel }}
            </span>
            <span v-else-if="scope.row.weChat">
              微信：{{ scope.row.weChat }}
            </span>
            <span v-else-if="scope.row.qq">
              QQ：{{ scope.row.qq }}
            </span>
            <span v-else-if="scope.row.email">
              邮箱：{{ scope.row.email }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column label="公司地址" width="300" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.positionAddress">
              {{ scope.row.positionAddress }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column label="线索备注" width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.desc">
              {{ scope.row.desc }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column label="初始来源" width="150" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.source">
              {{ scope.row.source }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column label="动态记录" width="300" align="center" prop="dynamic" sortable>
          <template slot-scope="scope">
            <span v-if="scope.row.dynamic">
              {{ scope.row.dynamic }}
            </span>
            <span v-else>
              -
            </span>
          </template>
        </el-table-column>
        <el-table-column label="收录时间" width="300" align="center" prop="createTime" sortable>
          <template slot-scope="scope">
            {{ scope.row.createTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" class-name="operation" fixed="right">
          <template slot-scope="scope">
            <el-button type="success" size="mini" @click="handlePickUp(scope.row.pkSid)">捡入</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        :current-page="tableData.start"
        :page-size="tableData.length"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-container>

  </div>
</template>

<script>

export default {
  inject: ['reload'],
  name: 'CluesListTable',
  components: {
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
      list: [],
      tableData: {
        list: [
          { companyId: 1, companyName: '北京xx科技有限公司', nickName: '', position: '总裁', mobile: '12345678901', email: 'test@zhiguoguo.com', qq: '123456', weChat: '12345678901', positionAddress: '北京市', desc: '普通文本', source: '官网推广', dynamic: '2018-12-28 12:23系统：导入线索', createTime: '2019-07-23 11:48:00' },
          { companyId: 2, companyName: '北京xx科技有限公司', nickName: '王大叁', position: '经理', mobile: '', email: 'test@zhiguoguo.com', qq: '', weChat: '', positionAddress: '四川省广安市', desc: '商标', source: '第三方数据', dynamic: '2017-12-28 12:23系统：导入线索', createTime: '2019-07-22 11:48:00' }
        ]
      },
      editData: {},
      searchCriteria: null, // 搜索条件
      searchCon: '', // 搜索条件对应的输入框
      searchPlaceholder: null, // 搜索条件对应的输入框的输入内容信息提示
      isSearchConShow: false,
      formInline: {},
      editDepartmentVisible: false,
      addOrEdit: 'add',
      sourceOptions: [
        { name: '官网推广', id: '0' },
        { name: '顾问录入', id: '1' },
        { name: '第三方数据', id: '2' }
      ],
      multipleSelection: []
    }
  },
  watch: {
    listData: {
      handler: function(val, oldVal) {
        this.list = val.list
        // this.tableData = val
      },
      deep: true,
      immediate: true
    },
    formInline: {
      handler: function(val, oldVal) {
        // console.log('formInline', val)
      },
      deep: true,
      immediate: true
    },
    // 监听搜索条件
    searchCriteria: {
      handler: function(val, oldVal) {
        if (val !== null) {
          this.isSearchConShow = true
          this.searchPlaceholder = '请输入' + this.searchCriteriaTxt[val]
        } else {
          this.isSearchConShow = false
          this.searchPlaceholder = ''
        }
        this.searchCon = ''
        this.formInline.companyName = null
        this.formInline.latentNickName = null
        this.formInline.latentUserMobile = null
        this.formInline.latentTelephone = null
      },
      deep: true,
      immediate: true
    },
    // 监听搜索条件对应的输入框
    searchCon: {
      handler: function(val, oldVal) {
        if (this.searchCriteria !== null) {
          this.formInline[this.searchCriteria] = val
          console.log(this.formInline)
        }
      },
      deep: true,
      immediate: true
    },
    checkedValue: function(new_v, old_v) {
      this.answer = this.checkedValue
    }
  },
  methods: {

    /**
       * @desc 搜索
       * @author jinlijing
       */
    onSubmit() {
      this.$message.success('搜索成功!')
      this.$emit('fetchData', this.formInline)
    },

    /**
       * @desc 重置
       * @author jinlijing
       */
    onReset() {
      this.formInline = {
        start: '1',
        length: '10',
        currentUserId: '133',
        deleteStatus: '0'
      }
      this.searchCriteria = null
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

    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val
    },

    // 捡入
    handlePickUp(val) {
      this.$message.success('捡入成功')
    },

    // 批量捡入
    handlePatchPickUp() {
      console.log(this.multipleSelection)
    }
  }
}
</script>

<style lang="scss" scoped>
  .customer-list-table{
    .el-container{
      border: 1px solid #dfe6ec;
      margin-bottom: 30px;
      p{
        background: #f5f7fa;
        margin: 0;
        padding: 12px 10px;
        font-size: 18px;
      }
    }
    .el-form{
      padding: 0 15px;
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
