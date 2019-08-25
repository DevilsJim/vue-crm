/*
    开票信息
 */
<template>
  <div class="wrap">
    <!-- <el-dialog :visible.sync="showDialog" @close="$emit('closeDialogInvoice')">
      <template slot="title">
        开票信息<span style="color: #FF0001;">（发票抬头 = 合同的抬头 = 客户名称）</span>
      </template>
      <el-form :model="form">
        <el-form-item label="开票方式：">
          <el-radio-group v-model="form.radio">
            <el-radio label="3">官费部分不需要官方收据</el-radio>
            <el-radio label="6">官费部分需要官方收据</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="发票类型：">
          <el-radio-group v-model="form.invoiceType">
            <el-radio label="0">电子普通发票</el-radio>
            <el-radio label="1">纸质普通发票</el-radio>
            <el-radio label="2">增值税专用发票</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发票抬头：">
          <el-col :span="10">
            <el-input v-model="form.invoiceTitle" />
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="5">
            <span class="link-text">修改</span>
          </el-col>
        </el-form-item>
        <el-form-item label="注册地址：">
          <el-col :span="10">
            <el-input v-model="form.address" />
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="5">
            <span class="link-text">修改</span>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-table :model="[]" border>
            <el-table-column label="收件人" align="center" />
            <el-table-column label="所在地区" align="center" />
            <el-table-column label="详细地址" align="center" />
            <el-table-column label="邮编" align="center" />
            <el-table-column label="操作" align="center" />
          </el-table>
        </el-form-item>
        <el-form-item label="备注信息：">
          <el-col :span="10">
            <el-input
              v-model="form.remark"
              type="textarea"
              :rows="3"
              placeholder="请输入备注信息"
            />
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="$emit('closeDialogInvoice')">取消</el-button>
          <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
    <el-dialog class="dialog-nothing" title="开票信息" :visible.sync="showDialog" @close="$emit('closeDialogInvoice')">
      <template v-if="!isMaintain">
        <h3 class="dialog-title">你还未添加过发票信息,添加后方可申请开票</h3>
        <el-button icon="el-icon-plus" @click="isMaintain = true">添加发票信息</el-button>
      </template>
      <template v-else>
        <el-form :model="formInvoice">
          <!-- 纳税人类型 -->
          <el-form-item label="请选择纳税人类型：">
            <el-radio-group v-model="formInvoice.taxpayer">
              <el-radio label="1">一般纳税人</el-radio>
              <el-radio label="2">小规模纳税人</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--  证明人文件  -->
          <el-form-item label="证明人文件：">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload" />
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
          <!--  开票方式  -->
          <el-form-item label="开票方式：">
            <el-radio-group v-model="formInvoice.invoiceWay">
              <el-radio label="1">官费部分不需要官方收据</el-radio>
              <el-radio label="2">官费部分需要官方收据</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--  开票类型  -->
          <el-form-item label="开票类型：">
            <el-radio-group v-model="formInvoice.invoiceType">
              <el-radio label="1">电子普通发票</el-radio>
              <el-radio label="2">纸质普通发票</el-radio>
              <el-radio label="3">增值税专用发票</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--  基本信息  -->
          <el-form-item label="基本信息：" class="basic-wrap">
            <template>
              <el-col :span="11" class="basicMsg">
                <span class="text">发票抬头：</span> <el-input v-model="formInvoice.invoiceTitle" placeholder="请输入公司全称" />
              </el-col>
              <el-col :span="11" class="basicMsg">
                <span class="text">纳税人识别号：</span> <el-input v-model="formInvoice.taxpayerNum" placeholder="请输入社会统一信用代码" />
              </el-col>
              <el-col :span="11" class="basicMsg">
                <span class="text">地址：</span> <el-input v-model="formInvoice.registerAddress" placeholder="请输入注册地址" />
              </el-col>
              <el-col :span="11" class="basicMsg">
                <span class="text">公司电话：</span> <el-input v-model="formInvoice.companyTel" placeholder="请输入税务机关登记的电话" />
              </el-col>
              <el-col :span="11" class="basicMsg">
                <span class="text">开户行：</span> <el-input v-model="formInvoice.bank" placeholder="请输入开户行" />
              </el-col>
              <el-col :span="11" class="basicMsg">
                <span class="text">开户行账号：</span> <el-input v-model="formInvoice.openingBank" placeholder="请输入开户行账号" />
              </el-col>
            </template>
          </el-form-item>
          <el-form-item label="添加邮寄地址" class="basic-wrap">
            <!-- 地址信息 -->
            地址信息：<el-input v-model="formInvoice.addressMsg" placeholder="请输入地址信息" />
            <!-- 详细地址 -->
            详细地址：<el-input v-model="formInvoice.addressDetail" placeholder="请输入详细地址" />
            <!-- 邮政编码 -->
            邮政编码：<el-input v-model="formInvoice.postalcode" placeholder="请输入邮政编码" />
            <!-- 收货人姓名 -->
            收货人姓名：<el-input v-model="formInvoice.consignee" placeholder="请输入收货人姓名" />
            <!-- 手机号码 -->
            手机号码：<el-input v-model="formInvoice.mobile" placeholder="请输入手机号码" />
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input
              v-model="formInvoice.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入备注信息"
            />
          </el-form-item>
          <!-- 操作按钮 -->
          <el-form-item>
            <el-button size="small" @click="$emit('closeDialogInvoice')">取消</el-button>
            <el-button type="primary" size="small" @click="handleSubmit">确定</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'InvoiceMsg',
  props: {
    isShow: { // 是否展示弹窗
      type: Boolean,
      default: false
    },
    isMaintain: { // 是否已经设置过发票信息
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showDialog: this.isShow,
      // 没有开票信息的form
      formInvoice: {
        taxpayer: '1', // 纳税人类型
        invoiceWay: '1', // 开票方式
        invoiceType: '1', // 开票类型
        invoiceTitle: '', // 发票抬头
        taxpayerNum: '', // 纳税人识别号
        registerAddress: '', // 注册地址
        bank: '', // 开户行
        openingBank: '', // 开户行账号
        addressMsg: '', // 地址信息
        addressDetail: '', // 详细地址
        postalcode: '', // 邮政编码
        consignee: '', // 收货人姓名
        mobile: '', // 手机号码
        remark: '' // 备注信息
      },
      // 已经有开票信息的form
      form: {
        radio: '3',
        invoiceType: '', // 发票类型
        invoiceTitle: '', // 发票抬头
        address: '', // 注册地址
        remark: '' // 备注信息
      }
    }
  },
  watch: {
    isShow(newV) {
      this.showDialog = newV
    }
  },
  methods: {
    // 没有开票信息的form表单提交
    handleSubmit() {
      console.log('表单提交')
    },
    // 有开票信息的form提交
    onSubmit() {
      console.log(1)
    }
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  .dialog-nothing {
    .dialog-title {
      margin-bottom: 20px;
    }
    .basic-wrap {
      /deep/ label {
        margin-bottom: 10px;
        display: block;
        width: 100%;
        text-align: left;
        font-weight: 700;
        border-bottom: 1px solid #b4bccc;
      }
      .basicMsg {
        display: flex;
        justify-content: space-between;
        margin: 0 3% 10px 0;
        .text {
          flex: 0 0 100px;
        }
      }
    }
  }
  .link-text {
    color: #1D2BFE;
    cursor: pointer;
  }
  .el-form-item:last-child {
    text-align: center;
  }
}
</style>
