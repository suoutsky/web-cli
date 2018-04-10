<template>
<div class="page-layout">
    <el-container >
        <el-header>
            <layout-header></layout-header>
        </el-header>
    </el-container>
    <el-container class="content-wrapper">
        <el-aside width="140px" class="aside-wrapper"> 
            <layout-aside></layout-aside>
        </el-aside>
        <el-main>
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </el-main>
    </el-container>
</div>
</template>
<script>
    import layoutHeader from './header';
    import layoutAside from './aside';
    export default {
      data() {
        return {

        };
      },
      components: {layoutHeader, layoutAside},
      beforeRouteLeave(to, from, next) {
        console.log(to);
        next(false);
      }
    };
</script>
<style lang="less">
.page-layout{
    height:100%;
    .el-main{
        background: #eee;
        .page-dadaquery{
            background: #fff
        }
    }
    .el-header{
       background-color: #324157
    }
    .el-aside{
        .el-menu{
            border-right:none;
            height:100%;
            background-color: #324157
        }
    }
    .content-wrapper{
        height:100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

    }
    .fade-enter-active, .fade-leave-active {
        transition: all .1s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
   
}
</style>
