import { tile_names } from "../stuctures/Enums";
import { TBpPosition } from "../stuctures/TBpPosition";

export default class {
  position: TBpPosition;
  name: tile_names;

  constructor(x: number, y: number, name: tile_names) {
    this.name = name;
    this.position = { x, y };
  }
}
