export const GET_ALL_RECIPES = "getAllrecipes",
  GET_RECIPES_NAME = "getRecipesName",
  GET_RECIPE_DETAIL_API = "getRecipeDetailAPI",
  GET_RECIPE_DETAIL_DB = "getRecipeDetailDB",
  GET_TYPES_DIET = "getTypesDiet",
  ADD_RECIPE = "addRecipe";

// router.get("/types", getTypes);
// router.post("/recipes", createRecipe);
export function getAllrecipes() {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/");
    const result = await response.json();
    return dispatch({
      type: GET_ALL_RECIPES,
      payload: result,
    });
  };
}

export function getRecipesName(name) {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/recipes?name=${name}`);
    const result = response.json();
    return dispatch({
      type: GET_RECIPES_NAME,
      dispatch: result,
    });
  };
}

export function getRecipeDetailAPI(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((result) =>
        dispatch({
          type: GET_RECIPE_DETAIL_API,
          payload: result,
        })
      );
  };
}

export function getRecipeDetailDB(id) {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/recipes/db/${id}`);
    const result = await response.json();
    return dispatch({
      type: GET_RECIPE_DETAIL_DB,
      payload: result,
    });
  };
}

export function getTypesDiet() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/types`)
      .then((response) => response.json())
      .then((result) =>
        dispatch({
          type: GET_TYPES_DIET,
          payload: result,
        })
      );
  };
}

export function addRecipe(recipe) {
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/recipes`, {
      method: "POST",
      body: recipe,
    });
    const result = await response.json();
    return dispatch({
      type: ADD_RECIPE,
      payload: result
    });
  };
}
