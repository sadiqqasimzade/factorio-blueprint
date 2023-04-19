/**
  @param colorarr - array of available hex strings
  @param hexstr - hex string to find closest match from colorarr
  @returns closest match from colorarr as value
  @description Converts hex string to decimal 
*/
export default function findClosestColor(
  colorarr: string[],
  hexstr: string
): string {
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

function hexToDecimal(hexString1: string, hexString2: string): number {
  if (!hexString1.length || !hexString2.length) return 0;
  return (
    hexToDecimal(hexString1.slice(2), hexString2.slice(2)) +
    Math.abs(parseInt(hexString1.slice(0, 2), 16) - parseInt(hexString2.slice(0, 2), 16))

  );
}
