import { Directions, EntityNames, CableColors } from "../consts/enums";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";

export default class BpArithmeticCombinator extends BpEntity implements IBpConnectable, IBpDirectionable {
    control_behavior: TBpControlBehaviorArithmetic
    connections: TBpEntityConnection | undefined;
    direction: Directions|undefined;
    

    constructor(control_behavior: TBpControlBehaviorArithmetic, x: number, y: number, direction?: Directions | undefined) {
        super(EntityNames.ARITHMETIC_COMBINATOR, x, y);
        this.control_behavior = control_behavior
        this.direction = direction
    }


    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
}


