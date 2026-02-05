import Blueprint from "@/classes/Blueprint";
import BpConstCombinator from "@/classes/BpConstCombinator";
import BpEntity from "@/classes/BpEntity";
import BpIcon from "@/classes/BpIcon";
import BpLamp from "@/classes/BpLamp";
import { BpStaticMethods } from "@/classes/BpStaticMethods";
import BpTile from "@/classes/BpTile";
import { Directions, TileNames } from "@/consts/enums";
import { signal_priority, Signals } from "@/consts/signalsEnum";
import { CreateScreen } from "./createScreen";


type Props = {
  color_indexes: number[][];
  quality: number;
  blackLampsAllowed: boolean;
  lampBgTile: TileNames | null;
}

export default function ImgToLampBlueprintConvertor({ color_indexes, quality, blackLampsAllowed, lampBgTile }: Props): Blueprint {
  try {
    const height = color_indexes.length
    const width = color_indexes[0]?.length ?? 0

    const wires: TBpWire[] = []
    const tiles: BpTile[] = []
    const constCombinators: BpConstCombinator[] = []

    const mainEntities: BpEntity[] = CreateScreen(
      width,
      height,
      wires,
      0,
      quality,
      blackLampsAllowed
    )

    // Index lamps by x position for O(1) access
    const lampsByX = new Map<number, BpLamp>()
    for (const entity of mainEntities) {
      if (entity instanceof BpLamp && entity.position.y === 0) {
        lampsByX.set(entity.position.x, entity)
      }
    }

    for (let x = 0; x < width; x++) {
      const filters: TBpConstCombinatorControlBehaviorFilter[] = []

      for (let y = 0; y < height; y++) {
        filters.push({
          signal: signal_priority[y],
          index: y + 1,
          count: color_indexes[y]![x]!,
        })
      }

      const constCombinator = new BpConstCombinator(
        { filters },
        x,
        -1,
        Directions.NORTH
      )

      const lamp = lampsByX.get(x)
      if (lamp) {
        wires.push(BpStaticMethods.connect(lamp, constCombinator, 2, 2))
      }

      constCombinators.push(constCombinator)
    }

    mainEntities.push(...constCombinators)


    if (lampBgTile) {
      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          tiles.push(new BpTile(x, y, lampBgTile))
        }
      }
    }


    const result: Blueprint = new Blueprint(
      [new BpIcon(Signals.WHITE, 1)],
      mainEntities,
      tiles,
      wires
    );
    return result;
  } catch (error) {
    throw new Error(`Failed to convert image to lamp blueprint: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}