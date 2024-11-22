export class Signals {
  static readonly RED: TBpSignal = { type: "virtual", name: "signal-red" };
  static readonly GREEN: TBpSignal = { type: "virtual", name: "signal-green" };
  static readonly BLUE: TBpSignal = { type: "virtual", name: "signal-blue" };
  static readonly YELLOW: TBpSignal = { type: "virtual", name: "signal-yellow" };
  static readonly PINK: TBpSignal = { type: "virtual", name: "signal-pink" };
  static readonly CYAN: TBpSignal = { type: "virtual", name: "signal-cyan" };
  static readonly WHITE: TBpSignal = { type: "virtual", name: "signal-white" };
  static readonly GREY: TBpSignal = { type: "virtual", name: "signal-grey" };
  static readonly BLACK: TBpSignal = { type: "virtual", name: "signal-black" };


  static readonly SIGNAL_0: TBpSignal = { type: "virtual", name: "signal-0" };
  static readonly SIGNAL_1: TBpSignal = { type: "virtual", name: "signal-1" };
  static readonly SIGNAL_2: TBpSignal = { type: "virtual", name: "signal-2" };
  static readonly SIGNAL_3: TBpSignal = { type: "virtual", name: "signal-3" };
  static readonly SIGNAL_4: TBpSignal = { type: "virtual", name: "signal-4" };
  static readonly SIGNAL_5: TBpSignal = { type: "virtual", name: "signal-5" };
  static readonly SIGNAL_6: TBpSignal = { type: "virtual", name: "signal-6" };
  static readonly SIGNAL_7: TBpSignal = { type: "virtual", name: "signal-7" };
  static readonly SIGNAL_8: TBpSignal = { type: "virtual", name: "signal-8" };
  static readonly SIGNAL_9: TBpSignal = { type: "virtual", name: "signal-9" };


  static readonly EACH: TBpSignal = { type: "virtual", name: "signal-each" };
  static readonly EVERYTHING: TBpSignal = { type: "virtual", name: "signal-everything" };
  static readonly ANYTHING: TBpSignal = { type: "virtual", name: "signal-anything" };


  static readonly A: TBpSignal = { type: "virtual", name: "signal-A" };
  static readonly B: TBpSignal = { type: "virtual", name: "signal-B" };
  static readonly C: TBpSignal = { type: "virtual", name: "signal-C" };
  static readonly D: TBpSignal = { type: "virtual", name: "signal-D" };
  static readonly E: TBpSignal = { type: "virtual", name: "signal-E" };
  static readonly F: TBpSignal = { type: "virtual", name: "signal-F" };
  static readonly G: TBpSignal = { type: "virtual", name: "signal-G" };
  static readonly H: TBpSignal = { type: "virtual", name: "signal-H" };
  static readonly I: TBpSignal = { type: "virtual", name: "signal-I" };
  static readonly J: TBpSignal = { type: "virtual", name: "signal-J" };
  static readonly K: TBpSignal = { type: "virtual", name: "signal-K" };
  static readonly L: TBpSignal = { type: "virtual", name: "signal-L" };
  static readonly M: TBpSignal = { type: "virtual", name: "signal-M" };
  static readonly N: TBpSignal = { type: "virtual", name: "signal-N" };
  static readonly O: TBpSignal = { type: "virtual", name: "signal-O" };
  static readonly P: TBpSignal = { type: "virtual", name: "signal-P" };
  static readonly Q: TBpSignal = { type: "virtual", name: "signal-Q" };
  static readonly R: TBpSignal = { type: "virtual", name: "signal-R" };
  static readonly S: TBpSignal = { type: "virtual", name: "signal-S" };
  static readonly T: TBpSignal = { type: "virtual", name: "signal-T" };
  static readonly U: TBpSignal = { type: "virtual", name: "signal-U" };
  static readonly V: TBpSignal = { type: "virtual", name: "signal-V" };
  static readonly W: TBpSignal = { type: "virtual", name: "signal-W" };
  static readonly X: TBpSignal = { type: "virtual", name: "signal-X" };
  static readonly Y: TBpSignal = { type: "virtual", name: "signal-Y" };
  static readonly Z: TBpSignal = { type: "virtual", name: "signal-Z" };

  static readonly WATER_BARREL: TBpSignal = { name: "water-barrel" };
  static readonly EMPTY_WATER_BARREL: TBpSignal = { type: "recipe", name: "empty-water-barrel" };
  static readonly FILL_WATER_BARREL: TBpSignal = { type: "recipe", name: "water-barrel" };
  static readonly WATER: TBpSignal = { type: "fluid", name: "water" }
  static readonly STEAM: TBpSignal = { type: "fluid", name: "steam" }


  static readonly CRUDE_OIL_BARREL: TBpSignal = { name: "crude-oil-barrel" };
  static readonly EMPTY_CRUDE_OIL_BARREL: TBpSignal = { type: "recipe", name: "empty-crude-oil-barrel" };
  static readonly FILL_CRUDE_OIL_BARREL: TBpSignal = { type: "recipe", name: "crude-oil-barrel" };
  static readonly CRUDE_OIL: TBpSignal = { type: "fluid", name: "crude-oil" }

  static readonly HEAVY_OIL_BARREL: TBpSignal = { name: "heavy-oil-barrel" };
  static readonly EMPTY_HEAVY_OIL_BARREL: TBpSignal = { type: "recipe", name: "empty-heavy-oil-barrel" };
  static readonly FILL_HEAVY_OIL_BARREL: TBpSignal = { type: "recipe", name: "heavy-oil-barrel" };
  static readonly HEAVY_OIL: TBpSignal = { type: "fluid", name: "heavy-oil" }

  static readonly LIGHT_OIL_BARREL: TBpSignal = { name: "light-oil-barrel" };
  static readonly EMPTY_LIGHT_OIL_BARREL: TBpSignal = { type: "recipe", name: "empty-light-oil-barrel" };
  static readonly FILL_LIGHT_OIL_BARREL: TBpSignal = { type: "recipe", name: "light-oil-barrel" };
  static readonly LIGHT_OIL: TBpSignal = { type: "fluid", name: "light-oil" }

  static readonly PETROLEUM_BARREL: TBpSignal = { name: "petroleum-gas-barrel" };
  static readonly EMPTY_PETROLEUM_BARREL: TBpSignal = { type: "recipe", name: "empty-petroleum-gas-barrel" };
  static readonly FILL_PETROLEUM_BARREL: TBpSignal = { type: "recipe", name: "petroleum-gas-barrel" };
  static readonly PETROLEUM: TBpSignal = { type: "fluid", name: "petroleum-gas" }

  static readonly LUBRICANT_BARREL: TBpSignal = { name: "lubricant-barrel" };
  static readonly EMPTY_LUBRICANT_BARREL: TBpSignal = { type: "recipe", name: "empty-lubricant-barrel" };
  static readonly FILL_LUBRICANT_BARREL: TBpSignal = { type: "recipe", name: "lubricant-barrel" };
  static readonly LUBRICANT: TBpSignal = { type: "fluid", name: "lubricant" }

  static readonly SULFURIC_ACID_BARREL: TBpSignal = { name: "sulfuric-acid-barrel" };
  static readonly EMPTY_SULFURIC_ACID_BARREL: TBpSignal = { type: "recipe", name: "empty-sulfuric-acid-barrel" };
  static readonly FILL_SULFURIC_ACID_BARREL: TBpSignal = { type: "recipe", name: "sulfuric-acid-barrel" };
  static readonly SULFURIC_ACID: TBpSignal = { type: "fluid", name: "sulfuric-acid" }

  static readonly AUTOMATION_SCIENCE_PACK = { name: "automation-science-pack" }
  static readonly LOGISTIC_SCIENCE_PACK = { name: "logistic-science-pack" }
  static readonly MILITARY_SCIENCE_PACK = { name: "military-science-pack" }
  static readonly CHEMICAL_SCIENCE_PACK = { name: "chemical-science-pack" }
  static readonly PRODUCTION_SCIENCE_PACK = { name: "production-science-pack" }
  static readonly UTILITY_SCIENCE_PACK = { name: "utility-science-pack" }
  static readonly SPACE_SCIENCE_PACK = { name: "space-science-pack" }

  static readonly CHECK: TBpSignal = { type: "virtual", name: 'signal-check' };
  static readonly INFO: TBpSignal = { type: "virtual", name: 'signal-info' };
  static readonly DENY: TBpSignal = { type: "virtual", name: 'signal-deny' };


  static readonly FISH: TBpSignal = { type: "item", name: "raw-fish" };

  private constructor() { }
}




export const color_priority = [
  Signals.WHITE,
  Signals.CYAN,
  Signals.PINK,
  Signals.YELLOW,
  Signals.BLUE,
  Signals.GREEN,
  Signals.RED,
];

export const signal_priority = [
  Signals.SIGNAL_0,
  Signals.SIGNAL_1,
  Signals.SIGNAL_2,
  Signals.SIGNAL_3,
  Signals.SIGNAL_4,
  Signals.SIGNAL_5,
  Signals.SIGNAL_6,
  Signals.SIGNAL_7,
  Signals.SIGNAL_8,
  Signals.SIGNAL_9,
  Signals.A,
  Signals.B,
  Signals.C,
  Signals.D,
  Signals.E,
  Signals.F,
  Signals.G,
  Signals.H,
  Signals.I,
  Signals.J,
  Signals.K,
  Signals.L,
  Signals.M,
  Signals.N,
  Signals.O,
  Signals.P,
  Signals.Q,
  Signals.R,
  Signals.S,
  Signals.T,
  Signals.U,
  Signals.V,
  Signals.W,
  Signals.X,
  Signals.Y,
  Signals.Z,
  Signals.RED,
  Signals.GREEN,
  Signals.BLUE,
  Signals.YELLOW,
  Signals.PINK,
  Signals.CYAN,
  Signals.WHITE,
  Signals.GREY,
  Signals.BLACK,
  Signals.AUTOMATION_SCIENCE_PACK,
  Signals.LOGISTIC_SCIENCE_PACK,
  Signals.MILITARY_SCIENCE_PACK,
  Signals.CHEMICAL_SCIENCE_PACK,
  Signals.PRODUCTION_SCIENCE_PACK,
  Signals.UTILITY_SCIENCE_PACK,
  Signals.SPACE_SCIENCE_PACK,
  Signals.WATER_BARREL,
  Signals.CRUDE_OIL_BARREL,
  Signals.HEAVY_OIL_BARREL,
  Signals.LIGHT_OIL_BARREL,
  Signals.PETROLEUM_BARREL,
  Signals.LUBRICANT_BARREL,
  Signals.SULFURIC_ACID_BARREL,
  Signals.EMPTY_WATER_BARREL,
  Signals.EMPTY_CRUDE_OIL_BARREL,
  Signals.EMPTY_HEAVY_OIL_BARREL,
  Signals.EMPTY_LIGHT_OIL_BARREL,
  Signals.EMPTY_PETROLEUM_BARREL,
  Signals.EMPTY_LUBRICANT_BARREL,
  Signals.EMPTY_SULFURIC_ACID_BARREL,
  Signals.FILL_WATER_BARREL,
  Signals.FILL_CRUDE_OIL_BARREL,
  Signals.FILL_HEAVY_OIL_BARREL,
  Signals.FILL_LIGHT_OIL_BARREL,
  Signals.FILL_PETROLEUM_BARREL,
  Signals.FILL_LUBRICANT_BARREL,
  Signals.FILL_SULFURIC_ACID_BARREL,
  Signals.WATER,
  Signals.CRUDE_OIL,
  Signals.HEAVY_OIL,
  Signals.LIGHT_OIL,
  Signals.PETROLEUM,
  Signals.LUBRICANT,
  Signals.SULFURIC_ACID,
  Signals.STEAM,
  Signals.CHECK,
  Signals.INFO,
  Signals.DENY,
  Signals.FISH
];

