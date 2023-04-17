import BpEntity from "../models/BpEntity";
import { cable_colors } from "./Enums";
import { TBpEntityConnection, TBpEntityConnectionPort } from "./TBpEntityConnection";

export interface IBpConnectable {
    connections: TBpEntityConnection;
    makeConnection(entity: BpEntity, port: TBpEntityConnectionPort, destinationPort: TBpEntityConnectionPort, cable: cable_colors): void
}
