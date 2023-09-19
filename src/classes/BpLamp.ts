import { EntityNames } from "../consts/enums";
import CircuitCondition from "./BpCircuitCondition";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";



export default class BpLamp extends BpEntity  {
    control_behavior: {circuit_condition:CircuitCondition,use_colors?:boolean}
    connections: TBpEntityConnection | undefined;

    constructor(circuitCondition: CircuitCondition, x: number, y: number,use_colors?:boolean) {
        super(EntityNames.LAMP, x, y);
        this.control_behavior = {circuit_condition:circuitCondition,use_colors:use_colors}
    }
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
}