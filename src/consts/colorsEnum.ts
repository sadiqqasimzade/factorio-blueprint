import { TileNames } from "./enums";


export const tileColors: { [color_hex: string]: TileNames } = {
    "524f46": TileNames.STONE_PATH,
    "585858": TileNames.CONCRETE,
    "71603d": TileNames.HAZARD_CONCRETE_LEFT,
};

export const tileColorsArr: string[] = [];
for (var tileKey in tileColors) {
    tileColorsArr.push(tileKey);
}
