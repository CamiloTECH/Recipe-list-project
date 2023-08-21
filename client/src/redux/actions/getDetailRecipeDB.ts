import { Dispatch } from "redux";

import { GET_RECIPE_DETAIL } from "../actionTypes";
import URL from "./URL";

function getDetailRecipeDB(id: string) {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/recipes/db/${id}`);
    const result = await response.json();
    return dispatch({
      type: GET_RECIPE_DETAIL,
      payload: result
    });
  };
}

export default getDetailRecipeDB;
