import { Directions, EntityNames } from "../consts/enums";
import BpEntity from "./BpEntity";


export default class BpConstCombinator extends BpEntity implements IBpDirectionable {
    control_behavior: TBpConstCombinatorControlBehavior

    direction: Directions|undefined;


    constructor(control_behavior: TBpConstCombinatorControlBehavior, x: number, y: number, direction?: Directions | undefined) {
        super(EntityNames.CONSTANT_COMBINATOR, x, y);
        this.control_behavior = control_behavior
        this.direction = direction
    }

}


