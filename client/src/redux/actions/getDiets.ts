import { Dispatch } from "redux";

import { GET_TYPES_DIET } from "../actionTypes";
import URL from "./URL";

export function getDiets() {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/types`);
    const result = await response.json();
    return dispatch({
      type: GET_TYPES_DIET,
      payload: result
    });
  };
}

export default getDiets;
