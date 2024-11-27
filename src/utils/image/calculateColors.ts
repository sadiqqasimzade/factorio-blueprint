import findClosestColor from "./findClosestColor";
import rgbToDecimal from "./rgbToDecimal";


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
      let colorDecimal = rgbToDecimal(data[0], data[1], data[2]);
      const match = findClosestColor(availableColors, colorDecimal);
      col.push(match)
    }
    result.push(col)
  }
  return result

}


export function getHexColorsInCanvas(canvas: HTMLCanvasElement): string[][] {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  const result = []
  for (let i = 0; i < canvas.width; i++) {
    const col = []
    for (let j = 0; j < canvas.height; j++) {
      const data = context!.getImageData(i, j, 1, 1).data;
      let colorDecimal = rgbToDecimal(data[0], data[1], data[2]);
      col.push(colorDecimal.toString(16).padStart(6, '0'))
    }
    result.push(col)
  }
  return result

}