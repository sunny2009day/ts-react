import {TypeAction} from '../../typings/common';
import * as types from '../action-types';

export interface Sliders{
  url: string
}

export interface Lesson {
  _id: string,
  order: number,//顺序
  title: string,//标题
  video: string,//视频
  poster: string, //海报
  url: string,//url地址
  price: string,//价格
  category: string,//分类 all react vue 
}
export interface Lessons {
  loading: boolean; // 是否正在加载课程列表
  list: Array<Lesson>; // 课程列表
  hasMore: boolean; // 是否后面还有更多
  offset: number; // 偏移量,每次要获取5条
  limit: number; // 每页显示的条数
}
export interface  TypeHome {
  currentCategory: string;
  sliders:Array<Sliders>;
  lessons: Lessons
}
let initialState:TypeHome = {
  currentCategory: "all",
  sliders: [],
  lessons: {
    loading: false,
    list: [],
    hasMore: true,
    offset: 0,
    limit: 5
  }
}
/**
 * TypeAction 在多个模块都引用
 */
export default function(state: TypeHome = initialState, action: TypeAction): TypeHome {
  switch(action.type) {
    case types.SET_CURRENT_CATEGORY: 
     return {...state, currentCategory: action.payload};
     case types.GET_SLIDERS: 
     return {...state, sliders: action.payload.data};
     case types.SET_LESSONS_LOADING: 
     return {...state, lessons: {...state.lessons, loading: action.payload}};
     case types.SET_LESSONS: 
     return {...state, lessons: {...state.lessons, 
       loading: false,
       list: [...state.lessons.list, ...action.payload.list],
       hasMore: action.payload.hasMore,
       offset: state.lessons.offset + action.payload.list.length // 上次的偏移量加上这次返回的长度
      }};
    default: 
    return state
  }

}