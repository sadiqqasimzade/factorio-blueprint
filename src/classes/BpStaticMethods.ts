import BpEntity from "./BpEntity";



export abstract class BpStaticMethods {



    /**
     * This method is used to connect two entities with new fancy method by pushing ids into "wires" array.
     ** Template: [entity 1 id,entity 1 port and cable,entity 2 id,entity 2 port and cable]
     ** Even numbers (2,4) for green wires.Odd numbers(1,3) for red wires.
     ** Example:[1,2,3,2] 
     * @param entity1 
     * @param entity2
     * @param port
     * @param destinationPort
     * @todo add validation for ports (overload method for 1,3 and 2,4)
     */
    public static connect(entity1: IBpConnectable & BpEntity, entity2: IBpConnectable & BpEntity, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort): TBpWire {
        return [entity1.entity_number, port, entity2.entity_number, destinationPort]
    }
}




