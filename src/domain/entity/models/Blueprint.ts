import { versions } from "../stuctures/Enums";
import Blueprint_Entity from "./Blueprint_Entity";
import Blueprint_Icon from "./Blueprint_Icon";

import Blueprint_Tile from "./Blueprint_Tile";

export default class {
  icons: Blueprint_Icon[];
  entities: Blueprint_Entity[];
  tiles?:Blueprint_Tile[];
  item: string;
  version: versions;

  constructor(
    icons: Blueprint_Icon[],
    entities: Blueprint_Entity[],
    tiles?:Blueprint_Tile[],
  ) {
    this.icons = icons;
    this.entities = entities;
    this.item = "blueprint";
    this.version = versions.LATEST;
    this.tiles=tiles
  }
}
