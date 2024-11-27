import { Versions } from "../consts/enums";
import BpEntity from "./BpEntity";
import Blueprint_Icon from "./BpIcon";
import BpTile from "./BpTile";

export default class Blueprint {
  icons: Blueprint_Icon[];
  entities: BpEntity[];
  tiles?: BpTile[];
  wires?: TBpWire[]
  item: string;
  version: Versions;

  constructor(
    icons: Blueprint_Icon[],
    entities: BpEntity[],
    tiles?: BpTile[],
    wires?: TBpWire[]
  ) {
    this.icons = icons;
    this.entities = entities;
    this.item = "blueprint";
    this.version = Versions.LATEST;
    this.tiles = tiles
    this.wires = wires
    
    //without this, the entity numbers will increase infinitly
    BpEntity.entity_number = 0
  }
}
