<template>
  <el-dialog title="跟进客户" :visible.sync="templateDialog" :close-on-click-modal="flag" width="550px" @close="closeDia('ruleForm')" @open="openDia">
    <el-form ref="ruleForm" :rules="rules" size="mini" :model="temp" label-width="100px">
      <!-- 跟进联系人 -->
      <el-form-item label="跟进联系人:">
        <el-select v-model="temp.userId" value="" clearable placeholder="请选择客户">
          <template v-for="(item, index) in latentUserList">
            <el-option :key="index" :label="item.nickname" :value="item.userId" />
          </template>
        </el-select>
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

      <!-- 是否联系 -->
      <el-form-item label="是否联系:" prop="contactFlag">
        <el-radio v-model="temp.contactFlag" label="0">未联系上</el-radio>
        <el-radio v-model="temp.contactFlag" label="1">已联系上</el-radio>
      </el-form-item>

      <!-- 跟进备注 -->
      <el-form-item label="备注:">
        <el-input v-model="temp.followMark" type="textarea" placeholder="请输入内容" />
      </el-form-item>

      <!-- 客户价值 -->
      <el-form-item label="客户价值:" prop="customWorth">
        <el-radio-group v-model="temp.customWorth">
          <el-radio-button label="0">未标记</el-radio-button>
          <el-radio-button label="1">低价值</el-radio-button>
          <el-radio-button label="2">中价值</el-radio-button>
          <el-radio-button label="3">高价值</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <!-- 下次跟进时间 -->
      <el-form-item label="下次跟进时间:">
        <el-date-picker
          v-model="temp.nextFollowTime"
          type="date"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="下次跟进时间"
          :picker-options="pickerOptions"
        />
      </el-form-item>

      <!-- 上传文件 -->
      <el-form-item label="上传文件:">
        <upload-picture :upload-url="uploadUrl" :cus-file-list="uploadFilePicList" :file-type="true" @resFileData="uploadFileData" />
        <el-dialog>
          <img width="100%" :src="temp.filePath" alt="">
        </el-dialog>
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
import { saveFollow, getLatentUserPager } from 'api/customerDetail'
import UploadPicture from './UploadPicture'

export default {
  inject: ['reload'],
  name: 'FollowUpDialog',
  components: { UploadPicture },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    companyId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: false,
      temp: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      uploadFilePicList: [], // 头像对应数组，用于图片上传和图片回显，回显图片时，新增数组记录需要注意  fileList: [{ name: 'abc.jpeg', url: 'https://abc.jpeg' }, { name: 'efg.jpeg', url: 'https://efg.jpeg' }]
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/upload', // 上传图片服务器地址
      latentUserParam: { // 联系人参数
        start: 1,
        length: 50,
        companyId: null
      },
      latentUserList: [], // 联系人列表
      rules: {
        followType: [
          { required: true, message: '请选择跟进方式', trigger: 'blur' }
        ],
        contactFlag: [
          { required: true, message: '请选择是否联系', trigger: 'blur' }
        ],
        customWorth: [
          { required: true, message: '请选择客户价值', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible: {
      handler: function(val, oldVal) {
        this.templateDialog = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    openDia() {
      const _this = this
      _this.$set(_this.latentUserParam, 'companyId', _this.companyId)
      getLatentUserPager(_this.latentUserParam).then(response => {
        if (response.data.code === 10000) {
          if (response.data.data.length < 1) {
            _this.$message.error('请先添加联系人')
            this.$emit('update:visible', false)
            return false
          }
          _this.latentUserList = response.data.data
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error.toString())
      })
    },
    closeDia(formName) {
      this.temp = {}
      this.uploadFilePicList = []
      this.$refs[formName].resetFields()
      this.$emit('update:visible', false)
    },
    save(formName) {
      const _this = this
      _this.$set(_this.temp, 'companyId', _this.companyId)
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          saveFollow(_this.temp).then(response => {
            if (response.data.code === 10000) {
              _this.$message.success('跟进成功！')
              _this.closeDia('ruleForm')
              _this.reload()
            } else {
              _this.$message.error(response.data.message)
            }
          }).catch((error) => {
            _this.$message.error(error.toString())
          })
        } else {
          _this.$message.error('请填写跟进信息')
        }
      })
    },
    uploadFileData(file) {
      if (file.isRemove) {
        this.temp.filePath = ''
      } else {
        this.temp.filePath = file.url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog{
  .el-dialog__body{
    padding:30px 99px 20px 80px;
  }
  /deep/ .el-form .el-form-item .el-date-editor.el-input{
    width: 100%;
  }
}
</style>
