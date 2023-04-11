import { ReactNode } from "react";
import ScrollableContent from "../../../features/ScrollableContent";
import styles from "./modal-content.module.css";

interface ModalContentProps {
  children: ReactNode;
}

export default function ModalContent({ children }: ModalContentProps) {
  return (
    <div className={styles.content}>
      <ScrollableContent>{children}</ScrollableContent>
    </div>
  );
}
