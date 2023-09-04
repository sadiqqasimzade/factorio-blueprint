import Blueprint from "../../../domain/entity/models/Blueprint";
import BpArithmeticCombinator from "../../../domain/entity/models/BpArithmeticCombinator";
import BpConstCombinator from "../../../domain/entity/models/BpConstCombinator";
import BpEntity from "../../../domain/entity/models/BpEntity";
import BpSubstaion from "../../../domain/entity/models/BpSubstaion";
import { cable_colors, color_priority, signal_priority, signals } from "../../../domain/entity/stuctures/Enums";
import { TBpConstCombinatorControlBehaviorFilter } from "../../../domain/entity/stuctures/TBpControlBehavior";
import Blueprint_Icon from "../../../domain/entity/models/BpIcon";
import { BpMediumPole } from "../../../domain/entity/models/BpMediumPole";


export default function VideoToBlueprintConvertor(color_indexes: number[][][]) {
    const width = color_indexes.length
    const height = color_indexes[0].length * (color_indexes[0][0].length && color_indexes[0][0].length)

}


export function CreateMemoryBlock(images: number[][][][]): BpConstCombinator[] {

    const bpPoles: BpMediumPole[] = []
    const rowsOfEntities = images[0][0].length
    console.log(images)
    images.forEach(image => {
        image.forEach(combinators => {
            console.log(combinators)
            combinators.forEach(combinator => {
                const combinator = new BpConstCombinator({
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
                }, i * 2 + 1, -1 - j - currentHeight)
              
            })
        })


    });

    // const width = color_indexes.length
    // const constCombinators: BpConstCombinator[] = []
    // for (let i = 0; i < width; i++) {
    //     let temp_combinators: BpConstCombinator[] = []
    //     for (let j = 0; j < color_indexes[0].length; j++) {
    //         let combinator = new BpConstCombinator({
    //             filters: ((): TBpConstCombinatorControlBehaviorFilter[] => {
    //                 let filters: TBpConstCombinatorControlBehaviorFilter[] = []
    //                 for (let k = 0; k < color_indexes[i][j].length; k++) {
    //                     filters.push({
    //                         signal: signal_priority[k],
    //                         index: k + 1,
    //                         count: color_indexes[i][j][k]
    //                     })
    //                 }
    //                 return filters
    //             })()
    //         }, i * 2 + 1, -1 - j - currentHeight)
    //         temp_combinators.at(-1) && combinator.makeConnection(temp_combinators.at(-1)!, 1, 1, cable_colors.RED)
    //         temp_combinators.push(combinator)
    //     }
    //     constCombinators.push(...temp_combinators)
    // }
    // return constCombinators
}