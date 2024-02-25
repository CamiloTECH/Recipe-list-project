import { useEffect, useState } from "react";

import { Recipe } from "../../models";
import Card from "../Card";
import Pagination from "../Pagination";
import style from "./Cards.module.css";
const recipesPerPage = 9;

function Cards({ recipes }: { recipes: Recipe[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCards, setCurrentCards] = useState<Recipe[]>([]);

  const handleCurrentCards = () => {
    const endIndex = currentPage * recipesPerPage;
    const inicialIndex = endIndex - recipesPerPage;
    const currentCards = recipes.slice(inicialIndex, endIndex);
    setCurrentCards(currentCards);
  };

  const cPage = (num: number) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    handleCurrentCards();
  }, [currentPage, recipes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

  return (
    <>
      <div className={style.cards}>
        {currentCards.map(recipe => (
          <Card
            diets={recipe.diets}
            id={recipe.id}
            image={recipe.image}
            title={recipe.title}
            key={recipe.id}
          />
        ))}
      </div>

      <Pagination
        recipes={recipes}
        pagination={cPage}
        recipesPerPage={recipesPerPage}
        currentPage={currentPage}
        currentCards={currentCards}
      />
    </>
  );
}

export default Cards;
