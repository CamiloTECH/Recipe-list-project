import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const { URL_API, API_KEY } = process.env;

//Optener una receta con un ID pasado por params
const getDetailRecipeAPI = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { data } = await axios.get(
      `${URL_API}/${id}/information?apiKey=${API_KEY}`
    );

    const diets = [...data.diets];
    if (data.vegetarian && !diets.includes("vegetarian")) {
      diets.push("vegetarian");
    }
    if (data.vegan && !diets.includes("vegan")) {
      diets.push("vegan");
    }
    if (data.glutenFree && !diets.includes("gluten free")) {
      diets.push("gluten free");
    }
    if (data.dairyFree && !diets.includes("dairy free")) {
      diets.push("dairy free");
    }

    return res.json({
      id,
      title: data.title,
      summary: data.summary,
      score: data.weightWatcherSmartPoints,
      healthScore: data.healthScore,
      diets,
      dishes: data.dishTypes,
      steps: data.instructions,
      image: data.image,
    });
  } catch {
    res.status(404).json({ error: `Recipe with ID ${id} not found` });
  }
};
export default getDetailRecipeAPI;
