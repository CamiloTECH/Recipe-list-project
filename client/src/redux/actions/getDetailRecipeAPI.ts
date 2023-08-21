import { Dispatch } from "redux";

import { GET_RECIPE_DETAIL } from "../actionTypes";
import URL from "./URL";

function getDetailRecipeAPI(id: string) {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/recipes/${id}`);
    const result = await response.json();
    return dispatch({
      type: GET_RECIPE_DETAIL,
      payload: result
    });
  };
}

export default getDetailRecipeAPI;
