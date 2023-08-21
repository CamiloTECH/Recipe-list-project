import { useEffect, useState } from "react";

import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import style from "./Cards.module.css";

function Cards({ recipes }) {
  const recipesPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const endIndex = currentPage * recipesPerPage;
  const inicialIndex = endIndex - recipesPerPage;
  const currentCards = recipes.slice(inicialIndex, endIndex);

  const cPage = (num: number) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

  return (
    <>
      <div className={style.buttons}>
        <Pagination
          recipes={recipes}
          pagination={cPage}
          recipesPerPage={recipesPerPage}
          currentPage={currentPage}
          currentCards={currentCards}
        />
      </div>

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
    </>
  );
}

export default Cards;
