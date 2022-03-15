require("dotenv").config();
const { Recipe, Diet } = require("../db");
const { Api_key } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");

const getData = async () => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${Api_key}`
    );
    let recipes = response.data.results.map((recipe) => {
      if (recipe.vegetarian && !recipe.diets.includes("vegetarian"))
        recipe.diets.push("vegetarian");
      if (recipe.vegan && !recipe.diets.includes("vegan"))
        recipe.diets.push("vegan");
      if (recipe.glutenFree && !recipe.diets.includes("gluten free"))
        recipe.diets.push("gluten free");

      return {
        id: recipe.id,
        title: recipe.title,
        diet: recipe.diets,
        image: recipe.image,
      };
    });
    return recipes;
  } catch (error) {
    return []
  }
};
// let data = await Recipe.create({
//   nombre:"ererre",
//   resumen:"sdsdsd",
//   puntuacion:23,
//   puntajeSaludable:34,
//   pasos:"fddffd",
//   imagen:"sddffdfd",
// });

const getAllRecipe = async (req, res) => {
  let recipes = await getData();

  const dataDB = await Recipe.findAll({
    include: Diet,
    attributes: ["imagen", "nombre"],
  });

  dataDB.forEach((recipe) => recipes.push(recipe.dataValues));
  recipes.length > 0
    ? res.json(recipes)
    : res.json({ error: "No se encontraron recetas" });
};

const getIdRecipe = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${Api_key}`
    );
    let datos = response.data;
    res.json({
      title: datos.title,
      resumen: datos.summary,
      puntaje: datos.spoonacularScore,
      puntajeSaludable: datos.healthScore,
      dieta: datos.diets,
      pasos: datos.instructions,
      imagen: datos.image,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const getNameRecipe = async (req, res) => {
  const { name } = req.query;

  if (name) {
    let response = await getData();
    const dataDB = await Recipe.findAll({
      include: Diet,
      attributes: ["imagen", "nombre"],
      where: { nombre: { [Op.substring]: name } },
    });

    let recipes = response.filter((recipe) =>
      recipe.title.toLowerCase().includes(name.toLowerCase())
    );
    dataDB.forEach((recipe) => recipes.push(recipe.dataValues));

    recipes.length > 0
      ? res.json(recipes)
      : res.json({
          error: "No se ha encontrado ninguna receta con ese nombre",
        });
  } else {
    res.json({ error: "No hay ningun parametro de busqueda" });
  }
};

const getTypes= async (req,res)=>{
  const recipes=await getData()
  let types=[]
  recipes.forEach(recipe=>types.push(...recipe.diet))
  types=new Set(types)
  types=Array.from(types)
  types.forEach(async type=>await Diet.create({nombre:type}))
  
  res.json(types)
}

// const createRecipe = async (req, res) => {
//   let { nombre, dieta, resumen, puntuacion, puntajeSaludable, pasos, imagen } = req.body;
//   let data = await Recipe.create({
//     nombre,resumen,puntuacion,puntajeSaludable,pasos,imagen,});
//   //console.log(data)
//   //await data.setDiets(dieta);

//   res.send("gracias");
// };

module.exports = {
  getAllRecipe,
  getIdRecipe,
  getNameRecipe,
  getTypes
  // createRecipe,
};
