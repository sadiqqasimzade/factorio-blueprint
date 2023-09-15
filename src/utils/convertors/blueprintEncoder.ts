import { deflate } from "pako";
import { Buffer } from "buffer";
import Blueprint from "@/src/classes/Blueprint";
import BlueprintBook from "@/src/classes/BlueprintBook";
/**
 * encodes given json to factorio base64 blueprint string
 * @param myjson blueprint json
 */
export default function BlueprintEncoder(myjson: Blueprint | BlueprintBook): string {
  const json = myjson instanceof Blueprint ? JSON.stringify({ blueprint: myjson }): JSON.stringify(myjson);
  const result = json.replace(/(null)|(,null)/g, "")
    .replace(/(\[,)/g, "[");
  var encoded = deflate(result, { level: 9 });
  var based = Buffer.from(encoded).toString("base64");
  return 0 + based;

}
