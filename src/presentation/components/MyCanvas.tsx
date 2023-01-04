import React, { useRef } from "react";

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
    var context = canvas.getContext("2d");
    img.onload = () => {
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      context.drawImage(img, 0, 0);
      errormessageRef.current.appendChild(canvas);
      var hexed: string[] = [];
      function componentToHex(c: number): string {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }

      function rgbToHex(r: number, g: number, b: number): string {
        return componentToHex(r) + componentToHex(g) + componentToHex(b);
      }
      for (let i = 0; i < canvas.height; i++) {
        for (let j = 0; j < canvas.width; j++) {
          
          let data = context.getImageData(j, i, 1, 1).data;
          hexed.push(rgbToHex(data[0], data[1], data[2]));
        }
      }

      const findclosest = (function () {
        function dist(s:string, t:string):number {
          if (!s.length || !t.length) return 0;
          return (
            dist(s.slice(2), t.slice(2)) +
            Math.abs(parseInt(s.slice(0, 2), 16) - parseInt(t.slice(0, 2), 16))
          );
        }

        return function (colorarr:string[], hexstr:string) {
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

      var colors:{[color_hex:string]:string} = {
        'ff0000': "red",
        "0000FF": "blue",
        'FFFFFF': "white",
        'FFFF00': "yellow",
        "008000": "green",
        'ffc0cb': "rozoviy",
        "30d5c8": "biruzoviy",
      };

      // convert the `colors`-object to an array
      var colorsArr: string[] = [];
      for (var key in colors) {
        colorsArr.push(key);
      }

      for (let i = 0; i < hexed.length; i++) {
        var hex: string = hexed[i];
        // convert 3 digits to 6
        hex = hex.length < 6 ? hex.replace(/(.)/g, "$1$1") : hex;

        var match = findclosest(colorsArr, hex);

        console.log(colors[match]);
      }
    };
  }

  function handleInputChange(
    e: React.InputHTMLAttributes<HTMLInputElement>
  ): void {
    errormessageRef.current.innerText;
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
      <p ref={errormessageRef}></p>
    </>
  );
};
