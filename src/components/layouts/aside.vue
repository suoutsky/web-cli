<template>
    <el-menu 
        :router="true"
        class="el-menu-vertical-demo"
        :default-active= "activeRouter" 
        @select = "getpath"
    >
        <el-menu-item 
            v-for="(item,index) in getRouterList"
            :key="index"
            :index = "item.path"
            :router="{path:item.path}"
            >
            <i :class='["iconfont", item.icon]'></i>
            <span slot="title">{{item.title}}</span>
        </el-menu-item>
    </el-menu>
</template>
<script>
import routers from '@/routers/index';
export default {
  data() {
    return {
      isCollapse: false,
      routerList: [],
      activeRouter: ''
    };
  },
  methods: {
    getpath(index, path) {
      this.activeRouter = index;
    }

  },
  computed: {
    getRouterList() {
      let list = [];
      routers.options.routes.forEach((ele) => {
        if (ele.meta.sliderBar) {
          list.push({
            title: ele.meta.title,
            path: ele.path,
            icon: ele.meta.icon
          });
        }
      });
      return list;
    }
  },
  created() {
    this.activeRouter = this.$route.matched[0].path;
  }
};
</script>
<style lang="less">
.el-menu{
    .el-menu-item{
        i,span{
            color:#fff
        }
    }
     .is-active{
        background-color: #242f42;
        i,span{
            color:#409eff
        }
        border-left:5px solid #409eff
    }
    .el-menu-item:hover:not(.is-active){
        i,span{
            color:#666
        }
    }
}
</style>
