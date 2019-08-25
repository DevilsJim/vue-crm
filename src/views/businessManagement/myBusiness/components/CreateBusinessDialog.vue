<template>
  <el-dialog title="新建商机" class="out-dialog" :close-on-click-modal="flag" :visible.sync="templateDialog" width="750px" @close="closeDia('ruleForm')">
    <el-form ref="ruleForm" :rules="rules" :model="businessData" label-width="100px" size="mini">
      <!-- 创建客户, 选择客户 -->
      <el-tabs v-model="activeTabsName" type="border-card">
        <!-- 创建客户 -->
        <el-tab-pane label="创建客户" name="1">
          <!--按钮-->
          <el-button size="small" type="success" class="edit-customer" style="margin: 15px 20px 10px" @click="createCustomerVisible = true">创建客户</el-button>
          <el-form-item label="客户信息" class="label-style" label-width="90px" />
          <!--客户姓名-->
          <el-row>
            <el-col :span="12" style="padding-right: 15px;">
              <el-form-item label="客户名称:" prop="nickname" label-width="90px">
                <el-input v-model="businessData.companyName" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <!--联系人-->
          <el-row>
            <el-col :span="12" style="padding-right: 15px;">
              <el-form-item label="联系人:" class="input-cursor" label-width="90px">
                <el-input v-model="businessData.userName" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机号-->
          <el-row>
            <el-col :span="12" style="padding-right: 15px;">
              <el-form-item label="手机号:" class="input-cursor" label-width="90px">
                <el-input v-model="businessData.userMobile" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 选择客户 -->
        <el-tab-pane label="选择客户" name="2">
          <el-form-item label="客户信息" class="label-style" label-width="90px" />
          <!--客户姓名-->
          <el-row>
            <el-col :span="12" style="padding-right: 15px;">
              <el-form-item label="客户名称:" class="input-cursor" label-width="90px" prop="companyName">
                <el-input v-model="businessData.companyName" placeholder="请选择客户名称" suffix-icon="el-icon-plus" readonly @focus="chooseCustomerVisible = true" />
              </el-form-item>
            </el-col>
          </el-row>
          <!--联系人-->
          <el-row id="contact" class="display">
            <el-col :span="12" style="padding-right: 15px;">
              <el-form-item label="联系人:" class="input-cursor" label-width="90px" prop="userName">
                <el-input v-model="businessData.userName" placeholder="请选择联系人" suffix-icon="el-icon-plus" readonly @focus="chooseContactVisible = true" />
              </el-form-item>
            </el-col>
          </el-row>
          <!--手机号-->
          <el-row id="mobilePhone" class="display">
            <el-col :span="12" style="padding-right: 15px;">
              <el-form-item label="手机号:" class="input-cursor" label-width="90px" prop="userMobile">
                <el-input v-model="businessData.userMobile" placeholder="请选择手机号" suffix-icon="el-icon-plus" disabled />
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <!-- 商机信息 -->
      <el-form-item label="商机信息" class="label-style" label-width="90px" />
      <!-- 意向业务, 商机名称 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="意向业务:" prop="businessPurpose">
            <el-select v-model="businessData.businessPurpose" value="" clearable placeholder="请选择意向业务">
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
              <el-option label="青苹果会员" value="12" />
              <el-option label="红苹果会员" value="13" />
              <!--<el-option label="其他" value="5" />-->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-left: 15px;">
          <el-form-item label="商机名称:" prop="bussinessName">
            <el-input v-model="businessData.bussinessName" placeholder="请输入商机名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 商机进度, 成交几率 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="商机进度:" prop="businessProgress">
            <el-select v-model="businessData.businessProgress" value="" clearable placeholder="请选择商机阶段">
              <el-option label="初步洽谈" value="0" />
              <el-option label="是否发送函件" value="1" />
              <el-option label="是否约谈" value="2" />
              <el-option label="销售报价" value="3" />
              <!--              <el-option label="合同发票" value="4" />-->
              <!--              <el-option label="项目失败" value="5" />-->
              <!--              <el-option label="项目收款" value="6" />-->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-left: 15px;">
          <el-form-item label="成交几率:">
            <el-select v-model="businessData.dealPercent" value="" clearable placeholder="请选择成交几率">
              <el-option label="10%" value="1" />
              <el-option label="20%" value="2" />
              <el-option label="30%" value="3" />
              <el-option label="40%" value="4" />
              <el-option label="50%" value="5" />
              <el-option label="60%" value="6" />
              <el-option label="70%" value="7" />
              <el-option label="80%" value="8" />
              <el-option label="90%" value="9" />
              <el-option label="100%" value="10" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 下次跟进时间 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="下次跟进时间:">
            <el-date-picker
              v-model="businessData.nextFollowTime"
              type="date"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              default-time="00:00:00"
              placeholder="请选择下次跟进时间"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 商机备注 -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="商机备注:">
            <el-input v-model="businessData.remark" type="textarea" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="templateDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleForm')">保存</el-button>
    </div>

    <!-- 创建客户 -->
    <create-customer-dialog :visible.sync="createCustomerVisible" @customerData="createCustomerData" />
    <!-- 选择客户 -->
    <choose-customer-dialog :visible.sync="chooseCustomerVisible" @customerData="chooseCustomerData" />
    <!-- 选择联系人 -->
    <choose-contact-dialog :visible.sync="chooseContactVisible" :source-type="sourceType" :company-id="businessData.companyId" @contactData="contactData" />

  </el-dialog>
</template>

<script>
import { createBusiness } from 'api/business'
import CreateCustomerDialog from './CreateCustomerDialog'
import ChooseCustomerDialog from './ChooseCustomerDialog'
import ChooseContactDialog from './ChooseContactDialog'
export default {
  inject: ['reload'],
  name: 'CreateBusinessDialog',
  components: {
    CreateCustomerDialog,
    ChooseCustomerDialog,
    ChooseContactDialog
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
      businessData: {},
      sourceType: '', // 客户来源 1.我的客户 2.商机客户
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      activeTabsName: '2',
      rules: {
        companyName: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请选择联系人', trigger: 'change' }
        ],
        userMobile: [
          { required: true, message: '请选择手机号', trigger: 'change' }
        ],
        businessPurpose: [
          { required: true, message: '请选择意向业务', trigger: 'change' }
        ],
        bussinessName: [
          { required: true, message: '请填写商机名称', trigger: 'blur' }
        ],
        businessProgress: [
          { required: true, message: '请选择商机阶段', trigger: 'change' }
        ]
      },
      createCustomerVisible: false, // 创建客户
      chooseCustomerVisible: false, // 选择客户
      chooseContactVisible: false // 选择联系人
    }
  },
  watch: {
    visible(val, oldVal) {
      this.templateDialog = val
    },
    businessData: {
      handler(val, oldVal) {
        const contact = document.getElementById('contact')
        const mobilePhone = document.getElementById('mobilePhone')
        if (val.companyName) {
          contact.style.display = 'block'
        } else {
          if (contact) {
            contact.style.display = 'none'
          }
        }

        if (val.userName && val.userMobile) {
          mobilePhone.style.display = 'block'
        } else {
          if (mobilePhone) {
            mobilePhone.style.display = 'none'
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 保存
    save(formName) {
      var _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          createBusiness(this.businessData).then(response => {
            if (response.data.code === 10000) {
              _this.$message.success(response.data.message)
              _this.closeDia('ruleForm')
              this.reload()
            } else {
              _this.$message.error(response.data.message)
            }
          }).catch((err) => {
            _this.$message.error(err)
          })
        } else {
          _this.$message.error('请填写客户信息')
        }
      })
    },
    // 关闭
    closeDia(formName) {
      this.businessData = {}
      this.$emit('update:visible', false)
      this.$refs[formName].resetFields()
    },
    // 选择客户返回数据
    createCustomerData(val) {
      this.businessData = Object.assign({}, this.businessData, {
        companyId: val.companyId,
        companyName: val.companyName,
        userId: null,
        userName: null,
        userMobile: null
      })
    },
    // 选择客户返回数据
    chooseCustomerData(val) {
      this.businessData = Object.assign({}, this.businessData, {
        companyId: val.companyId,
        companyName: val.companyName,
        userId: null,
        userName: null,
        userMobile: null
      })
      this.sourceType = val.sourceType // 客户来源 1.我的客户 2.商机客户
      // console.log('sourceType', this.sourceType)
    },
    // 选择联系人返回数据
    contactData(val) {
      this.businessData = Object.assign({}, this.businessData, {
        userId: val.userId,
        userName: val.nickname,
        userMobile: val.userMobile
      })
      console.log('商机', this.businessData)
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
  &.display{
    display: none;
  }
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
