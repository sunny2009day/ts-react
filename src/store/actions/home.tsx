import * as types from "../action-types";
import { TypeAction } from "../../typings/common";

export default {
  setCurrentCategory(payload: string):TypeAction {
    return {type: types.SET_CURRENT_CATEGORY, payload }
  }
}