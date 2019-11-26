import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history'
import home from './home';
let reducers = {
  home, 
  router: connectRouter(history)
};

let reducer = combineReducers(reducers);

/**
 * 导出根的状态
 */
export type TypeRootState = {
  [key in keyof typeof reducers]:ReturnType<typeof reducers[key]>

}
export default reducer;