import Blueprint from "@/src/classes/Blueprint";
import BpArithmeticCombinator from "@/src/classes/BpArithmeticCombinator";
import BpConstCombinator from "@/src/classes/BpConstCombinator";
import BpDeciderCombinator from "@/src/classes/BpDeciderCombinator";
import { BpMediumPole } from "@/src/classes/BpMediumPole";
import { Directions } from "@/src/consts/enums";
import { signal_priority, Signals } from "@/src/consts/signalsEnum";
import { CreateScreen } from "./createScreen";
import BpIcon from "@/src/classes/BpIcon";
import ArithmeticCondition from "@/src/classes/BpArithmeticCondition";
import DeciderCondition from "@/src/classes/BpDeciderCondition";
import { BpStaticMethods } from "@/src/classes/BpStaticMethods";
import { SUBSTATION_QUALITIES } from "./createScreen";
import BpSubstation from "@/src/classes/BpSubstation";
import BpLamp from "@/src/classes/BpLamp";


function generateSubstationCoordinatesW(size: number, substationValue: number, offset: number): number[] {
    const coordinates = [(substationValue / 2) + offset];
    const maxValue = Math.ceil(size / substationValue) * substationValue;

    while (coordinates.at(-1)! + substationValue < maxValue) {
        coordinates.push(coordinates.at(-1)! + substationValue);
    }

    return coordinates;
}

function generateSubstationCoordinatesH(size: number, substationValue: number, offset: number): number[] {
    const coordinates = [4];
    const maxValue = Math.ceil(size / substationValue) * substationValue;

    while (coordinates.at(-1)! + substationValue < maxValue) {
        coordinates.push(coordinates.at(-1)! + substationValue);
    }

    return coordinates;
}

export function CreateMemoryBlock(frames: number[][][], quality: number = 0): Blueprint {
    const deciderCombinators: BpDeciderCombinator[] = []
    const substations: BpSubstation[] = []
    const constCombinators: BpConstCombinator[] = []
    const wires: TBpWire[] = []

    const width = frames[0].length
    const height = frames[0][0].length

    const substationQuality = SUBSTATION_QUALITIES[quality]
    const substationCoordinatesW = generateSubstationCoordinatesW(width, substationQuality.value, 0)
    const substationCoordinatesH = generateSubstationCoordinatesH(frames.length * 3, Math.ceil(substationQuality.value / 3), 0)

    const screenEntities = CreateScreen(width, height, wires, 0, 0, false)


    let heightOffset = 0
    let coordinateIndex = 0;
    let frameIndex = 0


    while (coordinateIndex < frames.length) {
        let skipLoop = true
        if (substationCoordinatesH.includes(coordinateIndex + 1)) {
            substationCoordinatesW.forEach((w, i) => {
                substations.push(new BpSubstation(w, -1 - coordinateIndex * 3, quality != 0 ? substationQuality.name : undefined))
                //connect previous substation to current substation
                if (i !== 0) {
                    wires.push(BpStaticMethods.connect(substations.at(-2)!, substations.at(-1)!, 5, 5))
                }
            })
            if (substations.at(-1) && substations.at(-1 - substationCoordinatesW.length)) {
                wires.push(BpStaticMethods.connect(substations.at(-1)!, substations.at(-1 - substationCoordinatesW.length)!, 5, 5))
            }

            heightOffset += 1;
            skipLoop = false
        }
        else {

            const frame = frames[frameIndex];
            let rindex = 0;
            while (rindex < frame.length) {
                const row = frame[rindex];
                const constCombinator = new BpConstCombinator({
                    filters: ((): TBpConstCombinatorControlBehaviorFilter[] => {
                        let filters: TBpConstCombinatorControlBehaviorFilter[] = []
                        for (let k = 0; k < row.length; k++) {
                            filters.push({
                                signal: signal_priority[k],
                                index: k + 1,
                                count: row[k]
                            })
                        }
                        return filters
                    })()
                }, rindex, -3 - ((frameIndex + heightOffset) * 3), Directions.EAST_NORTH_EAST)

                const deciderCombinator = new BpDeciderCombinator(
                    new DeciderCondition(Signals.FISH, '=', frameIndex + 1, [{ signal: Signals.EVERYTHING, networks: { red: false, green: true } }]),
                    rindex,
                    -1 - ((frameIndex + heightOffset) * 3),
                    Directions.EAST_NORTH_EAST
                )

                //Connect Const Combinator to Decider Combinator Green wire
                wires.push(BpStaticMethods.connect(constCombinator, deciderCombinator, 2, 2))

                let previousDeciderCombinator = deciderCombinators.at(-1)

                //Connect previous Decider Combinator in this row to current Decider Combinator Red wire
                if (previousDeciderCombinator && previousDeciderCombinator.position.y === deciderCombinator.position.y) {
                    wires.push(BpStaticMethods.connect(previousDeciderCombinator, deciderCombinator, 1, 1))
                }

                //Connect previous Decider Combinator in this col to current Decider Combinator Green wire
                if (deciderCombinators.at(-frames[0].length)) {
                    wires.push(BpStaticMethods.connect(deciderCombinators.at(- frames[0].length)!, deciderCombinator, 4, 4))
                }

                deciderCombinators.push(deciderCombinator)
                constCombinators.push(constCombinator)

                rindex++;
            }

            if (deciderCombinators.at(-1 - frames[0].length)) {
                wires.push(BpStaticMethods.connect(deciderCombinators.at(-1 - frames[0].length)!, deciderCombinators.at(-1)!, 1, 1))
            }
        }

        if (skipLoop) {
            frameIndex++;
        }

        coordinateIndex++;
    }

    //#region Timer
    const timerConstCombinator = new BpConstCombinator({ filters: [{ signal: Signals.FISH, count: 1, index: 2 }] }, -8, -2)
    const timerDeciderCombinator = new BpDeciderCombinator(
        new DeciderCondition(Signals.FISH, '<', (frames.length + 1) * 30, [{ signal: Signals.FISH }]),
        -6,
        -2,
        2
    )
    const timerArithmeticCombinator = new BpArithmeticCombinator(
        new ArithmeticCondition(Signals.FISH, '/', 30, Signals.FISH),
        -4,
        -2,
        2
    )

    //connect timer
    wires.push(BpStaticMethods.connect(timerConstCombinator, timerDeciderCombinator, 2, 2))
    wires.push(BpStaticMethods.connect(timerDeciderCombinator, timerDeciderCombinator, 2, 4))
    wires.push(BpStaticMethods.connect(timerArithmeticCombinator, timerDeciderCombinator, 1, 3))
    wires.push(BpStaticMethods.connect(timerArithmeticCombinator, deciderCombinators[0]!, 3, 1))



    constCombinators.push(timerConstCombinator)
    deciderCombinators.push(timerDeciderCombinator)
    //#endregion

    //#region connect 1st row of lamps to decider combinators
    for (let i = 0; i < frames[0].length; i++) {
        const lamp = screenEntities.find(e => e instanceof BpLamp && e.position.x === i && e.position.y === 0)
        wires.push(BpStaticMethods.connect(lamp!, deciderCombinators[i]!, 2, 4))
    }
    //#endregion


    const result1: Blueprint = new Blueprint(
        [new BpIcon(Signals.WHITE, 1)],
        [...substations, ...deciderCombinators, ...constCombinators, ...screenEntities, timerArithmeticCombinator],
        [],
        wires
    );

    // return new BlueprintBook([result1])
    return result1
}

