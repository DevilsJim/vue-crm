<template>
  <div class="app-container customer-detail">
    <!-- header -->
    <el-container height="auto" direction="horizontal">
      <div style="width: 100%;">
        <h2 style="float: left;">
          {{ companyInfo.companyName }}
        </h2>
        &nbsp;
        <el-button v-if="isUsable" size="mini" type="success" @click="handleEditCluesDetail(companyInfo)">编辑</el-button>
        <div style="float: right">
          <el-button v-if="isUsable" size="mini" type="primary" @click="handleCloseClues(companyInfo)">关闭</el-button>
          <el-button v-if="isUsable" size="mini" type="primary" @click="handleReleaseClues(companyInfo.companyId)">释放到线索池</el-button>
          <el-button v-if="isUsable" size="mini" type="primary" @click="handlLaterDispose(companyInfo.companyId)">稍后处理</el-button>
          <el-button v-if="isUsable" size="mini" type="success" @click="handlCluesToCustomer(companyInfo)">转为客户</el-button>
        </div>
      </div>
    </el-container>
    <el-container height="auto" direction="horizontal">
      <div style="width: 100%">
        <h5>
          <span>
            公司地址： {{ companyInfo.address }}
          </span>
          <span style="margin-left: 10%">
            初始来源： {{ companyInfo.source }}
          </span>
          <span style="margin-left: 10%">
            录入时间： {{ companyInfo.createTime }}
          </span>
        </h5>
      </div>
    </el-container>
    <el-container height="auto" direction="horizontal">
      <div style="width: 100%">
        <h5>
          线索备注：{{ companyInfo.desc }}
        </h5>
      </div>
    </el-container>

    <el-container direction="horizontal" class="list-con">
      <el-aside style="width: 100%">
        <p class="title-p">
          联系人
          <el-button v-if="isUsable" style="float: right;" size="mini" type="success" @click="handleAddEditContacts(false)">添加联系人</el-button>
        </p>
        <!-- table -->
        <el-table
          :data="gridDataLatent.list"
          element-loading-text="Loading"
          fit
          border
          highlight-current-row
          class="company-info-table"
        >
          <el-table-column label="姓名" prop="nickname" width="120" class-name="user-info" align="center" />
          <el-table-column label="职位" prop="duty" width="120" class-name="tags" align="center" />
          <el-table-column label="电话" width="120" align="center">
            <template slot-scope="scope">
              {{ scope.row.userMobile }}
            </template>
          </el-table-column>
          <el-table-column label="座机号" prop="telephone" width="120" align="center" />
          <el-table-column label="微信" prop="wxNumber" width="180" align="center" />
          <el-table-column label="QQ" prop="qqNumber" width="120" align="center" />
          <el-table-column label="邮箱" prop="userEmail" width="200" align="center" />
          <el-table-column label="状态" width="150" align="center">
            <template slot-scope="scope"><span v-if="scope.row.onJobFlag == 1">在职</span><span v-if="scope.row.onJobFlag == 0">离职</span></template>
          </el-table-column>
          <el-table-column v-if="isUsable" label="操作" align="center" min-width="230" fixed="right">
            <template slot-scope="scope">
              <el-button type="success" size="mini" icon="el-icon-edit" @click="handleAddEditContacts(true, scope.row.userId)">编辑</el-button>
              <el-button v-if="scope.row.mainUserFlag === 1" type="primary" size="mini" @click="handleChooseOrderWay(scope.row.userId)">设为主显</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页信息-->
        <el-pagination
          background
          :current-page="gridDataLatent.userParams.start"
          :page-size="gridDataLatent.userParams.length"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination-table"
          :total="gridDataLatent.userParams.total"
          @size-change="handleLatentSizeChange"
          @current-change="handleLatentCurrentChange"
        />
      </el-aside>
    </el-container>
    <br>
    <el-container direction="horizontal" class="list-con">
      <el-tabs v-model="activeTabsName" type="border-card" style="width: 100%">
        <!-- 动态记录 -->
        <el-tab-pane label="动态记录" name="first">
          <el-table :data="gridData3.list" border>
            <el-table-column width="200" prop="dynamicLogName" label="动态名称" align="center" />
            <el-table-column width="200" prop="dealTime" label="时间" align="center" />
            <el-table-column width="200" prop="dealUserName" label="操作人" align="center" />
            <el-table-column prop="operationContent" label="操作内容" align="center">
              <template slot-scope="scope">
                <el-row>老顾问： {{ scope.row.oldCounselorName }}</el-row>
                <el-row>新顾问： {{ scope.row.newCounselorName }}</el-row>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            :current-page="gridData3.start"
            :page-size="gridData3.length"
            layout="total, sizes, prev, pager, next, jumper"
            :total="gridData3.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-tab-pane>
      </el-tabs>
    </el-container>

    <!-- 关闭线索 -->
    <close-clues-dialog :close-clues-visible.sync="closeCluesVisible" :clues-data-visible.sync="cluesData" />

    <!-- 转为客户 -->
    <clues-to-customer-dialog :clues-to-customer-visible.sync="cluesToCustomerVisible" :clues-data-visible.sync="cluesData" />

    <!-- 编辑公司信息 -->
    <edit-clues-detail-dialog :visible.sync="editCluesDetailVisible" :clues-data-visible.sync="cluesData" />

    <!-- 添加编辑联系人 -->
    <add-edit-contacts-dialog :visible.sync="addEditContactsVisible" :add-edit-contact="addEditContact" :current-contact-id="currentContactId" :current-company-id="currentCompanyId" />
  </div>
</template>

<script>
import { getCustomerDynamics, getCompanyDetail, getLatentUserPager, getCompanyChildrenDetail, setChild2Parent, getLeaderInfo, updateBusiness, updateCompanyInfo, updateLatentUserDetail } from 'api/customerDetail'
import CloseCluesDialog from './components/CloseCluesDialog'
// import ReleaseCluesDialog from './components/ReleaseCluesDialog'
import CluesToCustomerDialog from './components/CluesToCustomerDialog'
import EditCluesDetailDialog from './components/EditCluesDetailDialog'
import AddEditContactsDialog from './components/AddEditContactsDialog'

export default {
  inject: ['reload'],
  name: 'CluesDetail',
  components: {
    AddEditContactsDialog,
    EditCluesDetailDialog,
    CluesToCustomerDialog,
    // ReleaseCluesDialog,
    CloseCluesDialog
  },
  data() {
    return {
      currentCompanyId: null,
      currentContactId: null,
      activeTabsName: 'first',
      activeTabsName1: 'fourth1',
      closeCluesVisible: false,
      cluesToCustomerVisible: false,
      addEditContact: true,
      businessPkSid: null,
      list: null,
      cluesData: {},
      formInline: {
        start: 1,
        length: 10,
        deleteStatus: '0',
        companyId: this.currentCompanyId
      },
      commonParams: {
        deleteStatus: '0'
      },
      businessFormInline: {
        start: 1,
        length: 3
      },
      listLoading: true,
      gridData3: {
        list: [],
        listLoading: true,
        total: 0
      },
      gridDataLatent: {
        list: [],
        listLoading: true,
        userParams: {
          start: 1,
          length: 10,
          companyId: null
        }
      },
      companyChildren: [],
      gridData2: [],
      activeNames: [],
      editCustomerDetailVisible: false,
      addEditContactsVisible: false,
      editCluesDetailVisible: false,
      companyInfo: {
        companyName: '测试公司',
        companyId: 1,
        address: '北京市海淀区',
        source: '官网推广',
        createTime: '2019-07-23 17:00:00',
        desc: '改线索的客户是青岛一起搜索在线科技有限公司，多次打电话未能接通，这个联系方式有问题，但是微信可以尝试添加'
      },
      leader: {},
      isUsable: false
    }
  },
  watch: {
  },
  created() {
    this.currentCompanyId = this.$route.params.currentCompanyId
    this.gridDataLatent.userParams.companyId = this.currentCompanyId
    this.commonParams.companyId = this.$route.params.currentCompanyId
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getCustomerDynamic()
      this.getCompanyInfo()
      this.getLatentInfo()
    },
    // 获取公司的动态记录
    getCustomerDynamic() {
      const map = new Map()
      map.set(1, '跟进记录')
      map.set(2, '释放到海')
      map.set(3, '转移客户')
      map.set(4, '捡入私海')
      map.set(5, '分配客户')
      map.set(6, '变更客户')
      map.set(7, '创建客户')
      this.$set(this.gridData3, 'listLoading', true)
      this.formInline.companyId = this.$route.params.currentCompanyId
      getCustomerDynamics(this.formInline).then(response => {
        this.gridData3 = Object.assign({}, this.gridData3, {
          list: response.data.data,
          total: response.data.total,
          start: response.data.start,
          length: response.data.length,
          listLoading: false
        })
        this.formInline.total = response.data.total
        this.gridData3.list.map(customerDynamic => {
          customerDynamic.dynamicLogName = map.get(customerDynamic.dynamicLogName)
          if (customerDynamic.oldCounselorName === null || customerDynamic.newCounselorName === null) {
            customerDynamic.info = ''
          } else {
            customerDynamic.info = ` 旧顾问: ${customerDynamic.oldCounselorName}  新顾问：${customerDynamic.newCounselorName}`
          }
          return customerDynamic
        })
      }).catch((err) => {
        console.log('err', err)
      })
    },
    //  获取公司的详细信息
    getCompanyInfo() {
      const _this = this
      // 查询主公司信息
      if (_this.currentCompanyId == null) {
        _this.currentCompanyId = _this.$route.params.currentCompanyId
      }
      getCompanyDetail(this.commonParams).then(response => {
        if (response.data.data.length === 1) {
          this.companyInfo = response.data.data[0]
        }
      }).catch((err) => {
        console.log('err', err)
      })
      // 查询子公司信息
      getCompanyChildrenDetail({ companyId: _this.currentCompanyId }).then(response => {
        if (response.data.data.length > 0) {
          this.companyChildren = response.data.data
        }
      })
      // 获取顾问信息
      getLeaderInfo({ companyId: _this.currentCompanyId }).then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          this.leader = response.data.data[0]
        }
      })
    },
    // 获取公司下联系人信息
    getLatentInfo() {
      const _this = this
      _this.$set(_this.gridDataLatent, 'listLoading', true)
      getLatentUserPager(_this.gridDataLatent.userParams).then(response => {
        _this.gridDataLatent = Object.assign({}, _this.gridDataLatent, {
          list: response.data.data,
          listLoading: false
        })
        _this.$set(_this.gridDataLatent.userParams, 'total', response.data.total)
        _this.$set(_this.gridDataLatent.userParams, 'start', response.data.start)
        _this.$set(_this.gridDataLatent.userParams, 'length', response.data.length)

        _this.gridDataLatent.list.map(user => {
          if (user.onJobFlag === 0) {
            user.onJobFlag = true
            return user
          } else {
            user.onJobFlag = false
            return user
          }
        })
      }).catch((err) => {
        this.$message.error(err)
      })
    },

    // 设置为父公司信息
    setChild2ParentInfo(val) {
      const _this = this
      setChild2Parent({ companyId: val }).then(response => {
        if (response.data.code === 10000) {
          this.$message.success(response.data.message)
          getCompanyChildrenDetail({ companyId: _this.currentCompanyId }).then(response => {
            if (response.data.data.length > 0) {
              this.companyChildren = response.data.data
            }
          })
        } else {
          this.$message.error('操作失败')
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    updateData(model, index) {
      const _this = this
      const stagePopperClass = 'stage-change' + index
      updateBusiness(model).then(response => {
        if (response.data.code === 10000) {
          clearTimeout(this.timer)
          document.getElementsByClassName(stagePopperClass)[0].style.display = 'none'
          _this.$message.success(response.data.message)
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error.toString())
      })
    },
    handleSizeChange(val) {
      this.formInline.length = val
      this.getCustomerDynamic()
    },
    handleCurrentChange(val) {
      this.formInline.start = val
      this.getCustomerDynamic()
    },

    handleLatentCurrentChange(val) {
      this.gridDataLatent.userParams.start = val
      this.getLatentInfo()
    },
    handleLatentSizeChange(val) {
      this.gridDataLatent.userParams.length = val
      this.getLatentInfo()
    },
    handleEditCustomerDetail() {
      this.editCustomerDetailVisible = true
    },
    handleFollowUp() {
      this.followUpVisible = true
    },

    /*
      * 添加/编辑联系人
      * type: 判断弹窗类型，true 编辑联系人， false 添加联系人
      * currentContactId: 当前用户的userId
      * */
    handleAddEditContacts(type, currentContactId) {
      this.currentContactId = currentContactId
      this.addEditContact = type
      this.addEditContactsVisible = true
    },

    /*
      * 设置用户为主显
      * pkSid: id
      * companyId: 公司ID
      * */
    handleChooseOrderWay(userId) {
      const _this = this
      const params = {
        companyId: _this.companyInfo.companyId,
        pkSid: _this.companyInfo.pkSid,
        mainLatentUserId: userId
      }
      updateCompanyInfo(params).then(response => {
        if (response.data.code === 10000) {
          _this.$message.success(response.data.message)
          this.getLatentInfo()
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error.toString())
      })
      this.chooseOrderWayVisible = true
    },

    updateUserStatus(item) {
      const _this = this
      let onJobFlag = 0
      item.onJobFlag === true ? onJobFlag = 0 : onJobFlag = 1
      updateLatentUserDetail({ pkSid: item.pkSid, onJobFlag: onJobFlag }).then(response => {
        if (response.data.code === 10000) {
          _this.getLatentInfo()
          _this.$message.success(response.data.message)
        } else {
          _this.$message.errow(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error.toString())
      })
    },

    // 关闭线索
    handleCloseClues(val) {
      this.closeCluesVisible = true
      this.cluesData = val
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

    // 释放线索
    handleReleaseClues(val) {
      this.reload()
    },

    // 编辑公司信息
    handleEditCluesDetail(val) {
      this.editCluesDetailVisible = true
      this.cluesData = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .customer-detail{
    .el-container{
      padding: 0 0 5px 10px;
      h2{
        vertical-align: top;
        margin: 0;
        .svg-icon{
          font-size: 22px;
          vertical-align: top;
          margin-top: 4px;
          cursor: pointer;
          &.edit{
            font-size: 20px;
            margin-left: 5px;
          }
        }
      }
      p.info{
        color: #4a4a4a;
      }
      .con-right{
        /deep/ .el-button{
          span{
            font-size: 15px;
          }
        }
      }
      &.list-con{
        padding: 0;
        .el-aside{
          border: 1px solid #dfe6ec;
          p.title-p{
            position: relative;
            font-size: 16px;
            color: #4a4a4a;
            background: #f5f7fa;
            margin: 0;
            padding: 15px;
            .svg-icon{
              vertical-align: top;
              &.opportunity{
                margin-right: 5px;
              }
              &.plus-square{
                cursor: pointer;
                position: absolute;
                top: 15px;
                right: 20px;
              }
            }
          }
          .el-row{
            color: #606266;
            font-size: 15px;
            padding: 0 5px;
            margin: 0 10px;
            /*border-bottom: 1px solid #dfe6ec;*/
            height: 45px;
            line-height: 45px;
          }
          .opportunity-title{
            margin: 0;
            padding: 0 17px;
            i{
              cursor: pointer;
            }
          }
          .opportunity-con{
            border-bottom: 1px solid #dfe6ec;
          }
          .el-tag{
            cursor: default;
          }
          .svg-icon{
            &.right{
              font-size: 18px;
              color: #1890ff;
              cursor: pointer;
              vertical-align: top;
              margin: 15px 0 0 0;
            }
            &.flag{
              color: #13954d;
              font-size: 24px;
              margin: 0 2px 0 -5px;
            }
          }
          .el-collapse{
            .el-collapse-item{
              border-bottom: 1px solid #e6ebf5;
            }
            /deep/ .el-collapse-item__header{
              font-size: 16px;
              color: #4a4a4a;
              font-weight: normal;
              padding: 0 15px;
              border-bottom-color: transparent;
              &.is-active{
                border-bottom-color: #e6ebf5;
              }
            }
            /deep/ .el-collapse-item__content{
              padding-bottom: 5px;
            }
            /deep/ .el-collapse-item__wrap{
              border-bottom: none;
            }
          }
        }
        .el-main{
          padding: 0;
          .el-tabs{
            &.el-tabs--border-card{
              box-shadow: none;
              border-left: none;
              /deep/ .el-tabs__header{
                height: 51px;
                line-height: 51px;
                .el-tabs__item{
                  height: 52px;
                  line-height: 52px;
                  font-size: 15px;
                  color: #4a4a4a;
                  font-weight: normal;
                  &.is-active{
                    color: #1890ff;
                  }
                }
              }
            }
            .el-tabs__content{
              .el-tab-pane{
                &.business-info {
                  font-size: 15px;
                  border: 1px solid #dfe6ec;
                  border-bottom: none;
                  /*border-left: none;*/
                  .el-row {
                    /*height: 48px;*/
                    line-height: 1.5;
                    /*text-align: center;*/
                    color: #525252;
                    border-bottom: 1px solid #dfe6ec;
                    .el-col {
                      padding: 12px 10px;
                      /*border-left: 1px solid #dfe6ec;*/
                    }
                  }
                }
                .item-tabs{
                  /deep/ .el-tabs__header {
                    height: auto;
                    line-height: 1.5;
                    .el-tabs__item{
                      font-size: 15px;
                      padding-left: 5px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

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
    }
    .el-table{
      margin-bottom: 20px;
      /deep/ td{
        padding: 6px 0;
      }
      /deep/ .el-table__header{
        th{
          color: #808080;
        }
      }
      .svg-icon{
        cursor: pointer;
        display: inline-block;
        font-size: 18px;
      }
      .name{
        span{
          display: inline-block;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          width: 160px;
          vertical-align: top;
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
      .tags{
        .el-tag{
          margin-right: 5px;
          font-size: 14px;
          height: 30px;
          line-height: 28px;
          padding: 0 8px;
        }
        .el-tag:last-child{
          margin-right: 0;
        }
      }
      .el-switch {
        /deep/ .el-switch__label{
          color: #777;
          &.is-active{
            color: #1890ff;
          }
        }
      }
    }
    .el-pagination{
      text-align: right;
      &.pagination-table{
        margin: 0 0 35px;
      }
    }
  }

  .el-popover.el-popper.stage-change{
    h2{
      font-size: 16px;
      margin: 0 0 15px 0;
      border-bottom: 1px solid #dcdcdc;
      padding-bottom: 12px;
    }
  }
</style>
