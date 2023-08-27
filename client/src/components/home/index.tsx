import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import github from "../../img/github.png";
import linkedin from "../../img/linkedin.png";
import { ReducerState } from "../../models";
import { getAllRecipes } from "../../redux/actions";
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
    <div>
      {loading ? (
        <div className={style.home}>
          <Loading />
        </div>
      ) : recipes.length > 0 ? (
        recipes[0].error ? (
          <div className={style.home}>
            <h2>{recipes[0].error}</h2>
          </div>
        ) : (
          <Cards recipes={recipes} />
        )
      ) : (
        <div className={style.home}>
          <h2>No recipes found</h2>
        </div>
      )}
      <footer>
        <p>&copy;2022 Camilo Montoya</p>
        <div className={style.info}>
          <a
            href="https://www.linkedin.com/in/camilomontoya-fullstackdev"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="Linkedln" />
          </a>
          <a
            href="https://github.com/CamiloTECH/Recipe-list-project"
            target="_blank"
            rel="noreferrer"
          >
            <img src={github} alt="gitHub" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
