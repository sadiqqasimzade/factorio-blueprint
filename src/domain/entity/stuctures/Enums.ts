import { TBpSignal } from "./TBpSignal";

export enum versions {
  LATEST = 281479276527617,
}
export enum item_types {
  FLUID = "fluid",
  ITEM = "item",
  VIRTUAL = "virtual",
  TILE = "tile",
  RECIPE = "recipe",
}

export enum entity_names {
  CONSTANT_COMBINATOR = "constant-combinator",
  SUBSTATION = "substation",
  ARITHMETIC_COMBINATOR = "arithmetic-combinator",
  LAMP = "small-lamp",
  MEDIUM_ELECTRIC_POLE = "medium-electric-pole",
}

export enum tile_names {
  CONCRETE = "concrete",
  STONE_PATH = "stone-path",
  HAZARD_CONCRETE_LEFT = "hazard-concrete-left"
}

export enum arithmetic_operations {
  ADD = "+",
  SUBTRACT = "-",
  MULTIPLY = "*",
  DEVIDE = "/",
  MOD = "%",
  EXPONENTIATION = "^",
  LEFT_BIT_SHIFT = "<<",
  RIGHT_BIT_SHIFT = ">>",
  AND = "AND",
  OR = "OR",
  XOR = "XOR",
}

export enum compare_operations {
  GREATER_THAN = ">",
  LESS_THAN = "<",
  EQUAL = "=",
  NOT_EQUAL = '!=',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN_OR_EQUAL = '<=',
}

export enum cable_colors {
  RED = "red",
  GREEN = "green",
}

export enum directions {
  NORTH = 0,
  NORTH_EAST = 1,
  EAST = 2,
  SOUTH_EAST = 3,
  SOUTH = 4,
  SOUTH_WEST = 5,
  WEST = 6,
  NORTH_WEST = 7,
}
//signals enum


export const signals: { [color_hex: string]: TBpSignal } = {
  signal_red: {
    type: item_types.VIRTUAL,
    name: "signal-red",
  },
  signal_green: {
    type: item_types.VIRTUAL,
    name: "signal-green",
  },
  signal_blue: {
    type: item_types.VIRTUAL,
    name: "signal-blue",
  },
  signal_yellow: {
    type: item_types.VIRTUAL,
    name: "signal-yellow",
  },
  signal_pink: {
    type: item_types.VIRTUAL,
    name: "signal-pink",
  },
  signal_cyan: {
    type: item_types.VIRTUAL,
    name: "signal-cyan",
  },
  signal_white: {
    type: item_types.VIRTUAL,
    name: "signal-white",
  },
  signal_black: {
    type: item_types.VIRTUAL,
    name: "signal-black",
  },
  signal_0: {
    type: item_types.VIRTUAL,
    name: "signal-0",
  },
  signal_1: {
    type: item_types.VIRTUAL,
    name: "signal-1",
  },
  signal_2: {
    type: item_types.VIRTUAL,
    name: "signal-2",
  },
  signal_3: {
    type: item_types.VIRTUAL,
    name: "signal-3",
  },
  signal_4: {
    type: item_types.VIRTUAL,
    name: "signal-4",
  },
  signal_5: {
    type: item_types.VIRTUAL,
    name: "signal-5",
  },
  signal_6: {
    type: item_types.VIRTUAL,
    name: "signal-6",
  },
  signal_7: {
    type: item_types.VIRTUAL,
    name: "signal-7",
  },
  signal_8: {
    type: item_types.VIRTUAL,
    name: "signal-8",
  },
  signal_9: {
    type: item_types.VIRTUAL,
    name: "signal-9",
  },
  signal_each: {
    type: item_types.VIRTUAL,
    name: "signal-each",
  },
  signal_a: {
    type: item_types.VIRTUAL,
    name: "signal-A",
  },
  signal_b: {
    type: item_types.VIRTUAL,
    name: "signal-B",
  },
  signal_c: {
    type: item_types.VIRTUAL,
    name: "signal-C",
  },
  signal_d: {
    type: item_types.VIRTUAL,
    name: "signal-D",
  },
  signal_e: {
    type: item_types.VIRTUAL,
    name: "signal-E",
  },
  signal_f: {
    type: item_types.VIRTUAL,
    name: "signal-F",
  },
  signal_g: {
    type: item_types.VIRTUAL,
    name: "signal-G",
  },
  signal_h: {
    type: item_types.VIRTUAL,
    name: "signal-H",
  },
  signal_i: {
    type: item_types.VIRTUAL,
    name: "signal-I",
  },
  signal_j: {
    type: item_types.VIRTUAL,
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


//colors

export const lampColors: { [color_hex: string]: TBpSignal } = {
  "ff0000": signals.signal_red,
  // "0000FF": signals.signal_blue,
  "7bafd6": signals.signal_blue,
  "FFFFFF": signals.signal_white,
  "FFFF00": signals.signal_yellow,
  "008000": signals.signal_green,
  "ffc0cb": signals.signal_pink,
  "30d5c8": signals.signal_cyan,
  "000000": signals.signal_black,
};


export const lampColorsArr: string[] = [];
for (var key in lampColors) {
  lampColorsArr.push(key);
}


export const tileColors: { [color_hex: string]: tile_names } = {
  "524f46": tile_names.STONE_PATH,
  "585858": tile_names.CONCRETE,
  "71603d": tile_names.HAZARD_CONCRETE_LEFT,
};

export const tileColorsArr: string[] = [];
for (var key in tileColors) {
  tileColorsArr.push(key);
}

