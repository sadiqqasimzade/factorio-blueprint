import { inflate } from "pako";
import { Buffer } from "buffer";
/**
    Converts factorio base64 blueprint string to stringified json
    @param blueprint factorio base64 blueprint string
   */
const blueprintDecoder = (blueprint: string): string => {
  var blueprint = blueprint.substring(1);
  var based = Buffer.from(blueprint, "base64");
  var decoded = inflate(based, { to: "string" });
  var jsoned = JSON.parse(decoded);
  return JSON.stringify(jsoned, null, 2);
};
export default blueprintDecoder;
