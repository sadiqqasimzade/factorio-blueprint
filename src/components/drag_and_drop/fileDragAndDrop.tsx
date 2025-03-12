import SettingsContext from "@/src/contexts/settings/settingsContext";
import validateFiles from "@/src/utils/handlers/validateFiles";
import React, { useContext, useRef } from "react";
import { toast } from "react-toastify";


type Props = {
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>;
};

const cssDragDropAreaError = "!bg-red-600"
const cssDragDropAreaSuccess = "!bg-purple-600"
const cssDragDropAreaNormal = "bg-purple-900"
const fileType = "image"

export default function FileDragAndDrop({ setImage }: Props) {
  //Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDropAreaRef = useRef<HTMLDivElement>(null);
  const dragDropTitleRef = useRef<HTMLParagraphElement>(null);

  const { setSkipInput, convertTo } = useContext(SettingsContext);
  function resetDragDropArea() {
    dragDropAreaRef.current!.classList.remove(cssDragDropAreaError, cssDragDropAreaSuccess);
    dragDropTitleRef.current!.innerText = `Drop ${fileType} file here,or click`;
  }


  //#region handlers
  function handleDragIn(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    resetDragDropArea();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && e.dataTransfer.items[0].kind === "file" && e.dataTransfer.items[0].type.includes(fileType)) {
      if (e.dataTransfer.items.length > 1) {
        dragDropTitleRef.current!.innerText = `Only first ${fileType} will be used`;
      }
      dragDropAreaRef.current!.classList.add(cssDragDropAreaSuccess);
    } else {
      dragDropTitleRef.current!.innerText = "File must be " + fileType;
      dragDropAreaRef.current!.classList.add(cssDragDropAreaError);
    }
  }
  function handleDragOut(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    resetDragDropArea();
  }
  function handleDragDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (e.dataTransfer.items) {
      const result = validateFiles(e.dataTransfer.files, fileType);
      if (typeof result === "string") {
        toast.error(result);
      }
      else {
        var img = new Image();
        img.src = window.URL.createObjectURL(result);
        img.onload = () => setImage(img);
      }
    }
  }
  //#endregion

  //#region Input
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
    e.preventDefault();
    if (e.target.files) {
      const result = validateFiles(e.target.files, fileType);
      if (typeof result === "string") {
        toast.error(result);
      }
      else {
        const img = new Image();
        img.src = window.URL.createObjectURL(result);
        img.onload = () => setImage(img);
      }
    }
  }
  //#endregion

  return (
    <div>
      <input
        type="file"
        className="hidden"
        ref={inputRef}
        accept={fileType + '/*'}
        onChange={handleInputChange}
      ></input>
      <div className={"h-52 border-2 mt-4 border-dashed border-yellow-400 grid place-items-center relative cursor-pointer " + cssDragDropAreaNormal} ref={dragDropAreaRef}>
        <div
          className="absolute w-full h-full"
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDrop={handleDragDrop}
          onClick={() => { inputRef.current!.click(); }}
          onDragOver={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        ></div>
        <p ref={dragDropTitleRef} className="font-bold text-center text-xl">
          Drop Image file here, or click
        </p>
      </div>
      {convertTo === 'tile' && <button className="p-2 bg-blue-400 hover:bg-blue-600 text-black hover:text-white transition-colors mt-5 rounded-md" onClick={() => {
        setSkipInput(true);
      }}>Create pixel art without image</button>}
      {convertTo === 'platform' && <p className="p-2">Any pixel that's not black or transparent will become a space platform</p>}

    </div>
  );
}
