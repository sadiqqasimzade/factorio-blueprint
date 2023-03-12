import { tile_names } from "../stuctures/Enums";
import { TBlueprint_Position } from "../stuctures/TBlueprint_Position";

export default class Blueprint_Tile {
  position: TBlueprint_Position;
  name: tile_names;

  constructor(x: number, y: number, name: tile_names) {
    this.name = name;
    this.position = { x, y };
  }
}
