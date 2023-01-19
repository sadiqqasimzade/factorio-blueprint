import {
  signals,
  color_priority,
} from "../../../domain/entity/stuctures/Enums";
import { TBlueprint_Signal } from "../../../domain/entity/stuctures/TBlueprint_Signal";
import Generate from "../../components/Generate";
import Encode_Blueprint from "../convertors/Encoder";
import findClosestColor from "./findClosestColor";
import rgbToHex from "./rgbToHex";

export default function createImage(file: File) {
  var img = new Image();
  img.src = window.URL.createObjectURL(file);
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d", { willReadFrequently: true });
  img.onload = () => {
    canvas.height = img.naturalHeight;
    canvas.width = img.naturalWidth;
    context.drawImage(img, 0, 0);

    var colors: { [color_hex: string]: TBlueprint_Signal } = {
      ff0000: signals.signal_red,
      "0000FF": signals.signal_blue,
      FFFFFF: signals.signal_white,
      FFFF00: signals.signal_yellow,
      "008000": signals.signal_green,
      ffc0cb: signals.signal_pink,
      "30d5c8": signals.signal_cyan,
    };

    // convert the `colors`-object to an array
    var colorsArr: string[] = [];
    for (var key in colors) {
      colorsArr.push(key);
    }

    var color_indexes: number[][] = [];
    let part20: number[] = [];
    let result: number[][][] = [];
    let step = Math.ceil(canvas.height / 20);
    for (let i = 0; i < canvas.width; i++) {
      color_indexes = [];
      for (let count = 0; count < step; count++) {
        part20 = [];
        for (let j = 0; j < canvas.height; j += step) {
          //i w
          //j h

          let data = context.getImageData(i, j, 1, 1).data;
          let hex = rgbToHex(data[0], data[1], data[2]);
          hex = hex.length < 6 ? hex.replace(/(.)/g, "$1$1") : hex;

          var match = findClosestColor(colorsArr, hex);
          part20.push(-(color_priority.indexOf(colors[match]) + 1));
        }
        color_indexes.push(part20);
      }
      result.push(color_indexes);
    }
    console.log(result);
  };
}
