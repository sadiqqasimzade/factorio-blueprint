import React from "react";
import Card from "../../components/card/Card";
import styles from "./IndexPage.module.scss";
type Props = {};

const IndexPage = (props: Props) => {
  return (
    <section className={styles["grid"]}>
      <Card
        title="Decoder/Encoder"
        desc="Decodes or Encodes factorio blueprint strings"
        link="decode-encode"
      />
      <Card
        title="Image converter - Lamp"
        desc="Converts image to factorio blueprint"
        link="image-converter-lamp"
      />
      <Card
        title="Image converter - Brick"
        desc="Converts image to factorio blueprint"
        link="image-converter-brick"
      />
    </section>
  );
};

export default IndexPage;
