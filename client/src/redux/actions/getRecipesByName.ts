import { Dispatch } from "redux";

import { GET_RECIPES_NAME } from "../actionTypes";
import URL from "./URL";

function getRecipesByName(name: string) {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/recipes?name=${name}`);
    const result = await response.json();

    return dispatch({
      type: GET_RECIPES_NAME,
      payload: result
    });
  };
}

export default getRecipesByName;
