import * as TYPES from "../action-types";
 
import {validate, register, login, logout} from '../../api/profile';
import { TypeAnyObject,TypeThunkFunction  } from '../../typings/common';
import { message } from "antd";
import { Dispatch, Store } from "redux";
import { push } from "connected-react-router";
import { AnyAction } from "redux";
 
export default {
  // 方法可以传递给组件,让组件通用,用来向服务器发请求
  validate(): AnyAction {
    // redux-promise中间件会拦截这个action,判断如果payload是promise
    // 会等待promise完成,把payload值变成resolved的值重新开发仓库
    return {
      type: TYPES.VALIDATE,
      payload: validate()
    }
 },
 // 注册用户
 register(values: TypeAnyObject):TypeThunkFunction{ // redux-thunk
   return async (dispatch:Dispatch) =>{
       let result: TypeAnyObject = await register(values);
       if(result.code == 0) {
         dispatch(push('./login'));
       } else {
         message.error(result.error);
       }
    }
},
 // 登录
 login(values: TypeAnyObject): TypeThunkFunction{ // redux-thunk
  return async function (dispatch:Dispatch) {
      let result: TypeAnyObject = await login(values);
      if(result.code == 0) {
        // 如果登录成功,跳转到个人中心
        dispatch(push('./profile'));
      } else {
        message.error(result.error);
      }
   }
 },
 logout() {
  return {
    type: TYPES.LOGOUT,
    payload: logout()
  }
 }
}