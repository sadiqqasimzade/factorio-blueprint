import { EntityNames } from "../consts/enums";
import BpEntity from "./BpEntity";


export class BpMediumPole extends BpEntity  {
    neighbors: number[] | undefined;
    
    constructor(x: number, y: number) {
        super(EntityNames.MEDIUM_ELECTRIC_POLE, x, y);
    }
}