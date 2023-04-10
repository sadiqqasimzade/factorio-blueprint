import {
  color_priority,
  colorsArr,
  colors,
} from "../../../domain/entity/stuctures/Enums";
import findClosestColor from "./findClosestColor";
import rgbToHex from "./rgbToHex";

/**
 *
 * @param canvas
 */
export default function calculateColors(
  canvas: HTMLCanvasElement
): number[][][] {
  var context = canvas.getContext("2d", { willReadFrequently: true });

  

  // convert the `colors`-object to an array

  var color_indexes: number[][] = [];
  let part20: number[] = [];
  let result: number[][][] = [];
  let step = Math.ceil(canvas.height / 20);
  for (let i = 0; i < canvas.width; i++) {
    color_indexes = [];
    for (let count = 0; count < step; count++) {
      part20 = [];
      for (let j = 0; j < canvas.height; j += step) {
        //i width j height
        let data = context.getImageData(i, j, 1, 1).data;
        let hex = rgbToHex(data[0], data[1], data[2]);
        hex = hex.length < 6 ? hex.replace(/(.)/g, "$1$1") : hex;

        var match = findClosestColor(colorsArr, hex);
        part20.push(-(color_priority.indexOf(colors[match]) + 1));
      }
      color_indexes.push(part20);
    }
    result.push(color_indexes);
  }
  return result;
}
