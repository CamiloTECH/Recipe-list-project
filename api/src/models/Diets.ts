import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
  AllowNull,
} from "sequelize-typescript";
import { RecipeDiets } from "./RecipeDiets";
import { Recipes } from "./Recipes";

interface Diet {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ timestamps: false })
export class Diets extends Model<Diet> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @BelongsToMany(() => Recipes, () => RecipeDiets)
  recipes!: Array<Recipes & { recipeDiets: RecipeDiets }>;
}
