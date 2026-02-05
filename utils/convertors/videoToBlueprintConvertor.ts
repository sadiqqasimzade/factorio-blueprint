import Blueprint from "@/classes/Blueprint";
import BpArithmeticCombinator from "@/classes/BpArithmeticCombinator";
import ArithmeticCondition from "@/classes/BpArithmeticCondition";
import BpConstCombinator from "@/classes/BpConstCombinator";
import BpDeciderCombinator from "@/classes/BpDeciderCombinator";
import DeciderCondition from "@/classes/BpDeciderCondition";
import BpIcon from "@/classes/BpIcon";
import BpLamp from "@/classes/BpLamp";
import { BpStaticMethods } from "@/classes/BpStaticMethods";
import BpSubstation from "@/classes/BpSubstation";
import { Directions } from "@/consts/enums";
import { signal_priority, Signals } from "@/consts/signalsEnum";
import { CreateScreen, SUBSTATION_QUALITIES } from "./createScreen";

function generateSubstationCoordinatesW(
    size: number,
    substationValue: number,
    offset: number
): number[] {
    const coordinates = [substationValue / 2 + offset];
    const maxValue = Math.ceil(size / substationValue) * substationValue;

    while (coordinates[coordinates.length - 1]! + substationValue < maxValue) {
        coordinates.push(coordinates[coordinates.length - 1]! + substationValue);
    }

    return coordinates;
}

function generateSubstationCoordinatesH(
    size: number,
    substationValue: number
): number[] {
    const coordinates = [3];
    const maxValue = Math.ceil(size / substationValue) * substationValue;

    while (coordinates[coordinates.length - 1]! + substationValue < maxValue) {
        coordinates.push(coordinates[coordinates.length - 1]! + substationValue);
    }

    return coordinates;
}

export function CreateMemoryBlock(
    frames: number[][][],
    quality: number,
    frameRate: number,
    loopWithoutBlankFrame: boolean
): Blueprint {
    const deciderCombinators: BpDeciderCombinator[] = [];
    const constCombinators: BpConstCombinator[] = [];
    const substations: BpSubstation[] = [];
    const wires: TBpWire[] = [];

    const height = frames[0]!.length;
    const width = frames[0]![0]!.length;

    const substationQuality = SUBSTATION_QUALITIES[quality]!;
    const substationName = quality === 1 ? undefined : substationQuality.name;

    const substationCoordinatesW =
        quality === 0
            ? []
            : generateSubstationCoordinatesW(width, substationQuality.value, 0);

    const substationCoordinatesH =
        quality === 0
            ? []
            : generateSubstationCoordinatesH(
                frames.length + frames.length / 5,
                Math.ceil(substationQuality.value / 3)
            );

    const substationHSet = new Set(substationCoordinatesH);

    const screenEntities = CreateScreen(width, height, wires, 0, quality, true);

    // Index lamps once
    const lampsByX = new Map<number, BpLamp>();
    for (const entity of screenEntities) {
        if (entity instanceof BpLamp && entity.position.y === 0) {
            lampsByX.set(entity.position.x, entity);
        }
    }

    let heightOffset = 0;
    let coordinateIndex = 0;
    let frameIndex = 0;

    while (frameIndex < frames.length) {
        let skipLoop = true;

        if (substationHSet.has(coordinateIndex + 1)) {
            substationCoordinatesW.forEach((w, i) => {
                const substation = new BpSubstation(
                    w,
                    -1 - coordinateIndex * 3,
                    substationName
                );
                substations.push(substation);

                if (i !== 0) {
                    wires.push(
                        BpStaticMethods.connect(
                            substations[substations.length - 2]!,
                            substation,
                            5,
                            5
                        )
                    );
                }
            });

            const last = substations[substations.length - 1];
            const above =
                substations[substations.length - 1 - substationCoordinatesW.length];

            if (last && above) {
                wires.push(BpStaticMethods.connect(last, above, 5, 5));
            }

            if (substations.length === substationCoordinatesW.length) {
                const screenEntityFirstSubstation: BpSubstation = screenEntities.find(entity => entity instanceof BpSubstation)!;
                wires.push(BpStaticMethods.connect(screenEntityFirstSubstation!, substations[0]!, 5, 5))
            }

            heightOffset++;
            skipLoop = false;
        } else {
            const frame = frames[frameIndex]!;

            for (let x = 0; x < width; x++) {
                const filters: TBpConstCombinatorControlBehaviorFilter[] = [];

                for (let y = 0; y < height; y++) {
                    filters.push({
                        signal: signal_priority[y],
                        index: y + 1,
                        count: frame[y]![x]!,
                    });
                }

                const constCombinator = new BpConstCombinator(
                    { filters },
                    x,
                    -3 - (frameIndex + heightOffset) * 3,
                    Directions.EAST_NORTH_EAST
                );

                const deciderCombinator = new BpDeciderCombinator(
                    new DeciderCondition(
                        [
                            {
                                first_signal: Signals.FISH,
                                comparator: "=",
                                constant: frameIndex + 1,
                                first_signal_networks: { red: true, green: false },
                            },
                        ],
                        [{ signal: Signals.EVERYTHING, networks: { red: false, green: true } }]
                    ),
                    x,
                    -1 - (frameIndex + heightOffset) * 3,
                    Directions.EAST_NORTH_EAST
                );

                wires.push(
                    BpStaticMethods.connect(constCombinator, deciderCombinator, 2, 2)
                );

                const prev = deciderCombinators[deciderCombinators.length - 1];
                if (prev && prev.position.y === deciderCombinator.position.y) {
                    wires.push(
                        BpStaticMethods.connect(prev, deciderCombinator, 1, 1)
                    );
                }

                const above = deciderCombinators[deciderCombinators.length - width];
                if (above) {
                    wires.push(
                        BpStaticMethods.connect(above, deciderCombinator, 4, 4)
                    );
                }

                deciderCombinators.push(deciderCombinator);
                constCombinators.push(constCombinator);
            }

            const last = deciderCombinators[deciderCombinators.length - 1];
            const above =
                deciderCombinators[deciderCombinators.length - 1 - width];

            if (last && above) {
                wires.push(BpStaticMethods.connect(above, last, 1, 1));
            }
        }

        if (skipLoop) frameIndex++;
        coordinateIndex++;
    }

    // ---------------- TIMER ----------------

    const timerConst = new BpConstCombinator(
        { filters: [{ signal: Signals.FISH, count: 1, index: 2 }] },
        -6,
        -2
    );

    const timerDecider = new BpDeciderCombinator(
        new DeciderCondition(
            [
                {
                    first_signal: Signals.FISH,
                    comparator: "<",
                    constant:
                        (frames.length + (loopWithoutBlankFrame ? 0 : 1)) * frameRate,
                },
            ],
            [{ signal: Signals.FISH }]
        ),
        -5,
        -2,
        2
    );

    const timerArithmetic = new BpArithmeticCombinator(
        new ArithmeticCondition(Signals.FISH, "/", frameRate, Signals.FISH),
        -4,
        -2,
        2
    );

    const addingArithmetic = new BpArithmeticCombinator(
        new ArithmeticCondition(Signals.FISH, "+", 1, Signals.FISH),
        -3,
        -2,
        2
    );
    if (quality !== 0) {
        const timerSubstation = new BpSubstation(-6, -7, substationName);
        substations.push(timerSubstation);
        wires.push(BpStaticMethods.connect(timerSubstation, substations[0]!, 5, 5));
    }

    wires.push(
        BpStaticMethods.connect(timerConst, timerDecider, 2, 2),
        BpStaticMethods.connect(timerDecider, timerDecider, 2, 4),
        BpStaticMethods.connect(timerArithmetic, timerDecider, 1, 3),
        BpStaticMethods.connect(timerArithmetic, addingArithmetic, 3, 1),
        BpStaticMethods.connect(addingArithmetic, deciderCombinators[0]!, 3, 1),
    );

    constCombinators.push(timerConst);
    deciderCombinators.push(timerDecider);

    // -------- Connect lamps --------

    for (let i = 0; i < width; i++) {
        const lamp = lampsByX.get(i);
        if (lamp) {
            wires.push(
                BpStaticMethods.connect(lamp, deciderCombinators[i]!, 2, 4)
            );
        }
    }

    // -------- Final substation row --------

    const lastH = substationCoordinatesH[substationCoordinatesH.length - 1];
    if (lastH && coordinateIndex < lastH) {
        substationCoordinatesW.forEach((w, i) => {
            const sub = new BpSubstation(
                w,
                -1 - lastH * 3,
                substationName
            );
            substations.push(sub);

            if (i !== 0) {
                wires.push(
                    BpStaticMethods.connect(
                        substations[substations.length - 2]!,
                        sub,
                        5,
                        5
                    )
                );
            }
        });

        const last = substations[substations.length - 1];
        const above =
            substations[substations.length - 1 - substationCoordinatesW.length];

        if (last && above) {
            wires.push(BpStaticMethods.connect(last, above, 5, 5));
        }
    }

    return new Blueprint(
        [new BpIcon(Signals.WHITE, 1)],
        [
            ...substations,
            ...deciderCombinators,
            ...constCombinators,
            ...screenEntities,
            timerArithmetic,
            addingArithmetic,
        ],
        [],
        wires
    );
}
