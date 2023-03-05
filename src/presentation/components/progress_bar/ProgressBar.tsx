import React from "react";
import styles from "./ProgressBar.module.scss";

type Props = {
  size: number;
  progress: number;
  trackWidth?: number ;
  trackColor?: string ;
  indicatorWidth?: number ;
  indicatorColor?: string ;
  indicatorCap?: "round" | "inherit" | "butt" | "square";
  label?: string ;
  labelColor?: string ;
  spinnerMode?: boolean ;
  spinnerSpeed?: number ;
};

const ProgressBar = ({
  size,
  progress,
  trackWidth=10,
  trackColor=`#ddd`,
  indicatorWidth=10,
  indicatorColor=`#07c`,
  indicatorCap="round",
  label=`Loading...`,
  labelColor=`#333`,
  spinnerMode=false,
  spinnerSpeed=1,
}: Props) => {
  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((100 - progress) / 100);
  let hideLabel = size < 100 || !label.length || spinnerMode ? true : false;
  return (
    <div
      className={styles["loader--wrapper"]}
      style={{ width: size, height: size }}
    >
      <svg className={styles["loader"]} style={{ width: size, height: size }}>
        <circle
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={trackColor}
          strokeWidth={trackWidth}
        />
        <circle
          style={{ animationDuration: `${spinnerSpeed * 1000}` }}
          cx={center}
          cy={center}
          fill="transparent"
          r={radius}
          stroke={indicatorColor}
          strokeWidth={indicatorWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
          strokeLinecap={indicatorCap}
        />
      </svg>
      {!hideLabel && (
        <div className={styles["loader--label"]} style={{ color: labelColor }}>
          <span className={styles["loader--label__loading"]}>{label}</span>

          {!spinnerMode && (
            <span className={styles["loader--label__progress"]}>
              {`${progress}%`}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
