import {TypeAction} from '../../typings/common'
export interface  TypeProfile {
  currentCategory: string;
}
let initialState = {
  currentCategory: "all"
}
/**
 * TypeAction 在多个模块都引用
 */
export default function(state: TypeProfile = initialState, action: TypeAction) {
  switch(action.type) {
    default: 
    return state
  }

}