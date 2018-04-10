import Vue from 'vue';
import Vuex from 'vuex';
// Modules
import auditsys from './auditsys/index';
import auditcase from './auditcase/index';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    auditsys,
    auditcase
  },
  strict: false
});
