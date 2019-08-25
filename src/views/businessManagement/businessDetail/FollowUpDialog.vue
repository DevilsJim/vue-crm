<template>
  <el-dialog title="跟进商机" :visible.sync="templateDialog" :close-on-click-modal="flag" width="550px" @close="closeDia('ruleForm')">
    <el-form ref="ruleForm" :rules="rules" size="mini" :model="temp" label-width="120px">
      <!-- 客户类型 -->
      <el-form-item label="跟进联系人:">
        <el-input v-model="temp.userName" clearable disabled />
      </el-form-item>

      <!-- 跟进方式 -->
      <el-form-item label="跟进方式:" prop="followType">
        <el-radio-group v-model="temp.followType">
          <el-radio-button label="0">电话</el-radio-button>
          <el-radio-button label="1">面访</el-radio-button>
          <el-radio-button label="2">微信</el-radio-button>
          <el-radio-button label="3">QQ</el-radio-button>
          <el-radio-button label="4">其它</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <!-- 商机进度 -->
      <el-form-item label="商机进度:" prop="businessProgress">
        <el-select v-model="temp.businessProgress" value="" clearable placeholder="请选择商机进度">
          <el-option label="初步洽谈" value="0" />
          <el-option label="是否发送函件" value="1" />
          <el-option label="是否约谈" value="2" />
          <el-option label="销售报件" value="3" />
          <el-option label="合同报价" value="4" />
          <el-option label="项目失败" value="5" />
          <el-option label="项目收款" value="6" />
        </el-select>
      </el-form-item>

      <!-- 成交几率 -->
      <el-form-item label="成交几率:">
        <el-select v-model="temp.dealPercent" value="" clearable placeholder="请选择成交几率">
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

      <!-- 下次跟进时间 -->
      <el-form-item label="下次跟进时间:" prop="nextFollowTime">
        <el-date-picker
          v-model="temp.nextFollowTime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="下次跟进时间"
          :picker-options="pickerOptions"
        />
      </el-form-item>

      <!-- 跟进备注 -->
      <el-form-item label="备注:">
        <el-input v-model="temp.followMark" type="textarea" placeholder="请输入内容" />
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="$emit('update:visible', false)">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { businessFollow } from 'api/business'
export default {
  inject: ['reload'],
  name: 'FollowUpDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    followUpData: {
      type: Object,
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
      rules: {
        followType: [
          { required: true, message: '请选择跟进方式', trigger: 'change' }
        ],
        businessProgress: [
          { required: true, message: '请选择商机进度', trigger: 'change' }
        ],
        nextFollowTime: [
          { required: true, message: '请选择下次跟进时间', trigger: 'change' }
        ]
      },
      temp: {}
    }
  },
  watch: {
    visible: {
      handler: function(val, oldVal) {
        this.templateDialog = val
      },
      deep: true,
      immediate: true
    },
    followUpData: {
      handler: function(val, oldVal) {
        this.temp = Object.assign({}, this.temp, {
          businessPkSid: val.pkSid,
          businessId: val.businessId,
          companyId: val.companyId,
          userId: val.userId,
          userName: val.userName
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    closeDia(formName) {
      this.temp = {}
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false)
    },
    save(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          businessFollow(_this.temp).then(response => {
            if (response.data.code === 10000) {
              _this.$message.success(response.data.message)
              _this.closeDia('ruleForm')
              _this.reload()
            } else {
              _this.$message.error(response.data.message)
            }
          }).catch((error) => {
            _this.$message.error(error.toString())
          })
        } else {
          _this.$message.error('请完善跟进信息！')
        }
      })
    }
  }
}
</script>

<style scoped>
/deep/ .el-dialog .el-dialog__body{
  padding:30px 80px 0 50px
}
/deep/ .el-form .el-form-item__content .el-select {
  width: 100%;
}
.el-date-editor {
  width: 100%;
}
.el-cascader{
  width: 100%;
}
/deep/ .el-date-editor .el-range-input{
  width: 80%;
}
</style>
