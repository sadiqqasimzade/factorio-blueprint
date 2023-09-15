import { EntityNames, CableColors } from "../consts/enums";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";



export default class BpLamp extends BpEntity  {
    control_behavior: TBpControlBehaviorCompare
    connections: TBpEntityConnection | undefined;

    constructor(control_behavior: TBpControlBehaviorCompare, x: number, y: number) {
        super(EntityNames.LAMP, x, y);
        this.control_behavior = control_behavior
    }
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
}