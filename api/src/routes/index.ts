import {
  createRecipe,
  getAllRecipes,
  getDetailRecipeAPI,
  getDetailRecipeDB,
  getRecipesByName,
  getTypes,
} from "../controllers";
import { Router } from "express";

const router = Router();

router.get("/", getAllRecipes);
router.get("/recipes", getRecipesByName);
router.get("/recipes/:id", getDetailRecipeAPI);
router.get("/recipes/db/:id", getDetailRecipeDB);
router.get("/types", getTypes);
router.post("/recipes", createRecipe);

export default router;
