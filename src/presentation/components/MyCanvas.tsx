import React, { useRef } from "react";
import { color_priority, signals } from "../../domain/entity/stuctures/Enums";
import { TBlueprint_Signal } from "../../domain/entity/stuctures/TBlueprint_Signal";
import Encode_Blueprint from "../utils/convertors/Encoder";
import Generate from "./Generate";

type Props = {};

export const MyCanvas = (props: Props) => {
  const mycanvasRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const errormessageRef = useRef<HTMLParagraphElement>(null);

  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    var files = inputRef.current.files;
    errormessageRef.current.innerText = "";
    if (files.length < 1) {
      errormessageRef.current.innerText = "Must insert file";
      return;
    }
    if (!files[0].type.includes("image/")) {
      errormessageRef.current.innerText = "Must be img";
      return;
    }
    var img = new Image();
    img.src = window.URL.createObjectURL(files[0]);
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d", { willReadFrequently: true });
    img.onload = () => {
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      context.drawImage(img, 0, 0);
      errormessageRef.current.appendChild(canvas);

      //#region rgb to hex convertor
      function componentToHex(c: number): string {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }

      function rgbToHex(r: number, g: number, b: number): string {
        return componentToHex(r) + componentToHex(g) + componentToHex(b);
      }
      //#endregion
      //#region findclosest
      const findclosest = (function () {
        function dist(s: string, t: string): number {
          if (!s.length || !t.length) return 0;
          return (
            dist(s.slice(2), t.slice(2)) +
            Math.abs(parseInt(s.slice(0, 2), 16) - parseInt(t.slice(0, 2), 16))
          );
        }

        return function (colorarr: string[], hexstr: string) {
          var min = 0xffffff;
          var best, current, i;
          for (i = 0; i < colorarr.length; i++) {
            current = dist(colorarr[i], hexstr);
            if (current < min) {
              min = current;
              best = colorarr[i];
            }
          }
          return best;
        };
      })();

      var colors: { [color_hex: string]: TBlueprint_Signal } = {
        ff0000: signals.signal_red,
        "0000FF": signals.signal_blue,
        FFFFFF: signals.signal_white,
        FFFF00: signals.signal_yellow,
        "008000": signals.signal_green,
        ffc0cb: signals.signal_pink,
        "30d5c8": signals.signal_cyan,
      };

      // convert the `colors`-object to an array
      var colorsArr: string[] = [];
      for (var key in colors) {
        colorsArr.push(key);
      }
      //#endregion

      console.log(canvas.width);
      console.log(canvas.height);
      var color_indexes: number[][] = [];
      let part20: number[] = [];
      let result: number[][][] = [];
      let step=Math.ceil(canvas.height / 20)
      for (let i = 0; i < canvas.width; i++) {
        color_indexes=[]
        for (let count = 0; count < step; count++) {
          part20 = [];
          for (let j = 0; j < canvas.height; j +=step) {
            //i w
            //j h
 
            let data = context.getImageData(i, j, 1, 1).data;
            let hex = rgbToHex(data[0], data[1], data[2]);
            hex = hex.length < 6 ? hex.replace(/(.)/g, "$1$1") : hex;

            var match = findclosest(colorsArr, hex);
            part20.push(-(color_priority.indexOf(colors[match]) + 1));
            // if (part20.length == 20) {
            //   color_indexes.push(part20);
            //   part20 = [];
            // }
          }
          color_indexes.push(part20);
        }
        result.push(color_indexes);
      }
      console.log(result);
      var elem = errormessageRef.current as HTMLParagraphElement;
      elem.innerHTML = Encode_Blueprint({
        blueprint: Generate(canvas.width, canvas.height, result),
      });
      // elem.innerHTML = JSON.stringify(
      //   Generate(canvas.width, canvas.height, result),
      //   null,
      //   2
      // );
    };
  }

  function handleInputChange(
    e: React.InputHTMLAttributes<HTMLInputElement>
  ): void {
    // errormessageRef.current.innerText;
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
      <button type="submit" onClick={handleClick}>
        Click me
      </button>
      <p
        ref={errormessageRef}
        onClick={(e) => {
          navigator.clipboard.writeText(e.target.innerText);
        }}
      ></p>
    </>
  );
};
