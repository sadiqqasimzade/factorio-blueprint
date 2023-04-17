import { cable_colors, entity_names } from "../stuctures/Enums";
import { IBpConnectable } from "../stuctures/IBpConnectable";
import { TBpEntityConnectionPort } from "../stuctures/TBpEntityConnection";

//this method can be used to make connections between two entities without overriding it in each class
export function makeConnection(entity: IBpConnectable, entity2: IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void {
    if (!entity.connections) {
        entity.connections = {}
    }
    if (!entity.connections[port]) {
        entity.connections[port] = {

        };
    }
    if (!entity.connections[port][cable]) {
        entity.connections[port][cable] = [];
    }
    entity.connections[port][cable].push({ entity_id: entity.entity_number, circuit_id: destinationPort })
}



