import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
type Props = {};
export default function Navbar({}: Props) {
  return (
    <header>
      <div className={styles["nav--grid"]}>
        <Link className={styles["nav--text"]} to={"/"}></Link>
        <Link className={styles["nav--text"]} to={"/"}>
          Factorio tools
        </Link>
        <Link className={styles["nav--text"]} to={"/"}></Link>
      </div>
    </header>
  );
}
