import DOMPurify from "dompurify";
import { Parser } from "html-to-react";
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

const parser = Parser();

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
            <div className={style.headerInfo}>
              <div className={style.contentGeneraInfo}>
                <h1 className={style.title}>{recipesDetail.title}</h1>
                <div className={style.dataHealth}>
                  <div className={style.scores}>
                    <span className={style.scoresTitle}>Score:</span>{" "}
                    {recipesDetail.score}⭐
                  </div>
                  <div className={style.scores}>
                    <span className={style.scoresTitle}>HealtScore:</span>{" "}
                    {recipesDetail.healthScore}🌿
                  </div>
                </div>
              </div>

              <div className={style.contentImage}>
                <img
                  className={style.image}
                  src={recipesDetail.image}
                  alt="Not found"
                />
              </div>
            </div>

            <div className={style.contentAllInfo}>
              <div className={style.contentTypes}>
                <div className={style.typesDiet}>
                  <span className={style.titleType}>Type of Diet</span>
                  <ul className={style.listTypes}>
                    {recipesDetail.diets.map((diet, index) => (
                      <li key={index} className={style.listItem}>
                        {diet}
                      </li>
                    ))}
                  </ul>
                </div>
                {recipesDetail.dishes && (
                  <div className={style.typesDish}>
                    <span className={style.titleType}>Type of Dish</span>
                    <ul className={style.listTypes}>
                      {recipesDetail.dishes.map((dish, index) => (
                        <li key={index} className={style.listItem}>
                          {dish}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className={style.contentMainInfo}>
                <div className={style.summary}>
                  <h2 className={style.titleSummary}>Summary:</h2>
                  <div className={style.contentSummary}>
                    {parser.parse(
                      DOMPurify.sanitize(recipesDetail.summary, {
                        ADD_ATTR: ["target"]
                      })
                    )}
                  </div>
                </div>
                <div className={style.steps}>
                  <h2 className={style.titleSteps}>Steps:</h2>
                  <div className={style.contentSteps}>
                    {parser.parse(
                      DOMPurify.sanitize(recipesDetail.steps, {
                        ADD_ATTR: ["target"]
                      })
                    )}
                  </div>
                </div>
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
