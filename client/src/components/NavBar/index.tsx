import { NavLink } from "react-router-dom";

import salad from "../../img/salad.png";
import style from "./NavBar.module.css";

function NavBar() {
  return (
    <nav className={style.containerNav}>
      <div className={style.navigation}>
        <NavLink to="/home" className={style.logo}>
          <img src={salad} alt="logotipo" />
          <p className={style.titleNav}>RECIPES</p>
        </NavLink>
        <div className={style.rutas}>
          <NavLink to="/home" className={style.enlaces}>
            Home
          </NavLink>
          <NavLink to="/home/create" className={style.enlaces}>
            Create a new recipe
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
