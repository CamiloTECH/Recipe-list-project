import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllRecipes } from "../../redux/actions";
import style from "./LandingPage.module.css";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, []);

  return (
    <div>
      <div className={style.font}>
        <div className={style.searchBar}>
          <span>¿Qué te gustaría cocinar?</span>
          <span>
            Descubre recetas de todas partes del mundo, creadas por los mejores
            chefs.
          </span>
          <input type="search" name="searchBar" id="searchBar" />
        </div>
      </div>
      
      <div className={style.recommended}>
        <div>
          <span>DIETAS POPULARES</span>
          <div>Cards</div>
        </div>
      </div>

      <div className={style.recommended}>
        <div>
          <div>
            <span>RECOMENDACIONES</span>
            <button>Todas las recetas</button>
          </div>
          <span>
            Nuestros chefs seleccionan personalmente sus mejores recetas y te
            invitan a prepararlas y conocer sus secretos.
          </span>
          <div>Cards</div>
        </div>
      </div>
    </div>
  );
}
