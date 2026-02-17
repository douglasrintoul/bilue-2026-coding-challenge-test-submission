import { ButtonType, ButtonVariant } from "@/types";
import React, { FunctionComponent, useMemo } from "react";

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
  const variantClass = useMemo(() => {
    switch (variant) {
      case "primary":
        return $.primary;
      case "secondary":
        return $.secondary;
      default:
        console.warn(`Unknown button variant ${variant}, defaulting to primary.`);
        return $.primary;
    }
  }, [variant]);
  return (
    <button
      className={`${$.button} ${variantClass}`}
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
