import { Dispatch } from "redux";

import { Recipe } from "../../models";
import { ORDER_BY_NAME } from "../actionTypes";

function orderByName(order: string, recipes: Recipe[]) {
  return (dispatch: Dispatch) => {
    const copyRecipes = [...recipes];
    let recipesSorted = [];
    if (order === "asc") {
      recipesSorted = copyRecipes.sort((a, b) => {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (b.title.toLowerCase() > a.title.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    } else {
      recipesSorted = copyRecipes.sort((a, b) => {
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
      payload: recipesSorted
    });
  };
}

export default orderByName;
