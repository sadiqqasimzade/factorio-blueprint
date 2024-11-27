import { TileNames } from "./enums";


export const tileColors: { [color_hex: string]: TileNames } = {
    "524f46": TileNames.STONE_PATH,
    "585858": TileNames.CONCRETE,
    "71603d": TileNames.HAZARD_CONCRETE_LEFT,
    "313129": TileNames.REFINED_CONCRETE,
    "735d19": TileNames.REFINED_HAZARD_CONCRETE_LEFT,
};

export const tileColorsArr: string[] = Object.keys(tileColors)