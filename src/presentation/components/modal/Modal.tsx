import React, { useEffect, memo, useRef } from "react";
import styles from "./Modal.module.scss";

type Props = {
  children: React.ReactChild;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
} | {
  children: React.ReactChild;
  setIsActive: undefined;
  isActive: undefined;
}



export default memo(function Modal({ setIsActive: setSkipInput, isActive: skipInput, children }: Props) {
  //Keypress eventlistener
  if (skipInput !== undefined && setSkipInput !== undefined) {
    useEffect(() => {
      function handekeydown(e: KeyboardEvent) {
        if (e.key == "Escape") {
          setSkipInput!(false);
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
  }



  return (
    <div
      className={`${styles["modal--container"]} `}
      onClick={() => {
        if (skipInput !== undefined) {
          setSkipInput(false);
        }
      }}
    >
      <div
        className={styles["modal--inner"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles["modal--content"]}>

          {children}
        </div>
      </div>
    </div>
  )
})


