// Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。
// 这种 State 的计算过程就叫做 Reducer。
import {
  // FETCH_TODOS_REQUEST, 
  FETCH_TODOS_SUCCESS, 
  // FETCH_TODOS_FAILURE,
} from '../action';

const dataquery = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
        return action.res
    default:
      return state;    
  }  
};

export default dataquery;
