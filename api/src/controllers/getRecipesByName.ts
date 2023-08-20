import { Recipes, Diets } from "../models/index";
import { Request, Response } from "express";
import { Op } from "sequelize";
import getData from "../helpers/getData";
import { formatRecipes } from "../helpers/formatRecipes";

//Optener todas las recetas que contengna una palabra en su titulo, la palabra es pasada por query
const getRecipesByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    if (name && typeof name === "string") {
      const recipesAPI = await getData();

      const recipesDB = await Recipes.findAll({
        attributes: ["id", "image", "title", "score"],
        where: { title: { [Op.substring]: name.toLowerCase() } },
        include: {
          model: Diets,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      const formatFilterRecipes = formatRecipes(recipesDB);
      const recipesAPIFilter = recipesAPI.filter(({ title }) => {
        return title.toLowerCase().includes(name.toLowerCase());
      });

      const allFilterRecipes = [...recipesAPIFilter, ...formatFilterRecipes];

      if (allFilterRecipes.length > 0) {
        return res.json(allFilterRecipes);
      }
    }
    throw Error;
  } catch {
    res.status(404).json([{ error: "No recipes found" }]);
  }
};

export default getRecipesByName;
