import { EntityNames } from "../consts/enums";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";


export class BpMediumPole extends BpEntity implements IBpNeightbourable {
    neighbours: number[] | undefined;
    
    constructor(x: number, y: number) {
        super(EntityNames.MEDIUM_ELECTRIC_POLE, x, y);
    }
    public addNeighbour(neighbour: BpEntity & IBpNeightbourable): void {
        BpStaticMethods.addNeighbour(this, neighbour)
    }

}