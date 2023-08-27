import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { ReducerState } from "../../models";
import {
  clearDetail,
  getDetailRecipeAPI,
  getDetailRecipeDB
} from "../../redux/actions";
import Loading from "../Loading";
import style from "./CardDetails.module.css";

function CardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const recipesDetail = useSelector(
    (state: ReducerState) => state.recipesDetail
  );

  useEffect(() => {
    window.scroll(0, 0);
    if (id) {
      setLoading(true);
      id.match(/^[0-9]+$/)
        ? dispatch(getDetailRecipeAPI(id)).finally(() => setLoading(false))
        : dispatch(getDetailRecipeDB(id)).finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearDetail());
    };
  }, []);

  return (
    <div className={loading ? style.contentLoad : undefined}>
      {loading ? (
        <Loading />
      ) : recipesDetail ? (
        <div className={style.card}>
          {recipesDetail.error ? (
            <h1>Recipe with ID {id} not found </h1>
          ) : (
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
          )}
        </div>
      ) : (
        <h1>Recipe with ID {id} not found </h1>
      )}
    </div>
  );
}

export default CardDetail;
