import { inflate } from "pako";
import { Buffer } from "buffer";
/**
    Converts factorio base64 blueprint string to stringified json
    @param blueprint factorio base64 blueprint string
   */
const blueprintDecoder = (blueprint: string): JSON => {
  var blueprint = blueprint.substring(1);
  var based = Buffer.from(blueprint, "base64");
  var decoded = inflate(based, { to: "string" });
  console.log(JSON.parse(decoded))
  return JSON.parse(decoded);
};
export default blueprintDecoder;
