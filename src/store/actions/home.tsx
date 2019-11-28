import * as TYPES from "../action-types";
import { TypeAction } from "../../typings/common";
import { getSliders } from '../../api/home';
export default {
  setCurrentCategory(payload: string):TypeAction {
    return {type: TYPES.SET_CURRENT_CATEGORY, payload }
  },
  getSliders(): TypeAction{
    return {
      type: TYPES.GET_SLIDERS,
      payload: getSliders()
    }
  }
}