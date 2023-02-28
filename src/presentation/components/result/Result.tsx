import React, { useEffect, useState } from "react";
import styles from "./Result.module.scss";
import calculateColors from "../../utils/image/calculateColors";
import imgToLampBlueprintConvertor from "../../utils/convertors/imgToLampBlueprintConvertor";
import Encode_Blueprint from "../../utils/convertors/Encoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";
import ProgressBar from "../progress_bar/ProgressBar";
type Props = { resultCanvas: HTMLCanvasElement };

const Result = ({ resultCanvas }: Props) => {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  let bp=null
  imgToLampBlueprintConvertor(
    resultCanvas.width,
    resultCanvas.height,
    calculateColors(resultCanvas)
  ).then(data=>{bp=data})

  return (
    <div className={styles["result--container"]} >
      <p className={styles["result--help"]}>
        Click on blueprint string to copy
      </p>
      <p className={styles["result"]} onClick={clickCopyHandler}>
        {Encode_Blueprint({
          blueprint: bp,
        })}
      </p>
    </div>
  );
};

export default Result;
