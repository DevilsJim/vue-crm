<template>
  <div class="customer-list-table">
    <!--搜索-->
    <el-form :inline="true" :model="formInline" size="small">
      <!-- 选择搜索条件 -->
      <el-form-item>
        <el-select v-model="searchCriteria" value="" clearable placeholder="请选择搜索条件">
          <el-option label="公司名称" value="companyName" />
          <el-option label="联系人姓名" value="latentNickName" />
          <!-- <el-option label="联系人手机号" value="latentUserMobile" />
          <el-option label="联系人座机号" value="latentTelephone" />-->
        </el-select>
      </el-form-item>
      <!-- 输对应搜索条件的内容 -->
      <el-form-item :class="{'show': isSearchConShow}" class="search-con">
        <el-input v-model="searchCon" :placeholder="searchPlaceholder" clearable />
      </el-form-item>
      <!-- 下次跟进时间 -->
      <el-form-item>
        <el-date-picker
          v-model="createdTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始创建时间"
          end-placeholder="结束创建时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          @change="handleCreatedTime"
        />
      </el-form-item>
      <!-- 客户标签 -->
      <el-form-item>
        <el-select v-model="tagsIdList" value="" multiple clearable placeholder="请选择客户标签">
          <el-option-group
            v-for="tag in tagsList"
            :key="tag.tagId"
            :label="tag.tagName"
          >
            <el-option
              v-for="item in tag.listTag"
              :key="item.tagId"
              :value="item.tagId"
              :label="item.tagName"
            />
          </el-option-group>
        </el-select>
      </el-form-item>
      <!-- 是否付费 -->
      <el-form-item>
        <el-select v-model="formInline.payed" value="" clearable placeholder="请选择客户是否付费">
          <el-option label="未付费" value="0" />
          <el-option label="已付费" value="1" />
        </el-select>
      </el-form-item>
      <!-- 公司所在地 -->
      <el-form-item>
        <el-input v-model="formInline.licenseAddress" placeholder="请输入公司所在地" />
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
      <el-table-column label="联系人信息" width="195" class-name="user-info" header-align="center">
        <template slot-scope="scope">
          <span class="user-name">姓名: {{ scope.row.latentNickName }}</span>
          <span class="user-phone">电话: {{ (scope.row.latentUserMobile == null || scope.row.latentUserMobile == "") ? "" : scope.row.latentUserMobile.substr(0,3) + "****" + scope.row.latentUserMobile.substr(7,scope.row.latentUserMobile.length -6) }}</span>
          <el-tooltip placement="top" content="点击发送短信">
            <svg-icon icon-class="mail" class-name="mail" />
          </el-tooltip>
          <el-tooltip placement="top" content="点击拨打电话">
            <svg-icon icon-class="phone" class-name="phone" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="客户标签" width="200" class-name="tags" header-align="center">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.tagsList" :key="item.tagId">{{ item.tagName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="释放原因" min-width="120" align="center">
        <template slot-scope="scope">
          <span>{{ undefinedToNull(scope.row.lastDynamicLogRemark)[0] }}</span>
          <br>
          <span>{{ undefinedToNull(scope.row.lastDynamicLogRemark)[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户所在地" prop="licenseAddress" min-width="120" />
      <el-table-column label="行业" prop="companyBusinessProfession" width="80" align="center" />
      <el-table-column label="最新动态" min-width="160" class-name="dynamic">
        <template slot-scope="scope">
          <span>{{ scope.row.lastDynamicLogOperator }}：{{ scope.row.lastDynamicLogName | lastDynamicLogNameFilter }}</span>
          <span>{{ scope.row.lastDynamicLogTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付费金额" prop="payMoney" sortable width="105" align="center" />
      <el-table-column label="创建时间" prop="createTime" width="160" align="center" />
      <!--<el-table-column label="意向业务" width="80" align="center">
        <template slot-scope="scope">{{ scope.row.businessPurpose | businessPurposeFilter }}</template>
      </el-table-column>-->
      <el-table-column label="操作" align="center" class-name="operation" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="$emit('pickUpPrivate', scope.row.companyId)">捡入私海</el-button>
        </template>
      </el-table-column>
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
  </div>
</template>

<script>
export default {
  name: 'CustomerListTable',
  filters: {
    // 意向业务
    businessPurposeFilter(status) {
      const statusMap = {
        1: '商标服务',
        2: '专利',
        3: '版权',
        4: '财税',
        5: '其他'
      }
      return statusMap[status]
    },
    // 客户类型
    lastDynamicLogNameFilter(status) {
      const statusMap = {
        1: '跟进记录',
        2: '释放到公海',
        3: '转移客户',
        4: '渐入私海',
        5: '分配客户',
        6: '变更客户',
        7: '创建客户'
      }
      return statusMap[status]
    }
  },
  props: {
    listData: {
      type: Object,
      default: null
    },
    tagsList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      list: [],
      searchCriteriaTxt: { // 当选择搜索条件是，展示对应搜索条件输入框的 placeholder 值
        companyName: '公司名称',
        latentNickName: '联系人姓名',
        latentUserMobile: '联系人手机号',
        latentTelephone: '联系人座机号'
      },
      searchCriteria: null, // 搜索条件
      searchCon: '', // 搜索条件对应的输入框
      searchPlaceholder: null, // 搜索条件对应的输入框的输入内容信息提示
      isSearchConShow: false,
      createdTime: null, // 创建时间
      formInline: { // 传参字段
        start: '1',
        length: '10',
        deleteStatus: '0'
      },
      tagsIdList: [] // 客户标签
    }
  },
  watch: {
    listData: {
      handler: function(val, oldVal) {
        if (val.list.length > 0) {
          val.list.forEach((list) => {
            const curTagsList = []
            if (val.list.length === 0) {
              return
            }
            list.tags.forEach((tags) => {
              if (list.tags.length === 0) {
                return
              }
              tags.listTag.forEach((item) => {
                if (tags.listTag === 0) {
                  return
                }
                if (curTagsList.length < 3) {
                  curTagsList.push(item)
                }
              })
            })
            list.tagsList = curTagsList
          })
        }
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
    // 选择客户标签
    tagsIdList: {
      handler(val, oldVal) {
        this.$set(this.formInline, 'tagIds', val.toString())
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    undefinedToNull(val) {
      let Arr = ['-', '-']
      if (val && val.length > 0) {
        val = val.replace(/undefined/ig, '-')
        if (val.includes('<br>')) {
          Arr = val.split('<br>')
        } else {
          return [val, '-']
        }
      }
      return Arr
    },
    // 选择创建时间
    handleCreatedTime(val) {
      if (val !== null) {
        this.$set(this.formInline, 'startCreatedTime', val[0])
        this.$set(this.formInline, 'endCreatedTime', val[1])
      } else {
        this.$set(this.formInline, 'startCreatedTime', '')
        this.$set(this.formInline, 'endCreatedTime', '')
      }
    },
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
        currentUserId: '133',
        deleteStatus: '0'
      }
      this.searchCriteria = null
      this.createdTime = null
      this.$message('重置搜索项!')
    },
    // 每页条数
    handleSizeChange(val) {
      this.$set(this.formInline, 'length', val)
      this.$emit('fetchData', this.formInline)
    },
    // 当前页 listData.list.start
    handleCurrentChange(val) {
      this.$set(this.formInline, 'start', val)
      this.$emit('fetchData', this.formInline)
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
        font-size: 16px;
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
