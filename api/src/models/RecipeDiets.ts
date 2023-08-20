import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Diets } from "./Diets";
import { Recipes } from "./Recipes";

interface RecipeDiet {
  recipeId: string;
  dietId: number;
}

@Table({ timestamps: false })
export class RecipeDiets extends Model<RecipeDiet> {
  @ForeignKey(() => Recipes)
  @Column(DataType.UUIDV4)
  recipeId!: string;

  @ForeignKey(() => Diets)
  @Column(DataType.INTEGER)
  dietId!: number;
}
