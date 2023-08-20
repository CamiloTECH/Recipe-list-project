import {
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
  Default,
} from "sequelize-typescript";
import { RecipeDiets } from "./RecipeDiets";
import { Diets } from "./Diets";

interface Recipe {
  id?: string;
  title: string;
  summary: string;
  score: number;
  healthScore: number;
  steps: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({ timestamps: false })
export class Recipes extends Model<Recipe> {
  @PrimaryKey
  @AllowNull(false)
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  summary!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  score!: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  healthScore!: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  steps!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  image!: string;

  @BelongsToMany(() => Diets, () => RecipeDiets)
  diets!: Array<Diets & { recipeDiets: RecipeDiets }>;
}
