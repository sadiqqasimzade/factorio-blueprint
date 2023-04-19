import BpEntity from "../models/BpEntity";
import { cable_colors } from "./Enums";
import { TBpEntityConnection, TBpEntityConnectionPort } from "./TBpEntityConnection";

export interface IBpConnectable {
    connections: TBpEntityConnection|undefined;
    makeConnection(entity: BpEntity & IBpConnectable, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void
}
