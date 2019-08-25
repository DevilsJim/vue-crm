/*
    订单信息组件
 */
<template>
  <div class="order">
    <!-- 基本信息 -->
    <div class="item">
      <h3 class="title">基本信息</h3>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="订单编号" align="center" />
        <el-table-column label="合同编号" align="center" />
        <el-table-column label="用户账号" align="center" />
        <el-table-column label="支付方式" align="center" />
        <el-table-column label="付款时间" align="center" />
        <el-table-column label="汇入途径" align="center" />
      </el-table>
    </div>
    <!-- 发票信息 -->
    <div class="item">
      <h3 class="title">发票信息</h3>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="发票类型" align="center" />
        <el-table-column label="发票抬头" align="center" />
        <el-table-column label="社会统一代码" align="center" />
        <el-table-column label="注册地址" align="center" />
        <el-table-column label="公司电话" align="center" />
        <el-table-column label="开户行" align="center" />
      </el-table>
    </div>
    <!-- 联系人信息 -->
    <div class="item">
      <h3 class="title">联系人信息</h3>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="收件人" align="center" />
        <el-table-column label="手机号码" align="center" />
        <el-table-column label="邮政编码" align="center" />
        <el-table-column label="收件地址" align="center" />
      </el-table>
    </div>
    <!-- 商品信息 -->
    <div class="item">
      <h3 class="title">商品信息</h3>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="商品图片" align="center" />
        <el-table-column label="商品名称" align="center" />
        <el-table-column label="价格" align="center" />
        <el-table-column label="属性" align="center" />
        <el-table-column label="数量" align="center" />
        <el-table-column label="小计" align="center" />
      </el-table>
    </div>
    <!-- 费用信息 -->
    <div class="item">
      <h3 class="title">费用信息</h3>
      <el-table
        :data="[]"
        border
        style="width: 100%"
      >
        <el-table-column prop="date" label="订单总金额" align="center" />
        <el-table-column label="优惠金额" align="center" />
        <el-table-column label="应付款金额" align="center" />
      </el-table>
    </div>
    <!-- 审核信息 -->
    <div class="item">
      <h3 class="title">审核信息</h3>
      <div class="wrap">
        <div class="content">
          <span class="left">审核结果</span>
          <span class="word">123</span>
        </div>
        <div class="content">
          <span class="left">审核意见</span>
          <span class="word">123</span>
        </div>
      </div>
    </div>
    <!-- 退款信息 -->
    <div class="item">
      <h3 class="title">退款信息</h3>
      <div class="wrap">
        <div class="content">
          <span class="left">退款流水号</span>
          <span class="word">233233232</span>
        </div>
        <div class="content">
          <span class="left">退款凭证</span>
          <span class="word">图片可点击查看大图</span>
          <i class="img el-icon-picture" src="" alt="" @click="dialogVisible = true" />
        </div>
      </div>
      <el-dialog
        title="图片"
        :visible.sync="dialogVisible"
        width="40%"
      >
        <div><img width="100%" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCkT3UA6UzhzP5Vbzo4R7fd2prAabUoyyl-GcogTEAI9z-aoFRBA" alt=""></div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 返回 -->
    <el-button type="primary" class="back-btn" @click="handleClickBack">返回</el-button>
  </div>
</template>

<script>
export default {
  name: 'DetailOrder',
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    // 图片放大
    handleClickScale() {
      console.log(123)
    },
    // 返回
    handleClickBack() {
      console.log('返回')
    }
  }
}
</script>

<style lang='scss' scoped>
  .order {
    .item {
      .title {
        line-height: 50px;
      }
      .wrap {
        border: 1px solid #dfe6ec;
        .content {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #dfe6ec;
          &:last-child {
            border-bottom: 0;
          }
          span {
            display: block;
            &.left {
              width: 200px;
              padding: 12px 30px 12px 0;
              text-align: right;
              color: #909399;
              border-right: 1px solid #dfe6ec;
            }
            &.word {
              padding-left: 30px;
            }
          }
          .img {
            display: inline-block;
            margin-left: 10px;
            width: 24px;
            height: 24px;
            font-size: 24px;
            color: #159CD5;
            cursor: pointer;
          }
        }
      }
    }
    .back-btn {
      display: block;
      margin: 30px auto;
    }
  }
</style>
