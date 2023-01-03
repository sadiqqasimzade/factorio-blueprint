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
};
