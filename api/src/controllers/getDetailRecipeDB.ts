import { formatDiets } from "../helpers/formatRecipes";
import { Recipes, Diets } from "../models/index";
import { Request, Response } from "express";

//Optener una receta de la base de datos con un ID pasado por params
const getDetailRecipeDB = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (id) {
      const detailRecipe = await Recipes.findByPk(id, {
        attributes: [
          "id",
          "title",
          "summary",
          "score",
          "healthScore",
          "steps",
          "image",
        ],
        include: {
          model: Diets,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      if (detailRecipe) {
        const formatDetailRecipe = {
          id: detailRecipe.id,
          title: detailRecipe.title,
          score: detailRecipe.score,
          steps: detailRecipe.steps,
          image: detailRecipe.image,
          summary: detailRecipe.summary,
          healthScore: detailRecipe.healthScore,
          diets: formatDiets(detailRecipe.diets),
        };
        return res.json(formatDetailRecipe);
      }
    }
    throw Error;
  } catch {
    res.status(404).json({ error: `Recipe with ID ${id} not found` });
  }
};

export default getDetailRecipeDB;
