/**
RGB = (R\*65536)+(G\*256)+B , (when R is RED, G is GREEN and B is BLUE)
Calculation examples
White RGB Color
White RGB code = 255\*65536+255\*256+255 = #FFFFFF

Blue RGB Color
Blue RGB code = 0\*65536+0\*256+255 = #0000FF

Red RGB Color
Red RGB code = 255\*65536+0\*256+0 = #FF0000
*/
export default function findClosestColor(
  colorarr: string[],
  hexstr: string
): string {
  var min = 0xffffff;
  var best, current, i;
  for (i = 0; i < colorarr.length; i++) {
    current = dist(colorarr[i], hexstr);
    if (current < min) {
      min = current;
      best = colorarr[i];
    }
  }
  return best;
}

function dist(hexstring: string, t: string): number {
  if (!hexstring.length || !t.length) return 0;
  return (
    dist(hexstring.slice(2), t.slice(2)) +
    Math.abs(parseInt(hexstring.slice(0, 2), 16) - parseInt(t.slice(0, 2), 16))
  );
}
