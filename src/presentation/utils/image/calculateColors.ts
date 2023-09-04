import { color_priority, lampColors } from "../../../domain/entity/stuctures/Enums";
import findClosestColor from "./findClosestColor";
import rgbToHex from "./rgbToHex";

/**
 *
 * @param imageColors result of calculateColors function
 */
export function calculateColorsForLamps(imageColors: string[][]): number[][][] {

  var color_indexes: number[][] = [];
  let part20: number[] = [];
  let result: number[][][] = [];
  let step = Math.ceil(imageColors[0].length / 20);
  for (let i = 0; i < imageColors.length; i++) {
    color_indexes = [];
    for (let count = 0; count < step; count++) {
      part20 = [];
      for (let j = 0; j < imageColors[0].length; j += step) {

        part20.push(-(color_priority.indexOf(lampColors[imageColors[i][j]]) + 1));
      }
      color_indexes.push(part20);
    }
    result.push(color_indexes);
  }
  return result;
}

/**
 * calculates closest colors in given canvas using given available colors
 * @param canvas Html Canvas Element
 * @param availableColors array of color strings
 * @returns string array of color arrays for cols
 */
export function calculateColorsInCanvas(canvas: HTMLCanvasElement, availableColors: string[]): string[][] {
  var context = canvas.getContext("2d", { willReadFrequently: true });
  let result = []
  for (let i = 0; i < canvas.width; i++) {
    let col = []
    for (let j = 0; j < canvas.height; j++) {
      let data = context!.getImageData(i, j, 1, 1).data;
      let hex = rgbToHex(data[0], data[1], data[2]);
      hex = hex.length < 6 ? hex.replace(/(.)/g, "$1$1") : hex;
      var match = findClosestColor(availableColors, hex);
      col.push(match)
    }
    result.push(col)
  }
  return result
}