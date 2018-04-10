
<template>
  <d-modal :title="''" :show="obj.show" width="" :on-close="onClose">
      <div class="modal-body" slot="modal-body">
        <div class="info">
          <p>广告位id：{{obj.row.slotId}}</p>
          <p>广告位名称：{{obj.row.slotName}}</p>
          <p>日期：{{obj.row.curDate}}</p>
        </div>
        <div v-for="(item, index) in obj.data" :key="index">
           <div class="item-log">
             <div class="title">{{item.reviewAction}}</div>
             <div class="list-info">
               <p class="item-info" v-if="item.reviewTime">时间：{{item.reviewTime}}</p>
               <p class="item-info" v-if="item.riskReviewer">处理人：{{item.riskReviewer}}</p>
               <p class="item-info" v-if="item.reviewResult">处理结果：{{getReviewResult(item.reviewResult)}}</p>
             </div>
           </div>
        </div>
      </div>
      <div class="modal-footer cf" slot="modal-footer">
      </div>
  </d-modal>
</template>
<script>
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
export default {
  props: {
    obj: {
      required: true,
      type: Object
    }
  },
  created() {
    console.log('objrender', this.obj);
  },
  methods: {
    getReviewResult(value) {
      let label = '';
      reviewResultArr.forEach((item) => {
        if (item.value === value) {
          label = item.label;
        }
      });
      return label;
    },
    onClose() {
      this.obj.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.modal-body {
  max-height: 500px;
  overflow-y: auto !important;
}
.info {
  font-weight: 700;
  font-size: 16px;
  color: #444;
}
.item-log {
  padding-top: 40px;
  .title {
    display: inline-block;
    width: 100px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    background-color: #F6B4A0;
    vertical-align: middle;
  }
  .list-info {
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;    
  }
}
</style>