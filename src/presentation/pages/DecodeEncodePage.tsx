import React from "react";
import Decode from "../components/encode_decode/Decode";
import Encode from "../components/encode_decode/Encode";


type Props = {};

const DecodeEncodePage = (props: Props) => {
  return (
    <section>
      <Decode />
      <Encode />
    </section>
  );
};

export default DecodeEncodePage;
