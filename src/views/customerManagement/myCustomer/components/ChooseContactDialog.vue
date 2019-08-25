<template>
  <el-dialog title="选择联系人" class="choose-customer-dialog" :visible.sync="templateDialog" append-to-body width="750px" @close="closeDia()">
    <!-- 搜索 -->
    <el-form :inline="true" :model="formInline" label-width="80px" size="mini">
      <!--联系人姓名-->
      <el-form-item prop="nickname">
        <el-input v-model="formInline.nickname" clearable placeholder="请输入联系人姓名" />
      </el-form-item>
      <!--职位-->
      <el-form-item prop="nickname">
        <el-input v-model="formInline.duty" clearable placeholder="请输入职位" />
      </el-form-item>
      <!--联系人电话-->
      <el-form-item prop="nickname">
        <el-input v-model="formInline.userMobile" clearable placeholder="请输入联系人电话" />
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" size="mini" @click="fetchData">搜索</el-button>
        <el-button type="primary" plain icon="el-icon-refresh" size="mini" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="listData.list" border highlight-current-row>
      <el-table-column align="center" width="80" label="选择">
        <template slot-scope="scope">
          <el-radio v-model="userId" :label="scope.row.userId" @change.native="getContactSelect(scope.$index,scope.row)"><i /></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="nickname" label="联系人姓名" />
      <el-table-column prop="duty" label="职位" />
      <el-table-column prop="userMobile" label="联系电话" />
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="listData.start"
      :page-size="listData.length"
      :total="listData.total"
      style="text-align: right; margin-top: 10px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 确定，取消 -->
    <el-row style="text-align: right; margin-top: 25px; padding: 0">
      <el-col :span="24">
        <el-button size="small" @click="templateDialog = false">取消</el-button>
        <el-button size="small" type="primary" plain @click="save">确认</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getLatentUserPager } from 'api/customerDetail'
export default {
  name: 'ChooseContactDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    companyId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: false,
      userId: null, // 联系人Id
      contactSelect: {}, // 选择联系人数据
      formInline: {
        start: '1', // 第几页
        length: '10' // 每页几条
      },
      listData: {
        listLoading: false
      }
    }
  },
  watch: {
    visible(val, oldVal) {
      this.templateDialog = val
      if (val) {
        this.fetchData()
      }
    },
    companyId: {
      handler(val, oldVal) {
        this.$set(this.formInline, 'companyId', val)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 获取联系人列表
    fetchData() {
      const companyId = this.formInline.companyId
      if (companyId && companyId !== null) {
        this.$set(this.listData, 'listLoading', true)
        getLatentUserPager(this.formInline).then(response => {
          if (response.data.code === 10000) {
            this.listData = Object.assign({}, this.listData, {
              list: response.data.data,
              total: response.data.total,
              start: response.data.start,
              length: response.data.length,
              listLoading: false
            })
            this.$message.success('列表更新！')
          } else {
            this.$message.error(response.data.message)
          }
        }).catch((err) => {
          console.log('err', err)
        })
      }
    },
    // 关闭窗口
    closeDia() {
      this.formInline = {
        start: '1', // 第几页
        length: '10' // 每页几条
      }
      this.$emit('update:visible', false)
    },
    // 保存
    save() {
      if (this.userId && this.userId !== null) {
        this.$emit('contactData', this.contactSelect)
        this.closeDia()
      } else {
        this.$message.warning('请选择联系人！')
      }
    },
    // 选择联系人
    getContactSelect(index, row) {
      this.contactSelect = Object.assign({}, this.contactSelect, {
        userId: row.userId,
        nickname: row.nickname,
        userMobile: row.userMobile
      })
    },
    // 重置
    onReset() {
      this.formInline = {
        start: '1',
        length: '10',
        companyId: this.companyId
      }
      this.userId = null
      this.contactSelect = {}
      this.$message('重置搜索项!')
    },
    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$set(this.formInline, 'length', val)
      this.fetchData()
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$set(this.formInline, 'start', val)
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
.out-dialog{
  /deep/ .el-dialog{
    .el-dialog__header{
      border-bottom: none;
    }
    .el-dialog__body{
      padding:0
    }
    .el-dialog__footer{
      padding: 20px;
    }
  }
}
.choose-customer-dialog{
  /deep/ .el-dialog {
    .el-dialog__body {
      padding: 20px 24px 30px;
    }
  }
}
.el-row{
  padding: 0 20px;
}
.el-form{
  /deep/ .el-form-item__label, /deep/ .el-form-item__content, /deep/ .el-radio{
    font-weight: normal;
  }
  /deep/ .el-form-item__content{
    width: 160px;
    .el-select {
      width: 100%;
    }
  }
  .label-style{
    margin-top: 10px;
    /deep/ .el-form-item__label{
      font-weight: bold;
    }
    /deep/ .el-form-item__content{
      margin-top: 10px;
    }
  }
  .input-cursor{
    /deep/ .el-input__inner{
      cursor: pointer;
    }
  }
  .el-form-item.save-customer{
    margin-top: 20px;
  }
}
.el-tabs{
    &.el-tabs--border-card{
      box-shadow: none;
      border-bottom: none;
      border-right: none;
      border-left: none;
      /deep/ .el-tabs__content{
        padding: 10px 15px 0;
        header.title{
          position: relative;
          font-size: 16px;
          line-height: 50px;
          margin-bottom: 25px;
          border-bottom: 1px solid #ebebeb;
          color: #333;
          .el-button.add-address-btn{
            position: absolute;
            right: 20px;
            top: 6px;
          }
        }
      }
      /deep/ .el-tabs__item{
        color: #5a5a5a;
        font-weight: normal;
      }
    }
  }
</style>
