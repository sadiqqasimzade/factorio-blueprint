import Blueprint from "@/src/classes/Blueprint";
import BpArithmeticCombinator from "@/src/classes/BpArithmeticCombinator";
import BpConstCombinator from "@/src/classes/BpConstCombinator";
import BpEntity from "@/src/classes/BpEntity";
import BpSubstaion from "@/src/classes/BpSubstaion";
import { signal_priority, signals } from "@/src/consts/signalsEnum";
import { CreateScreen } from "./createScreen";
import BpIcon from "@/src/classes/BpIcon";

export default function ImgToLampBlueprintConvertor(color_indexes: number[][][]): Blueprint {
  const width = color_indexes.length
  const height = (color_indexes[0].length - 1) * (color_indexes[0][0].length && color_indexes[0][0].length) + (color_indexes[0].at(-1) as number[]).length

  const mainEntities: BpEntity[] = CreateScreen(width, height)
  const constCombinators: BpConstCombinator[] = []


  //#region add color const combinators

  // color_indexes.forEach(col_const_combinators => {

  //   col_const_combinators.forEach((col, i) => {

  //   })
  // });

  for (let i = 0; i < width; i++) {
    const temp_combinators: BpConstCombinator[] = []
    for (let j = 0; j < color_indexes[0].length; j++) {
      const combinator = new BpConstCombinator({
        filters: ((): TBpConstCombinatorControlBehaviorFilter[] => {
          const filters: TBpConstCombinatorControlBehaviorFilter[] = []

          for (let k = 0; k < (color_indexes[i].at(-j - 1) as number[]).length; k++) {
            filters.push({
              signal: signal_priority[k],
              index: k + 1,
              count: (color_indexes[i].at(-j - 1) as number[])[k]
            })
          }
          return filters
        })()
      }, i * 2 + 1, -1 - j)

      let arithmetic_combinator: BpArithmeticCombinator | BpSubstaion = mainEntities.find(e => e.position.x === i * 2 + 1 && e.position.y === (color_indexes[0].length - j - 1) * 2 + 1) as BpArithmeticCombinator

      if (arithmetic_combinator === undefined) {
        arithmetic_combinator = mainEntities.find(e => e.position.x === i * 2 + 0.5 && e.position.y === (color_indexes[0].length - j - 1) * 2 + 0.5) as BpSubstaion
      }
      arithmetic_combinator.makeConnection(combinator, 1, 1, 'red')
      temp_combinators.push(combinator)
    }
    constCombinators.push(...temp_combinators)
  }
  //#endregion




  mainEntities.push(...constCombinators)
  var result: Blueprint = new Blueprint(
    [new BpIcon(signals.signal_white, 1)],
    mainEntities,
  );
  return result;
}