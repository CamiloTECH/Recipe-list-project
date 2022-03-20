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
    window.scroll(0,0)
    if (id.match(validacion)) {
      dispatch(getRecipeDetailAPI(id))
    }
    else {
      dispatch(getRecipeDetailDB(id))
    }
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
                  <p><b>Diet:</b></p>
                  <ul>
                    {recipesDetail.diets.map((diet, index) => (
                      <li key={index}>{diet}</li>
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
            : <div className={style.load}></div>
      }
    </div>
  )

  {/* <div className={style.firtsPart}> */ }
  {/*   <img src="https://spoonacular.com/recipeImages/660306-556x370.jpg" alt="imagen" />
        <div className={style.scores}>
          <p><b>Score:</b> 76⭐</p>
          <p><b>HealtScore:</b> 96🌿</p>
          <p><b>Diet:</b></p>
          <ul>
            <li>gluten free</li>
            <li>dairy free</li>
          </ul>
        </div>
      </div> */}
  {/* <div className={style.secondPart}>
        <hr />
        <h2>Summary:</h2>
        <p> Slow Cooker: Pork and Garbanzo Beans might be just the main course you are searching for. This gluten free and dairy free recipe serves 6 and costs <b>$2.83 per serving</b>. One serving contains <b>438 calories</b>, <b>58g of protein</b>, and <b>11g of fat</b>. A couple people made this recipe, and 22 would say it hit the spot. A mixture of onion, salt, garbanzo beans *1, and a handful of other ingredients are all it takes to make this recipe so flavorful. To use up the onion you could follow this main course with the <a href="https://spoonacular.com/recipes/candy-corn-cupcakes-63881\">Candy Corn Cupcakes</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 97%</b>. This score is outstanding. Try <a href="https://spoonacular.com/recipes/slow-cooker-pork-and-beans-568618\">Slow Cooker Pork and Beans</a>, <a href="https://spoonacular.com/recipes/slow-cooker-pork-and-beans-244959\">Slow Cooker Pork and Beans</a>, and <a href="https://spoonacular.com/recipes/slow-cooker-pork-and-beans-619424\">Slow Cooker Pork and Beans</a> for similar recipes.</p>
        <hr />
        <h2>Steps:</h2>
        <ol>
          <li>In slow cooker layer in this order: pork, then garbanzo beans, onion, pour water over all. Mix spices together and sprinkle over pork and beans. Cover. Set on low and cook for approximately 6 hours. The beans should be tender and creamy. The pork should fall very easily from the bone. The pork can be either shredded for cubed for your preference. *3</li>
          <li>Serving Suggestion: Scoop about 1 cup of beans with broth into a soup bowl. Top with shredded pork. Add 1/4 of an avocado sliced, top with chopped fresh cilantro.</li>
          <li>NOTES:</li>
          <li>*1 The beans do not need to be soaked before adding to the slow cooker. They will be perfectly soft and creamy without pre-soaking.</li>
          <li>*2 Substitute the water for: 2 cups water and 1 bottle of good quality dark beer like Negra Modelo. You can also substitute the water for chicken stock or pork stock. Each of these substitutions will add an extra dimension of flavor.</li>
          <li>*3 If you want to shred the pork, it is easiest to do when the pork is hot. Use two forks to pull the pork apart and shred. If you want to slice the pork (like for sandwiches) it is best to do when the pork is cold. Let the pork rest in the refrigerator for several hours or over night. Slice with a serrated knife or a very sharp chef knife.</li>
          </ol>
          <hr />
    </div>*/}


}

export default CardDetail;