import { NavLink, Outlet } from "react-router-dom";

import salad from "../../img/salad.png";
import style from "./NavBar.module.css";

function NavBar() {
  return (
    <div>
      <nav className={style.navigation}>
        <NavLink to="/home" className={style.logo}>
          <img src={salad} alt="logotipo" />
          <p>RECIPES</p>
        </NavLink>
        <div className={style.rutas}>
          <NavLink to="/home" className={style.enlaces}>
            Home
          </NavLink>
          <NavLink to="/home/add" className={style.enlaces}>
            Create a new recipe
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
