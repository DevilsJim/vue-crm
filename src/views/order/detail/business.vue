/*
    业务信息组件
 */

<template>
  <div class="business">
    <el-form>
      <el-form-item label="商标名称：">1231231</el-form-item>
      <el-form-item label="商标描述：">123123</el-form-item>
      <el-form-item label="图片上传：">
        <!-- <el-tooltip class="item" effect="dark" content="注：请上传正确的图片格式，小于200kb。于“400*400” - “1500*1500之间的方形图片。”" placement="right">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy-e-a7qWR8oGXPWxYgH_HBFPR0z-bf6gxANvbFui3mulZuuvY" alt="">
        </el-tooltip> -->
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="imgList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击重新上传</el-button>
          <div slot="tip" class="el-upload__tip">注：请上传正确的图片格式，小于200kb。于“400*400” - “1500*1500之间的方形图片。”</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="商标属性：">
        <el-tag>标签三</el-tag>
      </el-form-item>
      <el-form-item label="商标描述类型：">
        <el-tag>标签三</el-tag>
      </el-form-item>
      <el-form-item label="优先权：">
        <el-radio v-model="radio" disabled label="无">无</el-radio>
        <el-radio v-model="radio" disabled label="有在先优先权">有在先优先权</el-radio>
        <el-radio v-model="radio" disabled label="有展会优先权">有展会优先权</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'DetailBusiness',
  data() {
    return {
      radio: '无',
      imgList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  methods: {
    // 文件已上传
    handlePreview(file) {
      console.log(file)
    },
    // 文件移除
    handleRemove(file, fileList) {
      console.log(file, fileList)
    }
  }
}
</script>

<style lang='scss' scoped>
  .business {
    /deep/.el-tooltip {
      margin-top: 10px;
      display: block;
      width: 200px;
    }
    /deep/ .el-upload-list__item {
      width: 20%;
    }
  }
</style>
