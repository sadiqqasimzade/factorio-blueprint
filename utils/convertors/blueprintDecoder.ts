import { inflate } from "pako";
import { Buffer } from "buffer";
/**
    Converts factorio base64 blueprint string to stringified json
    @param blueprint factorio base64 blueprint string
   */
export default function BlueprintDecoder(blueprint: string): JSON {
  //blueprint code starts with a '0' and needs to be removed
  const based = Buffer.from(blueprint.substring(1), "base64");
  const decoded = inflate(based, { to: "string" });
  return JSON.parse(decoded);
}
