import React from "react";
import Decode from "../../components/encode_decode/Decode";
import Encode from "../../components/encode_decode/Encode";
import styles from './DecodeEncodePage.module.scss'


const DecodeEncodePage = () => {
  return (
    <>
      <p className={styles["decode--hint"]}>You can click on result to copy it</p>
      <Decode styles={styles}/>
      <Encode styles={styles}/>
    </>
  );
};

export default DecodeEncodePage;
