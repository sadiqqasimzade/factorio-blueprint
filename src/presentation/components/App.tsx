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
    // <>
    //   <h2>Decoded</h2>
    //   <p
    //     onClick={clickHandler}
    //   >
    //     {JSON.stringify(
    //       decode_blueprint(
    //         "0eNqNkMFqwzAMht9FZ6eQrGk23/cUZQQn1VZBYhtbDgvB7145gW2ww2bwQdKvT7+0wTAl9IEsg96ARmcj6OsGkT6smUqOV4+ggRhnUGDNXCITiO8zMo3V6OaBrGEXICsge8NP0HV+U4CWiQkP4B6svU3zgEEEf6AUeBel29niQYhV83Q5tQpW0O1ZBolTDm7qB7ybhaRDZN+oXsq3vT2WwjuFyCUX2ZRNhROxSPpfey4UOEnmy9+hqJqynfMYzGEKKpG4xD7x/yGvkOXJafZr6h/HV7BgiDu5ea7P3UvTXVr5dZfzA6a/kAo="
    //       ),
    //       null,
    //       2
    //     )}
    //   </p>
    //   <h2>Encoded</h2>
    //   <p
    //     style={{ wordBreak: "break-all" }}
    //     onClick={clickHandler}
    //   >
    //     {encode_blueprint({
    //       blueprint: Generate(),
    //     })}
    //   </p>
    //   <h1>NEw Json</h1>

    //   <p onClick={clickHandler}>
    //     {JSON.stringify(Generate()).replace(/(null)|(,null)/g, "").replace(/(\[,)/g,"[")}
    //   </p>
    
    // </>
    <>
      <MyCanvas></MyCanvas>
    </>
  );
};
