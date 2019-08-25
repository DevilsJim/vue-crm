<template>
  <el-dialog
    :title="title"
    :visible.sync="templateDialog"
    :close-on-click-modal="flag"
    width="500px"
    @close="closeDia"
    @open="openDia"
  >

    <el-form ref="ruleForm" size="mini" :model="userInfo" label-width="120px" :rules="rules">
      <!-- 联系人名称 -->
      <el-form-item label="联系人名称:" prop="nickname">
        <el-input v-model="userInfo.nickname" placeholder="请输入联系人名称" clearable />
      </el-form-item>
      <!-- 联系人手机 -->
      <el-form-item label="联系人手机:" prop="userMobile" class="custom-prop">
        <el-input v-model="userInfo.userMobile" placeholder="请输入联系人手机" clearable />
      </el-form-item>
      <!-- 联系人职称 -->
      <el-form-item label="联系人职称:">
        <el-input v-model="userInfo.duty" placeholder="请输入联系人职称" clearable />
      </el-form-item>
      <!-- 联系人座机 -->
      <el-form-item label="联系人座机:">
        <el-input v-model="userInfo.telephone" placeholder="请输入联系人座机" clearable />
      </el-form-item>
      <!-- 联系人QQ -->
      <el-form-item label="联系人QQ:">
        <el-input v-model="userInfo.qqNumber" placeholder="请输入联系人QQ" clearable />
      </el-form-item>
      <!-- 联系人微信 -->
      <el-form-item label="联系人微信:">
        <el-input v-model="userInfo.wxNumber" placeholder="请输入联系人微信" clearable />
      </el-form-item>
      <!-- 联系人邮箱 -->
      <el-form-item label="联系人邮箱:">
        <el-input v-model="userInfo.userEmail" placeholder="请输入联系人邮箱" clearable />
      </el-form-item>
      <!-- 联系人地址 -->
      <el-form-item label="联系人地址:">
        <el-input v-model="userInfo.userAddress" placeholder="请输入联系人地址" clearable />
      </el-form-item>
      <el-form-item label="是否在职:" prop="onJobFlag">
        <el-radio v-model="userInfo.onJobFlag" :label="true">在职</el-radio>
        <el-radio v-model="userInfo.onJobFlag" :label="false">离职</el-radio>
      </el-form-item>

    </el-form>
    <!-- 保存, 取消 -->
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="templateDialog = false">取消</el-button>
      <el-button size="small" type="primary" @click="save('ruleForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { saveZgLatentUser, getLatentUserDetail, updateLatentUserDetail } from 'api/customerDetail'
export default {
  name: 'AddEditContactsDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    contactData: {
      type: Object,
      default: null
    },
    contactType: {
      type: String,
      default: null
    }
  },
  data() {
    var checkUserMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入联系人手机号！'))
      } else {
        if (value.length !== 11) {
          callback(new Error('手机号必须11位！'))
        } else {
          callback()
        }
      }
    }
    return {
      flag: false,
      templateDialog: false,
      title: '',
      rules: {
        nickname: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' },
          { min: 1, max: 30, message: '请输入联系人名称', trigger: 'blur' }
        ],
        userMobile: [
          { validator: checkUserMobile, trigger: 'blur' }
        ]
      },
      userInfo: {}
    }
  },
  watch: {
    visible() {
      this.templateDialog = this.visible
    },
    contactType(val, oldVal) {
      if (val === 'edit') {
        this.title = '编辑联系人'
      } else if (val === 'add') {
        this.title = '添加联系人'
      }
    },
    contactData: {
      handler(val, oldVal) {
        this.userInfo = Object.assign({}, this.userInfo, {
          pkSid: val.pkSid,
          companyId: val.companyId,
          nickname: val.nickname,
          userMobile: val.userMobile,
          telephone: val.telephone,
          qqNumber: val.qqNumber,
          wxNumber: val.wxNumber,
          userEmail: val.userEmail,
          userAddress: val.userAddress,
          duty: val.duty,
          onJobFlag: val.onJobFlag
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    closeDia() {
      this.$emit('update:visible', false)
      this.userInfo = {}
    },
    openDia() {
      if (this.addEditContact) {
        const _this = this
        getLatentUserDetail({ userId: _this.currentContactId }).then(response => {
          if (response.data.code === 10000) {
            _this.userInfo = response.data.data[0]
          } else {
            _this.$message.error(response.data.message)
          }
        }).catch((error) => {
          _this.$message.error(error.toString())
        })
      }
    },
    save(formName) {
      const _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          const onJobFlag = _this.userInfo.onJobFlag
          if (onJobFlag === true) {
            _this.$set(_this.userInfo, 'onJobFlag', 0)
          } else if (onJobFlag === false) {
            _this.$set(_this.userInfo, 'onJobFlag', 1)
          }
          if (this.contactType === 'edit') {
            updateLatentUserDetail(_this.userInfo).then(response => {
              if (response.data.code === 10000) {
                _this.$message.success(response.data.message)
                _this.$emit('getLatentInfo')
              } else {
                _this.$message.error(response.data.message)
              }
              _this.closeDia()
            }).catch(error => {
              if (error) {
                _this.$message.error(error)
              }
            })
          } else if (this.contactType === 'add') {
            saveZgLatentUser(_this.userInfo).then(response => {
              if (response.data.code === 10000) {
                _this.$message.success(response.data.message)
                _this.$emit('getLatentInfo')
              } else {
                _this.$message.error(response.data.message)
              }
              _this.closeDia()
            }).catch(error => {
              if (error) {
                _this.$message.error(error)
              }
            })
          }
        } else {
          _this.$message.warning('请完善您的数据')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #ddd;
    padding-bottom: 20px;
  }
  .el-dialog__body{
    padding:30px 80px 0 50px
  }
}
</style>
