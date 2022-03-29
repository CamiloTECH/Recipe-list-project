export const GET_ALL_RECIPES = "getAllrecipes",
  GET_RECIPES_NAME = "getRecipesName",
  GET_RECIPE_DETAIL = "getRecipeDetail",
  GET_TYPES_DIET = "getTypesDiet",
  ADD_RECIPE = "addRecipe",
  ORDER_BY_NAME = "orderByName",
  ORDER_BY_SCORE = "orderByScore",
  ORDER_BY_DIET = "orderByDiet",
  CLEAR_FILTERS = "clearFilters",
  CLEAR_COMPONENT_DETAIL = "clearComponentDetail",
  CLEAR_COMPONENT_USER = "clearComponentUser",
  CLEAR_RECIPES = "clearRecipes";

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
  name=name.trim()
  return async function (dispatch) {
    const response = await fetch(`http://localhost:3001/recipes?name=${name}`);
    const result = await response.json();
    return dispatch({
      type: GET_RECIPES_NAME,
      payload: result,
    });
  };
}

export function getRecipeDetailAPI(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/recipes/${id}`)
      .then((response) => response.json())
      .then((result) =>
        dispatch({
          type: GET_RECIPE_DETAIL,
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
      type: GET_RECIPE_DETAIL,
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
      body: JSON.stringify(recipe),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    return dispatch({
      type: ADD_RECIPE,
      payload: result,
    });
  };
}

export function orderByName(order, recipes) {
  let copyRecipe = [...recipes];
  let recipesSorted;
  if (order === "1") {
    recipesSorted = copyRecipe.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (b.title > a.title) return -1;
      return 0;
    });
  } else {
    recipesSorted = copyRecipe.sort((a, b) => {
      if (a.title > b.title) return -1;
      if (b.title > a.title) return 1;
      return 0;
    });
  }

  return {
    type: ORDER_BY_NAME,
    payload: recipesSorted,
  };
}

export function orderByScore(score, recipes) {
  let copyRecipe = [...recipes];
  let recipesSorted;
  if (score === "1") {
    recipesSorted = copyRecipe.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (b.score > a.score) return 1;
      return 0;
    });
  } else {
    recipesSorted = copyRecipe.sort((a, b) => {
      if (a.score > b.score) return 1;
      if (b.score > a.score) return -1;
      return 0;
    });
  }

  return {
    type: ORDER_BY_SCORE,
    payload: recipesSorted,
  };
}

export function orderByDiet(diet, copyRecipes) {
  let copyRecipe = [...copyRecipes];
  let recipesSorted = [];
  copyRecipe.forEach((recipe) => {
    if (typeof recipe.diets[0] === "string") {
      if (recipe.diets.includes(diet)) {
        recipesSorted.push(recipe);
      }
    } else {
      if (recipe.diets.find((objDiet) => objDiet.name === diet)) {
        recipesSorted.push(recipe);
      }
    }
  });
  return {
    type: ORDER_BY_DIET,
    payload: recipesSorted,
  };
}

export function clearComponentDetail() {
  return {
    type: CLEAR_COMPONENT_DETAIL,
    payload: {},
  };
}

export function clearUser() {
  return {
    type: CLEAR_COMPONENT_USER,
    payload: {},
  };
}

export function cleaningFilters(copyRecipes) {
  return {
    type: CLEAR_FILTERS,
    payload: copyRecipes,
  };
}

export function cleaningRecipes() {
  return {
    type: CLEAR_RECIPES,
    payload: [],
  };
}