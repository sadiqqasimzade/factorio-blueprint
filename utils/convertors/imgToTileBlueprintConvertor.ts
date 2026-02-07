import Blueprint from "@/classes/Blueprint";
import BpIcon from "@/classes/BpIcon";
import BpTile from "@/classes/BpTile";
import { tileColors } from "@/consts/colorsEnum";
import { Signals } from "@/consts/signalsEnum";

export default function ImgToBrickBlueprintConvertor(pixelArt: string[][]): Blueprint {
  const tiles: BpTile[] = [];



  for (let i = 0; i < pixelArt.length; i++) {
    for (let j = 0; j < pixelArt[i]!.length; j++) {
      tiles.push(new BpTile(j, i, tileColors[pixelArt[i]![j]!]!));
    }
  }
  return new Blueprint(
    [new BpIcon(Signals.WHITE, 1)],
    [],
    tiles
  );
}
