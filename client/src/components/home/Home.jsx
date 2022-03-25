import Cards from "../Cards/Cards";
import style from "./Home.module.css"
import { getAllrecipes } from "../../redux/actions"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

function Home() {
  const recipes = useSelector(store => store.recipes)
  const dispatch = useDispatch()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (recipes.length === 0) dispatch(getAllrecipes())
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setLoad(false)
    window.scroll(0, 0)
    const timer = setTimeout(() => setLoad(true), 8000)

    return () => clearTimeout(timer)
    // eslint-disable-next-line
  }, [recipes])
  return (
    <>
      {
        recipes.length > 0
          ? recipes[0].error
            ? <div className={style.home}> <h2>{recipes[0].error}</h2> </div>
            : <Cards recipes={recipes} />
          : load
            ? <div className={style.home}> <h2>No se encontraron recetas</h2> </div>
            : <div className={style.home}> <div className={style.load}></div> </div>
      }

    </>
  );
}

export default Home;