import { deflate } from "pako";
import { Buffer } from "buffer";
import Blueprint from "../../../domain/entity/models/Blueprint";

/**
 * encodes given json to factorio base64 blueprint string
 * @param myjson blueprint json
 */
const Encode_Blueprint = (myjson: { blueprint: Blueprint }): string => {
  var blueprint = JSON.stringify(myjson)
    .replace(/(null)|(,null)/g, "")
    .replace(/(\[,)/g, "[");
  var encoded = deflate(blueprint, { level: 9 });
  var based = Buffer.from(encoded).toString("base64");
  return 0 + based;
};
export default Encode_Blueprint
