import React, { FunctionComponent } from "react";

import $ from "./Spinner.module.css";

interface SpinnerProps {
  colour?: string;
}

const Spinner: FunctionComponent<SpinnerProps> = ({ colour = "white" }) => {
  return (
    <span
      className={$.spinner}
      data-testid="loading-spinner"
      style={{
        borderColor: `color-mix(in srgb, ${colour} 40%, transparent)`,
        borderTopColor: colour,
      }}
    />
  );
};

export default Spinner;
