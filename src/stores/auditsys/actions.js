import * as types from './types';
import {
  getDeals,
  getItemDatas,
  getChangeLogs,
  addCases,
  queryCountShows,
  getReviewResultList
} from '@/services/auditsys/index';

const getDeal = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit(types.SHOW_LOADING, true);
    getDeals(params).then((res) => {
      resolve(res);
      commit(types.GET_DEAL, res.data);
      commit(types.SHOW_LOADING, false);
    }, (res) => {
      reject(res);
      commit(types.SHOW_LOADING, false);
    }).catch((err) => console.log(err));
  });
};

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

const getChangeLog = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit(types.SHOW_LOADING, true);
    getChangeLogs(params).then((res) => {
      resolve(res);
      commit(types.CHANGE_LOG, res.data);
      commit(types.SHOW_LOADING, false);
    }, (res) => {
      commit(types.SHOW_LOADING, false);
      reject(res);
    }).catch((err) => console.log(err));
  });
};

const queryCountShow = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit(types.SHOW_LOADING, true);
    queryCountShows(params).then((res) => {
      resolve(res);
      commit(types.QUERY_COUNT_SHOW, res.data);
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

const getReviewResult = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    commit(types.SHOW_LOADING, true);
    getReviewResultList(params).then((res) => {
      commit(types.SHOW_LOADING, false);
      resolve(res);
    }, (res) => {
      commit(types.SHOW_LOADING, false);
      reject(res);
    });
  }).catch((err) => console.log(err));
};

export default{
  getDeal,
  getitemData,
  getChangeLog,
  addCase,
  queryCountShow,
  getReviewResult
};
