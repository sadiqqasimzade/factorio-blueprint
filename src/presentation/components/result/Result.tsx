import React, { useEffect, useState } from "react";
import styles from "./Result.module.scss";
import calculateColors from "../../utils/image/calculateColors";
import imgToLampBlueprintConvertor from "../../utils/convertors/imgToLampBlueprintConvertor";
import Encode_Blueprint from "../../utils/convertors/Encoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";
import { Blueprint } from "../../../domain/entity/models/Blueprint";
import ProgressBar from "../progress_bar/ProgressBar";
type Props = { resultCanvas: HTMLCanvasElement };

const Result = ({ resultCanvas }: Props) => {
  const [blueprint, setBlueprint] = useState<Blueprint>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const getbp = async () => {
      imgToLampBlueprintConvertor(
        resultCanvas.width,
        resultCanvas.height,
        calculateColors(resultCanvas),
        setProgress,
        setBlueprint
      )
    };
    getbp();
    return () => {};
  }, []);


  return (
    <div className={styles["result--container"]}>
      <p className={styles["result--help"]}>
        Click on blueprint string to copy
      </p>
      {blueprint ? (
        <p className={styles["result"]} onClick={clickCopyHandler}>
          {Encode_Blueprint({
            blueprint: blueprint,
          })}
        </p>
      ) : (
        <ProgressBar size={100} progress={progress}></ProgressBar>
      )}
    </div>
  );
};

export default Result;
