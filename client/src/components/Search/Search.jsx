import style from "./Search.module.css"
import { useEffect, useState } from "react"
import { getTypesDiet, getRecipesName, orderByName, orderByScore,orderByDiet } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

function Search() {
   const dispatch = useDispatch()

   const [state, setState] = useState({
      text: "",
      alphabeticalSelect: 0,
      scoreSelect: 0,
      dietSelect: 0
   })

   const { types, recipes } = useSelector(store => {
      return {
         types: store.types,
         recipes: store.recipes,
      }
   })

   useEffect(() => {
      if (types.length === 0) dispatch(getTypesDiet())
   }, [])

   const handleButtonSearch = () => {
      if (state.text) {
         dispatch(getRecipesName(state.text))
         setState({
            ...state,
            alphabeticalSelect: 0,
            scoreSelect: 0,
            dietSelect: 0
         })
      }
   }
   const alphabeticalOrder = (evento) => {
      if (recipes.length > 0 && evento.target.value !== state.alphabeticalSelect) {
         dispatch(orderByName(evento.target.value, recipes))
      }
      setState({
         ...state,
         alphabeticalSelect: evento.target.value,
      })
   }
   const scoreOrder = (evento) => {
      if (recipes.length > 0 && evento.target.value !== state.scoreSelect) {
         dispatch(orderByScore(evento.target.value, recipes))
      }
      setState({
         ...state,
         scoreSelect: evento.target.value,
      })
   }
   const dietOrder = (evento) => {
      let index = evento.target.selectedIndex;
      let diet=evento.target.options[index].text
      if (recipes.length > 0 && evento.target.value !== state.dietSelect) {
         dispatch(orderByDiet(diet, recipes))
      }
      setState({
         ...state,
         dietSelect: evento.target.value,
      })
   }
   const cleanFilters = () => {
      setState({
         ...state,
         alphabeticalSelect: 0,
         scoreSelect: 0,
         dietSelect: 0
      })
   }

   return (
      <div>

         <header className={style.header}>
            <div className={style.search}>
               <input type="text" name="search" placeholder="Search by name"
                  onChange={(e) => setState({ ...state, text: e.target.value })} />
               <button onClick={handleButtonSearch}>Search</button>
            </div>

            <div className={style.option}>

               <select name="alphabetical" value={state.alphabeticalSelect}
                  onChange={alphabeticalOrder}>
                  <option value="0" disabled>Alphabetical order</option>
                  <option value="1">A-Z</option>
                  <option value="2">Z-A</option>
               </select>

               <select name="score" value={state.scoreSelect} onChange={scoreOrder}>
                  <option value="0" disabled >Order by score</option>
                  <option value="1">Higher to Lower</option>
                  <option value="2">Lower to Higher</option>
               </select>

               <select name="diet" value={state.dietSelect} onChange={dietOrder}>
                  <option value="0" disabled>Order by type diet</option>
                  {types.length > 0 && types.map(type => (
                     <option value={type.id} key={type.id}>{type.name}</option>
                  ))}
               </select>

               <button onClick={cleanFilters}>Limpiar filtros</button>
            </div>
         </header>
         <Outlet />
      </div>
   );
}

export default Search;