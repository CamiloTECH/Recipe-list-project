//import { useState } from "react";

function Pagination({ recipes, pagination, recipesPerPage, currentPage }) {
  const numberOfButtons = []
  // const [stateButton, setStateButton] = useState({
  //   next: false,
  //   previus: false
  // })

  for (let i = 0; i < Math.ceil(recipes.length / recipesPerPage); i++) {
    numberOfButtons.push(i)
  }

  return (
    <>
      {numberOfButtons.map(pag => (
        <button key={pag} onClick={() => pagination(pag + 1)}
          style={currentPage === pag + 1 ? {"backgroundColor":"#B03A2E", "color":"#82E0AA","fontWeight":"bold"} : {}}>
            {pag + 1}
        </button>
      ))

      }
    </>
  );
}

export default Pagination;