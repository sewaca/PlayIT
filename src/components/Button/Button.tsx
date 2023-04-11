import React, { ReactNode } from "react";
import styles from "./button.module.css";

interface ButtonProps {
  children?: ReactNode;
  withPadding?: boolean;
  className?: string;
  [index: string]: any;
}

export default function Button({
  children = null,
  withPadding = true,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <>
      <button
        className={[
          styles.button,
          withPadding ? styles.padding : "",
          className,
        ].join(" ")}
        {...rest}
      >
        {children}
      </button>
    </>
  );
}
