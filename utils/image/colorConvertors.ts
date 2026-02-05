/**
 * Converts RGB values to hex string
 * @param red 0-255
 * @param green 0-255
 * @param blue 0-255
 * RGB = (R\*65536)+(G\*256)+B , (when R is RED, G is GREEN and B is BLUE)
Calculation examples
White RGB Color
White RGB code = 255\*65536+255\*256+255 

Blue RGB Color
Blue RGB code = 0\*65536+0\*256+255 

Red RGB Color
Red RGB code = 255\*65536+0\*256+0 
 * @returns Decimal value of color
 */
export function rgbToDecimal(red: number, green: number, blue: number): number {
  if (red > 255 || red < 0 || green > 255 || green < 0 || blue > 255 || blue < 0) {
    throw new Error("Invalid RGB values");
  }
  return red * 65536 + green * 256 + blue;
}

export function rgbToHex(red: number, green: number, blue: number): string {
  if (red > 255 || red < 0 || green > 255 || green < 0 || blue > 255 || blue < 0) {
    throw new Error("Invalid RGB values");
  }
  return componentToHex(red) + componentToHex(green) + componentToHex(blue);
}

function componentToHex(c: number): string {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function hexToDecimal(hexString1: string, hexString2: string): number {
  if (!hexString1.length || !hexString2.length) return 0;
  
  // Remove # prefix if present
  const cleanHex1 = hexString1.startsWith('#') ? hexString1.slice(1) : hexString1;
  const cleanHex2 = hexString2.startsWith('#') ? hexString2.slice(1) : hexString2;
  
  // Calculate Euclidean distance in RGB space
  const r1 = parseInt(cleanHex1.slice(0, 2), 16);
  const g1 = parseInt(cleanHex1.slice(2, 4), 16);
  const b1 = parseInt(cleanHex1.slice(4, 6), 16);
  
  const r2 = parseInt(cleanHex2.slice(0, 2), 16);
  const g2 = parseInt(cleanHex2.slice(2, 4), 16);
  const b2 = parseInt(cleanHex2.slice(4, 6), 16);
  
  return Math.sqrt(
    Math.pow(r1 - r2, 2) + 
    Math.pow(g1 - g2, 2) + 
    Math.pow(b1 - b2, 2)
  );
}