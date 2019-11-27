import { combineReducers, ReducersMapObject, Reducer, AnyAction } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from '../history'
import home from './home';
import profile from './profile';
import mine from './mine';
let reducers = {
  home,
  mine, 
  profile,
  router: connectRouter(history)
};
 

// let reducer = combineReducers(reducers);

/**
 * 导出根的状态
 */
export type TypeRootState = {
  [key in keyof typeof reducers]:ReturnType<typeof reducers[key]>
}
let reducer:Reducer<TypeRootState, AnyAction> = combineReducers(reducers);
export default reducer;