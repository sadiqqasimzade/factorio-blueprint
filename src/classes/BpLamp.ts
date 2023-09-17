import { EntityNames } from "../consts/enums";
import CircuitCondition from "./BpCircuitCondition";
import BpEntity from "./BpEntity";
import { BpStaticMethods } from "./BpStaticMethods";



export default class BpLamp extends BpEntity  {
    control_behavior: {circuit_condition:CircuitCondition}
    connections: TBpEntityConnection | undefined;

    constructor(circuitCondition: CircuitCondition, x: number, y: number) {
        super(EntityNames.LAMP, x, y);
        this.control_behavior = {circuit_condition:circuitCondition}
    }
    public makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void {
        BpStaticMethods.makeConnection(this, entity, port, destinationPort, cable)
    }
}