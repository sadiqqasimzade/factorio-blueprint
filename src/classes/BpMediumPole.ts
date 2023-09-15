import { EntityNames, CableColors } from "../consts/enums";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";


export class BpMediumPole extends BpEntity implements IBpConnectable,IBpNeightbourable {
    connections: TBpEntityConnection | undefined;
    constructor(x: number, y: number) {
        super(EntityNames.MEDIUM_ELECTRIC_POLE, x, y);
    }
    public addNeighbour(neighbour: BpEntity & IBpNeightbourable): void {
        BpStaticMethods.addNeighbour(this, neighbour)
    }
    neighbours: number[] | undefined;
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
}