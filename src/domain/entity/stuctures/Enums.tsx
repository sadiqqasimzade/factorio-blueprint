export enum versions {
  latest = 281479276527617,
}
export enum item_types {
  Fluid = "fluid",
  Item = "item",
  Virtual = "virtual",
  Tile = "tile",
  Recipe = "recipe",
}

export enum entity_names {
  constant_combinator = "constant-combinator",
  substation = "substation",
  arithmetic_combinator = "arithmetic-combinator",
  small_lamp = "small-lamp",
  medium_electric_pole = "medium-electric-pole",
}

export enum arithmetic_operations {
  addition = "+",
  subtraction = "−",
  multiplication = "*",
  division = "/",
  modulo = "%",
  exponentiation = "^",
  left_bit_shift = "<<",
  right_bit_shift = ">>",
  and = "AND",
  or = "OR",
  xor = "XOR",
}
//signals enum

export const signals = {
  signal_red: {
    type: item_types.Virtual,
    name: "signal-red",
  },
  signal_green: {
    type: item_types.Virtual,
    name: "signal-green",
  },
  signal_blue: {
    type: item_types.Virtual,
    name: "signal-blue",
  },
  signal_yellow: {
    type: item_types.Virtual,
    name: "signal-yellow",
  },
  signal_pink: {
    type: item_types.Virtual,
    name: "signal-pink",
  },
  signal_cyan: {
    type: item_types.Virtual,
    name: "signal-cyan",
  },
  signal_white: {
    type: item_types.Virtual,
    name: "signal-white",
  },
  signal_0: {
    type: item_types.Virtual,
    name: "signal-0",
  },
  signal_1: {
    type: item_types.Virtual,
    name: "signal-1",
  },
  signal_2: {
    type: item_types.Virtual,
    name: "signal-2",
  },
  signal_3: {
    type: item_types.Virtual,
    name: "signal-3",
  },
  signal_4: {
    type: item_types.Virtual,
    name: "signal-4",
  },
  signal_5: {
    type: item_types.Virtual,
    name: "signal-5",
  },
  signal_6: {
    type: item_types.Virtual,
    name: "signal-6",
  },
  signal_7: {
    type: item_types.Virtual,
    name: "signal-7",
  },
  signal_8: {
    type: item_types.Virtual,
    name: "signal-8",
  },
  signal_9: {
    type: item_types.Virtual,
    name: "signal-9",
  },
  signal_each: {
    type: item_types.Virtual,
    name: "signal-each",
  },
  signal_a: {
    type: item_types.Virtual,
    name: "signal-A",
  },
  signal_b: {
    type: item_types.Virtual,
    name: "signal-B",
  },
  signal_c: {
    type: item_types.Virtual,
    name: "signal-C",
  },
  signal_d: {
    type: item_types.Virtual,
    name: "signal-D",
  },
  signal_e: {
    type: item_types.Virtual,
    name: "signal-E",
  },
  signal_f: {
    type: item_types.Virtual,
    name: "signal-F",
  },
  signal_g: {
    type: item_types.Virtual,
    name: "signal-G",
  },
  signal_h: {
    type: item_types.Virtual,
    name: "signal-H",
  },
  signal_i: {
    type: item_types.Virtual,
    name: "signal-I",
  },
  signal_j: {
    type: item_types.Virtual,
    name: "signal-J",
  },
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
