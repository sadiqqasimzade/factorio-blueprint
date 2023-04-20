import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
type Props = {};
export default function Navbar({}: Props) {
  return (
    <header>
      <div className={styles["nav--grid"]}>
        <a className={styles["nav--text"]} href='#'></a>
        <Link className={styles["nav--text"]} to={"/"}>
          Factorio tools
        </Link>
        <a className={styles["nav--text"]} href='#'></a>
      </div>
    </header>
  );
}
