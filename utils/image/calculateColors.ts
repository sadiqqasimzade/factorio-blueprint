import { hexToDecimal, rgbToDecimal } from "./colorConvertors";



export function getDecimalColorsFromCanvas(canvas: HTMLCanvasElement): number[][] {
  const result: number[][] = []
  const context = canvas.getContext("2d", { willReadFrequently: true });

  for (let i = 0; i < canvas.width; i++) {
    const col = []
    for (let j = 0; j < canvas.height; j++) {
      const data = context!.getImageData(i, j, 1, 1).data;
      const colorDecimal = rgbToDecimal(data[0]!, data[1]!, data[2]!);

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
  
  // Pre-process available colors for faster lookup
  const colorCache = new Map<string, string>();
  const rgbColors = availableColors.map(hex => ({
    hex: hex,
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16)
  }));
  
  // Get all pixel data at once - much more efficient than individual getImageData calls
  const imageData = context!.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  const result: string[][] = [];
  
  // Process pixels row by row
  for (let y = 0; y < canvas.height; y++) {
    const row: string[] = [];
    for (let x = 0; x < canvas.width; x++) {
      const idx = (y * canvas.width + x) * 4;
      const r = data[idx]!;
      const g = data[idx + 1]!;
      const b = data[idx + 2]!;
      
      const colorKey = `${r},${g},${b}`;
      
      // Check cache first
      if (colorCache.has(colorKey)) {
        row.push(colorCache.get(colorKey)!);
        continue;
      }
      
      // Find closest color
      let minDistance = Infinity;
      let bestMatch = rgbColors[0]?.hex || '000000';
      
      for (const color of rgbColors) {
        const dr = r - color.r;
        const dg = g - color.g;
        const db = b - color.b;
        const distance = dr * dr + dg * dg + db * db; // Squared Euclidean distance
        
        if (distance < minDistance) {
          minDistance = distance;
          bestMatch = color.hex;
        }
      }
      
      colorCache.set(colorKey, bestMatch);
      row.push(bestMatch);
    }
    result.push(row);
  }
  
  return result;
}

/**
  @param colorarr - array of available hex strings
  @param hexstr - hex string to find closest match from colorarr
  @returns closest match from colorarr as value
  @description Converts hex string to decimal 
*/
export function findClosestColor(colorarr: string[], hexstr: string): string {
  let min = 0xffffff;
  let best = colorarr[0]!
  let current, i;
  for (i = 0; i < colorarr.length; i++) {
    current = hexToDecimal(colorarr[i]!, hexstr);
    if (current < min) {
      min = current;
      best = colorarr[i]!;
    }
  }
  return best;
}

