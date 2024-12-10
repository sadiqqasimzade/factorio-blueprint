import Blueprint from "@/src/classes/Blueprint";
import BpConstCombinator from "@/src/classes/BpConstCombinator";
import BpEntity from "@/src/classes/BpEntity";
import { signal_priority, Signals } from "@/src/consts/signalsEnum";
import { CreateScreen } from "./createScreen";
import BpIcon from "@/src/classes/BpIcon";
import { Directions } from "@/src/consts/enums";
import BpLamp from "@/src/classes/BpLamp";
import { BpStaticMethods } from "@/src/classes/BpStaticMethods";

export default function ImgToLampBlueprintConvertor(color_indexes: number[][], quality: number, blackLampsAllowed: boolean): Blueprint {
  const width = color_indexes.length
  const height = color_indexes[0].length
  const wires: TBpWire[] = []
  const mainEntities: BpEntity[] = CreateScreen(width, height, wires, 0, quality, blackLampsAllowed)
  const constCombinators: BpConstCombinator[] = []

  color_indexes.forEach((signal_strengths, i) => {
    const constCombinator = new BpConstCombinator({
      filters: ((): TBpConstCombinatorControlBehaviorFilter[] => {
        let filters: TBpConstCombinatorControlBehaviorFilter[] = []

        for (let k = 0; k < signal_strengths.length; k++) {
          filters.push({
            signal: signal_priority[k],
            index: k + 1,
            count: signal_strengths[k]
          })
        }
        return filters
      })()
    }, i, -1, Directions.NORTH)

    let lamp = mainEntities.find(e => e.position.x === i && e.position.y === 0) as BpLamp
    wires.push(BpStaticMethods.connect(lamp, constCombinator, 2, 2))
    constCombinators.push(constCombinator)
  })


  mainEntities.push(...constCombinators)
  var result: Blueprint = new Blueprint(
    [new BpIcon(Signals.WHITE, 1)],
    mainEntities,
    [],
    wires
  );
  return result;
}