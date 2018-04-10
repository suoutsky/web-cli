import * as types from './types';
import {
  getItemDatas,
  addCases,
  deleExamples
} from '@/services/auditcase/index';

const getitemData = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit(types.SHOW_LOADING, true);
    getItemDatas(params).then((res) => {
      resolve(res);
      commit(types.SET_ITEMDATAS, res.data);
      commit(types.SHOW_LOADING, false);
    }, (res) => {
      commit(types.SHOW_LOADING, false);
      reject(res);
    }).catch((err) => console.log(err));
  });
};

const addCase = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit(types.SHOW_LOADING, true);
    addCases(params).then((res) => {
      commit(types.SHOW_LOADING, false);
      resolve(res);
    }, (res) => {
      commit(types.SHOW_LOADING, false);
      reject(res);
    });
  }).catch((err) => console.log(err));
};

const deleExample = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit(types.SHOW_LOADING, true);
    deleExamples(params).then((res) => {
      commit(types.SHOW_LOADING, false);
      resolve(res);
    }, (res) => {
      commit(types.SHOW_LOADING, false);
      reject(res);
    });
  }).catch((err) => console.log(err));
};

export default{
  getitemData,
  addCase,
  deleExample
};
