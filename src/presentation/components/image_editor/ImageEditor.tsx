import React, { useEffect, useRef, useState } from "react";
import styles from "./ImageEditor.module.scss";
import { calculateEntitiesCount } from "../../utils/calculateEntitiesCount";
import AlertContainer from "../alert/AlertContainer";

type Props = {
  Image: HTMLImageElement;
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>;
  setresultCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | undefined>>;
  maxW: number,
  maxH: number,
  minW: number,
  minH: number,
  convertTo: 'lamp' | 'brick'
};

const ImageEditor: React.FC<Props> = ({
  Image,
  setImage,
  setresultCanvas,
  maxW,
  maxH,
  minW,
  minH,
  convertTo
}: Props) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number>(Image.naturalWidth);
  const [height, setHeight] = useState<number>(Image.naturalHeight);
  const [aspectRatio, setAspectRatio] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string|undefined>(undefined);
  const entityCount: [number, number, number, number] | undefined = convertTo == 'lamp' ? calculateEntitiesCount(width, height) : undefined


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
        setHeight(Math.floor(maxH));
        setWidth(Math.floor((maxH / Image.height) * Image.width));
      } else {
        setHeight(Math.floor(newHeight));
        setWidth(Math.floor(newWidth));
      }
    } else {
      setWidth(Math.floor(newWidth));
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
        setWidth(Math.floor(maxW));
        setWidth(Math.floor((newHeight / Image.height) * maxW));
      } else {
        setWidth(Math.floor(newWidth));
        setHeight(Math.floor(newHeight));
      }
    } else {
      setHeight(Math.floor(newHeight));
    }
  };

  useEffect(() => {
    handleResize();
  }, [width, height]);


  return (
    <>
      {alertMessage && <AlertContainer text={alertMessage} />}
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
          <div className={styles["imageeditor--settings--button--container"]}>
            <p className={styles["imageeditor--settings--label"]}>
              Maintain aspect ratio
            </p>
            <input
              type="checkbox"
              checked={aspectRatio}
              onChange={handleAspectRatioChange}
            />
          </div>
        </div>
        <div className={styles["imageeditor--settings"]}>
          <div className={styles["imageeditor--settings--button--container"]}>
            <button
              onClick={() => {
                setImage(undefined);
              }}
              className="button button__light"
            >
              Back
            </button>
            <button
              className="button button__light"
              onClick={() => {
                let canvas = canvasRef.current;

                if (canvas!.width > maxW || canvas!.width < minW) {
                  setAlertMessage('Wrong width')
                  setTimeout(() => {
                    setAlertMessage(undefined)
                  }, 2000);
                } else if (canvas!.height > maxH || canvas!.height < minH) {
                  setAlertMessage('Wrong height')
                  setTimeout(() => {
                    setAlertMessage(undefined)
                  }, 2000);
                } else {
                  setresultCanvas(canvasRef.current!);
                  setImage(undefined);
                }
              }}
            >
              Continue
            </button>
          </div>

          {entityCount != undefined ? (<div>
            <div className={styles["imageeditor--preresult"]}>
              <img className={styles["imageeditor--preresult--img"]} src="/imgs/entites/constantCombinator.png"></img>
              <p className={styles["imageeditor--preresult--text"]}>{entityCount[0]}</p>
            </div>
            <div className={styles["imageeditor--preresult"]}>
              <img className={styles["imageeditor--preresult--img"]} src="/imgs/entites/substation.png"></img>
              <p className={styles["imageeditor--preresult--text"]}>{entityCount[1]}</p>
            </div>
            <div className={styles["imageeditor--preresult"]}>
              <img className={styles["imageeditor--preresult--img"]} src="/imgs/entites/arithmeticCombinator.png"></img>
              <p className={styles["imageeditor--preresult--text"]}>{entityCount[2]}</p>
            </div>
            <div className={styles["imageeditor--preresult"]}>
              <img className={styles["imageeditor--preresult--img"]} src="/imgs/entites/lamp.png"></img>
              <p className={styles["imageeditor--preresult--text"]}>{entityCount[3]}</p>
            </div>
          </div>) : (<></>)}

        </div>
      </div>
      <canvas className={styles["imageeditor--canvas"]} ref={canvasRef} />
    </>
  );
};

export default ImageEditor;
