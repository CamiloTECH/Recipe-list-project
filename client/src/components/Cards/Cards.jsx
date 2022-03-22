import style from "./Cards.module.css"
import Card from "../Card/Card";
import { getAllrecipes } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";

function Cards() {
  const [load, setLoad] = useState(false)
  const dispatch = useDispatch()
  const recipes = useSelector(store => store.recipes)
  useEffect(() => {
    const timer = setTimeout(() => (
      setLoad(true)
    ), 4000)
    if (recipes.length === 0) dispatch(getAllrecipes())
    
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [])


  return (
    <>
      {
        recipes.length > 0
          ? recipes[0].error
            ? <h2>{recipes[0].error}</h2>
            : recipes.map(recipe => (
              <Card diets={recipe.diets}
                id={recipe.id}
                image={recipe.image}
                title={recipe.title}
                key={recipe.id} />
            ))
          : load ? <h2>No se encontraron recetas</h2> : <div className={style.load}></div>
      }
    </>
  );
}

export default Cards;