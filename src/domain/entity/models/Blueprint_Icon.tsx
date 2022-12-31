import { Blueprint_Icon_Signal, IBlueprint_Icon } from "../stuctures/IBlueprint_Icon";

export class Blueprint_Icon implements IBlueprint_Icon {
  signal: {};
  index: number;

  constructor(signal: {}, index: number) {
    this.signal = signal;
    this.index = index;
  }
}
