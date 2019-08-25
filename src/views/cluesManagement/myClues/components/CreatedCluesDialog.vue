<template>
  <el-dialog title="创建线索" :close-on-click-modal="flag" :visible.sync="visible" width="650px" @close="closeDia()">
    <el-form ref="dataForm" :model="clues" label-width="90px" size="mini">
      <template>
        <el-row>
          <el-col style="padding-right: 15px;">
            <el-form-item label="公司名称:" prop="nickname" label-width="90px">
              <el-input v-model="clues.companyName" placeholder="请输入公司名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="padding-right: 15px;">
            <el-form-item label="所在地区:" prop="nickname" label-width="90px">
              <el-input v-model="clues.region" placeholder="请输入所在地区" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="padding-right: 15px;">
            <el-form-item label="联系人:" prop="nickname" label-width="90px">
              <el-input v-model="clues.nickName" placeholder="请输入联系人" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="padding-right: 15px;">
            <el-form-item label="职位:" prop="position" label-width="90px">
              <el-input v-model="clues.position" placeholder="请输入职位" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="padding-right: 15px;">
            <el-form-item label="手机号:" prop="mobile" label-width="90px">
              <el-input v-model="clues.mobile" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="padding-right: 15px;">
            <el-form-item label="微信:" prop="position" label-width="90px">
              <el-input v-model="clues.WeChat" placeholder="请输入微信号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="padding-right: 15px;">
            <el-form-item label="邮箱:" prop="nickname" label-width="90px">
              <el-input v-model="clues.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="padding-right: 15px;">
            <el-form-item label="预测意向:" prop="position">
              <el-input v-model="clues.WeChat" placeholder="请输入预测意向" />
            </el-form-item>
          </el-col>
        </el-row>
      </template>
      <!-- 保存, 取消 -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="visible = false">取消</el-button>
      <el-button size="small" type="primary" @click="save('dataForm')">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateCluesDialog',
  props: {
    createdCluesVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: false,
      visible: this.createdCluesVisible,
      clues: {}
    }
  },
  watch: {
    createdCluesVisible: function() {
      this.visible = this.createdCluesVisible
    }
  },
  methods: {
    closeDia() {
      this.$emit('update:createdCluesVisible', false)
    },
    save(formName) {
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-row{
    padding: 0 20px;
  }
  /deep/ .el-form .el-form-item__label, /deep/ .el-form .el-form-item__content, /deep/ .el-form .el-radio{
    font-weight: normal;
  }
  /deep/ .el-form .el-form-item__content .el-select {
    width: 100%;
  }
  /deep/ .el-form .label-style .el-form-item__label{
    font-weight: bold;
  }
  /deep/ .el-form .label-style .el-form-item__content{
    margin-top: 10px;
  }
</style>
