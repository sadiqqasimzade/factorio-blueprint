import { TBpSignal } from "../stuctures/TBpSignal";

export default class {
  signal: TBpSignal;
  index: number;

  constructor(signal: TBpSignal, index: number) {
    this.signal = signal;
    this.index = index;
  }
}
