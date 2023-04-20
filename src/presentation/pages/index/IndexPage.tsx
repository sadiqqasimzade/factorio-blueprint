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
        imgSrc=""
      />
      <Card
        title="Image converter - Lamp"
        desc="Converts image to factorio blueprint"
        link="image-converter-lamp"
        imgSrc=""
      />
      <Card
        title="Image converter - Brick"
        desc="Converts image to factorio blueprint"
        link="image-converter-brick"
        imgSrc=""
      />
      <Card
        title="Pixel Art - Lamp"
        desc="Converts Pixel Art to factorio blueprint"
        link="pixel-art-lamp"
        imgSrc=""
      />
      <Card
        title="Pixel Art - Brick"
        desc="Converts Pixel Art to factorio blueprint"
        link="pixel-art-brick"
        imgSrc=""
      />
    </section>
  );
};

export default IndexPage;
