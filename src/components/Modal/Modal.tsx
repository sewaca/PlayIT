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
  // Funcion to refocus modal
  refocus?: Function;
  // Swipable content:
  swipable?: boolean;
  onLeftSwipe?: Function;
  onRightSwipe?: Function;
  // Draggable modal ?:
  draggable?: boolean;
  // Other ...
  [index: string]: any;
}

export default function Modal({
  children = null,
  onClose = () => {},
  title = "",
  subtitle = "",
  className = "",
  refocus = () => {},
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
  if (swipable) content = <SwipableContent {...{onLeftSwipe, onRightSwipe}}>{content}</SwipableContent>;
  if (draggable) content = <DraggableContent>{content}</DraggableContent>;

  const refocusHandlers = {
    onMouseDown: () => refocus(),
    onTouchStart: () => refocus(),
  };

  return (
    <div
      className={[styles.modal, className].join(" ")}
      onClick={() => refocus()}
      onTouchStart={() => refocus()}
      {...rest}
    >
      {content}
    </div>
  );
}
