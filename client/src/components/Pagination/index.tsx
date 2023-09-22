import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useState } from "react";

import { Recipe } from "../../models";
import style from "./Pagination.module.css";

interface Props {
  recipes: Recipe[];
  pagination: (page: number) => void;
  recipesPerPage: number;
  currentPage: number;
  currentCards: Recipe[];
}

const Pagination: FC<Props> = ({
  recipes,
  pagination,
  recipesPerPage,
  currentPage,
  currentCards
}) => {
  const numberOfButtons = [];
  const maxPage = Math.ceil(recipes.length / recipesPerPage);
  const [stateButton, setStateButton] = useState({
    next: false,
    previus: false
  });
  for (let i = 0; i < maxPage; i++) numberOfButtons.push(i);

  useEffect(() => {
    if (maxPage === 1) {
      setStateButton({
        previus: true,
        next: true
      });
    } else if (currentPage === maxPage) {
      setStateButton({
        previus: false,
        next: true
      });
    } else if (currentPage === 1) {
      setStateButton({
        next: false,
        previus: true
      });
    } else {
      setStateButton({
        previus: false,
        next: false
      });
    }
  }, [currentPage, currentCards]);

  return (
    <div className={style.contentButtons}>
      {!stateButton.previus && (
        <button
          onClick={() => pagination(currentPage - 1)}
          className={`${style.buttonPaginated} ${
            stateButton.previus ? style.buttonDisabled : style.buttonActive
          }`}
          disabled={stateButton.previus}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}

      {numberOfButtons.map(pag => (
        <button
          key={pag}
          onClick={() => pagination(pag + 1)}
          className={`${style.buttonPaginated} ${
            currentPage === pag + 1 ? style.currentPage : style.restPage
          }`}
        >
          {pag + 1}
        </button>
      ))}
      {!stateButton.next && (
        <button
          onClick={() => pagination(currentPage + 1)}
          disabled={stateButton.next}
          className={`${style.buttonPaginated} ${
            stateButton.next ? style.buttonDisabled : style.buttonActive
          }`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
