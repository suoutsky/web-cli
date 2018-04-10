// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './assets/css/index.less';
import Vue from 'vue';
// import axios from 'axios'
// import axios from './lib/ajax'
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/fonts/iconfont.css';
import App from './App';
import router from './routers';
import store from './stores/index';
// import water from './components/utils/water';// eslint-disable-line
import Modal from './components/basic/modal.vue';
import Loading from './components/basic/loading';
// modal组件
Vue.component('d-modal', Modal);
Vue.component('Loading', Loading);

Vue.use(ElementUI);
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - 钟馗`;
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
