import { TileNames } from "../consts/enums";


export default class BpTile{
  position: TBpPosition;
  name: TileNames;

  constructor(x: number, y: number, name: TileNames) {
    this.name = name;
    this.position = { x, y };
  }
}
