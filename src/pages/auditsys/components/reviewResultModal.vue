<template>
  <el-dialog :width="'1100px'" title="处理记录" :visible="obj.show" @close="onClose" center>
    <div class="info">
      <p>广告位id：{{params.slotId}}</p>
      <p>广告位名称：{{slotName}}</p>
    </div>
    <el-row style="width: 100%; margin-bottom: 20px;">
      <el-col :span="22">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :clearable="false"
          :editable="false"
        >
        </el-date-picker>
        <el-button type="primary" @click="setDate">近30天</el-button>
      </el-col>
      <el-col :span="2">
        <div class="el-icon-download download" @click="downloadList"></div>
      </el-col>
    </el-row>
    <el-table
      :data="list"
      height="500"
      border
      style="width: 100%; margin-bottom: 20px;">
      <el-table-column
        label="日期"
        width="180">
          <template slot-scope="scope">
            <p v-text="scope.row.curDate"></p>
          </template>
      </el-table-column>
      <el-table-column
        label="作弊等级"
        width="80">
          <template slot-scope="scope">
            <p>{{ getCheatGrade(scope.row.cheatGrade) }}</p>
          </template>
      </el-table-column>
      <el-table-column
        label="初步处理结果"
        width="180">
          <template slot-scope="scope">
            <p>{{ getModalReviewResult(scope.row.preResult) }}</p>
          </template>
      </el-table-column>
      <el-table-column
        label="初步处理人"
        width="100">
          <template slot-scope="scope">
            <p v-text="scope.row.preRiskReviewer"></p>
          </template>
      </el-table-column>
      <el-table-column
        label="最终处理结果"
        width="180">
          <template slot-scope="scope">
            <p>{{ getModalReviewResult(scope.row.reviewResult) }}</p>
          </template>
      </el-table-column>
      <el-table-column
        label="最终处理人"
        width="100">
          <template slot-scope="scope">
            <p v-text="scope.row.riskReviewer"></p>
          </template>
      </el-table-column>
      <el-table-column
        label="备注">
          <template slot-scope="scope">
            <p v-text="scope.row.reviewRemarks"></p>
          </template>
      </el-table-column>
    </el-table>
    <div class="pagination-warp">
      <el-pagination
        background
        :current-page.sync="params.currentPage"
        :page-size="params.pageSize"
        layout="total, prev, pager, next"
        :total="totalCount"
        style="float: right;"  
      >
      </el-pagination>
    </div>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex';
import { formatDate, getPerDay } from '../../../components/utils/dateUtils';
import { formatParams } from '../../../components/utils/dataUtils';

const reviewResultArr = [
  { value: 0, label: '待处理' },
  { value: 1, label: '调分成' },
  { value: 2, label: '下线' },
  { value: 3, label: '暂不处理' },
  { value: 4, label: '暂不处理，加入限流包' },
  { value: 5, label: '调分成，加入限流包' },
  { value: 6, label: '下线，加入限流包' }
];

const cheatGradeArr = [
  { value: '0', label: '0级作弊' },
  { value: '1', label: '1级作弊' },
  { value: '2', label: '2级作弊' },
  { value: '3', label: '3级作弊' },
  { value: '4', label: '4级作弊' },
  { value: '5', label: '5级作弊' },
  { value: '6', label: '6级作弊' }
];

export default {
  props: {
    obj: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      params: {
        slotId: '',
        startTime: '',
        endTime: '',
        currentPage: 0,
        pageSize: 10
      },
      date: [],
      slotName: '',
      totalCount: 0,
      totalPage: '',
      list: []
    };
  },
  created() {
    this.$watch('obj.show', val => {
      if (val) {
        this.initData(this.obj);
        this.getList({ currentPage: 1 });
      }
      this.params.currentPage = 1;
    });
    this.$watch('params.currentPage', (val, oldVal) => {
      if (val !== oldVal) this.getList({ currentPage: val });
    });
    this.initData(this.obj);
  },
  watch: {
    date(val) {
      this.params.startTime = getPerDay(formatDate(val[0]), 0);
      this.params.endTime = getPerDay(formatDate(val[1]), 0);
      this.params.currentPage = 1;
    }
  },
  methods: {
    ...mapActions({
      getReviewResult: 'auditsys/getReviewResult'
    }),
    // 初始化
    initData({
      startTime = new Date(),
      endTime = new Date(),
      slotId,
      slotName,
      show
    }) {
      this.date = [startTime, endTime];
      this.params.slotId = slotId;
      this.slotName = slotName;
    },

    // 近30天
    setDate() {
      this.date = [
        getPerDay(formatDate(new Date()), 30),
        getPerDay(formatDate(new Date()), 0)
      ];
    },

    getModalReviewResult(value) {
      let label = '';
      reviewResultArr.forEach(item => {
        if (item.value === value) {
          label = item.label;
        }
      });
      return label;
    },

    getCheatGrade(value) {
      let label = '';
      cheatGradeArr.forEach(item => {
        if (item.value === value) {
          label = item.label;
        }
      });
      return label;
    },

    // 获取列表
    getList({ currentPage }) {
      if (!this.obj.show) return false;
      this.getReviewResult(this.params).then(({ data }) => {
        this.totalPage = data.totalPage;
        this.totalCount = data.totalCount;
        this.list = data.list;
      });
    },

    // 下载列表
    downloadList() {
      let params = {};
      params.startTime = this.params.startTime;
      params.endTime = this.params.endTime;
      params.slotId = this.params.slotId;
      params.appId = this.params.appId;
      location.href = '/riskReview/exportHandleRecords?' + formatParams(params);
    },

    onClose() {
      this.obj.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
.info {
  font-weight: 700;
  font-size: 16px;
  color: #444;
  p {
    margin-bottom: 20px;
  }
}
.download {
  margin-top: 8px;
  font-size: 24px;
  cursor: pointer;
}
.pagination-warp {
  &::after,
  &::before {
    display: table;
    content: '';
    clear: both;
  }
}
</style>