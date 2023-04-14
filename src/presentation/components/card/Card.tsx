import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";
type Props = {
  title: string;
  desc: string;
  link: string;
  imgSrc:string;
};

const Card = ({ title, desc, link,imgSrc }: Props) => {
  return (
    <div className={styles["card"]}>
      <div>
        <img src="./public/imgs/gear.ico" className={styles["card--gear"]} />
        <img src="./public/imgs/gear.ico" className={styles["card--gear"]} />
      </div>
      <div className={styles["card--header"]}>
        <Link className={styles["card--link"]} to={link}>
          {title}
        </Link>
      </div>
      <div>
        <div className={styles["card--gear--rail"]}></div>
        <div className={styles["card--gear--rail"]}></div>
      </div>
      <div className={styles["card--video--container"]}>WIP</div>
      <div className={styles["card--inner"]}>
        <div className={styles["card--inner--container"]}>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
