import React from "react";
import styles from "./Result.module.scss";
import { calculateColorsForLamps, calculateColorsInCanvas } from "../../utils/image/calculateColors";
import imgToLampBlueprintConvertor from "../../utils/convertors/imgToLampBlueprintConvertor";
import blueprintEncoder from "../../utils/convertors/blueprintEncoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";
import imgToBrickBlueprintConvertor from "../../utils/convertors/imgToBrickBlueprintConvertor";

type Props = { pixelArt: string[][]; convert_to: "lamp" | "brick" };

const Result = ({ pixelArt, convert_to }: Props) => {
  return (
    <div className={styles["result--container"]}>
      <p className={styles["result--help"]}>
        Click on blueprint string to copy
      </p>

      <p className={styles["result"]} onClick={clickCopyHandler}>
        {blueprintEncoder({
          blueprint: convert_to == 'lamp'
            ? imgToLampBlueprintConvertor(
              pixelArt.length,
              pixelArt[0].length,
              calculateColorsForLamps(pixelArt)
            )
            : imgToBrickBlueprintConvertor(
              pixelArt
            ),
        })}
      </p>
    </div>
  );
};

export default Result;
