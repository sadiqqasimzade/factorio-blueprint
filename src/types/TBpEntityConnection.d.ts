/* eslint-disable no-unused-vars */


declare type TBpEntityConnectionPort = 1 | 2;
declare type TBpEntityConnection = {
  [K in TBpEntityConnectionPort]?: {
    [K in CableColors]?: {
      entity_id: number; circuit_id?: TBpEntityConnectionPort | undefined;
    }[];
  };

};

