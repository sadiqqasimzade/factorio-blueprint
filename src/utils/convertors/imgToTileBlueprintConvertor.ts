import Blueprint from "@/src/classes/Blueprint";
import BpIcon from "@/src/classes/BpIcon";
import BpTile from "@/src/classes/BpTile";
import { tileColors } from "@/src/consts/colorsEnum";
import { Signals } from "@/src/consts/signalsEnum";

export default function ImgToBrickBlueprintConvertor(pixelArt: string[][]): Blueprint {
  var tiles: BpTile[] = [];



  for (let i = 0; i < pixelArt[0].length; i++) {
    for (let j = 0; j < pixelArt.length; j++) {
      tiles.push(new BpTile(j, i, tileColors[pixelArt[j][i]]));
    }
  }
  return new Blueprint(
    [new BpIcon(Signals.WHITE, 1)],
    [],
    tiles
  );
}
