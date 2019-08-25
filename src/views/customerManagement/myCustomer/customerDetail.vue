<template>
  <div class="app-container customer-detail">
    <!-- header -->
    <el-container height="auto" direction="horizontal">
      <div style="width: 50%">
        <h2>
          <el-popover
            placement="bottom"
            trigger="hover"
            :disabled="companyChildren.length === 0"
          >
            <el-table :data="companyChildren">
              <el-table-column min-width="200" prop="companyName" label="公司" />
              <el-table-column width="50" label="主显" prop="companyId" class-name="is-primary-display" align="center">
                <template slot-scope="scope">
                  <el-tooltip v-if="scope.row.ifParentCompany === 1" class="item" effect="dark" content="主显公司" placement="right-start">
                    <svg-icon icon-class="home" class-name="home" style="font-size: 18px;" />
                  </el-tooltip>
                  <el-tooltip v-else class="item" effect="dark" content="设为主显" placement="right-start">
                    <svg-icon icon-class="edit" class-name="edit" style="cursor: pointer" @click="setChild2ParentInfo(scope.row.companyId)" />
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <svg-icon slot="reference" icon-class="menu2" class-name="menu3" />
          </el-popover>
          {{ companyInfo.companyName }}
          <svg-icon v-if="ifOwnCompany === '1'" icon-class="edit" class-name="edit" @click="editCustomerDetailVisible = true" />
        </h2>
        <div class="tags">
          <template v-for="tag in companyInfo.tags">
            <el-tag v-for="item in tag.listTag" :key="item.tagId" :disable-transitions="false" size="small">{{ item.tagName }}</el-tag>
          </template>
          <el-button v-if="ifOwnCompany === '1'" class="button-new-tag" size="small" @click="addTagsVisible = true">+ 标签</el-button>
        </div>
        <!--<p class="info"><span>客户地址：北京市海淀区清河街道23号院</span><span>默认发票抬头：北京知果科技公司</span></p>-->
        <!--<p class="info"><span>统一信用代码：LKJKJDK232039DKLKDKF239</span><span>默认收件人：张翰康</span></p>-->
      </div>
      <div v-if="ifOwnCompany === '1'" style="width: 50%; text-align: right; padding-top: 20px;" class="con-right">
        <el-button size="small" type="success" @click="followUpVisible = true">跟进</el-button>
        <el-button size="small" type="primary" @click="releasePrivateCustomerVisible = true">释放到公海</el-button>
        <!--<el-button size="small" type="primary" @click="handleFollowUp">代客下单</el-button>-->
      </div>
    </el-container>

    <!-- 联系人 -->
    <div class="container-sub">
      <el-row>
        <el-col :span="12"><h3>联系人</h3></el-col>
        <el-col v-if="ifOwnCompany === '1'" :span="12" style="text-align: right;">
          <el-button size="small" icon="el-icon-plus" type="success" @click="handleAddEditContacts('add')">添加联系人</el-button></el-col>
      </el-row>
      <el-table
        :data="gridDataLatent.list"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        class="company-info-table"
      >
        <el-table-column label="姓名" prop="nickname" width="120" class-name="user-info" align="center" />
        <el-table-column label="职位" prop="duty" width="120" class-name="tags" align="center" />
        <el-table-column label="电话" prop="userMobile" width="120" align="center" />
        <el-table-column label="座机号" prop="telephone" width="120" align="center" />
        <el-table-column label="微信" prop="wxNumber" width="180" align="center" />
        <el-table-column label="QQ" prop="qqNumber" width="120" align="center" />
        <el-table-column label="邮箱" prop="userEmail" width="200" align="center" />
        <el-table-column label="状态" width="150" align="center">
          <template slot-scope="scope"><span v-if="scope.row.onJobFlag == 1">在职</span><span v-if="scope.row.onJobFlag == 0">离职</span></template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="230" fixed="right">
          <template v-if="ifOwnCompany === '1'" slot-scope="scope">
            <el-button type="success" size="mini" icon="el-icon-edit" @click="handleAddEditContacts('edit', scope.row)">编辑</el-button>
            <el-button v-if="scope.row.mainUserFlag === 1" type="primary" size="mini" @click="handleChooseOrderWay(scope.row.userId)">设为主显</el-button>
            <el-button v-if="scope.row.mainUserFlag !== 1" type="primary" size="mini" disabled plain>主显信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="gridDataLatent.userParams.start"
        :page-size="gridDataLatent.userParams.length"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination-table"
        :total="gridDataLatent.userParams.total"
        @size-change="handleLatentSizeChange"
        @current-change="handleLatentCurrentChange"
      />
    </div>

    <!-- 相关商机 -->
    <div class="container-sub">
      <el-row>
        <el-col :span="12"><h3>相关商机</h3></el-col>
        <el-col v-if="ifOwnCompany === '1'" :span="12" style="text-align: right;">
          <el-button size="small" icon="el-icon-plus" type="success" @click="handleCreateBusiness">新建商机</el-button></el-col>
      </el-row>
      <el-table
        :data="businessData.list"
        element-loading-text="Loading"
        fit
        border
        highlight-current-row
        class="company-info-table"
      >
        <el-table-column label="商机编号" prop="businessId" width="250" class-name="user-info" align="center" />
        <el-table-column label="商机名称" width="220" class-name="company-name" header-align="center">
          <template slot-scope="scope">
            <router-link :to="{path:'/businessManagement/businessDetail/' + scope.row.businessId}">
              <div class="name">{{ scope.row.bussinessName }}</div>
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="联系人" prop="userName" width="120" align="center" />
        <el-table-column label="意向业务" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.businessPurpose | businessPurposeFilter }}</template>
        </el-table-column>
        <el-table-column label="商机进度" width="110" align="center">
          <template slot-scope="scope">{{ scope.row.businessProgress | businessProgressFilter }}</template>
        </el-table-column>
        <el-table-column label="成交几率" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.dealPercent }}%</template>
        </el-table-column>
        <el-table-column label="下次跟进时间" prop="nextFollowTime" width="200" align="center" />
        <el-table-column label="商机创建时间" prop="createTime" width="200" align="center" />
        <el-table-column label="操作" align="center" min-width="150" fixed="right">
          <template v-if="ifOwnCompany === '1'" slot-scope="scope">
            <router-link :to="{path:'/businessManagement/businessDetail/' + scope.row.businessId}">
              <el-button type="primary" size="mini">查看详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :current-page="businessData.start"
        :page-size="businessData.length"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination-table"
        :total="businessData.total"
        @size-change="handleBusinessSizeChange"
        @current-change="handleBusinessCurrentChange"
      />
    </div>

    <!-- 动态记录 -->
    <div class="container-sub list-con">
      <el-main>
        <el-tabs v-model="activeTabsName" type="border-card">
          <!-- 动态记录 -->
          <el-tab-pane label="动态记录" name="first">
            <el-table :data="dynamicsInfo.list" border>
              <el-table-column width="150" prop="dynamicLogName" label="动态记录" />
              <el-table-column width="160" prop="dealTime" label="时间" align="center" />
              <el-table-column width="100" prop="dealUserName" label="操作人" align="center" />
              <el-table-column width="200" prop="operationContent" label="操作内容">
                <template slot-scope="scope">
                  <el-row>老顾问： {{ scope.row.oldCounselorName }}</el-row>
                  <el-row>新顾问： {{ scope.row.newCounselorName }}</el-row>
                </template>
              </el-table-column>
              <el-table-column width="90" prop="ifFollowLog" label="是否跟进" align="center">
                <template slot-scope="scope">
                  <el-row v-if="scope.row.ifFollowLog == 0">是</el-row>
                  <el-row v-if="scope.row.ifFollowLog == 1">否</el-row>
                </template>
              </el-table-column>
              <el-table-column min-width="200" prop="dealRemark" label="跟进/备注" />
            </el-table>
            <!-- 分页 -->
            <el-pagination
              background
              :current-page="dynamicsInfo.start"
              :page-size="dynamicsInfo.length"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dynamicsInfo.total"
              @size-change="handleDynamicSizeChange"
              @current-change="handleDynamicCurrentChange"
            />
          </el-tab-pane>

          <!-- 工商信息 -->
          <el-tab-pane label="工商信息" name="second" class="business-info">
            <!-- 行业类型, 核准日期 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">行业类型</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.ntType }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">核准日期</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.apprDate }}</el-col>
            </el-row>
            <!-- 成立日期, 核准机构 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">成立日期</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.esDate }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">核准机构</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.regOrg }}</el-col>
            </el-row>
            <!-- 注册号, 营业期限制开始时间 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">注册号</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.regNo }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">营业期限制开始时间</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.opFrom }}</el-col>
            </el-row>
            <!-- 注册地址, 营业期限制结束时间 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">注册地址</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.dom }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">营业期限制结束时间</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.opTo }}</el-col>
            </el-row>
            <!-- 企业法人, 公司URL -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">企业法人</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.frName }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">公司URL</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.companyUrl }}</el-col>
            </el-row>
            <!-- 注册资本, 行业评分(总分10000) -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">注册资本</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.regCap }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">行业评分(总分10000)</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266" />
            </el-row>
            <!-- 实收注册资金, 行业平分(总分10000) -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">实收注册资金</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;" />
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">公司评分(总分10000)</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266" />
            </el-row>
            <!-- 企业类型, 经营范围 -->
            <el-row>
              <el-col :span="4" style="background:rgba(240, 247, 252, 0.6)">企业类型</el-col>
              <el-col :span="8" style="border-right:1px solid #dfe6ec; border-left:1px solid #dfe6ec;">{{ commerceInfo.ntType != 'N/A' ? commerceInfo.ntType : "" }}</el-col>
              <el-col :span="5" style="background:rgba(240, 247, 252, 0.6)">经营范围</el-col>
              <el-col :span="7" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266">{{ commerceInfo.opScope }}</el-col>
            </el-row>
            <!-- 组织机构代码 -->
            <el-row style="background:rgba(240, 247, 252, 0.6)">
              <el-col :span="4">组织机构代码</el-col>
              <el-col :span="20" style="border-left:1px solid #dfe6ec; font-size:14px; color:#606266; background:#fff;">{{ commerceInfo.shxydm }}</el-col>
            </el-row>
          </el-tab-pane>

          <!-- 商标信息 -->
          <el-tab-pane label="商标信息" name="third">
            <el-table :data="trademarkInfo.list" border>
              <el-table-column min-width="200" prop="markName" label="商标名称" align="center" />
              <el-table-column width="100" prop="unionTypeCode" label="国际分类" align="center" />
              <el-table-column min-width="200" prop="typeDetailDesc" label="商品服务列表" />
              <el-table-column width="100" prop="beginDate" label="专用期起" align="center" />
              <el-table-column width="100" prop="endDate" label="专用期止" />
              <el-table-column width="100" prop="appDate" label="申请日期" />
            </el-table>
            <!--分页-->
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="trademarkInfo.start"
              :page-size="trademarkInfo.pagerSize"
              :total="trademarkInfo.total"
              @size-change="handleTrademarkSizeChange"
              @current-change="handleTrademarkCurrentChange"
            />
          </el-tab-pane>

          <!-- 专利信息 -->
          <el-tab-pane label="专利信息" name="fourth">
            <el-table :data="parentInfo.list" border>
              <el-table-column min-width="200" prop="fzlMc" label="专利名称" align="center" />
              <el-table-column width="200" prop="fsqSqh" label="申请号" align="center" />
              <el-table-column min-width="100" prop="fzlZllx" label="专利类型" />
              <el-table-column prop="fzlZflh2" label="IPC/IDC分类" align="center" />
              <el-table-column min-width="100" prop="endDate" label="法律状态" />
              <el-table-column min-width="100" prop="fzlSqr" label="申请日期" />
            </el-table>
            <!--分页-->
            <el-pagination
              background
              layout="total, sizes, prev, pager, next, jumper"
              :current-page="parentInfo.start"
              :page-size="parentInfo.pagerSize"
              :total="parentInfo.total"
              @size-change="handleParentSizeChange"
              @current-change="handleParentCurrentChange"
            />
          </el-tab-pane>
          <!--  订单信息
           <el-tab-pane label="订单信息" name="fourth">
             <el-tabs class="item-tabs" tab-position="left" v-model="activeTabsName1">
               <el-tab-pane label="商标服务" name="fourth1">
                 <el-table :data="gridData2" border>
                   <el-table-column width="100" prop="dynamicName" label="订单号"></el-table-column>
                   <el-table-column width="100" prop="time" label="支付时间" align="center"></el-table-column>
                   <el-table-column width="100" prop="operator" label="流程节点" align="center"></el-table-column>
                   <el-table-column width="100" prop="operationContent" label="客户名称"></el-table-column>
                   <el-table-column width="100" prop="isFollowUp" label="业务类型" align="center"></el-table-column>
                   <el-table-column width="100" prop="isFollowUp" label="金额" align="center"></el-table-column>
                   <el-table-column width="100" prop="isFollowUp" label="联系人" align="center"></el-table-column>
                   <el-table-column width="100" prop="isFollowUp" label="开票状态" align="center"></el-table-column>
                   <el-table-column width="100" prop="isFollowUp" label="保件日期" align="center"></el-table-column>
                   <el-table-column min-width="120" label="操作" fixed="right"></el-table-column>
                 </el-table>
                  分页
                 <el-pagination
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="dynamicsInfoParams.start"
                   :page-size="dynamicsInfoParams.length"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="dynamicsInfoParams.total">
                 </el-pagination>
               </el-tab-pane>
               <el-tab-pane label="版权服务" name="fourth2"></el-tab-pane>
               <el-tab-pane label="专利服务" name="fourth3"></el-tab-pane>
               <el-tab-pane label="其他服务" name="fourth4"></el-tab-pane>
             </el-tabs>
           </el-tab-pane>
            咨询记录
           <el-tab-pane label="咨询记录" name="fifth">
             <el-table :data="gridData2" border>
               <el-table-column width="150" prop="dynamicName" label="客户状态"></el-table-column>
               <el-table-column width="160" prop="time" label="意向产品" align="center"></el-table-column>
               <el-table-column width="100" prop="operator" label="创建时间" align="center"></el-table-column>
               <el-table-column min-width="200" prop="operationContent" label="关闭原因"></el-table-column>
               <el-table-column width="90" prop="isFollowUp" label="线索来源" align="center"></el-table-column>
               <el-table-column width="90" prop="isFollowUp" label="联系方式" align="center"></el-table-column>
               <el-table-column min-width="200" label="操作"></el-table-column>
             </el-table>
              分页
             <el-pagination
               background
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="dynamicsInfoParams.start"
               :page-size="dynamicsInfoParams.length"
               layout="total, sizes, prev, pager, next, jumper"
               :total="dynamicsInfoParams.total">
             </el-pagination>
           </el-tab-pane>
            发票记录
           <el-tab-pane label="发票记录" name="sixth">
             <el-table :data="gridData2" border>
               <el-table-column width="150" prop="dynamicName" label="基本信息"></el-table-column>
               <el-table-column width="160" prop="time" label="服务信息" align="center"></el-table-column>
               <el-table-column width="100" prop="operator" label="发票信息" align="center"></el-table-column>
               <el-table-column min-width="200" prop="operationContent" label="收件人信息"></el-table-column>
               <el-table-column width="90" prop="isFollowUp" label="发票状态" align="center"></el-table-column>
               <el-table-column min-width="200" label="操作"></el-table-column>
             </el-table>
              分页
             <el-pagination
               background
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="dynamicsInfoParams.start"
               :page-size="dynamicsInfoParams.length"
               layout="total, sizes, prev, pager, next, jumper"
               :total="dynamicsInfoParams.total">
             </el-pagination>
           </el-tab-pane>
            文件记录
           <el-tab-pane label="文件记录" name="seventh">
             <el-tabs class="item-tabs" tab-position="left" v-model="activeTabsName1">
               <el-tab-pane label="所有文件" name="fourth1">
                 <el-table :data="gridData2" border>
                   <el-table-column width="100" prop="dynamicName" label="申请人"></el-table-column>
                   <el-table-column width="100" prop="time" label="商品信息" align="center"></el-table-column>
                   <el-table-column width="100" prop="operator" label="分类信息" align="center"></el-table-column>
                   <el-table-column width="100" prop="operationContent" label="文件名称"></el-table-column>
                   <el-table-column min-width="120" label="操作" fixed="right"></el-table-column>
                 </el-table>
                  分页
                 <el-pagination
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="dynamicsInfoParams.start"
                   :page-size="dynamicsInfoParams.length"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="dynamicsInfoParams.total">
                 </el-pagination>
               </el-tab-pane>
               <el-tab-pane label="官文" name="fourth2"></el-tab-pane>
               <el-tab-pane label="所有客户" name="fourth3"></el-tab-pane>
             </el-tabs>
           </el-tab-pane>
            其他顾问订单
           <el-tab-pane label="其他顾问订单" name="eighth">
             <el-table :data="gridData2" border>
               <el-table-column width="150" prop="dynamicName" label="顾问"></el-table-column>
               <el-table-column width="160" prop="time" label="商标服务" align="center"></el-table-column>
               <el-table-column width="100" prop="operator" label="版权服务" align="center"></el-table-column>
               <el-table-column min-width="200" prop="operationContent" label="专利服务"></el-table-column>
               <el-table-column width="90" prop="isFollowUp" label="其他" align="center"></el-table-column>
               <el-table-column min-width="200" prop="remarks" label="商标交易"></el-table-column>
               <el-table-column min-width="200" label="操作"></el-table-column>
             </el-table>
              分页
             <el-pagination
               background
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="dynamicsInfoParams.start"
               :page-size="dynamicsInfoParams.length"
               layout="total, sizes, prev, pager, next, jumper"
               :total="dynamicsInfoParams.total">
             </el-pagination>
           </el-tab-pane>-->
        </el-tabs>
      </el-main>
    </div>

    <!-- 负责人信息 -->
    <el-row>
      <el-col :span="12"><p style="margin: 0 0 10px 0;"><span>当前负责人：{{ leader.createUserName }}</span><span style="margin-left: 30px;"> 开始负责：{{ leader.createTime }}</span></p></el-col>
      <el-col :span="12" style="text-align: right; color:#238def">
        <!--<router-link :to="{path:'/CluesManagement/cluesDetail/' + currentCompanyId}">查看线索来源</router-link>-->
      </el-col>
    </el-row>

    <!-- 客户详细信息 -->
    <edit-customer-detail-dialog :visible.sync="editCustomerDetailVisible" />

    <!-- 添加/编辑联系人 -->
    <add-edit-contacts-dialog :visible.sync="addEditContactsVisible" :contact-type="contactType" :contact-data="curContactData" @getLatentInfo="getLatentInfo" />

    <!-- 跟进 -->
    <follow-up-dialog :visible.sync="followUpVisible" :company-id="currentCompanyId" />

    <!-- 释放到公海 -->
    <Release-private-customer-dialog :visible.sync="releasePrivateCustomerVisible" :current-company-id="currentCompanyId" />

    <!-- 添加标签 -->
    <add-tags-dialog :visible.sync="addTagsVisible" :existing-tags="companyInfo.tags" :company-id.sync="currentCompanyId" />

    <!-- 新建商机 -->
    <create-Business-dialog :visible.sync="createBusinessVisible" :company-id.sync="currentCompanyId" :company-name.sync="currentCompanyName" />
  </div>
</template>

<script>
import {
  getCustomerDynamics,
  getCompanyDetail,
  getLatentUserPager,
  getBusinessUserPager,
  getCompanyChildrenDetail,
  setChild2Parent,
  getLeaderInfo,
  // getBusinessPager,
  getBusinessPagerVo,
  updateCompanyInfo,
  getParentInfo,
  getTrademarkInfo,
  getCommerceInfo
} from '@/api/customerDetail'

import EditCustomerDetailDialog from './components/EditCustomerDetailDialog'
import AddEditContactsDialog from './components/AddEditContactsDialog'
import FollowUpDialog from './components/FollowUpDialog'
import CreateBusinessDialog from './components/CreateBusinessDialog'
import ReleasePrivateCustomerDialog from './components/ReleasePrivateCustomerDialog'
import AddTagsDialog from './components/AddTagsDialog'

export default {
  name: 'CustomerDetail',
  components: {
    EditCustomerDetailDialog,
    AddEditContactsDialog,
    FollowUpDialog,
    ReleasePrivateCustomerDialog,
    CreateBusinessDialog,
    AddTagsDialog
  },
  filters: {
    // 意向业务
    businessPurposeFilter(status) {
      const statusMap = {
        '-1': '全部',
        '1': '商标服务',
        '2': '专利',
        '3': '版权',
        '4': '财税',
        '5': '其他',
        '6': '项目',
        '7': '高薪',
        '8': '商标交易',
        '9': '法律服务',
        '10': '人事社保',
        '11': '工商'
      }
      return statusMap[status]
    },
    // 商机进度
    businessProgressFilter(status) {
      const statusMap = {
        '-1': '全部',
        '0': '初步洽谈',
        '1': '是否发送函件',
        '2': '是否约谈',
        '3': '销售报价',
        '4': '合同报价',
        '5': '项目失败',
        '6': '项目收款'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      currentCompanyId: null, // 当前公司Id
      currentCompanyName: null, // 当前公司名称
      ifOwnCompany: '', // 客户归属 1.客户归属于当前用户 2.不归属于当前用户
      contactType: '',
      curContactData: {},
      activeTabsName: 'first',
      activeTabsName1: 'fourth1',
      companyChildren: [],
      gridData2: [],
      commonInfoParams: {
        deleteStatus: '0'
      }, // 公司信息参数
      companyInfo: {
        tags: []
      }, // 公司信息
      gridDataLatent: { // 联系人信息
        list: [],
        listLoading: true,
        userParams: {
          start: 1,
          length: 10,
          companyId: null
        }
      }, // 联系人信息
      businessInfoParams: {
        start: '1',
        length: '10',
        selectType: '0',
        businessType: '-1',
        dealType: '-1',
        businessPurpose: '-1',
        businessProgress: '-1',
        releasingFlage: '-1'
      }, // 相关商机参数
      businessData: {
        list: [],
        listLoading: true,
        total: 0
      }, // 相关商机信息
      dynamicsInfoParams: {
        start: 1,
        length: 10,
        deleteStatus: '0',
        companyId: this.currentCompanyId
      }, // 动态记录参数
      dynamicsInfo: {
        list: [],
        listLoading: true,
        total: 0
      }, // 动态记录信息
      parentInfoParams: {
        start: 1,
        length: 10
      }, // 专利信息参数
      parentInfo: {
        list: [],
        listLoading: true,
        total: 0
      }, // 专利信息
      trademarkInfoParams: {
        start: 1,
        length: 10
      }, // 商标信息参数
      trademarkInfo: {
        list: [],
        listLoading: true,
        total: 0
      }, // 商标信息
      commerceInfo: {
        list: [],
        listLoading: true,
        total: 0
      }, // 工商信息
      leader: {},
      addTagsVisible: false, // 添加标签
      followUpVisible: false, // 跟进
      addEditContactsVisible: false, // 编辑/新增联系人
      createBusinessVisible: false, // 添加商机
      editCustomerDetailVisible: false, // 客户详细信息
      releasePrivateCustomerVisible: false // 释放到公海
    }
  },
  watch: {
    followUpVisible(val, valold) {
      const _this = this
      if (!val) {
        _this.getBusinessPagerInfo()
        _this.getCustomerDynamic()
      }
    }
  },
  created() {
    this.currentCompanyId = this.$route.params.currentCompanyId // 公司ID
    this.ifOwnCompany = (this.$route.query.ifOwnCompany).toString() // 客户归属 1.客户归属于当前用户 2.不归属于当前用户
    this.gridDataLatent.userParams.companyId = this.currentCompanyId
    this.commonInfoParams.companyId = this.$route.params.currentCompanyId
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.getCustomerDynamic()
      this.getCompanyInfo()
      this.getLatentInfo()
      this.getBusinessPagerInfo()
    },
    // 获取公司的动态记录
    getCustomerDynamic() {
      const map = new Map()
      map.set(1, '跟进记录')
      map.set(2, '释放到海')
      map.set(3, '转移客户')
      map.set(4, '捡入私海')
      map.set(5, '分配客户')
      map.set(6, '变更客户')
      map.set(7, '创建客户')
      this.$set(this.dynamicsInfo, 'listLoading', true)
      this.dynamicsInfoParams.companyId = this.$route.params.currentCompanyId
      getCustomerDynamics(this.dynamicsInfoParams).then(response => {
        this.dynamicsInfo = Object.assign({}, this.dynamicsInfo, {
          list: response.data.data,
          total: response.data.total,
          start: response.data.start,
          length: response.data.length,
          listLoading: false
        })
        this.dynamicsInfoParams.total = response.data.total
        this.dynamicsInfo.list.map(customerDynamic => {
          customerDynamic.dynamicLogName = map.get(customerDynamic.dynamicLogName)
          if (customerDynamic.oldCounselorName === null || customerDynamic.newCounselorName === null) {
            customerDynamic.info = ''
          } else {
            customerDynamic.info = ` 旧顾问: ${customerDynamic.oldCounselorName}  新顾问：${customerDynamic.newCounselorName}`
          }
          return customerDynamic
        })
      }).catch((err) => {
        console.log('err', err)
      })
    },
    //  获取公司的详细信息
    getCompanyInfo() {
      const _this = this
      // 查询主公司信息
      if (_this.currentCompanyId == null) {
        _this.currentCompanyId = _this.$route.params.currentCompanyId
      }
      getCompanyDetail(_this.commonInfoParams).then(response => {
        if (response.data.code === 10000 && response.data.data.length === 1) {
          this.companyInfo = response.data.data[0]
          this.currentCompanyName = response.data.data[0].companyName
          if (this.currentCompanyName !== '') {
            this.getParentInfo()
            this.getTrademarkInfo()
            this.getCommerceInfo()
          }
        }
      }).catch((err) => {
        console.log('err', err)
      })
      // 查询子公司信息
      getCompanyChildrenDetail({ companyId: _this.currentCompanyId }).then(response => {
        if (response.data.data.length > 0) {
          this.companyChildren = response.data.data
        }
      })
      // 获取顾问信息
      getLeaderInfo({ companyId: _this.currentCompanyId }).then(response => {
        if (response.data.code === 10000 && response.data.data.length > 0) {
          this.leader = response.data.data[0]
        }
      })
    },
    // 获取公司下联系人信息
    getLatentInfo() {
      const _this = this
      _this.$set(_this.gridDataLatent, 'listLoading', true)
      if (this.ifOwnCompany === '1') {
        getLatentUserPager(_this.gridDataLatent.userParams).then(response => {
          _this.gridDataLatent = Object.assign({}, _this.gridDataLatent, {
            list: response.data.data,
            listLoading: false
          })
          _this.$set(_this.gridDataLatent.userParams, 'total', response.data.total)
          _this.$set(_this.gridDataLatent.userParams, 'start', response.data.start)
          _this.$set(_this.gridDataLatent.userParams, 'length', response.data.length)

          _this.gridDataLatent.list.map(user => {
            if (user.onJobFlag === 0) {
              user.onJobFlag = true
              return user
            } else {
              user.onJobFlag = false
              return user
            }
          })
        }).catch((err) => {
          this.$message.error(err)
        })
      } else if (this.ifOwnCompany === '2') {
        getBusinessUserPager(_this.gridDataLatent.userParams).then(response => {
          _this.gridDataLatent = Object.assign({}, _this.gridDataLatent, {
            list: response.data.data,
            listLoading: false
          })
          _this.$set(_this.gridDataLatent.userParams, 'total', response.data.total)
          _this.$set(_this.gridDataLatent.userParams, 'start', response.data.start)
          _this.$set(_this.gridDataLatent.userParams, 'length', response.data.length)

          _this.gridDataLatent.list.map(user => {
            if (user.onJobFlag === 0) {
              user.onJobFlag = true
              return user
            } else {
              user.onJobFlag = false
              return user
            }
          })
        }).catch((err) => {
          this.$message.error(err)
        })
      }
    },
    // 设置为父公司信息
    setChild2ParentInfo(val) {
      const _this = this
      setChild2Parent({ companyId: val }).then(response => {
        if (response.data.code === 10000) {
          this.$message.success(response.data.message)
          getCompanyChildrenDetail({ companyId: _this.currentCompanyId }).then(response => {
            if (response.data.data.length > 0) {
              this.companyChildren = response.data.data
            }
          })
        } else {
          this.$message.error('操作失败')
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 获取商机分页信息
    getBusinessPagerInfo() {
      this.businessInfoParams.companyId = this.$route.params.currentCompanyId
      this.$set(this.businessData, 'listLoading', true)
      getBusinessPagerVo(this.businessInfoParams).then(response => {
        if (response.data.code === 10000) {
          response.data.data.forEach((item) => {
            if (item.dealPercent && item.dealPercent >= 0) {
              item.dealPercent = item.dealPercent * 10
            } else {
              item.dealPercent = 0
            }
          })
          this.businessData = Object.assign({}, this.businessData, {
            list: response.data.data,
            total: response.data.total,
            start: response.data.start,
            length: response.data.length,
            listLoading: false
          })
        }
      })
    },
    // 新建商机
    handleCreateBusiness(val) {
      this.createBusinessVisible = true
      this.currentCompanyId = this.$route.params.currentCompanyId
      this.currentCompanyName = this.companyInfo.companyName
    },
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      console.log(val)
    },
    // 动态记录分页 - 当前页
    handleDynamicSizeChange(val) {
      this.dynamicsInfoParams.length = val
      this.getCustomerDynamic()
    },
    // 动态记录分页 - 每页条数
    handleDynamicCurrentChange(val) {
      this.dynamicsInfoParams.start = val
      this.getCustomerDynamic()
    },
    // 联系人分页 - 当前页
    handleLatentCurrentChange(val) {
      this.gridDataLatent.userParams.start = val
      this.getLatentInfo()
    },
    // 联系人分页 - 每页条数
    handleLatentSizeChange(val) {
      this.gridDataLatent.userParams.length = val
      this.getLatentInfo()
    },
    // 商机分页 - 当前页
    handleBusinessCurrentChange(val) {
      this.$set(this.businessInfoParams, 'start', val)
      this.getBusinessPagerInfo()
    },
    // 商机分页 - 每页条数
    handleBusinessSizeChange(val) {
      this.$set(this.businessInfoParams, 'length', val)
      this.getBusinessPagerInfo()
    },
    /*
    * 设置用户为主显
    * pkSid: id
    * companyId: 公司ID
    * */
    handleChooseOrderWay(userId) {
      const _this = this
      const params = {
        companyId: _this.companyInfo.companyId,
        pkSid: _this.companyInfo.pkSid,
        mainLatentUserId: userId
      }
      updateCompanyInfo(params).then(response => {
        if (response.data.code === 10000) {
          _this.$message.success(response.data.message)
          this.getLatentInfo()
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((error) => {
        _this.$message.error(error.toString())
      })
      this.chooseOrderWayVisible = true
    },
    // 添加/编辑联系人
    handleAddEditContacts(type, contactData) {
      contactData = contactData || { companyId: this.currentCompanyId }
      this.contactType = type
      this.curContactData = contactData
      this.addEditContactsVisible = true
    },
    // 获取专利信息
    getParentInfo() {
      const _this = this
      _this.$set(_this.parentInfo, 'listLoading', true)
      _this.$set(_this.parentInfoParams, 'companyName', _this.currentCompanyName)
      getParentInfo(_this.parentInfoParams).then(response => {
        if (response.data.code === 10000) {
          _this.parentInfo = Object.assign({}, _this.parentInfo, {
            list: response.data.data,
            total: response.data.total,
            start: response.data.start,
            pagerSize: response.data.pagerSize,
            listLoading: false
          })
          console.log(_this.parentInfo)
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 专利分页 - 当前页
    handleParentCurrentChange(val) {
      this.$set(this.parentInfoParams, 'start', val)
      this.getParentInfo()
    },
    // 专利分页 - 每页条数
    handleParentSizeChange(val) {
      this.$set(this.parentInfoParams, 'length', val)
      this.getParentInfo()
    },
    // 获取商标信息
    getTrademarkInfo() {
      const _this = this
      _this.$set(_this.trademarkInfo, 'listLoading', true)
      _this.$set(_this.trademarkInfoParams, 'companyName', _this.currentCompanyName)
      getTrademarkInfo(_this.trademarkInfoParams).then(response => {
        if (response.data.code === 10000) {
          _this.trademarkInfo = Object.assign({}, _this.trademarkInfo, {
            list: response.data.data,
            total: response.data.total,
            start: response.data.start,
            pagerSize: response.data.pagerSize,
            listLoading: false
          })
          console.log(_this.trademarkInfo)
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    // 商标分页 - 当前页
    handleTrademarkCurrentChange(val) {
      this.$set(this.trademarkInfoParams, 'start', val)
      this.getTrademarkInfo()
    },
    // 商标分页 - 每页条数
    handleTrademarkSizeChange(val) {
      this.$set(this.trademarkInfoParams, 'length', val)
      this.getTrademarkInfo()
    },
    // 获取工商信息
    getCommerceInfo() {
      const _this = this
      getCommerceInfo({ companyName: _this.currentCompanyName }).then(response => {
        if (response.data.code === 10000) {
          if (response.data.data.length === 1) {
            _this.commerceInfo = response.data.data[0]
          }
          console.log('commerceInfo', _this.commerceInfo)
        } else {
          _this.$message.error(response.data.message)
        }
      }).catch((err) => {
        console.log('err', err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-detail{
  background: #f5f7fa;
  .el-container{
    padding: 0 0 5px 10px;
    h2{
      vertical-align: top;
      margin: 0;
      .svg-icon{
        font-size: 22px;
        vertical-align: top;
        margin-top: 4px;
        cursor: pointer;
        &.edit{
          font-size: 20px;
          margin-left: 5px;
        }
      }
    }
    .tags{
      margin: 18px 0;
      font-size:0;
      .el-tag{
        font-size: 12px;
        vertical-align: top;
        margin-right: 15px;
      }
      .button-new-tag {
        height: 24px;
        padding: 0 8px;
        line-height: 22px;
        font-size: 12px;
        background: transparent;
      }
      .input-new-tag {
        width: 90px;
        height: 24px;
        line-height: 22px;
        vertical-align: bottom;
        background: transparent;
        /deep/ .el-input__inner{
          height: 24px;
          line-height: 26px;
          font-size: 12px;
          background: transparent;
        }
      }
    }
    p.info{
      color: #4a4a4a;
      margin: 0 0 20px 0;
      span:last-child{
        margin-left: 50px;
      }
    }
    .con-right{
      /deep/ .el-button{
        span{
          font-size: 15px;
        }
      }
    }
  }
  .container-sub{
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    padding: 18px 18px 20px;
    margin-bottom: 50px;
    .el-row{
      margin-bottom: 15px;
      h3{
        font-weight: normal;
        margin: 8px 0 0 ;
      }
    }
    &.list-con{
      margin-bottom: 25px;
      .el-aside{
        border: 1px solid #dfe6ec;
        p.title-p{
          position: relative;
          font-size: 16px;
          color: #4a4a4a;
          background: #f5f7fa;
          margin: 0;
          padding: 15px;
          .svg-icon{
            vertical-align: top;
            &.opportunity{
              margin-right: 5px;
            }
            &.plus-square{
              cursor: pointer;
              position: absolute;
              top: 15px;
              right: 20px;
            }
          }
        }
        .el-row{
          color: #606266;
          font-size: 15px;
          padding: 0 5px;
          margin: 0 10px;
          /*border-bottom: 1px solid #dfe6ec;*/
          height: 45px;
          line-height: 45px;
        }
        .opportunity-title{
          margin: 0;
          padding: 0 17px;
          i{
            cursor: pointer;
          }
        }
        .opportunity-con{
          border-bottom: 1px solid #dfe6ec;
        }
        .el-tag{
          cursor: default;
        }
        .svg-icon{
          &.right{
            font-size: 18px;
            color: #1890ff;
            cursor: pointer;
            vertical-align: top;
            margin: 15px 0 0 0;
          }
          &.flag{
            color: #13954d;
            font-size: 24px;
            margin: 0 2px 0 -5px;
          }
        }
        .el-collapse{
          .el-collapse-item{
            border-bottom: 1px solid #e6ebf5;
          }
          /deep/ .el-collapse-item__header{
            font-size: 16px;
            color: #4a4a4a;
            font-weight: normal;
            padding: 0 15px;
            border-bottom-color: transparent;
            &.is-active{
              border-bottom-color: #e6ebf5;
            }
          }
          /deep/ .el-collapse-item__content{
            padding-bottom: 5px;
          }
          /deep/ .el-collapse-item__wrap{
            border-bottom: none;
          }
        }
      }
      .el-main{
        padding: 0;
        .el-tabs{
          &.el-tabs--border-card{
            box-shadow: none;
            /deep/ .el-tabs__header{
              height: 51px;
              line-height: 51px;
              .el-tabs__item{
                height: 52px;
                line-height: 52px;
                font-size: 15px;
                color: #4a4a4a;
                font-weight: normal;
                &.is-active{
                  color: #1890ff;
                }
              }
            }
          }
          .el-tabs__content{
            .el-tab-pane{
              &.business-info {
                font-size: 15px;
                border: 1px solid #dfe6ec;
                border-bottom: none;
                .el-row {
                  line-height: 1.5;
                  color: #525252;
                  border-bottom: 1px solid #dfe6ec;
                  .el-col {
                    padding: 12px 10px;
                  }
                }
              }
              .item-tabs{
                /deep/ .el-tabs__header {
                  height: auto;
                  line-height: 1.5;
                  .el-tabs__item{
                    font-size: 15px;
                    padding-left: 5px;
                  }
                }
              }
            }
          }
        }
        .el-table{
          /deep/ .el-table__header{
            th{
              background: transparent;
            }
          }
        }
      }
    }
  }
  .el-form{
    .el-date-editor {
      width: 410px;
      /deep/ .el-range-input{ // 加 /deep/ 或 >>> 是为了给 element 元素添加自定义样式
        width: 80%;
      }
    }
    .el-button{
      /deep/ span{
        font-size: 16px;
      }
    }
  }
  .el-table{
    margin-bottom: 20px;
    /deep/ td{
      padding: 6px 0;
    }
    /deep/ .el-table__header{
      th{
        color: #808080;
        background: #f5f7fa;
      }
    }
    .svg-icon{
      cursor: pointer;
      display: inline-block;
      font-size: 18px;
    }
    .name{
      span{
        display: inline-block;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        width: 160px;
        vertical-align: top;
      }
    }
    .company-name{
      div.name{
        display: inline-block;
        position: relative;
        max-width: 180px;
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
        vertical-align: top;
        font-style: normal;
        padding-right: 25px;
        box-sizing: content-box;
        color: #238def;
      }
    }
    .user-info{
      .user-name{
        display: block;
      }
      .user-phone{
        display: inline-block;
      }
      .svg-icon{
        margin-left: 5px;
      }
    }
    .tags{
      .el-tag{
        margin-right: 5px;
        font-size: 14px;
        height: 30px;
        line-height: 28px;
        padding: 0 8px;
      }
      .el-tag:last-child{
        margin-right: 0;
      }
    }
    .el-switch {
      /deep/ .el-switch__label{
        color: #777;
        &.is-active{
          color: #1890ff;
        }
      }
    }
  }
  .el-pagination{
    text-align: right;
    /deep/ .el-pager li, /deep/ span, /deep/ span .el-input__inner{
      font-size: 14px;
    }
  }
}

.el-popover.el-popper.stage-change{
  h2{
    font-size: 16px;
    margin: 0 0 15px 0;
    border-bottom: 1px solid #dcdcdc;
    padding-bottom: 12px;
  }
}
</style>
