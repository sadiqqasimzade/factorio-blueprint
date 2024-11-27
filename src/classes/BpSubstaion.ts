import { EntityNames } from "../consts/enums";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";


export default class BpSubstaion extends BpEntity implements IBpNeightbourable {
    neighbours: number[]|undefined;

    constructor(x: number, y: number) {
        super(EntityNames.SUBSTATION, x, y);
    }
    public addNeighbour(neighbour: BpEntity & IBpNeightbourable): void {
        BpStaticMethods.addNeighbour(this, neighbour)
    }


}