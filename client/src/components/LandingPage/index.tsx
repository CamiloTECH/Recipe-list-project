import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
        <Link to="/home" className={style.boton}>
          Start
        </Link>
      </div>
    </div>
  );
}
