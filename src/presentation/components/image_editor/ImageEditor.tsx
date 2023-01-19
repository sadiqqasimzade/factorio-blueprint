import React from "react";
import styles from "./ImageEditor.module.scss";

type Props = {
  image: HTMLImageElement;
};
console.log('rerednered img');
const ImageEditor = ({ image }: Props) => {
  return (
    <>
      <div className={styles["imageeditor"]}>
        <img src={image.src}></img>

        <div className={styles["imageeditor--forward"]}></div>
      </div>
      <div className={styles["imageeditor--settings--container"]}>
        <div className={styles["imageeditor--settings"]}>
          <label
            className={styles["imageeditor--settings--label"]}
            htmlFor="width"
          >
            Width
          </label>
          <input
            type="number"
            name="width"
            id="widht"
            min={5}
            value={image.naturalWidth}
            className={styles["imageeditor--settings--input"]}
          />
          <p className={styles["imageeditor--settings--helper"]}>Min:5</p>
        </div>
        <div className={styles["imageeditor--settings"]}>
          <label
            htmlFor="height"
            className={styles["imageeditor--settings--label"]}
          >
            Height
          </label>
          <input
            type="number"
            name="height"
            id="height"
            min={5}
            max={100}
            value={image.naturalHeight}
            className={styles["imageeditor--settings--input"]}
          />
          <p className={styles["imageeditor--settings--helper"]}>
            Min:5/Max:100
          </p>
        </div>
        <div className={styles["imageeditor--settings"]}>
          <label
            htmlFor="aspect"
            className={styles["imageeditor--settings--label"]}
          >
            Aspect-Ratio
          </label>
          <input
            type="number"
            name="aspect"
            id="aspect"
            min={0.1}
            value={image.naturalWidth / image.naturalHeight}
            className={styles["imageeditor--settings--input"]}
          />
          <p className={styles["imageeditor--settings--helper"]}>Min:0.1</p>
        </div>
        <div className={styles["imageeditor--settings"]}>
          <label
            htmlFor="aspect-check"
            className={styles["imageeditor--settings--label"]}
          >
            Aspect-Ratio
          </label>
          <input
            type="checkbox"
            name="aspect-check"
            id="aspect-check"
            min={0.1}
            checked
            className={styles["imageeditor--settings--input"]}
          />
          <p className={styles["imageeditor--settings--helper"]}>Min:0.1</p>
        </div>
      </div>
    </>
  );
};

export default ImageEditor;
