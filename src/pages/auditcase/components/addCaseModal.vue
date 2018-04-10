
<template>
  <d-modal :title="'案例添加'" :show="obj.show" width="300" :on-close="onClose">
      <div class="modal-body" slot="modal-body">
        <!-- 验证start -->
        <el-form :model="params" :rules="rules" ref="caseForm">
          <div class="form-item-warp">
            <el-form-item label="广告位id" prop="slotId">
              <el-input type="input" v-model="params.slotId"></el-input>
            </el-form-item>
          </div>
          <div class="form-item-warp">
            <el-form-item label="异常时间点">
              <el-date-picker v-model="params.exceptionDate" type="datetime" placeholder="选择异常日期时间"></el-date-picker>
            </el-form-item>
          </div>
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
        <el-button type="primary" @click="onOk">确认</el-button>
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
        exampleDemand: '',
        exceptionDate: '',
        slotId: ''
      },
      rules: {
        slotId: [{ required: true, message: '请输入媒体id', trigger: 'blur' }],
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
      this.$refs.caseForm.validate(valid => {
        if (valid) {
          console.log('submit');
          this.addCase(this.params).then(
            res => {
              if (res.success) {
                this.onClose();
                this.$message({
                  type: 'success',
                  message: '修改!'
                });
                this.obj.search();
              } else {
                this.$message.error(res.desc);
              }
            },
            res => {
              this.$message.error('网络错误！');
            }
          );
        }
      });
    },
    onClose() {
      this.obj.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
.form-item-warp {
  margin-bottom: 20px !important;
}
.el-date-editor.el-input {
  width: 100%;
}

.pagination-warp {
  padding-top: 10px;
  float: right;
}
</style>
