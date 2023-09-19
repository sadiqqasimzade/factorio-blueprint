import BpEntity from "../models/BpEntity";
import { TBpEntityConnection, TBpEntityConnectionPort } from "./TBpEntityConnection";

declare global {
    interface IBpConnectable {
        connections: TBpEntityConnection | undefined;
        // eslint-disable-next-line no-unused-vars
        makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: CableColors): void
    }
}