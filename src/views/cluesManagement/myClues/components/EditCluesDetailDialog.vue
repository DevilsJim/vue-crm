<template>
  <el-dialog
    title="编辑线索基本信息"
    :visible.sync="templateDialog"
    :close-on-click-modal="flag"
    width="500px"
    @close="closeDia"
    @open="openDia"
  >

    <el-form ref="ruleForm" size="mini" :model="cluesData" label-width="120px">
      <!-- 公司名称 -->
      <el-form-item label="公司名称:" prop="companyName">
        <el-input v-model="cluesData.companyName" placeholder="请输入公司名称" clearable />
      </el-form-item>
      <!-- 公司地址 -->
      <el-form-item label="公司地址:" prop="address" class="custom-prop">
        <el-input v-model="cluesData.address" placeholder="请输入公司地址" clearable />
      </el-form-item>
      <!-- 线索备注 -->
      <el-form-item label="线索备注:">
        <el-input v-model="cluesData.desc" type="textarea" />
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
export default {
  name: 'EditCluesDetailDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    cluesDataVisible: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      flag: false,
      templateDialog: this.visible,
      cluesData: {}
    }
  },
  watch: {
    visible() {
      this.templateDialog = this.visible
    },
    cluesDataVisible() {
      this.cluesData = this.cluesDataVisible
    }
  },
  methods: {
    closeDia() {
      this.$emit('update:visible', false)
      this.cluesData = {}
    },
    openDia() {

    },
    save() {
      this.$message.success('保存成功')
    }
  }
}
</script>

<style scoped>

</style>
