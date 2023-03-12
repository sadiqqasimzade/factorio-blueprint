import React, { useEffect, useRef, useState } from "react";
import styles from "./ImageEditor.module.scss";

type Props = {
  Image: HTMLImageElement;
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement>>;
  setresultCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement>>;
  maxW:number,
  maxH:number
};

const ImageEditor: React.FC<Props> = ({
  Image,
  setImage,
  setresultCanvas,
  maxW,
  maxH
}: Props) => {
  const 
    minW = 5,
    minH = 5;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(Image.naturalWidth);
  const [height, setHeight] = useState(Image.naturalHeight);
  const [aspectRatio, setAspectRatio] = useState(true);

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = width;
    canvas.height = height;

    context.drawImage(Image, 0, 0, width, height);
  };

  const handleAspectRatioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAspectRatio(event.target.checked);
  };

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newWidth = Number(event.target.value);
    if (newWidth > maxW) {
      newWidth = maxW;
    }
    if (aspectRatio && Image) {
      let newHeight = (newWidth / Image.width) * Image.height;
      if (newHeight > maxH) {
        setHeight(maxH);
        setWidth((maxH / Image.height) * Image.width);
      } else {
        setHeight(newHeight);
        setWidth(newWidth);
      }
    } else {
      setWidth(newWidth);
    }
  };

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newHeight = Number(event.target.value);
    if (newHeight > maxH) {
      newHeight = maxH;
    }

    if (aspectRatio && Image) {
      let newWidth = (newHeight / Image.height) * Image.width;
      if (newWidth > maxW) {
        setWidth(maxW);
        setWidth((newHeight / Image.height) * maxW);
      } else {
        setWidth(newWidth);
        setHeight(newHeight);
      }
    } else {
      setHeight(newHeight);
    }
  };

  useEffect(() => {
    handleResize();
  }, [width, height]);

  return (
    <div>
      <div className={styles["imageeditor--settings--container"]}>
        <div className={styles["imageeditor--settings"]}>
          <p className={styles["imageeditor--settings--label"]}>Width</p>
          <input
            type="number"
            value={width}
            className={styles["imageeditor--settings--input"]}
            min={minW}
            max={maxW}
            onChange={handleWidthChange}
          />
          <p className={styles["imageeditor--settings--helper"]}>
            Min:{minW}/Max:{maxW}
          </p>
        </div>
        <div className={styles["imageeditor--settings"]}>
          <p className={styles["imageeditor--settings--label"]}>Height</p>
          <input
            type="number"
            value={height}
            className={styles["imageeditor--settings--input"]}
            min={minH}
            max={maxH}
            onChange={handleHeightChange}
          />
          <p className={styles["imageeditor--settings--helper"]}>
            Min:{minH}/Max:{maxH}
          </p>
        </div>
        <div className={styles["imageeditor--settings"]}>
          <p className={styles["imageeditor--settings--label"]}>
            Maintain aspect ratio
          </p>
          <input
            type="checkbox"
            checked={aspectRatio}
            onChange={handleAspectRatioChange}
            className={styles["imageeditor--settings--input"]}
          />
        </div>
        <div className={styles["imageeditor--settings"]}>
          <button
            onClick={() => {
              setImage(null);
            }}
          >
            BACK
          </button>
          <button
            onClick={() => {
              let canvas = canvasRef.current;

              if (canvas.width > maxW) {
                alert("wrong width");
              } else if (canvas.height > maxH) {
                alert("wrong height");
              } else {
                setresultCanvas(canvasRef.current);
                setImage(null);
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
      <canvas className={styles["imageeditor--canvas"]} ref={canvasRef} />
    </div>
  );
};

export default ImageEditor;
