
function componentToHex(c: number): string {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}



/**
 * Converts RGB values to hex string
 * @param red 0-255
 * @param green 0-255
 * @param blue 0-255
 * RGB = (R\*65536)+(G\*256)+B , (when R is RED, G is GREEN and B is BLUE)
Calculation examples
White RGB Color
White RGB code = 255\*65536+255\*256+255 = #FFFFFF

Blue RGB Color
Blue RGB code = 0\*65536+0\*256+255 = #0000FF

Red RGB Color
Red RGB code = 255\*65536+0\*256+0 = #FF0000
 * @returns Hex value of color
 */
export default function rgbToHex(red: number, green: number, blue: number): string {
  if (red > 255 || red < 0 || green > 255 || green < 0 || blue > 255 || blue < 0) {
    throw new Error("Invalid RGB values");
  }
  return componentToHex(red) + componentToHex(green) + componentToHex(blue);
}

