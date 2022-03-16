require("dotenv").config();
const { Recipe, Diet } = require("../db");
const { Api_key } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");

//Optener todas las 100 recetas de la API
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
        diets: recipe.diets,
        image: recipe.image,
      };
    });
    return recipes;
  } catch (error) {
    return [];
  }
};

//Optener todas las recetas de la API y la DB
const getAllRecipe = async (req, res) => {
  let recipes = await getData();

  const dataDB = await Recipe.findAll({
    attributes: ["id", "image", "title"],
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  dataDB.forEach((recipe) => recipes.push(recipe.dataValues));
  recipes.length > 0
    ? res.json(recipes)
    : res.json({ error: "No se encontraron recetas" });
};

//Optener una receta con un ID pasado por params
const getIdRecipeAPI = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${Api_key}`
    );
    let datos = response.data;
    res.json({
      title: datos.title,
      summary: datos.summary,
      score: datos.spoonacularScore,
      healthScore: datos.healthScore,
      diets: datos.diets,
      steps: datos.instructions,
      image: datos.image,
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

//Optener una receta de la base de datos con un ID pasado por params
const getIdRecipeDb = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const dataDB = await Recipe.findAll({
        where: { id },
        include: {
          model: Diet,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });
      res.json(dataDB[0].dataValues);
    }
  } catch (err) {
    res.json({ error: "No se encontro la receta" });
  }
};

//Optener todas las recetas que contengna una palabra en su titulo, la palabra es pasada por query
const getNameRecipe = async (req, res) => {
  const { name } = req.query;

  if (name) {
    let response = await getData();

    const dataDB = await Recipe.findAll({
      attributes: ["id", "image", "title"],
      where: { title: { [Op.substring]: name } },
      include: {
        model: Diet,
        attributes: ["name"],
        through: { attributes: [] },
      },
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

//Optener todos los tipos de dietas y guardarlas en la DB
const getTypes = async (req, res) => {
  const recipes = await getData();
  let types = [];
  recipes.forEach((recipe) => types.push(...recipe.diets));
  types = new Set(types);
  types = Array.from(types);
  types.forEach(
    async (type) => await Diet.findOrCreate({ where: { name: type } })
  );

  res.json(types);
};

const createRecipe = async (req, res) => {
  let { title, diets, summary, score, healthScore, steps, image } = req.body;

  if (title && diets && summary && image) {
    let data = await Recipe.create({
      title,
      summary,
      score,
      healthScore,
      steps,
      image,
    });

    await data.setDiets(diets);
    res.json({ message: "Receta creada satisfactoriamente" });
  } else {
    res.json({ error: "Debes ingresar todos los datos completos" });
  }
};

module.exports = {
  getAllRecipe,
  getIdRecipeAPI,
  getNameRecipe,
  getTypes,
  getIdRecipeDb,
  createRecipe,
};
