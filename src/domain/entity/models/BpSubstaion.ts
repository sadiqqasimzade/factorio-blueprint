import { BpStaticMethods } from "../stuctures/BpStaticMethods";
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
    public addNeighbour(neighbour: BpEntity & IBpNeightbourable): void {
        BpStaticMethods.addNeighbour(this, neighbour)
    }
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }


}