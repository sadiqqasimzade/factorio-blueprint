import { hexToDecimal, rgbToDecimal, rgbToHex } from "./colorConvertors";



export function getDecimalColorsFromCanvas(canvas: HTMLCanvasElement): number[][] {
  const result: number[][] = []
  const context = canvas.getContext("2d", { willReadFrequently: true });

  for (let i = 0; i < canvas.width; i++) {
    const col = []
    for (let j = 0; j < canvas.height; j++) {
      const data = context!.getImageData(i, j, 1, 1).data;
      let colorDecimal = rgbToDecimal(data[0], data[1], data[2]);

      col.push(colorDecimal)
    }
    result.push(col)
  }
  return result
}

/**
 * calculates closest colors in given canvas using given available colors
 * @param canvas Html Canvas Element
 * @param availableColors array of color strings
 * @returns string array of color arrays for cols
 */
export function calculateClosestColorsInCanvas(canvas: HTMLCanvasElement, availableColors: string[]): string[][] {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const result = []
  for (let i = 0; i < canvas.width; i++) {
    const col = []
    for (let j = 0; j < canvas.height; j++) {
      const data = context!.getImageData(i, j, 1, 1).data;
      let colorHex = rgbToHex(data[0], data[1], data[2]);
      const match = findClosestColor(availableColors, colorHex);
      col.push(match)
    }
    result.push(col)
  }
  return result

}

/**
  @param colorarr - array of available hex strings
  @param hexstr - hex string to find closest match from colorarr
  @returns closest match from colorarr as value
  @description Converts hex string to decimal 
*/
export function findClosestColor(colorarr: string[], hexstr: string): string {
  var min = 0xffffff;
  var best = colorarr[0]
  var current, i;
  for (i = 0; i < colorarr.length; i++) {
    current = hexToDecimal(colorarr[i], hexstr);
    if (current < min) {
      min = current;
      best = colorarr[i];
    }
  }
  return best;
}

