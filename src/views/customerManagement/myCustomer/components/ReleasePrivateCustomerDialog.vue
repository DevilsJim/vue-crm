<template>
  <el-dialog title="释放到公海" :close-on-click-modal="flag" :visible.sync="templateDialog" width="700px" @close="closeDia">
    <el-form :model="temp" label-width="90px">
      <!-- 放弃理由 -->
      <el-form-item label="放弃理由:">
        <el-radio-group v-model="temp.pkSid" style="margin-top: 8px;" @change="handleRadio">
          <el-radio
            v-for="item in releaseReasonData"
            :key="item.pkSid"
            :label="item.pkSid"
          >
            {{ item.descConfig }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 备注 -->
      <el-form-item label="备注:">
        <el-input v-model="temp.remark" type="textarea" placeholder="请输入内容" />
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDia">取消</el-button>
      <el-button size="small" type="primary" @click="doRelease">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setPrivateToPublic, releaseReasonList } from 'api/customerDetail'
export default {
  inject: ['closeSelectedTag'],
  name: 'ReleasePrivateCustomerDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentCompanyId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: this.visible,
      temp: {},
      releaseReasonData: []
    }
  },
  watch: {
    visible: function() {
      this.templateDialog = this.visible
    },
    currentCompanyId: {
      handler(val, oldVal) {
        this.temp.companyId = val
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getReleaseReasonList()
  },
  methods: {
    getReleaseReasonList() {
      const _this = this
      releaseReasonList({}).then(response => {
        if (response.data.code === 10000) {
          _this.releaseReasonData = response.data.data
        }
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    closeDia() {
      this.temp = {}
      this.$emit('update:visible', false)
    },
    doRelease() {
      const curDesc = this.temp.remark
      const _this = this
      _this.temp.remark = _this.temp.descConfig + '<br>' + curDesc
      _this.temp.pkSid = null
      _this.temp.descConfig = null
      setPrivateToPublic(_this.temp).then(response => {
        if (response.data.code === 10000) {
          _this.closeDia()
          _this.closeSelectedTag()
          _this.$router.push({ path: '/customerManagement/myCustomer' })
        } else {
          _this.$message.error('操作失败')
        }
      }).catch((err) => {
        _this.$message.error(err)
      })
    },
    handleRadio(val) {
      console.log(val)
      if (val !== null) {
        this.releaseReasonData.forEach((item) => {
          if (item.pkSid === val) {
            this.temp.descConfig = item.descConfig
            this.temp.releaseConfig = item.releaseConfig
            this.temp.releaseTimeConfig = item.releaseTimeConfig
          }
        })
      }
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
  padding:30px 120px 20px 50px;
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
