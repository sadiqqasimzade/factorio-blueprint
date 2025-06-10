import { EntityNames } from "../consts/enums";
import BpEntity from "./BpEntity";

import ControlBehavior from "./ControlBehavior";



export default class BpLamp extends BpEntity {
    control_behavior: ControlBehavior

    constructor(controlBehavior: ControlBehavior, x: number, y: number) {
        super(EntityNames.LAMP, x, y);
        this.control_behavior = controlBehavior
    }
}