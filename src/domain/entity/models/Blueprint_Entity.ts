import { entity_names } from "../stuctures/Enums";
import { TBlueprint_Entity_Connections } from "../stuctures/TBlueprint_Entity_Connections";
import { TBlueprint_Position } from "../stuctures/TBlueprint_Position";

export default class {
  entity_number: number;
  name: entity_names;
  position: TBlueprint_Position;
  connections?: TBlueprint_Entity_Connections;
  direction?:number
  control_behavior?:{}
  neighbours?: number[]

  constructor(
    entity_number: number,
    name: entity_names,
    x: number,
    y: number,
    connections?: TBlueprint_Entity_Connections|undefined,
    direction?:number|undefined,
    control_behavior?:{}|undefined,
    neighbours?:number[]|undefined
  ) {
    this.entity_number = entity_number;
    this.name = name;
    this.position = { x, y };
    this.connections = connections;
    this.direction=direction
    this.control_behavior=control_behavior
    this.neighbours=neighbours
  }
}
