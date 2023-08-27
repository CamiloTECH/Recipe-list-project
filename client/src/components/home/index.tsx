import { useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (recipes.length === 0) {
      dispatch(getAllRecipes());
    }
  }, []);

  useEffect(() => {
    setLoad(false);
    window.scroll(0, 0);
    const timer = setTimeout(() => setLoad(true), 10000);

    return () => {
      clearTimeout(timer);
    };
  }, [recipes]);
  return (
    <>
      {recipes.length > 0 ? (
        recipes[0].error ? (
          <div className={style.home}>
            {" "}
            <h2>{recipes[0].error}</h2>{" "}
          </div>
        ) : (
          <Cards recipes={recipes} />
        )
      ) : load ? (
        <div className={style.home}>
          {" "}
          <h2>No recipes found</h2>{" "}
        </div>
      ) : (
        <div className={style.home}>
          <Loading />
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
    </>
  );
}

export default Home;
