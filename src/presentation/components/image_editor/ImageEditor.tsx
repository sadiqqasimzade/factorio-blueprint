import React, { useEffect, useRef, useState } from "react";
import styles from "./ImageEditor.module.scss";

type Props = {
  Canvas: HTMLCanvasElement;
};

const ImageEditor = ({ Canvas }: Props) => {
  const [width, setWidth] = useState(Canvas.width);
  const [height, setHeight] = useState(Canvas.height);
  const [aspect, setAspect] = useState(Canvas.width / Canvas.height);
  const [aspectLock, setAspectLock] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const aspectLockRef = useRef<HTMLInputElement>(null);

  function widhtChange(event: React.ChangeEvent<HTMLInputElement>): void {
    let tempwidth = Number(event.target.value);
    if (!Number.isNaN(tempwidth)) {
      resize(tempwidth, height);
    }
  }

  function heightChange(event: React.ChangeEvent<HTMLInputElement>): void {
    let tempheight = Number(event.target.value);
    if (!Number.isNaN(tempheight)) {
      resize(width, tempheight);
    }
  }

  function aspectChange(event: React.ChangeEvent<HTMLInputElement>): void {
    let aspect = Number(event.target.value);
    if (!Number.isNaN(aspect)) {
      if (aspectLock) {
        setAspect(aspect);
        resize(width, height);
      }
      else{
        resize(width,height)
      }
    }
  }
  function aspectLockChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setAspectLock(!aspectLock);
  }
  useEffect(() => {
    canvasRef.current.getContext("2d").drawImage(Canvas, 0, 0);
  }, [Canvas]);

  function resize(maxWidth: number, maxHeight: number) {
    let canvas = canvasRef.current;
    let imgWidth = Canvas.width;
    let imgHeight = Canvas.height;
    let ratio = 0;

    if (aspectLock == true) {
      ratio = aspect;
    } else {
      let ratio1 = maxWidth / imgWidth;
      let ratio2 = maxHeight / imgHeight;

      // Use the smallest ratio that the image best fit into the maxWidth x maxHeight box.
      if (ratio1 < ratio2) {
        ratio = ratio1;
      } else {
        ratio = ratio2;
      }
      setAspect(ratio);
    }

    let canvasContext = canvas.getContext("2d");
    let canvasCopy = document.createElement("canvas");
    let copyContext = canvasCopy.getContext("2d");
    let canvasCopy2 = document.createElement("canvas");
    let copyContext2 = canvasCopy2.getContext("2d");
    canvasCopy.width = imgWidth;
    canvasCopy.height = imgHeight;
    copyContext.drawImage(Canvas, 0, 0);

    // init
    canvasCopy2.width = imgWidth;
    canvasCopy2.height = imgHeight;
    copyContext2.drawImage(
      canvasCopy,
      0,
      0,
      canvasCopy.width,
      canvasCopy.height,
      0,
      0,
      canvasCopy2.width,
      canvasCopy2.height
    );

    let rounds = 2;
    let roundRatio = ratio * rounds;
    for (var i = 1; i <= rounds; i++) {
      // tmp
      canvasCopy.width = (imgWidth * roundRatio) / i;
      canvasCopy.height = (imgHeight * roundRatio) / i;

      copyContext.drawImage(
        canvasCopy2,
        0,
        0,
        canvasCopy2.width,
        canvasCopy2.height,
        0,
        0,
        canvasCopy.width,
        canvasCopy.height
      );

      // copy back
      canvasCopy2.width = (imgWidth * roundRatio) / i;
      canvasCopy2.height = (imgHeight * roundRatio) / i;
      copyContext2.drawImage(
        canvasCopy,
        0,
        0,
        canvasCopy.width,
        canvasCopy.height,
        0,
        0,
        canvasCopy2.width,
        canvasCopy2.height
      );
    } // end for

    // copy back to canvas

    setWidth(maxWidth);
    setHeight(maxHeight);
    if (aspectLock) {
      canvas.width = (imgWidth * roundRatio) / rounds;
      canvas.height = (imgHeight * roundRatio) / rounds;
      canvasContext.drawImage(
        canvasCopy2,
        0,
        0,
        canvasCopy2.width,
        canvasCopy2.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    } else {
      canvas.width = maxWidth;
      canvas.height = maxHeight;
      canvasContext.drawImage(canvasCopy2, 0, 0, maxWidth, maxHeight);
    }
  }
  function clickHandler(
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void {
    setAspect(Canvas.width / Canvas.height);
    resize(300, 100);
  }

  return (
    <div>
      <div className={styles["imageeditor"]}>
        <canvas ref={canvasRef}></canvas>
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
            max={300}
            value={width}
            className={styles["imageeditor--settings--input"]}
            onChange={widhtChange}
          />
          <p className={styles["imageeditor--settings--helper"]}>
            Min:5/Max:300
          </p>
        </div>
        <div className={styles["imageeditor--settings"]}>
          <button
            onClick={clickHandler}
            className={styles["imageeditor--settings--input"]}
          >
            Fix image with original aspect-ratio
          </button>
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
            value={height}
            className={styles["imageeditor--settings--input"]}
            onChange={heightChange}
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
            className={`${styles["imageeditor--settings--input"]} ${
              aspectLock ? styles["imageeditor--settings--input__red"] : ""
            }`}
            value={aspect}
            onChange={aspectChange}
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
            className={styles["imageeditor--settings--input"]}
            min={0.1}
            checked={aspectLock}
            onChange={aspectLockChange}
            ref={aspectLockRef}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
