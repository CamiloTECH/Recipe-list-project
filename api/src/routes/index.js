const {
  createRecipe,
  getNameRecipe,
  getIdRecipeAPI,
  getTypes,
  getAllRecipe,
  getIdRecipeDb,
} = require("../controllers/index");
const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", getAllRecipe);
router.get("/recipes", getNameRecipe);
router.get("/recipes/:id", getIdRecipeAPI);
router.get("/recipes/db/:id", getIdRecipeDb);
router.get("/types", getTypes);
router.post("/recipes", createRecipe);

module.exports = router;
