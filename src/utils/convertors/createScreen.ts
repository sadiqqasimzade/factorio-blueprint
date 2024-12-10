import CircuitCondition from "@/src/classes/CircuitCondition";
import BpEntity from "@/src/classes/BpEntity";
import BpLamp from "@/src/classes/BpLamp";
import { Signals, signal_priority } from "@/src/consts/signalsEnum";
import ControlBehavior from "@/src/classes/ControlBehavior";
import { BpStaticMethods } from "@/src/classes/BpStaticMethods";
import BpSubstation from "@/src/classes/BpSubstation";

type SubstationQuality = {
    name: string;
    value: number;
}

export const SUBSTATION_QUALITIES: SubstationQuality[] = [
    { name: "none", value: 0 },
    { name: "common", value: 18 },
    { name: "uncommon", value: 20 },
    { name: "rare", value: 22 },
    { name: "epic", value: 24 },
    { name: "legendary", value: 28 }
];

export function CreateScreen(width: number, height: number, wires: TBpWire[], substation_height_offset: number, quality: number = 1, blackLampsAllowed: boolean = false): BpEntity[] {
    const mainEntities: BpEntity[] = [];
    const substationQuality = SUBSTATION_QUALITIES[quality];
    const substationName = quality !== 1 ? substationQuality.name : undefined;

    // Calculate substation coordinates
    const substationCoordinatesW = quality === 0 ? [] : generateSubstationCoordinates(width, substationQuality.value, -1);
    const substationCoordinatesH = quality === 0 ? [] : generateSubstationCoordinates(height, substationQuality.value, -1 - substation_height_offset);



    // Create main grid of lamps and substations
    createLampGrid(mainEntities, wires, width, height, substationCoordinatesW, substationCoordinatesH, substationName, blackLampsAllowed)

    // Add and connect off-grid substations
    addOffGridSubstations(mainEntities, wires, width, height, substationCoordinatesW, substationCoordinatesH, substationName)

    return mainEntities;
}

function generateSubstationCoordinates(size: number, substationValue: number, offset: number): number[] {
    const coordinates = [(substationValue / 2) + offset];
    const maxValue = Math.ceil(size / substationValue) * substationValue;

    while (coordinates.at(-1)! + substationValue < maxValue) {
        coordinates.push(coordinates.at(-1)! + substationValue);
    }

    return coordinates;
}

function createLampGrid(
    mainEntities: BpEntity[],
    wires: TBpWire[],
    width: number,
    height: number,
    substationCoordinatesW: number[],
    substationCoordinatesH: number[],
    substationName: string | undefined,
    blackLampsAllowed: boolean
): void {

    const lampCircuitCondition = new CircuitCondition(Signals.ANYTHING, 0, '>');

    for (let i = 0; i < width; i++) {
        const column: BpEntity[] = [];
        for (let j = 0; j < height; j++) {
            if (substationCoordinatesW.includes(i) && substationCoordinatesH.includes(j)) {
                const substation = new BpSubstation(i + 0.5, j + 0.5, substationName);
                if (column.at(-1)) {
                    wires.push(BpStaticMethods.connect(column.at(-1) as BpLamp, substation, 2, 2));
                }
                column.push(substation);
                j++;
            } else if (substationCoordinatesW.includes(i - 1) && substationCoordinatesH.includes(j)) {
                j++;
            } else {
                const lamp = new BpLamp(
                    new ControlBehavior(true, blackLampsAllowed ? lampCircuitCondition : new CircuitCondition(signal_priority[j], 1, '>'), true, signal_priority[j], 2),
                    i,
                    j
                );
                if (column.at(-1) && column.at(-1) instanceof BpLamp) {
                    wires.push(BpStaticMethods.connect(column.at(-1) as BpLamp, lamp, 2, 2));
                }
                else if (column.at(-1) && column.at(-1) instanceof BpSubstation && column.at(-2)) {
                    wires.push(BpStaticMethods.connect(column.at(-2) as BpLamp, lamp, 2, 2));
                }
                column.push(lamp);
            }
        }
        mainEntities.push(...column);
    }
}

function addOffGridSubstations(mainEntities: BpEntity[],
    wires: TBpWire[],
    width: number,
    height: number,
    substationCoordinatesW: number[],
    substationCoordinatesH: number[],
    substationName: string | undefined
): void {
    const substations: BpSubstation[] = [];
    const lastHeightCoord = substationCoordinatesH.at(-1)!;
    const lastWidthCoord = substationCoordinatesW.at(-1)!;

    // Add horizontal row of substations if needed
    if (lastHeightCoord >= height) {
        for (const w of substationCoordinatesW) {
            substations.push(new BpSubstation(w + 0.5, lastHeightCoord + 0.5, substationName));
        }
    }

    // Add vertical column of substations if needed
    if (lastWidthCoord >= width) {
        const heightLimit = substationCoordinatesH.length - (lastHeightCoord >= height ? 1 : 0);
        for (let j = 0; j < heightLimit; j++) {
            substations.push(new BpSubstation(lastWidthCoord + 0.5, substationCoordinatesH[j] + 0.5, substationName));
        }
    }

    mainEntities.push(...substations);

    // Connect substations in rows and columns
    connectSubstations(mainEntities, wires, substationCoordinatesW, substationCoordinatesH);
}

function connectSubstations(mainEntities: BpEntity[], wires: TBpWire[], substationCoordinatesW: number[], substationCoordinatesH: number[]): void {
    // Connect horizontal rows
    const substations = mainEntities.filter(e => e instanceof BpSubstation) as BpSubstation[];

    for (const y of substationCoordinatesH) {
        const rowSubstations = substations.filter(e => e.position.y === y + 0.5);

        for (let j = 0; j < rowSubstations.length - 1; j++) {
            wires.push(BpStaticMethods.connect(rowSubstations[j], rowSubstations[j + 1], 5, 5));
        }
    }

    // Connect vertical columns
    for (const x of substationCoordinatesW) {
        const colSubstations = substations.filter(e => e.position.x === x + 0.5) as BpSubstation[];

        for (let j = 0; j < colSubstations.length - 1; j++) {
            wires.push(BpStaticMethods.connect(colSubstations[j], colSubstations[j + 1], 5, 5));
        }
    }
}