import { IBlueprint_Entity } from "../stuctures/IBlueprint_Entity";

export class Blueprint_Entity implements IBlueprint_Entity {
  entity_number: number;
  name: string;
  position: { x: number; y: number };
  connections?: {};
  direction?: number;
  control_behavior?: {};

  constructor(
    entity_number: number,
    name: string,
    positionX: number,
    positionY: number,
    connections?: {},
    direction?:number|undefined,
    control_behavior?:{}|undefined
  ) {
    this.entity_number = entity_number;
    this.name = name;
    this.position = { x: positionX, y: positionY };
    this.connections = connections;
    this.direction=direction
    this.control_behavior=control_behavior
  }
  
}
