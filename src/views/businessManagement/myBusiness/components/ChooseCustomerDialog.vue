<template>
  <el-dialog title="选择客户" class="choose-customer-dialog" :visible.sync="templateDialog" append-to-body width="750px" @close="closeDia('ruleForm')">
    <!-- 搜索 -->
    <el-form ref="ruleForm" :inline="true" :rules="rules" :model="formInline" label-width="90px" size="mini">
      <!--客户姓名-->
      <el-form-item>
        <el-input v-model="formInline.companyName" clearable placeholder="请输入客户名称" />
      </el-form-item>
      <!--客户来源-->
      <el-form-item prop="sourceType">
        <el-select v-model="formInline.sourceType" value="" clearable placeholder="请选择客户来源">
          <el-option label="我的客户" value="1" />
          <el-option label="商机客户" value="2" />
        </el-select>
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
        <el-button type="primary" plain icon="el-icon-search" size="mini" @click="onSubmit('ruleForm')">搜索</el-button>
        <el-button type="primary" plain icon="el-icon-refresh" size="mini" @click="onReset('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :data="listData.list" border highlight-current-row>
      <el-table-column align="center" width="80" label="选择">
        <template slot-scope="scope">
          <el-radio v-model="customerId" :label="scope.row.companyId" @change.native="getCustomerSelection(scope.$index,scope.row)"><i /></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="客户名称" />
      <el-table-column label="客户类型">
        <template slot-scope="scope">{{ scope.row.companyType | companyTypeFilter }}</template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align: right; margin-top: 10px;"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="listData.start"
      :page-size="listData.length"
      :total="listData.total"
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
import { getMyCustomerList, getBusinessCustomerList } from 'api/business'
export default {
  name: 'ChooseCustomerDialog',
  filters: {
    // 客户类型
    companyTypeFilter(status) {
      const statusMap = {
        '0': '个人',
        '1': '公司',
        '2': '个体工商户'
      }
      return statusMap[status]
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: false,
      customerId: null, // 客户ID
      customerSelect: {}, // 选择客户数据
      formInline: {
        start: '1', // 第几页
        length: '10', // 每页几条
        deleteStatus: '0', // 是否删除0：未删除，1：已删除
        selectType: '0', // 查询类别 0:全部
        companyType: '0', // 公司类型 -1.全部 0:个人，1：公司 2.个体工商户
        sourceType: '1' // 客户来源 1.我的客户 2.商机客户
      },
      rules: {
        sourceType: [
          { required: true, message: '请选择客户来源', trigger: 'change' }
        ]
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
        this.fetchCustomerData()
      }
    }
  },
  methods: {
    // 获取我的客户列表
    fetchCustomerData() {
      this.$set(this.listData, 'listLoading', true)
      getMyCustomerList(this.formInline).then(response => {
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
    },
    // 获取商机客户列表
    fetchBusinessData() {
      this.$set(this.listData, 'listLoading', true)
      getBusinessCustomerList(this.formInline).then(response => {
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
    },
    // 关闭弹窗
    closeDia(formName) {
      this.formInline.companyName = null
      this.listData = {}
      this.customerId = null
      this.customerSelect = {}
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false)
    },
    // 保存
    save() {
      if (this.customerId && this.customerId !== null) {
        this.$emit('customerData', this.customerSelect)
        this.closeDia('ruleForm')
      } else {
        this.$message.warning('请选择客户！')
      }
    },
    //  选择客户
    getCustomerSelection(index, row) {
      console.log(row)
      this.customerSelect = Object.assign({}, this.customerSelect, {
        companyId: row.companyId,
        companyName: row.companyName,
        sourceType: this.formInline.sourceType // 客户来源 1.我的客户 2.商机客户
      })
    },
    // 搜索
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.customerId = null
          this.customerSelect = {}
          const sourceType = this.formInline.sourceType
          if (sourceType === '1') {
            this.fetchCustomerData()
          } else if (sourceType === '2') {
            this.fetchBusinessData()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置
    onReset(formName) {
      this.formInline = {
        start: '1',
        length: '10',
        deleteStatus: '0',
        selectType: '0',
        companyType: '0',
        sourceType: null
      }
      this.customerId = null
      this.customerSelect = {}
      this.$refs[formName].resetFields()
      this.$message('重置搜索项!')
    },
    // 每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$set(this.formInline, 'length', val)
      this.onSubmit()
    },
    // 当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$set(this.formInline, 'start', val)
      this.onSubmit()
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
  /deep/ .el-form-item__content .el-select {
    width: 100%;
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
