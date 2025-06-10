import Blueprint from "@/classes/Blueprint";
import BpIcon from "@/classes/BpIcon";
import BpTile from "@/classes/BpTile";
import { Signals } from "@/consts/signalsEnum";
import { TileNames } from "@/consts/enums";

export default function imgToPlatformBlueprintConvertor(pixelArt: number[][]): Blueprint {
  const tiles: BpTile[] = [];

  for (let i = 0; i < pixelArt[0].length; i++) {
    for (let j = 0; j < pixelArt.length; j++) {
      if (pixelArt[j][i] != 0) {
        tiles.push(new BpTile(j, i, TileNames.SPACE_PLATFORM_FOUNDATION));
      }
    }
  }
  return new Blueprint(
    [new BpIcon(Signals.SPACE_SCIENCE_PACK, 1)],
    [],
    tiles
  );
}
