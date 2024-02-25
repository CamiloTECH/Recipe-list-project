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
  const [totalPages, setTotalPages] = useState<number[]>([]);

  const handleMaxPage = () => {
    const maxPage = Math.ceil(recipes.length / recipesPerPage);
    const totalPagesButtons = [];

    for (let i = 0; i < maxPage; i++) {
      totalPagesButtons.push(i);
    }
    setTotalPages(totalPagesButtons);
  };

  useEffect(() => {
    handleMaxPage();
  }, [currentPage, currentCards]);

  return (
    <div className={style.contentButtons}>
      {totalPages.length > 1 && currentPage !== 1 ? (
        <button
          onClick={() => pagination(currentPage - 1)}
          className={`${style.buttonPaginated} ${style.buttonActive}`}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      ) : null}

      {totalPages.map(pag => (
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

      {totalPages.length > 1 && currentPage !== totalPages.length ? (
        <button
          onClick={() => pagination(currentPage + 1)}
          className={`${style.buttonPaginated} ${style.buttonActive}`}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      ) : null}
    </div>
  );
};

export default Pagination;
