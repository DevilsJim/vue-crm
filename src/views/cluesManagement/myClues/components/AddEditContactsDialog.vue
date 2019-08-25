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
        <el-input v-model="userInfo.threadUserEmail" placeholder="请输入联系人邮箱" clearable />
      </el-form-item>
      <!-- 联系人地址 -->
      <el-form-item label="联系人地址:">
        <el-input v-model="userInfo.userAddress" placeholder="请输入联系人地址" clearable />
      </el-form-item>
      <el-form-item label="是否在职:" prop="onJobFlag">
        <el-radio v-model="userInfo.onJobFlag" :label="0">在职</el-radio>
        <el-radio v-model="userInfo.onJobFlag" :label="1">离职</el-radio>
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
import { getCustomerDetail, saveOrUpdateCustomerInfo } from '../../../../api/clues'
export default {
  name: 'AddEditContactsDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currentThreadId: {
      type: String,
      default: null
    },
    currentContactId: {
      type: String,
      default: null
    },
    addEditContact: {
      type: Boolean,
      default: false
    },
    currentThreadUserId: {
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
      templateDialog: this.visible,
      userInfo: {
        threadId: ''
      },
      title: '',
      rules: {
        nickname: [
          { required: true, message: '请输入联系人名称', trigger: 'blur' },
          { min: 1, max: 30, message: '请输入联系人名称', trigger: 'blur' }
        ],
        userMobile: [
          { validator: checkUserMobile, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible() {
      this.templateDialog = this.visible
    },
    addEditContact(val, oldVal) {
      if (val) {
        this.title = '编辑联系人'
      } else {
        this.title = '添加联系人'
      }
    }
  },
  methods: {
    closeDia() {
      this.$emit('update:visible', false)
      this.userInfo = {}
    },
    openDia() {
      this.userInfo = {}
      if (this.addEditContact) {
        getCustomerDetail({ threadUserId: this.currentThreadUserId }).then(response => {
          if (response.data.code === 10000) {
            this.userInfo = response.data.data
          } else {
            this.$message.error(response.data.message)
          }
        }).catch((error) => {
          this.$message.error(error.toString())
        })
      }
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.userInfo.threadId = this.currentThreadId
          saveOrUpdateCustomerInfo(this.userInfo).then(response => {
            if (response.data.code === 10000) {
              this.$message.success(response.data.message)
              this.$emit('getCustomerList')
            } else {
              this.$message.error(response.data.message)
            }
            this.closeDia()
          }).catch(error => {
            if (error) {
              console.log(error)
            }
            this.$message.warning('联系人已存在，请勿重复添加')
          })
        } else {
          this.$message.warning('请完善您的数据')
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
