import findClosestColor from "./findClosestColor";
import rgbToDecimal from "./rgbToDecimal";


// export function calculateColorsForLamps(imageColors: string[][]): number[][] {

//   let col: number[] = [];
//   const result: number[][] = [];

//   for (let i = 0; i < imageColors.length; i++) {
//     for (let j = 0; j < imageColors[0].length; j++) {
//       col.push(parseInt(imageColors[j][i], 16));
//     }
//     result.push(col);
//     col = [];
//   }

//   return result;
// }


export function calculateColorsForLamps(canvas: HTMLCanvasElement): number[][] {
  const result:number[][] = []
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
export function calculateColorsInCanvas(canvas: HTMLCanvasElement, availableColors: string[]): string[][] {
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