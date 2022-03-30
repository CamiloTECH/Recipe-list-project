import { useEffect, useState } from "react"
import style from "./Pagination.module.css"

function Pagination({ recipes, pagination, recipesPerPage, currentPage, currentCards }) {
  const numberOfButtons = []
  const maxPage = Math.ceil(recipes.length / recipesPerPage)
  const [stateButton, setStateButton] = useState({
    next: false,
    previus: false
  })
  for (let i = 0; i < maxPage; i++) numberOfButtons.push(i)

  useEffect(() => {
    if (maxPage === 1) {
      setStateButton({
        previus: true,
        next: true
      })
    } else if (currentPage === maxPage) {
      setStateButton({
        previus: false,
        next: true
      })
    } else if (currentPage === 1) {
      setStateButton({
        next: false,
        previus: true
      })
    } else {
      setStateButton({
        previus: false,
        next: false
      })
    }
    // eslint-disable-next-line 
  }, [currentPage, currentCards])



  return (
    <>
      <button onClick={() => pagination(currentPage - 1)} className={style.bigButtons} disabled={stateButton.previus}
        style={stateButton.previus ? {
          "boxShadow": "none", "backgroundColor": "#B03A2E9d",
          "color": "#82E0AA9d", "width": "max-content", "cursor": "default","padding":".6% 1%"
        }
          : { "width": "max-content", "backgroundColor": "#B03A2E", "color": "#82E0AA","padding":".6% 1%" }
        }
      >
        Previus Page
      </button>

      {numberOfButtons.map(pag => (
        <button key={pag} onClick={() => pagination(pag + 1)} className={style.sButtons}
          style={currentPage === pag + 1 ? {
            "backgroundColor": "#B03A2E",
            "color": "#82E0AA", "fontWeight": "bold"
          } : {}}>
          {pag + 1}
        </button>
      ))
      }
      <button onClick={() => pagination(currentPage + 1)} className={style.bigButtons} disabled={stateButton.next}
        style={stateButton.next ? {
          "boxShadow": "none", "backgroundColor": "#B03A2E9d",
          "color": "#82E0AA9d", "width": "max-content", "cursor": "default","padding":".6% 1%"
        }
          : { "width": "max-content", "backgroundColor": "#B03A2E", "color": "#82E0AA","padding":".6% 1%" }
        }
      >
        Next Page
      </button>
    </>
  );
}

export default Pagination;