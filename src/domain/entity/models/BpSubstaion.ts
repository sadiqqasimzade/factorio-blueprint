import { cable_colors, entity_names } from "../stuctures/Enums";
import { IBpConnectable } from "../stuctures/IBpConnectable";
import { IBpNeightbourable } from "../stuctures/IBpNeightbourable";
import { TBpEntityConnection, TBpEntityConnectionPort } from "../stuctures/TBpEntityConnection";
import BpEntity from "./BpEntity";


export default class BpSubstaion extends BpEntity implements IBpConnectable, IBpNeightbourable {
    neighbours: number[];
    connections: TBpEntityConnection;

    constructor(x: number, y: number) {
        super(entity_names.SUBSTATION, x, y);
    }
    AddNeighbour(neighbour: BpSubstaion): void {
        if(!this.neighbours){
            this.neighbours = [];
        }
        this.neighbours.push(neighbour.entity_number);
        if(!neighbour.neighbours){
            neighbour.neighbours = [];
        }
        neighbour.neighbours.push(this.entity_number);
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