import { EntityNames } from "../consts/enums";
import BpEntity from "./BpEntity";


export default class BpSubstation extends BpEntity {
    neighbors: number[] | undefined;

    constructor(x: number, y: number, quality?: string) {
        super(EntityNames.SUBSTATION, x, y, quality);
    }
}