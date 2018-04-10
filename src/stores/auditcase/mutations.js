import * as types from './types';
const mutations = {
  [types.SHOW_LOADING](state, payload) {
    state.loading = payload;
  },
  [types.SET_ITEMDATAS](state, payload) {
    state.itemDatas = payload;
  }
};
export default mutations;
