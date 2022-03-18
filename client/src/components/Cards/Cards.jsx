import Card from "../Card/Card";
import { getAllrecipes } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

function Cards() {
    const dispatch = useDispatch()
    const recipes = useSelector(store => store.recipes)
    useEffect(() => {
       if (recipes.length !== 100) dispatch(getAllrecipes())
    }, [])

    return (
        <>
            {recipes.length > 0 && recipes.map(recipe => (
                <Card diets={recipe.diets}
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.title}
                    key={recipe.id} />
            ))}
        </>
    );
}

export default Cards;