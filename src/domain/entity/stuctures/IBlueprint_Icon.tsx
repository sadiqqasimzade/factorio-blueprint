import { item_type } from "./Enums";

export type Blueprint_Icon_Signal = {
  type: item_type;
  name: string;
};

export interface IBlueprint_Icon {
  signal: {};
  index: number;
}
