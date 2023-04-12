import { TBlueprint_Signal } from "../stuctures/TBlueprint_Signal";

export default class {
  signal: TBlueprint_Signal;
  index: number;

  constructor(signal: TBlueprint_Signal, index: number) {
    this.signal = signal;
    this.index = index;
  }
}
