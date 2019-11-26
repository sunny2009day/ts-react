import {TypeAction} from '../../typings/common';
import * as types from '../action-types';
export interface  TypeHome {
  currentCategory: string;
}
let initialState = {
  currentCategory: "all"
}
/**
 * TypeAction 在多个模块都引用
 */
export default function(state: TypeHome = initialState, action: TypeAction) {
  switch(action.type) {
    case types.SET_CURRENT_CATEGORY: 
     return {...state, currentCategory: action.payload};
    default: 
    return state
  }

}