import { SignalTypes } from "./enums";

export const signals: { [color_hex: string]: TBpSignal } = {
    signal_red: {
      type: SignalTypes.VIRTUAL,
      name: "signal-red",
    },
    signal_green: {
      type: SignalTypes.VIRTUAL,
      name: "signal-green",
    },
    signal_blue: {
      type: SignalTypes.VIRTUAL,
      name: "signal-blue",
    },
    signal_yellow: {
      type: SignalTypes.VIRTUAL,
      name: "signal-yellow",
    },
    signal_pink: {
      type: SignalTypes.VIRTUAL,
      name: "signal-pink",
    },
    signal_cyan: {
      type: SignalTypes.VIRTUAL,
      name: "signal-cyan",
    },
    signal_white: {
      type: SignalTypes.VIRTUAL,
      name: "signal-white",
    },
    signal_black: {
      type: SignalTypes.VIRTUAL,
      name: "signal-black",
    },
  
  
  
    signal_0: {
      type: SignalTypes.VIRTUAL,
      name: "signal-0",
    },
    signal_1: {
      type: SignalTypes.VIRTUAL,
      name: "signal-1",
    },
    signal_2: {
      type: SignalTypes.VIRTUAL,
      name: "signal-2",
    },
    signal_3: {
      type: SignalTypes.VIRTUAL,
      name: "signal-3",
    },
    signal_4: {
      type: SignalTypes.VIRTUAL,
      name: "signal-4",
    },
    signal_5: {
      type: SignalTypes.VIRTUAL,
      name: "signal-5",
    },
    signal_6: {
      type: SignalTypes.VIRTUAL,
      name: "signal-6",
    },
    signal_7: {
      type: SignalTypes.VIRTUAL,
      name: "signal-7",
    },
    signal_8: {
      type: SignalTypes.VIRTUAL,
      name: "signal-8",
    },
    signal_9: {
      type: SignalTypes.VIRTUAL,
      name: "signal-9",
    },
  
  
    signal_each: {
      type: SignalTypes.VIRTUAL,
      name: "signal-each",
    },
    signal_everything: {
      type: SignalTypes.VIRTUAL,
      name: "signal-everything"
    },
  
  
    signal_a: {
      type: SignalTypes.VIRTUAL,
      name: "signal-A",
    },
    signal_b: {
      type: SignalTypes.VIRTUAL,
      name: "signal-B",
    },
    signal_c: {
      type: SignalTypes.VIRTUAL,
      name: "signal-C",
    },
    signal_d: {
      type: SignalTypes.VIRTUAL,
      name: "signal-D",
    },
    signal_e: {
      type: SignalTypes.VIRTUAL,
      name: "signal-E",
    },
    signal_f: {
      type: SignalTypes.VIRTUAL,
      name: "signal-F",
    },
    signal_g: {
      type: SignalTypes.VIRTUAL,
      name: "signal-G",
    },
    signal_h: {
      type: SignalTypes.VIRTUAL,
      name: "signal-H",
    },
    signal_i: {
      type: SignalTypes.VIRTUAL,
      name: "signal-I",
    },
    signal_j: {
      type: SignalTypes.VIRTUAL,
      name: "signal-J",
    },
    signal_check: {
      type: SignalTypes.VIRTUAL,
      name: 'signal-check"'
    },
    signal_fish: {
      type: SignalTypes.ITEM,
      name: 'raw-fish'
    }
  };
  export const color_priority = [
    signals.signal_white,
    signals.signal_cyan,
    signals.signal_pink,
    signals.signal_yellow,
    signals.signal_blue,
    signals.signal_green,
    signals.signal_red,
  ];
  
  export const signal_priority = [
    signals.signal_0,
    signals.signal_1,
    signals.signal_2,
    signals.signal_3,
    signals.signal_4,
    signals.signal_5,
    signals.signal_6,
    signals.signal_7,
    signals.signal_8,
    signals.signal_9,
    signals.signal_a,
    signals.signal_b,
    signals.signal_c,
    signals.signal_d,
    signals.signal_e,
    signals.signal_f,
    signals.signal_g,
    signals.signal_h,
    signals.signal_i,
    signals.signal_j,
  ];
  