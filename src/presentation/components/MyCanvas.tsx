import React, { useRef } from "react";

type Props = {};

export const MyCanvas = (props: Props) => {
  const mycanvasRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const errormessageRef = useRef<HTMLParagraphElement>(null)

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.preventDefault()
    errormessageRef.current.innerText=''
    if(inputRef.current.files.length<1){
      errormessageRef.current.innerText='Must insert file'
    }
    console.log(inputRef.current.files) 
    console.log("Submit requested");
  }

  function handleInputChange(
    e:React.InputHTMLAttributes<HTMLInputElement>
  ): void {
    errormessageRef.current.innerText
  }

  return (
    <>
      <canvas ref={mycanvasRef}></canvas>
      <label htmlFor="image_uploads">Input</label>
      <input
        type={"file"}
        accept="image/*"
        id="image_uploads"
        name="image_uploads"
        onChange={handleInputChange}
        ref={inputRef}
      ></input>
      <button type="submit" onClick={handleClick}>Click me</button>
      <p ref={errormessageRef}></p>
    </>
  );
};
