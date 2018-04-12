
import { createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/index'
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

let store = createStore(rootReducer, null, applyMiddleware(...middlewares));


sagaMiddleware.run(rootSaga);


export default store;