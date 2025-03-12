import Blueprint from "@/src/classes/Blueprint";
import BpIcon from "@/src/classes/BpIcon";
import BpTile from "@/src/classes/BpTile";
import { Signals } from "@/src/consts/signalsEnum";
import { TileNames } from "@/src/consts/enums";

export default function imgToPlatformBlueprintConvertor(pixelArt: number[][]): Blueprint {
  var tiles: BpTile[] = [];

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
