import { Link } from "react-router-dom";

import style from "./Card.module.css";

function Card(props) {
  return (
    <div className={style.card}>
      <img src={props.image} alt="Comida" />
      <div className={style.info}>
        <p className={style.title}>
          {props.title[0].toUpperCase() + props.title.slice(1)}
        </p>
        <p className={style.dieta}>Diet:</p>
        <ul>
          {typeof props.diets[0] === "string"
            ? props.diets.map((diet, index) => <li key={index}>{diet}</li>)
            : props.diets.map((diet, index) => (
                <li key={index}>{diet.name}</li>
              ))}
        </ul>
      </div>
      <Link to={`/home/details/${props.id}`} className={style.link}>
        See more details
      </Link>
    </div>
  );
}

export default Card;
