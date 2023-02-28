import { Blueprint } from "../../../domain/entity/models/Blueprint";
import { Blueprint_Entity } from "../../../domain/entity/models/Blueprint_Entity";
import { Blueprint_Icon } from "../../../domain/entity/models/Blueprint_Icon";
import { signals, versions } from "../../../domain/entity/stuctures/Enums";
import findClosestColor from "../image/findClosestColor";
import rgbToHex from "../image/rgbToHex";

export default (canvas: HTMLCanvasElement) => {
  var entities: Blueprint_Entity[] = [];
  var context=canvas.getContext('2d',{ willReadFrequently: true })

  var colors: { [color_hex: string]: string } = {
    "524f46": "stone-path",
    "585858": "concrete",
    "71603d": "hazard-concrete-left",
  };

  // convert the `colors`-object to an array
  var colorsArr: string[] = [];
  for (var key in colors) {
    colorsArr.push(key);
  }


  for (let i = 0; i < canvas.width; i++) {
    for (let j = 0; j < canvas.height; j++) {
      let data = context.getImageData(i, j, 1, 1).data;
      let hex = rgbToHex(data[0], data[1], data[2]);
      hex = hex.length < 6 ? hex.replace(/(.)/g, "$1$1") : hex;

      var match = findClosestColor(colorsArr, hex);
    }
  }
  //colors
  //brick : #524f46
  //concrete: #585858
  //hazard-concrete-left: #71603d

  return new Blueprint(
    [new Blueprint_Icon(signals.signal_white, 1)],
    entities,
    versions.latest
  );
};
