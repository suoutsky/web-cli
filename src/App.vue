<template>
  <div id="app">
    <layout-aside></layout-aside> 
  </div>
</template>

<script>
  import layoutAside from '@/components/layouts/index';

  export default {
    name: 'app',
    components: { layoutAside }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    overflow-y: hidden;
  }
  .page-layout .el-main {
    background: #fff !important;
  }
</style>
