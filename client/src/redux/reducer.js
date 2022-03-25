import {
  GET_ALL_RECIPES,
  GET_RECIPES_NAME,
  GET_RECIPE_DETAIL_API,
  GET_RECIPE_DETAIL_DB,
  GET_TYPES_DIET,
  ADD_RECIPE,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  ORDER_BY_DIET,
  CLEAR_FILTERS,
  CLEAR_COMPONENT_DETAIL,
  CLEAR_COMPONENT_USER,
} from "./actions";

let Inicialstate = {
  recipes: [],
  copyRecipes: [],
  recipesDetail: {},
  types: [],
  createUser: {},
};
export default function rootReducer(state = Inicialstate, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        copyRecipes: action.payload,
      };
    case GET_RECIPES_NAME:
      return {
        ...state,
        recipes: action.payload,
        copyRecipes: action.payload,
      };
    case CLEAR_COMPONENT_DETAIL:
      return {
        ...state,
        recipesDetail: action.payload,
      };
    case CLEAR_COMPONENT_USER:
      return {
        ...state,
        createUser: action.payload,
      };
    case ORDER_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };
    case ORDER_BY_SCORE:
      return {
        ...state,
        recipes: action.payload,
      };
    case ORDER_BY_DIET:
      return {
        ...state,
        recipes: action.payload,
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        recipes: action.payload,
      };
    case GET_RECIPE_DETAIL_API:
      return {
        ...state,
        recipesDetail: action.payload,
      };
    case GET_RECIPE_DETAIL_DB:
      return {
        ...state,
        recipesDetail: action.payload,
      };
    case GET_TYPES_DIET:
      return {
        ...state,
        types: action.payload,
      };
    case ADD_RECIPE:
      return {
        ...state,
        createUser: action.payload,
      };
    default:
      return state;
  }
}
