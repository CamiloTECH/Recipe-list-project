import { Dispatch } from "redux";

import { Recipe } from "../../models";
import { ORDER_BY_DIET } from "../actionTypes";

function orderByDiets(diet: string, copyRecipes: Recipe[]) {
  return (dispatch: Dispatch) => {
    const recipesSorted = copyRecipes.filter(({ diets }) => {
      return diets.includes(diet);
    });

    return dispatch({
      type: ORDER_BY_DIET,
      payload: recipesSorted
    });
  };
}

export default orderByDiets;
