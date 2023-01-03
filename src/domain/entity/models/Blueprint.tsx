import { versions } from "../stuctures/Enums";
import { Blueprint_Entity } from "./Blueprint_Entity";
import { Blueprint_Icon } from "./Blueprint_Icon";

export class Blueprint {
  icons: Blueprint_Icon[];
  entities: Blueprint_Entity[];
  item: string;
  version: versions;

  constructor(
    icons: Blueprint_Icon[],
    entities: Blueprint_Entity[],
    version: versions
  ) {
    this.icons = icons;
    this.entities = entities;
    this.item = "blueprint";
    this.version = version;
  }
}
