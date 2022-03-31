import Cards from "../Cards/Cards";
import style from "./Home.module.css"
import { getAllrecipes } from "../../redux/actions"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import linkedin from "../../img/linkedin.png"
import github from "../../img/github.png"

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
    const timer = setTimeout(() => setLoad(true), 10000)

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
            ? <div className={style.home}> <h2>No recipes found</h2> </div>
            : <div className={style.home}> <div className={style.load}></div> </div>
      }
      <footer>
        <p>&copy;2022 Camilo Montoya</p>
        <div className={style.info}>
          <a href="https://www.linkedin.com/in/camilomontoya-fullstackdev" target="_blank" rel="noreferrer">
            <img src={linkedin} alt="Linkedln" />
          </a>
          <a href="https://github.com/CamiloTECH/Recipe-list-project" target="_blank" rel="noreferrer">
            <img src={github} alt="gitHub" />
          </a>
        </div>
      </footer>
    </>
  );
}

export default Home;