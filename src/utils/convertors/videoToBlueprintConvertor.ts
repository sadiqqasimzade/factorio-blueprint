import Blueprint from "@/src/classes/Blueprint";
import BpArithmeticCombinator from "@/src/classes/BpArithmeticCombinator";
import BpConstCombinator from "@/src/classes/BpConstCombinator";
import BpDeciderCombinator from "@/src/classes/BpDeciderCombinator";
import { BpMediumPole } from "@/src/classes/BpMediumPole";
import { CompareOperations, Directions, CableColors } from "@/src/consts/enums";
import { signal_priority, signals } from "@/src/consts/signalsEnum";
import { CreateScreen } from "./createScreen";
import BpIcon from "@/src/classes/BpIcon";



export function CreateMemoryBlock(images: number[][][][]): Blueprint {

    const deciderCombinators: BpDeciderCombinator[] = []
    const mediumPoles: BpMediumPole[] = []
    const constCombinators: BpConstCombinator[] = []


    const width = images[0].length
    const height = images[0][0].length * (images[0][0][0].length && images[0][0][0].length)
    const screenEntities = CreateScreen(width, height)

    images.forEach((colorIndexes, imageIndex) => {

        for (let i = 0; i < colorIndexes.length; i++) {
            for (let j = 0; j < colorIndexes[0].length; j++) {
                const constCombinator = new BpConstCombinator({
                    filters: ((): TBpConstCombinatorControlBehaviorFilter[] => {
                        let filters: TBpConstCombinatorControlBehaviorFilter[] = []
                        for (let k = 0; k < colorIndexes[i][j].length; k++) {
                            filters.push({
                                signal: signal_priority[k],
                                index: k + 1,
                                count: colorIndexes[i][j][k]
                            })
                        }
                        return filters
                    })()
                }, i * 2, -1 - j - (imageIndex * colorIndexes[0].length * 2))

                const deciderCombinator = new BpDeciderCombinator(
                    {
                        decider_conditions: {
                            first_signal: signals['signal_fish'],
                            output_signal: signals['signal_everything'],
                            comparator: CompareOperations.EQUAL,
                            constant: imageIndex + 1
                        },
                        copy_count_from_input: true
                    },
                    i * 2 + 1,
                    -1 - j - colorIndexes[0].length - (imageIndex * colorIndexes[0].length * 2),
                    Directions.EAST
                )

                const mediumPole: BpMediumPole = new BpMediumPole(i * 2 + 1, -1 - j - (imageIndex * colorIndexes[0].length * 2))
                deciderCombinator.makeConnection(constCombinator, 1, 1, CableColors.GREEN)
                deciderCombinator.makeConnection(mediumPole, 2, 1, CableColors.RED)

                deciderCombinators.at(-1) && deciderCombinator.makeConnection(deciderCombinators.at(-1)!, 1, 1, CableColors.RED)

                mediumPoles.at(-1) && mediumPole.addNeighbour(mediumPoles.at(-1)!)
                if (mediumPoles.at(-colorIndexes.length * colorIndexes[0].length)) {
                    mediumPole.makeConnection(mediumPoles.at(-colorIndexes.length * colorIndexes[0].length)!, 1, 1, CableColors.RED)
                    mediumPole.addNeighbour(mediumPoles.at(-colorIndexes.length * colorIndexes[0].length)!)
                }
                if (imageIndex === 0) {
                    const reverseHeight=colorIndexes[0].length-1-j
                    const arithmeticCombinator = screenEntities.find(entity => entity.position.x === i * 2 + 1 && entity.position.y === 2 * reverseHeight + 1 && entity instanceof BpArithmeticCombinator)
                    arithmeticCombinator && mediumPole.makeConnection(arithmeticCombinator as BpArithmeticCombinator, 1, 1, CableColors.RED)
                }

                mediumPoles.push(mediumPole)
                deciderCombinators.push(deciderCombinator)
                constCombinators.push(constCombinator)
            }
        }
        if (deciderCombinators.at(-1) && deciderCombinators.at(-colorIndexes.length * colorIndexes[0].length - 1)) {
            deciderCombinators.at(-1)!.makeConnection(deciderCombinators.at(-colorIndexes.length * colorIndexes[0].length - 1)!, 1, 1, CableColors.RED)
        }
    });






    const result1: Blueprint = new Blueprint(
        [new BpIcon(signals.signal_white, 1)],
        [...mediumPoles, ...deciderCombinators, ...constCombinators, ...screenEntities],
    );

    // return new BlueprintBook([result1])
    return result1
}

