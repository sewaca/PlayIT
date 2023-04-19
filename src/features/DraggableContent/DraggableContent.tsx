import React, { ReactNode, useState } from "react";
import styles from "./draggable-content.module.css";

interface DraggableContentProps {
  children?: ReactNode;
}

interface Coords {
  x: number;
  y: number;
}

export default function DraggableContent({ children }: DraggableContentProps) {
  const [dragStart, setDragStart] = useState<null | Coords>(null);
  const [pos, setPos] = useState<Coords>({ x: 0, y: 0 });

  const draggableHandlers = {
    onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
      setDragStart({ x: e.pageX - pos.x, y: e.pageY - pos.y }),
    onMouseMove: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!dragStart) return false;
      setPos({
        x: e.pageX - dragStart.x,
        y: e.pageY - dragStart.y,
      });
      return false;
    },
    onMouseUp: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
      setDragStart(null),
    onMouseLeave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
      setDragStart(null),
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) =>
      setDragStart({
        x: e.touches[0].pageX - pos.x,
        y: e.touches[0].pageY - pos.y,
      }),
    onTouchMove: (e: React.TouchEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!dragStart) return;
      setPos({
        x: e.touches[0].pageX - dragStart.x,
        y: e.touches[0].pageY - dragStart.y,
      });
    },
    onTouchEnd: () => setDragStart(null),
  };

  return (
    <div
      className={styles.container}
      style={{
        transition: "0s",
        top: `${pos.y}px`,
        left: `${pos.x}px`,
      }}
    >
      <div className={styles.headerCover} {...draggableHandlers} />
      {children}
    </div>
  );
}
