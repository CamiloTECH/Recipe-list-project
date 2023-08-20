import { Sequelize } from "sequelize-typescript";
import * as models from "./models/index";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, PASSWORD, USER_NAME, DATABASE_URL } = process.env;

export const sequelize = DATABASE_URL
  ? new Sequelize(DATABASE_URL, {
      storage: ":memory:",
      models: Object.values(models),
      logging: false,
      native: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    })
  : new Sequelize({
      dialect: "postgres",
      database: DB_NAME,
      password: PASSWORD,
      username: USER_NAME,
      storage: ":memory:",
      models: Object.values(models),
    });
