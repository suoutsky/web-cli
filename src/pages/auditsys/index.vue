<template>
  <div class="audit-sys">
    <div class="form-filter-group nf">
      <el-date-picker
        v-model="params.time"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd">
      </el-date-picker>
    </div>
    <div class="form-filter-area cf"> 
      <div class="form-filter-group">
        <p class="filter-label fl">广告位id：</p>
        <div class="fl">
          <el-input
            placeholder="请输入广告位id"
            v-model="params.slotId">
          </el-input>
        </div>  
      </div>
      <div class="form-filter-group">
        <p class="filter-label fl">媒体id：</p>
        <div class="fl">
          <el-input
            placeholder="请输入媒体id"
            v-model="params.appId">
          </el-input>
        </div>
      </div>
    </div>
    <!-- 验证end -->
    <div class="form-filter-area cf"> 
      <div class="form-filter-group">
        <p class="filter-label fl">处理人：</p>
        <div class="fl">
          <el-select v-model="params.riskReviewer" placeholder="请选择">
            <el-option
              v-for="item in dealsArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div> 
      </div>
      <div class="form-filter-group">
        <p class="filter-label fl">作弊等级：</p>
        <div class="fl">
          <el-select v-model="params.cheatGrade" placeholder="请选择">
            <el-option
              v-for="item in cheatGradeArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="form-filter-group">
        <p class="filter-label fl">初步处理结果：</p>
        <div class="fl">
          <el-select v-model="params.preResult" placeholder="请选择">
            <el-option
              v-for="item in reviewResultArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>   
      </div>
      <div class="form-filter-group">
        <p class="filter-label fl">最终处理结果：</p>
        <div class="fl">
          <el-select v-model="params.reviewResult" placeholder="请选择">
            <el-option
              v-for="item in reviewResultArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>   
      </div>
      <div class="form-filter-group">
        <el-button type="success" icon="el-icon-search" @click.native="search('search')">搜索</el-button>
      </div>
    </div>
    <div class="form-filter-group nf">
      <el-radio v-model="params.type" label="1" @change="search('search')">只看实时</el-radio>
      <el-radio v-model="params.type" label="2" @change="search('search')">只看离线</el-radio> 
      <el-radio v-model="params.type" label="3" @change="search('search')">查看全部</el-radio>
    </div>
    <div class="list-type">
      <!-- <div class="item-type" @click="reviewResultChange(0)">
        <p>待处理</p>
        <p>{{logCount.toDOCount}}</p>        
      </div> -->
      <div class="item-type" @click="cheatGradeChange('6')">
        <p>6级作弊</p>
        <p>{{logCount.cheatGradeSix}}</p> 
      </div>
      <div class="item-type" @click="cheatGradeChange('5')">
        <p>5级作弊</p>
        <p>{{logCount.cheatGradeFive}}</p> 
      </div>
      <div class="item-type" @click="cheatGradeChange('4')">
        <p>4级作弊</p>
        <p>{{logCount.cheatGradeFour}}</p> 
      </div>
      <div class="item-type" @click="cheatGradeChange('3')">
        <p>3级作弊</p>
        <p>{{logCount.cheatGradeThree}}</p> 
      </div>
      <div class="item-type" @click="cheatGradeChange('2')">
        <p>2级作弊</p>
        <p>{{logCount.cheatGradeTwo}}</p> 
      </div>
      <div class="item-type" @click="cheatGradeChange('1')">
        <p>1级作弊</p>
        <p>{{logCount.cheatGradeOne}}</p> 
      </div>
      <div class="item-type" @click="cheatGradeChange('0')">
        <p>0级作弊</p>
        <p>{{logCount.cheatGradeZero}}</p> 
      </div>
    </div>  
    <div class="table-warp cf" >
      <div class="el-icon-download download" @click="tableDownload()"></div>
      <el-table
        :data="itemDatas && itemDatas.list"
        border
        :height="(itemDatas && itemDatas.list && itemDatas.list.length > 1) ? 500 : 200"
        style="width: 100%;"
        @cell-click="cellClickFN"
      >
        <el-table-column
          fixed
          label="时间"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.curDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="异常时间点"
          fixed
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.dHour == '1' ? '1天' : scope.row.dHour + '点' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="广告位id *"
          fixed
          width="120"
          prop="slotId"
          class-name="pointer"
        >
          <template slot-scope="scope">
            <p style="margin-left: 10px">{{ scope.row.slotId }}</p>
            <p style="margin-left: 10px">{{ scope.row.slotName }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="媒体id"
          fixed
          width="120">
          <template slot-scope="scope">
            <p style="margin-left: 10px">{{ scope.row.appId }}</p>
            <p style="margin-left: 10px">{{ scope.row.appName }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="运营"
          width="180">
          <template slot-scope="scope">
            <p>媒体运营：{{ scope.row.mediaName }}</p>
            <p>媒介运营：{{ scope.row.agentName }}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="综合信用分"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.creditsScore || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="处理人"
          width="120">
          <template slot-scope="scope">
             <el-select v-model="scope.row.preRiskReviewer" placeholder="请选择"
               @change="changCheck('preRiskReviewer', scope.row.preRiskReviewer, scope.row.riskReviewId, scope.row.id)">
                <el-option
                  v-for="item in dealsArrItem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
             </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="作弊消耗"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatNum('100', scope.row.cheatFee) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="作弊消耗占比"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatNum('%', scope.row.cheatFeeRate) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="广告位消耗"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatNum('100', scope.row.adConsume) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="分成比例"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatNum('%', scope.row.divideRate) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="命中规则 *"
          width="120"
          prop="rules"
          class-name="pointer"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.rules || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="累计处理次数 *"
          width="120"
          prop="reviewResult"
          class-name="pointer"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.reviewCount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="作弊等级"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ getCheatGrade(scope.row.cheatGrade) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="初步处理结果"
          width="240">
          <template slot-scope="scope">
             <el-select v-model="scope.row.preResult" :disabled="(scope.row.isSuperiorReview === 0 || scope.row.reviewResult === 0 ) ? false : true" @change="changCheck('preResult', scope.row.preResult, scope.row.riskReviewId, scope.row.id)"  placeholder="请选择">
                <el-option
                  v-for="item in reviewResultArrItem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
             </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="是否上级复审"
          width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isSuperiorReview"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value = "1"
              :inactive-value = "0"
              :disabled="(scope.row.preResult !== 0 && scope.row.reviewResult == 0) ? false : true"
              @change="changCheck('isSuperiorReview', scope.row.isSuperiorReview, scope.row.riskReviewId, scope.row.id)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="最终处理结果"
          width="240">
          <template slot-scope="scope">
             <el-select 
              v-model="scope.row.reviewResult" 
              placeholder="请选择" 
              :disabled="(scope.row.preResult === 0 ? true : false) || scope.row.isSuperiorReview === 0 || scope.row.isSuperiorReview === null" 
              @change="changCheck('reviewResult', scope.row.reviewResult, scope.row.riskReviewId, scope.row.id)"
             >
                <el-option
                  v-for="item in reviewResultArrItem"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
             </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="是否进入案列库"
          width="120">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isInExample"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :disabled="scope.row.isInExample === 1 ? true : false"
              :active-value = "1"
              :inactive-value = "0"
              @change="showAddCaseModal('isInExample', scope.row.isInExample, scope.row.riskReviewId, scope.row.id, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="最终处理时间"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.reviewResultTime || scope.row.preResultTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="查看进度"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px" class="click" @click="showProgressModal(scope.row)">查看</span>
          </template>
        </el-table-column>
         <el-table-column
          label="备注"
          width="200">
          <template slot-scope="scope">
            <el-popover placement="left" title="备注" width="300" trigger="hover" :content="scope.row.reviewRemarks" :disabled="!scope.row.reviewRemarks">
              <el-input type="textarea" slot="reference" v-model="scope.row.reviewRemarks" :rows="1" cols="20" :number="30" @change="changCheck('reviewRemarks', scope.row.reviewRemarks, scope.row.riskReviewId, scope.row.id)"></el-input>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-warp">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="itemDatas && itemDatas.totalCount"
          :current-page="params.currentPage"
          :page-size="params.pageSize"
          @current-change="pageChange"
          >
        </el-pagination>
      </div>
    </div>
    <!-- 审核进度 -->
    <component :is="progressObj.currentView" :obj="progressObj"></component>
    <!-- 添加案例 -->
    <component :is="caseObj.currentView" :obj="caseObj"></component>
    <!-- 添加案例 -->
    <component :is="reviewObj.currentView" :obj="reviewObj"></component>
    <!-- loading -->
    <loading :show="showLoading"></loading>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import progressModal from './components/progressModal';
import addCaseModal from './components/addCaseModal';
import reviewResultModal from './components/reviewResultModal';
import { formatDate, getPerDay } from '../../components/utils/dateUtils';
import { formatParams, fixNum } from '../../components/utils/dataUtils';
// 风险等级枚举
const cheatGradeArr = [
  { value: '', label: '全部' },
  { value: '0', label: '0级作弊' },
  { value: '1', label: '1级作弊' },
  { value: '2', label: '2级作弊' },
  { value: '3', label: '3级作弊' },
  { value: '4', label: '4级作弊' },
  { value: '5', label: '5级作弊' },
  { value: '6', label: '6级作弊' }
];
// 状态枚举
const reviewResultArr = [
  { value: 0, label: '待处理' },
  { value: 1, label: '调分成' },
  { value: 2, label: '下线' },
  { value: 3, label: '暂不处理' },
  { value: 4, label: '暂不处理，加入限流包' },
  { value: 5, label: '调分成，加入限流包' },
  { value: 6, label: '下线，加入限流包' },
  { value: null, label: '全部' }
];
// 状态枚举
const reviewResultArrItem = [
  { value: 0, label: '待处理' },
  { value: 1, label: '调分成' },
  { value: 2, label: '下线' },
  { value: 3, label: '暂不处理' },
  { value: 4, label: '暂不处理，加入限流包' },
  { value: 5, label: '调分成，加入限流包' },
  { value: 6, label: '下线，加入限流包' }
];
export default {
  components: {
    progressModal,
    addCaseModal,
    reviewResultModal
  },
  data() {
    return {
      loading: '',
      data: '',
      // 处理人枚举
      dealsArr: [],
      dealsArrItem: [],
      // 状态枚举
      reviewResultArr: reviewResultArr,
      reviewResultArrItem: reviewResultArrItem,
      // 风险枚举
      cheatGradeArr: cheatGradeArr,
      value: '',
      radio: '',
      params: {
        time: [
          getPerDay(formatDate(new Date()), 1),
          getPerDay(formatDate(new Date()), 0)
        ],
        startTime: '',
        endTime: '',
        slotId: '',
        appId: '',
        riskReviewer: '',
        cheatGrade: '',
        reviewResult: null,
        preResult: null,
        type: '3',
        pageSize: 10,
        currentPage: 1
      },
      progressObj: {
        currentView: '',
        data: '',
        row: '',
        show: false
      },
      caseObj: {
        currentView: '',
        soltId: '',
        soltName: '',
        date: '',
        show: false,
        search: ''
      },
      reviewObj: {
        currentView: '',
        slotId: '',
        startTime: '',
        endTime: '',
        show: false
      }
    };
  },
  created() {
    this.getDeals();
    this.search();
  },
  computed: {
    ...mapGetters({
      showLoading: 'auditsys/loading',
      itemDatas: 'auditsys/itemDatas',
      // 处理人枚举
      dealArr: 'auditsys/dealArr',
      // 操作日志
      changeLog: 'auditsys/changeLog',
      logCount: 'auditsys/logCount'
    })
  },
  methods: {
    ...mapActions({
      searchFn: 'auditsys/getitemData',
      getDeal: 'auditsys/getDeal',
      getChangeLog: 'auditsys/getChangeLog',
      addCase: 'auditsys/addCase',
      queryCountShow: 'auditsys/queryCountShow',
      getReviewResult: 'auditsys/getReviewResult'
    }),
    formatNum(type, num) {
      if (isNaN(parseInt(num))) {
        return '-';
      }
      // null
      if (type === null) {
        return '-';
      }
      // 浮点数
      if (type === 'float') {
        return fixNum(num, 2);
      }
      // 整数
      if (type === 'int') {
        return fixNum(num, 0);
      }
      // 百分比
      if (type === '%') {
        return parseFloat((num * 100).toPrecision(12)) + '%';
      }
      // app-ad-consume 除以100
      if (type === '100') {
        let nums = num / 100;
        return fixNum(nums, 2);
      }
      return num;
    },
    // 获取处理人
    getDeals() {
      this.getDeal().then(
        res => {
          if (res.success) {
            this.dealsArr = [
              {
                value: '',
                label: '全部'
              }
            ];
            this.dealsArrItem = [
              {
                value: null,
                label: '待定'
              }
            ];
            this.dealArr.forEach(item => {
              let items = {
                label: item.name,
                value: item.name
              };
              this.dealsArr.push(items);
              this.dealsArrItem.push(items);
            });
          } else {
            this.$message.error(res.desc);
          }
        },
        res => {
          this.$message.error('网络错误！');
        }
      );
    },
    queryCountShows() {
      this.queryCountShow(this.params).then(
        res => {
          if (res.success) {
          } else {
            this.$message.error(res.desc);
          }
        },
        res => {
          this.$message.error('网络错误！');
        }
      );
    },
    search(type) {
      if (type === 'search' && this.params.currentPage !== 1) {
        this.params.currentPage = 1;
      }
      this.params.startTime = this.params.time[0];
      this.params.endTime = this.params.time[1];
      this.queryCountShows();
      this.searchFn(this.params).then(
        res => {
          if (res.success) {
            res.data.list &&
              res.data.list.forEach(item => {
                if (item.preResult === null) {
                  item.preResult = 0;
                }
                if (item.reviewResult === null) {
                  item.reviewResult = 0;
                }
              });
          } else {
            this.$message.error(res.desc);
          }
        },
        res => {
          this.$message.error('网络错误！');
        }
      );
    },
    getCheatGrade(rank) {
      let label = '其它';
      this.cheatGradeArr.forEach(item => {
        if (rank === item.value && rank !== '') {
          label = item.label;
        }
      });
      return label;
    },
    // cheatGrade reviewResult改变
    cheatGradeChange(item) {
      this.params.cheatGrade = item;
      this.params.reviewResult = null;
      this.params.preResult = null;
      this.params.riskReviewer = '';
      this.params.appId = '';
      this.params.slotId = '';
      this.search();
    },
    reviewResultChange(item) {
      this.params.reviewResult = item;
      this.params.preResult = item;
      this.params.cheatGrade = '';
      this.params.riskReviewer = '';
      this.params.appId = '';
      this.params.slotId = '';
      this.search();
    },
    // 导出
    tableDownload() {
      let params = {};
      params.startTime = this.params.time[0];
      params.endTime = this.params.time[1];
      params.slotId = this.params.slotId;
      params.appId = this.params.appId;
      if (this.params.riskReviewer) {
        params.riskReviewer = this.params.riskReviewer;
      }
      if (this.params.cheatGrade) {
        params.cheatGrade = this.params.cheatGrade;
      }
      if (this.params.reviewResult) {
        params.reviewResult = this.params.reviewResult;
      }
      if (this.params.preResult) {
        params.preResult = this.params.preResult;
      }
      location.href = '/riskReview/exportReviewData?' + formatParams(params);
    },
    // 操作二次确认
    checkTwice() {
      return new Promise((resolve, reject) => {
        this.$confirm('确认修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    // 修改
    changCheck(type, data, id, allId, row) {
      let params = {
        id: id,
        [type]: data,
        riskAllId: allId
      };
      if (
        (data === 0 && type === 'reviewResult') ||
        (data === 0 && type === 'preResult')
      ) {
        this.$message({
          type: 'warning',
          message: '无法修改为待处理!'
        });
        this.search();
        return;
      }
      this.checkTwice().then(
        () => {
          this.addCase(params).then(
            res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                this.search();
              } else {
                this.$message.error(res.desc);
              }
            },
            res => {
              this.$message.error('网络错误！');
            }
          );
        },
        () => {
          this.search();
        }
      );
    },
    // 添加案例库-修改
    inCase(type, data, id, allId, row) {
      console.log(type, data, id, allId, row);
      let params = {
        id: id,
        [type]: data,
        riskAllId: allId
      };
      this.addCase(params).then(
        res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            // 关闭添加案例弹层
            this.caseObj.show = false;
          } else {
            this.$message.error(res.desc);
          }
          this.search();
        },
        res => {
          this.$message.error('网络错误！');
        }
      );
    },
    // 添加案例
    showAddCaseModal(type, data, id, allId, row) {
      this.caseObj.currentView = '';
      this.$nextTick(() => {
        // 添加案例库-修改
        this.caseObj.type = type;
        this.caseObj.data = data;
        this.caseObj.id = id;
        this.caseObj.allId = allId;
        this.caseObj.row = row;
        // end
        this.caseObj.show = true;
        this.caseObj.currentView = 'addCaseModal';
        this.caseObj.slotId = row.slotId;
        this.caseObj.slotName = row.slotName;
        this.caseObj.date = row.curDate;
        this.caseObj.riskAllId = row.id;
        this.caseObj.search = this.search;
        this.caseObj.inCase = this.inCase;
      });
    },
    // 获取查看数据
    getChangeLogs(id) {
      return new Promise((resolve, reject) => {
        this.getChangeLog({ riskAllId: id }).then(
          res => {
            if (res.success) {
              resolve();
            } else {
              this.$message.error(res.desc);
            }
          },
          res => {
            this.$message.error('网络错误！');
          }
        );
      });
    },
    showProgressModal(row) {
      this.getChangeLogs(row.id).then(() => {
        this.progressObj.currentView = '';
        this.$nextTick(() => {
          this.progressObj.show = true;
          this.progressObj.currentView = 'progressModal';
          this.progressObj.data = this.changeLog;
          this.progressObj.row = row;
        });
      });
    },
    // 翻页
    pageChange(page) {
      this.params.currentPage = page;
      this.search();
    },
    cellClickFN(row, column, cell, event) {
      const FN = {
        // 广告位 在新窗口中打开火眼
        slotId: () => {
          let { curDate, slotId, dHour } = row;
          const isOffline = dHour === '1';
          const date = formatDate(curDate);
          let href = `http://eye.dui88.com/tuia#!/tuiachartcenter/tuiatableview/119/${slotId}/${date}`;
          if (!isOffline) href = `http://eye.dui88.com/tuia#!/tuiachartcenter/tuiatableview/330/${slotId}/${date}`;
          window.open(href);
        },

        // 命中规则 在新窗口中打开火眼
        rules: () => {
          let { curDate, slotId, dHour } = row;
          const isOffline = dHour === '1';
          const date = formatDate(curDate);
          let href = `http://eye.dui88.com/tuia#!/tuiachartcenter/tuiatableview/118/${slotId}/${date}`;
          if (!isOffline) href = `http://eye.dui88.com/tuia#!/tuiachartcenter/tuiatableview/329/${slotId}/${date}`;
          window.open(href);
        },

        // 查询历史处理列表
        reviewResult: () => {
          let { slotId, slotName } = row;
          const startTime = getPerDay(formatDate(new Date()), 30);
          const endTime = getPerDay(formatDate(new Date()), 0);
          const temp = {
            currentView: 'reviewResultModal',
            show: true,
            slotId,
            slotName,
            startTime,
            endTime
          };
          Object.assign(this.reviewObj, temp);
        }
      };
      const tempFN = FN[column.property];
      if (Object.prototype.toString.call(tempFN) === '[object Function]') tempFN();
    }
  }
};
</script>

<style lang="less">
.audit-sys {
  .click {
    color: #60a4e8;
    cursor: pointer;
    &:hover {
      color: #ff5b5b;
    }
  }
  .el-form-item {
    margin-bottom: 0px !important;
  }
  .el-form-item__label {
    font-size: 14px;
    font-weight: 700;
    color: #444;
  }
  .form-filter-area {
    padding-top: 20px;
  }
  .list-type {
    padding-top: 30px;
    .item-type {
      display: inline-block;
      width: 80px;
      height: 80px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
      p {
        height: 40px;
        &:nth-child(1) {
          line-height: 60px;
        }
        &:nth-child(2) {
          line-height: 30px;
        }
      }
      //  &:nth-child(1) {
      //    background-color: #60A4E8;
      //  }
      &:nth-child(1) {
        background-color: #f8696b;
      }
      &:nth-child(2) {
        background-color: #fb9d75;
      }
      &:nth-child(3) {
        background-color: #fed280;
      }
      &:nth-child(4) {
        background-color: #dfe282;
      }
      &:nth-child(5) {
        background-color: #a1d07e;
      }
      &:nth-child(6) {
        background-color: #63be7b;
      }
      &:nth-child(7) {
        background-color: #50a265;
      }
      &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        transform: translate3d(0, -2px, 0);
      }
    }
  }
  .table-warp {
    padding-top: 40px;
    padding-bottom: 60px;
    cursor: default;
    .download {
      font-size: 24px;
      cursor: pointer;
    }
    .pagination-warp {
      padding-top: 10px;
      float: right;
    }
    .el-table__body {
      .pointer {
        cursor: pointer;
      }
    }
  }
}
</style>
