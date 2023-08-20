import { formatRecipes } from "../helpers/formatRecipes";
import getData from "../helpers/getData";
import { Recipes, Diets } from "../models/index";
import { Request, Response } from "express";

//Optener todas las recetas de la API y la DB
const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipesAPI = await getData();

    const recipesDB = await Recipes.findAll({
      attributes: ["id", "image", "title", "score"],
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const formatRecipesDB = formatRecipes(recipesDB);

    const allRecipes = [...recipesAPI, ...formatRecipesDB];
    if (allRecipes.length > 0) {
      return res.json(allRecipes);
    }
    throw Error;
  } catch {
    res.json([{ error: "No recipes found" }]);
  }
};

export default getAllRecipes;
