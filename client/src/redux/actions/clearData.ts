import { Dispatch } from "redux";

import { Recipe } from "../../models";
import {
  CLEAR_COMPONENT_USER,
  CLEAR_DETAIL,
  CLEAR_FILTERS,
  CLEAR_RECIPES
} from "../actionTypes";

export function clearDetail() {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: CLEAR_DETAIL,
      payload: {}
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

export function clearRecipes() {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: CLEAR_RECIPES,
      payload: []
    });
  };
}
