import React, { useRef } from "react";
import Encode_Blueprint from "../../utils/convertors/Encoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";
import styles from "./Decode.module.scss";

type Props = {};

const Encode = (props: Props) => {
  const encodedTextRef = useRef(undefined);

  const decodedInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    var p = encodedTextRef.current as HTMLParagraphElement;
    try {
      p.innerText = Encode_Blueprint(JSON.parse(e.target.value));
    } catch (error) {
      p.innerText = "Cant parse given json to blueprint sting  =(";
    }
  };
  return (
    <div className={styles["decode"]}>
      <h2 className={styles["decode--title"]}>Json =&gt; Blueprint</h2>
      <textarea
        className={styles["decode--input"]}
        placeholder="Json"
        onChange={decodedInputChange}
        rows={3}
      ></textarea>
      <p
        ref={encodedTextRef}
        onClick={clickCopyHandler}
        className={styles["decode--result"]}
      ></p>
    </div>
  );
};

export default Encode;
