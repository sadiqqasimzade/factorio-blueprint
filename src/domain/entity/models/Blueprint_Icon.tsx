import { TBlueprint_Signal } from "../stuctures/TBlueprint_Signal";

export class Blueprint_Icon {
  signal: TBlueprint_Signal;
  index: number;

  constructor(signal: TBlueprint_Signal, index: number) {
    this.signal = signal;
    this.index = index;
  }
}
