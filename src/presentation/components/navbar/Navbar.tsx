import React from "react";
import styles from "./Navbar.module.scss";
type Props = {};
export default function Navbar({}: Props) {
  console.log()
  return (
    <header>
      <div className={styles["nav--grid"]}>
        <p className={styles["nav--text"]}>WIP</p>
        <h2 className={styles["nav--text"]}>Factorio tools</h2>
        <p className={styles["nav--text"]}>WIP</p>
      </div>
    </header>
  );
}
