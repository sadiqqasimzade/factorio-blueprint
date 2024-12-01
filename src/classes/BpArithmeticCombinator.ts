import { Directions, EntityNames } from "../consts/enums";
import ArithmeticCondition from "./BpArithmeticCondition";
import BpEntity from "./BpEntity";

export default class BpArithmeticCombinator extends BpEntity implements IBpDirectionable {
    control_behavior: { arithmetic_conditions: ArithmeticCondition }
    direction: Directions | undefined;


    constructor(arithmetic_conditions: ArithmeticCondition, x: number, y: number, direction?: Directions | undefined) {
        super(EntityNames.ARITHMETIC_COMBINATOR, x, y);
        this.control_behavior = { arithmetic_conditions: arithmetic_conditions }
        this.direction = direction
    }

}


