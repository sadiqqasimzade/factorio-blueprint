import { EntityNames, CableColors } from "../consts/enums";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";


export default class BpSubstaion extends BpEntity implements IBpConnectable, IBpNeightbourable {
    neighbours: number[]|undefined;
    connections: TBpEntityConnection | undefined;

    constructor(x: number, y: number) {
        super(EntityNames.SUBSTATION, x, y);
    }
    public addNeighbour(neighbour: BpEntity & IBpNeightbourable): void {
        BpStaticMethods.addNeighbour(this, neighbour)
    }
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }


}