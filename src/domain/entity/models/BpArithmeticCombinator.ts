import { IBpConnectable } from "../stuctures/IBpConnectable";
import { cable_colors, directions, entity_names } from "../stuctures/Enums";
import { TBpControlBehaviorArithmetic } from "../stuctures/TBpControlBehavior";
import { TBpEntityConnection, TBpEntityConnectionPort } from "../stuctures/TBpEntityConnection";
import BpEntity from "./BpEntity";
import { IBpDirectionable } from "../stuctures/IBpDirectionable";
import { BpStaticMethods } from "../stuctures/BpStaticMethods";

export default class BpArithmeticCombinator extends BpEntity implements IBpConnectable, IBpDirectionable {
    control_behavior: TBpControlBehaviorArithmetic
    connections: TBpEntityConnection | undefined;
    direction: directions|undefined;
    

    constructor(control_behavior: TBpControlBehaviorArithmetic, x: number, y: number, direction?: directions | undefined) {
        super(entity_names.ARITHMETIC_COMBINATOR, x, y);
        this.control_behavior = control_behavior
        this.direction = direction
    }


    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
};


