import { TileNames } from "./enums";


export const tileColors: { [color_hex: string]: TileNames } = {
    "313129": TileNames.REFINED_CONCRETE,
    "585858": TileNames.CONCRETE,
    "524f46": TileNames.STONE_PATH,
    "71603d": TileNames.HAZARD_CONCRETE_LEFT,
    "735d19": TileNames.REFINED_HAZARD_CONCRETE_LEFT,
};

export const allTileColorsArr: string[] = Object.keys(tileColors)
export const basicTileColorsArr: string[] = ["585858","524f46","71603d"]