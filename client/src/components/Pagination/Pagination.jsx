import { useEffect, useState } from "react"

function Pagination({ recipes, pagination, recipesPerPage, currentPage, currentCards }) {
  const numberOfButtons = []
  const maxPage = Math.ceil(recipes.length / recipesPerPage)
  const [stateButton, setStateButton] = useState({
    next: false,
    previus: false
  })

  useEffect(() => {
    console.log(maxPage)
    if (maxPage === 1) {
      setStateButton({
        previus: true,
        next: true
      })
    } else if (currentPage === maxPage && maxPage > 1) {
      setStateButton({
        previus: false,
        next: true
      })
    } else if (currentPage === 1 && maxPage > 1) {
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

  for (let i = 0; i < maxPage; i++) {
    numberOfButtons.push(i)
  }

  return (
    <>
      <button onClick={() => pagination(currentPage - 1)} disabled={stateButton.previus}
        style={stateButton.previus ? {
          "boxShadow": "none", "backgroundColor": "#B03A2E9d",
          "color": "#82E0AA9d", "width": "8%", "cursor": "default"
        }
          : { "width": "8%", "backgroundColor": "#B03A2E", "color": "#82E0AA" }
        }
      >
        Previus Page
      </button>

      {numberOfButtons.map(pag => (
        <button key={pag} onClick={() => pagination(pag + 1)}
          style={currentPage === pag + 1 ? { "backgroundColor": "#B03A2E", "color": "#82E0AA", "fontWeight": "bold" } : {}}>
          {pag + 1}
        </button>
      ))
      }
      <button onClick={() => pagination(currentPage + 1)} disabled={stateButton.next}
        style={stateButton.next ? {
          "boxShadow": "none", "backgroundColor": "#B03A2E9d",
          "color": "#82E0AA9d", "width": "7%", "cursor": "default"
        }
          : { "width": "7%", "backgroundColor": "#B03A2E", "color": "#82E0AA" }
        }
      >
        Next Page
      </button>
    </>
  );
}

export default Pagination;