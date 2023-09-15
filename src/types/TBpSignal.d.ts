import { SignalTypes } from "../consts/enums";

declare global {
  // eslint-disable-next-line no-unused-vars
  type TBpSignal = {
    type: SignalTypes;
    name: string;
  }
}