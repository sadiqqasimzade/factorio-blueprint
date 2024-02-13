import Image from "next/image";
import Link from "next/link";
// For old card
// import styles from "./Card.module.scss";

const gearIco = require("@/public/imgs/gear.ico")
type Props = {
  title: string;
  link: string;
  imgSrc: string;
};

export default function Card({ title, link, imgSrc }: Props) {
  return (
    //// OLD
    // <div className={styles["card"]}>
    //   <div>
    //     <Image src={gearIco} className={styles["card--gear"]} alt="" />
    //     <Image src={gearIco} className={styles["card--gear"]} alt="" />
    //   </div>
    //   <div className={styles["card--header"]}>

    //   </div>
    //   <div>
    //     <div className={styles["card--gear--rail"]}></div>
    //     <div className={styles["card--gear--rail"]}></div>
    //   </div>
    //   <Link href={link} className={styles["card--video--container"]} style={{ backgroundImage: `url(./imgs/card_covers/${imgSrc})` }} />
    //   <div className={styles["card--inner"]}>
    //     <Link className="decoration-transparent text-blue-500 w-full text-center lg:text-xl md:text-md" href={link}>
    //       {title}
    //     </Link>
    //   </div>
    // </div>
      <div className="w-full h-72 grid items-center relative">
        <Link href={link} className="peer group w-full h-1/3 border-[6px] border-x-amber-700 border-y-white z-[2] flex justify-center items-center relative bg-fuchsia-950 hover:bg-opacity-20 hover:h-full transition-all duration-1000">
          <p className="text-center text-white w-auto p-2 group-hover:bg-white group-hover:text-blue-900 group-hover:text-lg group-hover:translate-y-40 group-hover:rounded-b-3xl transition-all duration-1000" >
            {title}
          </p>
          <Image src={gearIco} className="w-10 absolute left-0 top-0 transition-all duration-1000 group-hover:-rotate-180" alt="" />
          <Image src={gearIco} className="w-10 absolute right-0 bottom-0 transition-all duration-1000 group-hover:-rotate-180" alt="" />
        </Link>
        <div className="w-full h-1/3 absolute bg-cover bg-no-repeat bg-center peer-hover:h-full transition-all duration-1000" style={{ backgroundImage: `url(./imgs/card_covers/${imgSrc})` }}>
 
        </div>
      </div>
  );
}