import { ReducerState } from "../models";
import {
  ADD_RECIPE,
  CLEAR_COMPONENT_USER,
  CLEAR_DETAIL,
  CLEAR_FILTERS,
  CLEAR_RECIPES,
  GET_ALL_RECIPES,
  GET_RECIPE_DETAIL,
  GET_RECIPES_NAME,
  GET_TYPES_DIET,
  ORDER_BY_DIET,
  ORDER_BY_NAME,
  ORDER_BY_SCORE
} from "./actionTypes";

const Inicialstate: ReducerState = {
  types: [],
  recipes: [],
  copyRecipes: [],
  createUser: undefined,
  recipesDetail: undefined
};

export default function rootReducer(
  state = Inicialstate,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        copyRecipes: action.payload
      };
    case GET_RECIPES_NAME:
      return {
        ...state,
        recipes: action.payload,
        copyRecipes: action.payload
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        recipesDetail: action.payload
      };
    case CLEAR_COMPONENT_USER:
      return {
        ...state,
        createUser: action.payload
      };
    case CLEAR_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        copyRecipes: action.payload
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        recipes: action.payload
      };
    case ORDER_BY_NAME:
      return {
        ...state,
        recipes: action.payload
      };
    case ORDER_BY_SCORE:
      return {
        ...state,
        recipes: action.payload
      };
    case ORDER_BY_DIET:
      return {
        ...state,
        recipes: action.payload
      };

    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipesDetail: action.payload
      };
    case GET_TYPES_DIET:
      return {
        ...state,
        types: action.payload
      };
    case ADD_RECIPE:
      return {
        ...state,
        createUser: action.payload
      };
    default:
      return state;
  }
}
