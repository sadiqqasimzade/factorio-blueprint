import Image from "next/image";
import styles from "./Card.module.scss";
import Link from "next/link";

const gearIco = require("@/public/imgs/gear.ico")
type Props = {
  title: string;
  link: string;
  imgSrc: string;
};

export default function Card({ title, link, imgSrc }: Props) {
  return (
    <div className={styles["card"]}>
      <div>
        <Image src={gearIco} className={styles["card--gear"]} alt="" />
        <Image src={gearIco} className={styles["card--gear"]} alt="" />
      </div>
      <div className={styles["card--header"]}>

      </div>
      <div>
        <div className={styles["card--gear--rail"]}></div>
        <div className={styles["card--gear--rail"]}></div>
      </div>
      <Link href={link} className={styles["card--video--container"]} style={{ backgroundImage: `url(./imgs/card_covers/${imgSrc})` }} />
      <div className={styles["card--inner"]}>
        <Link className="decoration-transparent text-blue-500 w-full text-center lg:text-xl md:text-md" href={link}>
          {title}
        </Link>
      </div>
    </div>
    // <div className="w-full h-72 grid items-center bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(./imgs/card_covers/${imgSrc})` }}>
    //   <div className="w-full h-1/3 flex justify-center items-center relative group bg-black hover:bg-opacity-20 hover:h-full transition-all duration-1000">
    //     <Link className="text-center text-white w-full" href={link}>
    //       {title}
    //     </Link>
    //     <Image src={gearIco} className="w-10 absolute left-0 top-0 transition-all duration-1000  group-hover:-rotate-180" alt="" />
    //     <Image src={gearIco} className="w-10 absolute right-0 bottom-0 transition-all duration-1000  group-hover:-rotate-180" alt="" />
    //   </div>

    // </div>
  );
}