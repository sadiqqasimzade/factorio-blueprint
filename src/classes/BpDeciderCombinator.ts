import { Directions, EntityNames } from "../consts/enums";
import DeciderCondition from "./BpDeciderCondition";
import BpEntity from "./BpEntity";

export default class BpDeciderCombinator extends BpEntity implements IBpDirectionable {
    control_behavior: { decider_conditions: DeciderCondition }
    direction: Directions | undefined;



    constructor(deciderCondition: DeciderCondition, x: number, y: number, direction?: Directions | undefined) {
        super(EntityNames.DECIDER_COMBINATOR, x, y);
        this.control_behavior = { decider_conditions: deciderCondition }
        this.direction = direction
    }

}


