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
        recipesDetail.error ? (
          <h1>Recipe with ID {id} not found </h1>
        ) : (
          <div className={style.card}>
            <div>
              <div>
                <h1>{recipesDetail.title}</h1>
                <div>
                  <p
                    dangerouslySetInnerHTML={{ __html: recipesDetail.summary }}
                  />
                </div>
                <p>
                  <b>Score:</b> {recipesDetail.score}⭐
                </p>
                <p>
                  <b>HealtScore:</b> {recipesDetail.healthScore}🌿
                </p>
              </div>
              <img src={recipesDetail.image} alt="Not found" />
            </div>
            <div>
              <div>
                <div>
                  <p>Type of Diet:</p>
                  <ul>
                    {recipesDetail.diets.map((diet, index) => (
                      <li key={index}>{diet}</li>
                    ))}
                  </ul>
                </div>
                {recipesDetail.dishes && (
                  <div>
                    <p>Type of Dish:</p>
                    <ul>
                      {recipesDetail.dishes.map((dish, index) => (
                        <li key={index}>{dish}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <h2>Steps:</h2>
                <p dangerouslySetInnerHTML={{ __html: recipesDetail.steps }} />
              </div>
            </div>
          </div>
        )
      ) : (
        <h1>Recipe with ID {id} not found </h1>
      )}
    </div>
  );
}

export default CardDetail;
