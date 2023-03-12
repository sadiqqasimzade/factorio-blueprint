import Blueprint from "../../../domain/entity/models/Blueprint";
import Blueprint_Icon from "../../../domain/entity/models/Blueprint_Icon";
import Blueprint_Tile from "../../../domain/entity/models/Blueprint_Tile";
import {
  tile_names,
  signals,
  versions,
} from "../../../domain/entity/stuctures/Enums";
import findClosestColor from "../image/findClosestColor";
import rgbToHex from "../image/rgbToHex";

export default (canvas: HTMLCanvasElement) => {
  var tiles: Blueprint_Tile[] = [];
  var context = canvas.getContext("2d", { willReadFrequently: true });

  var colors: { [color_hex: string]: tile_names } = {
    "524f46": tile_names.stone_path,
    "585858": tile_names.concrete,
    "71603d": tile_names.hazard_concrete_left,
  };

  // convert the `colors`-object to an array
  var colorsArr: string[] = [];
  for (var key in colors) {
    colorsArr.push(key);
  }

  for (let i = 0; i < canvas.height; i++) {
    for (let j = 0; j < canvas.width; j++) {
      let data = context.getImageData(j, i, 1, 1).data;
      let hex = rgbToHex(data[0], data[1], data[2]);
      hex = hex.length < 6 ? hex.replace(/(.)/g, "$1$1") : hex;

      var match = findClosestColor(colorsArr, hex);
      tiles.push(new Blueprint_Tile(j, i, colors[match]));
    }
  }
  
  return new Blueprint(
    [new Blueprint_Icon(signals.signal_white, 1)],
    [],
    tiles
  );
};
