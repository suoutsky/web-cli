
<template>
  <d-modal :title="''" :show="obj.show" width="300" :on-close="onClose">
      <div class="modal-body" slot="modal-body">
         <div class="info">
          <p>广告位id：{{obj.slotId}}</p>
          <p>广告位名称：{{obj.slotName}}</p>
          <p>日期：{{obj.date}}</p>
        </div>
        <!-- 验证start -->
        <el-form :model="params" :rules="rules" ref="caseForm">
          <div class="form-item-warp">
            <el-form-item label="案例特征" prop="exampleFeatures">
              <el-input type="textarea" v-model="params.exampleFeatures"></el-input>
            </el-form-item>
          </div>
          <div class="form-item-warp">
            <el-form-item label="案例需求：" prop="exampleDemand">
              <el-input type="textarea" v-model="params.exampleDemand"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <!-- 验证end -->
      </div>
      <div class="modal-footer cf" slot="modal-footer">
        <el-button type="primary" @click="onOk">提交</el-button>
        <el-button @click="onClose">取消</el-button>
      </div>
  </d-modal>
</template>
<script>
import { mapActions } from 'vuex';
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
        exampleFeatures: '',
        exampleDemand: ''
      },
      rules: {
        exampleFeatures: [
          { required: true, message: '请输入', trigger: 'blur' },
          { max: 300, message: '长度小于300', trigger: 'blur' }
        ],
        exampleDemand: [
          { required: true, message: '请输入', trigger: 'blur' },
          { max: 300, message: '长度小于300', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ...mapActions({
      addCase: 'auditcase/addCase'
    }),
    onOk() {
      let self = this;
      let params = {
        slotId: this.obj.slotId,
        slotName: this.obj.slotName,
        date: this.obj.date,
        riskAllId: this.obj.riskAllId,
        exampleFeatures: this.params.exampleFeatures,
        exampleDemand: this.params.exampleDemand
      };
      this.$refs.caseForm.validate((valid) => {
        if (valid) {
          this.addCase(params).then((res) => {
            if (res.success) {
              self.obj.inCase(self.obj.type, self.obj.data, self.obj.id, self.obj.allId, self.obj.row);
              // this.$message({
              //   type: 'success',
              //   message: '修改成功!'
              // });
              // this.onClose();
            } else {
              this.$message.error(res.desc);
            }
          }, (res) => {
            this.$message.error('网络错误！');
          });
        }
      });
    },
    onClose() {
      this.obj.show = false;
      this.obj.search();
    }
  }
};
</script>
<style lang="less" scoped>
.info {
  font-weight: 700;
  font-size: 16px;
  color: #444;
}
.form-item-warp {
  margin-bottom: 20px !important;
}
</style>
