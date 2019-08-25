<template>
  <el-dialog title="新建商机" class="out-dialog" :close-on-click-modal="flag" :visible.sync="templateDialog" width="700px" @close="closeDia('ruleForm')">
    <el-form ref="ruleForm" :rules="rules" :model="temp" label-width="100px" size="mini">
      <!-- 商机名称, 客户名称 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="商机名称:" prop="bussinessName">
            <el-input v-model="temp.bussinessName" placeholder="请输入商机名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-left: 15px;">
          <el-form-item label="客户名称:" class="input-cursor" prop="companyName">
            <el-input v-model="temp.companyName" suffix-icon="el-icon-plus" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 意向业务, 联系人 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="意向业务:" prop="businessPurpose">
            <el-select v-model="temp.businessPurpose" value="" clearable placeholder="请选择意向业务">
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
          <el-form-item label="联系人:" class="input-cursor" prop="userName">
            <el-input v-model="temp.userName" placeholder="请选择联系人" suffix-icon="el-icon-plus" readonly @focus="chooseContactVisible = true" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 商机进度, 手机号 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="商机进度:" prop="businessProgress">
            <el-select v-model="temp.businessProgress" value="" clearable placeholder="请选择商机进度">
              <el-option label="初步洽谈" value="0" />
              <el-option label="是否发送函件" value="1" />
              <el-option label="是否约谈" value="2" />
              <el-option label="销售报价" value="3" />
              <el-option label="合同发票" value="4" />
              <el-option label="项目失败" value="5" />
              <el-option label="项目收款" value="6" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-left: 15px;">
          <el-form-item label="手机号:" class="input-cursor" prop="userMobile">
            <el-input v-model="temp.userMobile" placeholder="请选择手机号" suffix-icon="el-icon-plus" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 成交几率, 下次跟进时间 -->
      <el-row>
        <el-col :span="12" style="padding-right: 15px;">
          <el-form-item label="成交几率:">
            <el-select v-model="temp.dealPercent" value="" clearable placeholder="请选择成交几率">
              <el-option label="0%" value="0" />
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
        <el-col :span="12" style="padding-left: 15px;">
          <el-form-item label="下次跟进时间:">
            <el-date-picker
              v-model="temp.nextFollowTime"
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
            <el-input v-model="temp.remark" type="textarea" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="templateDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleForm')">保存</el-button>
    </div>

    <!-- 选择联系人 -->
    <choose-contact-dialog :visible.sync="chooseContactVisible" :company-id.sync="temp.companyId" @contactData="contactData" />

  </el-dialog>
</template>

<script>
import { createBusiness } from 'api/business'
import ChooseContactDialog from './ChooseContactDialog'
export default {
  inject: ['reload'],
  name: 'CreateBusinessDialog',
  components: {
    ChooseContactDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    companyId: {
      type: String,
      default: null
    },
    companyName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      temp: {},
      rules: {
        companyName: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请选择联系人', trigger: 'change' }
        ],
        userMobile: [
          { required: true, message: '请先选择联系人', trigger: 'change' }
        ],
        businessPurpose: [
          { required: true, message: '请选择意向业务', trigger: 'change' }
        ],
        bussinessName: [
          { required: true, message: '请填写商机名称', trigger: 'blur' }
        ],
        businessProgress: [
          { required: true, message: '请选择商机进度', trigger: 'change' }
        ]
      },
      chooseContactVisible: false // 选择联系人
    }
  },
  watch: {
    visible(val, oldVal) {
      this.templateDialog = val
    },
    companyId(val, oldVal) {
      this.$set(this.temp, 'companyId', val)
    },
    companyName(val, oldVal) {
      this.$set(this.temp, 'companyName', val)
    }
  },
  methods: {
    // 保存
    save(formName) {
      var _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.temp.dealPercent) {
            this.$set(this.temp, 'dealPercent', 0)
          }
          createBusiness(this.temp).then(response => {
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
      this.temp = {}
      this.$emit('update:visible', false)
      this.$emit('update:companyName', '')
      this.$emit('update:companyId', '')
      this.$refs[formName].resetFields()
    },
    // 选择客户返回数据
    customerData(val) {
      this.temp = Object.assign({}, this.temp, {
        companyId: val.companyId,
        companyName: val.companyName,
        userId: null,
        userName: null,
        userMobile: null
      })
      console.log('新建商机', this.temp)
    },
    // 选择联系人返回数据
    contactData(val) {
      this.temp = Object.assign({}, this.temp, {
        userId: val.userId,
        userName: val.nickname,
        userMobile: val.userMobile
      })
      console.log('新建商机', this.temp)
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog{
  .el-dialog__body{
    padding: 30px 35px 0 15px
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
  /deep/ .el-form-item__content .el-select, /deep/ .el-form-item__content .el-date-editor {
    width: 100%;
  }
  .input-cursor{
    /deep/ .el-input__inner{
      cursor: pointer;
    }
  }
}
</style>
