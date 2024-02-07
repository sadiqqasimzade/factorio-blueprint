import { TileNames } from "./enums";
import { signals } from "./signalsEnum";

export const lampColors: { [color_hex: string]: TBpSignal } = {
    "ff0000": signals.signal_red,
    // "0000FF": signals.signal_blue,
    "0100FA": signals.signal_blue,
    "FFFFFF": signals.signal_white,
    "FFFF00": signals.signal_yellow,
    "008000": signals.signal_green,
    "fd00fb": signals.signal_pink,
    "30D5C8": signals.signal_cyan,
    "000000": signals.signal_black,
};


export const lampColorsArr: string[] = [];
for (var lampKey in lampColors) {
    lampColorsArr.push(lampKey);
}


export const tileColors: { [color_hex: string]: TileNames } = {
    "524f46": TileNames.STONE_PATH,
    "585858": TileNames.CONCRETE,
    "71603d": TileNames.HAZARD_CONCRETE_LEFT,
};

export const tileColorsArr: string[] = [];
for (var tileKey in tileColors) {
    tileColorsArr.push(tileKey);
}
