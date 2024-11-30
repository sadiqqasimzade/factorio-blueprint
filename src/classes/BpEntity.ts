import { EntityNames } from "../consts/enums";

export default abstract class BpEntity {
  static entity_number = 0;
  entity_number: number;
  name: EntityNames;
  position: TBpPosition;
  quality?: string;

  constructor(
    name: EntityNames,
    x: number,
    y: number,
    quality?: string
  ) {
    this.entity_number = BpEntity.entity_number;
    this.name = name;
    this.position = { x, y };
    this.quality = quality;
    BpEntity.entity_number++;
  }
}


