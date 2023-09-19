import validateFiles from "@/src/utils/handlers/validateFiles";
import { useRef } from "react";


type Props = {
  setImage: React.Dispatch<React.SetStateAction<HTMLImageElement | undefined>>;
  setSkipInput: React.Dispatch<React.SetStateAction<boolean>>
};


export default function FileDragAndDrop({ setImage, setSkipInput }: Props) {
  //Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLParagraphElement>(null);
  const dragdropareaRef = useRef<HTMLDivElement>(null);
  const dragdroptitleRef = useRef<HTMLParagraphElement>(null);

  //#region handlers
  function handleDragIn(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0 && e.dataTransfer.items[0].kind === "file" && e.dataTransfer.items[0].type.includes("image")) {
      if (e.dataTransfer.items.length > 1) {
        dragdroptitleRef.current!.innerText = "Only first image will be used";
      }
      dragdropareaRef.current!.classList.add('bg-purple-600');
    } else {
      dragdroptitleRef.current!.innerText = "File must be Image";
      dragdropareaRef.current!.classList.add('bg-red-600');
    }
  }
  function handleDragOut(e: React.DragEvent<HTMLDivElement>): void {
    e.preventDefault();
    dragdropareaRef.current!.classList.remove('bg-red-600', 'bg-purple-600');
    dragdroptitleRef.current!.innerText = "Drop Image file here,or click";
  }
  //#endregion
  //#region Input
  function handleDragDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (e.dataTransfer.items) {
      const result = validateFiles(e.dataTransfer.files);
      if (typeof result === "string") {
        resultRef.current!.innerText = result;
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
      const result = validateFiles(e.target.files);
      if (typeof result === "string") {
        resultRef.current!.innerText = result;
      } else {
        const img = new Image();
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
        type="file"
        className="hidden"
        ref={inputRef}
        accept="image/*"
        onChange={handleInputChange}
      ></input>
      <div className="h-52 border-2 mt-4 border-dashed border-yellow-400 bg-purple-900 grid place-items-center relative" ref={dragdropareaRef}>
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
        <p ref={dragdroptitleRef} className="font-bold text-center text-xl">
          Drop Image file here,or click
        </p>
      </div>
      <p ref={resultRef} className="text-red-600 text-xl font-bold"></p>
      <button className="p-2 bg-blue-400 hover:bg-blue-600 text-black hover:text-white transition-colors mt-5 rounded-md" onClick={() => {
        setSkipInput(true);
      }}>Create pixel art without image</button>
    </div>
  );
}
