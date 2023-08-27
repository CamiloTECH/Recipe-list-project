import { Dispatch } from "redux";

import { GET_RECIPES_NAME } from "../actionTypes";
import { loading } from "./clearData";
import URL from "./URL";

function getRecipesByName(name: string) {
  return async (dispatch: Dispatch) => {
    dispatch(loading(true));
    const response = await fetch(`${URL}/recipes?name=${name}`);
    const result = await response.json();
    dispatch(loading(false));
    
    return dispatch({
      type: GET_RECIPES_NAME,
      payload: result
    });
  };
}

export default getRecipesByName;
