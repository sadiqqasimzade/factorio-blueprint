import React from "react";

type Props = {};

const SuspenseComponent = (props: Props) => {
  return (
    <div className="suspense">
      <img src="public/imgs/gear.ico" className="suspense--icon"></img>
    </div>
  );
};

export default SuspenseComponent;
