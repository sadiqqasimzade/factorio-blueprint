import React from "react";
import { deflate, inflate } from "pako";
import { Buffer } from "buffer";
import Generate from "./Generate";
import { MyCanvas } from "./MyCanvas";
import { Blueprint } from "../../domain/entity/models/Blueprint";

export const App: React.FC<{}> = () => {
  function encode_blueprint(myjson: { blueprint: Blueprint }): string {
    var blueprint = JSON.stringify(myjson).replace(/(null)|(,null)/g, "").replace(/(\[,)/g,"[");
    var encoded = deflate(blueprint, { level: 9 });
    var based = Buffer.from(encoded).toString("base64");
    return 0 + based;
  }
  function decode_blueprint(blueprint: string): JSON {
    var blueprint = blueprint.substring(1);
    var based = Buffer.from(blueprint, "base64");
    var decoded = inflate(based, { to: "string" });
    var jsoned = JSON.parse(decoded.toString());
    return jsoned;
  }

  function clickHandler(
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ): void {
    var text=e.target as HTMLElement
    navigator.clipboard.writeText(text.innerText).then(
      () => {
        console.log("success");
      },
      (e) => {
        console.log(e);
      }
    );
  }

  return (
    <>
      <h2>Decoded</h2>
      <p
        onClick={clickHandler}
      >
        {JSON.stringify(
          decode_blueprint(
            "0eNqV0cEKwjAMANB/yTke2nXO9VdkyKZBAy4bayeO0X+3qxfBCfNQSEr7EpIZmvtI/cDiwc7A504c2OMMjq9S35c7P/UEFthTCwhSt0vmxsb52nMnEBBYLvQEq0KFQOLZM72VlEwnGduGhvhg7T9C3zlOYawWmZ3OS4QpBqaIuBBfb003DgupMasCfsF6I2zUL1ihWYOzPzvW5UbY/NnxN5xGEQeeFmM/9ojwoMElRB+UKUpd7PN4VBHCC46JohI="
          ),
          null,
          2
        )}
      </p>
      <h2>Encoded</h2>
      <p
        style={{ wordBreak: "break-all" }}
        onClick={clickHandler}
      >
        {encode_blueprint({
          blueprint: Generate(),
        })}
      </p>
      <h1>NEw Json</h1>

      <p onClick={clickHandler}>
        {JSON.stringify(Generate()).replace(/(null)|(,null)/g, "").replace(/(\[,)/g,"[")}
      </p>
      <p>B</p>
    </>
    // <>
    //   <MyCanvas></MyCanvas>
    // </>
  );
};
