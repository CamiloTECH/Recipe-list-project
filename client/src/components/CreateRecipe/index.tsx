import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { ReducerState } from "../../models";
import {
  clearUser,
  createRecipe,
  getAllRecipes,
  getDiets
} from "../../redux/actions";
import Loading from "../Loading";
import style from "./CreateRecipe.module.css";
import { validateRecipe, validateSubmit } from "./validateRecipe";

export interface RecipeForm {
  title: string;
  score: number;
  healthScore: number;
  image: string;
  summary: string;
  steps: string;
  diets: string[];
}

function CreateRecipe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const diets = useSelector((store: ReducerState) => store.types);
  const [activeSubmit, setActiveSubmit] = useState(true);
  const [error, setError] = useState({
    title: false,
    score: false,
    healthScore: false,
    image: false,
    summary: false,
    steps: false,
    diets: false
  });
  const [recipe, setRecipe] = useState<RecipeForm>({
    title: "",
    score: 1,
    healthScore: 1,
    image: "",
    summary: "",
    steps: "",
    diets: []
  });

  useEffect(() => {
    if (diets.length === 0) {
      dispatch(getDiets());
    }

    return () => {
      dispatch(clearUser());
    };
  }, []);

  const handleValidation = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    let newValue;
    if (name === "diets") {
      newValue = recipe.diets.includes(value)
        ? recipe.diets.filter(diet => diet !== value)
        : [...recipe.diets, value];
    }
    const finalValue = newValue || value;
    const resultValidate = validateRecipe(finalValue, name);

    const newRecipe = { ...recipe, [name]: finalValue };
    const newErrors = { ...error, [name]: resultValidate };
    setRecipe(newRecipe);
    setError(newErrors);

    const submit = validateSubmit(newErrors, newRecipe);
    setActiveSubmit(submit);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validate = validateSubmit(error, recipe);
    if (!validate) {
      setLoading(true);
      dispatch(createRecipe(recipe))
        .then(({ payload }) => {
          if (payload.id) {
            dispatch(getAllRecipes());
            navigate(`/home/details/${payload.id}`, { replace: true });
          }
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2>Create a new recipe</h2>
      <div className={style.data}>
        <div className={style.message}>
          <label htmlFor="title" className={style.name}>
            Name
          </label>
          {error.title ? (
            <label className={style.labelError}>Invalid | Enter a name</label>
          ) : null}
        </div>
        <input
          required
          id="title"
          type="text"
          name="title"
          disabled={loading}
          value={recipe.title}
          placeholder="Enter the name"
          autoFocus
          onChange={handleValidation}
          style={
            error.title
              ? { borderBottomColor: "#E8FF06", backgroundColor: "#E8FF0638" }
              : {}
          }
        />

        <div className={style.message}>
          <label htmlFor="score" className={style.name}>
            Score⭐
          </label>
          {error.score ? (
            <label className={style.labelError}>
              Invalid | Min: 1 - Max: 100
            </label>
          ) : null}
        </div>
        <input
          required
          min={1}
          max={100}
          id="score"
          name="score"
          type="number"
          disabled={loading}
          value={recipe.score}
          onChange={handleValidation}
          placeholder="Enter the score"
          style={
            error.score
              ? { borderBottomColor: "#E8FF06", backgroundColor: "#E8FF0638" }
              : {}
          }
        />

        <div className={style.message}>
          <label htmlFor="healthScore" className={style.name}>
            HealthScore🌿
          </label>
          {error.healthScore ? (
            <label className={style.labelError}>
              Invalid | Min:1 - Max:100
            </label>
          ) : null}
        </div>
        <input
          min={1}
          max={100}
          required
          type="number"
          id="healthScore"
          name="healthScore"
          disabled={loading}
          value={recipe.healthScore}
          placeholder="Enter the health score"
          style={
            error.healthScore
              ? { borderBottomColor: "#E8FF06", backgroundColor: "#E8FF0638" }
              : {}
          }
          onChange={handleValidation}
        />

        <div className={style.message}>
          <label htmlFor="image" className={style.name}>
            Image
          </label>
          {error.image ? (
            <label className={style.labelError}>Invalid | Wrong URL</label>
          ) : null}
        </div>
        <input
          required
          type="url"
          id="image"
          name="image"
          disabled={loading}
          value={recipe.image}
          placeholder="Enter the image by url"
          onChange={handleValidation}
          style={
            error.image
              ? { borderBottomColor: "#E8FF06", backgroundColor: "#E8FF0638" }
              : {}
          }
        />
      </div>

      <div className={style.image}>
        <img src={recipe.image} alt="Imagen not found" />
      </div>

      <div className={style.large}>
        <div className={style.message}>
          <label htmlFor="summary" className={style.name}>
            Summary
          </label>
          {error.summary ? (
            <label className={style.labelError}>
              Invalid | Enter a summary
            </label>
          ) : null}
        </div>
        <textarea
          rows={5}
          required
          name="summary"
          disabled={loading}
          value={recipe.summary}
          onChange={handleValidation}
          placeholder="Enter the summary"
          style={
            error.summary
              ? { borderBottomColor: "#E8FF06", backgroundColor: "#E8FF0638" }
              : {}
          }
        />

        <div className={style.message}>
          <label htmlFor="steps" className={style.name}>
            Steps
          </label>
          {error.steps ? (
            <label className={style.labelError}>
              Invalid | Enter the steps
            </label>
          ) : null}
        </div>
        <textarea
          rows={5}
          required
          name="steps"
          disabled={loading}
          value={recipe.steps}
          onChange={handleValidation}
          placeholder="Enter the steps"
          style={
            error.steps
              ? { borderBottomColor: "#E8FF06", backgroundColor: "#E8FF0638" }
              : {}
          }
        />
      </div>

      <div className={style.diets}>
        <div className={style.gridDiet}>
          <label htmlFor="" className={style.name}>
            Diets
          </label>
          {error.diets ? (
            <label className={style.labelError}>
              Invalid | Select at least one
            </label>
          ) : null}
        </div>
        {diets.length > 0 ? (
          diets.map(diet => (
            <div className={style.diet} key={diet.id}>
              <input
                name="diets"
                type="checkbox"
                value={diet.id}
                disabled={loading}
                checked={recipe.diets.includes(`${diet.id}`)}
                onChange={handleValidation}
              />
              <label htmlFor="diets">{diet.name}</label>
            </div>
          ))
        ) : (
          <div>
            <p>No hay dietas para seleccionar</p>
          </div>
        )}
      </div>
      {loading ? (
        <div className={style.contentLoad}>
          <Loading />
        </div>
      ) : (
        <div className={style.buttons}>
          <input
            type="submit"
            value="Create"
            className={activeSubmit ? style.error : style.submit}
            disabled={activeSubmit}
          />
          <Link to="/home" className={style.link}>
            Home
          </Link>
        </div>
      )}
    </form>
  );
}

export default CreateRecipe;
