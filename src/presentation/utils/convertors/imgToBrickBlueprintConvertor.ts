import Blueprint from "../../../domain/entity/models/Blueprint";
import Blueprint_Icon from "../../../domain/entity/models/Blueprint_Icon";
import Blueprint_Tile from "../../../domain/entity/models/Blueprint_Tile";
import {
  signals,
  tileColors,
} from "../../../domain/entity/stuctures/Enums";

export default (pixelArt: string[][]) => {
  var tiles: Blueprint_Tile[] = [];



  for (let i = 0; i < pixelArt[0].length; i++) {
    for (let j = 0; j < pixelArt.length; j++) {
      tiles.push(new Blueprint_Tile(j, i, tileColors[pixelArt[j][i]]));
    }
  }

  return new Blueprint(
    [new Blueprint_Icon(signals.signal_white, 1)],
    [],
    tiles
  );
};
