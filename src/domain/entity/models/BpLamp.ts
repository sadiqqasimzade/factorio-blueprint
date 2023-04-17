import { cable_colors, entity_names } from "../stuctures/Enums";
import { TBpControlBehaviorCompare } from "../stuctures/TBpControlBehavior";
import { IBpConnectable } from "../stuctures/IBpConnectable";
import { TBpEntityConnection, TBpEntityConnectionPort } from "../stuctures/TBpEntityConnection";
import BpEntity from "./BpEntity";



export default class extends BpEntity  {
    control_behavior: TBpControlBehaviorCompare
    connections: TBpEntityConnection;

    constructor(control_behavior: TBpControlBehaviorCompare, x: number, y: number) {
        super(entity_names.LAMP, x, y);
        this.control_behavior = control_behavior
    }

    public makeConnection(entity: BpEntity, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void {
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
};