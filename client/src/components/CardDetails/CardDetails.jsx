import style from "./CardDetails.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getRecipeDetailAPI, getRecipeDetailDB, clearComponentDetail } from "../../redux/actions"

function CardDetail() {
  const [load, setLoad] = useState(false)
  const { id } = useParams()
  const dispatch = useDispatch()
  const recipesDetail = useSelector(state => state.recipesDetail)

  useEffect(() => {
    const timer = setTimeout(() => (
      setLoad(true)
    ), 8000)
    window.scroll(0, 0)

    const validacion = /^[0-9]+$/
    if (id.match(validacion)) {
      dispatch(getRecipeDetailAPI(id))
    }
    else {
      dispatch(getRecipeDetailDB(id))
    }

    return () => {
      clearTimeout(timer);
      dispatch(clearComponentDetail())
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={style.card}>
      {
        recipesDetail.error ? <h1>No se ha encontrado la receta con ID {id}</h1>
          : recipesDetail.title ? (
            <>
              <h1>{recipesDetail.title}</h1>
              <div className={style.firtsPart}>
                <img src={recipesDetail.image} alt="Not found" />
                <div className={style.scores}>
                  <p><b>Score:</b> {recipesDetail.score}⭐</p>
                  <p><b>HealtScore:</b> {recipesDetail.healthScore}🌿</p>
                  <p><b>Type of Diet:</b></p>
                  <ul>
                    {recipesDetail.diets.map((diet, index) => (
                      <li key={index}>{diet}</li>
                    ))}
                  </ul>
                  <p><b>Type of Dish:</b></p>
                  <ul>
                    {recipesDetail.dishes && recipesDetail.dishes.map((dish, index) => (
                      <li key={index}>{dish}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={style.secondPart}>
                <hr />
                <h2>Summary:</h2>
                <p dangerouslySetInnerHTML={{ __html: recipesDetail.summary }} />
                <hr />
                <h2>Steps:</h2>
                <p dangerouslySetInnerHTML={{ __html: recipesDetail.steps }} />
              </div>
            </>
          )
            : load ? <h1>No se ha encontrado la receta con ID {id}</h1> : <div className={style.load}></div>
      }
    </div>
  )
}

export default CardDetail;