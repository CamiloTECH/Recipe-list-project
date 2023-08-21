import { FC } from "react";
import { Link } from "react-router-dom";

import style from "./Card.module.css";

interface Props {
  diets: string[];
  id: string | number;
  image: string;
  title: string;
}

const Card: FC<Props> = props => {
  return (
    <div className={style.card}>
      <img src={props.image} alt="Comida" />
      <div className={style.info}>
        <p className={style.title}>
          {props.title[0].toUpperCase() + props.title.slice(1)}
        </p>
        <p className={style.dieta}>Diet:</p>
        <ul>
          {props.diets.map((diet, index) => (
            <li key={index}>{diet}</li>
          ))}
        </ul>
      </div>
      <Link to={`/home/details/${props.id}`} className={style.link}>
        See more details
      </Link>
    </div>
  );
};

export default Card;
