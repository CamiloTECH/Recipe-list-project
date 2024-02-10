import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReducerState } from "../../models";
import { getAllRecipes } from "../../redux/actions";
import { SearchBar } from "..";
import Cards from "../Cards";
import Loading from "../Loading";
import style from "./Home.module.css";

function Home() {
  const recipes = useSelector((store: ReducerState) => store.recipes);
  const loading = useSelector((store: ReducerState) => store.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scroll(0, 0);
    if (recipes.length === 0) {
      dispatch(getAllRecipes());
    }
  }, []);

  return (
    <div className={style.contentHome}>
      <div className={style.contentMain}>
        <SearchBar />

        <div className={style.home}>
          {loading ? (
            <Loading />
          ) : recipes.length > 0 ? (
            recipes[0].error ? (
              <h2 className={style.messageError}>{recipes[0].error}</h2>
            ) : (
              <Cards recipes={recipes} />
            )
          ) : (
            <h2 className={style.messageError}>No recipes</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
