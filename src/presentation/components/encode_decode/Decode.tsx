import React, { useRef } from "react";
import blueprintDecoder from "../../utils/convertors/blueprintDecoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";
type Props = {
  styles: any
};

const Decode = ({ styles }: Props) => {
  const decodedTextRef = useRef<HTMLParagraphElement>(null);

  const encodedInputChange = (e: React.ChangeEvent<any>) => {
    var p = decodedTextRef.current as HTMLParagraphElement;
    try {
      p.innerText = JSON.stringify(blueprintDecoder(e.target.value), null, 2);
    } catch (error) {
      p.innerText = 'Cant parse given blueprint sting to json =(';
    }
  };
  return (
    <div className={styles["decode"]}>
      <h2 className={styles["decode--title"]}>Blueprint string =&gt; json</h2>
      <input
        placeholder="Blueprint string"
        className={styles["decode--input"]}
        onChange={encodedInputChange}
      ></input>
      <p
        className={styles["decode--result"]}
        ref={decodedTextRef}
        onClick={clickCopyHandler}
      ></p>
    </div>
  );
};

export default Decode;
