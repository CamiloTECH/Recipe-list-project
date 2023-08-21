import { Dispatch } from "redux";

import { Recipe } from "../../models";
import { ORDER_BY_SCORE } from "../actionTypes";

function orderByScore(score: string, recipes: Recipe[]) {
  return (dispatch: Dispatch) => {
    let recipesSorted;
    if (score === "1") {
      recipesSorted = recipes.sort((a, b) => {
        if (a.score > b.score) return -1;
        if (b.score > a.score) return 1;
        return 0;
      });
    } else {
      recipesSorted = recipes.sort((a, b) => {
        if (a.score > b.score) return 1;
        if (b.score > a.score) return -1;
        return 0;
      });
    }

    return dispatch({
      type: ORDER_BY_SCORE,
      payload: [...recipesSorted]
    });
  };
}

export default orderByScore;
