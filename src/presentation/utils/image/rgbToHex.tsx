function componentToHex(c: number): string {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

/**
 * Converts RGB values to hex string
 * @param red 
 * @param green 
 * @param blue 
 * @returns 
 */
export default function rgbToHex(red: number, green: number, blue: number): string {
  return componentToHex(red) + componentToHex(green) + componentToHex(blue);
}
