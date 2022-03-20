import style from "./Search.module.css"
import { useEffect, useState } from "react"
import { getTypesDiet, getRecipesName } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

function Search() {
   const [state, setState] = useState()
   const dispatch = useDispatch()
   const types = useSelector(store => store.types)
   useEffect(() => {
      if (types.length === 0) dispatch(getTypesDiet())
   }, [])

   const handleButtonSearch = () => {
      if (state) {
         dispatch(getRecipesName(state))
      }
   }

   return (
      <div>

         <header className={style.header}>
            <div className={style.search}>
               <input type="text" name="search" placeholder="Search by name" onChange={(e) => setState(e.target.value)} />
               <button onClick={handleButtonSearch}>Search</button>
            </div>
            <div className={style.option}>
               <select name="alphabetical" defaultValue={0}>
                  <option value="0" disabled>Alphabetical order</option>
                  <option value="1">A-Z</option>
                  <option value="2">Z-A</option>
               </select>
               <select name="score" defaultValue={0}>
                  <option value="0" disabled >Order by score</option>
                  <option value="1">Higher to Lower</option>
                  <option value="2">Lower to Higher</option>
               </select>
               <select name="diet" defaultValue={0}>
                  <option value="0" disabled>Order by type diet</option>
                  {types.length > 0 && types.map(type => (
                     <option value={type.id} key={type.id}>{type.name}</option>
                  ))}
               </select>
               <button>Limpiar filtros</button>
            </div>
         </header>
         <Outlet />
      </div>
   );
}

export default Search;