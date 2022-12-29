import React from "react";
import { deflate, inflate, inflateRaw, ungzip } from "pako";
import { Buffer } from "buffer";

interface blueprint {
  // 👇️ now using React.ComponentType 👇️
  blueprint: {
    icons: { signal: { type: string; name: string }; index: number }[];
    entities: (
      | {
          entity_number: number;
          name: string;
          position: { x: number; y: number };
          neighbours: number[];
        }
      | {
          entity_number: number;
          name: string;
          position: { x: number; y: number };
          neighbours?: undefined;
        }
    )[];
    item: string;
    version: number;
  };
}

export default () => {
  function encode_blueprint(myjson: blueprint): string {
    var blueprint = JSON.stringify(myjson);
    var encoded = deflate(blueprint, { level: 9 });
    var based = Buffer.from(encoded).toString("base64");
    return 0 + based;
  }
  function decode_blueprint(blueprint: string): JSON {
    var blueprint = blueprint.substring(1);
    var based = Buffer.from(blueprint, "base64");
    var decoded = inflate(based, { to: "string" });
    var jsoned = JSON.parse(decoded.toString("utf-8"));
    console.log(jsoned);
    return jsoned;
  }
  return (
    <>
      <h2>Decoded</h2>
      {JSON.stringify(
        decode_blueprint(
          "0eNqdkm2LwyAMx79LXrsxbb22fpVjHHYLQ9C0VHtcKX73ace4ctfBthc+RJP/L9HM0NoR+8FQADWDOXXkQX3O4M2FtM1nYeoRFJiADhiQdtnyY+uDDqYjiAwMnfEHFI9HBkjBBIM3lcWYvmh0LQ7JYSueQd95s2wTLcns6obBlFZR1Ek8pUR4yvc+O/A8XQZEWhPMGVQRjzFG9o8qfqlOW7uz2vVbVLGXd+5hL7eUipeVRJOUXqiBr6jZlg9qKp/M5PB2Jo/I8kkyf5tc/nmD27+m1lpaUK06lsE3Dn6hipqXVSOqD5kGr2K8ArpN768="
        ),
        null,
        2
      )}
      <h2>Encoded</h2>
      <p style={{ wordBreak: "break-all" }}>
        {encode_blueprint({
          blueprint: {
            icons: [
              { signal: { type: "virtual", name: "signal-0" }, index: 1 },
            ],
            entities: [
              {
                entity_number: 1,
                name: "substation",
                position: { x: 0, y: 0 },
                neighbours: [2],
              },
              {
                entity_number: 2,
                name: "substation",
                position: { x: 5, y: 5 },
                neighbours: [1],
              },
              {
                entity_number: 3,
                name: "small-lamp",
                position: { x: 2.5, y: 2.5 },
              },
              {
                entity_number: 4,
                name: "small-lamp",
                position: { x: 3.5, y: 3.5 },
              },
            ],
            item: "blueprint",
            version: 281479276527617,
          },
        })}
      </p>
    </>
  );
};
