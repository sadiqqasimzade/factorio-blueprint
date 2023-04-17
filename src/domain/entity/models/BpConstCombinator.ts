import { cable_colors, directions, entity_names } from "../stuctures/Enums";
import { TBpConstCombinatorControlBehavior } from "../stuctures/TBpControlBehavior";
import { IBpConnectable } from "../stuctures/IBpConnectable";
import { TBpEntityConnection, TBpEntityConnectionPort } from "../stuctures/TBpEntityConnection";
import BpEntity from "./BpEntity";
import { IBpDirectionable } from "../stuctures/IBpDirectionable";


export default class BpConstCombinator extends BpEntity implements IBpConnectable, IBpDirectionable {
    control_behavior: TBpConstCombinatorControlBehavior
    connections: TBpEntityConnection;
    direction: directions;


    constructor(control_behavior: TBpConstCombinatorControlBehavior, x: number, y: number, direction?: directions | undefined) {
        super(entity_names.CONSTANT_COMBINATOR, x, y);
        this.control_behavior = control_behavior
        this.direction = direction
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


