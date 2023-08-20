import { Recipes } from "../models";

export const formatDiets = (diets: { name: string }[]) => {
  return diets.map(({ name }) => name);
};

export const formatRecipes = (recipesDB: Recipes[]) => {
  const newRecipesDB = recipesDB.map(({ id, title, image, score, diets }) => {
    return {
      id,
      title,
      image,
      score,
      diets: formatDiets(diets),
    };
  });
  return newRecipesDB;
};
