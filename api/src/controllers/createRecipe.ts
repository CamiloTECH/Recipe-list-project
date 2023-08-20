import { Recipes } from "../models/index";

import { Request, Response } from "express";

const createRecipe = async (req: Request, res: Response) => {
  try {
    const { title, diets, summary, score, healthScore, steps, image } =
      req.body;

    if (
      title &&
      diets?.length > 0 &&
      summary &&
      score &&
      healthScore &&
      steps &&
      image
    ) {
      const [recipe, created] = await Recipes.findOrCreate({
        where: { title: title.toLowerCase() },
        defaults: {
          title: title.toLowerCase(),
          score,
          healthScore,
          steps,
          image,
          summary,
        },
      });
      if (created) {
        await recipe.$add("diets", diets);
        return res.json({ id: recipe.id });
      } else {
        return res.status(400).json({ error: "This recipe already exists" });
      }
    }
    throw Error;
  } catch {
    res.status(400).json({ error: "You must enter the complete data" });
  }
};

export default createRecipe;
