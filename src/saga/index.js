import { takeLatest } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as api from '../http/index';
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';


function* getTable(action) {
  yield api.getItemDatas(action.params).then((res) => {
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

// wacther saga    takeEvery所有的任务，takeLatest最新的任务 和 takeEvery 不同，
// 在任何时刻 takeLatest 只允许执行一个 fetchData 任务。
// 并且这个任务是最后被启动的那个。 如果之前已经有一个任务在执行，那之前的这个任务会自动被取消。
function* watchGetPosts() {
  yield takeLatest(FETCH_TODOS_REQUEST, getTable);
}

// root saga
export default function* rootSaga() {
  yield watchGetPosts()
} 