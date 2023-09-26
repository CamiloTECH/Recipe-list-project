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
    <Link to={`/home/details/${props.id}`} className={style.link}>
      <div className={style.card}>
        <img src={props.image} alt="Comida" className={style.image} />

        <div className={style.contentTitle}>
          <div className={style.info}>
            <p className={style.title}>
              {props.title[0].toUpperCase() + props.title.slice(1)}
            </p>
          </div>
          <div>
            <p className={style.buttonDetail}>See more details</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
