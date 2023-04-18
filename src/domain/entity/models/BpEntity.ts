import { entity_names } from "../stuctures/Enums";
import { TBpPosition } from "../stuctures/TBpPosition";

export default abstract class BpEntity {
  private static entity_number = 0;
  entity_number: number;
  name: entity_names;
  position: TBpPosition;


  constructor(
    name: entity_names,
    x: number,
    y: number,

  ) {
    this.entity_number = BpEntity.entity_number;
    this.name = name;
    this.position = { x, y };
    BpEntity.entity_number++;
  }
}


