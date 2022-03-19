import style from "./CardDetails.module.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getRecipeDetailAPI, getRecipeDetailDB } from "../../redux/actions"

function CardDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const recipesDetail = useSelector(state => state.recipesDetail)

  useEffect(() => {
    const validacion = /^[0-9]+$/
    if (id.match(validacion)) {
      dispatch(getRecipeDetailAPI(id))
    }
    else {
      dispatch(getRecipeDetailDB(id))
    }
  }, [])
  // title: datos.title,
  // image: datos.image,
  // summary: datos.summary,
  // steps: datos.instructions,
  // error: err.message 
  // score: datos.spoonacularScore,
  // healthScore: datos.healthScore,
  // diets: datos.diets,
  console.log(recipesDetail)
  return (
    <>
      {
        recipesDetail.error ? <h1>No se ha encontrado la receta con ID {id}, {recipesDetail.error}</h1>
          : recipesDetail.title ? (
            <div>
              <img src={recipesDetail.image} alt="Not found" />
              <h1>{recipesDetail.title}</h1>
              <p>{recipesDetail.score}</p>
              <p>{recipesDetail.healthScore}</p>
              <p>{recipesDetail.summary}</p>
              <p>{recipesDetail.steps}</p>
              <ul>
                {recipesDetail.diets.map((diet, index) => (
                  <li key={index}>{diet}</li>
                ))}
              </ul>
            </div>
          )
            : <div className={style.load}></div>
      }
    </>
  );
}

export default CardDetail;