import Blueprint from "../../../domain/entity/models/Blueprint";
import BpArithmeticCombinator from "../../../domain/entity/models/BpArithmeticCombinator";
import BpConstCombinator from "../../../domain/entity/models/BpConstCombinator";
import BpEntity from "../../../domain/entity/models/BpEntity";
import Blueprint_Icon from "../../../domain/entity/models/BpIcon";
import BpLamp from "../../../domain/entity/models/BpLamp";
import { BpMediumPole } from "../../../domain/entity/models/BpMediumPole";
import BpSubstaion from "../../../domain/entity/models/BpSubstaion";
import {
  signals,
  signal_priority,
  arithmetic_operations,
  compare_operations,
  cable_colors,
  color_priority,
  directions,
} from "../../../domain/entity/stuctures/Enums";
import { TBpControlBehaviorArithmetic, TBpControlBehaviorCompare, TBpConstCombinatorControlBehavior, TBpConstCombinatorControlBehaviorFilter } from "../../../domain/entity/stuctures/TBpControlBehavior";

export default (
  width: number,
  height: number,
  color_indexes: number[][][]): Blueprint => {

  //#region substation array
  var substation_cordinates_w = [4];
  var substation_cordinates_h = [4];
  while (substation_cordinates_w.at(-1) + 9 < Math.ceil(width / 9) * 9) {
    substation_cordinates_w.push(substation_cordinates_w.at(-1) + 9);
  }
  while (substation_cordinates_h.at(-1) + 9 < Math.ceil(height / 9) * 9) {
    substation_cordinates_h.push(substation_cordinates_h.at(-1) + 9);
  }
  //#endregion



  let mainEntities: BpEntity[] = []
  let lampEntites: BpEntity[] = []
  let createArithmeticCombinatorBehavior = (height: number): TBpControlBehaviorArithmetic => {
    return {
      arithmetic_conditions: {
        first_signal: signals.signal_each,
        second_signal:
          signal_priority[
          Math.floor(height / color_indexes[0].length)
          ],
        operation: arithmetic_operations.SUBTRACT,
        output_signal: signals.signal_each,
      }
    }
  }
  let lamp_circuit_condition: TBpControlBehaviorCompare = {
    circuit_condition: {
      first_signal: signals.signal_white,
      constant: 1,
      comparator: compare_operations.GREATER_THAN,
    },
    use_colors: true
  }



  //#region create lamp grid with combinators
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (substation_cordinates_w.includes(i) && substation_cordinates_h.includes(j)) {
        let substation = new BpSubstaion(i * 2 + 0.5, j * 2 + 0.5)
        substation.makeConnection(mainEntities.at(-1), 1, 1, cable_colors.GREEN)
        substation.makeConnection(mainEntities.at(-1), 1, 1, cable_colors.RED)
        mainEntities.push(substation)
      }
      else {
        let combinator = new BpArithmeticCombinator(createArithmeticCombinatorBehavior(j), i * 2 + 1, j * 2 + 1, directions.WEST)
        let lamp_l = new BpLamp(lamp_circuit_condition, i * 2, j * 2)
        let lamp_r = new BpLamp(lamp_circuit_condition, i * 2 + 1, j * 2)

        lamp_r.makeConnection(lamp_l, 1, 1, cable_colors.RED)
        lamp_l.makeConnection(combinator, 1, 2, cable_colors.RED)

        if (mainEntities.at(-color_indexes[0].length) != undefined) {
          combinator.makeConnection(mainEntities.at(-color_indexes[0].length), 1, 1, cable_colors.RED)
          combinator.makeConnection(mainEntities.at(-color_indexes[0].length), 1, 1, cable_colors.GREEN)
        }
        mainEntities.push(combinator)
        lampEntites.push(lamp_l, lamp_r)
      }
    }
  }
  //#endregion

  //#region color const combinators
  mainEntities.push(
    new BpConstCombinator(
      {
        filters: ((): TBpConstCombinatorControlBehaviorFilter[] => {
          let filters: TBpConstCombinatorControlBehaviorFilter[] = []
          for (let i = 0; i < color_priority.length; i++) {
            filters.push({
              signal: color_priority[i],
              count: 1 - i - (i != 0 ? 1 : 0),
              index: i + 1
            })
          }
          return filters
        })()
      },
      -1,
      -1,
    )
  );
  //#endregion

  //#region poles
  //must come after color const combinator so it connects properly
  for (let i = 0; i < width; i++) {
    let electric_pole = new BpMediumPole(i * 2, -1)
    electric_pole.makeConnection(mainEntities.at(-1), 1, 1, cable_colors.GREEN)
    mainEntities.push(electric_pole)
  }
  //#endregion


  //#region add color const combinators
  let color_combinators: BpConstCombinator[] = []
  for (let i = 0; i < width; i++) {
    let temp_combinators: BpConstCombinator[] = []
    for (let j = 0; j < color_indexes[0].length; j++) {
      let combinator = new BpConstCombinator({
        filters: ((): TBpConstCombinatorControlBehaviorFilter[] => {
          let filters: TBpConstCombinatorControlBehaviorFilter[] = []
          for (let k = 0; k < color_indexes[i][j].length; k++) {
            filters.push({
              signal: signal_priority[k],
              index: k + 1,
              count: color_indexes[i][j][k]
            })
          }
          return filters
        })()
      }, i * 2, -2 - j)
      temp_combinators.length == 0 ?
        combinator.makeConnection(mainEntities.at(-width + i), 1, 1, cable_colors.RED) :
        combinator.makeConnection(temp_combinators.at(-1), 1, 1, cable_colors.RED)
      temp_combinators.push(combinator)
    }
    color_combinators.push(...temp_combinators)
  }
  //#endregion

  //#region add substation

  for (let i = 0; i < substation_cordinates_w.length; i++) {
    if (substation_cordinates_w[i] > width) {
      for (let j = 0; j < substation_cordinates_h.length; j++) {
        mainEntities.push(new BpSubstaion(substation_cordinates_w[i] * 2 + 0.5, substation_cordinates_h[j] * 2 + 0.5))
      }
    }
  }

  for (let i = 0; i < substation_cordinates_h.length; i++) {
    if (substation_cordinates_h[i] > height) {
      for (let j = 0; j < substation_cordinates_w.length; j++) {
        mainEntities.push(new BpSubstaion(substation_cordinates_w[j] * 2 + 0.5, substation_cordinates_h[i] * 2 + 0.5))
      }
    }
  }

  for (let i = 0; i < substation_cordinates_h.length; i++) {
    let row_of_substations = mainEntities.filter(e => e instanceof BpSubstaion && e.position.y == substation_cordinates_h[i] * 2 + 0.5)
    for (let j = 0; j < row_of_substations.length; j++) {
      let substation = row_of_substations[j] as BpSubstaion
      if (j < row_of_substations.length - 1) {
        substation.addNeighbour(row_of_substations[j + 1] as BpSubstaion)
      }
    }
  }

  for (let i = 0; i < substation_cordinates_w.length; i++) {
    let col_of_substations = mainEntities.filter(e => e instanceof BpSubstaion && e.position.x == substation_cordinates_w[i] * 2 + 0.5)
    for (let j = 0; j < col_of_substations.length; j++) {
      let substation = col_of_substations[j] as BpSubstaion
      if (j < col_of_substations.length - 1) {
        substation.addNeighbour(col_of_substations[j + 1] as BpSubstaion)
      }
    }
  }
  //#endregion

  //#region connect 1st row of arithmetic combinators to  medium poles
  let poles = mainEntities.filter(e => e instanceof BpMediumPole)
  let combinators = mainEntities.filter(e => e instanceof BpArithmeticCombinator && e.position.y == 1)
  for (let i = 0; i < combinators.length; i++) {
    let combinator = combinators[i] as BpArithmeticCombinator
    combinator.makeConnection(poles[i], 1, 1, cable_colors.RED)
    combinator.makeConnection(poles[i], 1, 1, cable_colors.GREEN)
  }

  //#endregion

  mainEntities.push(...color_combinators)
  mainEntities.push(...lampEntites)
  var result: Blueprint = new Blueprint(
    [new Blueprint_Icon(signals.signal_white, 1)],
    mainEntities,
  );
  return result;
}