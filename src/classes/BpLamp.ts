import { EntityNames } from "../consts/enums";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";

import ControlBehavior from "./ControlBehavior";



export default class BpLamp extends BpEntity {
    control_behavior: ControlBehavior
    connections: TBpEntityConnection | undefined;

    constructor(controlBehavior: ControlBehavior, x: number, y: number) {
        super(EntityNames.LAMP, x, y);
        this.control_behavior = controlBehavior
    }
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
}