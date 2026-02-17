import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent } from "react";
import cx from "classnames";

import $ from "./Button.module.css";
import Spinner from "../Spinner/Spinner";

interface ButtonProps {
  onClick?: () => void;
  type?: ButtonType;
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      className={cx($.button, {
        [$.primary]: variant === "primary",
        [$.secondary]: variant === "secondary",
      })}
      type={type}
      onClick={onClick}
    >
      {loading && <>
        <div style={{"display": "inline-block", "paddingRight": "5px"}}>
          <Spinner />
        </div>
      </>}
      {children}
    </button>
  );
};

export default Button;
