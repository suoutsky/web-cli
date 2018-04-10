<template>
  <div class="com-header">
    <div class="header-wrapper">
        <img src='../../assets/images/icon.png' /><h3>风控管理系统</h3>
        <!-- <div class="login">
            <img src="" alt="">
            <template>
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>登录</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
        </div> -->
    </div>
  </div>
</template>
<script>
    export default {
      data() {
        return {

        };
      }
    };
</script>
<style lang="less">
.com-header{
    height:60px;
    color:#fff;
    .header-wrapper{
        height:100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        h3{
            font-size:18px;
            padding-left: 20px;
            margin-left: 20px;
            border-left: 1px solid #fff;
            font-weight:bold;
            flex:1;
        }
        .login{
            height:50px;
            flex:0 0 150px;
            img{
                float:left;
                border:none;
                background: #fff;
                border-radius:50%;
                height:50px;
                width:50px;
            }
            .el-dropdown{
                float:left;
                height:100%;
                line-height: 50px;
                color:#fff;
                margin-left:10px;
                .el-icon-arrow-down{
                    cursor: pointer;
                }
            }
        }
    }
   
}
</style>
