import React from "react";
import styles from "./Result.module.scss";
import { calculateColorsBlueprint,calculateColors } from "../../utils/image/calculateColors";
import imgToLampBlueprintConvertor from "../../utils/convertors/imgToLampBlueprintConvertor";
import Encode_Blueprint from "../../utils/convertors/Encoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";
import imgToBrickBlueprintConvertor from "../../utils/convertors/imgToBrickBlueprintConvertor";

type Props = { resultCanvas: HTMLCanvasElement; convert_to: "lamp" | "brick" };

const Result = ({ resultCanvas, convert_to }: Props) => {
  return (
    <div className={styles["result--container"]}>
      <p className={styles["result--help"]}>
        Click on blueprint string to copy
      </p>

      <p className={styles["result"]} onClick={clickCopyHandler}>
        {Encode_Blueprint({
          blueprint: convert_to=='lamp'
            ? imgToLampBlueprintConvertor(
                resultCanvas.width,
                resultCanvas.height,
                calculateColorsBlueprint(calculateColors(resultCanvas))
              )
            : imgToBrickBlueprintConvertor(
                resultCanvas
              ),
        })}
      </p>
    </div>
  );
};

export default Result;
