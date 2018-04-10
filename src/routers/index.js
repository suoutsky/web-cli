import auditSys from './auditsys/index';
import auditCase from './auditcase/index';
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const routes = [...auditSys, ...auditCase];
export default new Router({
  routes
});
