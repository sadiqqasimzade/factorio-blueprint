import React, { useContext, useRef } from "react";
import blueprintEncoder from "../../utils/convertors/blueprintEncoder";
import clickCopyHandler from "../../utils/handlers/clickCopyHandler";
import AlertContext from "../../contexts/AlertContext";

type Props = {
  styles: any;
};

const Encode = ({ styles }: Props) => {
  const encodedTextRef = useRef<HTMLParagraphElement>(null);
  const { addAlert } = useContext(AlertContext)
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
        className={styles["decode--result"]}
        onClick={(e) => { clickCopyHandler(e).then(result => result ? addAlert('Succesfully copied', 'success') : addAlert('Unable to copy', 'error')) }}>
      </p>
    </div>
  );
};

export default Encode;
