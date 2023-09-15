/* eslint-disable no-unused-vars */
import { CableColors } from "../consts/enums";

declare global {
  type TBpEntityConnectionPort = 1 | 2;
  type TBpEntityConnection = {
    [K in TBpEntityConnectionPort]?: {
      [K in CableColors]?: {
        entity_id: number; circuit_id?: TBpEntityConnectionPort | undefined;
      }[];
    };

  };
}
