import { TBlueprint_Entity_Connections } from "../stuctures/TBlueprint_Entity_Connections";

export class Blueprint_Entity{
  entity_number: number;
  name: string;
  position: {
    x: number;
    y: number;
  };
  connections?: TBlueprint_Entity_Connections;
  direction?:number
  control_behavior?:{}
  neighbours?: number[]

  constructor(
    entity_number: number,
    name: string,
    positionX: number,
    positionY: number,
    connections?: TBlueprint_Entity_Connections|undefined,
    direction?:number|undefined,
    control_behavior?:{}|undefined,
    neighbours?:number[]|undefined
  ) {
    this.entity_number = entity_number;
    this.name = name;
    this.position = { x: positionX, y: positionY };
    this.connections = connections;
    this.direction=direction
    this.control_behavior=control_behavior
    this.neighbours=neighbours
  }
}
