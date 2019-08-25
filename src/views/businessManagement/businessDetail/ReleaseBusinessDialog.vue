<template>
  <el-dialog title="释放商机" :close-on-click-modal="flag" :visible.sync="templateDialog" width="550px" @close="closeDia">
    <el-form ref="ruleFrom" :model="temp" :rules="rules" size="mini">
      <!-- 释放原因 -->
      <el-form-item label="商机释放后将转移给主管:" label-width="200px" prop="businessOwner">
        <el-select v-model="temp.businessOwner" value="" clearable placeholder="请选择主管">
          <el-option
            v-for="item in leaderList"
            :key="item.pkSid"
            :label="item.nickname"
            :value="item.pkSid"
          />
        </el-select>
      </el-form-item>
      <!-- 释放原因 -->
      <el-form-item label="释放原因:" label-width="100px">
        <el-input v-model="temp.mark" type="textarea" placeholder="请输入内容" />
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDia">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleFrom')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { businessDeal, getGroupLeaderList } from 'api/business'
export default {
  inject: ['closeSelectedTag'],
  name: 'ReleaseBusinessDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    businessId: {
      type: String,
      default: null
    },
    pkSid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: this.visible,
      temp: {},
      rules: {
        businessOwner: [
          { required: true, message: '请选择主管', trigger: 'change' }
        ]
      },
      leaderList: []
    }
  },
  watch: {
    visible: function() {
      this.templateDialog = this.visible
    }
  },
  created() {
    this.getLeaderList()
  },
  methods: {
    getLeaderList() {
      const _this = this
      getGroupLeaderList().then(response => {
        if (response.data.code === 10000) {
          _this.leaderList = response.data.data
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    save(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.temp = Object.assign({}, _this.temp, {
            pkSid: this.pkSid,
            businessId: this.businessId,
            selectType: '2' // 操作模式 0.转移 1.分配 2.释放
          })
          businessDeal(_this.temp).then(response => {
            if (response.data.code === 10000) {
              _this.closeDia()
              _this.closeSelectedTag()
              _this.$router.push({ path: '/businessManagement/myBusiness' })
            } else {
              _this.$message.error('操作失败')
            }
          }).catch((err) => {
            _this.$message.error(err)
          })
        }
      })
    },
    closeDia() {
      this.temp = {}
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style scoped>
/deep/ .el-dialog .el-dialog__header{
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
}
/deep/ .el-dialog .el-dialog__body{
  padding: 25px 50px 10px 20px;
}
/deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
  font-weight: normal;
  font-size: 15px;
}
/deep/ .el-form .el-radio{
  line-height: 1.5;
  margin-bottom: 15px;
}
</style>
