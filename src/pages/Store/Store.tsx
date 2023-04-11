import React from "react";
import { Modal } from "~/components";
import styles from "./store.module.css";
import StoreItem from "./StoreItem/StoreItem";
import { useDispatch } from "react-redux";
import { setPage } from "~/store";

interface StoreProps {}

// FIXME: Переписать на запрос
const data = [...Array(9)].map(() => ({
  id: parseInt(Math.random().toString(10).slice(2)),
  avatar:
    "https://c.wallhere.com/photos/ac/13/No_Game_No_Life_Jibril_pink_hair_anime_girls-244561.jpg!d",
  title: "Приора Приоритетная",
  description:
    "Пробег: 21 год, владельцев: 3, часто ломается, но быстро восстанавливается. Пьяная помоет всю посуду в твоём доме. Иногда кусается",
  price: [2000, 3000, 10000][Math.floor(Math.random() * 3)],
}));

export default function Store({}: StoreProps) {
  const dispatch = useDispatch();
  return (
    <Modal
      title="Магазин"
      subtitle="0 рублёв"
      className={styles.modal}
      onClose={() => dispatch(setPage({ page: "" }))}
    >
      <div className={styles.content}>
        {data.map((item) => (
          <StoreItem key={item.id} {...item} />
        ))}
      </div>
    </Modal>
  );
}
