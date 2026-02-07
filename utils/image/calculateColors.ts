import { rgbToDecimal } from "./colorConvertors";

export function getDecimalColorsFromCanvas(canvas: HTMLCanvasElement): number[][] {
  const result: number[][] = []
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return []

  const width = canvas.width
  const height = canvas.height
  const imageData = context.getImageData(0, 0, width, height).data

  for (let y = 0; y < height; y++) {
    const row: number[] = []
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4
      const colorDecimal = rgbToDecimal(imageData[index]!, imageData[index + 1]!, imageData[index + 2]!)
      row.push(colorDecimal)
    }
    result.push(row)
  }
  return result
}

/**
 * calculates closest colors in given canvas using given available colors
 * Optimized to use single getImageData and numeric comparisons
 */
export function calculateClosestColorsInCanvas(canvas: HTMLCanvasElement, availableColors: string[]): string[][] {
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return []

  const width = canvas.width
  const height = canvas.height
  const imageData = context.getImageData(0, 0, width, height).data

  // Pre-calculate RGB values for available colors
  const colorMap = availableColors.map(hex => {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return { hex, r, g, b };
  });

  const result: string[][] = []

  for (let y = 0; y < height; y++) {
    const row: string[] = []
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4
      const r = imageData[index]!
      const g = imageData[index + 1]!
      const b = imageData[index + 2]!

      let minDist = Infinity
      let closestHex = availableColors[0]!

      for (const color of colorMap) {
        const dist = Math.abs(color.r - r) + Math.abs(color.g - g) + Math.abs(color.b - b)
        if (dist < minDist) {
          minDist = dist
          closestHex = color.hex
          if (minDist === 0) break // Exact match found
        }
      }

      row.push(closestHex)
    }
    result.push(row)
  }
  return result
}


