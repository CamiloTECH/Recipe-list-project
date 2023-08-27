import { Dispatch } from "redux";

import { Recipe } from "../../models";
import {
  CLEAR_COMPONENT_USER,
  CLEAR_DETAIL,
  CLEAR_FILTERS,
  LOADING
} from "../actionTypes";

export function clearDetail() {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: CLEAR_DETAIL,
      payload: undefined
    });
  };
}

export function clearUser() {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: CLEAR_COMPONENT_USER,
      payload: {}
    });
  };
}

export function clearFilters(copyRecipes: Recipe[]) {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: CLEAR_FILTERS,
      payload: copyRecipes
    });
  };
}

export function loading(load: boolean) {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: LOADING,
      payload: load
    });
  };
}
