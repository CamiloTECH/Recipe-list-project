import { Dispatch } from "redux";

import { GET_ALL_RECIPES } from "../actionTypes";
import { loading } from "./clearData";
import URL from "./URL";

function getAllrecipes() {
  return async (dispatch: Dispatch) => {
    dispatch(loading(true));
    const response = await fetch(URL);
    const result = await response.json();
    dispatch(loading(false));
    return dispatch({
      type: GET_ALL_RECIPES,
      payload: result
    });
  };
}

export default getAllrecipes;
