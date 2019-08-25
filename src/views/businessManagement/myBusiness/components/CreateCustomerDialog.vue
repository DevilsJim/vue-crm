<template>
  <el-dialog append-to-body title="创建客户" :close-on-click-modal="flag" :visible.sync="templateDialog" width="750px" @close="closeDia('ruleForm')">
    <el-form ref="ruleForm" :rules="rules" :model="temp" label-width="100px" size="mini">
      <!-- 客户类型 -->
      <el-form-item label="客户类型" prop="companyType" class="label-style">
        <el-radio-group v-model="temp.companyType">
          <el-radio :label="0">个人</el-radio>
          <el-radio :label="1">公司</el-radio>
          <el-radio :label="2">个体工商户</el-radio>
        </el-radio-group>
      </el-form-item>

      <template v-if="temp.companyType === 0">
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="姓名:" prop="nickname">
              <el-input v-model="temp.nickname" placeholder="请输入客户姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="行业领域:">
              <el-input v-model="temp.companyBusinessProfession" placeholder="请输入行业领域" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="地址:">
              <el-input v-model="temp.licenseAddress" placeholder="请输入地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="手机:" prop="userMobile">
              <el-input v-model="temp.userMobile" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="微信:">
              <el-input v-model="temp.wxNumber" placeholder="请输入微信号" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="邮箱:">
              <el-input v-model="temp.userEmail" placeholder="请输入邮箱地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="QQ:">
              <el-input v-model="temp.qqNumber" placeholder="请输入QQ" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="客户星级:">
              <el-select clearable value="" placeholder="请选择客户星级">
                <el-option label="一星客户" value="1" />
                <el-option label="二星客户" value="2" />
                <el-option label="三星客户" value="3" />
                <el-option label="四星客户" value="3" />
                <el-option label="五星客户" value="3" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="渠道用户:">
              <el-radio-group v-model="temp.channelFlag">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:">
              <el-input v-model="temp.remark" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <template v-else>
        <!-- 客户信息 -->
        <el-form-item label="客户信息" class="label-style" />
        <!-- 公司名称, 行业领域 -->
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="公司名称:" prop="companyName">
              <el-input v-model="temp.companyName" placeholder="请输入公司名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="行业领域:">
              <el-input v-model="temp.companyBusinessProfession" placeholder="请输入行业领域" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 人员规模, 地址 -->
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="人员规模:">
              <el-input v-model="temp.employeeScale" placeholder="请输入人员规模" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="地址:">
              <el-input v-model="temp.licenseAddress" placeholder="请输入地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 渠道用户, 客户星级 -->
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="渠道用户:">
              <el-radio-group v-model="temp.channelFlag">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="客户星级:">
              <el-select clearable value="" placeholder="请选择客户星级">
                <el-option label="一星客户" value="1" />
                <el-option label="二星客户" value="2" />
                <el-option label="三星客户" value="3" />
                <el-option label="四星客户" value="3" />
                <el-option label="五星客户" value="3" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 备注 -->
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注:">
              <el-input v-model="temp.remark" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 联系人信息 -->
        <el-form-item label="联系人信息" class="label-style" />
        <!-- 姓名, 手机 -->
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="姓名:" prop="nickname">
              <el-input v-model="temp.nickname" placeholder="请输入客户姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="手机:" prop="userMobile">
              <el-input v-model="temp.userMobile" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 职务, 座机 -->
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="职务:">
              <el-input v-model="temp.duty" placeholder="请输入职务" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="座机:">
              <el-input v-model="temp.telephone" placeholder="请输入座机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 微信, 邮箱 -->
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="微信:">
              <el-input v-model="temp.wxNumber" placeholder="请输入微信号" />
            </el-form-item>
          </el-col>
          <el-col :span="12" style="padding-left: 15px;">
            <el-form-item label="邮箱:">
              <el-input v-model="temp.userEmail" placeholder="请输入邮箱地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- QQ -->
        <el-row>
          <el-col :span="12" style="padding-right: 15px;">
            <el-form-item label="QQ:">
              <el-input v-model="temp.qqNumber" placeholder="请输入QQ" />
            </el-form-item>
          </el-col>
        </el-row>
      </template>

      <!-- 经营情况 -->
      <el-form-item label="经营情况" class="label-style" />
      <!-- 商标数量, 专利数量 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="商标数量:">
            <el-input v-model="temp.user" placeholder="请输入商标数量" />
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-left: 15px;">
          <el-form-item label="专利数量:">
            <el-input v-model="temp.user" placeholder="请输入专利数量" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 软著数量, 其他资质 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="软著数量:">
            <el-input v-model="temp.user" placeholder="请输入软著数量" />
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-left: 15px;">
          <el-form-item label="其他资质:">
            <el-input v-model="temp.user" placeholder="请输入其他资质数量" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 融资情况 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="融资情况:">
            <el-input placeholder="请输入融资情况" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 保存, 取消 -->
      <el-row style="text-align: right; margin-top: 10px;">
        <el-col :span="24">
          <el-button size="small" @click="templateDialog = false">取消</el-button>
          <el-button size="small" type="primary" plain @click="save('ruleForm')">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { createCustomer } from 'api/table'
export default {
  inject: ['reload'],
  name: 'CreateCustomerDialog',
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
      temp: {
        companyType: 0
      },
      rules: {
        companyType: [
          { required: true, message: '请选择客户类型', trigger: 'blur' }
        ],
        companyName: [
          { required: true, message: '请填写公司名称', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请填写客户名称', trigger: 'blur' }
        ],
        businessPurpose: [
          { required: true, message: '请填写意向业务', trigger: 'blur' }
        ],
        companyBusinessProfession: [
          { required: true, message: '请填写行业领域', trigger: 'blur' }
        ],
        businessSource: [
          { required: true, message: '请填写线索来源', trigger: 'blur' }
        ],
        userMobile: [
          { required: true, message: '请填写客户手机', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible(val, oldVal) {
      this.templateDialog = val
    },
    'temp.companyType'(val, oldVal) {
      this.$refs['ruleForm'].clearValidate()
      this.temp = {
        companyType: val
      }
    }
  },
  methods: {
    closeDia(formName) {
      this.temp = {
        companyType: 0
      }
      this.$refs[formName].clearValidate()
      this.$emit('update:visible', false)
    },
    save(formName) {
      var _this = this
      if (_this.temp.companyType === 0) {
        _this.temp.companyName = _this.temp.nickname
      }
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.temp.businessSource) {
            _this.temp.businessSource = parseInt(_this.temp.businessSource)
          }
          if (_this.temp.businessPurpose) {
            _this.temp.businessPurpose = parseInt(_this.temp.businessPurpose)
          }
          createCustomer(this.temp).then(response => {
            if (response.data.code === 10000) {
              _this.$message.success(response.data.message)

              if (response.data.data && response.data.data.length === 1) {
                let customerData = {}
                customerData = Object.assign({}, customerData, {
                  companyId: response.data.data[0].companyId,
                  companyName: response.data.data[0].companyName
                })
                _this.$emit('customerData', customerData)
              }

              // _this.closeDia('ruleForm')
            } else if (response.data.code === 500) {
              _this.$message.warning(response.data.message)
            } else {
              _this.$message.error(response.data.message)
            }
          }).catch((err) => {
            _this.$message.error(err)
          })
        } else {
          console.log('请填写客户信息')
        }
      })
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
