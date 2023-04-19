import React, { useRef } from "react";
import blueprintEncoder from "../../utils/convertors/blueprintEncoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";

type Props = {
  styles: any;
};

const Encode = ({ styles }: Props) => {
  const encodedTextRef = useRef<HTMLParagraphElement>(null);

  const decodedInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    var p = encodedTextRef.current as HTMLParagraphElement;
    try {
      p.innerText = blueprintEncoder(JSON.parse(e.target.value));
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
