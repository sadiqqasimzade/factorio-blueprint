import { versions } from "../stuctures/Enums";
import BpEntity from "./BpEntity";
import Blueprint_Icon from "./BpIcon";
import BpTile from "./BpTile";

export default class {
  icons: Blueprint_Icon[];
  entities: BpEntity[];
  tiles?:BpTile[];
  item: string;
  version: versions;

  constructor(
    icons: Blueprint_Icon[],
    entities: BpEntity[],
    tiles?:BpTile[],
  ) {
    this.icons = icons;
    this.entities = entities;
    this.item = "blueprint";
    this.version = versions.LATEST;
    this.tiles=tiles
  }
}
