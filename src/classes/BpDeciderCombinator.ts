import { Directions, EntityNames } from "../consts/enums";
import DeciderCondition from "./BpDeciderCondition";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";

export default class BpDeciderCombinator extends BpEntity implements IBpConnectable, IBpDirectionable {
    control_behavior: { decider_conditions: DeciderCondition }
    connections: TBpEntityConnection | undefined;
    direction: Directions | undefined;



    constructor(deciderCondition: DeciderCondition, x: number, y: number, direction?: Directions | undefined) {
        super(EntityNames.DECIDER_COMBINATOR, x, y);
        this.control_behavior = { decider_conditions: deciderCondition }
        this.direction = direction
    }


    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
}


