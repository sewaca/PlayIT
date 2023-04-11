import { CSSProperties } from "react";
import styles from "./textarea.module.css";

interface TextareaProps {
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  error?: string;
  value?: string | number | null;
  style?: CSSProperties;
  [index: string]: any;
}

export default function Textarea({
  placeholder = "",
  label = "",
  className = "",
  required = false,
  style = {},
  error = "",
  value: defaultValue = null,
  ...rest
}: TextareaProps) {
  return (
    <label
      className={[styles.label, className, error ? styles.error : ""].join(" ")}
      style={style}
    >
      {label !== "" ? (
        <span className={styles.labelText}>
          {label + (required ? " *" : "")}
        </span>
      ) : null}

      <textarea className={styles.input} {...{ placeholder, required, ...rest }} />
      <span className={styles.error}>{error}</span>
    </label>
  );
}
