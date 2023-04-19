import BpEntity from "../models/BpEntity";
import { cable_colors } from "./Enums";
import { IBpConnectable } from "./IBpConnectable";
import { IBpNeightbourable } from "./IBpNeightbourable";
import { TBpEntityConnectionPort } from "./TBpEntityConnection";



export abstract class BpStaticMethods {
    /** 
     *This method can be used to make connections between two entities without overriding it in each class

     game understands connection even 1 object refer to another so there is no need to add entity id of 1st object into 2nd
     **/
    public static makeConnection(entity1: IBpConnectable & BpEntity, entity2: IBpConnectable & BpEntity, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void {
        if (!entity1.connections) {
            entity1.connections = {}
        }
        if (!entity1.connections[port]) {
            entity1.connections[port] = {
            };
        }
        if (!entity1.connections[port][cable]) {
            entity1.connections[port][cable] = [];
        }
        entity1.connections[port][cable].push({ entity_id: entity2.entity_number, circuit_id: destinationPort })
    }

    public static addNeighbour(neighbour1: IBpNeightbourable & BpEntity, neighbour2: IBpNeightbourable & BpEntity): void {
        if (!neighbour1.neighbours) {
            neighbour1.neighbours = [];
        }
        neighbour1.neighbours.push(neighbour2.entity_number);
        if (!neighbour2.neighbours) {
            neighbour2.neighbours = [];
        }
        neighbour2.neighbours.push(neighbour1.entity_number);
    }
}




