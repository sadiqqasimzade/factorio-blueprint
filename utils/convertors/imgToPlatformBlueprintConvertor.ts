import Blueprint from "@/classes/Blueprint";
import BpIcon from "@/classes/BpIcon";
import BpTile from "@/classes/BpTile";
import { TileNames } from "@/consts/enums";
import { Signals } from "@/consts/signalsEnum";

export default function imgToPlatformBlueprintConvertor(pixelArt: number[][]): Blueprint {
  const tiles: BpTile[] = [];

  for (let y = 0; y < pixelArt.length; y++) {
    for (let x = 0; x < pixelArt[y]!.length; x++) {
      if (pixelArt[y]![x] != 0) {
        tiles.push(new BpTile(x, y, TileNames.SPACE_PLATFORM_FOUNDATION));
      }
    }
  }
  return new Blueprint(
    [new BpIcon(Signals.SPACE_SCIENCE_PACK, 1)],
    [],
    tiles
  );
}
