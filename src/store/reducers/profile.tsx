import {TypeAction} from '../../typings/common';
import LOGIN_TYPES from '../../typings/login-types';
import * as TYPES from "../action-types";
export interface  TypeProfile {
  loginState: LOGIN_TYPES,
  user: any,// 如果当前用户已经登录
  error: any //如果请求登录状态失败了,放失败的原因
}
let initialState:TypeProfile = {
  loginState: LOGIN_TYPES.UNLOGIN,
  user: null,
  error: null
}
/**
 * TypeAction 在多个模块都引用
 */
export default function(state: TypeProfile = initialState,
   action: TypeAction): TypeProfile {
  switch(action.type) {
    case TYPES.VALIDATE:
      let { code, data, error} = action.payload;
      if(code === 0) { // 当前处于登录状态
        return {...state, loginState:LOGIN_TYPES.LOGINED,
        user: data, error:null }
      } else { // 当前用户未登录
        return {...state, loginState: LOGIN_TYPES.UNLOGIN,user: null,error: null}
      }
    case TYPES.LOGOUT: 
      return {...state, loginState: LOGIN_TYPES.UNLOGIN,user: null,error: null}
    default: 
    return state
  }

}