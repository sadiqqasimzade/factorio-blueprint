/**
  @param colorarr - array of available hex strings
  @param hexstr - hex string to find closest match from colorarr
  @returns closest match from colorarr as value
  @description Converts hex string to decimal 
*/
export default function findClosestColor(colorarr: string[], colorDecimal: number): string {
  var min = 0
  var best = colorarr[0]
  var current, i;
  for (i = 0; i < colorarr.length; i++) {
    current = colorDecimal - parseInt(colorarr[i], 16);
    if (current < min) {
      min = current;
      best = colorarr[i];
    }
  }
  return best;
}


