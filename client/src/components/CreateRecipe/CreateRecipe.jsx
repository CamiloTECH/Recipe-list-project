import style from "./Createrecipe.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getTypesDiet } from "../../redux/actions"
import {Link } from "react-router-dom"

function CreateRecipe() {
  const diets = useSelector(store => store.types)
  const dispatch = useDispatch()

  useEffect(() => {
    if (diets.length === 0) dispatch(getTypesDiet())
    // eslint-disable-next-line
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className={style.form} >
      <h2>Create a new recipe</h2>
      <div className={style.data}>
        <label htmlFor="title">Name</label>
        <input type="text" name="title" id="title" placeholder="Enter the name" autoFocus />

        <label htmlFor="score">Score</label>
        <input type="number" name="score" id="score" placeholder="Enter the score" />

        <label htmlFor="healthScore">Health Score</label>
        <input type="number" name="healthScore" id="healthScore" placeholder="Enter the health score" />

        <label htmlFor="image">Image</label>
        <input type="url" name="image" id="image" placeholder="Enter the image by url" />
      </div>

      <div className={style.image}>
        <img src="https://img.freepik.com/vector-gratis/comida-sana-dibujos-animados-mesa_18591-24549.jpg?size=626&ext=jpg" alt="comida" />
      </div>

      <div className={style.large}>
        <label htmlFor="summary">Summary</label>
        <textarea name="summary" placeholder="Enter the summary" rows={5}></textarea>

        <label htmlFor="steps">Steps</label>
        <textarea name="steps" placeholder="Enter the steps" rows={5}></textarea>
      </div>

      <div className={style.diets}>
        <label htmlFor="" className={style.title}>Diets</label>
        {
          diets.length > 0 && diets.map(diet => (
            <div className={style.diet}>
              < input type="checkbox" name="diets" id={diet.id} />
              <label htmlFor="diets">{diet.name}</label>
            </div>
          ))
        }
      </div>
      <div className={style.buttons}>
        <input type="submit" value="Create" className={style.submit} />
        <Link to="/home" className={style.link}>Home</Link>
      </div>
    </form>
  );
}

export default CreateRecipe;