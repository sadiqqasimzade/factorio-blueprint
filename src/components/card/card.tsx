import styles from "./Card.module.scss";
import Link from "next/link";
type Props = {
  title: string;
  desc: string;
  link: string;
  imgSrc: string;
};

export default function Card({ title, desc, link, imgSrc }: Props) {
  return (
    <div className={styles["card"]}>
      <div>
        <img src="/imgs/gear.ico" className={styles["card--gear"]} alt="Gear" />
        <img src="/imgs/gear.ico" className={styles["card--gear"]} alt="Gear" />
      </div>
      <div className={styles["card--header"]}>
        <Link className={styles["card--link"]} href={link}>
          {title}
        </Link>
      </div>
      <div>
        <div className={styles["card--gear--rail"]}></div>
        <div className={styles["card--gear--rail"]}></div>
      </div>
      <div className={styles["card--video--container"]} style={{ backgroundImage: `url(./imgs/${imgSrc})` }}>
      </div>
      <div className={styles["card--inner"]}>
        <div className={styles["card--inner--container"]}>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
}