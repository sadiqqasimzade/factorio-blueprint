import { BpStaticMethods } from "../stuctures/BpStaticMethods";
import { cable_colors, entity_names } from "../stuctures/Enums";
import { IBpConnectable } from "../stuctures/IBpConnectable";
import { TBpEntityConnection, TBpEntityConnectionPort } from "../stuctures/TBpEntityConnection";
import BpEntity from "./BpEntity";


export class BpMediumPole extends BpEntity implements IBpConnectable {
    connections: TBpEntityConnection | undefined;
    constructor(x: number, y: number) {
        super(entity_names.MEDIUM_ELECTRIC_POLE, x, y);
    }
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
}