import { ReactNode } from "react";
import SwipableContent from "../../features/SwipableContent";
import styles from "./modal.module.css";
import ModalContent from "./ModalContent";
import ModalHeader from "./ModalHeader/ModalHeader";
import DraggableContent from "../../features/DraggableContent/DraggableContent";

interface ModalProps {
  // Common props
  children?: ReactNode;
  onClose?: Function;
  title?: string;
  subtitle?: string;
  inactive?: boolean;
  className?: string;
  // Swipable content:
  swipable?: boolean;
  onLeftSwipe?: Function;
  onRightSwipe?: Function;
  // Draggable modal ?:
  draggable?: boolean;
  // Other ...
  [index: string]: any;
}

// TODO: Сделать логику "рефокуса"

export default function Modal({
  children = null,
  onClose = () => {},
  title = "",
  subtitle = "",
  className = "",
  inactive = false,
  swipable = false,
  onLeftSwipe,
  onRightSwipe,
  draggable = true,
  ...rest
}: ModalProps) {
  let content = (
    <div className={styles.background}>
      <ModalHeader {...{ inactive, title, subtitle, onClose }} />
      <ModalContent {...{ children }} />
    </div>
  );
  if (swipable) content = <SwipableContent>{content}</SwipableContent>;
  if (draggable) content = <DraggableContent>{content}</DraggableContent>;

  return (
    <div className={[styles.modal, className].join(" ")} {...rest}>
      {content}
    </div>
  );
}
