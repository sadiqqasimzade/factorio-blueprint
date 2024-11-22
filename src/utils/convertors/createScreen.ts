import CircuitCondition from "@/src/classes/CircuitCondition";
import BpConstCombinator from "@/src/classes/BpConstCombinator";
import BpEntity from "@/src/classes/BpEntity";
import BpLamp from "@/src/classes/BpLamp";
import BpSubstaion from "@/src/classes/BpSubstaion";
import { Signals, signal_priority, color_priority } from "@/src/consts/signalsEnum";
import ControlBehavior from "@/src/classes/ControlBehavior";

export function CreateScreen(width: number, height: number): BpEntity[] {
    //#region consts
    const mainEntities: BpEntity[] = []
    const constCombinators: BpConstCombinator[] = []
    // const combinatorsCount = Math.ceil(height / 20)
    //#endregion

    //#region substation array
    const substation_cordinates_w = [8];
    const substation_cordinates_h = [7];
    while (substation_cordinates_w.at(-1)! + 18 < Math.ceil(width / 18) * 18) {
        substation_cordinates_w.push(substation_cordinates_w.at(-1)! + 18);
    }
    while (substation_cordinates_h.at(-1)! + 18 < Math.ceil(height / 18) * 18) {
        substation_cordinates_h.push(substation_cordinates_h.at(-1)! + 18);
    }
    //#endregion

    const lamp_circuit_condition = new CircuitCondition(Signals.ANYTHING, 1, '>')



    //#region create lamps
    for (let i = 0; i < width; i++) {
        const column: BpEntity[] = []
        for (let j = 0; j < height; j++) {
            if (substation_cordinates_w.includes(i) && substation_cordinates_h.includes(j)) {
                const substation = new BpSubstaion(i + 0.5, j + 0.5)
                substation.makeConnection(column.at(-1) as BpLamp, 1, 1, 'green')
                // column.at(-combinatorsCount) && substation.makeConnection(column.at(-combinatorsCount) as BpArithmeticCombinator | BpSubstaion, 1, 1, 'red')
                column.push(substation)
                j++;
            }
            else if (substation_cordinates_w.includes(i - 1) && substation_cordinates_h.includes(j)) {
                j++
            }
            else {
                
                const lamp = new BpLamp(new ControlBehavior(true, lamp_circuit_condition, true, signal_priority[j], 2), i, j)

                column.at(-1) && lamp.makeConnection(column.at(-1) as BpLamp | BpSubstaion, 1, 1, 'green')

                column.push(lamp)
            }
        }
        mainEntities.push(...column)
    }
    

    //#region add offgrid substation and connect all substations
    const substations: BpSubstaion[] = []
    if (substation_cordinates_h.at(-1)! >= height) {
        for (let j = 0; j < substation_cordinates_w.length; j++) {
            substations.push(new BpSubstaion(substation_cordinates_w[j] + 0.5, substation_cordinates_h.at(-1)! + 0.5))
        }
    }


    if (substation_cordinates_w.at(-1)! >= width) {
        //last substation already placed by previous loop
        for (let j = 0; j < substation_cordinates_h.length - (substation_cordinates_h.at(-1)! >= height ? 1 : 0); j++) {
            substations.push(new BpSubstaion(substation_cordinates_w.at(-1)! + 0.5, substation_cordinates_h[j] + 0.5))
        }
    }
    mainEntities.push(...substations)

    //connect all substations with neighbours
    for (let i = 0; i < substation_cordinates_h.length; i++) {
        const row_of_substations = mainEntities.filter(e => e instanceof BpSubstaion && e.position.y === substation_cordinates_h[i] + 0.5) as BpSubstaion[]
        for (let j = 0; j < row_of_substations.length; j++) {
            const substation = row_of_substations[j]
            if (j < row_of_substations.length - 1) {
                substation.addNeighbour(row_of_substations[j + 1])
            }
        }
    }

    for (let i = 0; i < substation_cordinates_w.length; i++) {
        const col_of_substations = mainEntities.filter(e => e instanceof BpSubstaion && e.position.x === substation_cordinates_w[i] + 0.5) as BpSubstaion[]
        for (let j = 0; j < col_of_substations.length; j++) {
            const substation = col_of_substations[j]
            if (j < col_of_substations.length - 1) {
                substation.addNeighbour(col_of_substations[j + 1])
            }
        }
    }
    //#endregion


    mainEntities.push(...constCombinators)
    return mainEntities;
}