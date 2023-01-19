import React from "react";
import Card from "../../components/card/Card";
import styles from "./IndexPage.module.scss";
type Props = {};

const IndexPage = (props: Props) => {
  return (
    <section>
      <div className={`${styles["welcome--section"]}`}>
        <h1 className={styles["welcome--message"]}>Welcome Message!</h1>
      </div>
      <div className={styles["grid"]} >
        <Card title="Decoder/Encoder" desc="Decodes or Encodes factorio blueprint strings" link="./decode-encode" />
        <Card title="Image converter" desc="Converts image to factorio blueprint" link="./image-converter" />
      </div>
    </section>
  );
};

export default IndexPage;
