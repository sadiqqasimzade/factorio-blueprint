import { cable_colors } from "./Enums";

export type TBpEntityConnectionPort = 1 | 2;
export type TBpEntityConnection = {
  [K in TBpEntityConnectionPort]?: {
    [K in cable_colors]?: {
      entity_id: number; circuit_id?: TBpEntityConnectionPort | undefined;
    }[];
  };
};

