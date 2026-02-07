import { EntityNames } from "../consts/enums";
import BpEntity from "./BpEntity";

export default class BpProgrammableSpeaker extends BpEntity {
    control_behavior?: TBpProgrammableSpeakerControlBehavior;

    constructor(
        x: number,
        y: number,
        control_behavior?: TBpProgrammableSpeakerControlBehavior
    ) {
        super(EntityNames.PROGRAMMABLE_SPEAKER, x, y);
        this.control_behavior = control_behavior;
    }
}
