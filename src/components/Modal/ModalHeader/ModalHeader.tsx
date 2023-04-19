import React from "react";
import styles from "./modal-header.module.css";
import CloseButton from "../../../features/CloseButton";

interface ModalHeaderProps {
  inactive: boolean;
  title: string;
  subtitle: string;
  onClose: Function;
  [index: string]: any;
}

export default function ModalHeader({
  inactive,
  title,
  onClose,
  subtitle,
  ...rest
}: ModalHeaderProps) {
  return (
    <header
      className={[styles.header, inactive ? styles.inactiveHeader : " "].join(
        " "
      )}
      {...rest}
    >
      {title && <span className={styles.title}>{title}</span>}
      {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      <CloseButton
        className={styles.closeButton}
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          onClose();
        }}
      />
    </header>
  );
}
