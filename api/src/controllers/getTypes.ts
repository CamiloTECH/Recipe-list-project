import getData from "../helpers/getData";
import { Diets } from "../models/index";

import { Request, Response } from "express";

//Optener todos los tipos de dietas y guardarlas en la DB
const getTypes = async (req: Request, res: Response) => {
  try {
    const typeDietsDB = await Diets.findAll({ attributes: ["id", "name"] });

    if (typeDietsDB.length === 0) {
      const allRecipes = await getData();
      const typesAPI: string[] = [];
      allRecipes.forEach(({ diets }) => typesAPI.push(...diets));

      const uniqueTypes = new Set(typesAPI);
      const resultTypes = Array.from(uniqueTypes, (diet) => {
        return { name: diet };
      });
      const dietsCreated = await Diets.bulkCreate(resultTypes);
      return res.json(dietsCreated);
    } else {
      return res.json(typeDietsDB);
    }
  } catch {
    res.json([]);
  }
};

export default getTypes;
