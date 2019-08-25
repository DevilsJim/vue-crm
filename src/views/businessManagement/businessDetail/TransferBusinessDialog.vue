<template>
  <el-dialog title="转移商机" :close-on-click-modal="flag" :visible.sync="templateDialog" width="550px" @close="closeDia">
    <el-form :model="temp" label-width="90px" size="mini">
      <el-form-item label="转移至:" class="custom-prop">
        <el-autocomplete
          v-model="nickname"
          :fetch-suggestions="querySearchAsync"
          placeholder="请输入水果名"
          clearable
          @select="handleSelect"
        />
      </el-form-item>
      <!-- 释放原因 -->
      <el-form-item label="转移原因:" prop="remark">
        <el-input v-model="temp.remark" type="textarea" placeholder="请输入内容" />
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDia">取消</el-button>
      <el-button size="small" type="primary" @click="save">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { businessDeal, getUserPageList } from 'api/business'
export default {
  inject: ['closeSelectedTag'],
  name: 'TransferBusinessDialog',
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
      nickname: '', // 远程搜索绑定展示字段
      userListParam: {
        start: '1',
        length: '10'
      }
    }
  },
  watch: {
    visible: function() {
      this.templateDialog = this.visible
    }
  },
  methods: {
    /**
     *@desc queryString 为在框中输入的值
     *@desc callback 回调函数,将处理好的数据推回
     *@author Jinlijing
     *@date  2019/08/08 16:40:35
     */
    querySearchAsync(queryString, callback) {
      const _this = this
      let userList = [{}]
      _this.userListParam.nickname = queryString
      getUserPageList(_this.userListParam).then(response => {
        if (response.data.code === 10000) {
          for (const item of response.data.data.list) {
            item.value = item.nickname // 将想要展示的数据作为value
          }
          userList = response.data.data.list
        }
        callback(userList)
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    createStateFilter(queryString) {
      return (queryString.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
    },
    handleSelect(val) {
      console.log(val)
      this.nickname = val.nickname
      this.temp.businessOwner = val.pkSid
    },
    save() {
      const _this = this
      if (_this.temp.businessOwner) {
        _this.temp = Object.assign({}, _this.temp, {
          pkSid: this.pkSid,
          businessId: this.businessId,
          selectType: '0' // 操作模式 0.转移 1.分配 2.释放
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
      } else {
        _this.$message.error('请选择正确的水果名！')
        return false
      }
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
  /deep/ .el-form .el-form-item__content .el-autocomplete{
    width: 100%
  }
  /deep/ .el-form .el-radio{
    line-height: 1.5;
    margin-bottom: 15px;
  }
</style>
