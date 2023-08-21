import { Dispatch } from "redux";

import { GET_ALL_RECIPES } from "../actionTypes";
import URL from "./URL";

function getAllrecipes() {
  return async (dispatch: Dispatch) => {
    const response = await fetch(URL);
    const result = await response.json();
    return dispatch({
      type: GET_ALL_RECIPES,
      payload: result
    });
  };
}

export default getAllrecipes;
