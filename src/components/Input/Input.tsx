import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import React, { CSSProperties, useRef, useState } from "react";
import Button from "../Button";
import styles from "./input.module.css";

interface InputProps {
  placeholder?: string;
  label?: string;
  className?: string;
  required?: boolean;
  error?: string;
  type?: "text" | "number" | "file";
  value?: string | number | null;
  style?: CSSProperties;
  [index: string]: any;
}

export default function Input({
  placeholder = "",
  label = "",
  className = "",
  required = false,
  type = "text",
  style = {},
  error = "",
  value: defaultValue = null,
  ...rest
}: InputProps) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<
    undefined | null | string | number | File[]
  >(defaultValue);

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
      {type === "file" ? (
        <div className={styles.fileWrapper}>
          <input
            style={{ display: "none" }}
            {...{ ref, type, placeholder, required, ...rest }}
            onChange={(e) => {
              setValue([...(e.target.files || [])]);
              if (rest.onChange) rest.onChange(e);
            }}
          />
          <Button onClick={() => ref.current?.click()}>Выбрать файл</Button>
          <span>
            {Array.isArray(value) && value.length
              ? value[0].name
              : "Файл не выбран"}
          </span>
        </div>
      ) : (
        <input
          className={styles.input}
          value={defaultValue || ""}
          {...{ ref, type, placeholder, required, ...rest }}
          onChange={(e) => {
            setValue(e.target.value);
            if (rest.onChange) rest.onChange(e);
          }}
        />
      )}
      <span className={styles.error}>{error}</span>
    </label>
  );
}
