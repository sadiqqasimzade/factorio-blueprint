import React, { useEffect, useRef, useState } from "react";
import validateFiles from "../../utils/handlers/validateFiles";
import styles from "./FileDragAndDrop.module.scss";
type Props = {
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement>>;
};
const FileDragAndDrop = ({ setImage }: Props) => {
  //Refs
  const inputRef: React.MutableRefObject<HTMLInputElement> = useRef(null);
  const resultRef: React.MutableRefObject<HTMLParagraphElement> = useRef(null);
  const dragdropareaRef: React.MutableRefObject<HTMLDivElement> = useRef(null);
  const dragdroptitleRef: React.MutableRefObject<HTMLParagraphElement> =
    useRef(null);

  //#region handlers
  function handleDragIn(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 1) {
      dragdroptitleRef.current.innerText = "Only first image will be used";
      dragdropareaRef.current.classList.add(styles["dragdrop--warning"]);
    } else if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      dragdropareaRef.current.classList.add(styles["dragdrop--info"]);
    }
  }
  function handleDragOut(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    dragdropareaRef.current.classList.remove(
      styles["dragdrop--warning"],
      styles["dragdrop--info"]
    );
    dragdroptitleRef.current.innerText = "Drop Image file here,or click";
  }
  function handleDivClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    inputRef.current.click();
  }
  //#endregion
  //#region Input
  function handleDragDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (e.dataTransfer.items) {
      let result = validateFiles(e.dataTransfer.files);
      if (typeof result == "string") {
        resultRef.current.innerText = result;
      } else {
        var img = new Image();
        img.src = window.URL.createObjectURL(result);
        img.onload = () => {
          setImage(img);
        };
      }
    }
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    if (e.target.files) {
      let result = validateFiles(e.target.files);
      if (typeof result == "string") {
        resultRef.current.innerText = result;
      } else {
        var img = new Image();
        img.src = window.URL.createObjectURL(result);
        img.onload = () => {
          setImage(img);
        };
      }
    }
  }
  //#endregion

  return (
    <div>
      <input
        type={"file"}
        className={styles["dragdrop--input"]}
        ref={inputRef}
        accept="image/*"
        onChange={handleInputChange}
      ></input>
      <div className={styles["dragdrop"]} ref={dragdropareaRef}>
        <div
          className={styles["dragdrop--area"]}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDrop={handleDragDrop}
          onClick={handleDivClick}
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        ></div>
        <p ref={dragdroptitleRef} className={styles["dragdrop--title"]}>
          Drop Image file here,or click
        </p>
      </div>
      <p ref={resultRef} className={styles["dragdrop--result"]}></p>
    </div>
  );
};

export default FileDragAndDrop;
