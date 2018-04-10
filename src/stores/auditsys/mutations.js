import * as types from './types';
const mutations = {
  [types.SHOW_LOADING](state, payload) {
    state.loading = payload;
  },
  [types.GET_DEAL](state, payload) {
    state.dealArr = payload;
  },
  [types.SET_ITEMDATAS](state, payload) {
    state.itemDatas = payload;
  },
  [types.CHANGE_LOG](state, payload) {
    state.changeLog = payload;
  },
  [types.QUERY_COUNT_SHOW](state, payload) {
    state.logCount = payload;
  }
};
export default mutations;
