import BpArithmeticCombinator from "@/src/classes/BpArithmeticCombinator";
import ArithmeticCondition from "@/src/classes/BpArithmeticCondition";
import CircuitCondition from "@/src/classes/BpCircuitCondition";
import BpConstCombinator from "@/src/classes/BpConstCombinator";
import BpEntity from "@/src/classes/BpEntity";
import BpLamp from "@/src/classes/BpLamp";
import BpSubstaion from "@/src/classes/BpSubstaion";
import { Directions } from "@/src/consts/enums";
import { signals, signal_priority, color_priority } from "@/src/consts/signalsEnum";

export function CreateScreen(width: number, height: number): BpEntity[] {
    //#region consts
    const mainEntities: BpEntity[] = []
    const lampEntites: BpLamp[] = []
    const constCombinators: BpConstCombinator[] = []
    const combinatorsCount = Math.ceil(height / 20)
    //#endregion

    //#region substation array
    const substation_cordinates_w = [4];
    const substation_cordinates_h = [4];
    while (substation_cordinates_w.at(-1)! + 9 < Math.ceil(width / 9) * 9) {
        substation_cordinates_w.push(substation_cordinates_w.at(-1)! + 9);
    }
    while (substation_cordinates_h.at(-1)! + 9 < Math.ceil(height / 9) * 9) {
        substation_cordinates_h.push(substation_cordinates_h.at(-1)! + 9);
    }
    //#endregion

    const lamp_circuit_condition = new CircuitCondition(signals.signal_white, 1, '>')



    //#region create lamp grid with combinators
    for (let i = 0; i < width; i++) {
        const row: BpEntity[] = []
        for (let j = 0; j < height; j++) {
            if (substation_cordinates_w.includes(i) && substation_cordinates_h.includes(j)) {
                const substation = new BpSubstaion(i * 2 + 0.5, j * 2 + 0.5)
                substation.makeConnection(row.at(-1) as BpArithmeticCombinator, 1, 1, 'green')
                row.at(-combinatorsCount) && substation.makeConnection(row.at(-combinatorsCount) as BpArithmeticCombinator | BpSubstaion, 1, 1, 'red')
                row.push(substation)
            }
            else {
                const combinator = new BpArithmeticCombinator(
                    new ArithmeticCondition(signals.signal_each, '-', signal_priority[Math.floor(j / combinatorsCount)], signals.signal_each),
                    i * 2 + 1,
                    j * 2 + 1,
                    Directions.WEST)

                const lamp_l = new BpLamp(lamp_circuit_condition, i * 2, j * 2, true)
                const lamp_r = new BpLamp(lamp_circuit_condition, i * 2 + 1, j * 2, true)
                lamp_r.makeConnection(lamp_l, 1, 1, 'red')
                lamp_l.makeConnection(combinator, 1, 2, 'red')

                row.at(-combinatorsCount) && combinator.makeConnection(row.at(-combinatorsCount) as BpArithmeticCombinator | BpSubstaion, 1, 1, 'red')
                row.at(-1) && combinator.makeConnection(row.at(-1) as BpArithmeticCombinator, 1, 1, 'green')

                row.push(combinator)
                lampEntites.push(lamp_l, lamp_r)
            }
        }
        mainEntities.push(...row)
    }
    //#endregion

    //#region color const combinators
    constCombinators.push(
        new BpConstCombinator(
            {
                filters: ((): TBpConstCombinatorControlBehaviorFilter[] => {
                    const filters: TBpConstCombinatorControlBehaviorFilter[] = []
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


    //#region connect 1st row of arithmetic combinators to color const combinator
    const arithmetic_combinators = mainEntities.filter(entity => entity instanceof BpArithmeticCombinator && entity.position.y === 1) as BpArithmeticCombinator[]
    for (let i = 0; i < arithmetic_combinators.length; i++) {
        const combinator = arithmetic_combinators[i]
        i === 0 ? combinator.makeConnection(constCombinators.at(-1)!, 1, 1, 'green') :
            combinator.makeConnection(arithmetic_combinators[i - 1], 1, 1, 'green')
    }
    //#endregion



    //#region add offgrid substation and connect all substations
    const substations: BpSubstaion[] = []
    if (substation_cordinates_h.at(-1)! >= height) {
        for (let j = 0; j < substation_cordinates_w.length; j++) {
            substations.push(new BpSubstaion(substation_cordinates_w[j] * 2 + 0.5, substation_cordinates_h.at(-1)! * 2 + 0.5))
        }
    }


    if (substation_cordinates_w.at(-1)! >= width) {
        //last substation already placed by previous loop
        for (let j = 0; j < substation_cordinates_h.length - (substation_cordinates_h.at(-1)! >= height ? 1 : 0); j++) {
            substations.push(new BpSubstaion(substation_cordinates_w.at(-1)! * 2 + 0.5, substation_cordinates_h[j] * 2 + 0.5))
        }
    }
    mainEntities.push(...substations)

    //connect all substations with neighbours
    for (let i = 0; i < substation_cordinates_h.length; i++) {
        const row_of_substations = mainEntities.filter(e => e instanceof BpSubstaion && e.position.y === substation_cordinates_h[i] * 2 + 0.5) as BpSubstaion[]
        for (let j = 0; j < row_of_substations.length; j++) {
            const substation = row_of_substations[j]
            if (j < row_of_substations.length - 1) {
                substation.addNeighbour(row_of_substations[j + 1])
            }
        }
    }

    for (let i = 0; i < substation_cordinates_w.length; i++) {
        const col_of_substations = mainEntities.filter(e => e instanceof BpSubstaion && e.position.x === substation_cordinates_w[i] * 2 + 0.5) as BpSubstaion[]
        for (let j = 0; j < col_of_substations.length; j++) {
            const substation = col_of_substations[j]
            if (j < col_of_substations.length - 1) {
                substation.addNeighbour(col_of_substations[j + 1])
            }
        }
    }
    //#endregion


    mainEntities.push(...constCombinators)
    mainEntities.push(...lampEntites)
    return mainEntities;
}