<template>
  <div class="audit-case">
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
      <div class="form-filter-group">
        <el-button type="success" icon="el-icon-search" @click.native="search('search')">搜索</el-button>
      </div>
    </div>
     <div class="table-warp cf" >
      <div class="add-case-warp">
        <el-button type="primary" icon="el-icon-plus" @click.native="showAddCaseModal()">添加案例</el-button>
      </div>
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
          label="添加时间"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.gmtCreate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="问题时间点"
          fixed
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.curDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="广告位id"
          fixed
          width="120"
        >
          <template slot-scope="scope">
            <p style="margin-left: 10px;">{{ scope.row.slotId }}</p>
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
          label="处理状态"
          width="120">
          <template slot-scope="scope">
             <el-select v-model="scope.row.exampleStatus" placeholder="请选择" @change="changCheck('exampleStatus', scope.row.exampleStatus, scope.row.id)">
                <el-option
                  v-for="item in statusArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                  >
                </el-option>
             </el-select>
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
            <span style="margin-left: 10px">{{ scope.row.preRiskReviewer || scope.row.riskReviewer }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="作弊消耗"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatNum('app-ad-consume', scope.row.cheatFee) }}</span>
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
            <span style="margin-left: 10px">{{ formatNum('app-ad-consume', scope.row.adConsume) }}</span>
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
          label="命中规则"
          width="120"
        >
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.rules || '-' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="累计处理次数"
          width="120">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.reviewCount }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="案例特征"
          width="200">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.exampleFeatures" :rows="1" cols="20" :number="30" @change="changCheck('exampleFeatures', scope.row.exampleFeatures, scope.row.id)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="案例需求"
          width="200">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.exampleDemand" :rows="1" cols="20" :number="30" @change="changCheck('exampleDemand', scope.row.exampleDemand, scope.row.id)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="案例结果"
          width="200">
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.exampleResult" :rows="1" cols="20" :number="30" @change="changCheck('exampleResult', scope.row.exampleResult, scope.row.id)"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)">删除</el-button>
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
    <!-- 添加案例 -->
    <component :is="caseObj.currentView" :obj="caseObj"></component>
    <!-- loading -->
    <loading :show="showLoading"></loading>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
import addCaseModal from './components/addCaseModal';
import {formatDate, getPerDay} from '../../components/utils/dateUtils';
import {formatParams, fixNum} from '../../components/utils/dataUtils';
// 状态枚举
const statusArr = [{
  value: 0,
  label: '待研究'
}, {
  value: 1,
  label: '研究完成'
}];
export default {
  components: {
    addCaseModal
  },
  data() {
    return {
      loading: '',
      data: '',
      // 状态枚举
      statusArr: statusArr,
      params: {
        time: [getPerDay(formatDate(new Date()), 1), getPerDay(formatDate(new Date()), 0)],
        slotId: '',
        appId: '',
        pageSize: 10,
        currentPage: 1
      },
      caseObj: {
        currentView: '',
        show: false,
        search: ''
      }
    };
  },
  created() {
    this.search();
  },
  computed: {
    ...mapGetters({
      showLoading: 'auditcase/loading',
      itemDatas: 'auditcase/itemDatas'
    })
  },
  methods: {
    ...mapActions({
      searchFn: 'auditcase/getitemData',
      deleExample: 'auditcase/deleExample',
      addCase: 'auditcase/addCase'
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
      if (type === 'app-ad-consume') {
        let nums = num / 100;
        return fixNum(nums, 2);
      }
      return num;
    },
    search(type) {
      if (type === 'search' && this.params.currentPage !== 1) {
        this.params.currentPage = 1;
      }
      this.params.startTime = this.params.time[0] + ' 00:00:00';
      this.params.endTime = this.params.time[1] + ' 23:59:59';
      this.searchFn(this.params).then((res) => {
        if (!res.success) {
          this.$message.error(res.desc);
        }
      }, (res) => {
        this.$message.error('网络错误！');
      });
    },
    // 导出
    tableDownload() {
      let params = {};
      params.startTime = this.params.time[0];
      params.endTime = this.params.time[1];
      params.slotId = this.params.slotId;
      params.appId = this.params.appId;
      location.href = '/riskExample/exportExampleData?' + formatParams(params);
    },
    // 操作二次确认
    checkTwice() {
      return new Promise((resolve, reject) => {
        this.$confirm('确认修改', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resolve();
        }).catch(() => {
          reject();
        });
      });
    },
    // 修改
    changCheck(type, data, id, row) {
      let params = {
        id: id,
        [type]: data
      };
      this.checkTwice().then(() => {
        this.addCase(params).then((res) => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
            this.search();
          } else {
            this.$message.error(res.desc);
          }
        }, (res) => {
          this.$message.error('网络错误！');
        });
      });
    },
    // 添加案例
    showAddCaseModal() {
      this.caseObj.currentView = '';
      this.$nextTick(() => {
        this.caseObj.show = true;
        this.caseObj.currentView = 'addCaseModal';
        this.caseObj.search = this.search;
      });
    },
    handleDelete(id) {
      this.checkTwice().then(() => {
        this.deleExample({id: id}).then((res) => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.search();
          } else {
            this.$message.error(res.desc);
          }
        }, (res) => {
          this.$message.error('网络错误！');
        });
      }, () => {
        console.log('取消');
      });
    },
    // 翻页
    pageChange(page) {
      console.log(page);
      this.params.currentPage = page;
      this.search();
    },
    cellClickFN(row, column, cell, event) {
      const FN = {};
      const tempFN = FN[column.property];
      if (Object.prototype.toString.call(tempFN) === '[object Function]') tempFN();
    }
  }
};
</script>

<style lang="less">
.audit-case {
 .form-filter-area {
   padding-top: 20px; 
 }
 .table-warp {
   padding-top: 40px;
   padding-bottom: 60px;
   cursor: default;
   .add-case-warp {
     padding: 10px;
     display: inline-block;
   }
   .download {
    font-size: 24px;
     cursor: pointer;
   }
   .pagination-warp {
      padding-top: 10px;
      float: right;
    }
 }
 .el-table__body {
   .pointer {
     cursor: pointer;
   }
 }
}
</style>
