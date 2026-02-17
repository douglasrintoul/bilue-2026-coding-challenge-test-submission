import React, { FunctionComponent } from "react";

import $ from "./Spinner.module.css";

const Spinner: FunctionComponent = () => {
  return (
    <span
      className={$.spinner}
      data-testid="loading-spinner"
    />
  );
};

export default Spinner;
