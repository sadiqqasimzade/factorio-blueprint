import { cable_colors, entity_names } from "../stuctures/Enums";
import { IBpConnectable } from "../stuctures/IBpConnectable";
import { TBpEntityConnection, TBpEntityConnectionPort } from "../stuctures/TBpEntityConnection";
import BpEntity from "./BpEntity";


export class BpMediumPole extends BpEntity implements IBpConnectable {
    connections: TBpEntityConnection;
    constructor(x: number, y: number) {
        super(entity_names.MEDIUM_ELECTRIC_POLE, x, y);
    }
    makeConnection(entity: BpEntity, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void {
        if (!this.connections) {
            this.connections = {}
        }
        if (!this.connections[port]) {
            this.connections[port] = {

            };
        }
        if (!this.connections[port][cable]) {
            this.connections[port][cable] = [];
        }
        this.connections[port][cable].push({ entity_id: entity.entity_number, circuit_id: destinationPort })
    }
}