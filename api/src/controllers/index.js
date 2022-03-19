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
      //Agregar los tipos de dietas que no tenga la propiedad Diets de la API
      if (recipe.vegetarian && !recipe.diets.includes("vegetarian"))
        recipe.diets.push("vegetarian");
      if (recipe.vegan && !recipe.diets.includes("vegan"))
        recipe.diets.push("vegan");
      if (recipe.glutenFree && !recipe.diets.includes("gluten free"))
        recipe.diets.push("gluten free");

      //Retorno de los valores necesarios para ser mostrados por el front
      return {
        id: recipe.id,
        title: recipe.title,
        score: recipe.spoonacularScore,
        diets: recipe.diets,
        image: recipe.image,
      };
    });
    return recipes;
  } catch (error) {
    //Si hay un error enviar un array vacio para que pueda ser tratado por las otras funciones
    return [];
  }
};

//Optener todas las recetas de la API y la DB
const getAllRecipe = async (req, res) => {
  let recipes = await getData();

  //Traer toda la informacion de los datos de la DB
  const dataDB = await Recipe.findAll({
    attributes: ["id", "image", "title", "score"],
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  //Insertar los datos que retorno la DB a el resultado de la consulta a la API
  dataDB.forEach((recipe) => recipes.push(recipe.dataValues));

  recipes.length > 0
    ? res.json(recipes)
    : res.json([{ error: "No se encontraron recetas" }]);
};

//Optener una receta con un ID pasado por params
const getIdRecipeAPI = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${Api_key}`
    );
    let datos = response.data;
    //Enviar la informacion necesaria para ser mostrada por el Front
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
    res.json({ error: err.message });
  }
};

//Optener todas las recetas que contengna una palabra en su titulo, la palabra es pasada por query
const getNameRecipe = async (req, res) => {
  const { name } = req.query;

  if (name) {
    let response = await getData();

    const dataDB = await Recipe.findAll({
      attributes: ["id", "image", "title", "score"],
      where: { title: { [Op.substring]: name } },
      include: {
        model: Diet,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    //Filtrar los datos de la respuesta de la API para obtener solo los que contengan el nombre
    let recipes = response.filter((recipe) =>
      recipe.title.toLowerCase().includes(name.toLowerCase())
    );
    //Insertar los datos de la DB a el resultado del filter
    dataDB.forEach((recipe) => recipes.push(recipe.dataValues));

    recipes.length > 0
      ? res.json(recipes)
      : res.json([{ error: "No se encontraron recetas" }]);
  } else {
    res.json([{ error: "No hay parametro de busqueda" }]);
  }
};

//Optener todos los tipos de dietas y guardarlas en la DB
const getTypes = async (req, res) => {
  let types = [];
  const typeDietsDB = await Diet.findAll({ attributes: ["id", "name"] });

  //Pregunta si la consulta a la base de datos dio algun resultado,
  //si da algun resultado es porque ya estan las dietas en la Db en caso ccontrario toca crearlas
  if (typeDietsDB.length === 0) {
    const recipes = await getData();
    let typesAPI = [];
    //Agregar todos los tipos de dietas a el array types
    recipes.forEach((recipe) => typesAPI.push(...recipe.diets));
    //Setear el array para obtener solo las dietas unicas
    typesAPI = new Set(typesAPI);
    //Convertir el valor de Set a un array valido
    typesAPI = Array.from(typesAPI);
    //Crear estos tipos de dietas en la DB y la incluye en el array
    for (const type of typesAPI) {
      let data = await Diet.create({ name: type });
      types.push({
        id: data.dataValues.id,
        name: data.dataValues.name,
      });
    }
  } else {
    typeDietsDB.forEach((typeDB) => types.push(typeDB.dataValues));
  }

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
