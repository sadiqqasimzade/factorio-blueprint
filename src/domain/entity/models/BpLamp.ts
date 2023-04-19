import { cable_colors, entity_names } from "../stuctures/Enums";
import { TBpControlBehaviorCompare } from "../stuctures/TBpControlBehavior";
import { IBpConnectable } from "../stuctures/IBpConnectable";
import { TBpEntityConnection, TBpEntityConnectionPort } from "../stuctures/TBpEntityConnection";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "../stuctures/BpStaticMethods";



export default class extends BpEntity  {
    control_behavior: TBpControlBehaviorCompare
    connections: TBpEntityConnection | undefined;

    constructor(control_behavior: TBpControlBehaviorCompare, x: number, y: number) {
        super(entity_names.LAMP, x, y);
        this.control_behavior = control_behavior
    }
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
};