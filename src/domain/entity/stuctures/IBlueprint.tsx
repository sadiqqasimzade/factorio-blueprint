import { IBlueprint_Entity } from "./IBlueprint_Entity";
import { IBlueprint_Icon } from "./IBlueprint_Icon";

export interface IBlueprint {
    icons: IBlueprint_Icon[];
    entities: IBlueprint_Entity[];
    item: string;
    version: number;
  }