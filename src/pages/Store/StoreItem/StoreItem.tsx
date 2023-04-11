import React from "react";
import { Button } from "~/components";
import styles from "./store-item.module.css";

interface StoreItemProps {
  title: string;
  description: string;
  avatar: string;
  id: number;
  price: number;
}

export default function StoreItem({
  title,
  description,
  avatar,
  id,
  price,
}: StoreItemProps) {
  return (
    <div className={styles.item}>
      <img src={avatar} />
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <div className={styles.infoBottom}>
          <span className={styles.description}>{description}</span>
          <Button className={styles.button}>{price}</Button>
        </div>
      </div>
    </div>
  );
}
