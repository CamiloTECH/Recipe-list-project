import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const { URL_API, API_KEY } = process.env;

interface Recipe {
  id: number;
  title: string;
  weightWatcherSmartPoints: number;
  diets: string[];
  image: string;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
}
interface RecipeResponse {
  id: number;
  title: string;
  score: number;
  diets: string[];
  image: string;
}
//Optener todas las 100 recetas de la API
const getData = async () => {
  try {
    const { data } = await axios.get(
      `${URL_API}/complexSearch?number=5&addRecipeInformation=true&apiKey=${API_KEY}`
    );

    const recipes: RecipeResponse[] = data.results.map((recipe: Recipe) => {
      const diets = [...recipe.diets];

      if (recipe.vegetarian && !diets.includes("vegetarian")) {
        diets.push("vegetarian");
      }
      if (recipe.vegan && !diets.includes("vegan")) {
        diets.push("vegan");
      }
      if (recipe.glutenFree && !diets.includes("gluten free")) {
        diets.push("gluten free");
      }
      if (recipe.dairyFree && !diets.includes("dairy free")) {
        diets.push("dairy free");
      }

      return {
        id: recipe.id,
        title: recipe.title,
        score: recipe.weightWatcherSmartPoints,
        diets,
        image: recipe.image,
      };
    });
    return recipes;
  } catch {
    return [];
  }
};

export default getData;
