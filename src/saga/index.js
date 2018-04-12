import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as api from '../http/index';
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';


function* getTable(params) {
  yield api.getItemDatas(params).then((res) => {
     put({
      type: FETCH_TODOS_SUCCESS,
      res: res
    });
  }, (res) => {
      put({
      type:FETCH_TODOS_FAILURE,
      res: res
    })
  }).catch((err) => console.log(err));
};

// wacther saga
function* watchGetPosts() {
  yield takeLatest(FETCH_TODOS_REQUEST, getTable);
}

// root saga
export default function* rootSaga() {
  yield watchGetPosts()
} 