import { Dispatch } from "redux";

import { Recipe } from "../../models";
import { ORDER_BY_NAME } from "../actionTypes";

function orderByName(order: string, recipes: Recipe[]) {
  return (dispatch: Dispatch) => {
    let recipesSorted;
    if (order === "1") {
      recipesSorted = recipes.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    } else {
      recipesSorted = recipes.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        }
        if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    }

    return dispatch({
      type: ORDER_BY_NAME,
      payload: [...recipesSorted]
    });
  };
}

export default orderByName;
