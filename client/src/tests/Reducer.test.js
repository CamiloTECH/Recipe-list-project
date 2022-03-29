import rootReducer from "../redux/reducer";
import {
  GET_ALL_RECIPES,
  GET_TYPES_DIET,
  GET_RECIPE_DETAIL,
  GET_RECIPES_NAME,
  ADD_RECIPE,
  cleaningFilters,
  clearComponentDetail,
  clearUser,
  cleaningRecipes,
  orderByName,
  orderByScore,
  orderByDiet,
} from "../redux/actions";

describe("Reducer", () => {
  const diets = ["gluten free", "vegan"];
  const data = [
    {
      id: 2,
      title: "titulo-b",
      score: 12,
      image: "imagen",
      diets: [1, 2, 3, 4],
    },
    {
      id: 1,
      score: 15,
      title: "titulo-a",
      image: "imagen",
      diets: [1, 2, 3, 4],
    },
  ];

  const state = {
    recipes: [],
    copyRecipes: [],
    recipesDetail: {},
    types: [],
    createUser: {},
  };

  it("Deberia enviar el estado inicial si no se le pasa un type valido", () => {
    expect(rootReducer(undefined, [])).toEqual(state);
  });

  it("Deberia guardar en nuestra state las recipes obtenida del back cuando el type sea GET_ALL_RECIPES", () => {
    const result = rootReducer(state, {
      type: GET_ALL_RECIPES,
      payload: data,
    });

    expect(result).not.toEqual(state);
    expect(result).toEqual({
      recipes: data,
      copyRecipes: data,
      recipesDetail: {},
      types: [],
      createUser: {},
    });
  });

  it("Deberia guardar en nuestros state la recipe obtenida del llamado al back cuando el type sea GET_RECIPES_DETAIL", () => {
    const result = rootReducer(state, {
      type: GET_RECIPE_DETAIL,
      payload: data[0],
    });
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      recipes: [],
      copyRecipes: [],
      recipesDetail: data[0],
      types: [],
      createUser: {},
    });
  });

  it("Deberia guardar en nuestros state la diets obtenida del llamado al back cuando el type sea GET_TYPES_DIET", () => {
    const result = rootReducer(state, {
      type: GET_TYPES_DIET,
      payload: diets,
    });
    expect(result).not.toEqual(state);
    expect(result).toEqual({
      recipes: [],
      copyRecipes: [],
      recipesDetail: {},
      types: diets,
      createUser: {},
    });
  });

  it("Deberia guardar en nuestra state las recipes obtenida del back cuando el type sea GET_RECIPES_NAME", () => {
    const result = rootReducer(state, {
      type: GET_RECIPES_NAME,
      payload: data,
    });

    expect(result).not.toEqual(state);
    expect(result).toEqual({
      recipes: data,
      copyRecipes: data,
      recipesDetail: {},
      types: [],
      createUser: {},
    });
  });

  it("Deberia guardar en nuestra state el id obtenido del back cuando el type sea ADD_RECIPE", () => {
    const result = rootReducer(state, {
      type: ADD_RECIPE,
      payload: { id: 1 },
    });

    expect(result).not.toEqual(state);
    expect(result).toEqual({
      recipes: [],
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: { id: 1 },
    });
  });

  it('Debería cambiar nuestro recipes store cuando action type es "CLEAR_FILTERS"', () => {
    const state = {
      recipes: data[0],
      copyRecipes: data,
      recipesDetail: {},
      types: [],
      createUser: {},
    };

    const result1 = rootReducer(state, cleaningFilters(data));

    expect(result1).not.toEqual(state);
    expect(result1).toEqual({
      recipes: data,
      copyRecipes: data,
      recipesDetail: {},
      types: [],
      createUser: {},
    });
  });

  it('Debería cambiar nuestro recipesDetail store cuando action type es "CLEAR_COMPONENT_DETAIL"', () => {
    const state = {
      recipes: [],
      copyRecipes: [],
      recipesDetail: data[0],
      types: [],
      createUser: {},
    };

    const result1 = rootReducer(state, clearComponentDetail());

    expect(result1).not.toEqual(state);
    expect(result1).toEqual({
      recipes: [],
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: {},
    });
  });

  it('Debería cambiar nuestro createUser store cuando action type es "CLEAR_COMPONENT_USER"', () => {
    const state = {
      recipes: [],
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: { id: 1 },
    };

    const result1 = rootReducer(state, clearUser());

    expect(result1).not.toEqual(state);
    expect(result1).toEqual({
      recipes: [],
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: {},
    });
  });

  it('Debería cambiar nuestro recipes store cuando action type es "CLEAR_RECIPES"', () => {
    const state = {
      recipes: data,
      copyRecipes: data,
      recipesDetail: {},
      types: [],
      createUser: {},
    };

    const result1 = rootReducer(state, cleaningRecipes());

    expect(result1).not.toEqual(state);
    expect(result1).toEqual({
      recipes: [],
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: {},
    });
  });

  it('Debería cambiar nuestro recipes store cuando action type es "ORDER_BY_NAME"', () => {
    const dataOrder = [
      {
        id: 1,
        title: "titulo-a",
        image: "imagen",
        score: 15,
        diets: [1, 2, 3, 4],
      },
      {
        id: 2,
        title: "titulo-b",
        score: 12,
        image: "imagen",
        diets: [1, 2, 3, 4],
      },
    ];
    const result1 = rootReducer(state, orderByName("1", data));
    const result2 = rootReducer(state, orderByName("2", dataOrder));

    expect(result1).not.toEqual(state);
    expect(result1).toEqual({
      recipes: dataOrder,
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: {},
    });

    expect(result2).not.toEqual(state);
    expect(result2).toEqual({
      recipes: data,
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: {},
    });
  });

  it('Debería cambiar nuestro recipes store cuando action type es "ORDER_BY_SCORE"', () => {
    const dataOrder = [
      {
        id: 1,
        title: "titulo-a",
        image: "imagen",
        score: 15,
        diets: [1, 2, 3, 4],
      },
      {
        id: 2,
        title: "titulo-b",
        score: 12,
        image: "imagen",
        diets: [1, 2, 3, 4],
      },
    ];
    const result1 = rootReducer(state, orderByScore("1", data));
    const result2 = rootReducer(state, orderByScore("2", dataOrder));

    expect(result1).not.toEqual(state);
    expect(result1).toEqual({
      recipes: dataOrder,
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: {},
    });

    expect(result2).not.toEqual(state);
    expect(result2).toEqual({
      recipes: data,
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: {},
    });
  });

  it('Debería cambiar nuestro recipes store cuando action type es "ORDER_BY_DIET"', () => {
    const data = [
      {
        id: 1,
        title: "titulo-a",
        image: "imagen",
        score: 15,
        diets: ["vegan", "vegetarian"],
      },
      {
        id: 2,
        title: "titulo-b",
        score: 12,
        image: "imagen",
        diets: ["gluten free"],
      },
    ];
    const result1 = rootReducer(state, orderByDiet("gluten free", data));

    expect(result1).not.toEqual(state);
    expect(result1).toEqual({
      recipes: [data[1]],
      copyRecipes: [],
      recipesDetail: {},
      types: [],
      createUser: {},
    });
  });
});
