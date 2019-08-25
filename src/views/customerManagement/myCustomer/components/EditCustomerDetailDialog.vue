<template>
  <el-dialog
    title="客户详细信息"
    :visible.sync="templateDialog"
    :close-on-click-modal="flag"
    width="820px"
    @close="closeDia"
  >

    <el-tabs v-model="activeTabsName" type="border-card">
      <!-- 客户基本信息 -->
      <el-tab-pane label="客户基本信息" name="first">
        <el-header class="title" height="auto">基本信息</el-header>
        <!-- 编辑 -->
        <el-button size="small" type="success" class="edit-customer" @click="editCompany()">编辑</el-button>
        <!-- 表单 -->
        <el-form size="mini" :model="temp" label-width="150px" style="width: 500px">
          <!-- 公司名称 -->
          <el-form-item label="公司名称:">
            <el-input v-model="temp.companyName" placeholder="请输入公司名称" :readonly="companyIsReadOnly" clearable />
          </el-form-item>
          <!-- 地址 -->
          <el-form-item label="地址:">
            <el-input v-model="temp.licenseAddress" placeholder="请输入详细地址" :readonly="companyIsReadOnly" clearable />
          </el-form-item>
          <!-- 社会统一信用代码 -->
          <el-form-item label="社会统一信用代码:">
            <el-input v-model="temp.organizationCode" placeholder="请输入跟进" :readonly="companyIsReadOnly" clearable />
          </el-form-item>
          <!-- 上传文件 -->
          <el-form-item label="证明文件:">
            <upload-picture :upload-url="uploadUrl" :cus-file-list="uploadFilePicList" :file-type="true" @resFileData="uploadFileData" />
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="temp.applicatBodyUrl" alt="">
            </el-dialog>

          </el-form-item>
          <!-- 保存, 取消 -->
          <el-form-item>
            <el-button size="small" @click="templateDialog = false">取消</el-button>
            <el-button size="small" type="primary" plain @click="dialogStatus==='create'?createData():updateData()">保存</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 发票信息 -->
      <el-tab-pane label="发票信息" name="second">
        <el-header class="title" height="auto">发票信息<el-button type="success" size="small" class="add-address-btn" @click="createBillInfo = true;createorUpdateBillInfo = true;billInfo={}">添加</el-button></el-header>
        <div v-for="item in invoiceListData.list" :key="item.createUserId" class="invoice">
          <div class="invoice-title">
            <span class="inner-title">{{ item.unitName }}</span>
            <el-button type="success" size="small" @click="billInfo = item; createorUpdateBillInfo=false;createBillInfo = true;">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteInvoice(item)">删除</el-button>
            <i class="el-icon-arrow-up" />
          </div>
          <el-button v-if="item.defaultFlag==1" class="set-btn" type="info" size="small" disabled round plain>默认信息</el-button>
          <el-button v-if="item.defaultFlag==0" class="set-btn" type="primary" size="small" round plain @click="updateZgCompanyBillToDefault(item)">设为默认</el-button>
          <!-- 表单 -->
          <el-form class="invoice-form" size="mini" :model="temp" label-width="100px" style="width: 650px">
            <!-- 发票抬头, 纳税人识别号 -->
            <el-row>
              <el-col :span="12" style="padding-right: 15px;">
                <el-form-item label="发票抬头:">
                  {{ item.unitName }}
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-left: 15px;">
                <el-form-item label="纳税人识别号:">
                  {{ item.taxpayerNo }}
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 注册地址, 公司电话 -->
            <el-row>
              <el-col :span="12" style="padding-right: 15px;">
                <el-form-item label="注册地址:">
                  {{ item.registerAddress }}
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-left: 15px;">
                <el-form-item label="公司电话:">
                  {{ item.registerPhone }}
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 开户行, 开户行账号 -->
            <el-row>
              <el-col :span="12" style="padding-right: 15px;">
                <el-form-item label="开户行:">
                  {{ item.bankName }}
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-left: 15px;">
                <el-form-item label="开户行账号:">
                  {{ item.bankAccount }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div v-if="createBillInfo == true">
          <el-header class="title" height="auto"><template v-if="createorUpdateBillInfo">添加</template><template v-if="!createorUpdateBillInfo">修改</template>发票信息</el-header>
          <el-form class="invoice-form" size="mini" :model="billInfo" label-width="100px" style="width: 650px">
            <!-- 发票抬头, 纳税人识别号 -->
            <el-row>
              <el-col :span="12" style="padding-right: 15px;">
                <el-form-item label="发票抬头:">
                  <el-input v-model="billInfo.unitName" placeholder="请输入发票抬头" />
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-left: 15px;">
                <el-form-item label="纳税人识别号:">
                  <el-input v-model="billInfo.taxpayerNo" placeholder="请输入纳税人识别号" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 注册地址, 公司电话 -->
            <el-row>
              <el-col :span="12" style="padding-right: 15px;">
                <el-form-item label="注册地址:">
                  <el-input v-model="billInfo.registerAddress" placeholder="请输入注册地址" />
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-left: 15px;">
                <el-form-item label="公司电话:">
                  <el-input v-model="billInfo.registerPhone" placeholder="请输入公司电话" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 开户行, 开户行账号 -->
            <el-row>
              <el-col :span="12" style="padding-right: 15px;">
                <el-form-item label="开户行:">
                  <el-input v-model="billInfo.bankName" placeholder="请输入开户行" />
                </el-form-item>
              </el-col>
              <el-col :span="12" style="padding-left: 15px;">
                <el-form-item label="开户行账号:">
                  <el-input v-model="billInfo.bankAccount" placeholder="请输入开户行账号" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 保存, 取消 -->
            <el-row style="padding: 30px 0 0 0; display: block;">
              <el-col :span="24" style="text-align: center;">
                <el-form-item>
                  <el-button type="primary" plain @click="saveOrUpdateInvoiceData">保存发票</el-button>
                  <el-button type="primary" plain @click="createBillInfo = false; billInfo = {}">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </el-tab-pane>

      <!-- 邮寄地址 -->
      <el-tab-pane label="邮寄地址" name="third">
        <el-header class="title" height="auto">邮寄地址<el-button type="success" size="small" class="add-address-btn" @click="shwoAddMailModel()">添加</el-button></el-header>
        <!-- 地址列表 -->
        <el-table :data="gridData" border style="margin-bottom: 20px;">
          <el-table-column width="80" prop="recipientName" label="收件人" align="center" />
          <el-table-column width="160" prop="recipientAddress" label="所在地区" />
          <el-table-column width="200" prop="addressDetail" label="详细地址" />
          <el-table-column width="70" prop="postcode" label="邮编" class-name="is-primary-display" align="center" />
          <el-table-column label="操作" class-name="is-primary-display" align="center">
            <template slot-scope="scope">
              <el-button type="success" size="small" plain @click="showEditMailModel(scope.row)">修改</el-button>
              <el-button type="danger" size="small" plain @click="deleteEditMail(scope.row)">删除</el-button>
              <el-button v-if="scope.row.defaultFlag!=0" type="info" size="small" plain round disabled @click="setDefaultMail(scope.row)">默认信息</el-button>
              <el-button v-if="scope.row.defaultFlag==0" type="primary" size="small" plain round @click="setDefaultMail(scope.row)">设为默认</el-button>
              <!--<el-button type="info" size="small" disabled plain>默认地址</el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <!-- 修改邮寄地址 -->
        <div v-if="createOrUpdate==='update'">
          <el-header class="title" height="auto">修改邮寄地址</el-header>
          <!-- 添加/修改地址  -->
          <el-form size="mini" :model="mailEditData" label-width="150px" style="width: 450px">
            <!-- 收件人 -->
            <el-form-item label="收件人:">
              <el-input v-model="mailEditData.recipientName" placeholder="请输入收件人名称" clearable />
            </el-form-item>
            <!-- 性别 -->
            <el-form-item label="性别:">
              <input v-model="mailEditData.recipientSex" :name="mailEditData.recipientSex" :value="0" class="input-radio" type="radio" :checked="true">男
              <input v-model="mailEditData.recipientSex" :name="mailEditData.recipientSex" :value="1" class="input-radio" type="radio">女
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item label="手机号:">
              <el-input v-model="mailEditData.recipientMobile" placeholder="请输入手机号" clearable />
            </el-form-item>
            <!-- 所在地区 -->
            <el-form-item label="所在地区:">
              <el-input v-model="mailEditData.recipientAddress" placeholder="请输入所在地区" clearable />
            </el-form-item>
            <!-- 详细地址 -->
            <el-form-item label="详细地址:">
              <el-input v-model="mailEditData.addressDetail" placeholder="请输入详细地址" clearable />
            </el-form-item>
            <!-- 邮编 -->
            <el-form-item label="邮编:">
              <el-input v-model="mailEditData.postcode" placeholder="邮编" clearable />
            </el-form-item>
            <!-- 保存 -->
            <el-form-item style="margin-top: 40px;">
              <el-button type="primary" plain @click="mailCreateOrUpdate==='create' ? createMailData(mailEditData) : updateMailDatas(mailEditData)">保存地址</el-button>
              <el-button type="primary" plain @click="createOrUpdate='', mailEditData = {}">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <!-- 添加邮寄地址 -->
        <div v-if="createOrUpdate==='create'">
          <el-header class="title" height="auto">添加邮寄地址</el-header>
          <!-- 添加地址  -->
          <el-form size="mini" :model="addMailMap" label-width="150px" style="width: 450px">
            <!-- 收件人 -->
            <el-form-item label="收件人:">
              <el-input v-model="addMailMap.recipientName" placeholder="请输入收件人名称" clearable />
            </el-form-item>
            <!-- 性别 -->
            <el-form-item label="性别:">
              <input v-model="addMailMap.recipientSex" :name="addMailMap.recipientSex" :value="0" class="input-radio" type="radio" :checked="true">男
              <input v-model="addMailMap.recipientSex" :name="addMailMap.recipientSex" :value="1" class="input-radio" type="radio">女
            </el-form-item>
            <!-- 手机号 -->
            <el-form-item label="手机号:">
              <el-input v-model="addMailMap.recipientMobile" placeholder="请输入手机号" clearable />
            </el-form-item>
            <!-- 所在地区 -->
            <el-form-item label="所在地区:">
              <el-input v-model="addMailMap.recipientAddress" placeholder="请输入所在地区" clearable />
            </el-form-item>
            <!-- 详细地址 -->
            <el-form-item label="详细地址:">
              <el-input v-model="addMailMap.addressDetail" placeholder="请输入详细地址" clearable />
            </el-form-item>
            <!-- 邮编 -->
            <el-form-item label="邮编:">
              <el-input v-model="addMailMap.postcode" placeholder="邮编" clearable />
            </el-form-item>
            <!-- 保存 -->
            <el-form-item style="margin-top: 40px;">
              <el-button type="primary" plain @click="createMailData()">保存地址</el-button>
              <el-button type="primary" plain @click="createOrUpdate='', addMailMap = {}">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

    </el-tabs>

    <el-table
      v-loading="listLoading"
      style="display: none"
      :data="list"
      element-loading-text="Loading"
      fit
      border
      highlight-current-row
    >
      <el-table-column type="selection" width="55" />
      <el-table-column align="center" label="ID" type="index" width="55" />
      <el-table-column prop="date" label="日期" sortable width="180" />
      <el-table-column prop="name" label="姓名" sortable width="180" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </el-dialog>
</template>

<script>
import { getInfo, updateCompamyData } from '@/api/company'
import { getInvoiceList, saveInvoiceData, updateInvoiceData, updateZgCompanyBillToDefault } from 'api/invoice'
import { getMailList, updateMailData, updateZgCompanyAddressToDefault, addMailData } from 'api/mail'
import UploadPicture from './UploadPicture'

export default {
  inject: ['reload'],
  name: 'EditCustomerDetailDialog',
  components: { UploadPicture },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: this.visible,
      list: null,
      listLoading: true,
      activeTabsName: 'first',
      temp: {
        companyName: '',
        organizationCode: '',
        licenseAddress: '',
        applicatBodyUrl: ''
      },
      billInfo: {},
      dialogImageUrl: '',
      dialogVisible: false,

      gridData: [],
      companyData: {
        companyId: ''
      },
      companyIsReadOnly: true,
      dialogStatus: 'update',
      pkSid: 0,
      invoiceData: {
        companyId: '',
        deleteStatus: 0
      },
      invoiceListData: {
        list: []
      },
      mailData: {
        companyId: '',
        deleteStatus: 0
      },
      mailEditData: {},
      mailCreateOrUpdate: 'create',
      createBillInfo: false,
      createorUpdateBillInfo: true,
      createOrUpdate: '',
      addMailMap: {},
      uploadUrl: process.env.VUE_APP_BASE_API + '/common/upload',
      uploadFilePicList: []
    }
  },
  watch: {
    visible: function() {
      this.templateDialog = this.visible
    },
    'temp.applicatBodyUrl': {
      handler: function(val, oldVal) {
        this.$set(this.uploadFilePicList, 0, { url: val })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.handleCompanyData(this.$route.params.currentCompanyId)
    this.handleInvoiceList(this.$route.params.currentCompanyId)
    this.handleMailList(this.$route.params.currentCompanyId)
  },
  methods: {
    closeDia() {
      this.$emit('update:visible', false)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 公司详细信息科编辑
    editCompany() {
      this.companyIsReadOnly = false
    },
    // 获取公司详细信息
    handleCompanyData(companyId) {
      this.companyData.companyId = companyId
      getInfo(this.companyData).then(response => {
        this.temp.pkSid = response.data.data[0].pkSid
        this.temp.companyId = response.data.data[0].companyId
        this.temp.companyName = response.data.data[0].companyName
        this.temp.licenseAddress = response.data.data[0].licenseAddress
        this.temp.organizationCode = response.data.data[0].organizationCode
        this.temp.applicatBodyUrl = response.data.data[0].applicatBodyUrl
      }).catch((err) => {
        console.log('err', err)
      })
    },
    // 保存公司详细信息
    updateData() {
      updateCompamyData(this.temp).then(response => {
        const code = response.data.code
        if (code === 10000) {
          this.$message.success(response.data.message)
          this.handleCompanyData(this.$route.params.currentCompanyId)
          this.closeDia()
          this.reload()
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 获取发票列表信息
    handleInvoiceList(companyId) {
      this.invoiceData.companyId = companyId
      this.invoiceData.deleteStatus = 0
      getInvoiceList(this.invoiceData).then(response => {
        this.invoiceListData = Object.assign({}, this.invoiceListData, {
          list: response.data.data
        })
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 更新发票信息
    updateInvoiceData(item) {
      updateInvoiceData(item).then(response => {
        const code = response.data.code
        if (code === 10000) {
          this.$message.success(response.data.message)
          this.handleInvoiceList(this.$route.params.currentCompanyId)
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 保存发票信息
    saveInvoiceData(item) {
      item.companyId = this.$route.params.currentCompanyId
      saveInvoiceData(item).then(response => {
        const code = response.data.code
        if (code === 10000) {
          this.$message.success(response.data.message)
          this.handleInvoiceList(this.$route.params.currentCompanyId)
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    saveOrUpdateInvoiceData() {
      if (this.createorUpdateBillInfo) {
        this.saveInvoiceData(this.billInfo)
      } else {
        this.updateInvoiceData(this.billInfo)
      }
      this.billInfo = {}
      this.createBillInfo = false
    },
    updateZgCompanyBillToDefault(item) {
      updateZgCompanyBillToDefault(item).then(response => {
        const code = response.data.code
        if (code === 10000) {
          this.$message.success(response.data.message)
          this.handleInvoiceList(this.$route.params.currentCompanyId)
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 删除发票信息
    deleteInvoice(item) {
      item.deleteStatus = 1
      updateInvoiceData(item).then(response => {
        const code = response.data.code
        if (code === 10000) {
          this.$message.success(response.data.message)
          this.handleInvoiceList(this.$route.params.currentCompanyId)
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 获取邮寄地址列表信息
    handleMailList(companyId) {
      this.mailData.companyId = companyId
      this.invoiceData.deleteStatus = 0
      getMailList(this.invoiceData).then(response => {
        this.gridData = response.data.data
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 显示将要修改的邮寄地址数据
    showEditMailModel(item) {
      this.mailEditData = item
      this.mailCreateOrUpdate = 'update'
      this.createOrUpdate = 'update'
    },
    // 修改邮寄地址数据
    updateMailDatas(mailEditData) {
      updateMailData(mailEditData).then(response => {
        const code = response.data.code
        if (code === 10000) {
          this.$message.success(response.data.message)
          this.handleMailList(this.$route.params.currentCompanyId)
          this.mailEditData = {}
          this.createOrUpdate = ''
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 显示添加邮寄地址表单
    shwoAddMailModel() {
      this.mailEditData = {}
      this.createOrUpdate = 'create'
    },
    // 添加邮寄地址数据
    createMailData() {
      this.addMailMap.companyId = this.$route.params.currentCompanyId
      this.addMailMap.deleteStatus = 0
      addMailData(this.addMailMap).then(response => {
        const code = response.data.code
        if (code === 10000) {
          this.$message.success(response.data.message)
          this.handleMailList(this.$route.params.currentCompanyId)
          this.mailData = {}
          this.createOrUpdate = ''
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 删除邮寄地址数据
    deleteEditMail(mailEditData) {
      mailEditData.deleteStatus = 1
      updateMailData(mailEditData).then(response => {
        const code = response.data.code
        if (code === 10000) {
          this.$message.success(response.data.message)
          this.handleMailList(this.$route.params.currentCompanyId)
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 设为默认邮寄地址
    setDefaultMail(mailEditData) {
      mailEditData.defaultFlag = 1
      updateZgCompanyAddressToDefault(mailEditData).then(response => {
        const code = response.data.code
        if (code === 10000) {
          this.$message.success(response.data.message)
          this.handleMailList(this.$route.params.currentCompanyId)
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },

    /**
     * 业务模板上传
     * @param file 文件信息
     * @author guoyuqin
     */
    uploadFileData(file) {
      if (file.isRemove) {
        this.temp.applicatBodyUrl = ''
      } else {
        this.temp.applicatBodyUrl = file.url
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tabs{
    &.el-tabs--border-card{
     box-shadow: none;
     border-bottom: none;
     border-right: none;
     border-left: none;
     /deep/ .el-tabs__content{
        padding: 10px 25px 20px 25px;
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
.el-button.edit-customer{
  position: absolute;
  right: 40px;
  top: 76px;
}
/deep/ .el-dialog{
  .el-dialog__header{
    border-bottom: none;
  }
  .el-dialog__body{
    padding:0
  }
  .invoice{
    position: relative;
    border: 1px solid #ebebeb;
    margin-bottom: 35px;
    .invoice-title{
      height: 54px;
      line-height: 54px;
      background: #f0f7fc;;
      text-align: right;
      padding: 0 10px 0 25px;
      margin-bottom: 25px;
      border-bottom: 1px solid #ebebeb;
      i{
        font-size: 20px;
        padding: 5px 8px;
        vertical-align: middle;
        cursor: pointer;
      }
      .inner-title{
        height: 54px;
        line-height: 54px;
        background: #f0f7fc;;
        float: left;
        /*text-align: left;*/
        padding: 0 10px 0 25px;
        margin-bottom: 25px;
        border-bottom: 1px solid #ebebeb;
      }
    }
    .set-btn{
      position: absolute;
      right: 30px;
      top: 135px;
    }
  }
}
.el-form{
  &.invoice-form {
    .el-row {
      padding-right: 50px;
    }
  }
  /deep/ .el-form-item__label, /deep/ .el-form-item__content, /deep/ .el-radio{
    font-weight: normal;
  }
  /deep/ .el-form-item__content{
    .el-select {
      width: 100%;
    }
    .el-date-editor {
      width: 400px;
      /deep/ .el-range-input{
        width: 80%;
      }
    }
    .el-cascader{
      width: 100%;
    }
  }
}
</style>
