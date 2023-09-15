import { Directions, EntityNames, CableColors } from "../consts/enums";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";


export default class BpConstCombinator extends BpEntity implements IBpConnectable, IBpDirectionable {
    control_behavior: TBpConstCombinatorControlBehavior
    connections: TBpEntityConnection | undefined;
    direction: Directions|undefined;


    constructor(control_behavior: TBpConstCombinatorControlBehavior, x: number, y: number, direction?: Directions | undefined) {
        super(EntityNames.CONSTANT_COMBINATOR, x, y);
        this.control_behavior = control_behavior
        this.direction = direction
    }
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
}


