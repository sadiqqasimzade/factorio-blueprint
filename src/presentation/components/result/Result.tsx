import React from "react";
import styles from "./Result.module.scss";
import calculateColors from "../../utils/image/calculateColors";
import Generate from "../Generate";
import Encode_Blueprint from "../../utils/convertors/Encoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";
type Props = { resultCanvas: HTMLCanvasElement };

const Result = ({ resultCanvas }: Props) => {
  return (
    <div className={styles["result--container"]} >
      <p className={styles["result--help"]}>
        Click on blueprint string to copy
      </p>
      <p className={styles["result"]} onClick={clickCopyHandler}>
        {Encode_Blueprint({
          blueprint: Generate(
            resultCanvas.width,
            resultCanvas.height,
            calculateColors(resultCanvas)
          ),
        })}
      </p>
    </div>
  );
};

export default Result;
