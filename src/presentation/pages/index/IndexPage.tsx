import Card from "../../components/card/Card";
import styles from "./IndexPage.module.scss";

export default function IndexPage() {
  return (
    <div className={styles["grid"]}>
      <Card
        title="Decoder/Encoder"
        desc="Decodes or Encodes factorio blueprint strings"
        link="decode-encode"
        imgSrc="decoder.png"
      />
      <Card
        title="Image converter - Lamp"
        desc="Converts image to factorio blueprint"
        link="image-converter-lamp"
        imgSrc="img-to-blueprint.png"
      />
      <Card
        title="Image converter - Brick"
        desc="Converts image to factorio blueprint"
        link="image-converter-brick"
        imgSrc="img-to-blueprint.png"
      />
      <Card
        title="Pixel Art - Lamp"
        desc="Converts Pixel Art to factorio blueprint"
        link="pixel-art-lamp"
        imgSrc="img-to-blueprint.png"
      />
      <Card
        title="Pixel Art - Brick"
        desc="Converts Pixel Art to factorio blueprint"
        link="pixel-art-brick"
        imgSrc="img-to-blueprint.png"
      />
    </div>
  );
};

