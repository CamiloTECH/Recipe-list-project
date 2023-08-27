import { RecipeForm } from ".";

const validateNumber = /^[0-9]+$/;
const validateString =
  /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]([a-zA-ZñÑáéíóúÁÉÍÓÚ, ]*)[a-zA-ZñÑáéíóúÁÉÍÓÚ]$/;
const validateURL = /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/;

export const validateRecipe = (value: string | string[], section: string) => {
  if (typeof value === "string") {
    if (section === "title" || section === "summary" || section === "steps") {
      if (value.length >= 4 && validateString.test(value)) {
        return false;
      }
      return true;
    } else if (section === "score" || section === "healthScore") {
      const parseValue = parseInt(value);
      if (parseValue >= 1 && parseValue <= 100 && validateNumber.test(value)) {
        return false;
      }
      return true;
    } else {
      return !validateURL.test(value);
    }
  } else {
    return value.length === 0;
  }
};

interface Errors {
  title: boolean;
  score: boolean;
  healthScore: boolean;
  image: boolean;
  summary: boolean;
  steps: boolean;
  diets: boolean;
}

export const validateSubmit = (errors: Errors, recipe: RecipeForm) => {
  for (const key in recipe) {
    if (key === "diets") {
      if (recipe[key].length > 0 && !errors[key]) {
        continue;
      }
      return true;
    } else {
      if (recipe[key as keyof RecipeForm] && !errors[key as keyof Errors]) {
        continue;
      }
      return true;
    }
  }
  return false;
};
