/* 步骤条组件 */
<template>
  <el-steps
    :active="2"
    finish-status="success"
    align-center
    class="step-wrap"
  >
    <el-step title="业务填写" description="这是一段很长很长很长的描述性文字" />
    <el-step title="业务审核" description="这是一段很长很长很长的描述性文字" />
    <el-step title="提交报件" description="这段就没那么长了" />
    <el-step title="回传资料" description="这段就没那么长了" />
    <el-step title="报件完成" description="这段就没那么长了" />
  </el-steps>
</template>

<script>
export default {
  name: 'Step',
  props: {
    setpData: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang='scss' scoped>
.step-wrap {
  position: relative;
  margin-bottom: 10px;
  padding: 30px 20px 20px;
  .close {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    color: #0007FF;
  }
}
</style>
