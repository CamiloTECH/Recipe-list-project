import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReducerState } from "../../models";
import {
  clearFilters,
  clearRecipes,
  getAllRecipes,
  getDiets,
  getRecipesByName,
  orderByDiets,
  orderByName,
  orderByScore
} from "../../redux/actions";
import style from "./SearchBar.module.css";

function Search() {
  const dispatch = useDispatch();
  const types = useSelector((store: ReducerState) => store.types);
  const recipes = useSelector((store: ReducerState) => store.recipes);
  const copyRecipes = useSelector((store: ReducerState) => store.copyRecipes);
  const [filters, setFilters] = useState({
    diet: "none",
    score: "none",
    searchName: "",
    alphabetical: "none"
  });

  const handleFilters = (
    event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const filtersValue = { ...filters, [name]: value };

    if (name === "diet") {
      dispatch(orderByDiets(value, copyRecipes));
    } else if (name === "score") {
      dispatch(orderByScore(value, recipes));
      filtersValue.alphabetical = "none";
    } else if (name === "alphabetical") {
      dispatch(orderByName(value, recipes));
      filtersValue.score = "none";
    }
    setFilters(filtersValue);
  };

  const handleButtonSearch = () => {
    const searchName = filters.searchName.trim();
    if (searchName) {
      dispatch(clearRecipes());
      dispatch(getRecipesByName(searchName));
      setFilters({
        ...filters,
        alphabetical: "none",
        score: "none",
        diet: "none"
      });
    }
  };

  const clearAllFilters = () => {
    dispatch(clearFilters(copyRecipes));
    setFilters({
      diet: "none",
      score: "none",
      searchName: "",
      alphabetical: "none"
    });
  };

  const allRecipes = () => {
    if (recipes.length < 40 && copyRecipes.length >= 40) {
      setFilters({
        ...filters,
        alphabetical: "none",
        score: "none",
        diet: "none"
      });
      dispatch(clearFilters(copyRecipes));
    } else if (recipes.length < 40 && copyRecipes.length < 40) {
      dispatch(clearRecipes());
      dispatch(getAllRecipes());
      setFilters({
        diet: "none",
        score: "none",
        searchName: "",
        alphabetical: "none"
      });
    }
  };

  useEffect(() => {
    if (types.length === 0) {
      dispatch(getDiets());
    }
  }, []);

  return (
    <div>
      <header className={style.header}>
        <div className={style.search}>
          <input
            type="text"
            name="searchName"
            onChange={handleFilters}
            value={filters.searchName}
            placeholder="Search by name"
            disabled={recipes.length === 0 || !!recipes[0].error}
          />
          <button
            onClick={handleButtonSearch}
            disabled={
              filters.searchName.trim().length === 0 ||
              recipes.length === 0 ||
              !!recipes[0].error
            }
          >
            Search
          </button>
        </div>

        <div className={style.option}>
          <select
            name="alphabetical"
            value={filters.alphabetical}
            onChange={handleFilters}
            disabled={recipes.length === 0 || !!recipes[0].error}
          >
            <option value="none" disabled>
              Alphabetical order
            </option>
            <option value="asc">A-Z</option>
            <option value="des">Z-A</option>
          </select>

          <select
            name="score"
            value={filters.score}
            onChange={handleFilters}
            disabled={recipes.length === 0 || !!recipes[0].error}
          >
            <option value="none" disabled>
              Order by score
            </option>
            <option value="asc">Higher to Lower</option>
            <option value="des">Lower to Higher</option>
          </select>

          <select
            name="diet"
            value={filters.diet}
            onChange={handleFilters}
            disabled={recipes.length === 0 || !!recipes[0].error}
          >
            <option value="none" disabled>
              Order by type diet
            </option>
            {types.length > 0 &&
              types.map(type => (
                <option value={type.name} key={type.id}>
                  {type.name}
                </option>
              ))}
          </select>

          <button onClick={clearAllFilters}>Clean Filters</button>
        </div>
        <div className={style.All}>
          <button onClick={allRecipes}>All Recipes</button>
        </div>
      </header>
    </div>
  );
}

export default Search;
