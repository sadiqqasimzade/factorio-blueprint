import Blueprint from "../../../domain/entity/models/Blueprint";
import Blueprint_Icon from "../../../domain/entity/models/BpIcon";
import BpTile from "../../../domain/entity/models/BpTile";
import {
  signals,
  tileColors,
} from "../../../domain/entity/stuctures/Enums";

export default (pixelArt: string[][]):Blueprint => {
  var tiles: BpTile[] = [];



  for (let i = 0; i < pixelArt[0].length; i++) {
    for (let j = 0; j < pixelArt.length; j++) {
      tiles.push(new BpTile(j, i, tileColors[pixelArt[j][i]]));
    }
  }
  return new Blueprint(
    [new Blueprint_Icon(signals.signal_white, 1)],
    [],
    tiles
  );
};
