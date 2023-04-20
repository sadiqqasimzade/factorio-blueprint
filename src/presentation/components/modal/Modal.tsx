import React, { useEffect, memo, useRef } from "react";
import styles from "./Modal.module.scss";

type Props = {
  setPixelArtSize: React.Dispatch<React.SetStateAction<{ width: number, height: number } | undefined>>
  maxW: number;
  maxH: number;
  minW: number;
  minH: number;
  setSkipInput: React.Dispatch<React.SetStateAction<boolean>>;
  skipInput: boolean;
}



export default memo(function Modal({ setSkipInput, skipInput, setPixelArtSize, maxW, maxH, minW, minH }: Props) {
  //Keypress eventlistener
  useEffect(() => {
    function handekeydown(e: KeyboardEvent) {
      if (e.key == "Escape") {
        setSkipInput(false);
        window.removeEventListener("keydown", handekeydown);
      }
    }
    if (skipInput) {
      window.addEventListener("keydown", handekeydown);
    } else {
      window.removeEventListener("keydown", handekeydown);
    }
    return () => window.removeEventListener("keydown", handekeydown);
  }, [skipInput]);


  const widthRef = useRef<HTMLInputElement>(null)
  const heightRef = useRef<HTMLInputElement>(null)
  return (
    <div
      className={`${styles["modal--container"]} `}
      onClick={() => {
        setSkipInput(false);
      }}
    >
      <div
        className={styles["modal--inner"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles["modal--content"]}>
          <div className={styles["modal--input--group"]}>
            <input type="number" placeholder="width" min={minW} max={maxW} ref={widthRef} className={styles["modal--input"]} onChange={(e) => {
              parseInt(e.target.value) > maxW ?
                e.target.value = maxW.toString() :
                parseInt(e.target.value) < minW ?
                  e.target.value = minW.toString() :
                  e.target.value = Math.floor(parseInt(e.target.value)).toString()

            }} />
            <p>max:{maxW} min:{minW}</p>
          </div>
          <div className={styles["modal--input--group"]}>
            <input type="number" placeholder="height" min={minH} max={maxH} ref={heightRef} className={styles["modal--input"]} onChange={(e) => {
              parseInt(e.target.value) > maxH ?
                e.target.value = maxH.toString() :
                parseInt(e.target.value) < minH ?
                  e.target.value = minH.toString() :
                  e.target.value = parseInt(e.target.value).toString()
            }} />
            <p>max:{maxH} min:{minH}</p>
          </div>
          <div>
            <button type="button" className="button button__dark w-100" onClick={
              () => {
                let w = parseInt(widthRef.current!.value)
                let h = parseInt(heightRef.current!.value)
                if (w <= maxW && h <= maxH && w >= minW && h >= minH) {
                  setPixelArtSize({
                    width: parseInt(widthRef.current!.value),
                    height: parseInt(heightRef.current!.value)
                  });
                }
                else {
                  alert("Please enter a valid size");
                }

              }
            }>Submit</button>
          </div>

        </div>
      </div>
    </div>
  )
})


