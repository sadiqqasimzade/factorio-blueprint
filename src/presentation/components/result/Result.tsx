import React, { useContext } from "react";
import styles from "./Result.module.scss";
import { calculateColorsForLamps } from "../../utils/image/calculateColors";
import imgToLampBlueprintConvertor from "../../utils/convertors/imgToLampBlueprintConvertor";
import blueprintEncoder from "../../utils/convertors/blueprintEncoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";
import imgToBrickBlueprintConvertor from "../../utils/convertors/imgToBrickBlueprintConvertor";
import AlertContext from "../../contexts/AlertContext";

type Props = { pixelArt: string[][]; convert_to: "lamp" | "brick" };

const Result = ({ pixelArt, convert_to }: Props) => {
  const { addAlert } = useContext(AlertContext)
  return (
    <div className={styles["result--container"]}>
      <p className={styles["result--help"]}>
        Click on blueprint string to copy
      </p>

      <p className={styles["result"]} onClick={(e) => { clickCopyHandler(e).then(result => result ? addAlert('Succesfully copied', 'success') : addAlert('Unable to copy', 'error')) }}>
        {blueprintEncoder({
          blueprint: convert_to == 'lamp'
            ? imgToLampBlueprintConvertor(calculateColorsForLamps(pixelArt))
            : imgToBrickBlueprintConvertor(pixelArt),
        })}
      </p>
    </div>
  );
};

export default Result;
