export interface Recipe {
  id: string | number;
  title: string;
  image: string;
  score: number;
  diets: string[];
}

export interface RecipeDetail extends Recipe {
  summary: string;
  healthScore: number;
  steps: string;
  dishes?: string[];
}

export interface ReducerState {
  types: { id: number; name: string }[];
  recipes: Recipe[];
  copyRecipes: Recipe[];
  createUser: { id: string } | undefined;
  recipesDetail: RecipeDetail | undefined;
}
