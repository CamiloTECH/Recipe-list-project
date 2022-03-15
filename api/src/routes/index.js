const { Router } = require("express");
const { createRecipe, getNameRecipe, getIdRecipe, getTypes,getAllRecipe } = require("../controllers/index")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/",getAllRecipe)
router.get("/recipes",getNameRecipe)
router.get("/recipes/:id",getIdRecipe)
router.get("/types",getTypes)
// router.post("/recipe",createRecipe );

module.exports = router;
