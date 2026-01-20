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
  const width = color_indexes.length
  const height = color_indexes[0]!.length
  const wires: TBpWire[] = []
  const mainEntities: BpEntity[] = CreateScreen(width, height, wires, 0, quality, blackLampsAllowed)
  const constCombinators: BpConstCombinator[] = []
  const tiles: BpTile[] = []

  color_indexes.forEach((signal_strengths, i) => {
    const constCombinator = new BpConstCombinator({
      filters: ((): TBpConstCombinatorControlBehaviorFilter[] => {
        const filters: TBpConstCombinatorControlBehaviorFilter[] = []

        for (let k = 0; k < signal_strengths.length; k++) {
          filters.push({
            signal: signal_priority[k],
            index: k + 1,
            count: signal_strengths[k]!
          })
        }
        return filters
      })()
    }, i, -1, Directions.NORTH)

    const lamp = mainEntities.find(e => e.position.x === i && e.position.y === 0) as BpLamp
    wires.push(BpStaticMethods.connect(lamp!, constCombinator, 2, 2))
    constCombinators.push(constCombinator)
  })


  mainEntities.push(...constCombinators)


  if (lampBgTile) {
    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        tiles.push(new BpTile(i, j, lampBgTile))
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
}