import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ReducerState } from "../../models";
import {
  clearDetail,
  getDetailRecipeAPI,
  getDetailRecipeDB
} from "../../redux/actions";
import style from "./CardDetails.module.css";

function CardDetail() {
  const [load, setLoad] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipesDetail = useSelector(
    (state: ReducerState) => state.recipesDetail
  );

  useEffect(() => {
    window.scroll(0, 0);
    if (id) {
      const validacion = /^[0-9]+$/;
      id.match(validacion)
        ? dispatch(getDetailRecipeAPI(id))
        : dispatch(getDetailRecipeDB(id));
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoad(true), 8000);

    return () => {
      clearTimeout(timer);
      dispatch(clearDetail());
    };
  }, []);

  return (
    <div>
      {recipesDetail ? (
        <div className={style.card}>
          {recipesDetail.error ? (
            <h1>Recipe with ID {id} not found </h1>
          ) : recipesDetail.title ? (
            <>
              <h1>
                {recipesDetail.title[0].toUpperCase() +
                  recipesDetail.title.slice(1)}
              </h1>
              <div className={style.firtsPart}>
                <img src={recipesDetail.image} alt="Not found" />
                <div className={style.scores}>
                  <p>
                    <b>Score:</b> {recipesDetail.score}⭐
                  </p>
                  <p>
                    <b>HealtScore:</b> {recipesDetail.healthScore}🌿
                  </p>
                  <p>
                    <b>Type of Diet:</b>
                  </p>
                  <ul>
                    {recipesDetail.diets.map((diet, index) => (
                      <li key={index}>{diet}</li>
                    ))}
                  </ul>
                  <p>
                    <b>Type of Dish:</b>
                  </p>
                  <ul>
                    {recipesDetail.dishes &&
                      recipesDetail.dishes.map((dish, index) => (
                        <li key={index}>{dish}</li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className={style.secondPart}>
                <hr />
                <h2>Summary:</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: recipesDetail.summary }}
                />
                <hr />
                <h2>Steps:</h2>
                <p dangerouslySetInnerHTML={{ __html: recipesDetail.steps }} />
              </div>
            </>
          ) : load ? (
            <h1>No se ha encontrado la receta con ID {id}</h1>
          ) : (
            <div className={style.load}></div>
          )}
        </div>
      ) : (
        <div className={style.load}></div>
      )}
    </div>
  );
}

export default CardDetail;
