import React from "react";
import { useRef } from "react";
import Generate from "../components/Generate";
import Decode_Blueprint from "../utils/convertors/Decoder";
import Encode_Blueprint from "../utils/convertors/Encoder";

type Props = {};

const Decode_Encode = (props: Props) => {
  const decodedTextRef = useRef(undefined);

  const encodedInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    var p = decodedTextRef.current as HTMLParagraphElement;
    p.innerText = Decode_Blueprint(e.target.value);
  };

  const encodedTextRef = useRef(undefined);

  const decodedInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    var p = encodedTextRef.current as HTMLParagraphElement;
    p.innerText = Encode_Blueprint(JSON.parse(e.target.value));
  };
  function clickHandler(
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ): void {
    var text = e.target as HTMLElement;
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
    <div>
      <div>
        <h2>Base 64 =&gt; json</h2>
        <textarea
          placeholder="base64"
          className="w-100"
          onChange={encodedInputChange}
        ></textarea>
        <p
          className="json-text"
          ref={decodedTextRef}
          onClick={clickHandler}
        ></p>
      </div>
      <div>
        <h2>Json =&gt; base64</h2>
        <textarea className="w-100" placeholder="Json" onChange={decodedInputChange}></textarea>
        <p ref={encodedTextRef} onClick={clickHandler} className='base-test'></p>
      </div>
      {/* <p onClick={clickHandler}>{Encode_Blueprint({blueprint:Generate()})}</p> */}
    </div>
  );
};

export default Decode_Encode;
