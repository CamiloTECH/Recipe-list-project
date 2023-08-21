import { Dispatch } from "redux";

import { ADD_RECIPE } from "../actionTypes";
import URL from "./URL";

interface Recipe {
  title: string;
  image: string;
  score: number;
  diets: string[];
  summary: string;
  healthScore: number;
  steps: string;
}

function createRecipe(recipe: Recipe) {
  return async (dispatch: Dispatch) => {
    const response = await fetch(`${URL}/recipes`, {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json();
    return dispatch({
      type: ADD_RECIPE,
      payload: result
    });
  };
}

export default createRecipe;
